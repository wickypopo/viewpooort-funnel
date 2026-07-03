import { ProjectCard, SectionBand } from '@/components/site'
import { Container, SectionHeader } from '@/components/ui'
import { siteData } from '@/data.js'

export function ProjectShowcaseSection() {
  const section = siteData.caseStudies

  return (
    <SectionBand data-section="projects" id="projects">
      <Container className="flex flex-col gap-5 px-6">
        <SectionHeader action={section.action} eyebrow={section.eyebrow} heading={section.headline} />
        <div className="grid grid-cols-2 gap-x-2.5 gap-y-[30px] max-md:grid-cols-1">
          {section.items.map((project) => (
            <ProjectCard imageAlt={project.title} key={project.title} {...project} />
          ))}
        </div>
      </Container>
    </SectionBand>
  )
}
