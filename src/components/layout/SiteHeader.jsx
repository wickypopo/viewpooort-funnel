import { CtaLink } from "@/components/ui";
import { siteData } from "@/data.js";

export function SiteHeader() {
  return (
    <header
      className="flex h-[62px] items-center justify-between px-[50px] max-md:px-6"
      data-layout="site-header"
    >
      <a className="type-serif text-4xl text-black no-underline" href="/">
        {siteData.brand.name}
      </a>
      <div className="hidden sm:block">
        <CtaLink>{siteData.navigation.primaryAction}</CtaLink>
      </div>
    </header>
  );
}
