import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET(request: Request) {
  try {
    // 1. Verify Vercel Cron Security Signature Header to block anonymous requests
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized cron verification' }, { status: 401 });
    }

    // 2. Grab the clinic queues needing updates
    const { data: clinics, error: clinicError } = await supabase
      .from('competitor_clinics')
      .select('*');

    if (clinicError || !clinics) {
      return NextResponse.json({ error: 'Failed to retrieve active tracker targets' }, { status: 500 });
    }

    const proxyUrl = process.env.LITELLM_PROXY_URL || 'http://localhost:4000';
    const proxyKey = process.env.LITELLM_PROXY_MASTER_KEY || '';

    // Loop through each clinic and pull raw price pages
    for (const clinic of clinics) {
      console.log(`📡 Extracting layout from competitor: ${clinic.clinic_name}`);

      // Fetch the public page markup/text data safely
      const siteResponse = await fetch(clinic.website_url, { next: { revalidate: 3600 } });
      if (!siteResponse.ok) continue;
      
      const rawHtmlText = await siteResponse.text();
      // Keep string size lean for the context window boundary
      const cleanSnippetText = rawHtmlText.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '').substring(0, 15000);

      // 3. Pipe raw content extraction through Gemini Flash backend-agent proxy
      const aiResponse = await fetch(`${proxyUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${proxyKey}`
        },
        body: JSON.stringify({
          model: 'backend-agent', // Cost-efficient, high-volume model
          response_format: { type: "json_object" },
          messages: [
            {
              role: 'system',
              content: `You are an automated price parsing extraction script. Extract current pricing fields from the text snippet.
              Identify prices for: 'single_implant', 'zirconia_crown', 'veneer', 'all_on_4'.
              Convert all extracted amounts into estimated numeric integers in EURO currency. 
              Output a JSON object structured exactly like this:
              {
                "prices": [
                  {"treatment_key": "single_implant", "price_euro": 550, "is_package_deal": false},
                  {"treatment_key": "all_on_4", "price_euro": 4500, "is_package_deal": true}
                ]
              }`
            },
            { role: 'user', content: cleanSnippetText }
          ],
          temperature: 0.1
        })
      });

      if (!aiResponse.ok) continue;

      const aiData = await aiResponse.json();
      const extractedPayload = JSON.parse(aiData.choices[0].message.content);

      if (extractedPayload.prices && Array.isArray(extractedPayload.prices)) {
        // 4. Batch record newly structured logs to the database row collection
        const rowsToInsert = extractedPayload.prices.map((item: any) => ({
          clinic_id: clinic.id,
          treatment_key: item.treatment_key,
          price_euro: item.price_euro,
          is_package_deal: item.is_package_deal,
          raw_source_text: `Extracted from: ${clinic.website_url}`
        }));

        await supabase.from('competitor_prices').insert(rowsToInsert);

        // Update tracking ledger sync timestamp
        await supabase
          .from('competitor_clinics')
          .update({ last_scraped_at: new Date().toISOString() })
          .eq('id', clinic.id);
      }
    }

    return NextResponse.json({ success: true, processedClinics: clinics.length }, { status: 200 });

  } catch (error: any) {
    console.error('🚨 Cron processing exception:', error.message);
    return NextResponse.json({ error: 'Internal pipeline crash', messaging: error.message }, { status: 500 });
  }
}
