# Plan — the follow-up layer + a symptom-level Drill mode

> Handoff brief. Read this whole file, then `CLAUDE.md`, before touching anything.
> Content is generated: edit `src/content.json`, run `node build.mjs`. Never hand-edit the `.md` or `.html`.
>
> **Status: schema, rendering and the Drill follow-up mode are BUILT.** Cough and Headache are authored
> as reference exemplars. What remains is content authoring for the rest — §6 onward.
>
> **Revision history.** Draft 1 carried a "no generic SOCRATES in follow-ups" rule — withdrawn.
> Draft 2 replaced it with full SOCRATES instantiation + `slot` grouping — **also withdrawn, too heavy.**
> See §2 for the shape that was actually settled on.

## 0. Running this plan

**Suggested config:** Sonnet, medium reasoning effort. The design work is finished — this is systematic
execution against a settled pattern (read a Talley chapter → invert `points` → write ≤8 follow-ups →
verify), not open-ended design. If a specific symptom's differential turns out genuinely ambiguous, stop
and flag it rather than guessing.

**Work one system per batch.** After each system:

```bash
python3 -c "import json; json.load(open('src/content.json')); print('JSON valid')"
node build.mjs
```

Then spot-check the generated `NN-<system>.md` for the system just authored, and confirm the question
counts in Drill → Screen mode for that system are unchanged (authoring `followups` must never touch
`n`/`ask`/`minor`/question order — those were fixed in earlier work).

**Before authoring a system's symptoms:** read `Cough` in `src/content.json` (`resp` system) as the shape
reference, and `Headache` (`neuro`) as the second example. Both are done; don't re-touch them.

**Git:** commit per system or per 2–3 systems, following this repo's existing commit style (what changed,
why, in prose — see `git log` for tone). Don't push without being asked to.

---

## 1. The problem and the goal

### The gap
Current per-question schema (167 questions, 14 systems): `n` · `ask` · `why` · `points` · `red` · `minor` · `mirror`.

`ask` opens the door. `points` tell you what answers *mean*. **Nothing tells you what to say next.**
Cough's `points` describe purulent sputum and bronchiectasis but never tell the student to **ask**
*"how much a day — a teaspoon, an eggcup, a cupful? what colour?"*

### The goal
Simulate the real moment: **you are mid-history, the patient says yes, and a sub-history opens up.**
The learner must be able to (a) *perform* the follow-up sequence and (b) know *why* each question is
asked — asking follow-ups blindly is worthless.

### The boundary that keeps this from sprawling
This project owns the **structured follow-up branch** off a screening question: practical, ordered,
drillable, ~4–8 questions. It does **not** own the full differential work-up for complex presentations —
those live in the separate Apex **`approaches/<slug>.md`** files. A question can point at its approach
file via the `approach` field (§3.1) and stop there.

---

## 2. The settled shape — practical, flat, capped

Two rules, learned the hard way:

**Rule 1 — flat and short.** `followups` is a plain ordered list. **Cap at 8**; most symptoms sit at 4–6.
No SOCRATES-slot headings, no sub-grouping. The *ordering* carries the structure (duration → character →
associated → risk, roughly), and that is enough. An earlier draft grouped headache into 10 labelled
SOCRATES sections across 18 entries — it was unusable as a drill and buried the practical content.

**Rule 2 — every entry earns its place with reasoning.** `probes` is one clause saying what the answer
discriminates. Never a bare disease label, never a generic prompt with nothing attached.

| | Verdict |
|---|---|
| ❌ Bare *"How long does it last?"* with no reasoning | teaches nothing |
| ❌ Eighteen entries under ten SOCRATES headings | unusable as a drill |
| ✅ *"How long have you had it?"* → *under 3 weeks → usually infective · over 8 weeks → chronic, needs a systematic cause* | **this** |

Generic SOCRATES *is* allowed where it's the natural next question — but written in the symptom's own
words with the symptom's own meaning attached. The Foundations SOCRATES section remains the abstract
statement of the method; these are its practical instantiations.

**The reference exemplar is Cough** (`resp`), not Headache. Cough is the bread-and-butter shape:
duration · sputum amount/colour · blood · timing · wheeze · fever/breathlessness · smoking · drug &
reflux causes. Read it in `src/content.json` before authoring anything else.

---

## 3. Schema

### 3.1 `followups` and `approach` on a question

```json
"followups": [
  { "q": "How long have you had it?",
    "probes": "Under 3 weeks → usually infective · over 8 weeks → chronic cough, needs a systematic cause" },
  { "q": "Any blood in it, even streaks?",
    "probes": "Any haemoptysis needs an explanation — cancer, TB and PE all sit here",
    "danger": true }
],
"approach": "cough-haemoptysis"
```

| field | meaning |
|---|---|
| `q` | the words you say. Plain, patient-facing, no jargon. |
| `probes` | one clause: **what the answer discriminates.** The anti-blind-asking field. |
| `danger` | optional `true` — must-not-miss probe. Mirrors Talley's own `!` convention. |
| `approach` | optional Apex slug for the full work-up. Renders as *"Full work-up → \<slug\> approach"*. |

