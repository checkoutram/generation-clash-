// ============================================================
// ANALYTICS CONFIG — single place to change provider / ID.
// Replace ANALYTICS_MEASUREMENT_ID with your GA4 Measurement ID
// (looks like "G-XXXXXXXXXX"). If left as the placeholder,
// analytics stays fully disabled and the game works normally.
// ============================================================

export const ANALYTICS_PROVIDER: 'ga4' | 'plausible' | 'umami' | 'none' = 'ga4'
export const ANALYTICS_MEASUREMENT_ID = 'G-8JPN7C8FT5'

// Optional for Plausible/Umami self-hosted setups:
export const ANALYTICS_SCRIPT_URL = '' // e.g. 'https://plausible.io/js/script.js'
export const ANALYTICS_DOMAIN = ''     // e.g. 'checkoutram.github.io'

const IS_PLACEHOLDER = ANALYTICS_MEASUREMENT_ID.includes('XXXX')

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    plausible?: (event: string, opts?: { props?: Record<string, unknown> }) => void
    umami?: { track: (event: string, props?: Record<string, unknown>) => void }
  }
}

let initialized = false

/** Detect device type once. */
export function deviceType(): 'mobile' | 'tablet' | 'desktop' {
  const ua = navigator.userAgent
  if (/tablet|ipad/i.test(ua)) return 'tablet'
  if (/mobi|android|iphone/i.test(ua)) return 'mobile'
  return 'desktop'
}

/** Capture UTM params + referrer source (for campaign tracking). */
export function trafficSource(): Record<string, string> {
  const p = new URLSearchParams(window.location.search)
  const src: Record<string, string> = {}
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign']) {
    const v = p.get(k)
    if (v) src[k] = v
  }
  if (!src.utm_source) {
    const ref = document.referrer
    if (!ref) src.utm_source = 'direct'
    else if (/whatsapp/i.test(ref)) src.utm_source = 'whatsapp'
    else if (/instagram/i.test(ref)) src.utm_source = 'instagram'
    else if (/facebook|fb\./i.test(ref)) src.utm_source = 'facebook'
    else if (/google\./i.test(ref)) src.utm_source = 'google'
    else { try { src.utm_source = new URL(ref).hostname } catch { src.utm_source = 'unknown' } }
  }
  return src
}

/** Load the provider script asynchronously. Never blocks the app. */
export function initAnalytics(): void {
  if (initialized) return
  initialized = true
  try {
    if (ANALYTICS_PROVIDER === 'none' || IS_PLACEHOLDER) return

    if (ANALYTICS_PROVIDER === 'ga4') {
      const s = document.createElement('script')
      s.async = true
      s.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_MEASUREMENT_ID}`
      document.head.appendChild(s)
      window.dataLayer = window.dataLayer || []
      window.gtag = function () { window.dataLayer!.push(arguments) }
      window.gtag('js', new Date())
      window.gtag('config', ANALYTICS_MEASUREMENT_ID, { send_page_view: false, anonymize_ip: true })
    } else if (ANALYTICS_PROVIDER === 'plausible') {
      const s = document.createElement('script')
      s.async = true
      s.defer = true
      s.src = ANALYTICS_SCRIPT_URL || 'https://plausible.io/js/script.js'
      s.setAttribute('data-domain', ANALYTICS_DOMAIN)
      document.head.appendChild(s)
    } else if (ANALYTICS_PROVIDER === 'umami') {
      const s = document.createElement('script')
      s.async = true
      s.defer = true
      s.src = ANALYTICS_SCRIPT_URL
      s.setAttribute('data-website-id', ANALYTICS_MEASUREMENT_ID)
      document.head.appendChild(s)
    }
  } catch { /* analytics must never break the game */ }
}

export type AnalyticsParams = Record<string, string | number | boolean | undefined>

/**
 * Fire an analytics event. Silently no-ops if analytics is
 * disabled, blocked by an ad-blocker, or fails for any reason.
 */
export function trackEvent(name: string, params: AnalyticsParams = {}): void {
  try {
    if (ANALYTICS_PROVIDER === 'none' || IS_PLACEHOLDER) return
    const clean: Record<string, string | number | boolean> = {}
    Object.entries(params).forEach(([k, v]) => { if (v !== undefined) clean[k] = v })

    if (ANALYTICS_PROVIDER === 'ga4' && typeof window.gtag === 'function') {
      window.gtag('event', name, clean)
    } else if (ANALYTICS_PROVIDER === 'plausible' && typeof window.plausible === 'function') {
      window.plausible(name, { props: clean })
    } else if (ANALYTICS_PROVIDER === 'umami' && window.umami) {
      window.umami.track(name, clean)
    }
  } catch { /* never break the game */ }
}

/** Build a share URL with UTM campaign tags. */
export function shareUrl(): string {
  const base = window.location.origin + window.location.pathname
  return `${base}?utm_source=whatsapp&utm_medium=share&utm_campaign=generation_clash`
}
