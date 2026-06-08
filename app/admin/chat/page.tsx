import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { hashPassword } from '@/lib/admin/auth'
import ChatInterface from '@/components/admin/ChatInterface'

export default async function AdminChatPage() {
  const adminPassword = process.env.ADMIN_PASSWORD
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_auth')?.value

  if (!adminPassword || !token) {
    redirect('/admin/login')
  }

  const expected = await hashPassword(adminPassword)
  if (token !== expected) {
    redirect('/admin/login')
  }

  return <ChatInterface />
}
