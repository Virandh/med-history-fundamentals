# Verification Report — clinical content vs Talley & O'Connor 10e

**Method.** Each of the 13 system files and the 10 case vignettes was source-checked by an independent verifier against its mapped Talley & O'Connor *Clinical Examination*, 10th ed. history chapter (per `~/Talley-KB/LOCATOR.md`), with a currency cross-check (eTG / RACGP / NICE / current Australian screening programs) on time-sensitive claims. Tiered scope: red flags and rule-in/rule-out discriminators verified rigorously; physiological rationales verified; mnemonics/phrasing spot-checked.

**Citation convention:** *Talley 10e, Ch\<n\>, p\<printed\>*. Extracted KB is private study use; this report contains verdicts and citations, not textbook passages.

**Verdict key:** 🔴 incorrect/misleading (fix) · 🟡 defensible but needs nuance · ✅ verified.

> **Status (2026-07-22): the 5 corrections in §A and the high-value nuances in §B have been applied** to the markdown files and the app. The "correct-but-sourced-elsewhere" footnotes (§B endocrine items, the glass-test/timeframe skin notes) were left as-is by design.

---

## Executive summary

~309 claims checked across 14 units. **Headline: 5 genuine corrections, ~71 nuances, 0 red flags found to be clinically wrong.** Every must-not-miss red flag (SAH, meningitis, cord/cauda equina, septic joint, ectopic, torsion, testicular/bladder/endometrial cancer, sudden SNHL, painful red eye, DKA, suicide risk) verified against Talley. The corrections are precision errors, not safety errors — but two of them (IBS; the depression mimic list) are exactly the kind of updated distinction examiners test.

| Unit | Checked | 🔴 | 🟡 |
|---|---|---|---|
| Cardiovascular | 34 | 1 | 7 |
| Respiratory | 42 | 1 | 7 |
| Gastrointestinal | 22 | 1 | 5 |
| Genitourinary | 22 | 0 | 5 |
| Neurological | 22 | 1 | 4 |
| Musculoskeletal | 14 | 0 | 5 |
| Endocrine | 32 | 0 | 9 |
| Haematological | 16 | 0 | 5 |
| Skin | 18 | 0 | 4 |
| Psychiatric | 15 | 1 | 5 |
| ENT & Eyes | 24 | 0 | 4 |
| Reproductive | 18 | 0 | 6 |
| General/Constitutional | 20 | 0 | 4 |
| Cases (×10) | 10 | 0 | 2 |

---

## A. Corrections to make (🔴)

**A1 — Respiratory, hoarseness (Q8): "apical" is wrong.**
The recurrent laryngeal nerve loops under the aortic arch, so RLN palsy from lung cancer is **hilar/mediastinal**, not apical. Apical (Pancoast) tumours cause Horner's syndrome and brachial-plexus signs instead.
*Source: Talley 10e, Ch9, p184.* **Fix:** "left **hilar/mediastinal** lung cancer" (drop "apical").

**A2 — Cardiovascular, syncope (Q7): "injury sustained" is not an arrhythmic marker.**
Talley lists injury as *uncommon* in cardiac syncope; the discriminating feature is **no warning** (Stokes–Adams). "Injury sustained" is commonly taught but unsupported here.
*Source: Talley 10e, Ch4, p78 (List 4.4).* **Fix:** drop "injury sustained"; keep "no warning, rapid recovery."

**A3 — Neurological + Cardiovascular: the ">30 s limb-jerking → seizure" rule is misleading.**
Brief clonic jerks occur in ordinary (convulsive) syncope, and *prolonged* motor activity actually points toward **psychogenic non-epileptic seizures**, not epilepsy. The number misleads two ways.
*Source: Talley 10e, Ch31, p530–532; Ch4, p78.* **Fix (both files):** remove the ">30 s" numeric; rely on the aura/prodrome, **lateral** tongue-bite, and **post-ictal drowsiness** as the seizure discriminators.

