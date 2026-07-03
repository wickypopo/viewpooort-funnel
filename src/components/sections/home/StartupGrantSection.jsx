import { CalculationList } from "@/components/site";
import { Card, Container, CtaLink } from "@/components/ui";
import { SectionBand } from "@/components/site";
import { siteData } from "@/data.js";

export function StartupGrantSection() {
  const section = siteData.startupGrant;

  return (
    <SectionBand data-section="startup-grant" id="startup-grant" variant="dark">
      <Container className="flex flex-col gap-5 px-6">
        <p className="type-eyebrow text-white">{section.eyebrow}</p>
        <h2 className="type-section-heading max-w-[1050px] text-white">
          {section.headline}
        </h2>
        <div className="grid grid-cols-[1fr_750px] gap-2.5 max-lg:grid-cols-1">
          <Card className="flex min-h-[504px] flex-col justify-between gap-10">
            <div className="flex flex-col gap-[17px]">
              <h3 className="type-card-title text-black">
                {section.card.title}
              </h3>
              <p className="type-body text-black/60">{section.card.copy}</p>
            </div>
            <CalculationList
              items={section.card.calculation}
              title={section.card.calculationTitle}
            />
            <CtaLink className="self-start">{section.card.action}</CtaLink>
          </Card>
          <div className="h-full overflow-hidden rounded-[8px] bg-[#e6ecf4] max-md:h-[320px] hidden md:block">
            <img
              alt=""
              className="size-full rounded-[8px] object-cover object-top"
              src={section.image}
            />
          </div>
        </div>
      </Container>
    </SectionBand>
  );
}
