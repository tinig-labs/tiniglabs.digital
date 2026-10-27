import type { MetadataRoute } from "next";
import { SITE_URL } from "./_components/site";

// Required by output: "export" to write this file at build time
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
