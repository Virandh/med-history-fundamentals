# Med History Fundamentals — project brain

A reasoning-layer systems-review reference for history taking. Each system teaches the screening
questions as *why-we-ask / rules-in-out / red-flags / scaffold-mnemonic*, not a flat checklist.

## Single source of truth — `src/content.json` (build, don't hand-edit)

**The 13 `NN-<system>.md` files and `systems-review-console.html` are GENERATED. Do not edit them by
hand — your changes will be overwritten on the next build.**

- **Content** lives in `src/content.json` (systems + cases, canonical schema).
- **App UI/logic** lives in `src/app.template.html` (CSS + render code + a `__CONTENT_DATA__` placeholder).
- **Generator** is `build.mjs`. Run `node build.mjs` from the project root to regenerate all 13 markdown
  files **and** the app in one step. The field contract is defined by `build.mjs` (`systemToMarkdown` /
  `systemToAppData`); skim it before editing the schema.

Workflow: edit `src/content.json` (or the template) → `node build.mjs` → verify → publish the artifact.

Per-system canonical object: `file, id, name, color, scaffold, scaffoldIntro, chunks[{k,mid,gen}],
scaffoldOutro?, seeAlso?, questions[{n, ask, why, points[[in|out,text]], mirror?, red?}],
discriminator?{title,headers,rows}, checklist[string|{g,items}], drill, clnote?, citations[]`.
Cases: `{stem, complaint, options[{q, v:key|red|useful|low, why}]}`.

## The app — `systems-review-console.html`

Four modes: **Reference** (browse questions + reasoning + discriminator tables), **Checklist** (flat
recall skeleton per system), **Drill** (two-tier active recall), **Cases** (case-based differential
quizzing — the core skill). 13 systems, 15 cases.

## Other files

- `your-2nd-year-list.md` — the user's original list, the source artifact content was merged from (kept verbatim).
- `verification-report.md` — the audit of every clinical claim against Talley 10e (see below); corrections applied.

## Authoritative clinical source: `~/Talley-KB/`

Grounded in **Talley & O'Connor's Clinical Examination, 10th ed. (2026), Elsevier Australia** — an
Australian, eTG-consistent textbook, pre-extracted per chapter under `~/Talley-KB/kb/`.

**Never read the source PDF.** When creating, upgrading, or fact-checking content:
1. Open `~/Talley-KB/LOCATOR.md` — maps each system to its exact Talley history chapter.
2. Read only that chapter file from `~/Talley-KB/kb/` (~8–15k tokens each), not the whole book.
3. Distil into this project's reasoning format and cite as *Talley 10e, Ch<n>, p<printed>*
   (printed page = PDF page − 28). Keep the "why we ask" voice; don't paste raw textbook text.

Extracted KB text is **private study use only** — the distilled content (synthesis + citation) is the
shareable artifact, not the raw extraction. Where Talley diverges from current Australian guidance
(e.g. bowel-screening age, AUDIT-C, cervical HPV screening), flag both — see `verification-report.md` §C.

## House style (encoded in the schema)

- **Scaffold first:** a memorable chunking mnemonic (e.g. cardiovascular = PAIN → PUMP → RHYTHM →
  VESSELS → RISK) so the whole list rebuilds from first principles under pressure.
- **Per symptom:** the patient-facing question · *why we ask* (pathophysiology) · *rules in / rules out* ·
  *red flags*.
- **Close with** a discriminator table for the classic confusions and a quick-recall drill line.
- Australian anchoring, eTG-consistent; flag contested/guideline-divergent claims rather than stating
  them flat.
