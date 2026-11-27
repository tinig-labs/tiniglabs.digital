import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Brand,
  Mark,
  type MarkName,
  type MarkVariant,
  ProductLockup,
  Wordmark,
  focusRing,
  markSrc,
  montserrat,
} from "../_components/brand";
import { GITHUB_URL, pageMetadata } from "../_components/site";
import { buttonPrimary, buttonSecondary, buttonBlock, card, proseLink } from "../_components/ui";

const title = "Brand guide";
const description =
  "The tinig labs logo family and how to use it, with the colours and type that go with it, and every logo file to download.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/brand/" });

/* ------------------------------------------------------------------ */
/* Content, from BRAND.md                                              */
/* ------------------------------------------------------------------ */

const MARKS: {
  name: MarkName;
  title: string;
  usedFor: ReactNode;
  says: string;
  construction: string;
  min: number;
}[] = [
  {
    name: "tinig-labs",
    title: "Echo t",
    usedFor: (
      <>
        <Brand />, the lab
      </>
    ),
    says: "A lowercase t on three rounded squares that fade back like an echo: a voice carrying.",
    construction:
      "Three 70-unit squares with a 24-unit corner radius, each one offset 15 units down and right. Front square tinta at full strength, middle pandan at 75% opacity, back dahon at 45%. The t is an 8-unit stroke with round ends, in gatas.",
    min: 24,
  },
  {
    name: "notebook",
    title: "Arch n",
    usedFor: <>notebook (notebook.tiniglabs.digital)</>,
    says: "A lowercase n drawn in one stroke that fades from pandan into tinta.",
    construction:
      "One 16-unit stroke with round ends: a stem from y 38 to 90 and an arch with a 28-unit radius. The gradient runs from pandan at the bottom left to tinta at the top right.",
    min: 20,
  },
  {
    name: "corpus",
    title: "Banig weave",
    usedFor: <>speech corpus (collect.tiniglabs.digital)</>,
    says: "Rounded strands woven over and under like a banig mat: many voices woven into one dataset.",
    construction:
      "Three strands across (tinta) and three down (pandan), 12 units wide and 26 units apart, with round ends. At each crossing they swap which one is on top, in a checker pattern. Where a strand passes under, it breaks with a 3.5-unit gap on each side. The gaps are transparent, so the weave works on any background.",
    min: 24,
  },
];

const BG = {
  gatas: { label: "gatas", className: "bg-[var(--gatas)] ring-1 ring-inset ring-[var(--tinta)]/10" },
  white: { label: "white", className: "bg-white ring-1 ring-inset ring-[var(--tinta)]/10" },
  mint: { label: "mint", className: "bg-[var(--mint)]" },
  pandan: { label: "pandan", className: "bg-[var(--pandan)]" },
  tinta: { label: "tinta", className: "bg-[var(--tinta)]" },
} as const;

type Bg = keyof typeof BG;

const VERSIONS: { variant: MarkVariant; label: string; body: string; on: Bg[] }[] = [
  { variant: "primary", label: "Primary", body: "On gatas, white or mint. Use this by default.", on: ["gatas", "white", "mint"] },
  {
    variant: "reversed",
    label: "Reversed",
    body: "On pandan or tinta. Uses gatas and dahon so the mark stays bright.",
    on: ["pandan", "tinta"],
  },
  {
    variant: "mono-ink",
    label: "Mono ink",
    body: "Tinta only. For one-colour printing, stamps and fax-style documents.",
    on: ["white"],
  },
  {
    variant: "mono-white",
    label: "Mono white",
    body: "White only. For photos (if the area behind is calm) and dark one-colour printing.",
    on: ["tinta"],
  },
];

const PALETTE: { token: string; hex: string; use: string; swatch: string; note?: string }[] = [
  { token: "gatas", hex: "#F9FBFA", use: "Page background (gatas = milk)", swatch: "bg-[var(--gatas)] ring-1 ring-inset ring-[var(--tinta)]/10" },
  { token: "tinta", hex: "#13261F", use: "Text and the wordmark (tinta = ink)", swatch: "bg-[var(--tinta)]" },
  { token: "abo", hex: "#5F6F68", use: "Muted text and product names (abo = grey)", swatch: "bg-[var(--abo)]" },
  { token: "pandan", hex: "#1F6B4F", use: "Brand green: tiles, the weave, the start of the Arch n", swatch: "bg-[var(--pandan)]" },
  { token: "mint", hex: "#E2F3EA", use: "Soft tint: pills and highlight bands", swatch: "bg-[var(--mint)]" },
  {
    token: "dahon",
    hex: "#7FC8A4",
    use: "Leaf green (dahon = leaf), only as an accent on pandan",
    swatch: "bg-[var(--pandan)]",
    note: "Don't use it for text on gatas: the contrast is too low.",
  },
];

