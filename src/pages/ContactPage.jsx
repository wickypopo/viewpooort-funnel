import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout.jsx";
import { SectionBand } from "@/components/site";
import { Button, Card, Container } from "@/components/ui";
import { siteData } from "@/data.js";
import { cn } from "@/lib/cn.js";

const initialForm = {
  problems: [],
  budget: "",
  name: "",
  email: "",
  phone: "",
  website: "",
};

export function ContactPage() {
  const { contactForm } = siteData;
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState(initialForm);
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

  function goNext() {
    if (!canContinue) {
      return;
    }

    if (stepIndex < contactForm.steps.length - 1) {
      setStepIndex((current) => current + 1);
      return;
    }

    setSubmitted(true);
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
                  Die technische Übergabe ist vorbereitet. Als nächstes kann
                  hier ein Mail-, CRM- oder Kalender-Workflow angeschlossen
                  werden.
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
                  <Button disabled={!canContinue} type="submit" variant="solid">
                    {stepIndex === contactForm.steps.length - 1
                      ? contactForm.actions.submit
                      : contactForm.actions.next}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </Container>
      </SectionBand>
    </SiteLayout>
  );
}
