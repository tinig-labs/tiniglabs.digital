import { OG_SIZE, ogImage } from "./_components/og";

// Required by output: "export" to write this file at build time
export const dynamic = "force-static";

export const alt = "tinig labs: an independent lab for open Filipino AI";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Speech corpus and notebook in closed beta",
    title: "An independent lab for open Filipino AI.",
    footer: "tiniglabs.digital",
  });
}
