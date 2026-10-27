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
    <footer className="mx-auto w-full max-w-6xl px-6 pb-12 pt-16 sm:px-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <Wordmark size="sm" />
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium">
            {FOOTER_LINKS.map((l) => {
              const className = `rounded-sm text-[var(--tinta)]/80 underline-offset-4 transition-colors hover:text-[var(--pandan)] hover:underline ${focusRing}`;
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
      <div className="mt-10 flex flex-col gap-2 border-t border-[var(--tinta)]/10 pt-6 text-sm text-[var(--abo)] sm:flex-row sm:justify-between">
        <p><Brand>tinig</Brand> is Filipino for voice.</p>
        <p>© 2026 <Brand />, an independent lab</p>
      </div>
    </footer>
  );
}
