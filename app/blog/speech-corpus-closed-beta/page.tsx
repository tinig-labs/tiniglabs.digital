import type { Metadata } from "next";
import { Brand } from "../../_components/brand";
import { CORPUS_URL, ORGANIZATION, SITE_URL, jsonLd, pageMetadata } from "../../_components/site";
import { P, type PostSection, PostShell, postLink as link } from "../post-shell";
import { getPost } from "../posts";

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

const SECTIONS: PostSection[] = [
  {
    id: "what-it-is",
    title: "What it is",
    body: (
      <>
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
      </>
    ),
  },
  {
    id: "why-a-closed-beta",
    title: "Why a closed beta",
    body: (
      <P>
        Before opening it to everyone, we&apos;re testing the recording flow, the consent steps,
        and the review process with a small group. It&apos;s easier to fix the protocol now than
        after thousands of clips are in.
      </P>
    ),
  },
  {
    id: "how-to-take-part",
    title: "How to take part",
    body: (
      <P>
        Contributing is invite-only for now. If you have an invite code, create an account and
        enter it during onboarding. If you don&apos;t, you can{" "}
        <a href={`${CORPUS_URL}/contact?topic=beta`} className={link}>request beta access</a>.
        Speech professionals who want to review transcriptions join the same way.
      </P>
    ),
  },
  {
    id: "whats-next",
    title: "What's next",
    body: (
      <P>
        The beta feeds the pilot dataset: Tagalog syllables and words. After that comes a
        baseline model with open weights and a public benchmark. We&apos;ll write up each step
        here.
      </P>
    ),
  },
];

export default function ClosedBetaPost() {
  return (
    <main className="w-full flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(POST_JSON_LD)} />
      <PostShell
        post={post}
        lede={
          <>
            The first thing <Brand /> set out to build is a speech dataset. Recording has started.
          </>
        }
        sections={SECTIONS}
        cta={{ product: "corpus", home: CORPUS_URL, href: CORPUS_URL, label: "Lend your voice" }}
      />
    </main>
  );
}
