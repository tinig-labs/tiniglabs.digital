"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark, focusRing } from "./brand";

export function SiteHeader() {
  const onBlog = usePathname().startsWith("/blog");

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-6 sm:px-10">
      <Link href="/" aria-label="tinig labs home" className={`rounded-sm ${focusRing}`}>
        <Wordmark />
      </Link>

      <nav aria-label="Main">
        <ul className="flex items-center gap-1">
          <li>
            <Link
              href="/blog"
              aria-current={onBlog ? "page" : undefined}
              className={[
                "block rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                onBlog
                  ? "bg-[var(--mint)] text-[var(--tinta)]"
                  : "text-[var(--tinta)]/70 hover:bg-[var(--mint)] hover:text-[var(--tinta)]",
                focusRing,
              ].join(" ")}
            >
              Blog
            </Link>
          </li>
          <li>
            {/* Waitlist lives on the home page, so this works from any route */}
            <Link
              href="/#waitlist"
              className={`block rounded-full px-4 py-2 text-sm font-semibold text-[var(--pandan)] transition-colors hover:bg-[var(--mint)] ${focusRing}`}
            >
              Join the waitlist
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
