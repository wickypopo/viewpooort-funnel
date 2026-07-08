import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout.jsx";
import { SectionBand } from "@/components/site";
import { Button, Card, Container } from "@/components/ui";
import { siteData } from "@/data.js";
import { cn } from "@/lib/cn.js";
import { trackLeadEvent } from "@/lib/metaPixel.js";

const initialForm = {
  problems: [],
  budget: "",
  name: "",
  email: "",
  phone: "",
  website: "",
};

const web3FormsEndpoint = "https://api.web3forms.com/submit";

function formatConsent(consent) {
  if (!consent?.categories) {
    return "Keine Consent-Daten vorhanden";
  }

  return [
    `Notwendig: ${consent.categories.necessary ? "ja" : "nein"}`,
    `Analytics: ${consent.categories.analytics ? "ja" : "nein"}`,
    `Marketing: ${consent.categories.marketing ? "ja" : "nein"}`,
    consent.savedAt ? `Gespeichert am: ${consent.savedAt}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

function formatTracking(tracking) {
  const entries = Object.entries(tracking);

  if (entries.length === 0) {
    return "Keine Tracking-Parameter vorhanden";
  }

  return entries.map(([key, value]) => `${key}: ${value}`).join("\n");
}

function buildMailtoHref(payload) {
  const subject = payload?.subject || "Neue Projektanfrage über Viewpooort";
  const body = payload?.message || "";

  return `mailto:${siteData.brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactPage() {
  const { contactForm } = siteData;
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fallbackMailto, setFallbackMailto] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const step = contactForm.steps[stepIndex];

  const canContinue = useMemo(() => {
    if (step.id === "problems") {
      return form.problems.length > 0;
    }

    if (step.id === "budget") {
      return Boolean(form.budget);
    }

    return Boolean(form.name && form.email && form.phone);
  }, [form, step.id]);

  function toggleProblem(problem) {
    setForm((current) => {
      const isSelected = current.problems.includes(problem);

      return {
        ...current,
        problems: isSelected
          ? current.problems.filter((item) => item !== problem)
          : [...current.problems, problem],
      };
    });
  }

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function getTrackingData() {
    const searchParams = new URLSearchParams(window.location.search);
    const trackingKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "gbraid", "wbraid", "fbclid"];

    return trackingKeys.reduce((tracking, key) => {
      const value = searchParams.get(key);

      if (value) {
        tracking[key] = value;
      }

      return tracking;
    }, {});
  }

  function getConsentData() {
    try {
      const storedConsent = window.localStorage.getItem("viewpooort_cookie_consent");
      return storedConsent ? JSON.parse(storedConsent) : null;
    } catch {
      return null;
    }
  }

  async function submitLead() {
    setIsSubmitting(true);
    setSubmitError("");
    setFallbackMailto("");

    try {
      const accessKey = import.meta.env.VITE_FORM_ACCESS_KEY;
      const consent = getConsentData();
      const tracking = getTrackingData();
      const submittedAt = new Date().toISOString();

      if (!accessKey) {
        throw new Error("VITE_FORM_ACCESS_KEY fehlt.");
      }

      const message = [
        `Name: ${form.name}`,
        `E-Mail: ${form.email}`,
        `Telefon: ${form.phone}`,
        `Website: ${form.website || "Nicht angegeben"}`,
        `Budget: ${form.budget || "Nicht angegeben"}`,
        "",
        "Probleme:",
        form.problems.length > 0
          ? form.problems.map((problem) => `- ${problem}`).join("\n")
          : "Nicht angegeben",
        "",
        "Consent:",
        formatConsent(consent),
        "",
        "Tracking:",
        formatTracking(tracking),
        "",
        `Seite: ${window.location.href}`,
        `Referrer: ${document.referrer || "Nicht angegeben"}`,
        `Gesendet am: ${submittedAt}`,
      ].join("\n");

      const body = {
        access_key: accessKey,
        subject: "Neue Projektanfrage über Viewpooort",
        from_name: form.name,
        name: form.name,
        email: form.email,
        phone: form.phone,
        website: form.website || "Nicht angegeben",
        budget: form.budget || "Nicht angegeben",
        problems: form.problems.join(", ") || "Nicht angegeben",
        page: window.location.href,
        referrer: document.referrer || "Nicht angegeben",
        submitted_at: submittedAt,
        consent: formatConsent(consent),
        tracking: formatTracking(tracking),
        message,
      };
      const mailtoHref = buildMailtoHref(body);

      const response = await fetch(web3FormsEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      }).catch(() => {
        setFallbackMailto(mailtoHref);
        throw new Error("Der Formularanbieter blockiert den Versand aktuell. Bitte nutze den E-Mail-Link unten.");
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success === false) {
        setFallbackMailto(mailtoHref);
        throw new Error(result?.message || "Web3Forms konnte die Anfrage nicht verarbeiten.");
      }

      trackLeadEvent({
        content_name: "Project inquiry",
        currency: "EUR",
        value: 1,
      });

      setSubmitted(true);
    } catch (error) {
      setSubmitError(`Die Anfrage konnte nicht gesendet werden. ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  function goNext() {
    if (!canContinue) {
      return;
    }

    if (stepIndex < contactForm.steps.length - 1) {
      setStepIndex((current) => current + 1);
      return;
    }

    submitLead();
  }

  return (
    <SiteLayout>
      <SectionBand className="min-h-[calc(100svh-62px)]" variant="dark">
        <Container className="flex items-center justify-center p-8">
          <Card className="bg-white p-8 shadow-2xl max-md:p-6">
            {submitted ? (
              <div className="flex min-h-[420px] flex-col justify-center gap-5">
                <p className="type-eyebrow text-[#1f75d8]">Abgeschlossen</p>
                <h2 className="type-section-heading text-black">
                  {contactForm.actions.sent}
                </h2>
                <p className="type-body text-black/60">
                  Deine Angaben wurden gesendet. Ich melde mich zeitnah bei
                  dir mit einer Einschätzung zu deinem Projekt.
                </p>
              </div>
            ) : (
              <form
                className="flex min-h-[520px] flex-col"
                onSubmit={(event) => {
                  event.preventDefault();
                  goNext();
                }}
              >
                <div className="mb-8 flex items-center justify-between gap-6">
                  <div>
                    <p className="type-eyebrow text-[#1f75d8]">
                      {step.eyebrow}
                    </p>
                    <h2 className="type-section-heading mt-3 text-black">
                      {step.title}
                    </h2>
                  </div>
                  <p className="type-body-strong shrink-0 text-black/40">
                    {stepIndex + 1}/{contactForm.steps.length}
                  </p>
                </div>

                {step.id === "problems" ? (
                  <div className="grid gap-3">
                    {step.options.map((option) => {
                      const selected = form.problems.includes(option);

                      return (
                        <button
                          aria-pressed={selected}
                          className={cn(
                            "type-body-strong rounded-[8px] border p-5 text-left transition",
                            selected
                              ? "border-[#1f75d8] bg-[#e6ecf4] text-black"
                              : "border-black/10 bg-white text-black/70 hover:border-[#1f75d8]/50",
                          )}
                          key={option}
                          onClick={() => toggleProblem(option)}
                          type="button"
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                {step.id === "budget" ? (
                  <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                    {step.options.map((option) => (
                      <button
                        aria-pressed={form.budget === option}
                        className={cn(
                          "type-card-title rounded-[8px] border p-6 text-left transition",
                          form.budget === option
                            ? "border-[#1f75d8] bg-[#e6ecf4] text-black"
                            : "border-black/10 bg-white text-black/70 hover:border-[#1f75d8]/50",
                        )}
                        key={option}
                        onClick={() => updateField("budget", option)}
                        type="button"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : null}

                {step.id === "contact" ? (
                  <div className="grid gap-4">
                    {[
                      ["name", "text", true],
                      ["email", "email", true],
                      ["phone", "tel", true],
                      ["website", "text", false],
                    ].map(([field, type, required]) => (
                      <label className="grid gap-2" key={field}>
                        <span className="type-body-strong text-black">
                          {contactForm.fields[field]}
                        </span>
                        <input
                          className="type-body rounded-[8px] border border-black/10 bg-white px-4 py-4 text-black outline-none transition placeholder:text-black/30 focus:border-[#1f75d8]"
                          onChange={(event) =>
                            updateField(field, event.target.value)
                          }
                          placeholder={contactForm.fields[field]}
                          required={required}
                          type={type}
                          value={form[field]}
                        />
                      </label>
                    ))}
                  </div>
                ) : null}

                <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                  <button
                    className="type-action text-[#0a6bda] underline disabled:pointer-events-none disabled:opacity-0"
                    disabled={stepIndex === 0}
                    onClick={() =>
                      setStepIndex((current) => Math.max(0, current - 1))
                    }
                    type="button"
                  >
                    {contactForm.actions.back}
                  </button>
                  <Button disabled={!canContinue || isSubmitting} type="submit" variant="solid">
                    {isSubmitting
                      ? "Wird gesendet ..."
                      : stepIndex === contactForm.steps.length - 1
                        ? contactForm.actions.submit
                        : contactForm.actions.next}
                  </Button>
                </div>
                {submitError ? (
                  <div className="type-body grid gap-2 pt-4 text-[#b42318]">
                    <p>{submitError}</p>
                    {fallbackMailto ? (
                      <a className="font-semibold underline underline-offset-2" href={fallbackMailto}>
                        Anfrage direkt per E-Mail senden
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </form>
            )}
          </Card>
        </Container>
      </SectionBand>
    </SiteLayout>
  );
}
