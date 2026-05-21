import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const { patientId } = await request.json();

  if (!patientId) {
    return NextResponse.json({ success: false, error: 'Patient target identity missing.' }, { status: 400 });
  }

  // Set up authenticated session verification
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {}
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized engine request.' }, { status: 401 });
  }

  try {
    // 1. Fetch this specific patient's data context
    const { data: patient, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', patientId)
      .single();

    if (error || !patient) {
      return NextResponse.json({ success: false, error: 'Target clinical lead profile not found.' }, { status: 404 });
    }

    // 2. Format a system persona and prompt engineered specifically for international medical coordination
    const systemInstruction = `You are an elite, highly empathetic international patient coordinator at MMV Medical. You specialize in triaging international medical tourism inquiries. Your goal is to write a warm, professional, clear, and action-oriented WhatsApp introductory response message. Avoid corporate filler. Speak directly, comfortably, and reassure them cleanly.`;

    const dynamicPrompt = `Draft a custom introductory WhatsApp message to this patient.
Patient Details:
- Name: ${patient.full_name}
- Origin Country: ${patient.origin_country}
- Primary Language Code: ${patient.contact_language}
- Department: ${patient.clinical_category}
- Specific Clinical Issue / Complaint: "${patient.primary_complaint || 'General consultation request'}"
- Radiograph uploaded: ${patient.has_xray ? 'Yes, panoramic x-ray available' : 'No x-ray provided yet'}
- Missing Teeth Count: ${patient.missing_teeth_count || 0}

Requirements:
1. Write the message entirely in the user's primary language (${patient.contact_language === 'en' ? 'English' : 'their target language'}).
2. Acknowledge their specific situation or medical issue naturally (e.g., if they have an X-ray or specific missing teeth, mention it softly so they know an expert looked at it).
3. Sound incredibly supportive, warm, and professional—never transactional.
4. Keep the text concise and split into 2-3 brief, highly readable paragraphs perfect for a mobile WhatsApp interface.
5. End with a single clear, friendly next step asking to schedule a brief call. Do not include placeholders; write a fully completed message template ready to use.`;

    // 3. Dispatch payload request to Anthropic API
    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 600,
        system: systemInstruction,
        messages: [{ role: 'user', content: dynamicPrompt }]
      })
    });

    const resultData = await anthropicResponse.json();
    
    if (!anthropicResponse.ok) {
      throw new Error(resultData.error?.message || 'Claude processing engine error.');
    }

    const generatedText = resultData.content[0].text;
    return NextResponse.json({ success: true, generatedDraft: generatedText });

  } catch (err: any) {
    console.error('Claude pipeline execution failure:', err.message);
    return NextResponse.json({ success: false, error: 'Automation handler failed to resolve reply draft.' }, { status: 500 });
  }
}
