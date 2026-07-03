import { CookieConsent } from '@/components/site'
import { SiteFooter } from './SiteFooter.jsx'
import { SiteHeader } from './SiteHeader.jsx'

export function SiteLayout({ children }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <CookieConsent />
    </>
  )
}
