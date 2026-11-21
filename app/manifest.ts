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
    // The Echo t app icon (public/brand/), see BRAND.md
    icons: [
      { src: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { src: "/brand/tinig-labs-app-icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/brand/tinig-labs-app-icon-180.png", sizes: "180x180", type: "image/png" },
      { src: "/brand/tinig-labs-app-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
