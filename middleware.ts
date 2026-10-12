import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        }
      }
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  const protectedRoutes = [
    { pattern: /^\/dashboard/, adminOnly: false },
    { pattern: /^\/edit/, adminOnly: false },
    { pattern: /^\/admin/, adminOnly: true }
  ];

  for (const route of protectedRoutes) {
    if (route.pattern.test(request.nextUrl.pathname)) {
      if (!session) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      if (route.adminOnly && session) {
        // Admin check will happen server-side
        const cookieStore = request.cookies;
        // For admin-only routes, the server-side handler will verify role
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/edit/:path*'
  ]
};