Valid `approach` slugs (from `~/Talley-KB/LOCATOR.md`): `chest-pain` · `breathlessness` ·
`cough-haemoptysis` · `palpitations` · `abdominal-pain` · `nausea-vomiting` · `abnormal-stools` ·
`micturition` · `headache` · `weakness` · `confusion-delirium` · `limb-joint-pain` · `fever` ·
`weight-loss` · `tiredness`.

### 3.2 How `followups` relates to `points` (keep both — different granularity)

- `points` = **multi-feature pattern clusters** — the synthesis you use to *name* the diagnosis
  (*"headache + fever + neck stiffness + photophobia → meningitis"*). Reference layer.
- `followups.probes` = **what one single question discriminates**. Performance layer.

**Drift rule:** they must stay consistent. If a follow-up reveals a discriminator missing from `points`,
add it to `points` too. (This already paid off on headache — inversion exposed that cluster headache and
medication-overuse headache were absent from our discriminators entirely.)

### 3.3 Workstream 2 — enrich thin majors
Where a **non-`minor`** question has ≤2 `points` or a one-line `why`, deepen it while in that system.
Do not pad the atomic `minor` questions — they are meant to be one-liners.

---

## 4. The Drill sub-mode — **BUILT**

Within the **Drill** tab there is now a mode switch:

- **Screen** (existing, unchanged) — "name every screening question for this system"
- **Follow-up** (new) — *"You're taking a Respiratory history. You ask: 'Do you have a cough?…' The patient says **yes**."*
  → "What do you ask next — and why does each one matter?"

### Behaviour as built
1. Symptom dropdown, `<optgroup>`-grouped by system, listing only questions that have `followups`,
   with health dot and `• due` marker.
2. Scenario card states the system, quotes the screening question, then "the patient says **yes**".
3. **Reveal** → flat tickable list; each row shows `q` (serif italic) over `probes` (muted), danger rows
   get the red rail and bold. The `approach` pointer renders under the list.
4. **Finish** → grades on ratio ticked (≥0.85 good · >0.4 hard · else again), records per-follow-up
   remembered/forgot, advances to the next due symptom.

### Implementation notes (for whoever extends it)
- `drillState` carries `mode:'screen'|'followup'` and `fuKey`.
- Store keys: `store.srsFu` (symptom Leitner boxes) · `store.fustats` (per-follow-up stats, keyed
  `<fuKey>::<index>`, storing the follow-up text as `label`) · `store.drillMode` · `store.drillFu`.
- `srsOf` / `isDue` / `isWeak` / `systemHealth` / `gradeItem` all take an **optional SRS map** argument so
  the follow-up mode reuses the same Leitner machinery against `store.srsFu`. `gradeSystem` is now a thin
  wrapper. **Verified: grading a symptom leaves `store.srs` untouched.**
- `followupListHTML(followups, rowFn)` is shared between Reference and Drill — Drill passes a `rowFn`
  that emits a tickable `.qrow.fu-row` instead of a plain `<li>`. Don't fork it.
- `allFollowupSymptoms()` / `fuKey()` / `nextDueFuKey()` build the symptom index across systems *and*
  Foundations' sections.

### Non-goals
- **Do not** add follow-ups to the Screen drill's tick list. Verified unchanged (Respiratory still 11 rows).
- Checklist unaffected. Reference shows the block already.
- Not yet built: an "often missed follow-ups" chip strip (the `store.fustats` data to drive it is being
  captured, including the question text, so this is a small later addition).

---

## 5. Source material

Talley ships **"QUESTIONS BOX"** panels — numbered follow-ups tagged with the suspected diagnosis, `!` on
urgent ones. Coverage in the relevant history chapters:

| Chapter | System | Panels |
|---|---|---|
| Ch42 eyes/ears/nose/throat | ENT & Eyes | 7 |
| Ch13 GI history | Gastrointestinal | 7 (incl. diarrhoea) |
| Ch02 history advanced | Foundations / Social | 7 (incl. sexual history) |
| Ch04 cardiovascular | Cardiovascular | 5 |
| Ch31 neurological | Neurological | 5 (headache = the exemplar) |
| Ch43 skin & lumps | Skin | 3 |
| Ch40 gynaecological | Reproductive | 3 |
| Ch09 respiratory | Respiratory | 2 |
| Ch17 genitourinary | GU / Renal | 2 |
| Ch20 haematological | Haematological | 1 |
| Ch23 rheumatological | MSK | 1 |
| Ch27 endocrine | Endocrine | **0** — derive from prose |
| Ch46 mental health | Psychiatric | **0** — derive from prose + MSE structure |

### Per-symptom authoring procedure
1. **Start from Talley's Questions Box** for that symptom where one exists — it is already close to the
   right shape and length.
