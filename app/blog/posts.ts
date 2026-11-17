// Every published post, newest first. The blog index and the sitemap read this list.
export type Post = { slug: string; title: string; date: string; summary: string };

export const POSTS: Post[] = [
  {
    slug: "speech-corpus-closed-beta",
    title: "The speech corpus is open in closed beta",
    date: "2026-11-17",
    summary: "An open Tagalog speech corpus is now taking recordings from a small group of invited speakers and specialists.",
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
