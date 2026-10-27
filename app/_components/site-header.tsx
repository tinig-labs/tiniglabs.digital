"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Wordmark, focusRing } from "./brand";

const MENU_LINKS = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const onBlog = pathname.startsWith("/blog");
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // While the menu is open: lock page scroll, keep Tab inside the header, close on Escape
  useEffect(() => {
    if (!open) return;
    const header = headerRef.current!;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    header.querySelector<HTMLElement>("#mobile-menu a")?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const items = [...header.querySelectorAll<HTMLElement>("a, button")].filter((el) => el.offsetParent);
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    // Back to the inline nav if the viewport grows past the phone layout
    const wide = window.matchMedia("(min-width: 640px)");
    const onWide = () => wide.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full sm:static">
      {/* Blur sits on its own layer: backdrop-filter on the header would trap the fixed menu sheet inside it */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[var(--gatas)]/90 backdrop-blur-md sm:hidden" />
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-10 sm:py-6">
        <Link href="/" aria-label="tinig labs home" onClick={close} className={`rounded-sm ${focusRing}`}>
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden sm:block">
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

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
          className={`relative -mr-2 grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-[var(--mint)] sm:hidden ${focusRing}`}
        >
          <span aria-hidden="true" className="tl-burger relative block h-3.5 w-[22px]" data-open={open}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="tl-sheet fixed inset-x-0 bottom-0 top-[4.5rem] flex flex-col overflow-y-auto bg-[var(--gatas)] px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6 sm:hidden"
        >
          <nav aria-label="Mobile">
            <ul>
              {MENU_LINKS.map((l, i) => {
                const current = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
                return (
                  <li key={l.href} className="tl-sheet-item" style={{ animationDelay: `${60 + i * 50}ms` }}>
                    <Link
                      href={l.href}
                      onClick={close}
                      aria-current={current ? "page" : undefined}
                      className={[
                        "flex items-center justify-between rounded-2xl py-3 text-[2.5rem] font-medium leading-tight tracking-[-0.03em]",
                        current ? "text-[var(--pandan)]" : "text-[var(--tinta)]",
                        focusRing,
                      ].join(" ")}
                    >
                      {l.label}
                      {current && <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[var(--pandan)]" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="tl-sheet-item mt-auto pt-10" style={{ animationDelay: "160ms" }}>
            <Link
              href="/#waitlist"
              onClick={close}
              className={`flex h-14 w-full items-center justify-center rounded-2xl bg-[var(--pandan)] text-base font-semibold text-white transition-colors hover:bg-[#185A42] ${focusRing}`}
            >
              Join the waitlist
            </Link>
            <a
              href="https://github.com/tinig-labs"
              className={`mt-3 flex h-12 w-full items-center justify-center rounded-2xl text-base font-semibold text-[var(--tinta)]/80 transition-colors hover:bg-[var(--mint)] ${focusRing}`}
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
