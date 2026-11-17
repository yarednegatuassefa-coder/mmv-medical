import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { timingSafeEqual } from 'node:crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const ALLOWED_KEYS = new Set(['single_implant', 'zirconia_crown', 'veneer', 'all_on_4']);

function authorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || secret.length < 16) return false;
  const supplied = Buffer.from(request.headers.get('authorization') ?? '');
  const expected = Buffer.from(`Bearer ${secret}`);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: 'Unauthorized route access' }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: 'Server is not configured' }, { status: 503 });
  }

  const proxyUrl = process.env.LITELLM_PROXY_URL || 'http://localhost:4000';
  const proxyKey = process.env.LITELLM_PROXY_MASTER_KEY;
  if (!proxyKey) {
    return NextResponse.json({ error: 'Scraper is not configured' }, { status: 503 });
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  try {
    const { data: clinics, error: clinicError } = await supabase
      .from('competitor_clinics')
      .select('*');

    if (clinicError || !clinics) {
      console.error('Cron: failed to retrieve tracker targets:', clinicError?.message ?? 'no data');
      return NextResponse.json({ error: 'Failed to retrieve active tracker targets' }, { status: 500 });
    }

    let processed = 0;

    for (const clinic of clinics) {
      try {
        const target = new URL(clinic.website_url);
        if (target.protocol !== 'https:' || target.username || target.password ||
            target.hostname === 'localhost' || target.hostname.endsWith('.localhost')) {
          continue;
        }

        const siteResponse = await fetch(target.toString(), {
          cache: 'no-store',
          signal: AbortSignal.timeout(10_000),
        });
        if (!siteResponse.ok) continue;

        const rawHtmlText = await siteResponse.text();
        const cleanSnippetText = rawHtmlText
          .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '')
          .substring(0, 15000);

        const aiResponse = await fetch(`${proxyUrl}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${proxyKey}`,
          },
          body: JSON.stringify({
            model: 'backend-agent',
            response_format: { type: 'json_object' },
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
}`,
              },
              { role: 'user', content: cleanSnippetText },
            ],
            temperature: 0.1,
          }),
          signal: AbortSignal.timeout(30_000),
        });
        if (!aiResponse.ok) continue;

        const aiData = await aiResponse.json();
        const extracted = JSON.parse(aiData.choices?.[0]?.message?.content ?? '{}');
        if (!Array.isArray(extracted.prices)) continue;

        const rowsToInsert = extracted.prices
          .map((item: any) => ({
            treatment_key: item?.treatment_key,
            price: Math.round(Number(item?.price_euro)),
            is_package_deal: item?.is_package_deal === true,
          }))
          .filter((item: any) =>
            ALLOWED_KEYS.has(item.treatment_key) &&
            Number.isFinite(item.price) &&
            item.price >= 50 &&
            item.price <= 50000
          )
          .map((item: any) => ({
            clinic_id: clinic.id,
            treatment_key: item.treatment_key,
            price_euro: item.price,
            is_package_deal: item.is_package_deal,
            raw_source_text: `Extracted from: ${target.toString()}`,
          }));

        if (rowsToInsert.length > 0) {
          const { error: insertError } = await supabase.from('competitor_prices').insert(rowsToInsert);
          if (insertError) {
            console.error('Cron: price insert failed:', clinic.clinic_name, insertError.message);
            continue;
          }
          await supabase
            .from('competitor_clinics')
            .update({ last_scraped_at: new Date().toISOString() })
            .eq('id', clinic.id);
          processed += 1;
        }
      } catch (clinicErr) {
        console.error('Cron: clinic failed:', clinic.clinic_name, clinicErr instanceof Error ? clinicErr.message : 'unknown');
      }
    }

    return NextResponse.json({ success: true, processedClinics: processed, totalClinics: clinics.length }, { status: 200 });
  } catch (error) {
    console.error('Cron processing exception:', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json({ error: 'Internal pipeline crash' }, { status: 500 });
  }
}
