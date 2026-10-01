"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import {
  FaPlus, FaPenToSquare, FaTrash, FaEye, FaEyeSlash, FaUpload, FaImage, FaCheck, FaLanguage,
} from "react-icons/fa6";
import { INSIGHT_CATEGORIES } from "@/lib/content";
import { cloudImageUrl } from "@/lib/utils";
import { useLocale } from "@/components/LocaleProvider";
import { SkeletonListRows, SkeletonRegion } from "@/components/Skeleton";
import { LOCALES, type Locale } from "@/lib/i18n/core";

interface Insight {
  _id: string;
  title: string;
  titleFr?: string;
  slug: string;
  excerpt: string;
  excerptFr?: string;
  content: string;
  contentFr?: string;
  category: string;
  tags: string[];
  coverUrl?: string;
  author: string;
  published: boolean;
  featured: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface FormState {
  _id?: string;
  title: string;
  titleFr: string;
  excerpt: string;
  excerptFr: string;
  content: string;
  contentFr: string;
  category: string;
  tags: string;
  author: string;
  published: boolean;
  featured: boolean;
}

const emptyForm: FormState = {
  title: "",
  titleFr: "",
  excerpt: "",
  excerptFr: "",
  content: "",
  contentFr: "",
  category: INSIGHT_CATEGORIES[0],
  tags: "",
  author: "Christopher A. Ekom",
  published: false,
  featured: false,
};

const inputCls =
  "w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-primary placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20";

/** Interpolation for the handful of dictionary values that carry placeholders. */
function fill(template: string, vars: Record<string, string | number>): string {
  return Object.entries(vars).reduce(
    (acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)),
    template
  );
}

