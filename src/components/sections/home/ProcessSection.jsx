import { SectionBand } from '@/components/site'
import { Container, NumberedCard, SectionHeader } from '@/components/ui'
import { siteData } from '@/data.js'

export function ProcessSection() {
  const section = siteData.process

  return (
    <SectionBand data-section="process" id="process">
      <Container className="flex flex-col gap-5 px-6">
        <SectionHeader action={section.action} eyebrow={section.eyebrow} heading={section.headline} />
        <div className="grid grid-cols-4 gap-2.5 max-lg:grid-cols-2 max-md:grid-cols-1">
          {section.items.map((item) => (
            <NumberedCard className="min-h-[350px]" key={item.number} {...item} />
          ))}
        </div>
      </Container>
    </SectionBand>
  )
}
