import { OG_SIZE, ogImage } from "../../_components/og";
import { formatDate, getPost } from "../posts";

// Required by output: "export" to write this file at build time
export const dynamic = "force-static";

const post = getPost("speech-corpus-closed-beta");

export const alt = post.title;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "talâ, the tinig labs blog", title: post.title, footer: formatDate(post.date), product: "corpus" });
}
