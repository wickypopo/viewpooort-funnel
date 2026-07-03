const META_PIXEL_SCRIPT_ID = 'meta-pixel-script'
const DEFAULT_META_PIXEL_ID = '1139635438082386'

function getPixelId() {
  return import.meta.env.VITE_META_PIXEL_ID || DEFAULT_META_PIXEL_ID
}

export function initMetaPixel() {
  const pixelId = getPixelId()

  if (!pixelId || typeof window === 'undefined') {
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

  if (!document.getElementById(META_PIXEL_SCRIPT_ID)) {
    const script = document.createElement('script')
    script.id = META_PIXEL_SCRIPT_ID
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(script)
  }

  window.fbq('init', pixelId)
  window.fbq('consent', 'grant')
  window.fbq('track', 'PageView')

  return true
}

export function revokeMetaPixelConsent() {
  if (window.fbq) {
    window.fbq('consent', 'revoke')
  }
}

export function trackLeadEvent(parameters = {}) {
  if (!window.fbq) {
    return false
  }

  window.fbq('track', 'Lead', parameters)
  return true
}
