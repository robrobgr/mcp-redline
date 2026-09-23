#!/usr/bin/env node
/**
 * mcp-redline evaluation runner.
 *   node scripts/eval.js                 -> all splits, writes results_raw.json + EVALUATION_REPORT.md
 *   node scripts/eval.js --split dev     -> only given split(s), comma-separated; nothing written
 *   node scripts/eval.js --strict        -> exit 1 on ANY mismatch (default: exit 1 only on false GROUNDED)
 *
 * Critical metric: false GROUNDED = claim that is not supported by the corpus but was
 * confirmed. This is the failure mcp-redline exists to prevent, so it always fails the run.
 */
import { RedlineEngine } from "../dist/src/index.js";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const args = process.argv.slice(2);
const splitArg = args.includes("--split") ? args[args.indexOf("--split") + 1].split(",") : null;
const strict = args.includes("--strict");
const verbose = args.includes("--verbose");

const engine = new RedlineEngine(path.join(root, "corpus"));
const { claims } = JSON.parse(fs.readFileSync(path.join(root, "prompts_eval", "claims.json"), "utf-8"));
const selected = splitArg ? claims.filter((c) => splitArg.includes(c.split)) : claims;
const STATUSES = ["GROUNDED", "CONTRADICTED", "UNSUPPORTED"];

const results = selected.map((c) => {
  const t0 = process.hrtime.bigint();
  const r = engine.verify(c.claim);
  const durationMs = Number(process.hrtime.bigint() - t0) / 1e6;
  const correct = r.status === c.expected;
  const falseGrounded = r.status === "GROUNDED" && c.expected !== "GROUNDED";
  const safe = correct || (c.expected !== "GROUNDED" && r.status !== "GROUNDED"); // refused a non-fact, wrong label
  return { ...c, verdict: r.status, correct, safe, falseGrounded, durationMs, file: r.file ?? null, page: r.page ?? null, tier: r.tier ?? null, quote: r.quote ?? null, explanation: r.explanation };
});

function metrics(rows) {
  const n = rows.length;
  const correct = rows.filter((r) => r.correct).length;
  const fg = rows.filter((r) => r.falseGrounded).length;
  const facts = rows.filter((r) => r.expected === "GROUNDED");
  const confirmed = facts.filter((r) => r.verdict === "GROUNDED").length;
  const nonFacts = rows.filter((r) => r.expected !== "GROUNDED");
  const refused = nonFacts.filter((r) => r.verdict !== "GROUNDED").length;
  const confusion = Object.fromEntries(STATUSES.map((e) => [e, Object.fromEntries(STATUSES.map((p) => [p, rows.filter((r) => r.expected === e && r.verdict === p).length]))]));
  return { n, correct, accuracy: n ? correct / n : 0, falseGrounded: fg, factsConfirmed: `${confirmed}/${facts.length}`, nonFactsRefused: `${refused}/${nonFacts.length}`, confusion };
}

const splits = [...new Set(selected.map((c) => c.split))];
const bySplit = Object.fromEntries(splits.map((s) => [s, metrics(results.filter((r) => r.split === s))]));
const overall = metrics(results);
const pct = (x) => `${(x * 100).toFixed(0)}%`;

console.log("=".repeat(96));
console.log("MCP-REDLINE EVALUATION");
console.log("=".repeat(96));
for (const r of results) {
  const mark = r.correct ? "\x1b[32m OK \x1b[0m" : r.falseGrounded ? "\x1b[41m FALSE-GROUNDED \x1b[0m" : "\x1b[33m MISS \x1b[0m";
  console.log(`${r.id.padEnd(4)} ${r.split.padEnd(8)} exp=${r.expected.padEnd(12)} got=${r.verdict.padEnd(12)} ${mark} ${r.claim.slice(0, 70)}`);
  if (verbose && !r.correct) console.log(`      -> ${r.explanation}\n      quote: ${(r.quote || "").slice(0, 160)}`);
}
console.log("-".repeat(96));
for (const [s, m] of Object.entries({ ...bySplit, ALL: overall })) {
  console.log(`${s.padEnd(8)} n=${String(m.n).padEnd(3)} accuracy=${pct(m.accuracy).padEnd(5)} false-GROUNDED=${m.falseGrounded}  facts confirmed=${m.factsConfirmed}  non-facts refused=${m.nonFactsRefused}`);
}

