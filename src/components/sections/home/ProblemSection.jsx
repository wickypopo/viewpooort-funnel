import { SectionBand } from '@/components/site'
import { Container, NumberedCard, SectionHeader } from '@/components/ui'
import { siteData } from '@/data.js'

export function ProblemSection() {
  const section = siteData.statusQuo

  return (
    <SectionBand data-section="status-quo" id="status-quo">
      <Container className="flex flex-col gap-5 px-6">
        <SectionHeader action={section.action} eyebrow={section.eyebrow} heading={section.headline} />
        <div className="grid min-h-[614px] grid-cols-2 gap-2.5 max-md:grid-cols-1">
          {section.items.map((item) => (
            <NumberedCard className="min-h-[302px]" key={item.number} {...item} />
          ))}
        </div>
      </Container>
    </SectionBand>
  )
}