**A4 — Gastrointestinal, IBS (Q5): no longer "a diagnosis of exclusion."**
Talley 10e explicitly states IBS is now a **positive diagnosis on Rome criteria**, not one of exclusion.
*Source: Talley 10e, Ch13, p243 (List 13.3, Rome).* **Fix:** reword to "a positive diagnosis from the Rome criteria (recurrent abdominal pain ≥1 day/week for 3 months + ≥2 of: relation to defecation, change in stool frequency, change in stool form)."

**A5 — Psychiatric, depression mimics (Q mood): drug list is off.**
Talley's medical mimics of depression are hypothyroidism, androgen deficiency, menopause, Parkinson's, MS, chronic illness (HIV, heart failure), and **interferons/chemotherapy** — not steroids or beta-blockers (the beta-blocker–depression link is contested). Anaemia is a mimic of the *fatigue* presentation, not the listed depression mimics.
*Source: Talley 10e, Ch46, List 46.5, p925.* **Fix:** lead with Talley's list; drop/flag steroids & beta-blockers; frame anaemia as a fatigue mimic.

---

## B. High-value nuances (🟡) worth applying

**Cardiovascular**
- Rest pain threshold: Talley uses **>30 min**, not 20 min (Ch4, p74).
- **GTN relief is not specific** (relieves oesophageal spasm; placebo effect) — don't "rule in" angina on nitrate response alone (Ch4, p72). Rest relief + exertional provocation carry it.
- PND: soften "most specific" → **"highly specific"** (Talley quantifies only orthopnoea; Ch4, p76).

**Respiratory**
- Add **engineered/artificial-stone silicosis** to the occupational list — the current high-yield Australian item (product banned 2024) (Ch9, p187).
- Reserve **"bovine"** cough for RLN palsy; "barking" = croup/tracheomalacia (Ch9, p179).
- Asbestos latency: Talley says "up to 30 years"; say "often decades (20–40+)" (Ch9, p187).
- The ">3 weeks cough in a smoker" trigger is the NICE/RACGP referral rule, not Talley's (Talley's chronic-cough threshold is >8 weeks) — fine to keep, just not Talley-sourced.

**Gastrointestinal**
- The classic **duodenal-vs-gastric ulcer meal pattern is unreliable** — Talley: "not possible to distinguish clinically" (Ch13, p236–237). Keep the hedge.
- **Biliary pain is "rarely colicky"** — usually severe, constant, hours, often starting epigastric; fatty-food trigger unpredictable (Ch13, p237).
- **Bowel-cancer screening now starts at 45** in Australia (from July 2024) — soften the ">50" anchor.
- ALARM: Talley's explicit alarm set is only 4 (dysphagia, weight loss, melaena, haematemesis); the extra letters are valid NICE usage, not Talley.

