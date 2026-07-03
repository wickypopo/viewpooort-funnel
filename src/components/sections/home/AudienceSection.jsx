import { SectionBand } from '@/components/site'
import { Container, NumberedCard, SectionHeader } from '@/components/ui'
import { siteData } from '@/data.js'

export function AudienceSection() {
  const section = siteData.audience

  return (
    <SectionBand data-section="audience" id="audience" variant="dark">
      <Container className="flex flex-col gap-5 px-6">
        <SectionHeader action={section.action} eyebrow={section.eyebrow} heading={section.headline} inverse />
        <div className="grid grid-cols-3 gap-2.5 max-md:grid-cols-1">
          {section.items.map((item) => (
            <NumberedCard className="min-h-[350px]" key={item.number} {...item} />
          ))}
        </div>
      </Container>
    </SectionBand>
  )
}