export default function InsightsManager() {
  const { t } = useLocale();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<FormState | null>(null);
  const [contentLang, setContentLang] = useState<Locale>("en");
  const [saving, setSaving] = useState(false);
  const [coverBusy, setCoverBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/insights");
      const data = await res.json();
      if (data.success) setInsights(data.data || []);
      else toast.error(data.error ? t(data.error) : t("Failed to load insights"));
    } catch {
      toast.error(t("Failed to load insights"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openNew() {
    setEditing({ ...emptyForm, title: `${t("New insight")} ${insights.length + 1}` });
    setContentLang("en");
  }
  function openEdit(i: Insight) {
    setEditing({
      _id: i._id,
      title: i.title,
      titleFr: i.titleFr || "",
      excerpt: i.excerpt,
      excerptFr: i.excerptFr || "",
      content: i.content,
      contentFr: i.contentFr || "",
      category: i.category,
      tags: (i.tags || []).join(", "),
      author: i.author || "Christopher A. Ekom",
      published: i.published,
      featured: i.featured,
    });
    setContentLang("en");
  }
  function closeEditor() {
    setEditing(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function save() {
    if (!editing) return;
    if (!editing.title.trim()) return toast.error(t("Title is required."));
    setSaving(true);
    try {
      const payload = {
        ...editing,
        content: editing.content,
        published: editing.published,
      };
      const res = await fetch(
        editing._id ? `/api/admin/insights/${editing._id}` : "/api/admin/insights",
        {
          method: editing._id ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success(editing._id ? t("Insight updated") : t("Insight created"));
        closeEditor();
        load();
      } else {
        toast.error(data.error ? t(data.error) : t("Save failed"));
      }
    } catch {
      toast.error(t("Save failed"));
    } finally {
      setSaving(false);
    }
  }

  async function togglePublished(i: Insight) {
    try {
      const res = await fetch(`/api/admin/insights/${i._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !i.published }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(i.published ? t("Unpublished") : t("Published"));
        load();
      } else toast.error(data.error ? t(data.error) : t("Update failed"));
    } catch {
      toast.error(t("Update failed"));
    }
  }

  async function remove(i: Insight) {
    const confirmMessage = fill(t("Delete “{title}”? This cannot be undone."), { title: i.title });
    if (!window.confirm(confirmMessage)) return;
    try {
      const res = await fetch(`/api/admin/insights/${i._id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success(t("Insight deleted"));
        load();
      } else toast.error(data.error ? t(data.error) : t("Delete failed"));
    } catch {
      toast.error(t("Delete failed"));
    }
  }

  async function uploadCover(file: File) {
    if (!editing?._id) {
      toast.info(t("Save the insight first, then upload its cover image."));
      return;
    }
    setCoverBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`/api/admin/insights/${editing._id}/cover`, { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        toast.success(t("Cover uploaded"));
        load();
      } else toast.error(data.error ? t(data.error) : t("Upload failed"));
    } catch {
      toast.error(t("Upload failed"));
    } finally {
      setCoverBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const activeCover = insights.find((i) => i._id === editing?._id)?.coverUrl;
  const isFr = contentLang === "fr";
  // Warn when a French field is left blank while the English one is filled in.
  const frMissing =
    !!editing &&
    !editing.titleFr.trim() &&
    !editing.excerptFr.trim() &&
    !editing.contentFr.trim() &&
    !!editing.title.trim();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-primary">{t("Insights")}</h2>
          <p className="mt-1 text-sm text-gray-400">
            {fill(t("{n} article(s) in the library"), { n: insights.length })}
          </p>
        </div>
        <button onClick={openNew} className="btn-primary">
          <FaPlus /> {t("New Insight")}
        </button>
      </div>

      {loading ? (
        <SkeletonRegion label={t("Loading insights…")} className="mt-8">
          <SkeletonListRows count={4} />
        </SkeletonRegion>
      ) : insights.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-gray-200 p-12 text-center">
          <p className="font-serif text-lg font-bold text-primary">{t("No insights yet")}</p>
          <p className="mt-2 text-sm text-gray-500">{t("Create your first article to appear on the site.")}</p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {insights.map((i) => {
            const hasFr = !!(i.titleFr || i.excerptFr || i.contentFr);
            return (
              <div key={i._id} className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-soft">
                <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-primary to-primary-light">
                  {i.coverUrl ? (
                    <img src={cloudImageUrl(i.coverUrl, 300)} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="hero-grid h-full w-full" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${i.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {i.published ? t("Published") : t("Draft")}
                    </span>
                    <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold-dark">{t(i.category)}</span>
                    {i.featured && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">{t("Featured")}</span>}
                    <span
                      title={hasFr ? t("French translation") : t("Translation missing — showing the English version.")}
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                        hasFr ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      FR {hasFr ? "✓" : "—"}
                    </span>
                  </div>
                  <h3 className="mt-1.5 truncate font-serif text-base font-bold text-primary">{i.title}</h3>
                  <p className="text-xs text-gray-400">/{i.slug}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button onClick={() => togglePublished(i)} title={i.published ? t("Unpublish") : t("Publish")} className="grid h-9 w-9 place-items-center rounded-lg bg-cream text-primary/70 hover:bg-gold/20 hover:text-gold-dark">
                    {i.published ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  <button onClick={() => openEdit(i)} title={t("Edit")} className="grid h-9 w-9 place-items-center rounded-lg bg-cream text-primary/70 hover:bg-gold/20 hover:text-gold-dark">
                    <FaPenToSquare />
                  </button>
                  <button onClick={() => remove(i)} title={t("Delete")} className="grid h-9 w-9 place-items-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100">
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* EDITOR MODAL */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-8 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-lift sm:p-8">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-primary">
                {editing._id ? t("Edit insight") : t("New insight")}
              </h3>
              <button onClick={closeEditor} className="rounded-lg bg-cream px-3 py-1.5 text-sm text-primary/70 hover:bg-gray-200">
                {t("Close")}
              </button>
            </div>

            {/* Content-language switch — English is the source of truth, French optional */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary/50">
                <FaLanguage /> {t("Content language")}
              </span>
              <div className="inline-flex rounded-lg bg-cream p-0.5">
                {LOCALES.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setContentLang(l)}
                    className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
                      contentLang === l ? "bg-white text-primary shadow-soft" : "text-primary/55 hover:text-primary"
                    }`}
                  >
                    {t(l === "fr" ? "Français" : "English")}
                  </button>
                ))}
              </div>
              {isFr && (
                <span className="text-xs text-gray-400">{t("Leave blank to fall back to the English version.")}</span>
              )}
            </div>

            {isFr && frMissing && (
              <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
                {t("Translation missing — showing the English version.")}
              </p>
            )}

            <div className="mt-6 grid gap-5">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-primary/70">
                  {isFr ? t("French translation") : t("Title *")}
                </label>
                <input
                  className={inputCls}
                  value={isFr ? editing.titleFr : editing.title}
                  onChange={(e) =>
                    setEditing({ ...editing, [isFr ? "titleFr" : "title"]: e.target.value })
                  }
                />
              </div>

              {!isFr && (
                <div className="grid gap-5 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-primary/70">{t("Category")}</label>
                    <select className={inputCls} value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                      {INSIGHT_CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-primary/70">{t("Author")}</label>
                    <input className={inputCls} value={editing.author} onChange={(e) => setEditing({ ...editing, author: e.target.value })} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-primary/70">{t("Tags (comma separated)")}</label>
                    <input className={inputCls} value={editing.tags} onChange={(e) => setEditing({ ...editing, tags: e.target.value })} placeholder="Africa, trade, markets" />
                  </div>
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-primary/70">
                  {isFr ? t("French translation") : t("Excerpt")}
                </label>
                <textarea
                  rows={2}
                  className={inputCls}
                  value={isFr ? editing.excerptFr : editing.excerpt}
                  onChange={(e) => setEditing({ ...editing, [isFr ? "excerptFr" : "excerpt"]: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-primary/70">
                  {isFr ? t("French translation") : t("Content (Markdown)")}
                </label>
                <textarea
                  rows={12}
                  className={`${inputCls} font-mono text-xs leading-relaxed`}
                  value={isFr ? editing.contentFr : editing.content}
                  onChange={(e) => setEditing({ ...editing, [isFr ? "contentFr" : "content"]: e.target.value })}
                  placeholder={
                    isFr
                      ? "## Titre\n\nRédigez en **markdown**. Les titres, listes et liens sont pris en charge."
                      : "## Heading\n\nWrite in **markdown**. Headings, lists and links are supported."
                  }
                />
              </div>

              {!isFr && (
                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex items-center gap-2 text-sm font-medium text-primary/80">
                    <input type="checkbox" checked={editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} className="h-4 w-4 accent-gold" />
                    {t("Publish now")}
                  </label>
                  <label className="flex items-center gap-2 text-sm font-medium text-primary/80">
                    <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="h-4 w-4 accent-gold" />
                    {t("Mark as featured")}
                  </label>
                </div>
              )}
            </div>

            {/* COVER */}
            <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-cream p-4">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-primary">
                <FaImage className="text-gold" /> {t("Cover image")}
              </h4>
              {activeCover ? (
                <div className="mt-3 flex items-center gap-4">
                  <img src={cloudImageUrl(activeCover, 400)} alt="" className="h-20 w-32 rounded-lg object-cover" />
                  <div className="flex gap-2">
                    <button onClick={() => fileRef.current?.click()} disabled={coverBusy} className="btn-outline !px-3 !py-2 !text-xs">
                      <FaUpload /> {coverBusy ? t("Uploading…") : t("Replace")}
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={() => fileRef.current?.click()} disabled={coverBusy || !editing._id} className="btn-outline mt-3 !px-3 !py-2 !text-xs">
                  <FaUpload />{" "}
                  {coverBusy
                    ? t("Uploading…")
                    : editing._id
                      ? t("Upload cover")
                      : t("Save insight first, then upload")}
                </button>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])}
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={closeEditor} className="btn border border-gray-200 text-primary/70 hover:bg-gray-50">
                {t("Cancel")}
              </button>
              <button onClick={save} disabled={saving} className="btn-primary">
                <FaCheck /> {saving ? t("Saving…") : editing._id ? t("Save Changes") : t("Create Insight")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}