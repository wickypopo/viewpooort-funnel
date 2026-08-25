import { Container } from "@/components/ui";
import { siteData } from "@/data.js";
import { openCookieSettings } from "@/lib/cookieConsent.js";

export function SiteFooter() {
  const { footer } = siteData;

  return (
    <footer
      className="bg-[rgba(9,73,146,0.02)] py-[100px] max-md:py-16"
      data-layout="site-footer"
      id="contact"
    >
      <Container className="grid grid-cols-[1fr_2fr] gap-[60px] px-6 max-md:grid-cols-1 max-md:gap-12">
        <div>
          <p className="type-serif text-4xl text-black">{footer.brand}</p>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="type-card-title text-black">
            {footer.legal.headline}
          </h2>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {footer.legal.links.map((link) => (
              <a
                className="type-body text-black/60 no-underline"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
            <button
              className="type-body text-left text-black/60 underline-offset-2 hover:underline"
              onClick={openCookieSettings}
              type="button"
            >
              Cookie-Einstellungen
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
