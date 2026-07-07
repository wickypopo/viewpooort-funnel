const META_PIXEL_SCRIPT_ID = 'meta-pixel-script'
const DEFAULT_META_PIXEL_ID = '1139635438082386'
const CONSENT_KEY = 'viewpooort_cookie_consent'
const INITIALIZED_PIXEL_IDS_KEY = '__viewpooort_meta_pixel_initialized_ids'
const LAST_PAGEVIEW_KEY = '__viewpooort_meta_pixel_last_pageview'

function getPixelId() {
  return import.meta.env.VITE_META_PIXEL_ID || DEFAULT_META_PIXEL_ID
}

function hasMarketingConsent() {
  try {
    const storedConsent = window.localStorage.getItem(CONSENT_KEY)

    if (!storedConsent) {
      return false
    }

    const parsedConsent = JSON.parse(storedConsent)
    return Boolean(parsedConsent?.categories?.marketing)
  } catch {
    return false
  }
}

function getInitializedPixelIds() {
  window[INITIALIZED_PIXEL_IDS_KEY] = window[INITIALIZED_PIXEL_IDS_KEY] || new Set()
  return window[INITIALIZED_PIXEL_IDS_KEY]
}

function getCurrentPageKey() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`
}

export function initMetaPixel() {
  const pixelId = getPixelId()

  if (!pixelId || typeof window === 'undefined' || !hasMarketingConsent()) {
    return false
  }

  if (!window.fbq) {
    window.fbq = function fbq() {
      if (window.fbq.callMethod) {
        window.fbq.callMethod.apply(window.fbq, arguments)
        return
      }

      window.fbq.queue.push(arguments)
    }
    window.fbq.push = window.fbq
    window.fbq.loaded = true
    window.fbq.version = '2.0'
    window.fbq.queue = []
  }

  if (
    !document.getElementById(META_PIXEL_SCRIPT_ID) &&
    !document.querySelector('script[src*="connect.facebook.net"][src*="/fbevents.js"]')
  ) {
    const script = document.createElement('script')
    script.id = META_PIXEL_SCRIPT_ID
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(script)
  }

  const initializedPixelIds = getInitializedPixelIds()

  if (!initializedPixelIds.has(pixelId)) {
    window.fbq('init', pixelId)
    initializedPixelIds.add(pixelId)
  }

  window.fbq('consent', 'grant')

  const currentPageKey = getCurrentPageKey()

  if (window[LAST_PAGEVIEW_KEY] !== currentPageKey) {
    window.fbq('track', 'PageView')
    window[LAST_PAGEVIEW_KEY] = currentPageKey
  }

  return true
}

export function revokeMetaPixelConsent() {
  if (window.fbq) {
    window.fbq('consent', 'revoke')
  }
}

export function trackLeadEvent(parameters = {}) {
  if (!window.fbq || !hasMarketingConsent()) {
    return false
  }

  window.fbq('track', 'Lead', parameters)
  return true
}
