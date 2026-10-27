import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Brand } from "../_components/brand";

const title = "License";
const description =
  "The tinig labs website code is available under the Functional Source License 1.1, with Apache 2.0 as the future license.";

export const metadata: Metadata = {
  title: `${title} | tinig labs`,
  description,
  alternates: { canonical: "/license" },
  openGraph: { type: "website", siteName: "tinig labs", title, description, url: "/license" },
  twitter: { card: "summary", title, description },
};

// LICENSE.md at the repo root is the source of truth; the page renders it at build time
const LICENSE = readFileSync(path.join(process.cwd(), "LICENSE.md"), "utf8");

const link = "rounded-sm font-medium text-[var(--pandan)] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--pandan)]";

// Just enough Markdown for the license: headings, numbered lists, bare URLs, paragraphs
function renderLicense(md: string) {
  const out: ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (!list.length) return;
    out.push(
      <ol key={out.length} className="mt-4 list-decimal space-y-2 pl-6 marker:text-[var(--abo)]">
        {list.map((item) => <li key={item} className="pl-1">{item}</li>)}
      </ol>,
    );
    list = [];
  };

  for (const block of md.trim().split(/\n\s*\n/)) {
    const text = block.replace(/\s*\n\s*/g, " ").trim();
    const item = text.match(/^\d+\.\s+(.*)$/);
    if (item) {
      list.push(item[1]);
      continue;
    }
    flush();
    const key = out.length;
    if (text.startsWith("# ")) continue; // the page has its own h1
    if (text.startsWith("## ")) {
      out.push(<h2 key={key} className="mt-14 text-2xl font-semibold tracking-tight">{text.slice(3)}</h2>);
    } else if (text.startsWith("### ")) {
      out.push(<h3 key={key} className="mt-10 text-lg font-semibold">{text.slice(4)}</h3>);
    } else if (/^https?:\/\/\S+$/.test(text)) {
      out.push(<p key={key} className="mt-4"><a href={text} className={link}>{text}</a></p>);
    } else {
      out.push(<p key={key} className="mt-4">{text}</p>);
    }
  }
  flush();
  return out;
}

export default function LicensePage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-28 pt-12 sm:px-10 lg:pb-40 lg:pt-20">
      <h1 className="text-[2.5rem] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[3.25rem]">License</h1>
      <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-[var(--abo)]">
        The code for this website is under the Functional Source License 1.1, with Apache 2.0 as
        the future license (FSL-1.1-ALv2). Models, datasets, and tools from <Brand /> each ship
        with their own license.
      </p>

      {/* The one idea worth seeing at a glance: the license changes with time */}
      <ol aria-label="How the license changes over time" className="mt-14 grid gap-3 rounded-[28px] bg-[var(--mint)] p-3 md:grid-cols-2">
        <li className="rounded-[20px] bg-white p-7 sm:p-9">
          <p className="text-sm font-medium text-[var(--abo)]">When a version is published</p>
          <p className="mt-2 text-[2rem] font-semibold leading-tight tracking-[-0.02em]">FSL 1.1</p>
          <p className="mt-3 max-w-[38ch] leading-relaxed text-[var(--abo)]">
            Use, copy, and change the code for anything except a commercial product that competes
            with it.
          </p>
        </li>
        <li className="rounded-[20px] bg-[var(--pandan)] p-7 text-white sm:p-9">
          <p className="text-sm font-medium text-white/75">Two years later</p>
          <p className="mt-2 text-[2rem] font-semibold leading-tight tracking-[-0.02em]">Apache 2.0</p>
          <p className="mt-3 max-w-[38ch] leading-relaxed text-white/85">
            That version also becomes available under Apache 2.0, with no competing-use limit.
          </p>
        </li>
      </ol>
      <p className="mt-4 max-w-[60ch] text-sm text-[var(--abo)]">
        This summary is for orientation. The full text below is what applies.
      </p>

      <article className="mt-20 max-w-[68ch] border-t border-[var(--tinta)]/10 pt-4 leading-relaxed text-[var(--tinta)]/85">
        {renderLicense(LICENSE)}
      </article>
    </main>
  );
}
