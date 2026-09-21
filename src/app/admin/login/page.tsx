"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft, FaLock, FaSpinner } from "react-icons/fa6";
import Logo from "@/components/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // If already logged in (httpOnly cookie present), go straight to dashboard.
    fetch("/api/admin/insights", { method: "GET" })
      .then((r) => {
        if (r.ok) router.replace("/admin");
      })
      .catch(() => {});
  }, [router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Enter your admin email and password.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Logged in");
        router.replace("/admin");
      } else {
        toast.error(data.error || "Login failed.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary via-primary-light to-primary">
      <ToastContainer position="top-right" theme="colored" autoClose={4000} />
      <div className="container-site flex items-center justify-between py-5">
        <Logo light />
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors">
          <FaArrowLeft size={12} /> Back to site
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lift sm:p-10">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-gold">
              <FaLock />
            </span>
            <div>
              <h1 className="font-serif text-2xl font-bold text-primary">Admin Sign In</h1>
              <p className="text-xs text-gray-400">ACE Global Nexus content management</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-primary/70">Admin email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ace-global-nexus.com"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-primary placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-primary/70">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-primary placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
              />
            </div>
            <button type="submit" disabled={busy} className="btn-primary w-full !text-base">
              {busy ? <FaSpinner className="animate-spin" /> : <FaLock />}
              {busy ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}