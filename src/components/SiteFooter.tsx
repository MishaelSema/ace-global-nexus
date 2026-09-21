"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Client boundary that hides the footer on /admin.
 * The actual <Footer /> is rendered server-side by the layout and passed
 * in as `children`, so it may keep using server-only APIs (cookies / i18n).
 */
export default function SiteFooter({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  if (isAdmin) return null;
  return <>{children}</>;
}