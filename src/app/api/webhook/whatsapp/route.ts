import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { PatientQualificationSchema } from '@/types/qualification';
import { processRawLeadWithAI } from '@/services/aiProcessor';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secretToken = searchParams.get('secret');
    
    if (secretToken !== process.env.WHATSAPP_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized route access' }, { status: 401 });
    }

    const body = await request.json();
    let finalLeadData;

    // Check if the payload contains a raw text string directly from WhatsApp
    if (body.messageText && typeof body.messageText === 'string') {
      console.log('🔮 Raw incoming chat message spotted. Routing to AI Engine...');
      finalLeadData = await processRawLeadWithAI(body.messageText);
    } else {
      // If data is already parsed clean via upstream n8n workflows, validate directly
      const validationResult = PatientQualificationSchema.safeParse(body);
      if (!validationResult.success) {
        return NextResponse.json({ error: 'Data contract mismatch', details: validationResult.error.format() }, { status: 400 });
      }
      finalLeadData = validationResult.data;
    }

    // Save perfectly typed lead straight into Postgres
    const { data, error } = await supabase
      .from('patients')
      .insert({
        full_name: finalLeadData.fullName,
        contact_language: finalLeadData.contactLanguage,
        origin_country: finalLeadData.originCountry,
        clinical_category: finalLeadData.clinicalCategory,
        missing_teeth_count: finalLeadData.dentalDetails?.missingTeethCount ?? 0,
        has_xray: finalLeadData.dentalDetails?.hasXRay ?? false,
        primary_complaint: finalLeadData.dentalDetails?.primaryComplaint || null,
        estimated_budget_euro: finalLeadData.dentalDetails?.estimatedBudgetEuro || null,
        urgency_score: finalLeadData.urgencyScore,
        next_action_required: finalLeadData.nextActionRequired
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Database write rejection', details: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      patientId: data.id,
      category: data.clinical_category,
      urgency: data.urgency_score
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: 'Internal pipeline crash', messaging: error.message }, { status: 500 });
  }
}
