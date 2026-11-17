import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set({ name, value, ...options })
          );
          response = NextResponse.next({ request: { headers: request.headers } });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set({ name, value, ...options })
          );
        },
      },
    }
  );

  // getUser verifies the access token with Supabase; getSession only reads local cookie data.
  const { data: { user } } = await supabase.auth.getUser();
  let approved = false;

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('approved')
      .eq('id', user.id)
      .maybeSingle();
    approved = profile?.approved === true;
  }

  if (request.nextUrl.pathname.startsWith('/app')) {
    if (!user) return NextResponse.redirect(new URL('/login', request.url));
    if (!approved) return NextResponse.redirect(new URL('/login?pending=approval', request.url));
  }

  if (request.nextUrl.pathname === '/login' && user && approved) {
    return NextResponse.redirect(new URL('/app/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/app/:path*', '/login'],
};
