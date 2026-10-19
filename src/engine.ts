/**
 * mcp-redline — deterministic claim verification core engine.
 * Language-neutral core: source tiers, chronology, number/date binding, refusal policy, and verdict logic.
 * Language-specific rules and lexicons live in src/lang/{en,pl}.ts via the LanguagePack interface.
 */
import { SupportedLang, REASON_CODES } from "./messages.js";
import {
  LanguagePack,
  LANGUAGE_PACKS,
  getLanguagePack,
  detectLanguage,
  Currency,
  AntonymPair,
} from "./lang/index.js";

export * from "./messages.js";
export * from "./lang/index.js";

// ───────────────────────────── Types ─────────────────────────────

export type VerifyStatus = "GROUNDED" | "CONTRADICTED" | "UNSUPPORTED";
type NumKind = "money" | "percent" | "year" | "plain";

export interface NumMention { value: number; kind: NumKind; currency?: Currency; raw: string; word?: string }

export interface CorpusSection { file: string; page: number; title: string; content: string; tier: number; lang: SupportedLang }

export interface Unit {
  file: string;
  page: number;
  tier: number;
  lang: SupportedLang;
  text: string; // verbatim substring of the source file
  tokens: Set<string>;
  context: Set<string>; // section title + document header
  numbers: NumMention[];
  negCues: string[];
  hedged: boolean;
  clauses: Array<{ tokens: Set<string>; cues: string[] }>; // negation scope
  docDate: number;
  modal: boolean;
  factual: boolean;
  roles: { subject?: "supplier" | "customer"; recipient?: "supplier" | "customer" };
}

export interface SourceInfo { file: string; type: string; pages: number; title: string; tier: number; lang?: SupportedLang }
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
  reasonCodes: string[];
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

// Credit for a claim term found only in a neighbouring sentence of the same section.
const NEIGHBOUR_CREDIT = 0;

// ───────────────────── Registered Language Pack Aggregation ─────────────────────
// Cross-lingual concept alignment & mixed-document structural patterns derived from LANGUAGE_PACKS.

const ALL_PACKS: LanguagePack[] = Object.values(LANGUAGE_PACKS);

function buildConceptGroups(): { groups: string[][]; decisiveGroups: string[][] } {
  const byId = new Map<string, string[]>();
  const decisiveIds = new Set<string>();
  for (const pack of ALL_PACKS) {
    for (const id of pack.decisiveConceptIds) decisiveIds.add(id);
    for (const [id, members] of Object.entries(pack.lexiconGroups)) {
      const list = byId.get(id) || [];
      for (const m of members) if (!list.includes(m)) list.push(m);
      byId.set(id, list);
    }
  }
  const groups: string[][] = [];
  const decisiveGroups: string[][] = [];
  for (const [id, members] of byId.entries()) {
    groups.push(members);
    if (decisiveIds.has(id)) decisiveGroups.push(members);
  }
  return { groups, decisiveGroups };
}

const { groups: CONCEPT_GROUPS, decisiveGroups: DECISIVE_CONCEPT_GROUPS } = buildConceptGroups();
const CANONICAL_MONTHS = getLanguagePack("en").canonicalMonths;

