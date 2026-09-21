"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { FaArrowLeft, FaArrowRight, FaCheck, FaPaperPlane, FaSpinner } from "react-icons/fa6";
import { CONTACT_TOPICS, SERVICES } from "@/lib/content";

const STEP_LABELS = ["About you", "Your objective", "Review & send"];

const inputCls =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-primary placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors";

const labelCls = "mb-2 block text-xs font-semibold uppercase tracking-wide text-primary/60";

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  topic: string;
  service: string;
  message: string;
}

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  country: "",
  topic: "",
  service: "",
  message: "",
};

function Field({ label, children, required }: { label: string; children: ReactNode; required?: boolean }) {
  return (
    <div>
      <label className={labelCls}>
        {label} {required && <span className="text-gold-dark">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function ConversationWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const set = (key: keyof FormState) => ({ target: { value } }: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: value }));

  const step1Ok = !!form.name.trim() && emailOk(form.email);
  const step2Ok = !!form.topic.trim() && !!form.message.trim();

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setDone(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  }

  const progress = (step / (STEP_LABELS.length - 1)) * 100;

  const reviewRows: [string, string, number][] = [
    ["Full name", form.name, 0],
    ["Email", form.email, 0],
    ["Phone", form.phone, 0],
    ["Company", form.company, 0],
    ["Country", form.country, 0],
    ["Topic", form.topic, 1],
    ["Service of interest", form.service, 1],
  ];

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container-site">
        <div className="mx-auto max-w-3xl">
          {done ? (
            <div className="rounded-3xl border border-gray-100 bg-cream p-10 text-center sm:p-14">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/15 text-gold-dark">
                <FaCheck size={22} aria-hidden="true" />
              </span>
              <h2 className="mt-6 font-serif text-3xl font-bold text-primary">Conversation started</h2>
              <p className="mx-auto mt-4 max-w-md leading-relaxed text-gray-600">
                Thanks{form.name.trim() ? `, ${form.name.trim().split(" ")[0]}` : ""} — your inquiry is in. Our team
                typically responds within one business day, and a confirmation email is on its way to{" "}
                <strong>{form.email}</strong>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setForm(EMPTY);
                  setError("");
                  setDone(false);
                  setStep(0);
                }}
                className="btn-primary mt-9"
              >
                Start another conversation
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="rounded-3xl border border-gray-100 bg-cream p-8 sm:p-10">
              {/* Progress bar */}
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.18em] text-primary/50">
                <span>
                  Step {step + 1} of {STEP_LABELS.length}
                </span>
                <span>{STEP_LABELS[step]}</span>
              </div>
              <div
                className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold-dark to-gold transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                {STEP_LABELS.map((label, i) => {
                  const state = i < step ? "done" : i === step ? "current" : "todo";
                  return (
                    <div key={label} className="flex items-center gap-2">
                      <span
                        className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold transition-colors ${
                          state === "done"
                            ? "bg-gold-dark text-white"
                            : state === "current"
                              ? "bg-primary text-gold"
                              : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        {state === "done" ? <FaCheck size={11} aria-hidden="true" /> : i + 1}
                      </span>
                      <span
                        className={`hidden text-xs font-semibold sm:inline ${
                          state === "current" ? "text-primary" : "text-gray-400"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Step bodies */}
              <div className="mt-10">
                {step === 0 && (
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Full name" required>
                      <input className={inputCls} value={form.name} onChange={set("name")} placeholder="Your name" />
                    </Field>
                    <Field label="Email" required>
                      <input
                        type="email"
                        className={inputCls}
                        value={form.email}
                        onChange={set("email")}
                        placeholder="you@company.com"
                      />
                    </Field>
                    <Field label="Phone / WhatsApp">
                      <input className={inputCls} value={form.phone} onChange={set("phone")} placeholder="+237 ..." />
                    </Field>
                    <Field label="Company / Organisation">
                      <input
                        className={inputCls}
                        value={form.company}
                        onChange={set("company")}
                        placeholder="Company name"
                      />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Country">
                        <input className={inputCls} value={form.country} onChange={set("country")} placeholder="Your country" />
                      </Field>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="grid gap-6">
                    <Field label="What can we help with?" required>
                      <select className={inputCls} value={form.topic} onChange={set("topic")}>
                        <option value="" disabled>
                          Choose a topic...
                        </option>
                        {CONTACT_TOPICS.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Service of interest">
                      <select className={inputCls} value={form.service} onChange={set("service")}>
                        <option value="">No specific service</option>
                        {SERVICES.map((s) => (
                          <option key={s.title}>{s.title}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Your message" required>
                      <textarea
                        rows={6}
                        className={inputCls}
                        value={form.message}
                        onChange={set("message")}
                        placeholder="Tell us about your objective, market, sector or partnership..."
                      />
                    </Field>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-xl font-bold text-primary">Review your conversation</h3>
                      <p className="text-xs text-gray-400">Check everything, then send.</p>
                    </div>
                    <dl className="mt-6 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
                      {reviewRows.map(([label, value, stepOf]) => (
                        <div key={label} className="flex items-start justify-between gap-4 px-5 py-4">
                          <dt className="w-36 shrink-0 text-xs font-semibold uppercase tracking-wide text-gray-400">
                            {label}
                          </dt>
                          <dd className="flex-1 break-words text-right text-sm font-medium text-primary">
                            {value || <span className="text-gray-300">—</span>}
                          </dd>
                          <button
                            type="button"
                            onClick={() => setStep(stepOf)}
                            className="shrink-0 text-xs font-semibold text-gold-dark transition-colors hover:text-gold"
                            aria-label={`Edit ${label}`}
                          >
                            Edit
                          </button>
                        </div>
                      ))}
                      <div className="flex items-start justify-between gap-4 px-5 py-4">
                        <dt className="w-36 shrink-0 text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Message
                        </dt>
                        <dd className="flex-1 whitespace-pre-line text-right text-sm leading-relaxed text-primary">
                          {form.message || <span className="text-gray-300">—</span>}
                        </dd>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="shrink-0 text-xs font-semibold text-gold-dark transition-colors hover:text-gold"
                          aria-label="Edit message"
                        >
                          Edit
                        </button>
                      </div>
                    </dl>
                    {error && (
                      <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Step navigation */}
              <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-8">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary/60 transition-colors hover:text-primary disabled:pointer-events-none disabled:opacity-30"
                >
                  <FaArrowLeft size={12} /> Back
                </button>

                {step < 2 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    disabled={step === 0 ? !step1Ok : !step2Ok}
                    className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Continue <FaArrowRight size={12} />
                  </button>
                ) : (
                  <button type="submit" disabled={sending} className="btn-primary">
                    {sending ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
                    {sending ? "Sending..." : "Send Conversation"}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}