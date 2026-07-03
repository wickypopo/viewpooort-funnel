import { ClientLogoStrip } from '@/components/site'
import { Container } from '@/components/ui'
import { siteData } from '@/data.js'

export function ClientLogosSection() {
  const { clients } = siteData

  return (
    <section
      className="overflow-hidden border-b border-[#06264b]/10 bg-[#f8f8f8] px-6 py-8 md:py-10"
      data-section="clients"
      id="clients"
    >
      <Container className="flex flex-col gap-11">
        <div className="flex items-start justify-between gap-6">
          <h2 className="type-body text-[#4f4f4f]">{clients.headline}</h2>
        </div>
        <ClientLogoStrip clients={clients.items} className="w-full" />
      </Container>
    </section>
  )
}
