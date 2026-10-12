import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });
  const { data: { session } } = await supabase.auth.getSession();

  if (request.nextUrl.pathname.startsWith('/edit/') || request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/admin/')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/edit/:path*']
};
