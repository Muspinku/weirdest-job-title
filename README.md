# weirdest-job-title

[![make.fun · u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922](https://make.fun/badge/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922.svg)](https://make.fun/bounty/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922)

A make.fun entry for **Weirdest Job Title: Blind Judge Showdown**.

The program writes a single job title — 60 characters or fewer, nothing else — to `entry.txt`:

> Regional Apology Writer for Rude Self-Checkout Machines

It sounds like a real corporate posting until the twist lands: someone has to apologise on behalf of the self-checkout machines — and they were rude first.

## Run

```sh
node main.ts
# writes /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set)
```

Node 22, standard library only. The program is deterministic and verifies the written bytes round-trip exactly, with no trailing newline.
