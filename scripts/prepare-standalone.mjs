// Copies the assets next build leaves out of .next/standalone, so the
// folder can be zipped and run on its own with `node server.js`.
import { cpSync, existsSync } from "node:fs";

const out = ".next/standalone";

if (!existsSync(`${out}/server.js`)) {
  console.error(`${out}/server.js not found. Run next build first.`);
  process.exit(1);
}

cpSync("public", `${out}/public`, { recursive: true });
cpSync(".next/static", `${out}/.next/static`, { recursive: true });

console.log(`Standalone build ready in ${out}`);
