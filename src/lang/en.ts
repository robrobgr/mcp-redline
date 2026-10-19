/**
 * mcp-redline — English language pack.
 */
import { MESSAGES } from "../messages.js";
import type { LanguagePack, AntonymPair, Currency } from "./index.js";

const TOKEN_RE = /[\p{L}][\p{L}\p{N}]*(?:[-'’][\p{L}\p{N}]+)*/gu;
const B = "(?<![\\p{L}\\p{N}])";
const E = "(?![\\p{L}\\p{N}])";

const ROMAN_MAP: Record<string, string> = {
  i: "1", ii: "2", iii: "3", iv: "4", v: "5", vi: "6",
};

function tokenize(text: string): string[] {
  const lower = text.toLowerCase();
  const out: string[] = [];
  for (const t of lower.match(TOKEN_RE) || []) {
    out.push(t);
    if (t.includes("-")) {
      for (const part of t.split("-")) {
        if (/^[\p{L}]+$/u.test(part)) out.push(part);
      }
    }
  }
  const compRe = /(?<![\p{L}\p{N}])(stage|phase|annex|amendment|addendum)\s+(?:no\.?\s*)?(i{1,3}|iv|vi?|[1-9])(?![\p{L}\p{N}])/gu;
  let m: RegExpExecArray | null;
  while ((m = compRe.exec(lower))) {
    const rawHead = m[1];
    const rawIdx = m[2];
    const idx = ROMAN_MAP[rawIdx] || rawIdx;
    const head = rawHead === "stage" || rawHead === "phase" ? "etap" : "aneks";
    out.push(`${head}_${idx}`);
  }
  return out.filter((t) => t.length >= 2);
}

function isAscii(s: string): boolean {
  return /^[a-z0-9'-]+$/.test(s);
}

function stemMatch(a: string, b: string): boolean {
  if (a === b) return true;
  if (/\d/.test(a) || /\d/.test(b)) return false;
  if (a + "s" === b || b + "s" === a) return true;
  const m = Math.min(a.length, b.length);
  if (m <= 3) return false;
  let p = 0;
  while (p < m && a[p] === b[p]) p++;
  if (m === 4) return isAscii(a) && isAscii(b) ? p === 4 : p >= 3;
  if (m === 5) return p >= 4;
  return p >= Math.max(5, m - 3);
}

const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "be", "been", "being", "has", "have", "had", "may", "shall", "will", "would",
  "should", "can", "could", "must", "of", "in", "on", "at", "to", "for", "by", "with", "and", "or", "from", "as", "that", "this",
  "these", "those", "its", "it", "into", "per", "any", "all", "each", "which", "who", "whom", "also", "such", "than", "there",
  "their", "our", "we", "you", "your", "i.e", "e.g", "non", "remains", "remain", "under", "upon", "within", "via", "does", "did",
  "gbp", "eur", "pln", "euro", "every", "basis", "nr", "sp", "o.o",
]);

const GENERIC = new Set([
  "ltd", "limited", "plc", "inc", "gmbh", "supplier", "customer", "party", "parties", "company",
]);

const CONTRACT_TERMS = new Set([
  "agreement", "contract", "annex", "amendment", "schedule", "section", "clause", "stage", "phase", "article",
]);

const LEGAL_FORMS = new Set(["ltd", "limited", "plc", "inc", "gmbh", "b.v", "sas", "llc", "sp", "o.o", "z", "s.a"]);

const WEEKDAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const ABBREVIATIONS = new Set(["dr", "nr", "sp", "st", "no", "ref", "prof", "art", "vs", "inc", "e.g", "i.e", "o.o", "z"]);

const NEG_EXACT = new Set([
  "not", "no", "never", "neither", "nor", "none", "cannot", "can't", "won't", "isn't", "doesn't", "don't", "wasn't",
  "excluded", "disclaimed", "barred", "prohibited", "rejected", "reject", "deleted", "void", "inaccurate", "incorrect",
  "abandoned", "stalled", "unpaid", "unsigned", "struck",
]);

const NEG_PREFIX: string[] = [];

const UNPREFIX: Record<string, string> = { unpaid: "paid", unsigned: "signed" };

const LEGAL_FORMULAS_NOT_NEGATION = [
  `${B}(?:not|no)\\s+(?:less|more|later|earlier|fewer|greater)\\s+than${E}`,
  `${B}not\\s+(?:to\\s+)?exceed\\w*`,
  `${B}no[.:]`,
];

const LEGAL_FORMULAS_REGEX = new RegExp(LEGAL_FORMULAS_NOT_NEGATION.join("|"), "giu");

function isNegCue(t: string): boolean {
  return NEG_EXACT.has(t) || NEG_PREFIX.some((p) => t.startsWith(p));
}

function negationCues(text: string): string[] {
  const cleaned = text.replace(LEGAL_FORMULAS_REGEX, " ");
  return tokenize(cleaned).filter(isNegCue);
}

const ANTONYM_PAIRS: AntonymPair[] = [
  { pos: "exclusive", neg: "nonexclusive" },
  { pos: "revocable", neg: "irrevocable" },
];

const MODALITY_CUES = [
  "may", "can", "could", "might", "shall", "will", "must", "agrees to", "undertakes", "commits",
  "entitled", "permitted", "allowed", "proposal", "proposed", "deliberat", "consider",
];

const COMPLETED_EVENT_CUES = [
  "imposed", "terminated", "demanded", "removed", "delivered", "signed", "entered into",
  "paid", "granted", "accepted", "executed", "countersigned", "issued",
];

function isModalText(text: string): boolean {
  const lower = text.toLowerCase();
  return MODALITY_CUES.some((c) => lower.includes(c));
}

function isFactualText(text: string): boolean {
  const lower = text.toLowerCase();
  return COMPLETED_EVENT_CUES.some((c) => lower.includes(c));
}

const HEDGE_PREFIXES = ["propos", "request", "claimed", "alleg", "purport", "draft"];

function isHedge(t: string): boolean {
  return HEDGE_PREFIXES.some((p) => t.startsWith(p));
}

function extractRoles(text: string): { subject?: "supplier" | "customer"; recipient?: "supplier" | "customer" } {
  const lower = text.toLowerCase();
  let subject: "supplier" | "customer" | undefined;
  let recipient: "supplier" | "customer" | undefined;

  if (/(?<![\p{L}\p{N}])supplier(?![\p{L}\p{N}])/u.test(lower)) {
    subject = "supplier";
  } else if (/(?<![\p{L}\p{N}])(?:customer|client)(?![\p{L}\p{N}])/u.test(lower)) {
    subject = "customer";
  }

  if (/(?<![\p{L}\p{N}])to\s+(?:the\s+)?supplier(?![\p{L}\p{N}])/u.test(lower)) {
    recipient = "supplier";
  } else if (/(?<![\p{L}\p{N}])to\s+(?:the\s+)?(?:customer|client)(?![\p{L}\p{N}])/u.test(lower)) {
    recipient = "customer";
  }

  return { subject, recipient };
}

const CANONICAL_MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

const MONTH_NAMES: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

function parseNumber(s: string): number {
  let n = s.replace(/[\s\u00A0\u202F\u2009']/g, "");
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

const CURRENCY_PATTERNS: Array<[RegExp, Currency]> = [
  [/^(?:gbp|pounds?)$/iu, "GBP"],
  [/^(?:eur|euro)$/iu, "EUR"],
  [/^(?:pln)$/iu, "PLN"],
];

const LEXICON_GROUPS: Record<string, string[]> = {
  contract: ["agreement", "contract", "msa"],
  master: ["master"],
  signed: ["signed", "sign", "entered", "executed", "countersigned"],
  fee: ["fee", "price", "pricing", "cost", "rates"],
  annual: ["annual", "annually", "yearly"],
  quarter: ["quarter", "quarterly", "installments"],
  month: ["month", "monthly"],
  availability: ["availability", "uptime", "available"],
  guarantee: ["guarantee", "guaranteed", "guarantees", "commitment"],
  penalty: ["penalty", "penalties", "liquidated", "fines"],
  outage: ["outage", "failure", "unavailability", "disruption", "degradation"],
  invoice: ["invoice", "invoices", "invoiced", "invoicing", "billed", "billing"],
  increase: ["raise", "increase", "increasing", "adjust", "adjustment", "index", "indexing", "indexation"],
  inflation: ["inflation", "cpi"],
  revenue: ["revenue", "revenues", "sales"],
  profit: ["profit"],
  net: ["net"],
  gross: ["gross"],
  liability: ["liability", "liable"],
  cap: ["limit", "cap", "capped", "limited"],
  hosting: ["hosting", "hosted", "host", "processing", "processed", "storage", "stored", "compute", "maintain", "cluster", "clusters", "server", "servers"],
  germany: ["germany", "german"],
  ireland: ["ireland"],
  london: ["london"],
  england: ["england", "english"],
  wales: ["wales"],
  poland: ["polish", "poland"],
  law: ["law", "laws", "right", "rights", "entitled"],
  court: ["court", "courts"],
  jurisdiction: ["jurisdiction"],
  governed: ["governed", "construed"],
  exclusive: ["exclusive", "exclusively", "sole", "solely", "only"],
  unilateral: ["unilateral", "unilaterally"],
  annex: ["annex", "addendum", "amendment"],
  vehicle: ["vehicle", "vehicles", "trailer", "trailers"],
  fleet: ["fleet"],
  expansion: ["expansion", "expand", "extend", "extension"],
  license: ["license", "licence", "subscription"],
  data: ["=data"],
  telemetry: ["telemetry", "telematics"],
  renewal: ["renewal", "renew", "renewed", "rollover"],
  automatic: ["automatic", "automatically"],
  refund: ["refund", "refunded", "cash"],
  deadline: ["due", "deadline"],
  payment: ["payable", "payment", "payments", "paid"],
  board: ["board", "management"],
  proposal: ["proposal", "proposed", "request"],
  total: ["full", "total", "aggregate"],
  period: ["=term", "=period"],
  initial: ["initial"],
  days: ["days", "day"],
  value: ["value"],
  amount: ["amount"],
  cover: ["cover", "covers", "include", "includes", "provide", "provides"],
  allowed: ["allowed", "permitted", "permit", "permitting", "allow"],
  effect: ["effect", "force"],
  expire: ["ending", "ends", "expire", "expiration"],
  remedy: ["remedy"],
  service: ["service", "services"],
  credit: ["credit", "credits"],
  maximum: ["maximum", "max", "exceed"],
  support: ["support"],
  office: ["office"],
  warsaw: ["warsaw"],
  tax: ["=vat", "tax"],
  blocked: ["blocked", "block"],
  refrigerated: ["refrigerated", "cold"],
  gateway: ["gateway", "gateways"],
  terminate: ["=terminate", "=terminated", "=termination"],
  accept: ["accept", "accepted", "acceptance"],
  require: ["require", "required", "requirement", "mandatory"],
  notice: ["notice", "statement", "declaration"],
  deliver: ["deliver", "delivered", "delivery"],
  receive: ["accepted", "acceptance", "received"],
  issue: ["issue", "issued", "issuance"],
  definite: ["definite", "fixed"],
  month_01: ["january"],
  month_02: ["february"],
  month_03: ["march"],
  month_04: ["april"],
  month_05: ["may"],
  month_06: ["june"],
  month_07: ["july"],
  month_08: ["august"],
  month_09: ["september"],
  month_10: ["october"],
  month_11: ["november"],
  month_12: ["december"],
};

export const enPack: LanguagePack = {
  lang: "en",
  tokenize,
  stemMatch,
  stopwords: STOPWORDS,
  generic: GENERIC,
  contractTerms: CONTRACT_TERMS,
  legalForms: LEGAL_FORMS,
  weekdays: WEEKDAYS,
  abbreviations: ABBREVIATIONS,
  negExact: NEG_EXACT,
  negPrefix: NEG_PREFIX,
  unprefix: UNPREFIX,
  legalFormulasNotNegation: LEGAL_FORMULAS_NOT_NEGATION,
  legalFormulasRegex: LEGAL_FORMULAS_REGEX,
  isNegCue,
  negationCues,
  antonymPairs: ANTONYM_PAIRS,
  modalityCues: MODALITY_CUES,
  completedEventCues: COMPLETED_EVENT_CUES,
  isModalText,
  isFactualText,
  hedgePrefixes: HEDGE_PREFIXES,
  isHedge,
  roleLexicon: {
    supplier: ["supplier", "vendor", "provider", "licensor"],
    customer: ["customer", "client", "licensee", "buyer"],
    extractRoles,
  },
  monthNames: MONTH_NAMES,
  canonicalMonths: CANONICAL_MONTHS,
  numberFormat: {
    parseNumber,
    currencyPatterns: CURRENCY_PATTERNS,
    millionPattern: /^\s*million(?![\p{L}])/iu,
    percentWordPattern: /^\s*(?:\*\*)?\s*percent/iu,
    netWordPattern: /^(?:million|net)$/iu,
    clauseRefWords: ["section", "sections", "sec\\.?", "article", "point", "§", "schedule\\s+[a-z]"],
    clauseConjunctions: ["and", ","],
    headerDatePattern: /(?:dated\s+|as\s+of\s+)(\d{1,2})\s+([a-z]+)\s+(20\d{2})/iu,
    replacementPattern: /(?:replaces|is\s+replaced\s+(?:by|with)|supersedes)/i,
    normalizeUnitWord: (word) => word,
  },
  lexiconGroups: LEXICON_GROUPS,
  decisiveConceptIds: ["germany", "ireland", "london", "england", "wales", "poland", "warsaw"],
  messages: MESSAGES.en,
};
