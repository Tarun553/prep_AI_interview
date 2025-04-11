import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

  // Skip authentication for sign-in and sign-up pages
  if (request.nextUrl.pathname.startsWith('/sign-in') || request.nextUrl.pathname.startsWith('/sign-up')) {
    return NextResponse.next();
  }

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return NextResponse.next();
  }

  // Get session cookie
  const sessionCookie = request.cookies.get('session')?.value;

  if (!sessionCookie) {
    // Set a flag to prevent infinite redirects
    const redirectingFromAuth = request.cookies.get('redirectingFromAuth')?.value;
    
    if (redirectingFromAuth) {
      // If we're already redirecting, just pass through
      return NextResponse.next();
    }

    // Set a flag to indicate we're redirecting
    const response = NextResponse.redirect(new URL('/sign-in', request.url));
    response.cookies.set('redirectingFromAuth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 // 1 minute
    });
    return response;
  }

  // Clear the redirect flag if we have a valid session
  const response = NextResponse.next();
  response.cookies.delete('redirectingFromAuth');
  return response;
}

// Configure the middleware to run on all routes except API and static files
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
