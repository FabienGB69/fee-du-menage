import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'

const SALT = 'admin_salt_v1'

function hashPassword(pw: string): string {
  return createHash('sha256').update(pw + SALT).digest('hex')
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // protect all /admin/* routes except /admin/login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const adminPassword = process.env.ADMIN_PASSWORD
    const token = req.cookies.get('admin_auth')?.value

    if (!adminPassword || !token || token !== hashPassword(adminPassword)) {
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
