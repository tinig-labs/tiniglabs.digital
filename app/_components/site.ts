import type { Metadata } from "next";

// Canonical origin for metadata, robots, and sitemap. Override per environment.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tiniglabs.digital";

// The speech corpus app, where people record and review clips
export const CORPUS_URL = "https://collect.tiniglabs.digital";

// The recording notebook for speech-language pathologists
export const NOTEBOOK_URL = "https://notebook.tiniglabs.digital";

export const SITE_NAME = "tinig labs";
export const GITHUB_URL = "https://github.com/tinig-labs";

/**
 * Per-page metadata with a self-canonical and matching Open Graph and Twitter tags.
 * Child metadata replaces openGraph/twitter wholesale, so every page goes through this.
 * The og:image defaults to the site card (app/opengraph-image.tsx). A page with its own
 * opengraph-image.tsx passes `image`, since config images override file-based ones.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle = title,
  type = "website",
  publishedTime,
  image = SITE_OG_IMAGE,
}: {
  title: Metadata["title"];
  description: string;
  path: string;
  ogTitle?: string | Metadata["title"];
  type?: "website" | "article";
  publishedTime?: string;
  image?: { url: string; width: number; height: number; alt: string };
}): Metadata {
  const social = typeof ogTitle === "string" ? ogTitle : undefined;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: "en_PH",
      title: social,
      description,
      url: path,
      images: [image],
      ...(publishedTime && { publishedTime }),
    },
    twitter: { card: "summary_large_image", title: social, description, images: [image] },
  };
}

// The static export writes this without an extension; staticwebapp.config.json sets its type
const SITE_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "tinig labs: an independent lab for open Filipino AI",
};

export const ORGANIZATION = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.svg`,
  description: "An independent lab releasing open models, datasets, and tools for Filipino speech.",
  sameAs: [CORPUS_URL, NOTEBOOK_URL, GITHUB_URL],
} as const;

/** Serialized JSON-LD for a <script type="application/ld+json">, with `<` escaped. */
export function jsonLd(data: object) {
  return { __html: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c") };
}
