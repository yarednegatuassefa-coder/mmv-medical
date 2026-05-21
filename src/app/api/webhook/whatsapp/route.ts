import { NextResponse } from 'next/server';
import { PatientQualificationSchema } from '@/types/qualification';

export async function POST(request: Request) {
  try {
    // 1. Verify safety secret headers from your Vercel Environment Variables
    const { searchParams } = new URL(request.url);
    const secretToken = searchParams.get('secret');
    
    if (secretToken !== process.env.WHATSAPP_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized route access' }, { status: 401 });
    }

    // 2. Parse the incoming payload
    const body = await request.json();
    
    // 3. Force structural validation through our Zod data contract
    const validationResult = PatientQualificationSchema.safeParse(body);
    
    if (!validationResult.success) {
      // Rule 2: Fail loud and clear if data structures break
      console.error('⚠️ Input validation matrix mismatch:', validationResult.error.format());
      return NextResponse.json({ 
        error: 'Data contract mismatch', 
        details: validationResult.error.format() 
      }, { status: 400 });
    }

    const validatedData = validationResult.data;

    // TODO: In the next step, this is where we pipe validatedData 
    // into Supabase tables or pass it to the Bitrix24 automation spine.
    console.log('✅ Lead structural payload approved:', validatedData.fullName);

    return NextResponse.json({ 
      success: true, 
      message: 'Lead structure qualified successfully',
      category: validatedData.clinicalCategory 
    }, { status: 200 });

  } catch (error: any) {
    console.error('🚨 Severe internal webhook crash:', error.message);
    return NextResponse.json({ error: 'Internal pipeline crash', messaging: error.message }, { status: 500 });
  }
}
