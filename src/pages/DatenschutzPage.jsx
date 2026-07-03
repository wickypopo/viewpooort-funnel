import { SiteLayout } from '@/components/layout/SiteLayout.jsx'
import { Container, CtaLink } from '@/components/ui'
import { datenschutz } from '@/datenschutz.js'

const urlPattern = /(https?:\/\/[^\s]+)/g
const startsWithUrlPattern = /^https?:\/\//

function InlineText({ text }) {
  return text.split(urlPattern).map((part, index) => {
    if (!startsWithUrlPattern.test(part)) {
      return part
    }

    const href = part.replace(/[.,;:]$/, '')
    const suffix = part.slice(href.length)

    return (
      <span key={`${href}-${index}`}>
        <a className="text-[#0a6bda] underline underline-offset-2" href={href} rel="noreferrer" target="_blank">
          {href}
        </a>
        {suffix}
      </span>
    )
  })
}

function Paragraph({ children }) {
  const lines = children.split('\n')

  return (
    <p className="type-body text-black/70">
      {lines.map((line, index) => (
        <span key={`${line}-${index}`}>
          <InlineText text={line} />
          {index < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </p>
  )
}

export function DatenschutzPage() {
  return (
    <SiteLayout>
      <section className="bg-white px-6 py-24 md:py-32">
        <Container className="max-w-[860px]">
          <article className="flex flex-col gap-10">
            <header className="flex flex-col gap-5">
              <p className="type-eyebrow text-black/60">Rechtliches</p>
              <h1 className="type-section-heading text-black">{datenschutz.title}</h1>
              {datenschutz.actions.map((action) => (
                <CtaLink className="self-start" href="/contact" key={action}>
                  {action}
                </CtaLink>
              ))}
            </header>

            {datenschutz.intro.length > 0 ? (
              <div className="flex flex-col gap-5">
                {datenschutz.intro.map((paragraph) => (
                  <Paragraph key={paragraph}>{paragraph}</Paragraph>
                ))}
              </div>
            ) : null}

            <div className="flex flex-col gap-8 text-black">
              {datenschutz.sections.map((section) => (
                <section className="flex flex-col gap-3" key={section.title}>
                  <h2 className="type-card-title">{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <Paragraph key={paragraph}>{paragraph}</Paragraph>
                  ))}
                </section>
              ))}
            </div>
          </article>
        </Container>
      </section>
    </SiteLayout>
  )
}
