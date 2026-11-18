import type { MetadataRoute } from "next";

// Required by output: "export" to write this file at build time
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "tinig labs",
    short_name: "tinig labs",
    description: "An independent lab for open Filipino AI.",
    start_url: "/",
    display: "browser",
    background_color: "#F9FBFA",
    theme_color: "#1F6B4F",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
