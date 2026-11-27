import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Brand, focusRing } from "../../_components/brand";
import { proseLink } from "../../_components/ui";
import { ORGANIZATION, SITE_URL, jsonLd, pageMetadata } from "../../_components/site";
import { formatDate, getPost } from "../posts";
import { SubscribeForm } from "../subscribe-form";
import { CLIPS, RESULTS } from "./lab-data";
import {
  type Change,
  ChangesTable,
  ClipTable,
  KwfPilotTable,
  RatioExplainer,
  ResultsTable,
  type ScoreRow,
  Scorecard,
  TransferChart,
} from "./lab-figures";

const post = getPost("zero-shot-torgo");
const url = `/blog/${post.slug}/`;

const PAPER_URL = "https://arxiv.org/abs/2503.01266";
const TORGO_URL = "https://www.cs.toronto.edu/~complingweb/data/TORGO/torgo.html";
const KWF_URL = "https://kwfdiksiyonaryo.ph/";

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
  citation: [
    "Moëll, B., Sand Aronsson, F. (2025) Voice Cloning for Dysarthric Speech Synthesis: Addressing Data Scarcity in Speech-Language Pathology. arXiv:2503.01266.",
    "Rudzicz, F., Namasivayam, A.K., Wolff, T. (2012) The TORGO database of acoustic and articulatory speech from speakers with dysarthria. Language Resources and Evaluation, 46(4), 523–541.",
    "Komisyon sa Wikang Filipino. KWF Diksiyonaryo ng Wikang Filipino. https://kwfdiksiyonaryo.ph/",
  ],
};

// Tagalog clones, standard setup (std-s05, KWF spelling). Values from eval/results.json.
const SCORECARD: ScoreRow[] = [
  {
    trait: "Sounds like the same person",
    detail: "Voice-match score against the speaker's real recordings",
    F03: { verdict: "kept", note: "0.31 against F03, against 0.05 for the control and 0.22 for F01. Our native listener agreed." },
    F01: { verdict: "unclear", note: "0.40 against F01 but 0.38 against F03, from only 2 test clips. Clearly not the control (0.03). Our native listener did hear it as F01." },
  },
  {
    trait: "Voice quality",
    detail: "Roughness and breathiness: harmonics-to-noise, jitter and shimmer",
    F03: { verdict: "partly", note: "0.52 for shimmer, the only one of the three where real F03 differs from the control." },
    F01: { verdict: "kept", note: "0.78 to 0.86 on all three measures." },
  },
  {
    trait: "Flat, monotone pitch",
    detail: "How little the voice rises and falls",
    F03: { verdict: "unclear", note: "0.38, but the margin reaches zero." },
    F01: { verdict: "partly", note: "0.30." },
  },
  {
    trait: "Harder to understand",
    detail: "How often speech recognition mishears words",
    F03: { verdict: "kept", note: "0.95. The clone was misheard 15% of the time, the control's clone 3%. Wide margin (0.18 to 2.97)." },
    F01: { verdict: "partly", note: "0.30. The clone was misheard 18% of the time, the control's clone 3%. Real F01: 54%." },
  },
  {
    trait: "Speaking pace and pauses",
    detail: "Compared with each speaker's own real recordings",
    F03: { verdict: "lost", note: "The clone speaks 4.3 syllables a second with 2% pauses. Real F03: 2.8 and 15%." },
    F01: { verdict: "partly", note: "The clone stays near F01's real pace (2.7 against 2.3 syllables a second) but pauses less (8% against 21%)." },
  },
];

