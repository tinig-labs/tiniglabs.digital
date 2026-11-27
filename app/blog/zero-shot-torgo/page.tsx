import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Brand, focusRing } from "../../_components/brand";
import { proseLink } from "../../_components/ui";
import { ORGANIZATION, SITE_URL, jsonLd, pageMetadata } from "../../_components/site";
import { formatDate, getPost } from "../posts";
import { SubscribeForm } from "../subscribe-form";
import { CLIPS, PHASES, RESULTS } from "./lab-data";
import { ClipTable, ResultsTable, TransferChart } from "./lab-figures";

const post = getPost("zero-shot-torgo");
const url = `/blog/${post.slug}/`;

const PAPER_URL = "https://arxiv.org/abs/2503.01266";
const TORGO_URL = "https://www.cs.toronto.edu/~complingweb/data/TORGO/torgo.html";

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
  ],
};

function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-12 text-2xl font-semibold tracking-tight">{children}</h2>;
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-8 text-lg font-semibold">{children}</h3>;
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-lg leading-relaxed text-[var(--tinta)]/85">{children}</p>;
}

function List({ children }: { children: ReactNode }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-lg leading-relaxed text-[var(--tinta)]/85 marker:text-[var(--pandan)]">
      {children}
    </ul>
  );
}

function Pending({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 rounded-2xl border border-dashed border-[var(--tinta)]/20 px-5 py-4 text-[var(--abo)]">
      {children}
    </p>
  );
}

