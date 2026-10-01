"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaEnvelope, FaEnvelopeOpen, FaTrash, FaReply } from "react-icons/fa6";
import { formatDate } from "@/lib/utils";
import { useLocale } from "@/components/LocaleProvider";
import { SkeletonListRows, SkeletonRegion } from "@/components/Skeleton";

interface Message {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  topic?: string;
  service?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesInbox() {
  const { t, locale } = useLocale();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [selected, setSelected] = useState<Message | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/contact?unread=${unreadOnly ? 1 : 0}`);
      const data = await res.json();
      if (data.success) setMessages(data.data || []);
      else toast.error(data.error ? t(data.error) : t("Failed to load messages"));
    } catch {
      toast.error(t("Failed to load messages"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unreadOnly]);

  async function setRead(m: Message, read: boolean) {
    try {
      const res = await fetch(`/api/messages/${m._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read }),
      });
      const data = await res.json();
      if (data.success) {
        setSelected((s) => (s?._id === m._id ? { ...s, read } : s));
        load();
      }
    } catch {
      toast.error(t("Update failed"));
    }
  }

  async function remove(m: Message) {
    if (!window.confirm(t("Delete message from {name}?").replace("{name}", m.name))) return;
    try {
      const res = await fetch(`/api/messages/${m._id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success(t("Message deleted"));
        if (selected?._id === m._id) setSelected(null);
        load();
      } else toast.error(data.error ? t(data.error) : t("Delete failed"));
    } catch {
      toast.error(t("Delete failed"));
    }
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-primary">{t("Contact Messages")}</h2>
          <p className="mt-1 text-sm text-gray-400">
            {t("{n} unread · {m} shown").replace("{n}", String(unreadCount)).replace("{m}", String(messages.length))}
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm font-medium text-primary/80">
          <input type="checkbox" checked={unreadOnly} onChange={(e) => setUnreadOnly(e.target.checked)} className="h-4 w-4 accent-gold" />
          {t("Unread only")}
        </label>
      </div>

      {loading ? (
        <SkeletonRegion label={t("Loading messages…")} className="mt-8">
          <SkeletonListRows count={4} />
        </SkeletonRegion>
      ) : messages.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-gray-200 p-12 text-center">
          <p className="font-serif text-lg font-bold text-primary">{t("No messages")}</p>
          <p className="mt-2 text-sm text-gray-500">{t("Submitted contact forms will appear here.")}</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <div className="space-y-3">
            {messages.map((m) => (
              <button
                key={m._id}
                onClick={() => setSelected(m)}
                className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                  selected?._id === m._id ? "border-gold bg-gold/5" : "border-gray-100 bg-white shadow-soft hover:border-gold/40"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`font-serif text-base font-bold ${m.read ? "text-primary/60" : "text-primary"}`}>
                    {m.name}
                  </span>
                  {!m.read && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-gold" />}
                </div>
                <p className="truncate text-xs text-gray-400">{m.email} · {formatDate(m.createdAt, locale)}</p>
                <p className="mt-2 line-clamp-2 text-sm text-gray-500">{m.message}</p>
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-soft">
            {!selected ? (
              <div className="grid h-full min-h-[320px] place-items-center p-10 text-center">
                <div>
                  <FaEnvelope className="mx-auto text-3xl text-gray-200" />
                  <p className="mt-4 text-sm text-gray-400">{t("Select a message to read it")}</p>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 p-5">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-primary">{selected.name}</h3>
                    <p className="mt-0.5 text-sm text-gray-400">
                      <a href={`mailto:${selected.email}`} className="text-gold-dark hover:underline">{selected.email}</a>
                      {selected.phone && <span> · {selected.phone}</span>}
                      {" · "}{formatDate(selected.createdAt, locale)}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selected.company && <span className="rounded-full bg-cream px-2.5 py-1 text-[11px] font-semibold text-primary/70">{selected.company}</span>}
                      {selected.country && <span className="rounded-full bg-cream px-2.5 py-1 text-[11px] font-semibold text-primary/70">{selected.country}</span>}
                      {selected.topic && <span className="rounded-full bg-gold/15 px-2.5 py-1 text-[11px] font-semibold text-gold-dark">{t(selected.topic)}</span>}
                      {selected.service && <span className="rounded-full bg-cream px-2.5 py-1 text-[11px] font-semibold text-primary/70">{t(selected.service)}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a href={`mailto:${selected.email}`} title={t("Reply")} className="grid h-9 w-9 place-items-center rounded-lg bg-cream text-primary/70 hover:bg-gold/20 hover:text-gold-dark">
                      <FaReply />
                    </a>
                    <button onClick={() => setRead(selected, !selected.read)} title={selected.read ? t("Mark unread") : t("Mark read")} className="grid h-9 w-9 place-items-center rounded-lg bg-cream text-primary/70 hover:bg-gold/20 hover:text-gold-dark">
                      {selected.read ? <FaEnvelope /> : <FaEnvelopeOpen />}
                    </button>
                    <button onClick={() => remove(selected)} title={t("Delete")} className="grid h-9 w-9 place-items-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100">
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="flex-1 p-5">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-primary/85">{selected.message}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}