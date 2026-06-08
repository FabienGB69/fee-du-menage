'use client'

import { useEffect, useState } from 'react'

interface ConsentData {
  analytics: boolean
  thirdParty: boolean
  advertising: boolean
  savedAt: string
}

const STORAGE_KEY = 'cookie_consent'

function loadConsent(): ConsentData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as ConsentData
  } catch {
    return null
  }
}

function saveConsent(data: Omit<ConsentData, 'savedAt'>) {
  const payload: ConsentData = { ...data, savedAt: new Date().toISOString() }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  return payload
}

export function CookiePreferencesPanel() {
  const [analytics, setAnalytics] = useState(false)
  const [thirdParty, setThirdParty] = useState(false)
  const [advertising, setAdvertising] = useState(false)
  const [saved, setSaved] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const existing = loadConsent()
    if (existing) {
      setAnalytics(existing.analytics)
      setThirdParty(existing.thirdParty)
      setAdvertising(existing.advertising)
    }
  }, [])

  function handleSave() {
    saveConsent({ analytics, thirdParty, advertising })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  function handleAcceptAll() {
    setAnalytics(true)
    setThirdParty(true)
    setAdvertising(true)
    saveConsent({ analytics: true, thirdParty: true, advertising: true })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  function handleRefuseAll() {
    setAnalytics(false)
    setThirdParty(false)
    setAdvertising(false)
    saveConsent({ analytics: false, thirdParty: false, advertising: false })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (!mounted) return null

  return (
    <div className="cookie-preferences-panel">
      <h3>Personnalisation du consentement</h3>

      {/* Nécessaires — toujours actifs */}
      <div className="cookie-toggle-row">
        <div>
          <strong>Cookies nécessaires</strong>
          <p>Indispensables au fonctionnement du site. Toujours actifs.</p>
        </div>
        <label className="toggle-switch toggle-switch--disabled" aria-label="Cookies nécessaires — toujours activés">
          <input type="checkbox" checked readOnly disabled />
          <span className="toggle-slider" />
        </label>
      </div>

      {/* Mesure d'audience */}
      <div className="cookie-toggle-row">
        <div>
          <strong>Mesure d&apos;audience</strong>
          <p>
            Permet de mesurer le trafic et d&apos;améliorer le contenu du site
            (ex : Google Analytics).
          </p>
        </div>
        <label className="toggle-switch" aria-label="Cookies de mesure d'audience">
          <input
            type="checkbox"
            checked={analytics}
            onChange={(e) => setAnalytics(e.target.checked)}
          />
          <span className="toggle-slider" />
        </label>
      </div>

      {/* Services tiers */}
      <div className="cookie-toggle-row">
        <div>
          <strong>Services tiers</strong>
          <p>
            Intégrations de services externes (ex : carte, formulaire, chat).
          </p>
        </div>
        <label className="toggle-switch" aria-label="Cookies de services tiers">
          <input
            type="checkbox"
            checked={thirdParty}
            onChange={(e) => setThirdParty(e.target.checked)}
          />
          <span className="toggle-slider" />
        </label>
      </div>

      {/* Publicité et marketing */}
      <div className="cookie-toggle-row">
        <div>
          <strong>Publicité et marketing</strong>
          <p>
            Permet d&apos;afficher des publicités personnalisées selon vos
            centres d&apos;intérêt.
          </p>
        </div>
        <label className="toggle-switch" aria-label="Cookies de publicité et marketing">
          <input
            type="checkbox"
            checked={advertising}
            onChange={(e) => setAdvertising(e.target.checked)}
          />
          <span className="toggle-slider" />
        </label>
      </div>

      <div className="cookie-pref-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAcceptAll}
        >
          Tout accepter
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleRefuseAll}
        >
          Tout refuser
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={handleSave}
        >
          Enregistrer mes préférences
        </button>
      </div>

      {saved && (
        <p className="cookie-pref-success" role="status" aria-live="polite">
          Préférences enregistrées ✓
        </p>
      )}
    </div>
  )
}
