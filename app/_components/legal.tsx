import Link from "next/link";
import type { ReactNode } from "react";
import { focusRing } from "./brand";

// Shared shell for the terms and privacy pages
export function LegalPage({
  title,
  updated,
  lede,
  summary,
  children,
}: {
  title: string;
  updated: string;
  lede: ReactNode;
  summary?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-28 pt-12 sm:px-10 lg:pb-40 lg:pt-20">
      <h1 className="text-[2.5rem] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[3.25rem]">{title}</h1>
      <p className="mt-4 text-sm text-[var(--abo)]">Last updated {updated}</p>
      <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-[var(--abo)]">{lede}</p>
      {summary && <div className="mt-14">{summary}</div>}
      <article className="mt-20 max-w-[68ch] border-t border-[var(--tinta)]/10 pt-4 leading-relaxed text-[var(--tinta)]/85">
        {children}
      </article>
    </main>
  );
}

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-6">
      <h2 className="mt-14 text-2xl font-semibold tracking-tight text-[var(--tinta)]">{title}</h2>
      {children}
    </section>
  );
}

export const P = ({ children }: { children: ReactNode }) => <p className="mt-4">{children}</p>;

export const List = ({ children }: { children: ReactNode }) => (
  <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-[var(--pandan)]">{children}</ul>
);

const linkClass = `rounded-sm font-medium text-[var(--pandan)] underline underline-offset-4 ${focusRing}`;

export function A({ href, children }: { href: string; children: ReactNode }) {
  return href.startsWith("/") ? (
    <Link href={href} className={linkClass}>{children}</Link>
  ) : (
    <a href={href} className={linkClass}>{children}</a>
  );
}

export const Mail = ({ to }: { to: string }) => <A href={`mailto:${to}`}>{to}</A>;
