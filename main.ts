// Weirdest Job Title: Blind Judge Showdown — make.fun entry.
// Competition: u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922.
// Node 22, standard library only. The program writes one fixed line to
// entry.txt under /output (or $MAKEFUN_OUTPUT_DIR when set). The line is
// deterministic: the same bytes every run, no trailing newline, so the
// judge reads exactly one job title and nothing else.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The job title. It sounds like a real corporate posting until the
// twist lands: someone has to apologise on behalf of the machines.
// "Rude" sharpens the punch — the machines are not neutral, they were
// rude to you first, and someone still has to apologise for them.
const ENTRY = 'Regional Apology Writer for Rude Self-Checkout Machines';

// The gate reads a single title of 1-60 UTF-8 characters. Anything
// outside that range, any whitespace-only line, or any embedded newline
// fails the entry before the judge ever sees it.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 60) {
    throw new Error(`entry is ${text.length} characters, cap is 60`);
  }
  if (!text.trim() || text.includes('\n')) {
    throw new Error('entry must be a single non-empty line');
  }
}

function writeEntry(text: string): string {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, 'entry.txt');
  writeFileSync(target, text, 'utf8');
  return target;
}

// Read the file back and compare raw bytes, not just the decoded
// string: a trailing newline would add a byte and a second line, and
// the grader reads exactly what is on disk.
function verifyEntry(target: string, text: string): void {
  const written = readFileSync(target);
  if (written.length !== Buffer.byteLength(text, 'utf8')) {
    throw new Error('entry.txt byte length does not match the entry');
  }
  if (written[written.length - 1] === 0x0a) {
    throw new Error('entry.txt must not end with a newline');
  }
  if (written.toString('utf8') !== text) {
    throw new Error('entry.txt does not match the entry after writing');
  }
}

validateEntry(ENTRY);
const target = writeEntry(ENTRY);
verifyEntry(target, ENTRY);
console.log(`wrote entry.txt: ${ENTRY.length} characters`);
