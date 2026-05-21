import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generatePatientDraftResponse } from '@/services/patientResponder';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patientId } = body;

    if (!patientId) {
      return NextResponse.json({ error: 'Missing target patient identification parameter' }, { status: 400 });
    }

    // 1. Grab fresh clinical records from our Supabase core table
    const { data: patient, error: dbError } = await supabase
      .from('patients')
      .select('*')
      .eq('id', patientId)
      .single();

    if (dbError || !patient) {
      return NextResponse.json({ error: 'Patient entity record not found', details: dbError?.message }, { status: 404 });
    }

    // 2. Map the DB naming snake_case to camelCase parameters for the router
    const customProfile = {
      fullName: patient.full_name,
      contactLanguage: patient.contact_language,
      clinicalCategory: patient.clinical_category,
      missingTeethCount: patient.missing_teeth_count,
      hasXRay: patient.has_xray,
      primaryComplaint: patient.primary_complaint
    };

    // 3. Process the high-judgment communication draft through Claude 3.5 Sonnet
    const responseDraftText = await generatePatientDraftResponse(customProfile);

    // 4. Return the calculated string draft clean to your coordinator dashboard panel
    return NextResponse.json({
      success: true,
      patientId: patient.id,
      preferredLanguage: customProfile.contactLanguage,
      generatedDraft: responseDraftText
    }, { status: 200 });

  } catch (error: any) {
    console.error('🚨 Crash in draft generation endpoint router:', error.message);
    return NextResponse.json({ error: 'Internal engine process failure', messaging: error.message }, { status: 500 });
  }
}
