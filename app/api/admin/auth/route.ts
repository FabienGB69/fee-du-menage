import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { hashPassword, verifyPassword } from '@/lib/admin/auth'

export async function POST(req: NextRequest) {
  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const password = typeof body === 'object' && body !== null && 'password' in body ? (body as Record<string, unknown>).password : null
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  if (typeof password !== 'string' || !password) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  if (!(await verifyPassword(password, adminPassword))) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const token = await hashPassword(adminPassword)
  const cookieStore = await cookies()
  cookieStore.set('admin_auth', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_auth')
  return NextResponse.json({ ok: true })
}
