#!/usr/bin/env node
/*
 * build.mjs — single source of truth → generates both the markdown reference
 * files and the interactive app.
 *
 * Source of truth:  src/content.json
 * App shell/logic:  src/app.template.html   (contains __CONTENT_DATA__ placeholder)
 * Outputs:          NN-<id>.md  (13 files)  +  systems-review-console.html  +  index.html (identical
 *                    copy, served by GitHub Pages at the repo root)
 *
 * Run:  node build.mjs      (from the project root)
 *
 * Never hand-edit the generated .md files or the .html — edit src/content.json
 * (content) or src/app.template.html (UI/logic), then rebuild.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = dirname(fileURLToPath(import.meta.url));
const content = JSON.parse(readFileSync(join(ROOT, 'src/content.json'), 'utf8'));
const template = readFileSync(join(ROOT, 'src/app.template.html'), 'utf8');

/* ---------- helpers ---------- */
// Bold the segment before the first "→" so generated md bullets keep the
// hand-written emphasis style ("**cue** → consequence").
function mdPoint(text) {
  const i = text.indexOf('→');
  if (i === -1) return `- ${text}`;
  return `- **${text.slice(0, i).trim()}** ${text.slice(i)}`;
}

/* ---------- markdown generation ---------- */
// Render one scaffold+questions+discriminator+drill block (a flat system OR one
// section of a sectioned system). `h` is the markdown heading level for questions.
function blockToMarkdown(s, L, { hLevel = 2 } = {}) {
  const h = '#'.repeat(hLevel);
  L.push(`${h} The scaffold (how to reconstruct this list under pressure)`, '');
  if (s.scaffoldIntro) L.push(s.scaffoldIntro, '');
  L.push(`> **${s.scaffold}**`, '');
  L.push('| Chunk | What it probes | Questions it generates |', '|---|---|---|');
  for (const c of s.chunks) L.push(`| **${c.k}** | ${c.mid} | ${c.gen} |`);
  L.push('');
  if (s.scaffoldOutro) L.push(s.scaffoldOutro, '');
  if (s.seeAlso) L.push(`> **See also** — ${s.seeAlso}`, '');
  L.push('---', '', `${h} The questions`, '');

  s.questions.forEach((q, idx) => {
    L.push(`${h}# ${idx + 1}. ${q.n} — *"${q.ask}"*`, '');
    L.push(`**Why we ask:** ${q.why}`, '');
    if (q.mirror) {
      L.push(`| ⬆ ${q.mirror.left} | ⬇ ${q.mirror.right} |`, '|---|---|');
      for (const r of q.mirror.rows) L.push(`| ${r[0]} | ${r[1]} |`);
      L.push('');
    }
    if (q.points && q.points.length) {
      L.push('**Rules in / rules out:**');
      for (const p of q.points) L.push(mdPoint(p[1]));
      L.push('');
    }
    if (q.red) L.push(`**Red flag:** ${q.red}`, '');
    L.push('---', '');
  });

  if (s.discriminator) {
    const d = s.discriminator;
    L.push(`${h} Discriminator table: ${d.title}`, '');
    L.push('| ' + d.headers.join(' | ') + ' |');
    L.push('|' + d.headers.map(() => '---').join('|') + '|');
    for (const r of d.rows) L.push('| ' + r.join(' | ') + ' |');
    L.push('');
  }

  L.push(`${h} Quick-recall list (drill version)`, '', s.drill, '');
}

function systemToMarkdown(s) {
  const L = [];
  if (s.sections) {
    L.push(`# ${s.name}`, '');
    if (s.intro) L.push(s.intro, '');
    s.sections.forEach((sec, i) => {
      L.push('', `## ${i + 1}. ${sec.name}`, '');
      blockToMarkdown(sec, L, { hLevel: 3 });
    });
    return L.join('\n');
  }
  L.push(`# ${s.name} Systems Review`, '');
  blockToMarkdown(s, L, { hLevel: 2 });
  return L.join('\n');
}

/* ---------- app data (strip md-only fields, shape for the renderer) ---------- */
// Shape one scaffold/questions block for the renderer (flat system OR one section).
function blockToAppData(s) {
  const out = {
    scaffold: s.scaffold,
    chunks: s.chunks.map(c => [c.k, c.gen]),
  };
  if (s.name) out.name = s.name;
  if (s.seeAlso) out.seeAlso = s.seeAlso;
  out.drill = s.drill;
  out.checklist = s.checklist;
  if (s.clnote) out.clnote = s.clnote;
  if (s.discriminator) out.discriminator = s.discriminator;
  out.questions = s.questions.map(q => {
    const o = { n: q.n, ask: q.ask, why: q.why, points: q.points || [] };
    if (q.mirror) o.mirror = q.mirror;
    if (q.red) o.red = q.red;
    if (q.minor) o.minor = true;
    return o;
  });
  return out;
}

function systemToAppData(s) {
  if (s.sections) {
    const out = { id: s.id, name: s.name, color: s.color, scaffold: s.scaffold };
    if (s.intro) out.intro = s.intro;
    out.sections = s.sections.map(blockToAppData);
    return out;
  }
  const out = { id: s.id, name: s.name, color: s.color };
  return Object.assign(out, blockToAppData(s));
}

/* ---------- emit ---------- */
let mdCount = 0;
for (const s of content.systems) {
  writeFileSync(join(ROOT, `${s.file}.md`), systemToMarkdown(s) + '\n');
  mdCount++;
}

const appSystems = content.systems.map(systemToAppData);
const dataBlock =
  `const SYSTEMS = ${JSON.stringify(appSystems, null, 0)};\n\n` +
  `const CASES = ${JSON.stringify(content.cases, null, 0)};\n`;

const html = template.replace('__CONTENT_DATA__', () => dataBlock);
writeFileSync(join(ROOT, 'systems-review-console.html'), html);
// GitHub Pages serves the repo root's index.html — keep it identical to the canonical app file
writeFileSync(join(ROOT, 'index.html'), html);

console.log(`Built ${mdCount} markdown files + systems-review-console.html + index.html`);
console.log(`Systems: ${content.systems.length} · Cases: ${content.cases.length}`);
