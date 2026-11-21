import type { Metadata, Viewport } from "next";
import { figtree } from "./_components/brand";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";
import { ORGANIZATION, SITE_NAME, SITE_URL, jsonLd } from "./_components/site";
import "./globals.css";

const description =
  "An independent lab releasing open models, datasets, and tools for the Philippines, starting with speech that today's AI gets wrong.";

// Defaults only. Each page sets its own canonical through pageMetadata().
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME}: open Filipino speech AI`, template: `%s | ${SITE_NAME}` },
  description,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "Filipino AI",
    "Tagalog speech recognition",
    "Tagalog speech dataset",
    "open speech corpus",
    "speech therapy AI",
    "cleft palate speech",
    "Philippines",
  ],
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_PH", description },
  twitter: { card: "summary_large_image", description },
};

export const viewport: Viewport = { themeColor: "#F9FBFA" };

const SITE_JSON_LD = {
  "@graph": [
    ORGANIZATION,
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      inLanguage: "en-PH",
      publisher: { "@id": ORGANIZATION["@id"] },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-PH" className="h-full antialiased">
      <body
        className={`${figtree.className} flex min-h-full flex-col bg-[var(--gatas)] text-[var(--tinta)]`}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(SITE_JSON_LD)} />
        <SiteHeader />
        {children}
        <SiteFooter
          current="lab"
          links={[
            { label: "Blog", href: "/blog" },
            { label: "License", href: "/license" },
          ]}
        />
      </body>
    </html>
  );
}
