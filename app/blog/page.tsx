import type { Metadata } from "next";
import Link from "next/link";
import { Brand, ProductMark, focusRing } from "../_components/brand";
import { pageMetadata } from "../_components/site";
import { POSTS, formatDate } from "./posts";
import { SubscribeForm } from "./subscribe-form";
import { TalaWord } from "./tala-word";

const title = "talâ, the tinig labs blog";
const description = "Notes from an independent lab building open Filipino AI.";

export const metadata: Metadata = pageMetadata({
  title: { absolute: title },
  ogTitle: title,
  description,
  path: "/blog/",
});

export default function BlogPage() {
  return (
    <main className="w-full flex-1">
      <style>{`
        @keyframes tl-bar { from { transform: scaleY(0.05); opacity: 0.3 } to { transform: none; opacity: 1 } }
        .tl-bar { transform-box: fill-box; transform-origin: center; animation: tl-bar 420ms cubic-bezier(.2,.7,.2,1) both; }
        @keyframes tl-fade { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
        .tl-fade { animation: tl-fade 260ms 120ms ease-out both; }
        @keyframes tl-check { from { stroke-dashoffset: 18 } to { stroke-dashoffset: 0 } }
        .tl-check { stroke-dasharray: 18; animation: tl-check 360ms 120ms ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .tl-bar, .tl-fade, .tl-check { animation: none !important; }
          .tl-check { stroke-dasharray: none; }
        }
      `}</style>

      <section className="mx-auto max-w-6xl px-5 pb-20 pt-8 sm:px-10 sm:pb-28 sm:pt-12 lg:pb-36 lg:pt-20">
        <TalaWord />
      </section>

      <section className="mx-auto grid max-w-6xl gap-14 px-5 pb-20 sm:gap-16 sm:px-10 sm:pb-28 lg:grid-cols-2 lg:gap-24 lg:pb-40">
        <div>
          <p className="max-w-[20ch] text-[1.75rem] font-medium leading-[1.2] tracking-[-0.02em] sm:text-[2.5rem]">
            Same spelling, two words. We named the blog after the note.
          </p>
          <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-[var(--abo)]">
            Talâ is where <Brand /> writes up what it learns, from collecting data to releasing
            models. Subscribe and new posts come straight to your inbox.
          </p>
          <div className="mt-8 max-w-[30rem] sm:mt-10">
            <SubscribeForm />
          </div>
        </div>

        <div className="lg:pt-3">
          <h2 className="text-lg font-semibold">Posts</h2>
          <ul className="mt-6 border-t border-[var(--tinta)]/10">
            {POSTS.map((p) => (
              <li key={p.slug} className="border-b border-[var(--tinta)]/10 py-8">
                <p className="flex items-center gap-3 text-sm font-medium text-[var(--abo)]">
                  {p.product && <ProductMark product={p.product} />}
                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                </p>
                <Link
                  href={`/blog/${p.slug}`}
                  className={`mt-2 block rounded-sm text-2xl font-medium tracking-[-0.01em] hover:text-[var(--pandan)] ${focusRing}`}
                >
                  {p.title}
                </Link>
                <p className="mt-2 max-w-[42ch] leading-relaxed text-[var(--abo)]">{p.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
