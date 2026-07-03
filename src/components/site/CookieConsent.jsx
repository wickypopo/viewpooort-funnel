import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui'
import { cn } from '@/lib/cn.js'

const CONSENT_KEY = 'viewpooort_cookie_consent'
const CONSENT_VERSION = 1

const defaultConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
}

function initializeConsentMode() {
  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments)
    }

  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

function readStoredConsent() {
  try {
    const stored = window.localStorage.getItem(CONSENT_KEY)

    if (!stored) {
      return null
    }

    const parsed = JSON.parse(stored)

    if (parsed?.version !== CONSENT_VERSION || !parsed?.categories) {
      return null
    }

    return {
      necessary: true,
      analytics: Boolean(parsed.categories.analytics),
      marketing: Boolean(parsed.categories.marketing),
    }
  } catch {
    return null
  }
}

function persistConsent(categories) {
  const payload = {
    version: CONSENT_VERSION,
    savedAt: new Date().toISOString(),
    categories: {
      necessary: true,
      analytics: Boolean(categories.analytics),
      marketing: Boolean(categories.marketing),
    },
  }

  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(payload))
  window.dispatchEvent(new CustomEvent('viewpooort:consent-change', { detail: payload }))

  if (window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: payload.categories.analytics ? 'granted' : 'denied',
      ad_storage: payload.categories.marketing ? 'granted' : 'denied',
      ad_user_data: payload.categories.marketing ? 'granted' : 'denied',
      ad_personalization: payload.categories.marketing ? 'granted' : 'denied',
    })
  }

  if (window.fbq) {
    window.fbq('consent', payload.categories.marketing ? 'grant' : 'revoke')
  }
}

function ConsentToggle({ checked, disabled, label, description, onChange }) {
  return (
    <label
      className={cn(
        'flex gap-4 rounded-[6px] border border-black/10 bg-white p-4',
        disabled && 'opacity-70',
      )}
    >
      <input
        checked={checked}
        className="mt-1 h-5 w-5 accent-[#0a6bda]"
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
      <span className="flex flex-col gap-1">
        <span className="type-body-strong text-black">{label}</span>
        <span className="type-body text-sm leading-snug text-black/60">{description}</span>
      </span>
    </label>
  )
}

export function CookieConsent() {
  const [isReady, setIsReady] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [selection, setSelection] = useState(defaultConsent)

  useEffect(() => {
    initializeConsentMode()

    const storedConsent = readStoredConsent()

    if (storedConsent) {
      setSelection(storedConsent)
      persistConsent(storedConsent)
    } else {
      setIsVisible(true)
    }

    setIsReady(true)
  }, [])

  useEffect(() => {
    const openSettings = () => {
      const storedConsent = readStoredConsent()
      setSelection(storedConsent ?? defaultConsent)
      setShowSettings(true)
      setIsVisible(true)
    }

    window.addEventListener('viewpooort:open-cookie-settings', openSettings)

    return () => {
      window.removeEventListener('viewpooort:open-cookie-settings', openSettings)
    }
  }, [])

  const hasOptionalConsent = useMemo(
    () => selection.analytics || selection.marketing,
    [selection.analytics, selection.marketing],
  )

  function saveConsent(categories) {
    const normalized = {
      necessary: true,
      analytics: Boolean(categories.analytics),
      marketing: Boolean(categories.marketing),
    }

    setSelection(normalized)
    persistConsent(normalized)
    setIsVisible(false)
    setShowSettings(false)
  }

  if (!isReady || !isVisible) {
    return null
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-[760px] rounded-[8px] border border-black/10 bg-white p-5 shadow-[0_20px_80px_rgba(0,0,0,0.18)] sm:p-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="type-card-title text-black">Cookie-Einstellungen</p>
            <p className="type-body text-black/60">
              Wir nutzen notwendige Cookies für diese Website. Analytics und Marketing setzen wir
              nur ein, wenn du zustimmst.
            </p>
          </div>

          {showSettings ? (
            <div className="grid gap-3">
              <ConsentToggle
                checked
                description="Erforderlich für Grundfunktionen wie Consent-Speicherung und Formularnutzung."
                disabled
                label="Notwendig"
                onChange={() => {}}
              />
              <ConsentToggle
                checked={selection.analytics}
                description="Hilft uns zu verstehen, welche Seiten genutzt werden und wo Besucher abspringen."
                label="Analytics"
                onChange={(analytics) => setSelection((current) => ({ ...current, analytics }))}
              />
              <ConsentToggle
                checked={selection.marketing}
                description="Erlaubt Conversion-Messung für Google Ads, Meta und ähnliche Kampagnen."
                label="Marketing"
                onChange={(marketing) => setSelection((current) => ({ ...current, marketing }))}
              />
            </div>
          ) : null}

          <div className="flex flex-col-reverse items-center gap-3 sm:flex-row sm:justify-between">
            <button
              className="type-action self-start text-[#0a6bda] underline underline-offset-2 sm:self-auto"
              onClick={() => setShowSettings((current) => !current)}
              type="button"
            >
              {showSettings ? 'Auswahl verbergen' : 'Auswahl anpassen'}
            </button>

            <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
              <Button
                className="min-h-0 px-4 py-3"
                onClick={() => saveConsent(defaultConsent)}
                variant="link"
              >
                Ablehnen
              </Button>
              {showSettings ? (
                <Button
                  className="min-h-0 px-4 py-3"
                  onClick={() => saveConsent(selection)}
                  variant={hasOptionalConsent ? 'solid' : 'link'}
                >
                  Auswahl speichern
                </Button>
              ) : null}
              <Button
                className="min-h-0 w-full px-4 py-3 sm:w-auto"
                onClick={() =>
                  saveConsent({
                    necessary: true,
                    analytics: true,
                    marketing: true,
                  })
                }
                variant="solid"
              >
                Alle akzeptieren
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
