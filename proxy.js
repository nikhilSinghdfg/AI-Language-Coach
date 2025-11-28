import { NextResponse } from 'next/server';

export function proxy(req) {
  const path = req.nextUrl.pathname;
  const accessToken = req.cookies.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.next();
  }

  const publicPaths = ['/auth/Login', '/auth/Signup', '/auth/VerifyEmail'];
  const isPublicPage = publicPaths.some(p => path.startsWith(p));




  if (accessToken && isPublicPage) {
    return NextResponse.redirect(new URL('/pages/Dashboard', req.url));
  }

  if (!accessToken && !isPublicPage) {
    return NextResponse.redirect(new URL('/pages/Dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/auth/:path*',   // login/signup/verifyemail
    '/pages/:path*',  // dashboard and other pages
    '/',              // root path
  ],
};

