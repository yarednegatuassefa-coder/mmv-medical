import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { PatientQualificationSchema } from '@/types/qualification';

// Initialize the secure Supabase administrative engine
// Vercel reads these values from your dashboard environment parameters automatically
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: Request) {
  try {
    // 1. Verify safety secret token headers from your Vercel URL params
    const { searchParams } = new URL(request.url);
    const secretToken = searchParams.get('secret');
    
    if (secretToken !== process.env.WHATSAPP_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized route access' }, { status: 401 });
    }

    // 2. Parse the incoming payload from n8n / WhatsApp
    const body = await request.json();
    
    // 3. Structural validation via our Zod schema contract
    const validationResult = PatientQualificationSchema.safeParse(body);
    
    if (!validationResult.success) {
      console.error('⚠️ Input validation matrix mismatch:', validationResult.error.format());
      return NextResponse.json({ 
        error: 'Data contract mismatch', 
        details: validationResult.error.format() 
      }, { status: 400 });
    }

    const lead = validationResult.data;

    // 4. Map the validated payload into our newly created Postgres structure
    const { data, error } = await supabase
      .from('patients')
      .insert({
        full_name: lead.fullName,
        contact_language: lead.contactLanguage,
        origin_country: lead.originCountry,
        clinical_category: lead.clinicalCategory,
        
        // Extract and flatten optional sub-nested dental parameters safely
        missing_teeth_count: lead.dentalDetails?.missingTeethCount ?? 0,
        has_xray: lead.dentalDetails?.hasXRay ?? false,
        primary_complaint: lead.dentalDetails?.primaryComplaint || null,
        estimated_budget_euro: lead.dentalDetails?.estimatedBudgetEuro || null,
        
        urgency_score: lead.urgencyScore,
        next_action_required: lead.nextActionRequired
      })
      .select()
      .single();

    if (error) {
      console.error('🚨 Database insert rejection:', error.message);
      return NextResponse.json({ error: 'Database write rejection', details: error.message }, { status: 500 });
    }

    console.log('✅ Lead safely written to database row:', data.id);

    return NextResponse.json({ 
      success: true, 
      message: 'Lead verified and committed to database storage',
      patientId: data.id 
    }, { status: 200 });

  } catch (error: any) {
    console.error('🚨 Severe internal webhook crash:', error.message);
    return NextResponse.json({ error: 'Internal pipeline crash', messaging: error.message }, { status: 500 });
  }
}
