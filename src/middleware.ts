import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session-token')
  const pathname = request.nextUrl.pathname

  if (pathname === '/login' && token) {
    const baseUrl = request.nextUrl.origin
    return NextResponse.redirect(baseUrl + '/dashboard')
  }

  if (pathname.includes('dashboard') && !token) {
    const baseUrl = request.nextUrl.origin
    return NextResponse.redirect(baseUrl + '/login')
  }
}

export const config = {
  matcher: ['/login', '/dashboard/:path*'],
}