export default function ZeroShotTorgoPost() {
  return (
    <main className="w-full flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(POST_JSON_LD)} />
      <article className="mx-auto max-w-[42rem] px-5 pb-20 pt-8 sm:px-10 sm:pb-28 sm:pt-12 lg:pt-20">
        <Link href="/blog" className={`rounded-sm text-sm font-semibold text-[var(--abo)] hover:text-[var(--pandan)] ${focusRing}`}>
          <span aria-hidden="true">←</span> talâ
        </Link>
        <p className="mt-8 text-sm font-medium text-[var(--abo)]">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · Lab notes, in progress
        </p>
        <h1 className="mt-2 text-balance text-[clamp(2.25rem,9vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[3.25rem]">
          {post.title}
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-[var(--abo)]">
          Can a voice clone of someone with dysarthria speak Tagalog and still sound like them,
          dysarthria included? <Brand /> is trying it on two speakers from an English dataset.
        </p>

        <section aria-label="Progress" className="mt-10 rounded-3xl bg-[var(--mint)] p-6 sm:p-8">
          <h2 className="text-sm font-semibold text-[var(--pandan)]">Where this stands</h2>
          <ol className="mt-4 space-y-2">
            {PHASES.map((p) => (
              <li key={p.label} className="flex items-start gap-3 leading-relaxed">
                <span
                  aria-hidden="true"
                  className={`mt-1.5 inline-block size-3 shrink-0 rounded-full ${p.done ? "bg-[var(--pandan)]" : "border-2 border-[var(--pandan)]/40"}`}
                />
                <span className={p.done ? "text-[var(--tinta)]" : "text-[var(--abo)]"}>
                  {p.label}
                  <span className="sr-only">{p.done ? " (done)" : " (not yet)"}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <H2>Why</H2>
        <P>
          Speech models fail most often on the people who need them most. Training a model that
          understands dysarthric speech takes recordings of dysarthric speech, and those are scarce
          in any language. In Tagalog there are, as far as we know, none in the open.
        </P>
        <P>
          Recording patients is slow, tiring for them, and rightly guarded by privacy rules. So we
          wanted to know whether synthetic speech can fill part of the gap, at least for
          prototyping and for training clinicians&apos; ears.
        </P>

        <H2>The study we build on</H2>
        <P>
          In early 2025, Birger Moëll and Fredrik Sand Aronsson{" "}
          <a href={PAPER_URL} className={proseLink}>cloned the voices of TORGO speakers</a> with
          ElevenLabs. TORGO is a University of Toronto dataset of speakers with cerebral palsy or
          ALS, plus matched controls. A speech-language pathologist then rated a sample of real and
          cloned clips.
        </P>
        <P>
          The SLP heard dysarthria in every dysarthric clip, real or synthetic. They also took 30%
          of the synthetic clips for real recordings. In other words, the clones kept the
          dysarthria and were often convincing.
        </P>
        <P>That&apos;s a promising start, with a few gaps we want to close:</P>
        <List>
          <li>Everything was in English. The authors name this as a limitation.</li>
          <li>One rater, who is also an author, judged 20 clips.</li>
          <li>No objective measures: no speaker similarity, no intelligibility scores, no acoustics.</li>
        </List>

        <H2>What we&apos;re doing</H2>
        <P>
          We take two TORGO speakers, one with dysarthria and one matched control. We clone each
          from a minute or two of their English speech, then ask the clone to speak Tagalog. That
          is zero-shot cross-lingual cloning: the model has never heard these people speak Tagalog,
          because they never did.
        </P>
        <P>
          The control speaker is the important part. Any clone will sound a little foreign in
          Tagalog. Comparing the two clones tells us how much of the difference between them is
          dysarthria rather than accent.
        </P>

        <H3>1. Data</H3>
        <P>
          We use dysarthric speaker F03 and control speaker FC03 from{" "}
          <a href={TORGO_URL} className={proseLink}>TORGO</a>, as in the original study. Where a
          head-worn microphone recording exists we use it, otherwise the array microphone. We keep
          only read sentences, not single words.
        </P>

        <H3>2. Reference audio</H3>
        <P>
          For each speaker we trim silences, match loudness, and join about two minutes of
          sentences into a single reference clip: 25 sentences from F03 and 27 from FC03, all from
          the head-worn microphone. We keep TORGO&apos;s 16 kHz sampling rate, since upsampling
          adds nothing.
        </P>
        <P>
          A separate set of 12 sentences is held back and never used for cloning. Both speakers
          read the same 12, so the real recordings compare like for like. Those held-back
          recordings are what we measure the clones against.
        </P>

        <H3>3. Cloning</H3>
        <P>
          We create an instant voice clone in ElevenLabs from each reference. The clones are
          private to our account, used for research only, and will be deleted once we&apos;re done.
        </P>
        <P>
          We turn ElevenLabs&apos; background-noise removal off. Breathiness and roughness are
          part of what dysarthria sounds like, and a denoiser could strip them out before the clone
          ever hears them. Every request uses the same voice settings: stability 0.5, similarity
          0.9, style 0, speaker boost on. These are logged with each clip.
        </P>

        <H3>4. Tagalog prompts</H3>
        <P>
          Each clone reads 22 Tagalog sentences. Twelve translate the held-back English sentences,
          so the content matches across languages. The other ten cover sounds English doesn&apos;t
          stress, like the glottal stop in <i>mag-aral</i>, word-initial <i>ng</i> in{" "}
          <i>ngumiti</i>, and long affixed words like <i>pakikipagkapwa-tao</i>. A native
          speaker checks every sentence before we generate anything.
        </P>
        <P>
          We generate with two ElevenLabs models, <code>eleven_v3</code> and{" "}
          <code>eleven_multilingual_v2</code>. A stock Tagalog voice from the ElevenLabs library,
          labelled with a standard Filipino accent, reads the same lines as a baseline. Each clone also reads the held-back English sentences, which repeats the
          original study.
        </P>

        <H2>Listen</H2>
        {CLIPS.length > 0 ? (
          <ClipTable clips={CLIPS} />
        ) : (
          <Pending>Clips appear here once the voices are cloned. Every clip on this page is synthetic.</Pending>
        )}

        <H2>How we measure it</H2>
        <P>Three questions, each with a number we can compute on every clip:</P>
        <List>
          <li>
            <b>Does it still sound like them?</b> We compare speaker embeddings from an ECAPA
            speaker-verification model. The clone is scored against the speaker&apos;s held-back
            real recordings. For scale, we also score real against real (the ceiling) and the
            stock voice against the speaker (the floor).
          </li>
          <li>
            <b>How intelligible is it?</b> Whisper large-v3 transcribes every clip, and we report
            word and character error rates. Real dysarthric speech is harder for ASR than control
            speech. If the dysarthric clone stays harder too, something of the dysarthria survived.
          </li>
          <li>
            <b>Are the dysarthria markers still there?</b> With Praat, we measure speaking rate,
            pause ratio, pitch variability (dysarthric speech is often monotone) and voice
            quality.
          </li>
        </List>
        <P>
          These roll up into one headline number per marker, the <b>transfer ratio</b>. It is the
          gap between the dysarthric and control clones, divided by the gap between the two real
          speakers. A ratio near 1 means the clone kept the trait. Near 0 means the model smoothed
          it away.
        </P>

        <H2>Results</H2>
        {RESULTS ? (
          <>
            <P>
              We generated 134 clips and measured them alongside the 24 real held-back recordings.
              In short, the clones carry the <i>voice</i> into Tagalog but not the <i>speech</i>:
              voice quality survives, while articulation and timing get smoothed out.
            </P>

            <H3>The clones sound like their speaker, in both languages</H3>
            <P>
              Every clone is much closer to its own speaker than to the other one. F03&apos;s
              clones score 0.33 to 0.50 against F03, but only 0.07 to 0.25 against FC03. The stock
              Tagalog voice scores 0.07 to 0.11 against either speaker. Clones still fall short of
              a speaker&apos;s other real recordings, which score 0.65 for F03 and 0.80 for FC03:
              recognisably them, but not quite.
            </P>
            <P>
              The older model kept identity better. In Tagalog, <code>eleven_multilingual_v2</code>{" "}
              clones scored 0.50 for both speakers, against 0.26 to 0.33 for{" "}
              <code>eleven_v3</code>.
            </P>

            <H3>Monotone pitch survives the switch to Tagalog</H3>
            <P>
              F03&apos;s pitch moves less than FC03&apos;s: a standard deviation of 3.5 semitones
              against 5.3. Flattened pitch is a common trait of dysarthria. The clones keep most
              of that gap, with a transfer ratio of 0.83 in English, 0.53 in Tagalog with v3 and
              1.18 with multilingual v2. All three intervals stay above zero. Shimmer, a measure of
              voice roughness, carries over partly (0.30 to 0.57).
            </P>

            <H3>Intelligibility and timing get smoothed away</H3>
            <P>
              Whisper misheard 15% of F03&apos;s real words, against 3% for FC03. F03&apos;s English
              clone dropped to 2%, close to the control. The transfer ratio is 0.19, so most of the
              articulation difference is gone. In Tagalog the comparison is inconclusive. Whisper
              makes 7% to 14% errors on every synthetic Tagalog voice, the stock one included, and
              that noise swamps a gap this small.
            </P>
            <P>
              Timing goes too, for both speakers. Real speech ran at 2.5 to 2.8 syllables per
              second with about 15% of each clip in pauses. Every clone speaks at 3.6 to 5.2
              syllables per second with almost no pauses. Slow, effortful rate is a hallmark of
              many dysarthrias, and these clones don&apos;t reproduce it.
            </P>

            <TransferChart transfer={RESULTS.transfer} />
            <ResultsTable rows={RESULTS.rows} />

            <H3>What it means</H3>
            <P>
              Zero-shot cloning into Tagalog works for <i>who</i> is speaking and for some of{" "}
              <i>how their voice sounds</i>. It doesn&apos;t yet work for how they articulate or
              pace their speech, and those are the traits a dysarthric speech model most needs to
              learn. As a source of synthetic Tagalog dysarthric speech, plain text-to-speech
              cloning isn&apos;t enough on its own.
            </P>
            <P>
              F03 also has mild dysarthria. A more severely affected speaker might carry more
              through, or might break the clone entirely. That is the next speaker to try.
            </P>
          </>
        ) : (
          <Pending>Results appear here once evaluation has run.</Pending>
        )}

        <H2>Next: testing with listeners</H2>
        <P>
          Numbers only go so far. The listening test we plan improves on the original
          study&apos;s single rater:
        </P>
        <List>
          <li>At least three SLPs and five native Tagalog listeners, each rating on their own, with clips in random order.</li>
          <li>For each clip: real or synthetic (English clips only), dysarthria yes or no, severity from 0 to 3, a naturalness score from 1 to 5, and a written transcription so we can score intelligibility.</li>
          <li>For pairs of clips, a real English recording beside a cloned Tagalog one: &ldquo;Is this the same person?&rdquo; on a 1 to 5 scale.</li>
          <li>Agreement between raters reported with Krippendorff&apos;s alpha, so one strong opinion can&apos;t carry the result.</li>
        </List>

        <H2>Limits and care</H2>
        <List>
          <li>Two speakers is a prototype, not a finding. We&apos;ll say so in every result.</li>
          <li>TORGO&apos;s speakers recorded English. Any Tagalog clone carries an English accent, which the control speaker helps us separate from dysarthria.</li>
          <li>TORGO is free for academic, non-profit use. This is non-commercial research, and we cite the dataset below. We don&apos;t republish TORGO&apos;s real recordings here. Every clip on this page is synthetic and labelled as such.</li>
          <li>The clones are private, never shared to a voice library, and deleted after evaluation.</li>
          <li>
            Reading the original paper closely, a few numbers don&apos;t line up. The methods
            mention 200 rated recordings while the results use 20, and a results table lists
            aphasia samples, though TORGO has none. We rely on its direction, not its exact figures.
          </li>
        </List>

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
