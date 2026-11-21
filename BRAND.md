# tinig labs — brand guide

tinig labs is an independent lab in the Philippines building open Filipino speech AI, starting with the speech mainstream models miss. This guide covers the logo family and how to use it, plus the colours and type that go with it. It matches tiniglabs.digital, where it's also published at [tiniglabs.digital/brand](https://tiniglabs.digital/brand/).

The name is always written in lowercase: **tinig labs**, never "Tinig Labs" or "TINIG LABS". Product names are lowercase too: **notebook**, **speech corpus**.

## The logo family

There are three marks, one for each part of tinig labs. They are drawn on the same 120-unit grid with rounded ends and corners, so they look like siblings.

| Mark | Used for | What it says |
| --- | --- | --- |
| <img src="public/brand/tinig-labs-mark.svg" alt="tinig labs mark" width="40"> **Echo t** | tinig labs, the lab | A lowercase t on three rounded squares that fade back like an echo: a voice carrying. |
| <img src="public/brand/notebook-mark.svg" alt="notebook mark" width="40"> **Arch n** | notebook (notebook.tiniglabs.digital) | A lowercase n drawn in one stroke that fades from pandan into tinta. |
| <img src="public/brand/corpus-mark.svg" alt="speech corpus mark" width="40"> **Banig weave** | speech corpus (collect.tiniglabs.digital) | Rounded strands woven over and under like a banig mat: many voices woven into one dataset. |

Use the Echo t whenever you're talking about tinig labs as a whole: the website header, social profiles, slides, emails. Use a product mark only inside, or about, that product.

## Construction

All three are drawn on a 120 × 120 grid.

- **Echo t:** three 70-unit squares with a 24-unit corner radius, each one offset 15 units down and right. Front square tinta at full strength, middle pandan at 75% opacity, back dahon at 45%. The t is an 8-unit stroke with round ends, in gatas.
- **Arch n:** one 16-unit stroke with round ends: a stem from y 38 to 90 and an arch with a 28-unit radius. The gradient runs from pandan at the bottom left to tinta at the top right.
- **Banig weave:** three strands across (tinta) and three down (pandan), 12 units wide and 26 units apart, with round ends. At each crossing they swap which one is on top, in a checker pattern. Where a strand passes under, it breaks with a 3.5-unit gap on each side. The gaps are transparent, so the weave works on any background.

Never redraw the marks. Use the files in **Logos** and **Icons** (in `public/brand/`).

## Lockups

A lockup is the mark next to the wordmark.

- **Wordmark:** "tinig labs" in Montserrat SemiBold (600), letter-spacing −0.02em, in tinta.
- **Product lockups:** the product's mark, then "tinig labs" in Montserrat 600, then the product name in Figtree Medium (500) in abo, a little smaller (about 0.75× the wordmark size). For example, **tinig labs** notebook.
- **Proportions:** make the mark about 1.75× the wordmark's font size, with a gap of about 0.55× the font size. On the website that's a 32 px mark, an 18 px wordmark and a 10 px gap.
- Always put the mark on the left. Don't stack the wordmark under the mark unless you have no room for the horizontal version.

## Clear space and minimum size

- **Clear space:** keep at least a quarter of the mark's width empty on every side (30 units on the 120 grid). Nothing else goes inside that space: text, edges or other logos.
- **Minimum size:** 24 px for the Echo t and the Banig weave, 20 px for the Arch n. Below that, use the app icon PNGs (32 px) or the mono version.
- Under 32 px, use a mono Arch n instead of the gradient one. The gradient turns muddy when it's that small.

## Colour versions

Every mark comes in four versions:

- **Primary:** on gatas, white or mint. Use this by default.
- **Reversed:** on pandan or tinta. Uses gatas and dahon so the mark stays bright.
- **Mono ink:** tinta only. For one-colour printing, stamps and fax-style documents.
- **Mono white:** white only. For photos (if the area behind is calm) and dark one-colour printing.

Pick the version by the background. Never put the primary version on pandan or tinta, and never put the reversed version on gatas.

## App icons

App icons are the reversed mark at 70% size on a pandan rounded square (27-unit corner on the 120 grid). The **Icons** group has SVG, 512 px and 32 px PNG versions for all three (and a 180 px PNG for home-screen icons). Use the 512 px for app stores and social profile pictures and the 32 px for favicons. The phone or app store adds its own rounding on top, so don't add extra corners or shadows.

## Colour

| Token | Light | Use |
| --- | --- | --- |
| `gatas` | #F9FBFA | Page background (gatas = milk) |
| `tinta` | #13261F | Text and the wordmark (tinta = ink) |
| `abo` | #5F6F68 | Muted text and product names (abo = grey) |
| `pandan` | #1F6B4F | Brand green: tiles, the weave, the start of the Arch n |
| `mint` | #E2F3EA | Soft tint: pills and highlight bands |
| `dahon` | #7FC8A4 | Leaf green (dahon = leaf), only as an accent on pandan |

`dahon` was added with the logo family. On the website it only appears on pandan surfaces (`--dahon` in `app/globals.css`). Don't use it for text on gatas: the contrast is too low.

## Type

- **Montserrat SemiBold (600)** is only for the brand name: the wordmark and every mention of tinig labs in headings.
- **Figtree** (400, 500 and 600) is for everything else: headings, body, buttons and product names.

## Don'ts

- Don't stretch, squash, rotate or tilt a mark.
- Don't recolour a mark outside the four versions, or use colours from outside the palette.
- Don't add shadows, outlines, glows or extra gradients. The Arch n's gradient is the only one in the family.
- Don't change the weave pattern, add strands or straighten the round ends.
- Don't put a mark on a busy photo, or on a background where it doesn't have enough contrast.
- Don't swap a product mark in for the tinig labs mark, or combine two marks in one lockup.
- Don't set the wordmark in any font other than Montserrat 600, and never write "Tinig Labs".
- Don't use the old mic-and-headphones logo next to the new marks.

## Files

All in `public/brand/`, served at `https://tiniglabs.digital/brand/<file>`. `public/brand/tinig-labs-logos.zip` has them all.

- **Logos:** `tinig-labs-mark`, `notebook-mark` and `corpus-mark`, each as `.svg` in primary, `-reversed`, `-mono-ink` and `-mono-white` versions.
- **Icons:** `*-app-icon.svg`, `*-app-icon-512.png` and `*-app-icon-32.png` for all three, plus `*-app-icon-180.png` (Apple touch icon).

On this site, `app/favicon.ico`, `app/icon.svg` and `app/apple-icon.png` are copies of the tinig labs app icon, and `public/logo.svg` is a copy of the primary Echo t for older links. The README banners (`public/banner.svg`, `public/banner-dark.svg`) are the Echo t lockup with the wordmark outlined.