const CHANGES: Change[] = [
  {
    tried: "A severe speaker",
    what: "Adding F01 alongside mild F03",
    result: "Much more came through. Voice quality kept 0.78 to 0.86 of the gap, against 0.52 for F03.",
  },
  {
    tried: "KWF spelling",
    what: "Accent marks from the KWF Diksiyonaryo",
    result: "Mishearings of the control's clone fell from 11% to 3%. Only then could we see the dysarthric gap in Tagalog.",
  },
  {
    tried: "Salient reference",
    what: "Cloning from each speaker's most impaired sentences",
    result: "Helped in English. F03's intelligibility ratio rose from 0.11 to 0.26–0.30, and the clone matched F03 better (0.33 to 0.42). In Tagalog it was mixed: the best pitch result (0.60), but the control's clone also got harder to understand. To our listener, F03's salient clone didn't sound more impaired; it mainly said kayumanggi differently.",
  },
  {
    tried: "Stability 0",
    what: "ElevenLabs' most expressive setting, instead of 0.5",
    result: "Helped F01 in Tagalog, raising its intelligibility ratio from 0.30 to 0.49. Little change for F03.",
  },
];

function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-14 text-2xl font-semibold tracking-tight">{children}</h2>;
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-9 text-lg font-semibold">{children}</h3>;
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-lg leading-relaxed text-[var(--tinta)]/85">{children}</p>;
}

function List({ children, ordered = false }: { children: ReactNode; ordered?: boolean }) {
  const cls = `mt-4 space-y-2 pl-6 text-lg leading-relaxed text-[var(--tinta)]/85 marker:text-[var(--pandan)] ${ordered ? "list-decimal marker:font-semibold" : "list-disc"}`;
  return ordered ? <ol className={cls}>{children}</ol> : <ul className={cls}>{children}</ul>;
}

