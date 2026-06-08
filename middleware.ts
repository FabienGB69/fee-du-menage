import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/admin/auth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const adminPassword = process.env.ADMIN_PASSWORD
    const token = req.cookies.get('admin_auth')?.value

    if (!adminPassword || !token) {
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = '/admin/login'
      return NextResponse.redirect(loginUrl)
    }

    if (!(await verifyToken(token, adminPassword))) {
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = '/admin/login'
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