**Musculoskeletal**
- Morning stiffness splits by context: **≥1 hour** = classic RA/peripheral inflammatory (Talley's figure); **≥30 min** = inflammatory back pain (axial SpA). My "30–60 min" blurs them (Ch23, p392–393). Note EMS is supportive, not a scored ACR/EULAR criterion.
- **Primary OA is symmetrical** (including Heberden's DIP nodes); only secondary OA is the asymmetrical weight-bearing pattern (Ch23, p394).

**Haematological**
- **Headache is a polycythaemia feature, not anaemia** (Talley, Ch20, p357). Remove it from the anaemia-symptoms line (it blunts the polycythaemia discriminator used later in the file).

**Psychiatric**
- Depression core = **"low mood OR anhedonia"** (either qualifies; not both mandatory) within 5/9 symptoms ≥2 weeks (Ch46, p924–925).
- Panic must-exclude list: add **phaeochromocytoma** (a mimic Talley emphasises) alongside thyroid/MI (Ch46, p926).
- Currency: Australian first-line alcohol screen is **AUDIT-C**; CAGE is the older dependence-weighted tool. Note AUDIT-C, keep CAGE as legacy.

**Genitourinary**
- "Haematuria days after a sore throat": **synpharyngitic (same few days) = IgA nephropathy**; classic **post-strep GN has a 1–2 week latent period**. Split the timing (Ch17, Table 17.1).

**Endocrine** (footnotes, not fixes — all clinically defensible)
- Hypothyroid cardiac side (angina/**bradycardia**) is an *exam* sign / second-order association, not in Talley's history list (Ch27, p470).
- Talley files **carpal tunnel under acromegaly**; myxoedema carpal tunnel is legitimate teaching but flag it as clinically-derived.

**Reproductive**
- **Intermenstrual bleeding → endometrial pathology too**, not cervical alone (postcoital bleeding is the cervical-specific one) (Ch40, p808).
- **Bacterial vaginosis is characteristically non-itchy** — its discriminator is the fishy odour; don't group BV under "itch" (Ch40, Table 40.5/40.6).
- Cite **Ch18** (GU exam) for testicular torsion/cancer content, not Ch17.

**ENT & Eyes**
- **Hypertension is not a Talley-listed epistaxis cause** and the causal link is contested — qualify it as a soft association (Ch42, p838).

**General/Constitutional**
- Soften the superlative "**the single highest-yield cluster in medicine**" for the B-symptom triad — the triad and its lymphoma/TB significance are correct, but the ranking is unsourced framing.

**Cases**
- Case 3 (thunderclap headache): "focal neurological deficit / altered consciousness" is scored `key` but its own text calls it a SNOOP red flag — reclassify to `red` for internal consistency (must-not-miss).
- Case 8 (new T1DM): tighten the "heat intolerance/palpitations" rationale — the hyperthyroid overlap is *weight loss despite appetite*, not polyuria.

---

## C. Talley vs current guidance (divergences worth knowing for exams)

| Topic | Talley 10e | Current Australian guidance | In the file? |
|---|---|---|---|
| Bowel cancer screening age | no number | **45** (NBCSP, from Jul 2024) | ">50" anchor — soften |
| Premature IHD family history | first-degree <60 | male **<55** / female **<65** (2023 CVD guideline) | file uses <55/<65 — **already current** |
| Cervical screening | (older Pap-based) | **5-yearly HPV**, 25–74, self-collection since 2022 | file states no interval — safe |
| Alcohol screen | — | **AUDIT-C** first-line | file uses CAGE — add note |
| HbA1c diagnostic cut-off | surrogate only | **≥48 mmol/mol (6.5%)** | file states no number — safe |
| GCA age criterion | ≥50 | ≥50 (2022 ACR/EULAR) — **confirmed** | file uses >50 — verified |
| TIA definition | <24 h + infarct note | tissue-based (infarction), not time | file states no duration — safe |

---

## D. What held up (✅)

The overwhelming majority verified cleanly. Notable confirmations:
- **All emergency red flags** across every system verified against Talley.
- **pis-en-deux** and **uraemic hiccups** (both folded in from your 2nd-year list) are explicitly in Talley Ch17 — dead-on.
- **Muscle twitches** correctly placed in Endocrine (hypocalcaemia), correctly absent from Haematology (myeloma causes hyper-, not hypo-calcaemia).
- **Postural dizziness** is a genuine Talley anaemia symptom.
- The **thyroid / Cushing-Addison / calcium mirror pairings** verified row by row.
- **ABCDE** (Diameter >6 mm, Evolving), **SNOOP**, **SIGECAPS**, **SOCRATES** expansions all match recognised current versions.
- **All 10 cases** clinically sound with no wrong verdicts.

---

## E. Per-system detail

Full verifier findings retained per system (cardiovascular, respiratory, GI, GU, neurological, MSK, endocrine, haematological, skin, psychiatric, ENT, reproductive, general, cases). See the corrections in §A and nuances in §B; each is cited to its Talley chapter and page above. Currency-checked claims carry their guideline source in §C.
