import type { Metadata } from "next";
import { Brand } from "../_components/brand";
import { A, LegalPage, List, Mail, P, Section } from "../_components/legal";

const title = "Terms of Service";
const description = "The terms for using the tinig labs website, waitlist, and blog.";

export const metadata: Metadata = {
  title: `${title} | tinig labs`,
  description,
  alternates: { canonical: "/terms/" },
  openGraph: { type: "website", siteName: "tinig labs", title, description, url: "/terms/" },
  twitter: { card: "summary", title, description },
};

const CONTACT = "waitlist@tiniglabs.digital";

export default function TermsPage() {
  return (
    <LegalPage
      title={title}
      updated="October 27, 2026"
      lede={<>These terms apply when you use tiniglabs.digital, join the waitlist, or subscribe to the blog. By using the site, you agree to them.</>}
    >
      <Section id="who" title="Who we are">
        <P>
          <Brand /> (&ldquo;we&rdquo;) is an independent lab run by one developer. It releases
          open models, datasets, and tools.
        </P>
      </Section>

      <Section id="use" title="Using the site">
        <P>The site is free to use. When you use it, don&apos;t:</P>
        <List>
          <li>sign up someone else without their permission</li>
          <li>submit the forms automatically or in bulk</li>
          <li>try to break, overload, or get unauthorized access to the site</li>
          <li>pretend to be tinig labs or someone else</li>
        </List>
      </Section>

      <Section id="signups" title="The waitlist and blog">
        <P>
          Joining the waitlist or subscribing to the blog is free and doesn&apos;t commit you or
          us to anything. We share plans in good faith, but we can&apos;t promise that a project
          will ship, or when. You can leave any time with the Unsubscribe link in any email from
          us.
        </P>
        <P>
          The <A href="/privacy">Privacy Policy</A> explains what we do with your email address.
        </P>
      </Section>

      <Section id="not-advice" title="Not clinical advice">
        <P>
          The speech examples on this site show the kinds of speech our work deals with. They
          aren&apos;t a diagnosis or treatment advice. For speech concerns, see a licensed
          speech-language pathologist.
        </P>
      </Section>

      <Section id="releases" title="Our releases and code">
        <P>
          Each model, dataset, and tool we release comes with its own license, and that license,
          not these terms, sets how you can use it. The code for this website is under the{" "}
          <A href="/license">Functional Source License 1.1, Apache 2.0 Future License</A>.
        </P>
      </Section>

      <Section id="name" title="Our name and content">
        <P>
          Unless a page says otherwise, the text and design of this site belong to tinig labs.
          You can quote and link to it. Don&apos;t use the tinig labs name or logo in a way that
          suggests we made, reviewed, or endorse something we didn&apos;t.
        </P>
      </Section>

      <Section id="links" title="Other websites">
        <P>
          The site links to other websites, such as GitHub. We don&apos;t control them and
          aren&apos;t responsible for their content or practices.
        </P>
      </Section>

      <Section id="warranty" title="No warranty">
        <P>
          The site is provided as is. We work to keep it accurate and available, but we
          don&apos;t guarantee that it will be error-free or always online.
        </P>
      </Section>

      <Section id="liability" title="Limit of liability">
        <P>
          As far as the law allows, tinig labs isn&apos;t liable for indirect, incidental, or
          consequential losses that come from using the site, the waitlist, or the blog.
        </P>
      </Section>

      <Section id="changes" title="Changes to these terms">
        <P>
          When we change these terms, we&apos;ll update the date at the top. If you keep using the
          site after a change, the new terms apply.
        </P>
      </Section>

      <Section id="law" title="Governing law">
        <P>These terms are governed by the laws of the Republic of the Philippines.</P>
      </Section>

      <Section id="contact" title="Contact">
        <P>
          Questions about these terms go to <Mail to={CONTACT} />.
        </P>
      </Section>
    </LegalPage>
  );
}
