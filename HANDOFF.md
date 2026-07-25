# Session handoff — resume notes

Everything below is on disk in this folder; nothing important lives only in chat. To resume, open this
folder in Claude Code (any account) — `CLAUDE.md` auto-loads and documents the build system.

## Current state (all done + verified)

A history-taking systems-review study project: 13 body-system references + an interactive app with four
modes (Reference / Checklist / Drill / Cases). Content is **verified against Talley & O'Connor 10e** and
**generated from a single source**. It works and is complete; no broken/in-progress work.

## How it's built (read `CLAUDE.md` for the full contract)

Single source of truth → generates everything:
- `src/content.json` — the ONE place content lives (13 systems + 15 cases)
- `src/app.template.html` — app shell (CSS + render logic)
- `build.mjs` — run `node build.mjs` → regenerates the 13 `NN-*.md` files **and** `systems-review-console.html`
- **Never hand-edit the generated `.md` or `.html`** — edit the source, then rebuild.

To make a change: edit `src/content.json` → `node build.mjs` → open/republish `systems-review-console.html`.

## What was accomplished this session (the arc)

1. Built the reference from the user's own 2nd-year list + Talley-style framework.
2. Merged the user's list in (endocrine depth, thyroid/Cushing/calcium mirror tables, standalone
   Reproductive system, a flat Checklist mode).
3. **Fact-checked every clinical claim against Talley 10e** (14 parallel verifiers) → `verification-report.md`.
   Applied 5 corrections + high-value nuances (e.g. IBS = positive Rome diagnosis; RLN palsy = hilar not
   apical; depression organic-mimic list; jerk-duration is not a seizure discriminator).
4. **Refactored to single-source** (this was the big one) — eliminated the markdown-vs-app double-entry.
5. **Completed content**: 5 new cases (GI, GU, haem, skin, ENT → 15 total), 6 discriminator tables now
   rendering in-app, cross-links, levelled the thin files.

## Key decisions already made (don't relitigate)

- Reference standard = **Talley & O'Connor 10e**, pre-extracted at `~/Talley-KB/` (use `LOCATOR.md` →
  read only the mapped chapter; never the PDF; extracted text is private study use).
- Australian anchoring; flag Talley-vs-current-guidance divergences (bowel screening 45, AUDIT-C,
  cervical HPV) — see `verification-report.md` §C.
- The `.md` files are intentionally **generated artifacts** now (the user accepted this trade for
  single-source maintenance).

## Pending / next steps (the user deferred these)

**App study features** — the one optimisation workstream not yet done:
- `localStorage` persistence (theme, drill progress, case scores/streak — currently nothing persists)
- a print/export "pocket card" for the Checklist mode
- optional: weak-system tracking / spaced repetition, cross-question search, a mixed "exam mode"

These are app-template + build changes (`src/app.template.html`), not content changes.

## Cross-account caveat (the only gotcha)

The published artifact URL was created on the **work account** and artifacts are private to their owner.
On a personal account you can't update that same URL — but the app is fully self-contained, so just
`node build.mjs` and re-publish `systems-review-console.html` to mint your own artifact URL. Nothing is lost.

If resuming on a **different machine** (not this one), copy this whole folder AND `~/Talley-KB/`
(the latter is needed for any future fact-checking).
