"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPaperPlane, FaSpinner, FaFileArrowUp, FaXmark } from "react-icons/fa6";
import { useLocale } from "@/components/LocaleProvider";
import { JOB } from "@/lib/jobs";

const inputCls =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-primary placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors";

const labelCls = "mb-2 block text-xs font-semibold uppercase tracking-wide text-primary/60";

const MAX_CV_BYTES = 5 * 1024 * 1024;
const CV_ACCEPT = ".pdf,.doc,.docx,.rtf,.odt,.txt";

/**
 * Application form for the careers posting. Submits as multipart/form-data to
 * `/api/applications`, which stores the application in the admin inbox and
 * uploads the CV alongside it.
 */
export default function ApplicationForm() {
  const { t, locale, p } = useLocale();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    cvLink: "",
    statement: "",
  });
  const [cv, setCv] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set =
    (key: keyof typeof form) =>
    (e: { target: { value: string } }) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    if (file.size > MAX_CV_BYTES) {
      toast.error(t("Your CV must be smaller than 5 MB"));
      e.target.value = "";
      return;
    }
    setCv(file);
  }

  function clearFile() {
    setCv(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.statement.trim()) {
      toast.error(t("Please fill in your name, email and statement."));
      return;
    }
    if (!cv && !form.cvLink.trim()) {
      toast.error(t("Please attach your CV or add a link to it"));
      return;
    }

    setSending(true);
    try {
      const body = new FormData();
      Object.entries(form).forEach(([key, value]) => body.append(key, value));
      body.append("locale", locale);
      if (cv) body.append("cv", cv);

      const res = await fetch("/api/applications", { method: "POST", body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        // Server messages are specific (CV too large, unsupported format…), so
        // surface them rather than a generic failure.
        toast.error(t(data.error || "Something went wrong. Please try again or email us directly."));
        return;
      }
      toast.success(t("Application submitted — thank you. Shortlisted candidates will be contacted directly."));
      setForm({ name: "", email: "", phone: "", location: "", cvLink: "", statement: "" });
      clearFile();
    } catch {
      toast.error(t("Something went wrong. Please try again or email us directly."));
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <ToastContainer position="top-right" theme="colored" autoClose={5000} />
      <form onSubmit={onSubmit} className="rounded-3xl border border-gray-100 bg-cream p-8 sm:p-10">
        <h3 className="font-serif text-2xl font-bold text-primary">{t("Submit your application")}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          {t("Attach your CV and a short statement. You can also apply by email or WhatsApp using the details above.")}
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="app-name" className={labelCls}>
              {t("Full name *")}
            </label>
            <input
              id="app-name"
              className={inputCls}
              value={form.name}
              onChange={set("name")}
              autoComplete="name"
              placeholder={t("Your name")}
            />
          </div>
          <div>
            <label htmlFor="app-email" className={labelCls}>
              {t("Email *")}
            </label>
            <input
              id="app-email"
              type="email"
              className={inputCls}
              value={form.email}
              onChange={set("email")}
              autoComplete="email"
              placeholder="you@company.com"
            />
          </div>
          <div>
            <label htmlFor="app-phone" className={labelCls}>
              {t("Phone / WhatsApp")}
            </label>
            <input
              id="app-phone"
              className={inputCls}
              value={form.phone}
              onChange={set("phone")}
              autoComplete="tel"
              placeholder="+237 ..."
            />
          </div>
          <div>
            <label htmlFor="app-location" className={labelCls}>
              {t("Based in (city, country)")}
            </label>
            <input
              id="app-location"
              className={inputCls}
              value={form.location}
              onChange={set("location")}
              autoComplete="address-level2"
              placeholder={t("Yaoundé, Cameroon")}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>{t("CV *")}</label>
            <div className="flex flex-wrap items-center gap-3">
              <label
                htmlFor="app-cv"
                className="inline-flex cursor-pointer items-center gap-2.5 rounded-xl border border-dashed border-gold/60 bg-white px-4 py-3 text-sm font-medium text-primary/75 transition-colors hover:border-gold hover:text-primary"
              >
                <FaFileArrowUp className="text-gold" aria-hidden="true" />
                {cv ? <span className="max-w-[16rem] truncate">{cv.name}</span> : <span>{t("Choose a file (PDF, DOC, DOCX, RTF, TXT — max 5 MB)")}</span>}
              </label>
              <input
                id="app-cv"
                ref={fileRef}
                type="file"
                accept={CV_ACCEPT}
                onChange={onFile}
                className="sr-only"
              />
              {cv && (
                <button
                  type="button"
                  onClick={clearFile}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 transition-colors hover:text-red-500"
                >
                  <FaXmark aria-hidden="true" /> {t("Remove")}
                </button>
              )}
            </div>
            <div className="mt-4">
              <label htmlFor="app-cvlink" className={labelCls}>
                {t("Or a link to your CV / LinkedIn profile")}
              </label>
              <input
                id="app-cvlink"
                type="url"
                className={inputCls}
                value={form.cvLink}
                onChange={set("cvLink")}
                placeholder="https://drive.google.com/…"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="app-statement" className={labelCls}>
              {t("Short statement *")}
            </label>
            {/* No placeholder: it paraphrased the instruction directly above it
                and started with the same words, so the two lines read as one
                duplicated sentence. The prompt is the instruction. */}
            <p className="mb-2 -mt-1 text-xs leading-relaxed text-gray-500">{t(JOB.statementPrompt)}</p>
            <textarea
              id="app-statement"
              rows={7}
              className={inputCls}
              value={form.statement}
              onChange={set("statement")}
            />
          </div>
        </div>

        <button type="submit" disabled={sending} className="btn-primary mt-9 w-full sm:w-auto">
          {sending ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
          {sending ? t("Submitting...") : t("Submit Application")}
        </button>

        <p className="mt-5 max-w-xl text-xs leading-relaxed text-gray-400">
          {t("Your details and documents are used only to assess your application and are handled under our")}{" "}
          <Link href={p("/legal/privacy")} className="underline transition-colors hover:text-gold-dark">
            {t("Privacy Policy")}
          </Link>
          .
        </p>
      </form>
    </>
  );
}
