import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Brand, focusRing } from "../../_components/brand";
import { CORPUS_URL, ORGANIZATION, SITE_URL, jsonLd, pageMetadata } from "../../_components/site";
import { formatDate, getPost } from "../posts";
import { SubscribeForm } from "../subscribe-form";

const post = getPost("speech-corpus-closed-beta");
const url = `/blog/${post.slug}/`;

export const metadata: Metadata = pageMetadata({
  title: { absolute: `${post.title} | talâ` },
  ogTitle: post.title,
  description: post.summary,
  path: url,
  type: "article",
  publishedTime: post.date,
  image: { url: `${url}opengraph-image`, width: 1200, height: 630, alt: post.title },
});

const POST_JSON_LD = {
  "@type": "BlogPosting",
  headline: post.title,
  description: post.summary,
  datePublished: post.date,
  dateModified: post.date,
  inLanguage: "en-PH",
  url: `${SITE_URL}${url}`,
  mainEntityOfPage: `${SITE_URL}${url}`,
  image: `${SITE_URL}${url}opengraph-image`,
  author: { "@id": ORGANIZATION["@id"] },
  publisher: { "@id": ORGANIZATION["@id"] },
  isPartOf: { "@type": "Blog", name: "talâ", url: `${SITE_URL}/blog/` },
};

const link = `rounded-sm font-medium text-[var(--pandan)] underline underline-offset-4 hover:text-[#185A42] ${focusRing}`;

function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-12 text-2xl font-semibold tracking-tight">{children}</h2>;
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-lg leading-relaxed text-[var(--tinta)]/85">{children}</p>;
}

export default function ClosedBetaPost() {
  return (
    <main className="w-full flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(POST_JSON_LD)} />
      <article className="mx-auto max-w-[42rem] px-5 pb-20 pt-8 sm:px-10 sm:pb-28 sm:pt-12 lg:pt-20">
        <Link href="/blog" className={`rounded-sm text-sm font-semibold text-[var(--abo)] hover:text-[var(--pandan)] ${focusRing}`}>
          <span aria-hidden="true">←</span> talâ
        </Link>
        <p className="mt-8 text-sm font-medium text-[var(--abo)]">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h1 className="mt-2 text-balance text-[clamp(2.25rem,9vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[3.25rem]">
          {post.title}
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-[var(--abo)]">
          The first thing <Brand /> set out to build is a speech dataset. Recording has started.
        </p>

        <H2>What it is</H2>
        <P>
          The speech corpus at{" "}
          <a href={CORPUS_URL} className={link}>collect.tiniglabs.digital</a> collects open Tagalog
          speech. Speakers read short sentences and words aloud. Each clip takes a few seconds.
        </P>
        <P>
          Speech professionals then check the phonetic transcription of each clip. SLPs and
          linguists approve or correct it with an on-screen IPA keyboard. The checked
          transcriptions are what make the data useful for speech that today&apos;s AI gets wrong.
        </P>

        <H2>Why a closed beta</H2>
        <P>
          Before opening it to everyone, we&apos;re testing the recording flow, the consent steps,
          and the review process with a small group. It&apos;s easier to fix the protocol now than
          after thousands of clips are in.
        </P>

        <H2>How to take part</H2>
        <P>
          Contributing is invite-only for now. If you have an invite code, create an account and
          enter it during onboarding. If you don&apos;t, you can{" "}
          <a href={`${CORPUS_URL}/contact?topic=beta`} className={link}>request beta access</a>.
          Speech professionals who want to review transcriptions join the same way.
        </P>

        <H2>What&apos;s next</H2>
        <P>
          The beta feeds the pilot dataset: Tagalog syllables and words. After that comes a
          baseline model with open weights and a public benchmark. We&apos;ll write up each step
          here.
        </P>

        <div className="mt-12">
          <a
            href={CORPUS_URL}
            className={`flex h-14 w-full items-center justify-center rounded-2xl bg-[var(--pandan)] px-7 text-base font-semibold text-white transition-colors hover:bg-[#185A42] sm:inline-flex sm:w-auto ${focusRing}`}
          >
            Lend your voice
          </a>
        </div>

        <div className="mt-16 border-t border-[var(--tinta)]/10 pt-10">
          <h2 className="text-lg font-semibold">Get new posts by email</h2>
          <div className="mt-6">
            <SubscribeForm />
          </div>
        </div>
      </article>
    </main>
  );
}
