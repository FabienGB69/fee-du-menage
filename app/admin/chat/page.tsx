import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/lib/admin/auth'
import ChatInterface from '@/components/admin/ChatInterface'

export default async function AdminChatPage() {
  const adminPassword = process.env.ADMIN_PASSWORD
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_auth')?.value

  if (!adminPassword || !token) {
    redirect('/admin/login')
  }

  if (!(await verifyToken(token, adminPassword))) {
    redirect('/admin/login')
  }

  return <ChatInterface />
}
