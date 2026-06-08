import { NextRequest, NextResponse } from 'next/server'
import { hashPassword } from '@/lib/admin/auth'

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

    const expected = await hashPassword(adminPassword)
    if (token !== expected) {
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
