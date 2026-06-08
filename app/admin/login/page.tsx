'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push('/admin/chat')
      } else {
        setError('Invalid password.')
      }
    } catch {
      setError('Connection error.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#0d0d14',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#1a1a2e', border: '1px solid #2a2a4a',
        borderRadius: 12, padding: '2rem', width: 320, display: 'flex',
        flexDirection: 'column', gap: '1rem',
      }}>
        <div style={{ textAlign: 'center', color: '#a78bfa', fontSize: 32, marginBottom: 4 }}>🔒</div>
        <h1 style={{ color: '#e2e8f0', fontSize: 18, fontWeight: 700, textAlign: 'center', margin: 0 }}>
          Admin Access
        </h1>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          style={{
            background: '#0d0d14', border: '1px solid #2a2a4a', borderRadius: 8,
            color: '#e2e8f0', padding: '0.6rem 0.75rem', fontSize: 14, outline: 'none',
          }}
        />
        {error && <p style={{ color: '#f87171', fontSize: 13, margin: 0 }}>{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          style={{
            background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 8,
            padding: '0.65rem', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            opacity: loading || !password ? 0.5 : 1,
          }}
        >
          {loading ? 'Verifying…' : 'Enter'}
        </button>
      </form>
    </div>
  )
}