const TOKEN_RE = /[\p{L}][\p{L}\p{N}]*(?:[-'’][\p{L}\p{N}]+)*/gu;

function checkAntonymConflict(claimToks: string[], unitToks: string[], packs: LanguagePack[]): boolean {
  const pairs: AntonymPair[] = packs.flatMap((p) => p.antonymPairs);
  for (const pair of pairs) {
    const negs = [pair.neg, ...(pair.alts || [])];
    const claimHasPos = claimToks.some((t) => t.startsWith(pair.pos) && !negs.some((n) => t.startsWith(n)));
    const claimHasNeg = claimToks.some((t) => negs.some((n) => t.startsWith(n)));
    const unitHasPos = unitToks.some((t) => t.startsWith(pair.pos) && !negs.some((n) => t.startsWith(n)));
    const unitHasNeg = unitToks.some((t) => negs.some((n) => t.startsWith(n)));

    if ((claimHasPos && unitHasNeg) || (claimHasNeg && unitHasPos)) {
      return true;
    }
  }
  return false;
}

function memberMatch(member: string, word: string, pack: LanguagePack): boolean {
  if (member.startsWith("=")) return member.slice(1) === word;
  if (member.startsWith("~")) return pack.stemMatch(member.slice(1), word);
  return pack.stemMatch(member, word) || word.startsWith(member);
}

// ───────────────────────────── Numbers & Dates ─────────────────────────────

function currencyOf(word: string, packs: LanguagePack[] = ALL_PACKS): Currency | undefined {
  for (const p of packs) {
    for (const [re, c] of p.numberFormat.currencyPatterns) {
      if (re.test(word)) return c;
    }
  }
  return undefined;
}

function currenciesIn(text: string, packs: LanguagePack[] = ALL_PACKS): Set<Currency> {
  const s = new Set<Currency>();
  if (text.includes("£")) s.add("GBP");
  if (text.includes("€")) s.add("EUR");
  for (const w of text.match(/[\p{L}]+/gu) || []) {
    const c = currencyOf(w, packs);
    if (c) s.add(c);
  }
  return s;
}

/** Extracts numeric facts; drops identifiers, clause references, times and list numbering. */
export function extractNumbers(
  text: string,
  defaultCurrency?: Currency,
  lang: SupportedLang = "en"
): { numbers: NumMention[]; extraTokens: string[] } {
  const primaryPack = getLanguagePack(lang);
  const extraTokens: string[] = [];
  const numbers: NumMention[] = [];
  let t = " " + text + " ";
  t = t.replace(/[\p{L}]+(?:-[\p{L}\p{N}]+)*-\d[\p{L}\p{N}-]*/gu, " "); // INV-2024-1108, eu-west-1
  t = t.replace(/(?<![\p{L}\p{N}])[\p{L}]+\d[\p{L}\p{N}]*/gu, " "); // Q4, GB33BARC…

  const clauseWords = ALL_PACKS.flatMap((p) => p.numberFormat.clauseRefWords).join("|");
  const clauseConj = ALL_PACKS.flatMap((p) => p.numberFormat.clauseConjunctions).join("|");
  const clauseRefRe = new RegExp(
    `(?:${clauseWords})\\s*\\d+(?:\\.\\d+)*(?:\\s*(?:${clauseConj})\\s*\\d+(?:\\.\\d+)*)*`,
    "giu"
  );
  t = t.replace(clauseRefRe, " ");
  t = t.replace(/\d{1,2}:\d{2}/g, " ");
  t = t.replace(/\d+\/\d+/g, " ");
  t = t.replace(/^\s*(?:[>*#-]\s*)*\d+(?:\.\d+)+\.?\s/, " "); // 3.1 …
  t = t.replace(/^\s*#+\s*\d+\.\s/, " ");
  t = t.replace(/(?<!\d)(\d{1,2})\.(\d{1,2})\.(\d{4})(?!\d)/g, (_m, d, mo, y) => {
    const mi = +mo - 1;
    const moCanonical = mi >= 0 && mi < 12 ? CANONICAL_MONTHS[mi] : undefined;
    numbers.push({ value: +d, kind: "plain", raw: d, word: moCanonical }, { value: +y, kind: "year", raw: y });
    if (moCanonical) extraTokens.push(moCanonical);
    return " ";
  });

  const allMonthsMap: Record<string, number> = {};
  for (const p of ALL_PACKS) {
    Object.assign(allMonthsMap, p.monthNames);
  }
  const dateNamedRe = new RegExp(
    `(?<!\\d)(\\d{1,2})\\s+(${Object.keys(allMonthsMap).join("|")})\\s+(\\d{4})(?!\\d)(?:\\s*r\\.?)?`,
    "giu"
  );
  t = t.replace(dateNamedRe, (_m, d, mo, y) => {
    const moLower = mo.toLowerCase();
    const mi = allMonthsMap[moLower];
    const moCanonical = mi !== undefined && mi >= 0 && mi < 12 ? CANONICAL_MONTHS[mi] : undefined;
    numbers.push({ value: +d, kind: "plain", raw: d, word: moCanonical }, { value: +y, kind: "year", raw: y });
    if (moCanonical) extraTokens.push(moCanonical);
    return " ";
  });

  const re = /([£€]\s?)?(\d{1,3}(?:[ \u00a0]\d{3})+(?:[.,]\d+)?|\d+(?:[.,]\d+)*)(?:st|nd|rd|th)?(?![\p{L}\d])(\s?%)?(?:-([\p{L}]+))?/gu;
  let m: RegExpExecArray | null;
  while ((m = re.exec(t))) {
    const raw = m[0].trim();
    let value = primaryPack.numberFormat.parseNumber(m[2]);
    if (!isFinite(value)) continue;
    const after = t.slice(re.lastIndex, re.lastIndex + 24);
    let currency: Currency | undefined = m[1] ? (m[1].includes("£") ? "GBP" : "EUR") : undefined;
    const nextWords = (after.match(/[\p{L}%]+/gu) || []).slice(0, 2);
    const coded = currencyOf(nextWords[0] || "");
    if (coded) currency = coded;
    let percent = !!m[3];
    if (ALL_PACKS.some((p) => p.numberFormat.percentWordPattern.test(after))) percent = true;
    if (ALL_PACKS.some((p) => p.numberFormat.millionPattern.test(after))) value *= 1e6;
    if (!currency) {
      for (const w of nextWords) {
        const c = currencyOf(w);
        if (c) { currency = c; break; }
        if (!ALL_PACKS.some((p) => p.numberFormat.netWordPattern.test(w))) break;
      }
    }
    let kind: NumKind;
    if (percent) kind = "percent";
    else if (currency) kind = "money";
    else if (Number.isInteger(value) && value >= 1990 && value <= 2100 && !/[.,\s]/.test(m[2])) kind = "year";
    else if (value >= 1000 || /[.,]\d{2}$/.test(m[2])) kind = "money";
    else kind = "plain";
    if (kind === "money" && !currency && defaultCurrency) currency = defaultCurrency;
    let word = m[4] ? m[4].toLowerCase() : (after.match(/^[\s*)]*([\p{L}]+)/u)?.[1] || "").toLowerCase() || undefined;
    for (const p of ALL_PACKS) {
      word = p.numberFormat.normalizeUnitWord(word);
    }
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

function extractDocDate(file: string, raw: string): number {
  const mFile = file.match(/\b(20\d{2})[-_](\d{2})[-_](\d{2})\b/);
  if (mFile) return +`${mFile[1]}${mFile[2]}${mFile[3]}`;

  const head = raw.slice(0, 1000);
  for (const pack of ALL_PACKS) {
    const m = head.match(pack.numberFormat.headerDatePattern);
    if (m) {
      const mi = pack.monthNames[m[2].toLowerCase()];
      if (mi !== undefined) {
        const d = m[1].padStart(2, "0");
        const mo = String(mi + 1).padStart(2, "0");
        return +`${m[3]}${mo}${d}`;
      }
    }
  }

  const mYear = file.match(/\b(20\d{2})\b/);
  if (mYear) return +`${mYear[1]}0101`;

  return 20240101;
}

function tierOf(file: string): number {
  const f = file.toLowerCase();
  if (/(email|e-mail|mail|correspondence|korespond)/.test(f)) return 3;
  if (/(crm|pipeline|notes|notatk)/.test(f)) return 2;
  return 1;
}

function splitSentences(line: string, pack: LanguagePack): string[] {
  const out: string[] = [];
  let start = 0;
  const re = /[.!?](?=\s+[\p{Lu}\d"*(\[>„])/gu;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) {
    const before = line.slice(start, m.index);
    const lastWord = (before.match(/([\p{L}.]+)$/u)?.[1] || "").toLowerCase();
    const isAbbrev = pack.abbreviations.has(lastWord) || ALL_PACKS.some((p) => p.abbreviations.has(lastWord));
    if (isAbbrev || lastWord.length === 1 || /^[\s\d.*#>-]*$/.test(before)) continue;
    out.push(line.slice(start, m.index + 1));
    start = m.index + 1;
  }
  out.push(line.slice(start));
  return out.map((s) => s.trim()).filter((s) => s.length > 0);
}

// ───────────────────────────── Engine ─────────────────────────────

interface ClaimFeatures {
  lang: SupportedLang;
  content: string[];
  alts: Map<string, Set<string>>; // claim token -> matching corpus vocabulary
  weight: Map<string, number>; // IDF weight: rare terms decide, common terms barely count
  numbers: NumMention[];
  negative: boolean;
  hedged: boolean;
  parties: Set<string>;
  proper: string[]; // capitalised names/places in the claim — decisive, must be in the quoted unit
  modal: boolean;
  factual: boolean;
  roles: { subject?: "supplier" | "customer"; recipient?: "supplier" | "customer" };
  negatedTerms: Set<string>;
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
  conflictCodes: string[];
  polarityFlip: boolean;
  score: number;
  antonymConflict?: boolean;
  roleMismatch?: boolean;
  roleContra?: boolean;
  modalityMismatch?: boolean;
}

export class RedlineEngineCore {
  public lang: SupportedLang = "en";
  public sections: CorpusSection[] = [];
  public sources: SourceInfo[] = [];
  public units: Unit[] = [];
  protected sectionUnits = new Map<string, Unit[]>();
  protected vocabulary = new Set<string>();
  public parties: Array<{ name: string; tokens: string[]; names: string[] }> = [];

  constructor(lang: SupportedLang = "en") {
    this.lang = lang;
  }

  public setLanguage(lang: SupportedLang): void {
    this.lang = lang;
  }

  public tokenize(text: string): string[] {
    return getLanguagePack(this.lang).tokenize(text);
  }

  public loadDocuments(docs: Array<{ file: string; content: string }>): void {
    this.sections = [];
    this.sources = [];
    this.units = [];
    this.sectionUnits.clear();
    this.vocabulary.clear();
    this.parties = [];

    const files = [...docs].sort((a, b) => (a.file || "").localeCompare(b.file || ""));
    for (const { file, content: raw } of files) {
      const tier = tierOf(file);
      const docLang = detectLanguage(raw, this.lang);
      const docPack = getLanguagePack(docLang);
      const docDate = extractDocDate(file, raw);
      this.readParties(raw, docPack);
      const lines = raw.split("\n");
      const isSinglePage = /invoice|faktura/i.test(file);
      const headerLines = lines.filter((l) => l.trim() && l.trim() !== "---").slice(0, 2);
      const docContext = docPack.tokenize(headerLines.join(" "));

      const docSections: CorpusSection[] = [];
      let title = file.replace(/\.md$/, "");
      let buf: string[] = [];
      const flush = () => {
        const text = buf.join("\n").trim();
        if (text.length > 0) {
          const secLang = detectLanguage(text, docLang);
          docSections.push({ file, page: docSections.length + 1, title, content: text, tier, lang: secLang });
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

      for (const sec of docSections) this.buildUnits(sec, docContext, docDate);
      this.sources.push({ file, type: "markdown", pages: docSections.length, title: docSections[0]?.title || file, tier, lang: docLang });
      this.sections.push(...docSections);
    }
  }

  private buildUnits(sec: CorpusSection, docContext: string[], docDate: number): void {
    const secPack = getLanguagePack(sec.lang);
    const context = new Set([...secPack.tokenize(sec.title), ...docContext]);
    const lines = sec.content.split("\n");
    const units: Unit[] = [];
    let header: string[] | null = null;
    let headerCurrency: Currency | undefined;

    const extractUnitNegCues = (txt: string) => {
      let cleaned = txt;
      for (const p of ALL_PACKS) cleaned = cleaned.replace(p.legalFormulasRegex, " ");
      return secPack.tokenize(cleaned).filter((tok) => ALL_PACKS.some((p) => p.isNegCue(tok)));
    };

    const extractUnitRoles = (txt: string) => {
      const primary = secPack.roleLexicon.extractRoles(txt);
      if (primary.subject || primary.recipient) return primary;
      for (const p of ALL_PACKS) {
        if (p.lang === secPack.lang) continue;
        const r = p.roleLexicon.extractRoles(txt);
        if (r.subject || r.recipient) return r;
      }
      return primary;
    };

    const push = (text: string, tokenText: string, extraNumbers: NumMention[] = [], defCur?: Currency) => {
      const unitLang = detectLanguage(text, sec.lang);
      const { numbers, extraTokens } = extractNumbers(text, defCur, unitLang);
      const rawToks = secPack.tokenize(tokenText);
      const tokens = new Set([...rawToks, ...extraTokens]);
      tokens.forEach((t) => this.vocabulary.add(t));
      const textToks = secPack.tokenize(text);
      units.push({
        file: sec.file,
        page: sec.page,
        tier: sec.tier,
        lang: unitLang,
        text,
        tokens,
        context,
        numbers: [...numbers, ...extraNumbers],
        negCues: extractUnitNegCues(text),
        hedged: textToks.some((t) => ALL_PACKS.some((p) => p.isHedge(t))),
        clauses: (text.startsWith("|") ? [text] : text.split(/[,;:()—–]|\s-\s/)).map((c) => ({
          tokens: new Set(secPack.tokenize(c)),
          cues: extractUnitNegCues(c),
        })),
        docDate,
        modal: ALL_PACKS.some((p) => p.isModalText(text)),
        factual: ALL_PACKS.some((p) => p.isFactualText(text)),
        roles: extractUnitRoles(text),
      });
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || /^-{3,}$/.test(line)) continue;
      if (/^#{1,6}\s/.test(line)) {
        const cleanHeader = line.replace(/^#{1,6}\s+/, "").trim();
        const hasHeaderDate =
          /\b20\d{2}\b/.test(cleanHeader) ||
          ALL_PACKS.some((p) => p.numberFormat.headerDatePattern.test(cleanHeader));
        if (hasHeaderDate && secPack.tokenize(cleanHeader).length >= 4) {
          const cur = currenciesIn(cleanHeader);
          push(cleanHeader, cleanHeader, [], cur.size === 1 ? [...cur][0] : undefined);
        }
        continue;
      }
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
        const headerYears = header ? extractNumbers(header.join(" | "), undefined, sec.lang).numbers.filter((n) => n.kind === "year") : [];
        push(line, labelled, headerYears, defCur);
        continue;
      }
      header = null;
      for (const s of splitSentences(line, secPack)) {
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
  private readParties(raw: string, pack: LanguagePack): void {
    const roleGroups: string[][] = [
      ALL_PACKS.flatMap((p) => p.roleLexicon.supplier),
      ALL_PACKS.flatMap((p) => p.roleLexicon.customer),
    ];
    const re = /\*\*([^*\n]+)\*\*,[^\n]*?\(\s*"([^"]+)"(?:\s+or\s+"([^"]+)")?\s*\)/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(raw))) {
      const name = m[1].trim();
      if (this.parties.some((p) => p.name === name)) continue;
      const toks = new Set<string>();
      for (const part of [m[1], m[2], m[3] || ""]) {
        for (const t of pack.tokenize(part)) {
          if (!ALL_PACKS.some((p) => p.legalForms.has(t))) toks.add(t);
        }
      }
      const names = [...toks].filter((t) => !roleGroups.some((g) => g.some((r) => t.startsWith(r))));
      for (const t of [...toks]) {
        for (const g of roleGroups) {
          if (g.some((r) => t.startsWith(r))) g.forEach((r) => toks.add(r));
        }
      }
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
    const claimLang = detectLanguage(claim, this.lang);
    const claimPack = getLanguagePack(claimLang);
    let cleaned = claim;
    for (const p of ALL_PACKS) cleaned = cleaned.replace(p.legalFormulasRegex, " ");
    const toks = claimPack.tokenize(cleaned);
    const isNeg = (t: string) => ALL_PACKS.some((p) => p.isNegCue(t));
    const isStopword = (t: string) => ALL_PACKS.some((p) => p.stopwords.has(t));
    const isGeneric = (t: string) => ALL_PACKS.some((p) => p.generic.has(t));
    const isContractTerm = (t: string) => ALL_PACKS.some((p) => p.contractTerms.has(t));
    const isWeekday = (t: string) => ALL_PACKS.some((p) => p.weekdays.includes(t));

    const negative = toks.some(isNeg);
    const content = new Set<string>();
    for (const t of toks) {
      for (const p of ALL_PACKS) {
        if (p.unprefix[t]) content.add(p.unprefix[t]);
      }
      if (isNeg(t) || isStopword(t) || isGeneric(t) || currencyOf(t)) continue;
      if (this.parties.some((p) => p.tokens.includes(t))) continue; // who, not what: checked via partyMismatch
      content.add(t);
    }
    const alts = new Map<string, Set<string>>();
    for (const t of content) {
      const members = [`~${t}`];
      for (const g of CONCEPT_GROUPS) {
        if (g.some((mem) => memberMatch(mem, t, claimPack))) members.push(...g);
      }
      const hits = new Set<string>();
      for (const v of this.vocabulary) {
        if (members.some((mem) => memberMatch(mem, v, claimPack))) hits.add(v);
      }
      alts.set(t, hits);
    }
    const weight = new Map<string, number>();
    const N = this.units.length || 1;
    for (const [t, hits] of alts) {
      const df = this.units.filter((u) => [...u.tokens].some((x) => hits.has(x))).length;
      weight.set(t, Math.log(1 + N / (df + 1)));
    }
    const claimCur = currenciesIn(claim);
    const { numbers } = extractNumbers(claim, claimCur.size === 1 ? [...claimCur][0] : undefined, claimLang);
    const cased = claim.match(TOKEN_RE) || [];
    const proper = [...new Set(cased.slice(1).filter((w) => /^\p{Lu}/u.test(w)).map((w) => w.toLowerCase()))].filter(
      (t) => content.has(t) && !CANONICAL_MONTHS.includes(t) && !isWeekday(t) && !isContractTerm(t)
    );
    for (const t of content) {
      if (DECISIVE_CONCEPT_GROUPS.some((g) => g.some((m) => memberMatch(m, t, claimPack))) && !proper.includes(t)) {
        proper.push(t);
      }
    }
    const modal = ALL_PACKS.some((p) => p.isModalText(claim));
    const factual = ALL_PACKS.some((p) => p.isFactualText(claim));
    let roles = claimPack.roleLexicon.extractRoles(claim);
    if (!roles.subject && !roles.recipient) {
      for (const p of ALL_PACKS) {
        if (p.lang === claimPack.lang) continue;
        const r = p.roleLexicon.extractRoles(claim);
        if (r.subject || r.recipient) { roles = r; break; }
      }
    }
    const negatedTerms = new Set<string>();
    for (let i = 0; i < toks.length; i++) {
      if (isNeg(toks[i])) {
        for (let j = i + 1; j < Math.min(toks.length, i + 3); j++) {
          if (!isStopword(toks[j]) && !isNeg(toks[j])) {
            negatedTerms.add(toks[j]);
            break;
          }
        }
      }
    }
    return {
      lang: claimLang,
      content: [...content],
      alts,
      weight,
      numbers,
      negative,
      hedged: toks.some((t) => ALL_PACKS.some((p) => p.isHedge(t))),
      parties: this.partiesIn(toks),
      proper,
      modal,
      factual,
      roles,
      negatedTerms,
    };
  }

  private scoreUnit(f: ClaimFeatures, u: Unit): UnitScore {
    const msg = getLanguagePack(this.lang).messages;
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
    const conflictCodes: string[] = [];
    let numbersOk = true;
    const isReplacementUnit = ALL_PACKS.some((p) => p.numberFormat.replacementPattern.test(u.text));
    let replacedNum: NumMention | undefined;
    let replacementNum: NumMention | undefined;
    if (isReplacementUnit) {
      for (let i = 0; i < u.numbers.length; i++) {
        for (let j = i + 1; j < u.numbers.length; j++) {
          const a = u.numbers[i], b = u.numbers[j];
          const sameKind = a.kind === b.kind;
          const sameWord = (!a.word && !b.word) || (!!a.word && !!b.word && (this.sameConcept(a.word, b.word) || a.word === b.word));
          const sameCur = a.currency === b.currency;
          if (sameKind && sameWord && sameCur && !sameValue(a.value, b.value)) {
            replacedNum = a;
            replacementNum = b;
            break;
          }
        }
        if (replacedNum) break;
      }
    }
    const sectionYears = sectionUnits.flatMap((s) => s.numbers.filter((n) => n.kind === "year"));
    for (const n of f.numbers) {
      if (replacedNum && replacementNum && sameValue(n.value, replacedNum.value)) {
        numbersOk = false;
        conflictCodes.push(REASON_CODES.NUMBER_MISMATCH);
        conflicts.push(msg.reason_value_mismatch(fmt(n), fmt(replacementNum)));
        continue;
      }
      const same = u.numbers.filter((x) => sameValue(x.value, n.value));
      const curClash = n.currency && same.length > 0 && same.every((x) => x.currency && x.currency !== n.currency);
      const monthClash = n.word && CANONICAL_MONTHS.includes(n.word) && same.length > 0 && same.every((x) => x.word && CANONICAL_MONTHS.includes(x.word) && x.word !== n.word);
      const found = (!curClash && !monthClash && same.length > 0) ||
        (n.kind === "year" && sectionYears.some((y) => y.value === n.value));
      if (curClash) {
        numbersOk = false;
        conflictCodes.push(REASON_CODES.CURRENCY_MISMATCH);
        conflicts.push(msg.reason_currency_mismatch(fmt(n), fmt(same[0])));
        continue;
      }
      if (monthClash) {
        numbersOk = false;
        conflictCodes.push(REASON_CODES.NUMBER_MISMATCH);
        conflicts.push(msg.reason_value_mismatch(`${n.raw} ${n.word}`, `${same[0].raw} ${same[0].word}`));
        continue;
      }
      if (found) continue;
      numbersOk = false;
      const rivals = u.numbers.filter((x) => {
        if (n.kind === "money") return x.kind === "money";
        if (n.kind === "percent") return x.kind === "percent";
        if (n.kind === "year") return x.kind === "year";
        return x.kind === "plain" && !f.numbers.some((c) => sameValue(c.value, x.value)) &&
          !!n.word && !!x.word &&
          (this.sameConcept(n.word, x.word) || (CANONICAL_MONTHS.includes(n.word) && CANONICAL_MONTHS.includes(x.word)));
      });
      if (rivals.length > 0) {
        conflictCodes.push(REASON_CODES.NUMBER_MISMATCH);
        conflicts.push(msg.reason_value_mismatch(fmt(n), rivals.map(fmt).join(" / ")));
      }
    }

    const antonymConflict = checkAntonymConflict(f.content, [...u.tokens], ALL_PACKS);
    if (antonymConflict) {
      conflictCodes.push(REASON_CODES.POLARITY_MISMATCH);
      conflicts.push(msg.reason_polarity_source_neg("antonym"));
    }

    const modalityMismatch = f.factual && !f.modal && u.modal && !u.factual;

    let roleMismatch = false;
    let roleContra = false;
    if (f.roles.subject && u.roles.subject && f.roles.subject !== u.roles.subject) {
      roleMismatch = true;
      if (f.roles.recipient && u.roles.recipient && f.roles.recipient !== u.roles.recipient) {
        roleContra = true;
        conflictCodes.push(REASON_CODES.ROLE_MISMATCH);
        conflicts.push(msg.reason_role_mismatch());
      }
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
    return { unit: u, unitNegative, coverage, unitCoverage, contraCoverage, supportCoverage, supportUnitCoverage, valueConflict: conflicts.length > 0, full, matched, missing, numbersOk, conflicts, conflictCodes, polarityFlip, score, antonymConflict, roleMismatch, roleContra, modalityMismatch };
  }

  /** Two words denote the same concept (stem match or same lexicon group). */
  private sameConcept(a: string, b: string): boolean {
    const pack = getLanguagePack(this.lang);
    if (pack.stemMatch(a, b)) return true;
    return CONCEPT_GROUPS.some((g) => g.some((m) => memberMatch(m, a, pack)) && g.some((m) => memberMatch(m, b, pack)));
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
    const msg = getLanguagePack(this.lang).messages;
    const claimPack = getLanguagePack(detectLanguage(claim, this.lang));
    const allCompletedCues = ALL_PACKS.flatMap((p) => p.completedEventCues);
    const f = this.features(claim);
    if (f.content.length === 0) {
      return {
        status: "UNSUPPORTED",
        claim,
        explanation: msg.unsupported_no_terms(),
        reasonCodes: [REASON_CODES.NO_CHECKABLE_TERMS],
      };
    }
    const minFull = Math.min(2, f.content.length);
    const scored = this.units.map((u) => this.scoreUnit(f, u)).sort((a, b) => b.score - a.score);

    const supports = scored.filter((s) =>
      s.supportCoverage >= THRESHOLDS.support && s.supportUnitCoverage >= THRESHOLDS.supportUnit && s.full >= minFull &&
      s.numbersOk && s.conflicts.length === 0 && !s.polarityFlip && !this.partyMismatch(f.parties, s.unit) &&
      !s.antonymConflict && !s.roleMismatch && !s.modalityMismatch &&
      f.proper.every((t) => s.matched.includes(t) || s.matched.includes(`${t}^`)) &&
      !(s.unit.hedged && s.unit.negCues.length === 0 && !f.hedged));
    // Positive claim vs. negating source: must match the claim's core terms in the unit itself
    // and match decisive proper entities; a negative sentence about another subject cannot contradict.
    // Negative claim ("X was not signed") vs. affirmative source: only a source that would itself
    // ground "X was signed" (same figures, high coverage, not a mere proposal) contradicts it.
    const polarityContra = (s: UnitScore) => {
      if (s.antonymConflict || s.roleContra) return true;
      if (!s.polarityFlip) return false;
      if (f.negative) {
        const matchesNegated = f.negatedTerms.size === 0 || [...f.negatedTerms].some((t) => s.matched.includes(t) || s.matched.includes(`${t}^`));
        return !s.unit.hedged && s.numbersOk && s.contraCoverage >= THRESHOLDS.support && matchesNegated;
      } else {
        const claimPreds = f.content.filter((c) => allCompletedCues.some((cue) => memberMatch(cue, c, claimPack)));
        const matchesPred = claimPreds.length === 0 || claimPreds.some((p) => s.matched.includes(p) || s.matched.includes(`${p}^`));
        return matchesPred && (f.proper.length === 0 || f.proper.every((t) => s.matched.some((m) => m.startsWith(t))));
      }
    };
    const contras = scored.filter((s) =>
      s.contraCoverage >= THRESHOLDS.contradict && s.full >= minFull && (s.valueConflict || polarityContra(s)) &&
      (f.proper.length === 0 || f.proper.every((t) => s.matched.some((m) => m.startsWith(t)))));

    const pick = (arr: UnitScore[]) => arr.slice().sort((a, b) => a.unit.tier - b.unit.tier || b.unit.docDate - a.unit.docDate || b.score - a.score)[0];
    const bestS = pick(supports);
    // A contradiction overrides support only if it comes from a more authoritative source,
    // or — for negation — from an equally authoritative sentence that matches the claim better.
    // A value conflict with an equal-tier source while the exact value is confirmed elsewhere
    // just means the source mentions another figure (e.g. quarterly vs annual fee), UNLESS
    // the conflicting source has a later document date (e.g. amendment / annex).
    const overrides = (c: UnitScore) =>
      !bestS ||
      (c.unit.tier < bestS.unit.tier && c.contraCoverage >= THRESHOLDS.override * bestS.contraCoverage) ||
      (c.unit.tier === bestS.unit.tier && c.unit.docDate > bestS.unit.docDate && (c.valueConflict || c.antonymConflict) &&
        c.contraCoverage >= THRESHOLDS.contradict) ||
      (c.unit.tier === bestS.unit.tier && polarityContra(c) && c.numbersOk &&
        c.contraCoverage >= bestS.contraCoverage - THRESHOLDS.tieMargin);
    const bestC = pick(contras.filter(overrides));

    const contraReasonDetails = (c: UnitScore) => {
      const codes: string[] = [];
      const reasons: string[] = [];
      if (bestS && c.unit.tier === bestS.unit.tier && c.unit.docDate > bestS.unit.docDate) {
        codes.push(REASON_CODES.SUPERSEDED_BY_LATER_DOCUMENT);
        reasons.push(msg.reason_superseded_by_later(c.unit.file));
      }
      if (c.roleContra) {
        codes.push(REASON_CODES.ROLE_MISMATCH);
        reasons.push(msg.reason_role_mismatch());
      }
      if (polarityContra(c)) {
        codes.push(REASON_CODES.POLARITY_MISMATCH, REASON_CODES.NEGATED);
        if (f.negative) {
          reasons.push(msg.reason_polarity_claim_neg());
        } else {
          const cues = (c.unit.clauses.flatMap((k) => k.cues).slice(0, 3).join(", ")) || c.unit.negCues.slice(0, 3).join(", ");
          reasons.push(msg.reason_polarity_source_neg(cues || "source denies"));
        }
      }
      codes.push(...c.conflictCodes);
      reasons.push(...c.conflicts);
      return { codes, reasons };
    };

    if (bestC) {
      const { codes: contraCodes, reasons: contraReasons } = contraReasonDetails(bestC);
      const ev = this.toEvidence(bestC, contraReasons);
      const reasonCodes: string[] = [...new Set(contraCodes)];
      let conflicting: Evidence | undefined;
      if (bestS) {
        reasonCodes.push(REASON_CODES.HIGHER_TIER_CONFLICT);
        conflicting = this.toEvidence(bestS, [msg.reason_lower_tier_match()]);
      }
      return {
        status: "CONTRADICTED",
        claim,
        file: ev.file,
        page: ev.page,
        tier: ev.tier,
        quote: ev.quote,
        explanation: msg.contradicted_by_source({
          file: ev.file,
          page: ev.page,
          tier: ev.tier,
          reasons: ev.reasons,
          conflicting: conflicting ? { file: conflicting.file, tier: conflicting.tier } : undefined,
        }),
        reasonCodes,
        evidence: ev,
        conflicting,
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
          file: seed.unit.file,
          page: seed.unit.page,
          tier: seed.unit.tier,
          quote: ordered.map((u) => u.text).join(" […] "),
          coverage: Math.round(combo.coverage * 100) / 100,
          matched: combo.matched,
          missing: combo.missing,
          reasons: [msg.reason_compound_claim(ordered.length)],
        };
        return {
          status: "GROUNDED",
          claim,
          file: ev.file,
          page: ev.page,
          tier: ev.tier,
          quote: ev.quote,
          explanation: msg.grounded_multi({
            file: ev.file,
            page: ev.page,
            tier: ev.tier,
            count: ordered.length,
            coverage: Math.round(ev.coverage * 100),
            numbers: f.numbers.length ? f.numbers.map((n) => n.raw).join(", ") : undefined,
          }),
          reasonCodes: [REASON_CODES.COMPLEX_CLAIM_MULTI_UNIT, REASON_CODES.EXACT_MATCH],
          evidence: ev,
        };
      }
    }

    if (bestS) {
      const ev = this.toEvidence(bestS);
      const lower = pick(contras.filter((c) => c.unit.tier > bestS.unit.tier));
      const reasonCodes: string[] = [REASON_CODES.EXACT_MATCH];
      let conflicting: Evidence | undefined;
      if (lower) {
        reasonCodes.push(REASON_CODES.LOWER_TIER_CONFLICT);
        const { reasons: lowerReasons } = contraReasonDetails(lower);
        conflicting = this.toEvidence(lower, lowerReasons);
      }
      return {
        status: "GROUNDED",
        claim,
        file: ev.file,
        page: ev.page,
        tier: ev.tier,
        quote: ev.quote,
        explanation: msg.grounded_single({
          file: ev.file,
          page: ev.page,
          tier: ev.tier,
          coverage: Math.round(ev.coverage * 100),
          numbers: f.numbers.length ? f.numbers.map((n) => n.raw).join(", ") : undefined,
          conflicting: conflicting ? { file: conflicting.file, tier: conflicting.tier } : undefined,
        }),
        reasonCodes,
        evidence: ev,
        conflicting,
      };
    }

    const near = scored[0];
    const nearest = near && near.full > 0 ? this.toEvidence(near) : undefined;
    const why: string[] = [];
    const reasonCodes: string[] = [];
    if (near) {
      if (this.partyMismatch(f.parties, near.unit)) {
        reasonCodes.push(REASON_CODES.PARTY_MISMATCH);
      }
      if (near.roleMismatch) {
        reasonCodes.push(REASON_CODES.ROLE_MISMATCH);
        why.push(msg.reason_role_mismatch());
      }
      if (near.modalityMismatch) {
        reasonCodes.push(REASON_CODES.MODALITY_MISMATCH);
        why.push(msg.reason_modality_mismatch());
      }
      if (near.coverage < THRESHOLDS.support) {
        reasonCodes.push(REASON_CODES.LOW_COVERAGE);
        why.push(msg.reason_low_coverage(Math.round(near.coverage * 100), near.missing.join(", ")));
      }
      if (!near.numbersOk) {
        reasonCodes.push(REASON_CODES.NUMBERS_MISSING);
        why.push(msg.reason_numbers_missing());
      }
      if (near.polarityFlip) {
        reasonCodes.push(REASON_CODES.POLARITY_MISMATCH);
        why.push(msg.reason_polarity_mismatch());
      }
    }
    if (!nearest) {
      reasonCodes.push(REASON_CODES.NO_RELEVANT_DOCUMENTS);
    }
    return {
      status: "UNSUPPORTED",
      claim,
      explanation: nearest
        ? msg.unsupported_nearest({ file: nearest.file, page: nearest.page, why })
        : msg.unsupported_no_docs(),
      reasonCodes: reasonCodes.length > 0 ? [...new Set(reasonCodes)] : [REASON_CODES.NO_RELEVANT_DOCUMENTS],
      nearest,
    };
  }
}
