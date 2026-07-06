import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Globe2,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { CookieConsent } from "@/components/site";
import { funnelData } from "@/data-funnel.js";
import { siteData } from "@/data.js";
import { trackLeadEvent } from "@/lib/metaPixel.js";

const img = {
  hero: "/images/funnel/hero-bg.jpg",
  team: "/images/funnel/team.jpg",
  cta: "/images/funnel/cta-bg.jpg",
  refs: [
    "/images/figma/project-ads-economy.jpg",
    "/images/figma/hero-watch-screen.jpg",
    "/images/figma/em.jpg",
    "/images/figma/ym.jpg",
    "/images/figma/am.jpg",
    "/images/figma/sg.jpg",
  ],
  features: [
    "/images/funnel/feature-premium.jpg",
    "/images/funnel/feature-branch.jpg",
    "/images/funnel/feature-speed.jpg",
    "/images/funnel/feature-ai.jpg",
  ],
};

const navItems = [
  ["Startseite", "#hero"],
  ["Referenzen", "#referenzen"],
  ["Leistungen", "#leistungen"],
  ["FAQ", "#faq"],
  ["Kontakt", "#kontakt"],
];

const ctaHref =
  "https://wa.me/4915906498022?text=Hi%2C+ich+m%C3%B6chte+meinen+kostenlosen+Website-Entwurf.+Meine+Branche+ist%3A+___";
const featureIcons = [Sparkles, Zap, Globe2, ShieldCheck];
const referenceCards = img.refs.map((src, index) => {
  const brand =
    siteData.clients.items[index] ?? `Viewpooort Kunde ${index + 1}`;

  return {
    src,
    brand,
    url: `${brand.toLowerCase().replaceAll(" ", "-")}.viewpooort.com`,
  };
});
const countdownDurationMs = ((7 * 60 + 34) * 60 + 29) * 1000;
const countdownStorageKey = "viewpooort-funnel-deadline";
const oldOfferValue = "1.637 Euro";
const savingsValue = "1.138€";

function trackFunnelLeadClick() {
  trackLeadEvent({
    content_name: "Funnel CTA",
    content_category: "angebot",
    value: 499,
    currency: "EUR",
  });
}

function createCountdownDeadline() {
  const nextDeadline = Date.now() + countdownDurationMs;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(countdownStorageKey, String(nextDeadline));
  }

  return nextDeadline;
}

function resolveCountdownDeadline() {
  if (typeof window === "undefined") {
    return Date.now() + countdownDurationMs;
  }

  const storedDeadline = Number(
    window.localStorage.getItem(countdownStorageKey),
  );
  return storedDeadline > Date.now()
    ? storedDeadline
    : createCountdownDeadline();
}

function getCountdownParts(deadline) {
  const totalSeconds = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [days, hours, minutes, seconds].map((part) =>
    String(part).padStart(2, "0"),
  );
}

function BrandMark() {
  return (
    <a href="#hero" className="flex h-8 items-center gap-2 md:gap-3">
      <span className="grid size-8 place-items-center rounded-xl bg-[#1f75d8] text-sm font-bold text-white">
        V
      </span>
      <span className="font-['Sora'] text-[16px] font-bold tracking-[-0.03em] text-[#101828] md:text-[18px]">
        Viewpooort
      </span>
    </a>
  );
}

function CtaButton({
  children,
  href = ctaHref,
  className = "",
  withArrow = false,
}) {
  return (
    <a
      href={href}
      onClick={trackFunnelLeadClick}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#1f75d8] px-5 text-center font-['Plus_Jakarta_Sans'] font-bold text-white shadow-lg shadow-[#1f75d8]/25 transition hover:bg-[#1767c3] ${className}`}
    >
      {children}
      {withArrow ? <ArrowRight className="size-4" /> : null}
    </a>
  );
}

