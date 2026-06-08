import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createHash } from 'crypto'
import ChatInterface from '@/components/admin/ChatInterface'

function hashPassword(pw: string): string {
  return createHash('sha256').update(pw + 'admin_salt_v1').digest('hex')
}

export default async function AdminChatPage() {
  const adminPassword = process.env.ADMIN_PASSWORD
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_auth')?.value

  if (!adminPassword || !token || token !== hashPassword(adminPassword)) {
    redirect('/admin/login')
  }

  return <ChatInterface />
}
