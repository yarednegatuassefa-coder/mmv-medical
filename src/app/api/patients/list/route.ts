import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  
  // Initialize the server-side Supabase client to verify authorization securely
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // The Server Component/Route Handler was called from a client-side transition.
          }
        },
      },
    }
  );

  // Authenticate the incoming request session
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized operational access.' }, { status: 401 });
  }

  try {
    // Pull real patient data fields matched with our frontend state interface
    const { data: patients, error } = await supabase
      .from('patients')
      .select('id, full_name, contact_language, origin_country, clinical_category, missing_teeth_count, has_xray, primary_complaint, urgency_score, next_action_required, created_at')
      .order('urgency_score', { ascending: false }); // High priority first

    if (error) throw error;

    return NextResponse.json(patients || []);
  } catch (err: any) {
    console.error('Database connection exception caught:', err.message);
    return NextResponse.json({ error: 'Failed to extract active triage records.' }, { status: 500 });
  }
}
