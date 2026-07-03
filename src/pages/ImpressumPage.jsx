import { SiteLayout } from '@/components/layout/SiteLayout.jsx'
import { Container } from '@/components/ui'

export function ImpressumPage() {
  return (
    <SiteLayout>
      <section className="bg-white px-6 py-24 md:py-32">
        <Container className="max-w-[820px]">
          <article className="flex flex-col gap-10">
            <header className="flex flex-col gap-4">
              <p className="type-eyebrow text-black/60">Rechtliches</p>
              <h1 className="type-section-heading text-black">Impressum</h1>
            </header>

            <div className="flex flex-col gap-8 text-black">
              <section className="flex flex-col gap-3">
                <h2 className="type-card-title">Angaben gemaess § 5 TMG</h2>
                <p className="type-body text-black/70">
                  Felix Meise
                  <br />
                  Kirchhofallee 19
                  <br />
                  24114 Kiel
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="type-card-title">Kontakt</h2>
                <p className="type-body text-black/70">
                  Telefon:{' '}
                  <a className="text-[#0a6bda] underline underline-offset-2" href="tel:+4915906498022">
                    015906498022
                  </a>
                  <br />
                  E-Mail:{' '}
                  <a className="text-[#0a6bda] underline underline-offset-2" href="mailto:felixm@meise.at">
                    felixm@meise.at
                  </a>
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="type-card-title">Redaktionell verantwortlich</h2>
                <p className="type-body text-black/70">Felix Meise</p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="type-card-title">EU-Streitschlichtung</h2>
                <p className="type-body text-black/70">
                  Die Europaeische Kommission stellt eine Plattform zur Online-Streitbeilegung
                  (OS) bereit:{' '}
                  <a
                    className="text-[#0a6bda] underline underline-offset-2"
                    href="https://ec.europa.eu/consumers/odr/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                  . Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="type-card-title">
                  Verbraucherstreitbeilegung/Universalschlichtungsstelle
                </h2>
                <p className="type-body text-black/70">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="type-card-title">
                  Alternative Streitbeilegung gemaess Art. 14 Abs. 1 ODR-VO und § 36 VSBG
                </h2>
                <p className="type-body text-black/70">
                  Die Europaeische Kommission stellt eine Plattform zur Online-Streitbeilegung
                  (OS) bereit, die du unter{' '}
                  <a
                    className="text-[#0a6bda] underline underline-offset-2"
                    href="https://ec.europa.eu/consumers/odr"
                    rel="noreferrer"
                    target="_blank"
                  >
                    https://ec.europa.eu/consumers/odr
                  </a>{' '}
                  findest. Zur Teilnahme an einem Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht bereit.
                </p>
              </section>

              <p className="type-body text-black/50">
                Quelle:{' '}
                <a
                  className="text-[#0a6bda] underline underline-offset-2"
                  href="https://www.e-recht24.de/"
                  rel="noreferrer"
                  target="_blank"
                >
                  eRecht24
                </a>
              </p>
            </div>
          </article>
        </Container>
      </section>
    </SiteLayout>
  )
}
