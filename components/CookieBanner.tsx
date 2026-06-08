'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'cookie_consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const existing = localStorage.getItem(STORAGE_KEY)
      if (!existing) {
        setVisible(true)
      }
    } catch {
      // localStorage unavailable — keep banner hidden
    }
  }, [])

  function acceptAll() {
    const payload = {
      analytics: true,
      thirdParty: true,
      advertising: false,
      savedAt: new Date().toISOString(),
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch {
      // ignore
    }
    setVisible(false)
  }

  function refuseAll() {
    const payload = {
      analytics: false,
      thirdParty: false,
      advertising: false,
      savedAt: new Date().toISOString(),
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch {
      // ignore
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="banner"
      aria-label="Gestion des cookies"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-100"
    >
      <div className="cookie-banner-inner">
        <p className="cookie-banner-text">
          Nous utilisons des cookies pour assurer le bon fonctionnement du site,
          mesurer l&apos;audience et améliorer votre expérience.
        </p>
        <div className="cookie-banner-actions">
          <button
            type="button"
            onClick={acceptAll}
            className="btn btn-primary"
          >
            Tout accepter
          </button>
          <button
            type="button"
            onClick={refuseAll}
            className="btn btn-secondary"
          >
            Tout refuser
          </button>
          <Link href="/cookies" className="btn btn-outline">
            Personnaliser
          </Link>
        </div>
      </div>
    </div>
  )
}
