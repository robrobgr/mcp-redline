#!/usr/bin/env node
/**
 * mcp-redline — deterministic claim verification over a local Markdown corpus.
 *
 * verify() contains NO corpus-specific rules. It works in three steps:
 *   1. The corpus is cut into verbatim units (sentences, list items, table rows).
 *   2. Each unit is compared with the claim on three axes:
 *        - coverage  : share of the claim's content terms present in the unit
 *                      (bilingual PL/EN domain lexicon + light prefix stemming),
 *        - numbers   : every number in the claim must appear in the unit with a
 *                      compatible kind/currency; a different value of the same
 *                      kind, or a different currency, is a conflict,
 *        - polarity  : negation / rejection cues in claim vs unit.
 *   3. Authority tiers resolve conflicts: a contradiction in a higher-or-equal
 *      tier source beats support from a lower tier (e.g. contract > e-mail).
 *
 * Result: GROUNDED (verbatim quote) | CONTRADICTED (verbatim counter-quote) |
 * UNSUPPORTED (nothing decisive). In doubt the engine does not confirm.
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

// ───────────────────────────── Types ─────────────────────────────

export type VerifyStatus = "GROUNDED" | "CONTRADICTED" | "UNSUPPORTED";
type Currency = "GBP" | "EUR" | "PLN";
type NumKind = "money" | "percent" | "year" | "plain";

export interface NumMention { value: number; kind: NumKind; currency?: Currency; raw: string; word?: string }

export interface CorpusSection { file: string; page: number; title: string; content: string; tier: number }

export interface Unit {
  file: string;
  page: number;
  tier: number;
  text: string; // verbatim substring of the source file
  tokens: Set<string>;
  context: Set<string>; // section title + document header
  numbers: NumMention[];
  negCues: string[];
  hedged: boolean;
  clauses: Array<{ tokens: Set<string>; cues: string[] }>; // negation scope
}

export interface SourceInfo { file: string; type: string; pages: number; title: string; tier: number }
export interface SearchResult { file: string; page: number; quote: string; score: number }

export interface Evidence {
  file: string;
  page: number;
  tier: number;
  quote: string; // verbatim; several fragments of one section are joined with " […] "
  coverage: number;
  matched: string[];
  missing: string[];
  reasons: string[];
}

export interface VerifyResult {
  status: VerifyStatus;
  claim: string;
  file?: string;
  page?: number;
  tier?: number;
  quote?: string;
  explanation: string;
  evidence?: Evidence;
  conflicting?: Evidence;
  nearest?: Evidence;
}

// ───────────────────────────── Thresholds ─────────────────────────────

export const THRESHOLDS = {
  support: 0.6, // min coverage (unit + context) to confirm
  supportUnit: 0.5, // min coverage by the quoted unit itself to confirm
  contradict: 0.45, // min coverage (unit + titles, no neighbours) to contradict
  override: 0.75, // a higher-tier contradiction must be at least this relevant vs. the support
  tieMargin: 0.15, // an equal-tier negation this close in relevance blocks confirmation
};

// ───────────────────────────── Lexicon ─────────────────────────────
// Groups of equivalent stems (PL/EN). "=" prefix means exact word only.
// Domain vocabulary, NOT answers: no group encodes a fact from the corpus.

const GROUPS: string[][] = [
  ["umow", "agreement", "contract", "msa", "kontrakt"],
  ["ramow", "master"],
  ["podpis", "zawar", "signed", "sign", "entered", "executed", "countersigned"],
  ["opłat", "fee", "stawk", "=cen", "=cena", "=ceny", "=cenę", "price", "pricing", "koszt", "cost", "rates"],
  ["roczn", "annual", "annually", "yearly"],
  ["kwartał", "kwartaln", "quarter", "quarterly", "installments", "=rat", "=raty", "=ratach", "=ratami"],
  ["miesięc", "miesiąc", "month", "monthly"],
  ["dostępn", "availability", "uptime", "available"],
  ["gwarant", "guarantee", "guaranteed", "guarantees", "commitment"],
  ["=kara", "=kary", "=karę", "=karą", "=kar", "karn", "penalty", "penalties", "liquidated", "fines"],
  ["awari", "outage", "failure", "unavailability", "niedostępn", "disruption", "degradation"],
  ["faktur", "invoice", "invoices", "invoiced", "invoicing", "billed", "billing"],
  ["podnie", "podwyż", "raise", "increase", "increasing", "adjust", "adjustment", "indeks", "index", "indexing", "indexation", "waloryz"],
  ["inflac", "inflation", "cpi"],
  ["przychod", "revenue", "revenues", "sales", "sprzedaż"],
  ["zysk", "profit"],
  ["netto", "net"],
  ["brutto", "gross"],
  ["odpowiedzial", "liability", "liable"],
  ["limit", "ograniczon", "cap", "capped", "limited"],
  ["hosting", "hosted", "host", "przetwarz", "processing", "processed", "przechow", "storage", "stored", "compute", "utrzymuj", "maintain", "klastr", "cluster", "clusters", "serwer", "server", "servers"],
  ["niemc", "niemie", "germany", "german"],
  ["irland", "ireland"],
  ["londyn", "london"],
  ["angli", "angiel", "england", "english"],
  ["wali", "wales"],
  ["polsk", "polish", "poland", "polsce"],
  ["praw", "law", "laws", "right", "rights", "entitled", "uprawn"],
  ["=sąd", "=sądy", "sądu", "sądów", "court", "courts"],
  ["jurysdyk", "jurisdiction"],
  ["podleg", "governed", "construed"],
  ["wyłączn", "exclusive", "exclusively", "sole", "solely", "only", "jedyn", "=tylko"],
  ["jednostron", "unilateral", "unilaterally"],
  ["aneks", "annex", "addendum", "amendment"],
  ["pojazd", "vehicle", "vehicles", "naczep", "trailer", "trailers", "=aut", "=auta", "=aut."],
  ["flot", "fleet"],
  ["rozszerz", "expansion", "expand", "extend", "extension"],
  ["licenc", "license", "licence", "subscription", "subskryp", "abonament"],
  ["=dane", "=danych", "=data"],
  ["telemetr", "telematy", "telemetry", "telematics"],
  ["odnow", "przedłuż", "renewal", "renew", "renewed", "rollover"],
  ["automat", "automatic", "automatically"],
  ["zwrot", "zwrac", "refund", "refunded", "gotówk", "cash"],
  ["termin", "due", "deadline"],
  ["płatn", "payable", "payment", "payments", "paid", "zapłac", "opłacon", "uregulow", "uiszcz"],
  ["zarząd", "board", "management"],
  ["propozyc", "proposal", "proposed", "wniosek", "wnioskow", "request"],
  ["pełn", "full", "całkowit", "total", "łączn", "aggregate"],
  ["okres", "term", "period"],
  ["początkow", "initial"],
  ["=dni", "=dnia", "days", "day"],
  ["wartoś", "value"],
  ["kwot", "amount"],
  ["obejm", "cover", "covers", "include", "includes", "przewid", "provide", "provides"],
  ["dopuszcz", "allowed", "permitted", "permit", "permitting", "allow"],
  ["obowiąz", "effect", "force"],
  ["kończ", "ending", "ends", "expire", "expiration"],
  ["wyciąg", "remedy"],
  ["service", "serwis", "usług", "services"],
  ["credit", "credits", "kredyt", "rabat"],
  ["maksym", "maximum", "max", "exceed"],
  ["wsparc", "support"],
  ["biur", "office"],
  ["warszaw", "warsaw"],
  ["=vat", "tax"],
  ["zablokow", "blocked", "block"],
  ["chłodnicz", "refrigerated", "cold"],
  ["bramk", "gateway", "gateways"],
  ["wypowiedz", "terminate", "terminated", "termination"],
  ["stycz", "january"], ["lut", "february"], ["=marca", "=marzec", "march"], ["kwiec", "kwietn", "april"],
  ["=maja", "=maj", "may"], ["czerw", "june"], ["lipc", "lipiec", "july"], ["sierp", "august"],
  ["wrześ", "wrzes", "september"], ["paździer", "october"], ["listopad", "november"], ["grud", "december"],
];

const WEEKDAYS_EN = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
// Geographic groups are decisive like proper nouns (PL writes "polskiemu", "niemieckich" lower-case):
// a claim term from these groups must appear in the quoted unit itself.
const DECISIVE_GROUPS = GROUPS.filter((g) => ["niemc", "irland", "londyn", "angli", "wali", "polsk", "warszaw"].includes(g[0]));

const MONTHS_EN = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

const STOPWORDS = new Set([
  // EN
  "the", "a", "an", "is", "are", "was", "were", "be", "been", "being", "has", "have", "had", "may", "shall", "will", "would",
  "should", "can", "could", "must", "of", "in", "on", "at", "to", "for", "by", "with", "and", "or", "from", "as", "that", "this",
  "these", "those", "its", "it", "into", "per", "any", "all", "each", "which", "who", "whom", "also", "such", "than", "there",
  "their", "our", "we", "you", "your", "i.e", "e.g", "non", "remains", "remain", "under", "upon", "within", "via", "does", "did",
  // PL
  "w", "we", "z", "ze", "za", "do", "od", "po", "o", "i", "a", "oraz", "lub", "na", "nad", "pod", "przy", "przez", "dla", "jako",
  "się", "to", "ten", "ta", "te", "tego", "tej", "tym", "który", "która", "które", "których", "którym", "że", "czy", "jak", "jego",
  "jej", "ich", "r", "rok", "roku", "wynosi", "wyniósł", "wyniosła", "wyniosło", "wyniosły", "wynoszą", "była", "był", "było",
  "były", "została", "został", "zostało", "zostały", "jest", "są", "ma", "mają", "miał", "miała", "wszystkie", "wszystkich",
  "też", "także", "co", "tak", "nr", "sp", "o.o", "ramach", "tytułu", "wysokości", "terenie", "między", "dnia", "obrotowy",
  "gbp", "eur", "pln", "zł", "euro", "każdy", "każda", "każde", "every", "podstawie", "basis",
]);

// Roles and legal-form words never carry grounding on their own. Party NAMES are not listed
// here: they are read from the contract's definitions clause at load time (see parties).
const GENERIC = new Set([
  "ltd", "limited", "plc", "inc", "gmbh", "spółka", "spółki", "supplier", "customer", "party", "parties",
  "dostawca", "dostawcy", "dostawcę", "dostawcą", "klient", "klienta", "klientowi", "firma", "company", "strona", "strony",
]);
const ROLE_GROUPS: string[][] = [
  ["supplier", "dostawc", "vendor", "provider", "licensor"],
  ["customer", "klient", "client", "licensee", "buyer"],
];
const LEGAL_FORM = new Set(["ltd", "limited", "plc", "inc", "gmbh", "sp", "o.o", "z", "s.a", "b.v", "sas", "llc"]);

const NEG_EXACT = new Set([
  "not", "no", "never", "neither", "nor", "none", "cannot", "can't", "won't", "isn't", "doesn't", "don't", "wasn't",
  "excluded", "disclaimed", "barred", "prohibited", "rejected", "reject", "deleted", "void", "inaccurate", "incorrect",
  "abandoned", "stalled", "unpaid", "unsigned", "struck",
  "nie", "nigdy", "brak", "braku", "żaden", "żadna", "żadne", "żadnych", "żadnego", "żadnej",
]);
const NEG_PREFIX = ["odrzuc", "wykreśl", "zakaz", "nieważn", "bezpodstawn", "bezskuteczn", "wyłączy", "wyłączon", "nieprawdziw", "niedopuszczaln", "wykluczon"];
const UNPREFIX: Record<string, string> = { unpaid: "paid", unsigned: "signed" };
// Reported speech / proposals: a unit that only reports that someone proposed or claimed
// something cannot establish it as fact (unless the claim itself is about the proposal).
const HEDGE_PREFIX = ["zawnioskow", "wnios", "propozyc", "proponu", "propos", "request", "claimed", "alleg", "twierdz", "rzekom", "purport", "draft", "domag", "żąda", "żądan"];
function isHedge(t: string): boolean {
  return HEDGE_PREFIX.some((p) => t.startsWith(p));
}

// Credit for a claim term found only in a neighbouring sentence of the same section.
const NEIGHBOUR_CREDIT = 0;
const B = "(?<![\\p{L}\\p{N}])";
const E = "(?![\\p{L}\\p{N}])";
// Comparatives / caps are not negations ("not less than 99.8%", "shall not exceed").
const QUANT_RE = new RegExp(
  [
    `${B}(?:not|no)\\s+(?:less|more|later|earlier|fewer|greater)\\s+than${E}`,
    `${B}not\\s+(?:to\\s+)?exceed\\w*`,
    `${B}nie\\s+(?:mniej|więcej|później|wcześniej)\\s+niż${E}`,
    `${B}nie\\s+przekracz\\p{L}*`,
    `${B}no[.:]`,
  ].join("|"),
  "giu"
);

const TOKEN_RE = /[\p{L}][\p{L}\p{N}]*(?:[-'’][\p{L}\p{N}]+)*/gu;

