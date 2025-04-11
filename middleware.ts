import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/firebase/admin';

export async function middleware(request: NextRequest) {
  // Skip middleware for API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-KEY');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    return response;
  }

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return NextResponse.next();
  }

  // Get session cookie
  const sessionCookie = request.cookies.get('session')?.value;

  if (!sessionCookie) {
    // If no session cookie, redirect to sign-in
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  try {
    // Verify session cookie
    await auth.verifySessionCookie(sessionCookie, true);
    return NextResponse.next();
  } catch (error) {
    // If session verification fails, redirect to sign-in
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
}

// Configure the middleware to run on all routes except API and static files
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
