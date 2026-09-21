import type { Metadata } from "next";

/** Admin area must never be indexed — belt and braces with the HTTP X-Robots-Tag header. */
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}