// ───────────────────────────── Text helpers ─────────────────────────────

function rawTokens(text: string): string[] {
  const out: string[] = [];
  for (const t of text.toLowerCase().match(TOKEN_RE) || []) {
    out.push(t);
    if (t.includes("-") && !/\d/.test(t)) out.push(...t.split("-"));
  }
  return out.filter((t) => t.length >= 2);
}

function isNegCue(t: string): boolean {
  return NEG_EXACT.has(t) || NEG_PREFIX.some((p) => t.startsWith(p));
}

function negationCues(text: string): string[] {
  const cleaned = text.replace(QUANT_RE, " ");
  return rawTokens(cleaned).filter(isNegCue);
}

function isAscii(s: string): boolean {
  return /^[a-z0-9'-]+$/.test(s);
}

/** Light, language-agnostic prefix stemming. */
function stemMatch(a: string, b: string): boolean {
  if (a === b) return true;
  if (a + "s" === b || b + "s" === a) return true;
  const m = Math.min(a.length, b.length);
  if (m <= 3) return false;
  let p = 0;
  while (p < m && a[p] === b[p]) p++;
  if (m === 4) return isAscii(a) && isAscii(b) ? p === 4 : p >= 3;
  if (m === 5) return p >= 4;
  return p >= Math.max(5, m - 3);
}

function memberMatch(member: string, word: string): boolean {
  if (member.startsWith("=")) return member.slice(1) === word;
  if (member.startsWith("~")) return stemMatch(member.slice(1), word); // a claim word: stem match only
  return stemMatch(member, word) || word.startsWith(member);
}

// ───────────────────────────── Numbers ─────────────────────────────

const CUR_WORD: Array<[RegExp, Currency]> = [
  [/^(?:gbp|funt\p{L}*|pounds?)$/iu, "GBP"],
  [/^(?:eur|euro)$/iu, "EUR"],
  [/^(?:pln|zł|złotych)$/iu, "PLN"],
];

function currencyOf(word: string): Currency | undefined {
  for (const [re, c] of CUR_WORD) if (re.test(word)) return c;
  return undefined;
}

function currenciesIn(text: string): Set<Currency> {
  const s = new Set<Currency>();
  if (text.includes("£")) s.add("GBP");
  if (text.includes("€")) s.add("EUR");
  for (const w of text.match(/[\p{L}]+/gu) || []) {
    const c = currencyOf(w);
    if (c) s.add(c);
  }
  return s;
}

function parseNumber(s: string): number {
  let n = s.replace(/[\s ]/g, "");
  const hasDot = n.includes("."), hasComma = n.includes(",");
  if (hasDot && hasComma) {
    n = n.lastIndexOf(",") > n.lastIndexOf(".") ? n.replace(/\./g, "").replace(",", ".") : n.replace(/,/g, "");
  } else if (hasComma) {
    n = /^\d{1,3}(,\d{3})+$/.test(n) ? n.replace(/,/g, "") : n.replace(",", ".");
  } else if ((n.match(/\./g) || []).length > 1) {
    n = n.replace(/\./g, "");
  }
  return parseFloat(n);
}

/** Extracts numeric facts; drops identifiers, clause references, times and list numbering. */
export function extractNumbers(text: string, defaultCurrency?: Currency): { numbers: NumMention[]; extraTokens: string[] } {
  const extraTokens: string[] = [];
  const numbers: NumMention[] = [];
  let t = " " + text + " ";
  t = t.replace(/[\p{L}]+(?:-[\p{L}\p{N}]+)*-\d[\p{L}\p{N}-]*/gu, " "); // INV-2024-1108, eu-west-1
  t = t.replace(/(?<![\p{L}\p{N}])[\p{L}]+\d[\p{L}\p{N}]*/gu, " "); // Q4, GB33BARC…
  t = t.replace(/(?:section|sections|sec\.?|article|pkt|punkt\p{L}*|point|§|schedule\s+[a-z])\s*\d+(?:\.\d+)*(?:\s*(?:and|i|oraz|,)\s*\d+(?:\.\d+)*)*/giu, " ");
  t = t.replace(/\d{1,2}:\d{2}/g, " ");
  t = t.replace(/\d+\/\d+/g, " ");
  t = t.replace(/^\s*(?:[>*#-]\s*)*\d+(?:\.\d+)+\.?\s/, " "); // 3.1 …
  t = t.replace(/^\s*#+\s*\d+\.\s/, " ");
  t = t.replace(/(?<!\d)(\d{1,2})\.(\d{1,2})\.(\d{4})(?!\d)/g, (_m, d, mo, y) => {
    numbers.push({ value: +d, kind: "plain", raw: d }, { value: +y, kind: "year", raw: y });
    const mi = +mo - 1;
    if (mi >= 0 && mi < 12) extraTokens.push(MONTHS_EN[mi]);
    return " ";
  });

  const re = /([£€]\s?)?(\d{1,3}(?:[  ]\d{3})+(?:[.,]\d+)?|\d+(?:[.,]\d+)*)(?:st|nd|rd|th)?(?![\p{L}\d])(\s?%)?/gu;
  let m: RegExpExecArray | null;
  while ((m = re.exec(t))) {
    const raw = m[0].trim();
    let value = parseNumber(m[2]);
    if (!isFinite(value)) continue;
    const after = t.slice(re.lastIndex, re.lastIndex + 24);
    let currency: Currency | undefined = m[1] ? (m[1].includes("£") ? "GBP" : "EUR") : undefined;
    const nextWords = (after.match(/[\p{L}%]+/gu) || []).slice(0, 2);
    const coded = currencyOf(nextWords[0] || "");
    if (coded) currency = coded; // "£48,000 EUR" -> EUR (explicit code wins)
    let percent = !!m[3];
    if (/^\s*(?:\*\*)?\s*(?:percent|procent)/iu.test(after)) percent = true;
    if (/^\s*(?:mln|million|milion\p{L}*)(?![\p{L}])/iu.test(after)) value *= 1e6;
    if (!currency) {
      for (const w of nextWords) {
        const c = currencyOf(w);
        if (c) { currency = c; break; }
        if (!/^(?:mln|million|milion\p{L}*|net|netto)$/iu.test(w)) break;
      }
    }
    let kind: NumKind;
    if (percent) kind = "percent";
    else if (currency) kind = "money";
    else if (Number.isInteger(value) && value >= 1990 && value <= 2100 && !/[.,\s]/.test(m[2])) kind = "year";
    else if (value >= 1000 || /[.,]\d{2}$/.test(m[2])) kind = "money";
    else kind = "plain";
    if (kind === "money" && !currency && defaultCurrency) currency = defaultCurrency;
    const word = (after.match(/^[\s*)]*([\p{L}]+)/u)?.[1] || "").toLowerCase() || undefined;
    numbers.push({ value, kind, currency, raw, word });
  }
  return { numbers, extraTokens };
}

function fmt(n: NumMention): string {
  return n.currency && !/[£€]|gbp|eur|pln|zł/i.test(n.raw) ? `${n.raw} ${n.currency}` : n.raw;
}

function sameValue(a: number, b: number): boolean {
  return Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));
}

// ───────────────────────────── Engine ─────────────────────────────

interface ClaimFeatures {
  content: string[];
  alts: Map<string, Set<string>>; // claim token -> matching corpus vocabulary
  weight: Map<string, number>; // IDF weight: rare terms decide, common terms barely count
  numbers: NumMention[];
  negative: boolean;
  hedged: boolean;
  parties: Set<string>;
  proper: string[]; // capitalised names/places in the claim — decisive, must be in the quoted unit
}

interface UnitScore {
  unit: Unit;
  unitNegative: boolean; // polarity of the clauses that match the claim
  coverage: number; // unit + section context (half credit for neighbouring sentences)
  unitCoverage: number; // quoted unit only
  contraCoverage: number; // unit + titles (no neighbouring sentences) — used for contradictions
  supportCoverage: number; // coverage incl. confirmed numbers
  supportUnitCoverage: number;
  valueConflict: boolean;
  full: number;
  matched: string[];
  missing: string[];
  numbersOk: boolean;
  conflicts: string[];
  polarityFlip: boolean;
  score: number;
}

function tierOf(file: string): number {
  const f = file.toLowerCase();
  if (/(email|e-mail|mail|correspondence|korespond)/.test(f)) return 3;
  if (/(crm|pipeline|notes|notatk)/.test(f)) return 2;
  return 1;
}

const ABBREV = new Set(["ul", "mec", "dr", "nr", "sp", "st", "no", "r", "tj", "np", "ok", "ref", "al", "prof", "pkt", "ust", "art", "vs", "inc", "e.g", "i.e", "o.o", "z"]);

function splitSentences(line: string): string[] {
  const out: string[] = [];
  let start = 0;
  const re = /[.!?](?=\s+[\p{Lu}\d"*(\[>„])/gu;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) {
    const before = line.slice(start, m.index);
    const lastWord = (before.match(/([\p{L}.]+)$/u)?.[1] || "").toLowerCase();
    if (ABBREV.has(lastWord) || lastWord.length === 1 || /^[\s\d.*#>-]*$/.test(before)) continue;
    out.push(line.slice(start, m.index + 1));
    start = m.index + 1;
  }
  out.push(line.slice(start));
  return out.map((s) => s.trim()).filter((s) => s.length > 0);
}

export class RedlineEngine {
  public corpusDir: string;
  public sections: CorpusSection[] = [];
  public sources: SourceInfo[] = [];
  public units: Unit[] = [];
  private sectionUnits = new Map<string, Unit[]>();
  private vocabulary = new Set<string>();
  /** Contract parties read from definitions clauses: name + defined aliases + role words. */
  public parties: Array<{ name: string; tokens: string[]; names: string[] }> = [];

  constructor(corpusDir?: string) {
    if (corpusDir) {
      this.corpusDir = corpusDir;
    } else if (process.env.MCP_REDLINE_CORPUS_DIR) {
      this.corpusDir = path.resolve(process.cwd(), process.env.MCP_REDLINE_CORPUS_DIR);
    } else {
      const here = path.dirname(fileURLToPath(import.meta.url));
      const candidates = [path.resolve(here, "../corpus"), path.resolve(here, "../../corpus"), path.resolve(process.cwd(), "corpus")];
      this.corpusDir = candidates.find((c) => fs.existsSync(c)) || candidates[2];
    }
    this.loadCorpus();
  }

  public loadCorpus(): void {
    this.sections = [];
    this.sources = [];
    this.units = [];
    this.sectionUnits.clear();
    this.vocabulary.clear();
    this.parties = [];
    if (!fs.existsSync(this.corpusDir)) return;

    const files = fs.readdirSync(this.corpusDir).filter((f) => f.endsWith(".md")).sort();
    for (const file of files) {
      const raw = fs.readFileSync(path.join(this.corpusDir, file), "utf-8");
      const tier = tierOf(file);
      this.readParties(raw);
      const lines = raw.split("\n");
      const isSinglePage = /invoice|faktura/i.test(file);
      const headerLines = lines.filter((l) => l.trim() && l.trim() !== "---").slice(0, 2);
      const docContext = rawTokens(headerLines.join(" "));

      const docSections: CorpusSection[] = [];
      let title = file.replace(/\.md$/, "");
      let buf: string[] = [];
      const flush = () => {
        if (buf.join("\n").trim().length > 0) {
          docSections.push({ file, page: docSections.length + 1, title, content: buf.join("\n").trim(), tier });
        }
        buf = [];
      };
      for (const line of lines) {
        const isHeader = !isSinglePage && /^#{1,2}\s+|^###\s+(?:\d+\.|[A-Z0-9_ -]{3,}:?)/.test(line);
        if (isHeader) {
          flush();
          title = line.replace(/^#{1,3}\s+/, "").trim();
        }
        buf.push(line);
      }
      flush();

      for (const sec of docSections) this.buildUnits(sec, docContext);
      this.sources.push({ file, type: "markdown", pages: docSections.length, title: docSections[0]?.title || file, tier });
      this.sections.push(...docSections);
    }
  }

  private buildUnits(sec: CorpusSection, docContext: string[]): void {
    const context = new Set([...rawTokens(sec.title), ...docContext]);
    const lines = sec.content.split("\n");
    const units: Unit[] = [];
    let header: string[] | null = null;
    let headerCurrency: Currency | undefined;

    const push = (text: string, tokenText: string, extraNumbers: NumMention[] = [], defCur?: Currency) => {
      const { numbers, extraTokens } = extractNumbers(text, defCur);
      const tokens = new Set([...rawTokens(tokenText), ...extraTokens]);
      tokens.forEach((t) => this.vocabulary.add(t));
      units.push({
        file: sec.file, page: sec.page, tier: sec.tier, text, tokens, context, numbers: [...numbers, ...extraNumbers],
        negCues: negationCues(text), hedged: rawTokens(text).some(isHedge),
        // Table rows keep one scope (a status cell negates the whole record); prose is split
        // into clauses so that "under English law (which governs the contract) the letter has
        // NO effect" does not negate "the contract is governed by English law".
        clauses: (text.startsWith("|") ? [text] : text.split(/[,;:()—–]|\s-\s/)).map((c) => ({ tokens: new Set(rawTokens(c)), cues: negationCues(c) })),
      });
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || /^-{3,}$/.test(line) || /^#{1,6}\s/.test(line)) continue;
      if (line.startsWith("|")) {
        const cells = line.split("|").slice(1, -1).map((c) => c.trim());
        if (cells.every((c) => /^:?-{3,}:?$/.test(c))) continue;
        const next = (lines[i + 1] || "").trim();
        if (/^\|\s*:?-{3,}/.test(next)) {
          header = cells;
          const hc = currenciesIn(cells.join(" "));
          headerCurrency = hc.size === 1 ? [...hc][0] : undefined;
          continue;
        }
        const rowCur = new Set<Currency>();
        cells.forEach((c) => { const cc = currencyOf(c.replace(/\*/g, "")); if (cc) rowCur.add(cc); });
        const defCur = rowCur.size === 1 ? [...rowCur][0] : headerCurrency;
        const labelled = cells.map((c, k) => `${header?.[k] ?? ""}: ${c}`).join(" | ");
        const headerYears = header ? extractNumbers(header.join(" | ")).numbers.filter((n) => n.kind === "year") : [];
        push(line, labelled, headerYears, defCur);
        continue;
      }
      header = null;
      for (const s of splitSentences(line)) {
        const cur = currenciesIn(s);
        push(s, s, [], cur.size === 1 ? [...cur][0] : undefined);
      }
    }
    this.sectionUnits.set(`${sec.file}#${sec.page}`, units);
    this.units.push(...units);
  }

  /**
   * Definitions clause convention: **Full Name Ltd**, … ("Supplier" or "Short Name").
   * Each party gets its distinctive name tokens plus the role words it is defined as.
   */
  private readParties(raw: string): void {
    const re = /\*\*([^*\n]+)\*\*,[^\n]*?\(\s*"([^"]+)"(?:\s+or\s+"([^"]+)")?\s*\)/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(raw))) {
      const name = m[1].trim();
      if (this.parties.some((p) => p.name === name)) continue;
      const toks = new Set<string>();
      for (const part of [m[1], m[2], m[3] || ""]) for (const t of rawTokens(part)) if (!LEGAL_FORM.has(t)) toks.add(t);
      const names = [...toks].filter((t) => !ROLE_GROUPS.some((g) => g.some((r) => t.startsWith(r))));
      for (const t of [...toks]) for (const g of ROLE_GROUPS) if (g.some((r) => t.startsWith(r))) g.forEach((r) => toks.add(r));
      this.parties.push({ name, tokens: [...toks], names });
    }
    // tokens shared by several parties are not distinctive
    for (const p of this.parties) {
      p.tokens = p.tokens.filter((t) => this.parties.filter((q) => q.tokens.includes(t)).length === 1);
      p.names = p.names.filter((t) => p.tokens.includes(t));
    }
  }

  private partiesIn(tokens: Iterable<string>, namesOnly = false): Set<string> {
    const found = new Set<string>();
    for (const t of tokens) for (const p of this.parties) {
      if ((namesOnly ? p.names : p.tokens).some((pt) => t === pt || t.startsWith(pt))) found.add(p.name);
    }
    return found;
  }

  /**
   * A unit that NAMES another party (by name, not by role word — roles appear in every contract
   * sentence as actors) and never refers to the claim's party cannot support the claim.
   */
  private partyMismatch(claimParties: Set<string>, u: Unit): boolean {
    if (claimParties.size === 0) return false;
    const named = this.partiesIn(u.tokens, true);
    if (named.size === 0) return false;
    const referred = this.partiesIn(u.tokens);
    return ![...claimParties].some((p) => referred.has(p));
  }

  public listSources(): SourceInfo[] {
    return this.sources;
  }

  public quote(file: string, page: number | string): { file: string; page: number; quote: string } | null {
    const pageNum = typeof page === "string" ? parseInt(page, 10) : page;
    const match = this.sections.find(
      (s) => s.file.toLowerCase() === file.toLowerCase() && (isNaN(pageNum) ? s.title === page : s.page === pageNum)
    );
    if (!match) return null;
    return { file: match.file, page: match.page, quote: match.content };
  }

  // ── claim analysis ──

  private features(claim: string): ClaimFeatures {
    const cleaned = claim.replace(QUANT_RE, " ");
    const toks = rawTokens(cleaned);
    const negative = toks.some(isNegCue);
    const content = new Set<string>();
    for (const t of toks) {
      if (UNPREFIX[t]) content.add(UNPREFIX[t]);
      if (isNegCue(t) || STOPWORDS.has(t) || GENERIC.has(t) || currencyOf(t)) continue;
      if (this.parties.some((p) => p.tokens.includes(t))) continue; // who, not what: checked via partyMismatch
      content.add(t);
    }
    const alts = new Map<string, Set<string>>();
    for (const t of content) {
      const members = [`~${t}`];
      for (const g of GROUPS) if (g.some((mem) => memberMatch(mem, t))) members.push(...g);
      const hits = new Set<string>();
      for (const v of this.vocabulary) if (members.some((mem) => memberMatch(mem, v))) hits.add(v);
      alts.set(t, hits);
    }
    const weight = new Map<string, number>();
    const N = this.units.length || 1;
    for (const [t, hits] of alts) {
      const df = this.units.filter((u) => [...u.tokens].some((x) => hits.has(x))).length;
      weight.set(t, Math.log(1 + N / (df + 1)));
    }
    const claimCur = currenciesIn(claim);
    const { numbers } = extractNumbers(claim, claimCur.size === 1 ? [...claimCur][0] : undefined);
    const cased = claim.match(TOKEN_RE) || [];
    const proper = [...new Set(cased.slice(1).filter((w) => /^\p{Lu}/u.test(w)).map((w) => w.toLowerCase()))].filter((t) => content.has(t) && !MONTHS_EN.includes(t) && !WEEKDAYS_EN.includes(t));
    for (const t of content) if (DECISIVE_GROUPS.some((g) => g.some((m) => memberMatch(m, t))) && !proper.includes(t)) proper.push(t);
    return { content: [...content], alts, weight, numbers, negative, hedged: toks.some(isHedge), parties: this.partiesIn(toks), proper };
  }

  private scoreUnit(f: ClaimFeatures, u: Unit): UnitScore {
    const sectionUnits = this.sectionUnits.get(`${u.file}#${u.page}`) || [];
    let cov = 0, full = 0, ctx = 0;
    const matched: string[] = [], missing: string[] = [];
    let W = 0;
    for (const t of f.content) {
      const hits = f.alts.get(t)!;
      const w = f.weight.get(t)!;
      W += w;
      if ([...u.tokens].some((x) => hits.has(x))) { cov += w; full++; matched.push(t); continue; }
      if ([...u.context].some((x) => hits.has(x))) {
        // A document identifier (e.g. INV-2024-1108) in the document header binds every unit of it.
        if (/\d/.test(t)) { cov += w; full++; matched.push(`${t}^`); continue; }
        cov += 0.5 * w; ctx += 0.5 * w; matched.push(`${t}^`); continue;
      }
      const inSection = sectionUnits.some((s) => [...s.tokens].some((x) => hits.has(x)));
      if (inSection) { cov += NEIGHBOUR_CREDIT * w; matched.push(`${t}~`); } else missing.push(t);
    }
    const fullW = f.content.filter((t) => matched.includes(t) || matched.includes(`${t}^`) && /\d/.test(t)).reduce((a, t) => a + f.weight.get(t)!, 0);
    const n = W || 1;
    const coverage = cov / n;
    const unitCoverage = fullW / n;
    const contraCoverage = (fullW + ctx) / n;

    // numbers
    const conflicts: string[] = [];
    let numbersOk = true;
    const sectionYears = sectionUnits.flatMap((s) => s.numbers.filter((n) => n.kind === "year"));
    for (const n of f.numbers) {
      const same = u.numbers.filter((x) => sameValue(x.value, n.value));
      const curClash = n.currency && same.length > 0 && same.every((x) => x.currency && x.currency !== n.currency);
      const found = same.some((x) => !(n.currency && x.currency && x.currency !== n.currency)) ||
        (n.kind === "year" && sectionYears.some((y) => y.value === n.value));
      if (curClash) {
        numbersOk = false;
        conflicts.push(`waluta: twierdzenie ${fmt(n)}, źródło ${fmt(same[0])}`);
        continue;
      }
      if (found) continue;
      numbersOk = false;
      const rivals = u.numbers.filter((x) => {
        if (n.kind === "money") return x.kind === "money";
        if (n.kind === "percent") return x.kind === "percent";
        if (n.kind === "year") return x.kind === "year";
        return x.kind === "plain" && !f.numbers.some((c) => sameValue(c.value, x.value)) && !!n.word && !!x.word && this.sameConcept(n.word, x.word);
      });
      if (rivals.length > 0) conflicts.push(`wartość: twierdzenie ${fmt(n)}, źródło ${rivals.map(fmt).join(" / ")}`);
    }

    // Negation scope = the clause(s) carrying most of the claim's terms.
    const hitsIn = (c: { tokens: Set<string> }) => f.content.filter((t) => [...c.tokens].some((x) => f.alts.get(t)!.has(x))).length;
    const best = Math.max(0, ...u.clauses.map(hitsIn));
    const relevant = best > 0 ? u.clauses.filter((c) => hitsIn(c) === best) : [];
    const unitNegative = relevant.length ? relevant.some((c) => c.cues.length > 0) : u.negCues.length > 0;
    const polarityFlip = f.negative !== unitNegative;
    // Confirmed numbers are content too: fold them into the support coverage.
    const numFound = f.numbers.length - (numbersOk ? 0 : f.numbers.filter((x) => !u.numbers.some((y) => sameValue(x.value, y.value))).length);
    const NW = Math.log(1 + (this.units.length || 1) / 2); // numbers weigh like a rare term
    const denom = W + f.numbers.length * NW || 1;
    const supportCoverage = (cov + Math.max(0, numFound) * NW) / denom;
    const supportUnitCoverage = (fullW + Math.max(0, numFound) * NW) / denom;
    const score = coverage + (3 - u.tier) * 0.02 + (numbersOk && f.numbers.length ? 0.1 : 0);
    return { unit: u, unitNegative, coverage, unitCoverage, contraCoverage, supportCoverage, supportUnitCoverage, valueConflict: conflicts.length > 0, full, matched, missing, numbersOk, conflicts, polarityFlip, score };
  }

  /** Two words denote the same concept (stem match or same lexicon group). */
  private sameConcept(a: string, b: string): boolean {
    if (stemMatch(a, b)) return true;
    return GROUPS.some((g) => g.some((m) => memberMatch(m, a)) && g.some((m) => memberMatch(m, b)));
  }

  /**
   * Records only (table rows, "Key: value" fields) — never free-text sentences, since stitching
   * sentences together is exactly how synthesis hallucinations happen.
   * Multi-fact claims ("invoice X for Q4, £12,000, payable to Barclays") are spread over several
   * lines of one record. Greedily assemble up to 3 verbatim units of ONE section that together
   * contain the claim's terms and numbers. Every unit must have the claim's polarity and none may
   * be a mere proposal.
   */
  private combine(f: ClaimFeatures, seed: UnitScore): { units: Unit[]; coverage: number; matched: string[]; missing: string[] } | null {
    const isField = (u: Unit) => u.text.startsWith("|") || (u.text.length <= 160 && /^[\s*>-]*\*{0,2}[\p{L}][\p{L}\s/()&-]{1,40}:\*{0,2}\s/u.test(u.text));
    const pool = (this.sectionUnits.get(`${seed.unit.file}#${seed.unit.page}`) || []).filter((u) =>
      isField(u) && !this.partyMismatch(f.parties, u) && (u.negCues.length > 0) === f.negative && !(u.hedged && u.negCues.length === 0 && !f.hedged));
    const hasTok = (u: Unit, t: string) => {
      const hits = f.alts.get(t)!;
      return [...u.tokens].some((x) => hits.has(x)) || (/\d/.test(t) && [...u.context].some((x) => hits.has(x)));
    };
    const hasNum = (u: Unit, n: NumMention) => u.numbers.some((x) => sameValue(x.value, n.value) && !(n.currency && x.currency && x.currency !== n.currency));
    const chosen: Unit[] = [];
    const covered = (t: string) => chosen.some((u) => hasTok(u, t));
    const gotNum = (n: NumMention) => chosen.some((u) => hasNum(u, n)) || (n.kind === "year" && pool.some((u) => hasNum(u, n)));
    for (let k = 0; k < 3; k++) {
      let best: Unit | null = null, gain = 0;
      for (const u of pool) {
        if (chosen.includes(u)) continue;
        const g = f.content.filter((t) => !covered(t) && hasTok(u, t)).length + f.numbers.filter((n) => !gotNum(n) && hasNum(u, n)).length;
        if (g > gain) { gain = g; best = u; }
      }
      if (!best) break;
      chosen.push(best);
    }
    if (chosen.length < 2 || !f.numbers.every(gotNum)) return null;
    if (!f.proper.every(covered)) return null;
    // no chosen unit may carry a different value in the same currency for a claimed amount
    for (const n of f.numbers.filter((x) => x.kind === "money")) {
      if (chosen.some((u) => u.numbers.some((x) => x.kind === "money" && x.currency === n.currency && !sameValue(x.value, n.value)) && !hasNum(u, n))) return null;
    }
    const matched = f.content.filter(covered);
    const missing = f.content.filter((t) => !covered(t));
    const NW = Math.log(1 + (this.units.length || 1) / 2);
    const wsum = (ts: string[]) => ts.reduce((a, t) => a + f.weight.get(t)!, 0);
    const coverage = (wsum(matched) + f.numbers.length * NW) / (wsum(f.content) + f.numbers.length * NW);
    return { units: chosen, coverage, matched, missing };
  }

  private toEvidence(s: UnitScore, reasons: string[] = []): Evidence {
    return {
      file: s.unit.file, page: s.unit.page, tier: s.unit.tier, quote: s.unit.text,
      coverage: Math.round(s.coverage * 100) / 100, matched: s.matched, missing: s.missing, reasons,
    };
  }

  public search(query: string, limit = 5): SearchResult[] {
    const f = this.features(query);
    if (f.content.length === 0 && f.numbers.length === 0) return [];
    return this.units
      .map((u) => this.scoreUnit(f, u))
      .filter((s) => s.full > 0 || (f.numbers.length > 0 && s.numbersOk))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((s) => ({ file: s.unit.file, page: s.unit.page, quote: s.unit.text, score: Math.round(s.score * 100) / 100 }));
  }

  public verify(claim: string): VerifyResult {
    const f = this.features(claim);
    if (f.content.length === 0) {
      return { status: "UNSUPPORTED", claim, explanation: "Brak oparcia: twierdzenie nie zawiera pojęć, które można sprawdzić w korpusie." };
    }
    const minFull = Math.min(2, f.content.length);
    const scored = this.units.map((u) => this.scoreUnit(f, u)).sort((a, b) => b.score - a.score);

    const supports = scored.filter((s) =>
      s.supportCoverage >= THRESHOLDS.support && s.supportUnitCoverage >= THRESHOLDS.supportUnit && s.full >= minFull &&
      s.numbersOk && s.conflicts.length === 0 && !s.polarityFlip && !this.partyMismatch(f.parties, s.unit) &&
      f.proper.every((t) => s.matched.includes(t) || s.matched.includes(`${t}^`)) &&
      !(s.unit.hedged && s.unit.negCues.length === 0 && !f.hedged));
    // Positive claim vs. negating source: a denial is enough.
    // Negative claim ("X was not signed") vs. affirmative source: only a source that would itself
    // ground "X was signed" (same figures, high coverage, not a mere proposal) contradicts it.
    const polarityContra = (s: UnitScore) =>
      s.polarityFlip && (!f.negative || (!s.unit.hedged && s.numbersOk && s.contraCoverage >= THRESHOLDS.support));
    const contras = scored.filter((s) =>
      s.contraCoverage >= THRESHOLDS.contradict && s.full >= minFull && (s.valueConflict || polarityContra(s)));

    const pick = (arr: UnitScore[]) => arr.slice().sort((a, b) => a.unit.tier - b.unit.tier || b.score - a.score)[0];
    const bestS = pick(supports);
    // A contradiction overrides support only if it comes from a more authoritative source,
    // or — for negation — from an equally authoritative sentence that matches the claim better.
    // A value conflict with an equal-tier source while the exact value is confirmed elsewhere
    // just means the source mentions another figure (e.g. quarterly vs annual fee).
    const overrides = (c: UnitScore) =>
      !bestS ||
      (c.unit.tier < bestS.unit.tier && c.contraCoverage >= THRESHOLDS.override * bestS.contraCoverage) ||
      (c.unit.tier === bestS.unit.tier && polarityContra(c) && c.numbersOk &&
        c.contraCoverage >= bestS.contraCoverage - THRESHOLDS.tieMargin);
    const bestC = pick(contras.filter(overrides));

    const contraReasons = (c: UnitScore) => [
      ...(polarityContra(c) ? [`polaryzacja: ${f.negative ? "twierdzenie zaprzecza, źródło twierdzi" : `źródło zaprzecza/odrzuca (${(c.unit.clauses.flatMap((k) => k.cues).slice(0, 3).join(", ")) || c.unit.negCues.slice(0, 3).join(", ")})`}`] : []),
      ...c.conflicts,
    ];

    if (bestC) {
      const ev = this.toEvidence(bestC, contraReasons(bestC));
      const conflicting = bestS ? this.toEvidence(bestS, ["zgodne ze źródłem o niższej lub równej randze"]) : undefined;
      return {
        status: "CONTRADICTED", claim, file: ev.file, page: ev.page, tier: ev.tier, quote: ev.quote,
        explanation:
          `Sprzeczne ze źródłem ${ev.file} (sekcja ${ev.page}, Tier ${ev.tier}): ${ev.reasons.join("; ")}.` +
          (conflicting ? ` Zgodny fragment istnieje w ${conflicting.file} (Tier ${conflicting.tier}), ale źródło o wyższej lub równej randze mu przeczy.` : ""),
        evidence: ev, conflicting,
      };
    }

    if (!bestS && !bestC) {
      const seeds = scored.filter((s) => s.full > 0).slice(0, 5);
      for (const seed of seeds) {
        const combo = this.combine(f, seed);
        if (!combo || combo.coverage < THRESHOLDS.support) continue;
        // a higher- or equal-tier contradiction still wins
        const c = pick(contras);
        if (c && c.unit.tier <= seed.unit.tier) break;
        const ordered = combo.units.slice().sort((a, b) => this.units.indexOf(a) - this.units.indexOf(b));
        const ev: Evidence = {
          file: seed.unit.file, page: seed.unit.page, tier: seed.unit.tier,
          quote: ordered.map((u) => u.text).join(" […] "),
          coverage: Math.round(combo.coverage * 100) / 100, matched: combo.matched, missing: combo.missing,
          reasons: [`twierdzenie złożone: potwierdzone ${ordered.length} fragmentami tej samej sekcji`],
        };
        return {
          status: "GROUNDED", claim, file: ev.file, page: ev.page, tier: ev.tier, quote: ev.quote,
          explanation: `Potwierdzone ${ordered.length} dosłownymi fragmentami: ${ev.file} (sekcja ${ev.page}, Tier ${ev.tier}); pokrycie ${Math.round(ev.coverage * 100)}%` +
            (f.numbers.length ? `, liczby zgodne (${f.numbers.map((n) => n.raw).join(", ")})` : "") + ".",
          evidence: ev,
        };
      }
    }

    if (bestS) {
      const ev = this.toEvidence(bestS);
      const lower = pick(contras.filter((c) => c.unit.tier > bestS.unit.tier));
      const conflicting = lower ? this.toEvidence(lower, contraReasons(lower)) : undefined;
      return {
        status: "GROUNDED", claim, file: ev.file, page: ev.page, tier: ev.tier, quote: ev.quote,
        explanation:
          `Potwierdzone dosłownym fragmentem: ${ev.file} (sekcja ${ev.page}, Tier ${ev.tier}); pokrycie pojęć ${Math.round(ev.coverage * 100)}%` +
          (f.numbers.length ? `, liczby zgodne (${f.numbers.map((n) => n.raw).join(", ")})` : "") + "." +
          (conflicting ? ` Uwaga: źródło o niższej randze (${conflicting.file}, Tier ${conflicting.tier}) twierdzi inaczej.` : ""),
        evidence: ev, conflicting,
      };
    }

    const near = scored[0];
    const nearest = near && near.full > 0 ? this.toEvidence(near) : undefined;
    const why: string[] = [];
    if (near) {
      if (near.coverage < THRESHOLDS.support) why.push(`za niskie pokrycie pojęć (${Math.round(near.coverage * 100)}%, brakuje: ${near.missing.join(", ") || "—"})`);
      if (!near.numbersOk) why.push("liczby z twierdzenia nie występują w tym fragmencie");
      if (near.polarityFlip) why.push("niezgodna polaryzacja");
    }
    return {
      status: "UNSUPPORTED", claim,
      explanation: nearest
        ? `Brak wystarczającego oparcia. Najbliższy fragment (${nearest.file}, sekcja ${nearest.page}) nie rozstrzyga: ${why.join("; ")}.`
        : "Brak oparcia w korpusie: żaden dokument nie odnosi się do tego twierdzenia.",
      nearest,
    };
  }
}

// ───────────────────────────── MCP server ─────────────────────────────

const json = (v: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(v, null, 2) }] });

