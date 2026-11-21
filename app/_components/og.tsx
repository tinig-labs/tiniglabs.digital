import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { type MarkName, PRODUCTS, type Product, markSrc } from "./marks";

// Shared Open Graph card: milk background, mint panel, the logo lockup, pandan accent. 1200×630.
export const OG_SIZE = { width: 1200, height: 630 };

// Read once at build time. WOFF copies of the site's fonts, since ImageResponse can't read woff2.
const read = (...p: string[]) => readFileSync(path.join(process.cwd(), ...p));
const FONTS = [
  { name: "Montserrat", data: read("app/_components/og-fonts/montserrat-latin-600-normal.woff"), weight: 600 as const },
  { name: "Figtree", data: read("app/_components/og-fonts/figtree-latin-500-normal.woff"), weight: 500 as const },
  { name: "Figtree", data: read("app/_components/og-fonts/figtree-latin-600-normal.woff"), weight: 600 as const },
];

// The marks as data URLs, straight from the files in public/brand/
const markData = (name: MarkName) =>
  `data:image/svg+xml;base64,${read("public", markSrc(name)).toString("base64")}`;

export function ogImage({
  eyebrow,
  title,
  footer,
  product,
}: {
  eyebrow: string;
  title: string;
  footer: string;
  /** Show this product's lockup instead of the tinig labs wordmark */
  product?: Product;
}) {
  const mark = markData(product ? PRODUCTS[product].mark : "tinig-labs");
  // Lockup proportions from the brand guide: mark 1.75× the wordmark, gap 0.55×, product name 0.75×
  const fs = 34;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", padding: 48, background: "#F9FBFA" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            borderRadius: 48,
            background: "#E2F3EA",
            color: "#13261F",
            fontFamily: "Figtree",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: Math.round(fs * 0.55) }}>
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- rendered to PNG, not HTML */}
            <img src={mark} width={Math.round(fs * 1.75)} height={Math.round(fs * 1.75)} />
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span style={{ fontFamily: "Montserrat", fontWeight: 600, fontSize: fs, letterSpacing: "-0.02em" }}>
                tinig labs
              </span>
              {product && (
                <span style={{ fontWeight: 500, fontSize: Math.round(fs * 0.75), color: "#5F6F68" }}>
                  {PRODUCTS[product].name}
                </span>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 500,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: 960,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "10px 24px 10px 18px",
                borderRadius: 999,
                background: "#F9FBFA",
                color: "#1F6B4F",
                fontWeight: 600,
              }}
            >
              <div style={{ width: 14, height: 14, borderRadius: 999, background: "#1F6B4F" }} />
              {eyebrow}
            </div>
            <span style={{ color: "#5F6F68", fontWeight: 500 }}>{footer}</span>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: FONTS },
  );
}
