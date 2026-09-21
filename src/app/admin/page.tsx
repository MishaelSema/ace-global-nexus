"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFileLines, FaEnvelope, FaArrowLeft, FaSpinner } from "react-icons/fa6";
import Logo from "@/components/Logo";
import InsightsManager from "./InsightsManager";
import MessagesInbox from "./MessagesInbox";

type Tab = "insights" | "messages";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("insights");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/admin/insights")
      .then((r) => {
        if (r.status === 401) router.replace("/admin/login");
      })
      .catch(() => router.replace("/admin/login"))
      .finally(() => setChecking(false));
  }, [router]);

  if (checking) {
    return (
      <div className="grid min-h-screen place-items-center bg-primary">
        <FaSpinner className="animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <ToastContainer position="top-right" theme="colored" autoClose={4000} />
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Logo />
            <nav className="hidden items-center gap-1 sm:flex">
              <button
                onClick={() => setTab("insights")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                  tab === "insights" ? "bg-gold/15 text-gold-dark" : "text-primary/60 hover:text-primary"
                }`}
              >
                <FaFileLines /> Insights
              </button>
              <button
                onClick={() => setTab("messages")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                  tab === "messages" ? "bg-gold/15 text-gold-dark" : "text-primary/60 hover:text-primary"
                }`}
              >
                <FaEnvelope /> Messages
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-primary/60 hover:text-primary transition-colors">
              <FaArrowLeft size={12} /> View site
            </Link>
          </div>
        </div>

        <div className="flex gap-1 border-t border-gray-100 px-6 py-2 sm:hidden">
          <button
            onClick={() => setTab("insights")}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold ${tab === "insights" ? "bg-gold/15 text-gold-dark" : "text-primary/60"}`}
          >
            <FaFileLines /> Insights
          </button>
          <button
            onClick={() => setTab("messages")}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold ${tab === "messages" ? "bg-gold/15 text-gold-dark" : "text-primary/60"}`}
          >
            <FaEnvelope /> Messages
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {tab === "insights" ? <InsightsManager /> : <MessagesInbox />}
      </main>
    </div>
  );
}