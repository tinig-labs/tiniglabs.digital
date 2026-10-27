import type { Metadata } from "next";
import { figtree } from "./_components/brand";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";
import { SITE_URL } from "./_components/site";
import "./globals.css";

const description =
  "An independent lab releasing open models, datasets, and tools for the Philippines, starting with speech that today's AI gets wrong.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "tinig labs",
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "tinig labs", title: "tinig labs", description, url: "/" },
  twitter: { card: "summary", title: "tinig labs", description },
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