function FunnelHeader() {
  return (
    <header className="sticky top-0 z-50 h-16 bg-[#e8e8ee] md:bg-[#e8e8ee]/95 md:shadow-md md:shadow-black/10 md:backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-[1216px] items-center justify-between gap-3 overflow-hidden px-4 md:px-8">
        <BrandMark />
        <nav className="hidden items-center gap-8 font-['Plus_Jakarta_Sans'] text-sm text-[#4a5565] md:flex">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="transition hover:text-[#1f75d8]"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <RatingBadge />
          <CtaButton className="h-9 rounded-xl px-4 text-sm">
            Jetzt Entwurf anfordern
          </CtaButton>
        </div>
        <CtaButton className="h-9 min-w-[150px] shrink-0 rounded-xl px-4 text-[13px] md:hidden">
          Entwurf anfordern
        </CtaButton>
      </div>
    </header>
  );
}

function CountdownTimer() {
  const [deadline, setDeadline] = useState(resolveCountdownDeadline);
  const [parts, setParts] = useState(() => getCountdownParts(deadline));

  useEffect(() => {
    const tick = () => {
      if (deadline <= Date.now()) {
        const nextDeadline = createCountdownDeadline();
        setDeadline(nextDeadline);
        setParts(getCountdownParts(nextDeadline));
        return;
      }

      setParts(getCountdownParts(deadline));
    };

    tick();
    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, [deadline]);

  return (
    <div className="flex items-center gap-1 font-['JetBrains_Mono'] text-[10px] md:text-xs">
      {parts.map((part, index) => (
        <span key={`${part}-${index}`} className="flex items-center gap-1">
          <span className="rounded bg-[#f3f4f6] px-1.5 py-0.5 font-bold text-[#1e2939]">
            {part}
          </span>
          {index < 3 ? <span className="text-[#d1d5dc]">:</span> : null}
        </span>
      ))}
    </div>
  );
}

function PromoBar() {
  return (
    <div className="h-9 border-b border-[#e5e7eb] bg-white">
      <div className="mx-auto flex h-full max-w-[1216px] items-center justify-between px-3 md:px-8">
        <CountdownTimer />
        <p className="hidden font-['Plus_Jakarta_Sans'] text-xs text-[#6a7282] md:block">
          <span>Setup-Gebühr: </span>
          <strong className="text-[#1f75d8]">
            {funnelData.offer.setupPrice}
          </strong>
          <span className="px-3 text-[#d1d5dc]">·</span>
          <span>+ Support ab 7,90€/Mo.</span>
          <span className="px-3 text-[#d1d5dc]">·</span>
          <span>72 Stunden Express</span>
          <span className="px-3 text-[#d1d5dc]">·</span>
          <span>mit Zufriedenheitsgarantie oder du zahlst 0€</span>
        </p>
        <a
          href={ctaHref}
          className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold text-[#1f75d8] md:text-xs"
        >
          jetzt anfragen
        </a>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#07152f] text-white"
    >
      <img
        src={img.hero}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#07152f]/40 via-[#07152f]/75 to-[#07152f]" />
      <div className="absolute left-10 top-20 size-72 rounded-full bg-[#1f75d8]/18 blur-[50px]" />
      <div className="absolute bottom-20 right-10 size-96 rounded-full bg-[#1f75d8]/14 blur-[60px]" />

      <div className="relative mx-auto max-w-[1216px] px-4 pb-16 pt-8 md:px-8 md:pb-20 md:pt-12">
        <div className="mx-auto flex min-h-[50px] w-full max-w-[358px] items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 font-['Plus_Jakarta_Sans'] text-xs font-medium uppercase leading-4 tracking-[0.05em] text-white/80 backdrop-blur md:min-h-[38px] md:max-w-max md:text-sm">
          <span className="size-2 shrink-0 rounded-full bg-[#1f75d8]" />
          <span className="min-w-0 flex-1 text-wrap">
            Warum tausende zahlen wenn es auch einfacher geht
          </span>
        </div>

        <div className="mx-auto mt-6 max-w-[860px] text-center md:mt-8">
          <h1 className="font-['Sora'] text-[30px] font-extrabold leading-[31.5px] tracking-0 md:text-[72px] md:leading-[75.6px]">
            <span className="block text-white">Deine professionelle</span>
            <span className="block text-[#5eb2ff]">Website in 72 Stunden!</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[700px] font-['Plus_Jakarta_Sans'] text-sm font-semibold uppercase leading-5 tracking-[0.025em] text-white/60 md:text-lg md:leading-7">
            Wir sind die Agentur, die anders arbeitet: Kein Technikstress, keine
            langen Wartezeiten. Wir bauen deine Website fertig in 72h.
          </p>
          <p className="mx-auto mt-4 max-w-[670px] font-['Plus_Jakarta_Sans'] text-xs leading-4 text-white/40 md:text-sm md:leading-5">
            Die meisten Agenturen verlangen{" "}
            <strong className="font-bold text-white/80">TAUSENDE EURO</strong>{" "}
            und brauchen Wochen für eine einfache Website. Bei viewpooort
            bekommst du Agentur-Qualität zum Festpreis - genau wie{" "}
            <strong className="font-bold text-white/80">
              500+ zufriedene Kunden
            </strong>{" "}
            vor dir.
          </p>
        </div>

        <div className="mt-7 grid gap-6 lg:grid-cols-[590px_1fr] lg:items-start">
          <div>
            <OfferCard />
            <div className="mt-4 flex flex-col items-start gap-3 md:grid md:grid-cols-3 lg:max-w-[590px]">
              <TrustCard title="TOP DIENSTLEISTER 2026" />
              <TrustCard title="TOP EMPFEHLUNG 2026" />
              <GoogleCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustCard({ title }) {
  const [first, second, year] = title.split(" ");
  return (
    <div className="h-[55.5px] w-full rounded-xl border border-white/10 bg-white/5 p-3 font-['Plus_Jakarta_Sans'] backdrop-blur md:w-auto">
      <div className="flex items-center justify-center gap-2">
        <p className="text-[9px] leading-[11px] text-white/40">
          Kundenmeinungen
          <br />
          der letzten 12 Monate
        </p>
        <p className="text-[10px] font-bold leading-[12.5px] text-white">
          {first} {second} {year}
        </p>
      </div>
    </div>
  );
}

function GoogleCard() {
  return (
    <div className="flex  h-[49px] w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 font-['Plus_Jakarta_Sans'] backdrop-blur md:w-auto">
      <div className="flex gap-1">
        <img
          src="/images/Google_Favicon.webp"
          className="size-4 fill-[#fdc700] text-[#fdc700]"
        />
        <span className="text-xs text-[#fdc700]">★★★★★</span>
      </div>

      <div className="leading-none">
        <p className="text-xs font-bold text-white">5.0</p>
        <p className="mt-1 text-[10px] text-white/60">Google Bewertungen</p>
      </div>
    </div>
  );
}

function OfferCard() {
  return (
    <aside className="relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 font-['Plus_Jakarta_Sans'] text-white backdrop-blur-xl lg:mt-0 lg:p-7">
      <div className="absolute -right-10 -top-10 size-40 rounded-full bg-[#1f75d8]/25 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 size-32 rounded-full bg-[#1f75d8]/18 blur-3xl" />
      <div className="relative">
        <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.05em] text-[#05df72] md:text-xs">
          <span className="size-2 rounded-full bg-[#05df72]" />
          Launch-Angebot gilt nur jetzt!
        </p>
        <div className="mt-5 flex items-end gap-4">
          <p className="font-['Sora'] text-4xl font-extrabold leading-none md:text-6xl">
            {funnelData.offer.setupPrice}
          </p>
          <p className="pb-1 text-base font-medium text-[#5eb2ff]/60 line-through md:text-lg">
            {oldOfferValue}
          </p>
        </div>
        <p className="mt-5 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center text-xs text-white/70 md:text-sm">
          → Du sparst <strong className="text-white">{savingsValue}</strong>
        </p>
        <p className="mt-4 inline-flex rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.05em] text-white/70 md:text-xs">
          Deine Vorteile im Überblick
        </p>
        <ul className="mt-5 space-y-4">
          {funnelData.hero.benefits.map((item) => (
            <li key={item.title} className="grid grid-cols-[20px_1fr] gap-3">
              <span className="grid size-5 place-items-center rounded-full bg-[#1f75d8]">
                <Check className="size-3 text-white" />
              </span>
              <span>
                <span className="block text-xs font-bold leading-4 text-white md:text-sm">
                  {item.title}
                </span>
                <span className="mt-1 block text-[10px] leading-[15px] text-white/40 md:text-xs md:leading-5">
                  {item.description}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-xs font-bold uppercase tracking-[0.06em] text-white/60 md:text-sm">
          Gesamtwert: über {oldOfferValue}
        </p>
        <CtaButton
          className="mt-4 min-h-[60px] w-full rounded-xl text-base md:min-h-[64px]"
          withArrow
        >
          Ja, ich will meine Website
        </CtaButton>
        <p className="mt-2 text-center text-xs text-white/50">
          Nur noch 2/5 Plätze diese Woche verfügbar
        </p>
      </div>
    </aside>
  );
}

function StatsSection() {
  const stats = [
    ["500+", "zufriedene Kunden"],
    ["72h", "bis zur fertigen Website"],
    ["Mio €", "Umsatz für unsere Kunden generiert"],
    ["5 Jahre", "Erfahrung im Webdesign"],
  ];

  return (
    <section className="bg-[#07152f] py-8 text-white md:py-12">
      <div className="mx-auto grid max-w-[1216px] grid-cols-2 gap-5 px-4 text-center md:grid-cols-4 md:px-8">
        {stats.map(([value, label]) => (
          <div key={label}>
            <p className="font-['Sora'] text-2xl font-extrabold md:text-4xl">
              {value}
            </p>
            <p className="mx-auto mt-2 max-w-[130px] font-['Plus_Jakarta_Sans'] text-[10px] leading-[15px] text-white/40 md:text-xs">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReferencesSection() {
  const topRow = referenceCards.slice(0, 3);
  const bottomRow = referenceCards.slice(3, 6);

  return (
    <section
      id="referenzen"
      className="relative overflow-hidden bg-[#f5f5f7] py-12 text-[#101828] md:py-20"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#f5f5f7] to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#f5f5f7] to-transparent md:w-28" />

      <div className="mx-auto max-w-[760px] px-4 text-center md:px-8">
        <p className="mx-auto inline-flex rounded-full border border-[#1f75d8]/25 bg-[#1f75d8]/5 px-5 py-2 font-['Plus_Jakarta_Sans'] text-xs font-semibold uppercase tracking-[0.08em] text-[#1f75d8]">
          Ergebnis Gallery
        </p>
        <h2 className="mt-5 font-['Sora'] text-[30px] font-extrabold uppercase leading-[36px] text-[#101828] md:text-5xl md:leading-tight">
          Echte Websites von{" "}
          <span className="text-[#1f75d8]">echten Kunden</span>
        </h2>
        <p className="mx-auto mt-5 max-w-[620px] font-['Plus_Jakarta_Sans'] text-sm leading-6 text-[#99a1af] md:text-base md:leading-7">
          {funnelData.references.text}
        </p>
      </div>

      <div className="reference-gallery mt-10 md:mt-14">
        <ReferenceMarquee cards={topRow} direction="left" />
        <ReferenceMarquee
          cards={bottomRow}
          direction="right"
          className="-mt-2 md:-mt-4"
        />
      </div>

      <div className="mx-auto max-w-[1216px] px-4 md:px-8">
        <p className="mt-9 text-center font-['Plus_Jakarta_Sans'] text-sm text-[#99a1af]">
          Bereits <span className="font-bold text-[#1f75d8]">50+</span> Websites
          erfolgreich umgesetzt
        </p>
      </div>
    </section>
  );
}

function ReferenceMarquee({ cards, direction, className = "" }) {
  const repeatedCards = [...cards, ...cards, ...cards, ...cards];

  return (
    <div className={`reference-marquee ${className}`}>
      <div
        className={`reference-marquee-track ${
          direction === "right"
            ? "reference-marquee-track--right"
            : "reference-marquee-track--left"
        }`}
      >
        {repeatedCards.map((card, index) => (
          <ReferenceCard key={`${card.src}-${index}`} card={card} />
        ))}
      </div>
    </div>
  );
}

function ReferenceCard({ card }) {
  return (
    <article className="reference-card">
      <div className="flex h-8 items-center gap-1.5 border-b border-[#edf0f4] px-3">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="ml-3 min-w-0 truncate font-['Plus_Jakarta_Sans'] text-[10px] font-semibold text-[#c0c7d2]">
          {card.url}
        </span>
      </div>
      <div className="relative overflow-hidden">
        <img
          src={card.src}
          alt={`${card.brand} Website`}
          className="reference-card-image"
        />
      </div>
    </article>
  );
}

function ProcessSection() {
  return (
    <section className="bg-[#07152f] py-14 text-white md:py-20" id="prozess">
      <div className="mx-auto max-w-[820px] px-4 md:px-8">
        <SectionTitle
          eyebrow="So einfach geht's"
          title={
            <>
              In 3 Schritten zu deiner{" "}
              <span className="text-[#5eb2ff]">Website</span>
            </>
          }
          text={funnelData.process.text}
        />
        <div className="mx-auto mt-10 max-w-[660px] space-y-8">
          {funnelData.process.steps.map((step, index) => (
            <div
              key={step.title}
              className="grid grid-cols-[32px_1fr] gap-4 font-['Plus_Jakarta_Sans']"
            >
              <div className="grid size-8 place-items-center rounded-full bg-[#1f75d8] text-xs font-bold">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-['Sora'] text-sm font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-white/45">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <CtaButton className="h-10 rounded-xl px-5 text-xs" withArrow>
            Jetzt starten - kostenlos
          </CtaButton>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const cards = funnelData.features.cards.slice(0, 4);

  return (
    <section id="leistungen" className="bg-[#f5f5f7] py-12 md:py-20">
      <div className="mx-auto max-w-[1216px] px-4 md:px-8">
        <SectionTitle
          title={
            <>
              Ihre Premium{" "}
              <span className="text-[#1f75d8]">viewpooort Website</span>
            </>
          }
          dark={false}
        />
        <p className="mt-4 text-center font-['Plus_Jakarta_Sans'] text-xs text-[#6a7282]">
          Lerne viewpooort kennen.
        </p>
        <FeatureCarousel cards={cards} />
        <MiniPriceCard />
      </div>
    </section>
  );
}

function FeatureCarousel({ cards }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + cards.length) % cards.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % cards.length);
  };

  return (
    <>
      <div className="relative mt-8 md:hidden">
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {cards.map((card, index) => (
              <div key={card.title} className="min-w-full">
                <FeatureCard card={card} index={index} />
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          aria-label="Vorherige Leistung"
          onClick={showPrevious}
          className="absolute left-3 bottom-4 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-[#07152f]/70 text-white shadow-lg backdrop-blur"
        >
          <ArrowLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Nächste Leistung"
          onClick={showNext}
          className="absolute right-3 bottom-4 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-[#07152f]/70 text-white shadow-lg backdrop-blur"
        >
          <ArrowRight className="size-5" />
        </button>
        <div className="mt-4 flex justify-center gap-2">
          {cards.map((card, index) => (
            <button
              type="button"
              key={card.title}
              aria-label={`Leistung ${index + 1} anzeigen`}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${
                activeIndex === index ? "w-6 bg-[#1f75d8]" : "w-2 bg-[#d1d5dc]"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 hidden gap-4 md:grid md:grid-cols-4">
        {cards.map((card, index) => (
          <FeatureCard key={card.title} card={card} index={index} />
        ))}
      </div>
    </>
  );
}

function FeatureCard({ card, index }) {
  const Icon = featureIcons[index] ?? Sparkles;
  return (
    <article className="relative min-h-[330px] w-full overflow-hidden rounded-2xl bg-[#07152f] p-5 text-white">
      <img
        src={img.features[index]}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-42 grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07152f] via-[#07152f]/74 to-[#07152f]/20" />
      <div className="relative flex h-full flex-col justify-between">
        <div>
          <span className="grid size-10 place-items-center rounded-xl bg-white/10">
            <Icon className="size-5 text-[#5eb2ff]" />
          </span>
          <p className="mt-5 font-['Plus_Jakarta_Sans'] text-[10px] font-bold uppercase tracking-[0.08em] text-[#5eb2ff]">
            {card.tag}
          </p>
          <h3 className="mt-3 font-['Sora'] text-lg font-bold leading-tight">
            {card.title}
          </h3>
        </div>
        <p className="font-['Plus_Jakarta_Sans'] text-xs leading-5 text-white/55">
          {card.description}
        </p>
      </div>
    </article>
  );
}

function MiniPriceCard() {
  return (
    <div className="mt-8 w-full rounded-2xl bg-white p-5 text-center shadow-xl shadow-black/10">
      <p className="font-['Sora'] text-4xl font-extrabold text-[#101828]">
        {funnelData.offer.setupPrice}
      </p>
      <p className="mt-1 font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#1f75d8]">
        {funnelData.features.priceLine}
      </p>
      <div className="mt-5 grid grid-cols-2 gap-2 text-left font-['Plus_Jakarta_Sans'] text-[10px] text-[#6a7282]">
        {funnelData.features.included.map((item) => (
          <p key={item} className="flex gap-2">
            <Check className="mt-0.5 size-3 shrink-0 text-[#1f75d8]" />
            {item}
          </p>
        ))}
      </div>
      <CtaButton className="mt-5 h-11 w-full rounded-xl text-xs" withArrow>
        Entwurf per WhatsApp erhalten
      </CtaButton>
    </div>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="bg-[#07152f] py-14 text-white md:py-20">
      <div className="mx-auto max-w-[760px] px-4 md:px-8">
        <SectionTitle
          eyebrow="Häufig gestellte Fragen"
          title={`Alles was du über das ${funnelData.offer.setupPrice} Paket wissen musst`}
        />
        <div className="mt-8 space-y-3">
          {funnelData.faq.items.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 font-['Plus_Jakarta_Sans']"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
                {item.question}
                <ChevronDown className="size-5 shrink-0 text-white/40 group-open:rotate-180" />
              </summary>
              <p className="mt-4 text-xs leading-5 text-white/50">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <h3 className="font-['Sora'] text-xl font-bold">Noch Fragen?</h3>
          <p className="mt-3 font-['Plus_Jakarta_Sans'] text-sm text-white/50">
            Schreib uns einfach per WhatsApp und wir helfen dir weiter
          </p>
          <CtaButton className="mt-6 min-h-[56px] w-full rounded-xl text-base md:w-auto">
            Jetzt per WhatsApp fragen
          </CtaButton>
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section
      id="kontakt"
      className="relative overflow-hidden bg-[#07152f] py-20 text-white md:py-24"
    >
      <img
        src={img.cta}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-[#07152f]/72" />
      <div className="relative mx-auto max-w-[760px] px-4 text-center md:px-8">
        <h2 className="font-['Sora'] text-[30px] font-extrabold leading-[37.5px] md:text-6xl md:leading-tight">
          Bereit für deine <span className="text-[#5eb2ff]">neue Website?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-[620px] font-['Plus_Jakarta_Sans'] text-sm leading-5 text-white/60 md:text-base md:leading-7">
          {funnelData.ctaSection.text}
        </p>
        <CtaButton
          className="mt-8 min-h-[76px] w-full rounded-2xl text-lg md:min-h-[60px] md:w-auto"
          withArrow
        >
          Kostenlosen Entwurf anfordern
        </CtaButton>
        <p className="mt-5 font-['Plus_Jakarta_Sans'] text-xs text-white/30">
          Einmalig {funnelData.offer.setupPrice} · Kein Abo ·
          Zufriedenheitsgarantie
        </p>
      </div>
    </section>
  );
}

function FunnelFooter() {
  return (
    <footer className="border-t border-[#e5e7eb] bg-white py-14 font-['Plus_Jakarta_Sans'] text-[#101828]">
      <div className="mx-auto max-w-[1216px] px-4 md:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-9 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <BrandMark />
            <p className="mt-5 max-w-[280px] text-sm leading-6 text-[#6a7282]">
              Professionelle Websites zum Festpreis. In 72 Stunden online.
            </p>
          </div>
          {funnelData.footer.columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-['Sora'] text-sm font-semibold">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-[#6a7282]">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href={
                        link === "Impressum"
                          ? "/impressum"
                          : link === "Datenschutz"
                            ? "/datenschutz"
                            : "#hero"
                      }
                      className="hover:text-[#1f75d8]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center gap-5 border-t border-[#e5e7eb] pt-6 text-xs text-[#99a1af] md:flex-row md:justify-between">
          <p>© 2026 viewpooort Deutschland</p>
          <RatingBadge />
          <p>viewpooort.com</p>
        </div>
      </div>
    </footer>
  );
}

function RatingBadge() {
  return (
    <span className="inline-flex h-8 items-center gap-1 rounded-full border border-[#e5e7eb] bg-white px-3 font-['Plus_Jakarta_Sans'] text-xs text-[#364153] shadow-sm">
      <Star className="size-4 fill-[#f6c945] text-[#f6c945]" />
      <span className="text-[#f6c945]">★★★★★</span>
      <strong>5.0</strong>
      <span className="hidden text-[#99a1af] md:inline">
        Google Bewertungen
      </span>
    </span>
  );
}

function SectionTitle({ eyebrow, title, text, dark = true }) {
  return (
    <div className="mx-auto max-w-[720px] text-center">
      {eyebrow ? (
        <p className="font-['Plus_Jakarta_Sans'] text-[10px] font-bold uppercase tracking-[0.12em] text-[#1f75d8] md:text-xs">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-3 font-['Sora'] text-[28px] font-extrabold leading-[34px] md:text-5xl md:leading-tight ${
          dark ? "text-white" : "text-[#101828]"
        }`}
      >
        {title}
      </h2>
      {text ? (
        <p
          className={`mx-auto mt-4 max-w-[640px] font-['Plus_Jakarta_Sans'] text-xs leading-5 md:text-sm ${
            dark ? "text-white/50" : "text-[#6a7282]"
          }`}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}

export function FunnelPage() {
  return (
    <>
      <FunnelHeader />
      <PromoBar />
      <main className="bg-[#07152f]">
        <HeroSection />
        <StatsSection />
        <ReferencesSection />
        <ProcessSection />
        <FeaturesSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <FunnelFooter />
      <a
        href={ctaHref}
        onClick={trackFunnelLeadClick}
        className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-xl shadow-green-500/30 transition hover:scale-105"
        aria-label="Kontakt aufnehmen"
      >
        <MessageCircle className="size-7" />
        <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-[#fb2c36] font-['Plus_Jakarta_Sans'] text-[10px] font-bold">
          2
        </span>
      </a>
      <CookieConsent />
    </>
  );
}
