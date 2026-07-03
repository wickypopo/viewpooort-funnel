import { SectionBand } from "@/components/site";
import { Container, SectionHeader } from "@/components/ui";
import { siteData } from "@/data.js";

export function AboutSection() {
  const { about } = siteData;

  return (
    <SectionBand data-section="about" id="about" variant="dark">
      <Container className="flex flex-col gap-5 px-6">
        <SectionHeader
          action={about.action}
          eyebrow={about.eyebrow}
          heading={about.headline}
          inverse
        />
        <figure className="relative overflow-hidden rounded-[8px]">
          <img
            alt=""
            className="h-[614px] w-full object-cover object-center max-md:h-[420px] max-md:object-[55%_center]"
            src={siteData.assets.aboutPortrait}
          />
          <figcaption className="absolute bottom-[30%] left-[55px] text-black max-md:bottom-[25px] max-md:left-5">
            <p className="type-card-title">{about.person.name}</p>
            <p className="type-body text-black/70">{about.person.role}</p>
          </figcaption>
        </figure>
        <p className="type-body max-w-[612px] text-white/80">{about.copy}</p>
      </Container>
    </SectionBand>
  );
}
