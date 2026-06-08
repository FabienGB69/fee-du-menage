import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — Fée du Ménage',
  robots: 'noindex,nofollow',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#0d0d14',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {children}
    </div>
  )
}