2. **Invert every `points` entry** into the question that would elicit it — guarantees the two layers align.
3. **Merge and cut to ≤8**, ordered as the conversation would naturally run.
4. **Write one clause of `probes` per entry.** If you can't say what the answer discriminates, cut the entry.
5. **Mark `danger`** on the must-not-miss probes.
6. **Set `approach`** if a matching Apex slug exists — then stop; don't reach for the full work-up.
7. **Backfill `points`** with any new discriminator surfaced along the way (drift rule).

### Source discipline (from `CLAUDE.md`)
- **Never read the source PDF.** `~/Talley-KB/LOCATOR.md` → the one chapter → read only that file.
- **Distil, don't paste** — extracted KB text is private study use; our synthesis is the shareable artifact.
- **Cite** *Talley 10e, Ch\<n\>, p\<printed\>* (printed = PDF page − 28); append to system `citations`.
- Flag Australian divergence per `verification-report.md` §C.

---

## 6. Scope, tiers, volume

**Tier A — full treatment (~35–45 questions).** Non-`minor`, opens a real diagnostic pathway.
**6–8 follow-ups** each. ✅ *Cough and Headache are done — use Cough as the shape reference.*
Chest pain · Dyspnoea · Palpitations · Syncope · Sputum · Haemoptysis · Dysphagia · Abdominal pain ·
Change in bowel habit · Rectal bleeding · Jaundice · Haematuria · Storage/voiding LUTS · Weakness ·
Blackouts · Seizures · Dizziness/vertigo · Joint pain · Back pain · Stiffness · Hearing loss ·
Visual loss · Anaemia symptoms · Bruising & bleeding · The lesion/rash · Mood—depression · Psychosis ·
Substances · Menstrual history · Abnormal bleeding · Thyroid mirror · Diabetes clusters.

**Tier B — moderate (~40).** Remaining non-`minor` questions. **3–5** follow-ups from inverted `points`.

**Tier C — minimal (~67 `minor`).** Deliberately atomic (Epistaxis, Mucus, Hiccups). **0–3** follow-ups,
often **none at all** — a one-line screening question doesn't always open a sub-history. Do not pad;
that undoes the earlier split.

**Exempt.** Foundations *SOCRATES* section itself (circular). The 3 `mirror` questions — the mirror table
already *is* the elicitation grid.

**Volume.** ~40 × 7 + ~40 × 4 + a light touch on Tier C ≈ **450–500 follow-up entries**; `src/content.json`
grows perhaps 60–80%. Author system-by-system, never in one pass.

**The cap is load-bearing.** Two drafts of this plan sprawled past it. If a symptom seems to need 15
follow-ups, that is the signal it belongs in an `approaches/` file — set `approach` and cut back to 8.

---

## 7. Rendering — **BUILT**

- **`build.mjs`** — `blockToAppData` passes `followups` and `approach` through; `blockToMarkdown` emits
  an `**If yes, ask:**` bullet list after `**Why we ask:**`, `!` prefix on danger items, then a
  `> Full work-up → **slug** approach` blockquote.
- **`src/app.template.html`** — `questionsHTML()` renders `.followups` between `.why` and `.points` via
  the shared `followupListHTML()`. CSS: `.followups` `.fu-lbl` `.fu-list` `.fu` `.fu.danger` `.fu-q`
  `.fu-probes` `.fu-approach`, plus `.drill-modes` `.fu-scenario` `.fu-row` for the drill.
- The Drill sub-mode per §4.

---

## 8. Execution order

1. ~~Schema + rendering + Drill follow-up mode~~ ✅ **done**
2. ~~Cough + Headache as exemplars~~ ✅ **done**
3. Content, one system per batch, rebuilding + validating each:
   Respiratory (finish) → Cardiovascular → Gastrointestinal → Neurological (finish) → GU → MSK → ENT →
   Haematological → Skin → Psychiatric → Endocrine → Reproductive → General → Foundations
   (Structure + Social only; SOCRATES exempt).

Commit per system or per 3–4 systems, matching this repo's existing commit-message style
(what changed, why, `Co-Authored-By:` trailer).

---

## 9. Verification

Per batch: JSON valid · `node build.mjs` clean · spot-check generated markdown · open the symptom in the
Drill follow-up dropdown and run it once · confirm **Screen-drill row counts unchanged**.

Final:
- **Cap audit** — no question over 8 follow-ups.
- **Reasoning audit** — no entry with an empty or label-only `probes`.
- **Drift audit** — every `danger` follow-up reflected in `points` / `red`.
- **Approach audit** — every `approach` value is a real slug from the LOCATOR list.

**Quality bar:** *could a student, holding only this question, actually run that sub-history and explain
why they asked each thing?*

---

## 10. Open decisions

1. **Tier C** — confirm `minor` questions stay thin, and that many get no `followups` at all.
2. **"Often missed follow-ups" chip strip** in the Drill follow-up header — data is already being captured
   in `store.fustats` (with question text). Small addition whenever wanted.
3. **Screen → Follow-up handoff** — should recalling a symptom in Screen drill surface "…its follow-ups are
   due too"? Natural next step, deliberately out of scope for v1.
4. **Cases mode** could eventually pull from `followups` to ask "which follow-up would you ask next?" —
   noted, not planned.