if (!splitArg) {
  const executedAt = new Date().toISOString();
  const outDir = path.join(root, "prompts_eval");
  fs.writeFileSync(path.join(outDir, "results_raw.json"), JSON.stringify({ executedAt, node: process.version, metrics: { bySplit, overall }, results }, null, 2) + "\n");

  const row = (r) => `| ${r.id} | ${r.split} | ${r.claim.replace(/\|/g, "\\|")} | ${r.expected} | **${r.verdict}** | ${r.correct ? "✅" : r.falseGrounded ? "🔴 fałszywe GROUNDED" : "🟠"} | ${r.file ? `${r.file} §${r.page} (T${r.tier})` : "—"} |`;
  const mrow = (s, m) => `| ${s} | ${m.n} | ${pct(m.accuracy)} | ${m.falseGrounded} | ${m.factsConfirmed} | ${m.nonFactsRefused} |`;
  const conf = (m) => ["| oczekiwane \\ wynik | GROUNDED | CONTRADICTED | UNSUPPORTED |", "|---|---|---|---|", ...STATUSES.map((e) => `| ${e} | ${STATUSES.map((p) => m.confusion[e][p]).join(" | ")} |`)].join("\n");
  const md = `# Raport ewaluacji — mcp-redline

> Plik generowany automatycznie przez \`npm run eval\` — nie edytować ręcznie.

- Uruchomienie: **${executedAt}**, Node ${process.version}
- Zestaw: [\`claims.json\`](claims.json) — ${results.length} twierdzeń, spisanych przed przepisaniem silnika (historia git).
- Podziały: \`legacy\` = 10 promptów z Etapu 3 (stary silnik był pod nie strojony), \`dev\` = zestaw, na którym strojono nowy silnik, \`holdout\` = zestaw, na którym silnika **nie** strojono (uczciwa miara uogólnienia).
- Krytyczna metryka: **fałszywe GROUNDED** — twierdzenie bez oparcia oznaczone jako potwierdzone. Każde takie zdarzenie kończy \`npm run eval\` kodem błędu.

## Wyniki zbiorcze

| Podział | n | Trafność (3 klasy) | Fałszywe GROUNDED | Fakty potwierdzone | Nie-fakty odrzucone |
|---|---|---|---|---|---|
${Object.entries(bySplit).map(([s, m]) => mrow(s, m)).join("\n")}
| **RAZEM** | ${overall.n} | ${pct(overall.accuracy)} | ${overall.falseGrounded} | ${overall.factsConfirmed} | ${overall.nonFactsRefused} |

### Macierz pomyłek (holdout)

${bySplit.holdout ? conf(bySplit.holdout) : "_brak_"}

### Macierz pomyłek (wszystkie)

${conf(overall)}

## Wyniki szczegółowe

| ID | Podział | Twierdzenie | Oczekiwane | Wynik | Ocena | Źródło |
|---|---|---|---|---|---|---|
${results.map(row).join("\n")}

Surowe odpowiedzi (z cytatami i uzasadnieniami): [\`results_raw.json\`](results_raw.json).
`;
  fs.writeFileSync(path.join(outDir, "EVALUATION_REPORT.md"), md);
  console.log(`\nZapisano prompts_eval/results_raw.json i prompts_eval/EVALUATION_REPORT.md`);
}

const failures = results.filter((r) => r.falseGrounded || (strict && !r.correct));
if (failures.length) {
  console.error(`\nFAIL: ${results.filter((r) => r.falseGrounded).length} fałszywych GROUNDED${strict ? `, ${results.filter((r) => !r.correct).length} rozbieżności (--strict)` : ""}.`);
  process.exit(1);
}
