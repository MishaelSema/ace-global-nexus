"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaLocationDot, FaPhone, FaEnvelope, FaPaperPlane, FaSpinner } from "react-icons/fa6";
import { CONTACT_INFO, CONTACT_TOPICS, SERVICES } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";

const inputCls =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-primary placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors";

const labelCls = "mb-2 block text-xs font-semibold uppercase tracking-wide text-primary/60";

export default function ContactForm() {
  const { t } = useLocale();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", country: "", topic: "", service: "", message: "",
  });
  const [sending, setSending] = useState(false);

  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error(t("Please fill in your name, email and message."));
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Request failed");
      toast.success(t("Message sent — we will get back to you shortly."));
      setForm({ name: "", email: "", phone: "", company: "", country: "", topic: "", service: "", message: "" });
    } catch {
      toast.error(t("Something went wrong. Please try again or email us directly."));
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <ToastContainer position="top-right" theme="colored" autoClose={5000} />
      <section className="bg-white py-24 sm:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <form onSubmit={onSubmit} className="rounded-3xl border border-gray-100 bg-cream p-8 sm:p-10">
            <h2 className="font-serif text-2xl font-bold text-primary">{t("Tell us about your objective")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              {t("The more context you share, the faster we can map the right path.")}
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <label className={labelCls}>{t("Full name *")}</label>
                <input className={inputCls} value={form.name} onChange={set("name")} placeholder={t("Your name")} />
              </div>
              <div>
                <label className={labelCls}>{t("Email *")}</label>
                <input type="email" className={inputCls} value={form.email} onChange={set("email")} placeholder={t("you@company.com")} />
              </div>
              <div>
                <label className={labelCls}>{t("Phone")}</label>
                <input className={inputCls} value={form.phone} onChange={set("phone")} placeholder={t("+237 ...")} />
              </div>
              <div>
                <label className={labelCls}>{t("Company")}</label>
                <input className={inputCls} value={form.company} onChange={set("company")} placeholder={t("Company name")} />
              </div>
              <div>
                <label className={labelCls}>{t("Country")}</label>
                <input className={inputCls} value={form.country} onChange={set("country")} placeholder={t("Your country")} />
              </div>
              <div>
                <label className={labelCls}>{t("Topic *")}</label>
                <select className={inputCls} value={form.topic} onChange={set("topic")}>
                  {CONTACT_TOPICS.map((topic) => (
                    <option key={topic}>{t(topic)}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>{t("Service of interest")}</label>
                <select className={inputCls} value={form.service} onChange={set("service")}>
                  <option value="">{t("No specific service")}</option>
                  {SERVICES.map((s) => (
                    <option key={s.title}>{t(s.title)}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>{t("Message *")}</label>
                <textarea
                  rows={6}
                  className={inputCls}
                  value={form.message}
                  onChange={set("message")}
                  placeholder={t("Tell us about your objective, market or partnership...")}
                />
              </div>
            </div>
            <button type="submit" disabled={sending} className="btn-primary mt-9 w-full sm:w-auto">
              {sending ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
              {sending ? t("Sending...") : t("Send Message")}
            </button>
          </form>

          <aside className="space-y-8">
            <div className="rounded-3xl bg-primary p-8 text-white sm:p-10">
              <h2 className="font-serif text-xl font-bold text-gold">{t("Contact details")}</h2>
              <ul className="mt-8 space-y-6">
                <li className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-gold">
                    <FaLocationDot aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">{t("Head office")}</p>
                    <p className="mt-1 text-sm font-medium">{CONTACT_INFO.address}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-gold">
                    <FaPhone aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">{t("Phone / WhatsApp")}</p>
                    <p className="mt-1 text-sm font-medium">{CONTACT_INFO.phone}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-gold">
                    <FaEnvelope aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">{t("Email")}</p>
                    <p className="mt-1 break-all text-sm font-medium">{CONTACT_INFO.emails.join(", ")}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-dashed border-gold/50 bg-cream p-8">
              <h3 className="font-serif text-xl font-bold text-primary">{t("How we respond")}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                {t(
                  "Messages are reviewed promptly by our team. For time-sensitive investment or market-entry inquiries, mention the sector and your timeline in your message."
                )}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}