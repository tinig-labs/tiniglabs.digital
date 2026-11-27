import type { Metadata } from "next";
import { Brand, focusRing } from "../../_components/brand";
import { CORPUS_URL, NOTEBOOK_URL, ORGANIZATION, SITE_URL, jsonLd, pageMetadata } from "../../_components/site";
import { P, type PostSection, PostShell, postLink as link } from "../post-shell";
import { getPost } from "../posts";

const post = getPost("notebook-closed-beta");
const url = `/blog/${post.slug}/`;

// Served from public/blog/notebook-closed-beta/
const VIDEO = `${url}notebook-promo.mp4`;
const POSTER = `${url}notebook-promo-poster.png`;
const REQUEST_URL = `${NOTEBOOK_URL}/#request`;

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
  video: {
    "@type": "VideoObject",
    name: "The tinig labs notebook",
    description: "A 90-second tour of the recording notebook for speech-language pathologists.",
    thumbnailUrl: `${SITE_URL}${POSTER}`,
    contentUrl: `${SITE_URL}${VIDEO}`,
    uploadDate: post.date,
    duration: "PT1M27S",
  },
};

// The promo's narration, from the notebook repo's promo/src/script.ts
const TRANSCRIPT = [
  "A therapy session is a dozen drills. Then come the clipboards, the voice memos, and the transcribing after hours.",
  "Meet the tinig labs notebook. Your patients' voices, organised.",
  "Pick a patient and a target from your own word list. The target shows as a flashcard, so your patient can read it across the table. One tap records clean, unprocessed audio, trial after trial.",
  "A phoneme model drafts the IPA. The notebook lines it up against your ideal pronunciation, sound by sound, marks each substitution, omission, distortion or addition, and suggests the phonological process.",
  "You stay the clinician. Tap any sound to correct it, and the scores update instantly.",
  "Every recording feeds percent consonants correct for that target, so you can see, and hear, progress from baseline to today.",
  "It works offline and syncs across Android, iPhone, iPad and computers. Patient data is encrypted on your device, with no passphrase to remember. And you can export everything, any time.",
  "For therapy centres, that means every therapist records and scores the same way, with less paperwork and more time with patients.",
  "The notebook is in closed beta for practising SLPs. Request access at notebook.tiniglabs.digital.",
];

const SECTIONS: PostSection[] = [
  {
    id: "what-it-is",
    title: "What it is",
    body: (
      <>
        <P>
          The notebook at <a href={NOTEBOOK_URL} className={link}>notebook.tiniglabs.digital</a> is
          where speech-language pathologists keep their patients&apos; recordings. You pick a
          target from your own word list and record the patient saying it.
        </P>
        <P>
          A phoneme model drafts the IPA. The notebook lines it up against the ideal IPA sound by
          sound, marks each substitution, omission, distortion or addition, and suggests the
          phonological process. You correct the draft in place, and percent consonants correct
          for each target builds up over time.
        </P>
      </>
    ),
  },
  {
    id: "private-by-default",
    title: "Private by default",
    body: (
      <P>
        It installs on Android, iPhone, iPad and computers, works offline, and syncs between
        devices. Patient data is encrypted on the device before it&apos;s stored or synced,
        with no passphrase to remember. You can export everything to a ZIP at any time.
      </P>
    ),
  },
  {
    id: "why-a-closed-beta",
    title: "Why a closed beta",
    body: (
      <P>
        A clinical tool has to fit how sessions actually run. We&apos;re starting with a small
        group of practising SLPs, so their caseloads shape the notebook before anyone else
        relies on it.
      </P>
    ),
  },
  {
    id: "how-to-take-part",
    title: "How to take part",
    body: (
      <P>
        The beta is for practising SLPs. <a href={REQUEST_URL} className={link}>Request access</a>{" "}
        on the notebook&apos;s home page, and you&apos;ll get an email once you&apos;re approved.
      </P>
    ),
  },
  {
    id: "how-it-fits",
    title: "How it fits",
    body: (
      <P>
        The notebook is separate from the{" "}
        <a href={CORPUS_URL} className={link}>speech corpus</a>, which is still recording in its
        own closed beta. The corpus builds open data and models. The notebook puts that kind of
        model to work for clinicians today.
      </P>
    ),
  },
];

const MEDIA = (
  <>
    <figure>
      <video
        controls
        playsInline
        preload="metadata"
        poster={POSTER}
        width={1920}
        height={1080}
        aria-label="Promo video: a 90-second tour of the tinig labs notebook"
        className="aspect-video h-auto w-full rounded-2xl bg-[var(--mint)] shadow-[0_1px_2px_rgba(19,38,31,0.06),0_12px_32px_-12px_rgba(19,38,31,0.18)]"
      >
        <source src={VIDEO} type="video/mp4" />
        <a href={VIDEO} className={link}>Download the video</a>
      </video>
      <figcaption className="mt-3 px-1 text-sm text-[var(--abo)]">
        A 90-second tour. Patients and therapists in it are fictional.
      </figcaption>
    </figure>

    <details className="group mt-6 rounded-2xl border border-[var(--tinta)]/10 px-5 py-4">
      <summary className={`cursor-pointer rounded-sm font-semibold text-[var(--tinta)] marker:text-[var(--pandan)] ${focusRing}`}>
        Read the transcript
      </summary>
      <div className="mt-2 max-w-[68ch] space-y-3 pb-1 leading-relaxed text-[var(--tinta)]/80">
        {TRANSCRIPT.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </details>
  </>
);

export default function NotebookBetaPost() {
  return (
    <main className="w-full flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(POST_JSON_LD)} />
      <PostShell
        post={post}
        lede={
          <>
            The second thing <Brand /> built is a tool for the clinicians the speech corpus is for.
            It&apos;s ready for its first users.
          </>
        }
        media={MEDIA}
        sections={SECTIONS}
        cta={{ product: "notebook", home: NOTEBOOK_URL, href: REQUEST_URL, label: "Request access" }}
      />
    </main>
  );
}
