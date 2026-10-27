import type { MetadataRoute } from "next";
import { SITE_URL } from "./_components/site";

// Required by output: "export" to write this file at build time
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/blog/`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/license/`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms/`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/privacy/`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
