import Link from "next/link";
import type { ReactNode } from "react";
import { type Product, ProductLockup, ProductMark, focusRing } from "../_components/brand";
import { buttonBlock, buttonPrimary } from "../_components/ui";
import { type Post, formatDate } from "./posts";
import { PostToc } from "./post-toc";
import { SubscribeForm } from "./subscribe-form";

/** A post's outer frame: fills the screen up to 128rem, with wider gutters on large screens */
const frame = "mx-auto w-full max-w-[128rem] px-5 sm:px-10 lg:px-16 2xl:px-24";

export type PostSection = { id: string; title: string; body: ReactNode };

/** Inline link inside a post */
export const postLink = `rounded-sm font-medium text-[var(--pandan)] underline underline-offset-4 hover:text-[#185A42] ${focusRing}`;

/** A paragraph of post copy */
export function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-lg leading-relaxed text-[var(--tinta)]/85">{children}</p>;
}

/*
 * One layout for every post. Phones and tablets get a single column; from lg the post gains a
 * sticky "On this page" rail on the left. Each block renders once and only its grid placement
 * changes.
 *
 * Product posts (with `cta`): from xl the product card and subscribe box move into a sticky rail
 * on the right. From 2xl the side columns share the leftover width equally, so the prose sits
 * mid-page and the card lines up with the right edge of the header.
 *
 *   lg   | toc | prose |              xl   | toc | prose | cta |
 *        |     | cta   |
 *
 * Reports (no `cta`): one wide column beside the contents. Running text keeps a readable measure
 * (.post-measure in globals.css) and figures marked .post-wide use the whole column.
 *
 *   lg+  | toc | summary            |
 *        |     | text  [wide figure ] |
 */
export function PostShell({
  post,
  kicker,
  lede,
  media,
  sections,
  cta,
}: {
  post: Post;
  /** A short label shown after the date, such as "Research report" */
  kicker?: string;
  lede: ReactNode;
  media?: ReactNode;
  sections: PostSection[];
  cta?: { product: Product; home: string; href: string; label: string };
}) {
  const report = !cta;
  const grid = report
    ? "lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-x-16 xl:grid-cols-[12rem_minmax(0,1fr)] 2xl:gap-x-20"
    : "lg:grid-cols-[11rem_minmax(0,40rem)] lg:gap-x-16 xl:grid-cols-[10rem_minmax(0,38rem)_minmax(17rem,1fr)] xl:gap-x-10 2xl:grid-cols-[minmax(12rem,1fr)_minmax(0,44rem)_minmax(18rem,1fr)] 2xl:gap-x-16";

  return (
    <article className={`${frame} pb-20 pt-8 sm:pb-28 sm:pt-12 lg:pb-36 lg:pt-16`}>
      <Link href="/blog" className={`rounded-sm text-sm font-semibold text-[var(--abo)] hover:text-[var(--pandan)] ${focusRing}`}>
        <span aria-hidden="true">←</span> talâ
      </Link>

      <header className="mt-8 lg:mt-12">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-[var(--abo)]">
          {post.product && <ProductMark product={post.product} />}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {kicker && <span className="rounded-full bg-[var(--mint)] px-2.5 py-0.5 font-semibold text-[var(--pandan)]">{kicker}</span>}
        </p>
        <h1 className="mt-3 max-w-[22ch] text-balance text-[clamp(2.25rem,9vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.03em] sm:text-[3.25rem] xl:text-[4rem] 2xl:text-[4.5rem]">
          {post.title}
        </h1>
        {post.author && <p className="mt-4 font-medium text-[var(--tinta)] lg:mt-5">By {post.author}</p>}
        <p className="mt-6 max-w-[52ch] text-xl leading-relaxed text-[var(--abo)] lg:mt-8 xl:text-[1.375rem]">{lede}</p>
      </header>

      <div className={`mt-10 grid sm:mt-12 lg:mt-16 ${grid}`}>
        {media && (
          <div className={`mb-12 lg:row-start-1 lg:mb-16 ${report ? "lg:col-start-2" : "lg:col-span-2 lg:col-start-1"}`}>
            {media}
          </div>
        )}

        <aside className={`hidden lg:col-start-1 lg:block ${report ? "lg:row-span-2 lg:row-start-1" : "lg:row-start-2"}`}>
          <div className="sticky top-10 max-w-[15rem]">
            <PostToc sections={sections.map(({ id, title }) => ({ id, title }))} />
          </div>
        </aside>

        <div className="lg:col-start-2 lg:row-start-2 [&>section:first-child>h2]:mt-0">
          {sections.map((s) => (
            <section key={s.id} aria-labelledby={s.id} className="post-measure">
              <h2 id={s.id} className="mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight sm:scroll-mt-10">
                {s.title}
              </h2>
              {s.body}
            </section>
          ))}
        </div>

        {cta ? (
          <aside
            aria-label="Take part"
            className="mt-12 lg:col-start-2 lg:row-start-3 xl:col-start-3 xl:row-span-2 xl:row-start-1 xl:mt-0 2xl:w-full 2xl:max-w-[26rem] 2xl:justify-self-end"
          >
            <div className="xl:sticky xl:top-10">
              <div className="flex flex-col gap-6 rounded-3xl bg-[var(--mint)] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 xl:flex-col xl:items-stretch xl:p-7">
                <a href={cta.home} className={`self-start whitespace-nowrap rounded-sm sm:self-center xl:self-start ${focusRing}`}>
                  <ProductLockup product={cta.product} />
                </a>
                <a href={cta.href} className={`${buttonPrimary} ${buttonBlock} xl:w-full`}>
                  {cta.label}
                </a>
              </div>
              <div className="mt-16 border-t border-[var(--tinta)]/10 pt-10 xl:mt-10 xl:pt-8">
                <SubscribeForm fit />
              </div>
            </div>
          </aside>
        ) : (
          <div className="mt-16 max-w-[44rem] border-t border-[var(--tinta)]/10 pt-10 lg:col-start-2 lg:row-start-3">
            <SubscribeForm fit />
          </div>
        )}
      </div>
    </article>
  );
}