const TYPE: { name: string; spec: string; sample: string; className: string }[] = [
  { name: "Wordmark", spec: "Montserrat 600 · 18/24 · −0.02em", sample: "tinig labs", className: `${montserrat.className} text-lg font-semibold tracking-[-0.02em]` },
  { name: "Display", spec: "Montserrat 600 · 48/52", sample: "tinig labs", className: `${montserrat.className} text-[48px] leading-[52px] font-semibold tracking-[-0.02em]` },
  { name: "Heading", spec: "Figtree 600 · 24/32", sample: "Open Filipino speech AI", className: "text-2xl font-semibold" },
  { name: "Body", spec: "Figtree 400 · 16/24", sample: "Speech after a stroke, with a cleft palate, or in therapy.", className: "text-base" },
  { name: "Product", spec: "Figtree 500 · 14/20 · abo", sample: "speech corpus", className: "text-sm font-medium text-[var(--abo)]" },
  { name: "Caption", spec: "Figtree 400 · 13/18", sample: "Patients and therapists in it are fictional.", className: "text-[13px] leading-[18px]" },
];

const DONTS = [
  "Don't stretch, squash, rotate or tilt a mark.",
  "Don't recolour a mark outside the four versions, or use colours from outside the palette.",
  "Don't add shadows, outlines, glows or extra gradients. The Arch n's gradient is the only one in the family.",
  "Don't change the weave pattern, add strands or straighten the round ends.",
  "Don't put a mark on a busy photo, or on a background where it doesn't have enough contrast.",
  "Don't swap a product mark in for the tinig labs mark, or combine two marks in one lockup.",
  "Don't set the wordmark in any font other than Montserrat 600, and never write “Tinig Labs”.",
  "Don't use the old mic-and-headphones logo next to the new marks.",
];

const ICON_FILES = (name: MarkName) => [
  { label: "SVG", href: `/brand/${name}-app-icon.svg` },
  { label: "512 px PNG", href: `/brand/${name}-app-icon-512.png` },
  { label: "180 px PNG", href: `/brand/${name}-app-icon-180.png` },
  { label: "32 px PNG", href: `/brand/${name}-app-icon-32.png` },
];

const VARIANT_SUFFIX: { variant: MarkVariant; label: string }[] = [
  { variant: "primary", label: "Primary" },
  { variant: "reversed", label: "Reversed" },
  { variant: "mono-ink", label: "Mono ink" },
  { variant: "mono-white", label: "Mono white" },
];

const CONTENTS = [
  { id: "family", label: "Logo family" },
  { id: "construction", label: "Construction" },
  { id: "lockups", label: "Lockups" },
  { id: "clear-space", label: "Clear space" },
  { id: "versions", label: "Colour versions" },
  { id: "app-icons", label: "App icons" },
  { id: "colour", label: "Colour" },
  { id: "type", label: "Type" },
  { id: "donts", label: "Don'ts" },
  { id: "files", label: "Files" },
];

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function Section({ id, title, lede, children }: { id: string; title: ReactNode; lede?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-t border-[var(--tinta)]/10 pt-12 sm:scroll-mt-6 sm:pt-16">
      <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight sm:text-[2rem]">
        {title}
      </h2>
      {lede && <div className="mt-4 max-w-[60ch] text-lg leading-relaxed text-[var(--abo)]">{lede}</div>}
      <div className="mt-8 sm:mt-10">{children}</div>
    </section>
  );
}

function Bullets({ children }: { children: ReactNode }) {
  return <ul className="max-w-[64ch] list-disc space-y-3 pl-6 leading-relaxed marker:text-[var(--pandan)]">{children}</ul>;
}

