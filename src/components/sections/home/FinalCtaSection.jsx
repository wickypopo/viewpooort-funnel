import { BrowserMockup } from "@/components/site";
import { IconTextButton } from "@/components/ui";
import { siteData } from "@/data.js";

export function FinalCtaSection() {
  const { finalCta } = siteData;
  const [mutedHeadline, strongHeadline] = finalCta.headline.split(", ");

  return (
    <section
      className="hero-background flex h-[850px] flex-col items-center overflow-hidden px-6 pt-20 pb-0"
      data-section="final-cta"
      id="final-cta"
    >
      <div className="flex w-full flex-col items-center gap-[25px] text-center">
        <h2 className="type-hero max-w-[1200px] text-white">
          <span className="text-white/70">{mutedHeadline},</span>
          <br />
          {strongHeadline}
        </h2>
        <IconTextButton as="a" href="/contact">
          {finalCta.action}
        </IconTextButton>
      </div>
      <BrowserMockup
        alt={finalCta.mockup.headline}
        className="mt-10 h-[555px] w-full max-w-[1049px]"
        image={siteData.assets.heroScreen}
        mobileImage={siteData.assets.heroScreenMobile}
        imageClassName="h-[649px] object-cover object-top max-md:h-[420px]"
      />
    </section>
  );
}
