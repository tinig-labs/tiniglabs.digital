// Copies the canonical shared footer into the sibling app checkouts, or with --check, reports
// any copy that has drifted from it. Expects the apps cloned next to this repo; a missing
// checkout is skipped. Usage: node scripts/footer-sync.mjs [--check]
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "app/_components/site-footer.tsx");
const targets = [
  "../collect.tiniglabs.digital/src/components/site-footer.tsx",
  "../notebook.tiniglabs.digital/src/components/site-footer.tsx",
].map((p) => resolve(root, p));

const check = process.argv.includes("--check");
// Compare without line-ending noise from Windows checkouts.
const normalize = (s) => s.replace(/\r\n/g, "\n");
const canonical = normalize(readFileSync(source, "utf8"));

let drifted = 0;
for (const target of targets) {
  if (!existsSync(dirname(target))) {
    console.log(`skip     ${target} (app not checked out)`);
    continue;
  }
  const same = existsSync(target) && normalize(readFileSync(target, "utf8")) === canonical;
  if (same) {
    console.log(`in sync  ${target}`);
  } else if (check) {
    drifted++;
    console.log(`drifted  ${target}`);
  } else {
    writeFileSync(target, canonical);
    console.log(`updated  ${target}`);
  }
}

if (drifted) {
  console.error(`\n${drifted} footer copy differs from the canonical one. Run npm run footer:sync.`);
  process.exit(1);
}