export default function ZeroShotTorgoPost() {
  const tableRows = RESULTS?.rows.filter((r) => r.condition !== "clone-tl-plain") ?? [];
  return (
    <main className="w-full flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(POST_JSON_LD)} />
      <article className="mx-auto max-w-[42rem] px-5 pb-20 pt-8 sm:px-10 sm:pb-28 sm:pt-12 lg:pt-20">
        <Link href="/blog" className={`rounded-sm text-sm font-semibold text-[var(--abo)] hover:text-[var(--pandan)] ${focusRing}`}>
          <span aria-hidden="true">←</span> talâ
        </Link>
        <p className="mt-8 text-sm font-medium text-[var(--abo)]">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · Research report
        </p>
        <h1 className="mt-2 text-balance text-[clamp(2.25rem,9vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[3.25rem]">
          {post.title}
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-[var(--abo)]">
          Can a voice clone of someone with dysarthria speak Tagalog and still sound like them,
          dysarthria included? <Brand /> tested it on three English speakers from the TORGO dataset.
        </p>

        <section aria-labelledby="in-short" className="mt-10 rounded-3xl bg-[var(--mint)] p-6 sm:p-8">
          <h2 id="in-short" className="text-sm font-semibold text-[var(--pandan)]">In short</h2>
          <ul className="mt-4 space-y-3 leading-relaxed">
            <li><b>The clones sound like the person,</b> in English and in Tagalog, both to a voice-match model and to a native listener.</li>
            <li><b>Voice quality carries over into Tagalog,</b> the roughness and breathiness of a dysarthric voice. The more severe the dysarthria, the more comes through.</li>
            <li><b>Being hard to understand carries over only partly,</b> and only in Tagalog. In English the clones speak far more clearly than the real person.</li>
            <li><b>Slow, pausing speech mostly doesn&apos;t carry over.</b> The clones speak faster and pause less than any real speaker.</li>
            <li><b>Spelling matters.</b> Writing the Tagalog with KWF Diksiyonaryo accent marks cut speech-recognition errors on a control voice by two-thirds.</li>
          </ul>
        </section>

        <H2>Why it matters</H2>
        <P>
          Speech models fail most often on the people who need them most. Training a model that
          understands dysarthric speech takes recordings of dysarthric speech, and those are scarce
          in any language. In Tagalog there are, as far as we know, none in the open.
        </P>
        <P>
          Recording patients is slow, tiring for them, and rightly guarded by privacy rules. So we
          asked whether synthetic speech could fill part of the gap, for prototyping and for
          training clinicians&apos; ears.
        </P>

        <H2>Background</H2>
        <P>
          In 2025, Birger Moëll and Fredrik Sand Aronsson{" "}
          <a href={PAPER_URL} className={proseLink}>cloned the voices of TORGO speakers</a> with
          ElevenLabs. A speech-language pathologist heard dysarthria in every dysarthric clip, real
          or synthetic, and took 30% of the synthetic clips for real recordings. Their study had
          three gaps that this one addresses: it was English only, it had one rater who was also an
          author, and it reported no objective measurements.
        </P>

        <H2>What we did</H2>
        <List ordered>
          <li>
            <b>Picked three speakers</b> from the University of Toronto&apos;s{" "}
            <a href={TORGO_URL} className={proseLink}>TORGO</a> dataset: F01, a woman with severe
            dysarthria; F03, a woman with mild dysarthria; and FC03, a woman without dysarthria as a
            control. All of them speak English.
          </li>
          <li>
            <b>Cloned each voice</b> with ElevenLabs (<code>eleven_v3</code>) from one to two minutes
            of their English sentences, about 54 seconds for F01, who recorded fewer.
          </li>
          <li>
            <b>Had each clone read Tagalog,</b> 12 sentences translated from the speakers&apos; own
            English ones. We spelled them with accent marks following the{" "}
            <a href={KWF_URL} className={proseLink}>KWF Diksiyonaryo</a>, checked by a native
            speaker, so the stress and glottal stops are written down: <i>batà</i> (child),{" "}
            <i>bakít</i>, <i>gumawâ</i>.
          </li>
          <li>
            <b>Measured the clones</b> against real recordings we had held back. We used a
            voice-match model, speech recognition (Whisper) and acoustic measures (Praat).
          </li>
        </List>
        <P>
          The control speaker is what makes this work. Any clone sounds a little foreign in Tagalog.
          Comparing the dysarthric clones with the control&apos;s clone separates dysarthria from
          accent.
        </P>

        <H2>Listen</H2>
        <P>
          Each speaker&apos;s real recordings come first, then their clones. The Tagalog line
          translates the English one, so you can hear the same voice in both languages. Real clips
          are from TORGO; everything else is synthetic.
        </P>
        <ClipTable clips={CLIPS} />

        {RESULTS && (
          <>
            <H2>What we found</H2>
            <P>
              The scorecard sums it up for the Tagalog clones. Each cell says whether a trait of the
              real speaker survived cloning.
            </P>
            <Scorecard rows={SCORECARD} />
            <RatioExplainer />

            <H3>1. The clones sound like the person, even in Tagalog</H3>
            <P>
              F03&apos;s Tagalog clone scores 0.31 on the voice-match model against F03, but only 0.05
              against the control. A stock Tagalog voice scores 0.07 or less against any of the
              speakers. Two real recordings of the same person score 0.65 to 0.80, so the clones are
              recognisable but not perfect.
            </P>

            <H3>2. Voice quality comes through, most for severe dysarthria</H3>
            <P>
              Dysarthric voices often sound rough or breathy. F01&apos;s Tagalog clone keeps 78 to 86%
              of the gap between F01 and the control on all three voice-quality measures. For F03,
              whose voice differs less from the control&apos;s, the clone keeps about half.
            </P>

            <H3>3. Being hard to understand carries into Tagalog, not into English</H3>
            <P>
              We use speech recognition as a stand-in for a listener. Real F01 was misheard 54% of
              the time, real F03 15% and the control 3%.
            </P>
            <P>
              In English, the clones lose almost all of that: F01&apos;s clone was misheard only 3% of
              the time, and F03&apos;s 1%. In Tagalog, some of it stays. F01&apos;s clone was misheard
              18% of the time and F03&apos;s 15%, against 3% for the control&apos;s clone. We
              don&apos;t know why the effect is stronger in Tagalog.
            </P>

            <H3>4. Pace and pauses don&apos;t come through</H3>
            <P>
              Real speech in this dataset runs at 2.3 to 2.8 syllables a second, with 14 to 21% of
              the time spent in pauses. The F03 and control clones speak at 4.3 to 4.7 syllables a
              second and barely pause. F01&apos;s clone stays nearer F01&apos;s real pace but pauses
              much less than F01 does.
            </P>

            <H3>5. Spelling matters</H3>
            <P>
              Plain Tagalog spelling doesn&apos;t mark stress or glottal stops, and the clones
              mispronounced words like <i>tumalón</i>. Adding KWF accent marks cut speech-recognition
              errors on the control&apos;s clone from 11% to 3%, and on a stock voice from 10% to 5%.
            </P>
            <P>
              F03&apos;s clone stayed at about 15%. The marks fix pronunciation, not dysarthria,
              which is what let the dysarthric gap show.
            </P>
            <KwfPilotTable pilot={RESULTS.kwfPilot} />

            <H2>What a native listener heard</H2>
            <P>
              One of us, a native Tagalog speaker, listened to the clips. They aren&apos;t a
              clinician, so this says nothing about how severe the dysarthria is, only how the clips
              sound to a native ear. It&apos;s one listener, informal and not blinded.
            </P>
            <List>
              <li>
                <b>Same person:</b> all three Tagalog clones sounded like their real recordings,
                including F01&apos;s, where the voice-match model couldn&apos;t tell.
              </li>
              <li>
                <b>Tagalog:</b> mostly correct, but some words were still stressed or pronounced
                wrong, even with KWF spelling.
              </li>
              <li>
                <b>Dysarthria:</b> in the standard setup, both F01&apos;s and F03&apos;s Tagalog clones
                sounded different from the control&apos;s, beyond being a different voice. That
                agrees with the measurements.
              </li>
              <li>
                <b>Salient reference:</b> F03&apos;s salient clone didn&apos;t sound more impaired than
                its standard clone. The main audible difference was how it pronounced{" "}
                <i>kayumanggi</i>.
              </li>
              <li>
                <b>What the clones lose:</b> the real dysarthric speakers&apos; words were harder to
                make out than their clones&apos;. Speech recognition found the same thing.
              </li>
            </List>

            <H2>Did the changes help?</H2>
            <P>
              Besides the standard setup, we tried four changes meant to carry more of the
              dysarthria across.
            </P>
            <ChangesTable rows={CHANGES} />
          </>
        )}

        <H2>Limitations</H2>
        <List>
          <li>Three speakers is a small study. With 6 to 12 clips per speaker and setting, the margins are wide, and small differences can be noise.</li>
          <li>No clinician listened. Apart from one native speaker&apos;s informal impressions, the results are automatic measurements, not a listening test.</li>
          <li>F01 recorded only 12 usable sentences, so its voice-match scores rest on 2 test clips and aren&apos;t reliable.</li>
          <li>F01&apos;s recordings are much cleaner than the control&apos;s, at 24 against 12 dB harmonics-to-noise. Some of its voice-quality gap is probably the recording, not the voice.</li>
          <li>TORGO&apos;s speakers recorded English. Every Tagalog clone carries an English accent; the control speaker lets us separate that from dysarthria.</li>
          <li>Words were checked against the KWF Diksiyonaryo one by one only where we were unsure. The rest follow KWF&apos;s accent conventions.</li>
          <li>
            The real recordings come from TORGO, which is free for academic, non-profit use. This
            is non-commercial research, and the dataset is cited below. The voice clones were
            private and are deleted after the study.
          </li>
          <li>
            The original paper&apos;s numbers don&apos;t all line up: its methods mention 200 rated
            recordings while its results use 20, and it lists aphasia samples that TORGO doesn&apos;t
            have. We rely on its direction, not its exact figures.
          </li>
        </List>

        <details className="group mt-14 rounded-2xl border border-[var(--tinta)]/10 px-5 py-4">
          <summary className={`cursor-pointer rounded-sm text-lg font-semibold text-[var(--tinta)] marker:text-[var(--pandan)] ${focusRing}`}>
            Methods in detail
          </summary>
          <div className="pb-2">
            <H3>Data</H3>
            <P>
              We kept read sentences only, from the head-worn microphone where available, at
              TORGO&apos;s 16 kHz. Each reference was trimmed and loudness-matched. F03 and FC03
              each have about two minutes; F01 has 54 seconds from 9 sentences. Twelve sentences
              were held back from cloning as test material: F03 and FC03 recorded all 12, F01 only 2.
              For F01&apos;s speech measures we also used its 9 reference sentences, but never for
              voice matching.
            </P>

            <H3>Cloning and settings</H3>
            <P>
              We used ElevenLabs Instant Voice Cloning with background-noise removal off, so a
              denoiser couldn&apos;t strip out breathiness or roughness. Every clip used{" "}
              <code>eleven_v3</code> with similarity 0.9, style 0 and speaker boost on. We compared
              four setups:
            </P>
            <List>
              <li><b>Standard reference, stability 0.5</b> (the standard setup in the scorecard).</li>
              <li><b>Standard reference, stability 0.</b></li>
              <li>
                <b>Salient reference</b> at stability 0.5 and 0. This is a reference built from the
                speaker&apos;s most impaired sentences: the ones speech recognition misheard most,
                spoken slowest and with the flattest pitch. For F03 it raised the reference&apos;s
                error rate from 9% to 31%. The control went through the same rule. F01 has too
                little audio for a second reference.
              </li>
            </List>
            <P>Each clone read 6 held-back English sentences and 12 Tagalog ones.</P>

            <H3>Measures</H3>
            <List>
              <li><b>Voice match:</b> cosine similarity between ECAPA speaker embeddings (SpeechBrain), against the centroid of the speaker&apos;s held-back real recordings.</li>
              <li><b>Intelligibility:</b> word error rate from Whisper large-v3, in the clip&apos;s language.</li>
              <li><b>Speech and voice:</b> speaking rate (syllables a second), pause ratio (silences of 150 ms or more), pitch variability (F0 standard deviation in semitones), harmonics-to-noise ratio, jitter and shimmer, all from Praat.</li>
              <li>
                <b>Transfer ratio:</b> (dysarthric clone minus control clone) divided by (dysarthric
                real minus control real). It is reported only when the real speakers clearly differ
                (|Cohen&apos;s d| ≥ 0.5), with 90% bootstrap intervals from resampling clips.
              </li>
            </List>
            <P>
              An earlier pass with plain Tagalog spelling gave noisier Tagalog results: speech
              recognition misheard every voice 10 to 14% of the time, which hid the dysarthric gap.
              This report uses the KWF-spelled run throughout.
            </P>

            <H3>Transfer ratios for every setup</H3>
            {RESULTS && (
              <>
                <TransferChart transfer={RESULTS.transfer} speaker="F01" condition="clone-tl" />
                <TransferChart transfer={RESULTS.transfer} speaker="F03" condition="clone-tl" />
                <TransferChart transfer={RESULTS.transfer} speaker="F01" condition="clone-en" />
                <TransferChart transfer={RESULTS.transfer} speaker="F03" condition="clone-en" />
                <H3>All measurements</H3>
                <ResultsTable rows={tableRows} />
              </>
            )}
          </div>
        </details>

        <H2>References</H2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 leading-relaxed text-[var(--tinta)]/80">
          <li>
            Moëll, B., Sand Aronsson, F. (2025).{" "}
            <a href={PAPER_URL} className={proseLink}>
              Voice Cloning for Dysarthric Speech Synthesis: Addressing Data Scarcity in Speech-Language Pathology
            </a>
            . arXiv:2503.01266.
          </li>
          <li>
            Rudzicz, F., Namasivayam, A.K., Wolff, T. (2012). The TORGO database of acoustic and
            articulatory speech from speakers with dysarthria. <i>Language Resources and Evaluation</i>,
            46(4), 523–541.
          </li>
          <li>
            Komisyon sa Wikang Filipino.{" "}
            <a href={KWF_URL} className={proseLink}>KWF Diksiyonaryo ng Wikang Filipino</a>.
          </li>
        </ol>

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