export function createServer(engine?: RedlineEngine): McpServer {
  const server = new McpServer({ name: "mcp-redline", version: "1.1.0" });
  const redline = engine || new RedlineEngine();

  server.tool("list_sources", "List all documents in the local corpus with their authority tier (1 = contract/ledger, 2 = CRM, 3 = correspondence)", {}, async () =>
    json(redline.listSources()));

  server.tool(
    "search",
    "Search the corpus; returns verbatim sentence-level quotes with file, section and score",
    { query: z.string().describe("Search query") },
    async ({ query }) => json(redline.search(query))
  );

  server.tool(
    "quote",
    "Retrieve the exact, verbatim text of a section (page) of a corpus file",
    {
      file: z.string().describe("Filename in the corpus (e.g. 01_Apex_VeloNova_MSA_2023.md)"),
      page: z.union([z.number(), z.string()]).describe("Section number or title"),
    },
    async ({ file, page }) => {
      const result = redline.quote(file, page);
      if (!result) return { ...json({ error: `Not found: ${file} section ${page}` }), isError: true };
      return json(result);
    }
  );

  server.tool(
    "verify",
    "Deterministically verify a claim against the corpus (no LLM). Returns GROUNDED with a verbatim supporting quote, CONTRADICTED with a verbatim counter-quote from an equal-or-higher authority source, or UNSUPPORTED when nothing is decisive. Only GROUNDED may be presented as fact.",
    { claim: z.string().describe("A single factual statement to verify") },
    async ({ claim }) => json(redline.verify(claim))
  );

  return server;
}

async function run() {
  const server = createServer();
  await server.connect(new StdioServerTransport());
  process.stderr.write("mcp-redline server running on stdio\n");
}

if (process.argv[1] && fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run().catch((err) => {
    process.stderr.write(`Fatal error: ${err}\n`);
    process.exit(1);
  });
}
