import type { Metadata } from "next";
import { figtree } from "./_components/brand";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "tinig labs",
  description:
    "Open datasets, models, and tools for the Philippines, starting with speech that today's AI gets wrong.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`${figtree.className} flex min-h-full flex-col bg-[var(--gatas)] text-[var(--tinta)]`}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
