import { SectionBand } from '@/components/site'
import { Container, SectionHeader } from '@/components/ui'
import { siteData } from '@/data.js'

export function AboutSection() {
  const { about } = siteData

  return (
    <SectionBand data-section="about" id="about" variant="dark">
      <Container className="flex flex-col gap-5 px-6">
        <SectionHeader action={about.action} eyebrow={about.eyebrow} heading={about.headline} inverse />
        <img
          alt=""
          className="h-[614px] w-full rounded-[8px] object-cover object-center max-md:h-[420px]"
          src={siteData.assets.aboutPortrait}
        />
        <p className="type-body max-w-[612px] text-white/80">{about.copy}</p>
      </Container>
    </SectionBand>
  )
}
