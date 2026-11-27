// Every published post, newest first. The blog index and the sitemap read this list.
// Each post with its own opengraph-image.tsx needs a Content-Type route in public/staticwebapp.config.json.
// `product` names the tinig labs product a post is about, so the post shows that product's mark.
// `author` names the person who wrote a post; posts without one are credited to tinig labs.
export type Post = { slug: string; title: string; date: string; summary: string; product?: "notebook" | "corpus"; author?: string };

export const POSTS: Post[] = [
  {
    slug: "zero-shot-torgo",
    title: "Zero-shot TORGO by tinig labs",
    date: "2026-11-27",
    summary: "Cloning TORGO voices with and without dysarthria into Tagalog, and measuring what survives the change of language.",
    author: "Jommel Rowin Sabater",
  },
  {
    slug: "notebook-closed-beta",
    title: "The notebook for SLPs is open in closed beta",
    date: "2026-11-20",
    summary: "A recording notebook for speech-language pathologists: record, transcribe and track patient speech, encrypted on every device.",
    product: "notebook",
  },
  {
    slug: "speech-corpus-closed-beta",
    title: "The speech corpus is open in closed beta",
    date: "2026-11-17",
    summary: "An open Tagalog speech corpus is now taking recordings from a small group of invited speakers and specialists.",
    product: "corpus",
  },
];

export function getPost(slug: string): Post {
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) throw new Error(`No post with slug "${slug}"`);
  return post;
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
