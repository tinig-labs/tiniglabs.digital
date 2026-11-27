import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Brand, focusRing } from "../../_components/brand";
import { proseLink } from "../../_components/ui";
import { ORGANIZATION, SITE_URL, jsonLd, pageMetadata } from "../../_components/site";
import { formatDate, getPost } from "../posts";
import { SubscribeForm } from "../subscribe-form";
import { CLIPS, PHASES, RESULTS } from "./lab-data";
import { ClipTable, KwfPilotTable, ResultsTable, TransferChart } from "./lab-figures";

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
  const tableRows = RESULTS?.rows.filter((r) => r.condition !== "clone-tl-plain") ?? [];
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
          dysarthria included? <Brand /> is trying it on three speakers from an English dataset.
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
          We take TORGO speakers with and without dysarthria. We clone each from about a minute or
          two of their English speech, then ask the clone to speak Tagalog. That is zero-shot
          cross-lingual cloning: the model has never heard these people speak Tagalog, because they
          never did.
        </P>
        <P>
          The control speaker is the important part. Any clone will sound a little foreign in
          Tagalog. Comparing a dysarthric clone with the control&apos;s clone tells us how much of
          the difference between them is dysarthria rather than accent.
        </P>

        <H3>1. Speakers</H3>
        <P>
          From <a href={TORGO_URL} className={proseLink}>TORGO</a> we use F03, a woman with mild
          dysarthria, and FC03, a female control, as in the original study. In round 2 we added
          F01, a woman with severe dysarthria. Where a head-worn microphone recording exists we use
          it, otherwise the array microphone. We keep only read sentences, not single words.
        </P>

        <H3>2. Reference audio</H3>
        <P>
          For each speaker we trim silences, match loudness, and join sentences into a single
          reference clip: about two minutes each for F03 and FC03. F01 recorded only 12 usable
          sentences, so its reference is 54 seconds from 9 of them. We keep TORGO&apos;s 16 kHz
          sampling rate, since upsampling adds nothing.
        </P>
        <P>
          A separate set of 12 sentences is held back and never used for cloning. F03 and FC03 read
          all 12, so their real recordings compare like for like. F01 read only 2 of them.
        </P>

        <H3>3. Cloning</H3>
        <P>
          We create an instant voice clone in ElevenLabs from each reference and generate with{" "}
          <code>eleven_v3</code>. The clones are private to our account, used for research only,
          and will be deleted once we&apos;re done.
        </P>
        <P>
          We turn ElevenLabs&apos; background-noise removal off. Breathiness and roughness are
          part of what dysarthria sounds like, and a denoiser could strip them out before the clone
          ever hears them. Every request uses similarity 0.9, style 0 and speaker boost on, and we
          log the stability with each clip.
        </P>

        <H3>4. Tagalog prompts, checked against KWF</H3>
        <P>
          Each clone reads Tagalog sentences. Twelve translate the held-back English sentences, so
          the content matches across languages. Ten more cover sounds English doesn&apos;t stress,
          like the glottal stop in <i>mag-aral</i> and word-initial <i>ng</i> in <i>ngumitî</i>.
        </P>
        <P>
          Plain Tagalog spelling doesn&apos;t say where the stress falls or whether a word ends in a
          glottal stop. <i>Bata</i> can be <i>batà</i> (child) or <i>bata</i> (robe). So we spell
          the prompts the way the{" "}
          <a href={KWF_URL} className={proseLink}>KWF Diksiyonaryo ng Wikang Filipino</a> marks
          its headwords: an acute for stress on the last syllable (<i>bakít</i>), a grave for a
          final glottal stop (<i>pag-uugalì</i>), and a circumflex for both (<i>gumawâ</i>).
          Unmarked words keep the usual stress on the second-to-last syllable.
        </P>
        <P>
          A native speaker checked every word we were unsure about against KWF entries, for
          example <i>alalá</i>, <i>taló</i> and <i>ká·pu·wâ</i>. The rest follow KWF&apos;s
          conventions. The round-2 section shows what this did.
        </P>

        <H2>Listen</H2>
        <P>
          Each speaker&apos;s real TORGO recordings come first, with their clones underneath. The
          Tagalog line is a translation of the English one, so you can hear the same speaker
          across both languages.
        </P>
        {CLIPS.length > 0 ? (
          <ClipTable clips={CLIPS} />
        ) : (
          <Pending>Clips appear here once the voices are cloned.</Pending>
        )}

        <H2>How we measure it</H2>
        <P>Three questions, each with a number we can compute on every clip:</P>
        <List>
          <li>
            <b>Does it still sound like them?</b> We compare speaker embeddings from an ECAPA
            speaker-verification model. The clone is scored against the speaker&apos;s held-back
            real recordings. For scale, we also score real against real (the ceiling) and the
            stock voice against each speaker (the floor).
          </li>
          <li>
            <b>How intelligible is it?</b> Whisper large-v3 transcribes every clip, and we report
            the word error rate. Real dysarthric speech is harder for ASR than control speech. If
            the dysarthric clone stays harder too, something of the dysarthria survived.
          </li>
          <li>
            <b>Are the dysarthria markers still there?</b> With Praat, we measure speaking rate,
            pause ratio, pitch variability (dysarthric speech is often monotone) and voice
            quality: harmonics-to-noise ratio, jitter and shimmer.
          </li>
        </List>
        <P>
          These roll up into one headline number per marker, the <b>transfer ratio</b>. It is the
          gap between the dysarthric and control clones, divided by the gap between the two real
          speakers. A ratio near 1 means the clone kept the trait. Near 0 means the model smoothed
          it away. We only report a ratio when the real speakers clearly differ on that marker
          (|Cohen&apos;s d| ≥ 0.5). Whiskers on the charts are 90% bootstrap intervals.
        </P>

        <H2>Round 1: what carries over</H2>
        <P>
          The first round cloned F03 and FC03 from the standard reference at stability 0.5, with
          plain Tagalog spelling. In short, the clones carried the <i>voice</i> into Tagalog but
          not the <i>speech</i>.
        </P>
        <List>
          <li>
            <b>They sound like their speaker.</b> F03&apos;s clones scored 0.33 against F03 and only
            0.07 to 0.14 against FC03. That&apos;s short of F03&apos;s real recordings scored against
            each other (0.65), but recognisably them.
          </li>
          <li>
            <b>Monotone pitch survives.</b> F03&apos;s pitch moves less than FC03&apos;s (3.5 against
            5.3 semitones). The clones kept most of that gap: 0.83 in English and 0.53 in Tagalog.
          </li>
          <li>
            <b>Articulation is smoothed away.</b> Whisper misheard 15% of F03&apos;s real words, but
            only 2% of its English clone&apos;s. In Tagalog every voice, including the stock one, got
            10 to 14% wrong, which hid any dysarthric gap.
          </li>
          <li>
            <b>Timing is lost.</b> Real speech ran at 2.5 to 2.8 syllables per second with about 15%
            pauses. The clones ran at 3.6 to 4.4 with almost none.
          </li>
        </List>

        <H2>Round 2: pushing dysarthria further</H2>
        <P>Round 2 tried four ways to carry more of the dysarthria across:</P>
        <List>
          <li>
            <b>A severe speaker.</b> F03&apos;s dysarthria is mild, which caps how much can
            transfer. Whisper misheard 54% of F01&apos;s real words, against 15% for F03 and 3% for
            FC03.
          </li>
          <li>
            <b>A dysarthria-salient reference.</b> Instead of any two minutes of speech, we cloned
            from each speaker&apos;s most impaired sentences: the ones Whisper misheard most, spoken
            slowest and most monotone. For F03 that raised the reference&apos;s error rate from 9%
            to 31%. FC03 went through the same rule, so the comparison stays fair. F01 has too
            little audio for a second reference.
          </li>
          <li>
            <b>Stability 0.</b> <code>eleven_v3</code>&apos;s most expressive setting, against the
            default 0.5.
          </li>
          <li>
            <b>KWF spelling</b> for every Tagalog prompt.
          </li>
        </List>
        <P>
          Each clone read 6 of the held-back English sentences and the 12 translated Tagalog ones.
        </P>

        {RESULTS ? (
          <>
            <H3>KWF spelling cleared away the accent noise</H3>
            <P>
              We first tested the spelling on voices without dysarthria. With KWF accent marks,
              Whisper&apos;s error rate on the control clone fell from 11% to 3%, and on the stock
              voice from 10% to 5%. Mispronunciations like <i>tumalan</i> for <i>tumalón</i>{" "}
              disappeared.
            </P>
            <P>
              F03&apos;s clone stayed at about 15% either way. The marks fix pronunciation, not
              dysarthria, so the gap between F03 and the control finally shows. We kept the marks
              for every word.
            </P>
            <KwfPilotTable pilot={RESULTS.kwfPilot} />

            <H3>Severe dysarthria carries over much more</H3>
            <P>
              F01&apos;s Tagalog clones keep most of F01&apos;s voice quality. The transfer ratios are
              0.72 to 0.78 for harmonics-to-noise, 0.84 to 0.89 for jitter and 0.80 to 0.86 for
              shimmer, all with intervals well above zero.
            </P>
            <P>
              Some of the intelligibility gap carries over too. F01&apos;s Tagalog clones were
              misheard 18% of the time at stability 0.5 and 29% at stability 0, against 3 to 4% for
              the control. That&apos;s a transfer ratio of 0.30 and 0.49.
            </P>
            <P>
              In English the same clones are almost fully intelligible (3 to 8%), so for now this
              works better in Tagalog than in English. We don&apos;t yet know why.
            </P>
            <TransferChart transfer={RESULTS.transfer} speaker="F01" condition="clone-tl" />

            <H3>For mild dysarthria, the reference matters more than the setting</H3>
            <P>
              For F03, the salient reference helped most in English. The intelligibility transfer
              rose from 0.11 to 0.26–0.30, and similarity to F03 rose from 0.33 to 0.42.
            </P>
            <P>
              In Tagalog the picture is mixed. Salient reference plus stability 0 kept the most
              monotone pitch (0.60). But the intelligibility ratio fell, because the control&apos;s
              salient clone got harder to understand as well (8% against 3%). Stability 0 on its
              own changed little for F03.
            </P>
            <P>
              With KWF spelling, the standard clone shows the clearest Tagalog intelligibility
              transfer (0.95), though the interval is wide.
            </P>
            <TransferChart transfer={RESULTS.transfer} speaker="F03" condition="clone-tl" />

            <details className="group mt-6 rounded-2xl border border-[var(--tinta)]/10 px-5 py-4">
              <summary className={`cursor-pointer rounded-sm font-semibold text-[var(--tinta)] marker:text-[var(--pandan)] ${focusRing}`}>
                The same charts for the English clones
              </summary>
              <TransferChart transfer={RESULTS.transfer} speaker="F01" condition="clone-en" />
              <TransferChart transfer={RESULTS.transfer} speaker="F03" condition="clone-en" />
            </details>

            <H3>Timing still doesn&apos;t transfer</H3>
            <P>
              F03 and FC03 clones speak at 4.3 to 4.7 syllables per second with almost no pauses,
              whatever the reference or stability. Their real recordings run at 2.5 to 2.8 with
              about 15% pauses.
            </P>
            <P>
              F01&apos;s clones are slower and pause more (2.7 to 2.8 syllables per second, 8 to 9%
              pauses), which is closer to F01&apos;s real 2.3 and 21%. But real F01 and FC03 differ
              little in rate, so we can&apos;t call that a transferred trait.
            </P>

            <ResultsTable rows={tableRows} />

            <H3>What it means</H3>
            <P>
              The best recipe so far is <code>eleven_v3</code>, Tagalog spelled the KWF way, and a
              reference rich in the speaker&apos;s most impaired speech. Use stability 0 when
              intelligibility matters, as it did for F01.
            </P>
            <P>
              With that recipe, voice quality transfers well, some of the articulation transfers
              into Tagalog, and timing doesn&apos;t transfer at all. The more severe the speaker,
              the more comes through.
            </P>
            <P>
              Text-to-speech cloning alone still can&apos;t reproduce dysarthric pacing. For that,
              speech-to-speech conversion from a slow, effortful Tagalog source looks like the next
              thing to try.
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
          <li>Three speakers is a prototype, not a finding. With 6 to 12 clips per condition, the intervals are wide, and we say so with every result.</li>
          <li>
            The round-2 subsets are small enough to move numbers on their own. F03&apos;s standard
            English clone kept 0.83 of the pitch gap over 12 sentences in round 1, but 0.38 over the
            6 in round 2.
          </li>
          <li>
            F01 recorded only 12 usable sentences. Its similarity scores rest on 2 held-back clips
            and aren&apos;t reliable: F01&apos;s clones score about the same against F03 as against
            F01. All the dysarthric clones stay far from the control, though.
          </li>
          <li>
            F01&apos;s recordings are much less noisy than FC03&apos;s (harmonics-to-noise 24 against
            12 dB). Some of that gap is probably the recording session, not the voice.
          </li>
          <li>TORGO&apos;s speakers recorded English. Any Tagalog clone carries an English accent, which the control speaker helps us separate from dysarthria.</li>
          <li>
            The real recordings on this page come from TORGO, which is free for academic,
            non-profit use. This is non-commercial research, and we cite the dataset below.
            Synthetic clips are labelled as such.
          </li>
          <li>The clones are private, never shared to a voice library, and deleted after evaluation.</li>
          <li>
            KWF spelling was checked word by word only where we were unsure. The other words
            follow KWF&apos;s accent conventions.
          </li>
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
