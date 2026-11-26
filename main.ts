// weirdest-job-title - make.fun entry for
// u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922.
// Node 22, standard library only. Writes the single entry line to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
// The entry is a fixed string: the program is deterministic and writes
// exactly this text, no trailing newline, so the gate sees 1-60
// characters of UTF-8 and nothing else.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The entry: a job that sounds like a real corporate posting until the
// twist lands — someone has to apologise on behalf of the machines.
// "Rude" sharpens the punch: the machines aren't neutral, they were
// rude to you first — and someone still has to apologise for them.
const ENTRY = "Regional Apology Writer for Rude Self-Checkout Machines";

// Guard the gate: the entry must stay inside its 60-character cap and
// stay a single line, since the judge reads exactly one title.
if (ENTRY.length < 1 || ENTRY.length > 60 || !ENTRY.trim() || ENTRY.includes('\n')) {
  throw new Error(`entry is ${ENTRY.length} characters, cap is 60`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.txt');
writeFileSync(target, ENTRY, 'utf8');

// Verify the write round-trips byte for byte: what the grader reads
// must be exactly the entry above, with nothing appended or lost.
// Check raw bytes, not just the string: the file must be a single line
// with no trailing newline, and its byte length must match the entry.
const written = readFileSync(target);
if (written.length !== Buffer.byteLength(ENTRY, 'utf8') || written[written.length - 1] === 0x0a) {
  throw new Error('entry.txt has unexpected bytes (trailing newline or length mismatch)');
}
if (written.toString('utf8') !== ENTRY) {
  throw new Error('entry.txt does not match ENTRY after writing');
}
console.log(`wrote entry.txt: ${ENTRY.length} characters, ${written.length} bytes`);
