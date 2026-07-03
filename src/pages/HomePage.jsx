import { SiteLayout } from '@/components/layout/SiteLayout.jsx'
import {
  AboutSection,
  AudienceSection,
  ClientLogosSection,
  CollaborationBenefitsSection,
  FinalCtaSection,
  HeroSection,
  ProblemSection,
  ProcessSection,
  ProjectShowcaseSection,
  StartupGrantSection,
} from '@/components/sections/home'

export function HomePage() {
  return (
    <SiteLayout>
      <HeroSection />
      <ClientLogosSection />
      <ProblemSection />
      <AboutSection />
      <CollaborationBenefitsSection />
      <AudienceSection />
      <ProjectShowcaseSection />
      <StartupGrantSection />
      <ProcessSection />
      <FinalCtaSection />
    </SiteLayout>
  )
}
