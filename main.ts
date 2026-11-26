// One Emoji, One Smile — make.fun entry (program/v1, Node 22+, no deps).
//
// Writes exactly one emoji to $MAKEFUN_OUTPUT_DIR/entry.txt (or
// /output/entry.txt when unset): the hugging face, U+1F917.
// Chosen by pairwise tournament (gpt-6.1-sol Mode MAX, 8 candidates):
// a visible smile PLUS open arms — warmth at first glance, a tiny offered
// embrace as the second beat, instantly readable by any stranger, and
// deliberately picked rather than the first smiley that comes to mind.
// The file holds the emoji alone: no newline, no whitespace, 4 bytes.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// 🤗 U+1F917 HUGGING FACE — written as an escape so the source is
// byte-exact on every checkout, whatever the editor's encoding.
const EMOJI = "\u{1F917}";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, EMOJI, "utf8");

// Read back and enforce the gate ourselves: UTF-8, 1-8 characters,
// not only whitespace, exactly the emoji we meant to send. A bad write
// must fail loudly here, never silently ship a broken entry.
const written = readFileSync(outPath, "utf8");
if (written !== EMOJI) {
  throw new Error(`entry mismatch: expected ${JSON.stringify(EMOJI)}, got ${JSON.stringify(written)}`);
}
const chars = [...written].length;
if (chars < 1 || chars > 8 || written.trim().length === 0) {
  throw new Error(`entry fails gate: ${chars} characters`);
}
console.log(`wrote ${outPath} (${Buffer.byteLength(EMOJI, "utf8")} bytes)`);
