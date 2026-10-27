import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Azure Static Web Apps serves the static files in out/. Security headers and
  // the 404 page are set in public/staticwebapp.config.json.
  output: "export",
  // Emit /blog/index.html instead of /blog.html, so every static host resolves it
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
