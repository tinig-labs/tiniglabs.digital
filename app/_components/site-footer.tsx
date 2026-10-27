"use client";

import Link from "next/link";
import { Brand, Wordmark, focusRing } from "./brand";

const FOOTER_LINKS = [
  { label: "Blog", href: "/blog" },
  { label: "GitHub", href: "https://github.com/tinig-labs" },
  { label: "License", href: "/license" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-14 sm:px-10 sm:pb-12 sm:pt-16">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <Link href="/" aria-label="tinig labs home" className={`self-start rounded-sm ${focusRing}`}>
          <Wordmark size="sm" />
        </Link>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 text-[0.9375rem] font-medium sm:flex sm:flex-wrap sm:gap-x-7 sm:gap-y-3 sm:text-sm">
            {FOOTER_LINKS.map((l) => {
              const className = `block rounded-sm py-2.5 text-[var(--tinta)]/80 sm:py-0 underline-offset-4 transition-colors hover:text-[var(--pandan)] hover:underline ${focusRing}`;
              return (
                <li key={l.label}>
                  {l.href.startsWith("/") ? (
                    <Link href={l.href} className={className}>
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className={className}>
                      {l.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="mt-8 flex flex-col gap-1.5 border-t border-[var(--tinta)]/10 pt-6 text-sm leading-relaxed text-[var(--abo)] sm:flex-row sm:justify-between">
        <p><Brand>tinig</Brand> is Filipino for voice.</p>
        <p>© 2026 <Brand />, an independent lab</p>
      </div>
    </footer>
  );
}
