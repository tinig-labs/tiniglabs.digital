// Shared tinig labs footer. The canonical copy lives in tiniglabs.com at
// app/_components/site-footer.tsx; collect.tiniglabs.digital and notebook.tiniglabs.digital carry
// byte-identical copies. Edit the canonical file, then run `npm run footer:sync` in tiniglabs.com
// (`npm run footer:check` reports drift). It needs `Brand` and `Wordmark` from ./brand, the mark
// files in public/brand/ and the palette variables (--tinta, --abo, --pandan, --mint) in
// globals.css, which every app has.

import Link from "next/link";
import { Brand, Wordmark } from "./brand";

export type FooterLink = { label: string; href: string };
type Project = "lab" | "corpus" | "notebook";

// The logo family, identical in every app. Each pill carries its own mark (BRAND.md). The Arch n
// uses its mono version below 32 px, where its gradient turns muddy.
const FAMILY: { id: Project; name: string; href: string; mark: string; home: string }[] = [
  { id: "lab", name: "tinig labs", href: "https://tiniglabs.digital", mark: "tinig-labs-mark", home: "tinig labs home" },
  { id: "corpus", name: "speech corpus", href: "https://collect.tiniglabs.digital", mark: "corpus-mark", home: "Speech corpus home" },
  { id: "notebook", name: "notebook", href: "https://notebook.tiniglabs.digital", mark: "notebook-mark-mono-ink", home: "Notebook home" },
];

// Every app serves these pages, under these names.
const SHARED_LINKS: FooterLink[] = [
  { label: "Brand", href: "/brand" },
  { label: "GitHub", href: "https://github.com/tinig-labs" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--pandan)]";

function FooterAnchor({ href, className, current, children }: { href: string; className: string; current?: boolean; children: React.ReactNode }) {
  return href.startsWith("/") ? (
    <Link href={href} className={className} aria-current={current ? "page" : undefined}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

/**
 * `current`: the app this footer is in. Its pill is highlighted and links home.
 * `links`: this app's own pages, listed before the shared ones.
 * `compact`: inside an app shell. Phones skip the wordmark (the header carries it) and get
 * tighter spacing; from sm up it's the full footer.
 */
export function SiteFooter({ current, links, compact = false }: { current: Project; links: FooterLink[]; compact?: boolean }) {
  const home = FAMILY.find((p) => p.id === current)!.home;
  return (
    <footer
      className={`mx-auto w-full max-w-[128rem] px-5 sm:px-10 lg:px-16 2xl:px-24 sm:pb-12 sm:pt-16 ${
        compact ? "pb-8 pt-10" : "pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-14"
      }`}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Link href="/" aria-label={home} className={`self-start rounded-sm ${focusRing} ${compact ? "hidden sm:block" : ""}`}>
          <Wordmark />
        </Link>
        <nav aria-label="tinig labs projects">
          <ul className="flex flex-wrap gap-2">
            {FAMILY.map((p) => {
              const here = p.id === current;
              return (
                <li key={p.id}>
                  <FooterAnchor
                    href={here ? "/" : p.href}
                    current={here}
                    className={`flex min-h-10 items-center gap-2 rounded-full border py-1 pl-1.5 pr-4 text-sm font-medium transition-colors ${focusRing} ${
                      here
                        ? "border-transparent bg-[var(--mint)] text-[var(--pandan)]"
                        : "border-[var(--tinta)]/12 text-[var(--tinta)]/75 hover:border-[var(--pandan)]/40 hover:text-[var(--pandan)]"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- tiny static SVGs, nothing to optimise */}
                    <img src={`/brand/${p.mark}.svg`} width={24} height={24} alt="" aria-hidden="true" className="block size-6 shrink-0" />
                    {p.id === "lab" ? <Brand /> : p.name}
                  </FooterAnchor>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <nav aria-label="Footer" className={compact ? "mt-6 sm:mt-8" : "mt-8"}>
        <ul className="grid grid-cols-2 gap-x-6 text-[0.9375rem] font-medium sm:flex sm:flex-wrap sm:gap-x-7 sm:gap-y-3 sm:text-sm">
          {[...links, ...SHARED_LINKS].map((l) => (
            <li key={l.label}>
              <FooterAnchor
                href={l.href}
                className={`block rounded-sm py-2.5 text-[var(--tinta)]/80 underline-offset-4 transition-colors hover:text-[var(--pandan)] hover:underline sm:py-0 ${focusRing}`}
              >
                {l.label}
              </FooterAnchor>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={`flex flex-col gap-1.5 border-t border-[var(--tinta)]/10 text-sm leading-relaxed text-[var(--abo)] sm:mt-8 sm:flex-row sm:justify-between sm:pt-6 ${
          compact ? "mt-6 pt-5" : "mt-8 pt-6"
        }`}
      >
        <p>
          <Brand>tinig</Brand> is Filipino for voice.
        </p>
        <p>
          © 2026 <Brand />, an independent lab
        </p>
      </div>
    </footer>
  );
}