// The 120-unit grid every mark is drawn on, one line every 10 units
function GridTile({ name, size = 192 }: { name: MarkName; size?: number }) {
  const lines = Array.from({ length: 11 }, (_, i) => (i + 1) * 10);
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full text-[var(--tinta)]" aria-hidden="true">
        <rect x="0.25" y="0.25" width="119.5" height="119.5" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="0.5" />
        {lines.map((v) => (
          <g key={v} stroke="currentColor" strokeOpacity={v === 60 ? 0.18 : 0.08} strokeWidth="0.5">
            <path d={`M${v} 0V120`} />
            <path d={`M0 ${v}H120`} />
          </g>
        ))}
      </svg>
      <Mark name={name} size={size} className="relative" />
    </div>
  );
}

function Download({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      download
      aria-label={label}
      className={`inline-flex h-9 items-center rounded-full bg-[var(--mint)] px-3.5 text-sm font-semibold text-[var(--pandan)] transition-colors hover:bg-[#CDEBDD] ${focusRing}`}
    >
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function BrandPage() {
  return (
    <main className="mx-auto w-full max-w-[128rem] flex-1 px-5 pb-20 pt-8 sm:px-10 lg:px-16 2xl:px-24 sm:pb-28 sm:pt-12 lg:pb-40 lg:pt-20">
      <style>{`html { scroll-behavior: smooth; } @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }`}</style>

      {/* Intro */}
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
        <div>
          <h1 className="text-[clamp(2.25rem,10vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[3.25rem]">
            Brand guide
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-[var(--abo)]">
            <Brand /> is an independent lab in the Philippines building open Filipino speech AI, starting
            with the speech mainstream models miss. This guide covers the logo family and how to use it,
            plus the colours and type that go with it. It matches tiniglabs.digital.
          </p>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-[var(--abo)]">
            The name is always written in lowercase: <strong className="font-semibold text-[var(--tinta)]"><Brand /></strong>,
            never &ldquo;Tinig Labs&rdquo; or &ldquo;TINIG LABS&rdquo;. Product names are lowercase too:{" "}
            <strong className="font-semibold text-[var(--tinta)]">notebook</strong>,{" "}
            <strong className="font-semibold text-[var(--tinta)]">speech corpus</strong>.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/brand/tinig-labs-logos.zip" download className={`${buttonPrimary} ${buttonBlock}`}>
              Download all logos (ZIP)
            </a>
            <a href={`${GITHUB_URL}/tiniglabs.digital/blob/main/BRAND.md`} className={`${buttonSecondary} ${buttonBlock}`}>
              Read BRAND.md
            </a>
          </div>
        </div>
        <div className={`${card} flex items-center justify-center gap-8 bg-[var(--pandan)] py-12 sm:gap-10 sm:py-16`}>
          {MARKS.map((m) => (
            <Mark key={m.name} name={m.name} variant="reversed" size={72} />
          ))}
        </div>
      </div>

      <nav aria-label="On this page" className="mt-14 sm:mt-20">
        <ul className="flex flex-wrap gap-2">
          {CONTENTS.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className={`inline-flex h-9 items-center rounded-full px-3.5 text-sm font-semibold text-[var(--tinta)]/75 ring-1 ring-inset ring-[var(--tinta)]/10 transition-colors hover:bg-[var(--mint)] hover:text-[var(--tinta)] ${focusRing}`}
              >
                {c.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-14 space-y-20 sm:mt-20 sm:space-y-28">
        {/* Family */}
        <Section
          id="family"
          title="The logo family"
          lede={
            <p>
              There are three marks, one for each part of <Brand />. They are drawn on the same 120-unit
              grid with rounded ends and corners, so they look like siblings.
            </p>
          }
        >
          <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
            {MARKS.map((m) => (
              <li key={m.name} className={`${card} flex flex-col bg-white ring-1 ring-inset ring-[var(--tinta)]/[0.08]`}>
                <div className="grid h-40 place-items-center rounded-2xl bg-[var(--gatas)]">
                  <Mark name={m.name} size={96} alt={`${m.title} mark`} />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{m.title}</h3>
                <p className="mt-1 text-sm font-medium text-[var(--pandan)]">For {m.usedFor}</p>
                <p className="mt-3 leading-relaxed text-[var(--abo)]">{m.says}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-[64ch] leading-relaxed">
            Use the Echo t whenever you&apos;re talking about <Brand /> as a whole: the website header,
            social profiles, slides, emails. Use a product mark only inside, or about, that product.
          </p>
        </Section>

        {/* Construction */}
        <Section
          id="construction"
          title="Construction"
          lede={
            <p>
              All three are drawn on a 120 × 120 grid. Never redraw the marks. Use the files in{" "}
              <a href="#files" className={proseLink}>Logos and Icons</a>.
            </p>
          }
        >
          <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
            {MARKS.map((m) => (
              <li key={m.name} className={`${card} bg-white ring-1 ring-inset ring-[var(--tinta)]/[0.08]`}>
                <div className="flex justify-center">
                  <GridTile name={m.name} />
                </div>
                <h3 className="mt-6 text-lg font-semibold">{m.title}</h3>
                <p className="mt-2 leading-relaxed text-[var(--abo)]">{m.construction}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Lockups */}
        <Section
          id="lockups"
          title="Lockups"
          lede={<p>A lockup is the mark next to the wordmark.</p>}
        >
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
            <div className={`${card} flex flex-col gap-8 bg-white ring-1 ring-inset ring-[var(--tinta)]/[0.08]`}>
              <Wordmark />
              <ProductLockup product="notebook" />
              <ProductLockup product="corpus" />
            </div>
            <div className={`${card} flex flex-col gap-8 bg-[var(--pandan)]`}>
              <Wordmark tone="dark" />
              <ProductLockup product="notebook" tone="dark" />
              <ProductLockup product="corpus" tone="dark" />
            </div>
          </div>

          {/* Proportions, drawn at 4× the website size */}
          <figure className={`${card} mt-4 bg-[var(--mint)] lg:mt-6`}>
            <div className="overflow-x-auto">
              <div className="inline-grid grid-cols-[128px_40px_max-content] items-center">
                <Mark size={128} />
                <span aria-hidden="true" />
                <span className={`${montserrat.className} text-[72px] font-semibold leading-none tracking-[-0.02em]`}>
                  tinig labs
                </span>
                {["mark 32 px", "10 px", "wordmark 18 px"].map((l) => (
                  <span
                    key={l}
                    className="mx-0.5 mt-4 border-t-2 border-[var(--pandan)] pt-2 text-center text-xs font-semibold whitespace-nowrap text-[var(--pandan)]"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
            <figcaption className="mt-6 text-sm text-[var(--abo)]">
              On the website: a 32 px mark, an 18 px wordmark and a 10 px gap, shown here at 4×.
            </figcaption>
          </figure>

          <div className="mt-10">
            <Bullets>
              <li>
                <strong className="font-semibold">Wordmark:</strong> &ldquo;tinig labs&rdquo; in Montserrat SemiBold
                (600), letter-spacing −0.02em, in tinta.
              </li>
              <li>
                <strong className="font-semibold">Product lockups:</strong> the product&apos;s mark, then &ldquo;tinig
                labs&rdquo; in Montserrat 600, then the product name in Figtree Medium (500) in abo, a little smaller
                (about 0.75× the wordmark size). For example, <Brand /> <span className="font-medium text-[var(--abo)]">notebook</span>.
              </li>
              <li>
                <strong className="font-semibold">Proportions:</strong> make the mark about 1.75× the wordmark&apos;s
                font size, with a gap of about 0.55× the font size. On the website that&apos;s a 32 px mark, an 18 px
                wordmark and a 10 px gap.
              </li>
              <li>
                Always put the mark on the left. Don&apos;t stack the wordmark under the mark unless you have no room
                for the horizontal version.
              </li>
            </Bullets>
          </div>
        </Section>

        {/* Clear space and minimum size */}
        <Section id="clear-space" title="Clear space and minimum size">
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
            <figure className={`${card} flex flex-col items-center bg-white ring-1 ring-inset ring-[var(--tinta)]/[0.08]`}>
              <div className="border border-dashed border-[var(--pandan)] p-[30px]">
                <Mark size={120} />
              </div>
              <figcaption className="mt-4 text-center text-sm text-[var(--abo)]">
                Dashed line: a quarter of the mark&apos;s width on every side.
              </figcaption>
            </figure>
            <figure className={`${card} flex flex-col bg-white ring-1 ring-inset ring-[var(--tinta)]/[0.08]`}>
              <ul className="flex flex-1 items-center justify-center gap-10">
                {MARKS.map((m) => (
                  <li key={m.name} className="flex flex-col items-center gap-3">
                    <Mark name={m.name} size={m.min} alt={`${m.title} at ${m.min} px`} />
                    <span className="text-sm font-semibold">{m.min} px</span>
                  </li>
                ))}
              </ul>
              <figcaption className="mt-6 text-center text-sm text-[var(--abo)]">
                Smallest sizes. The Arch n is mono below 32 px.
              </figcaption>
            </figure>
          </div>
          <div className="mt-10">
            <Bullets>
              <li>
                <strong className="font-semibold">Clear space:</strong> keep at least a quarter of the mark&apos;s width
                empty on every side (30 units on the 120 grid). Nothing else goes inside that space: text, edges or
                other logos.
              </li>
              <li>
                <strong className="font-semibold">Minimum size:</strong> 24 px for the Echo t and the Banig weave, 20 px
                for the Arch n. Below that, use the app icon PNGs (32 px) or the mono version.
              </li>
              <li>
                Under 32 px, use a mono Arch n instead of the gradient one. The gradient turns muddy when it&apos;s that
                small.
              </li>
            </Bullets>
          </div>
        </Section>

        {/* Colour versions */}
        <Section
          id="versions"
          title="Colour versions"
          lede={
            <p>
              Every mark comes in four versions. Pick the version by the background. Never put the primary version on
              pandan or tinta, and never put the reversed version on gatas.
            </p>
          }
        >
          <div className="space-y-4 sm:space-y-6">
            {VERSIONS.map((v) => (
              <div key={v.variant} className={`${card} grid gap-6 bg-white ring-1 ring-inset ring-[var(--tinta)]/[0.08] lg:grid-cols-[16rem_1fr] lg:items-center`}>
                <div>
                  <h3 className="text-lg font-semibold">{v.label}</h3>
                  <p className="mt-2 leading-relaxed text-[var(--abo)]">{v.body}</p>
                </div>
                <ul className="grid gap-3 sm:grid-cols-3">
                  {MARKS.map((m, i) => {
                    const bg = BG[v.on[i % v.on.length]];
                    return (
                      <li key={m.name} className="flex flex-col gap-2">
                        <div className={`grid h-32 place-items-center rounded-2xl ${bg.className}`}>
                          <Mark name={m.name} variant={v.variant} size={64} alt={`${m.title}, ${v.label.toLowerCase()}, on ${bg.label}`} />
                        </div>
                        <p className="text-sm text-[var(--abo)]">
                          {m.title} on {bg.label}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* App icons */}
        <Section
          id="app-icons"
          title="App icons"
          lede={
            <p>
              App icons are the reversed mark at 70% size on a pandan rounded square (27-unit corner on the 120 grid).
              Use the 512 px for app stores and social profile pictures and the 32 px for favicons. The phone or app
              store adds its own rounding on top, so don&apos;t add extra corners or shadows.
            </p>
          }
        >
          <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
            {MARKS.map((m) => (
              <li key={m.name} className={`${card} bg-white ring-1 ring-inset ring-[var(--tinta)]/[0.08]`}>
                <div className="flex items-end gap-6">
                  {/* eslint-disable-next-line @next/next/no-img-element -- the icon files as they ship */}
                  <img src={`/brand/${m.name}-app-icon.svg`} width={112} height={112} alt={`${m.title} app icon`} className="h-28 w-28" />
                  {/* eslint-disable-next-line @next/next/no-img-element -- the icon files as they ship */}
                  <img src={`/brand/${m.name}-app-icon-32.png`} width={32} height={32} alt={`${m.title} app icon at 32 px`} className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-lg font-semibold">{m.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {ICON_FILES(m.name).map((f) => (
                    <li key={f.href}>
                      <Download href={f.href} label={`Download the ${m.title} app icon, ${f.label}`}>{f.label}</Download>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Section>

        {/* Colour */}
        <Section id="colour" title="Colour">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {PALETTE.map((c) => (
              <li key={c.token} className={`${card} bg-white ring-1 ring-inset ring-[var(--tinta)]/[0.08]`}>
                <div className={`relative h-28 rounded-2xl ${c.swatch}`}>
                  {c.token === "dahon" && (
                    <span aria-hidden="true" className="absolute inset-y-6 left-6 right-1/3 rounded-xl bg-[var(--dahon)]" />
                  )}
                </div>
                <p className="mt-5 flex items-baseline justify-between gap-4">
                  <span className="text-lg font-semibold">{c.token}</span>
                  <span className="text-sm font-medium tabular-nums text-[var(--abo)]">{c.hex}</span>
                </p>
                <p className="mt-2 leading-relaxed text-[var(--abo)]">{c.use}</p>
                {c.note && <p className="mt-2 text-sm leading-relaxed">{c.note}</p>}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-[64ch] leading-relaxed">
            <span className="font-semibold">dahon</span> was added with the logo family and is shown here on pandan,
            the only place it goes.
          </p>
        </Section>

        {/* Type */}
        <Section id="type" title="Type">
          <div className="mb-10">
            <Bullets>
              <li>
                <strong className="font-semibold">Montserrat SemiBold (600)</strong> is only for the brand name: the
                wordmark and every mention of <Brand /> in headings.
              </li>
              <li>
                <strong className="font-semibold">Figtree</strong> (400, 500 and 600) is for everything else: headings,
                body, buttons and product names.
              </li>
            </Bullets>
          </div>
          <ul className={`${card} divide-y divide-[var(--tinta)]/[0.08] bg-white py-2 ring-1 ring-inset ring-[var(--tinta)]/[0.08] sm:py-2`}>
            {TYPE.map((t) => (
              <li key={t.name} className="grid gap-2 py-5 sm:grid-cols-[13rem_1fr] sm:items-baseline sm:gap-8">
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-[var(--abo)]">{t.spec}</p>
                </div>
                <p className={`min-w-0 break-words ${t.className}`}>{t.sample}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Don'ts */}
        <Section id="donts" title="Don'ts">
          <ul className="grid gap-3 md:grid-cols-2">
            {DONTS.map((d) => (
              <li key={d} className="flex gap-4 rounded-2xl bg-white p-5 leading-relaxed ring-1 ring-inset ring-[var(--tinta)]/[0.08]">
                <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-[var(--abo)]" aria-hidden="true">
                  <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M4.5 15.5l11-11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {d}
              </li>
            ))}
          </ul>
        </Section>

        {/* Files */}
        <Section
          id="files"
          title="Files"
          lede={
            <p>
              Every logo file, ready to download. They&apos;re also in{" "}
              <a href="/brand/tinig-labs-logos.zip" download className={proseLink}>one ZIP</a>.
            </p>
          }
        >
          <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-inset ring-[var(--tinta)]/[0.08]">
            <table className="w-full text-left">
              <caption className="sr-only">Logo and icon files</caption>
              <thead className="hidden text-sm text-[var(--abo)] md:table-header-group">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium sm:px-8">Mark</th>
                  <th scope="col" className="px-6 py-4 font-medium sm:px-8">Logos (SVG)</th>
                  <th scope="col" className="px-6 py-4 font-medium sm:px-8">Icons</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--tinta)]/[0.08] md:border-t md:border-[var(--tinta)]/[0.08]">
                {MARKS.map((m) => (
                  <tr key={m.name} className="flex flex-col gap-4 px-6 py-6 sm:px-8 md:table-row md:p-0">
                    <th scope="row" className="font-semibold md:px-8 md:py-6 md:align-top">
                      <span className="flex items-center gap-3">
                        <Mark name={m.name} size={32} />
                        {m.title}
                      </span>
                    </th>
                    <td className="md:px-8 md:py-6 md:align-top">
                      <ul className="flex flex-wrap gap-2" aria-label={`${m.title} logo files`}>
                        {VARIANT_SUFFIX.map((v) => (
                          <li key={v.variant}>
                            <Download href={markSrc(m.name, v.variant)} label={`Download the ${m.title} mark, ${v.label.toLowerCase()} SVG`}>{v.label}</Download>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="md:px-8 md:py-6 md:align-top">
                      <ul className="flex flex-wrap gap-2" aria-label={`${m.title} icon files`}>
                        {ICON_FILES(m.name).map((f) => (
                          <li key={f.href}>
                            <Download href={f.href} label={`Download the ${m.title} app icon, ${f.label}`}>{f.label}</Download>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10">
            <Bullets>
              <li>
                <strong className="font-semibold">Logos:</strong> <code>tinig-labs-mark</code>, <code>notebook-mark</code>{" "}
                and <code>corpus-mark</code>, each as <code>.svg</code> in primary, <code>-reversed</code>,{" "}
                <code>-mono-ink</code> and <code>-mono-white</code> versions.
              </li>
              <li>
                <strong className="font-semibold">Icons:</strong> <code>*-app-icon.svg</code>,{" "}
                <code>*-app-icon-512.png</code> and <code>*-app-icon-32.png</code> for all three, plus{" "}
                <code>*-app-icon-180.png</code> for home-screen icons.
              </li>
            </Bullets>
          </div>
        </Section>
      </div>
    </main>
  );
}
