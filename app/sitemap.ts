import type { MetadataRoute } from "next";
import { SITE_URL } from "./_components/site";
import { POSTS } from "./blog/posts";

// Required by output: "export" to write this file at build time
export const dynamic = "force-static";

// Bump when a page's content changes meaningfully
const UPDATED = { home: "2026-11-18", legal: "2026-10-27" };

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, lastModified: UPDATED.home, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/blog/`, lastModified: POSTS[0]?.date, changeFrequency: "weekly", priority: 0.7 },
    ...POSTS.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}/`,
      lastModified: p.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    { url: `${SITE_URL}/license/`, lastModified: UPDATED.legal, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms/`, lastModified: UPDATED.legal, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/privacy/`, lastModified: UPDATED.legal, changeFrequency: "yearly", priority: 0.2 },
  ];
}
