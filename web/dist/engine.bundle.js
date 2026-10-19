"use strict";
var RedlineBundle = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/browser.ts
  var browser_exports = {};
  __export(browser_exports, {
    RedlineEngine: () => RedlineEngineCore
  });

  // src/messages.ts
  var REASON_CODES = {
    NO_CHECKABLE_TERMS: "NO_CHECKABLE_TERMS",
    NO_RELEVANT_DOCUMENTS: "NO_RELEVANT_DOCUMENTS",
    LOW_COVERAGE: "LOW_COVERAGE",
    NUMBERS_MISSING: "NUMBERS_MISSING",
    NUMBER_MISMATCH: "NUMBER_MISMATCH",
    CURRENCY_MISMATCH: "CURRENCY_MISMATCH",
    POLARITY_MISMATCH: "POLARITY_MISMATCH",
    NEGATED: "NEGATED",
    PARTY_MISMATCH: "PARTY_MISMATCH",
    ROLE_MISMATCH: "ROLE_MISMATCH",
    MODALITY_MISMATCH: "MODALITY_MISMATCH",
    SUPERSEDED_BY_LATER_DOCUMENT: "SUPERSEDED_BY_LATER_DOCUMENT",
    HIGHER_TIER_OVERRIDE: "HIGHER_TIER_OVERRIDE",
    HIGHER_TIER_CONFLICT: "HIGHER_TIER_CONFLICT",
    LOWER_TIER_CONFLICT: "LOWER_TIER_CONFLICT",
    COMPLEX_CLAIM_MULTI_UNIT: "COMPLEX_CLAIM_MULTI_UNIT",
    EXACT_MATCH: "EXACT_MATCH"
  };
  var MESSAGES = {
    en: {
      unsupported_no_terms: () => "Unsupported: claim does not contain concepts that can be checked in the corpus.",
      unsupported_no_docs: () => "Unsupported by corpus: no document refers to this claim.",
      unsupported_nearest: ({ file, page, why }) => `Insufficient evidential support. The nearest fragment (${file}, section ${page}) is inconclusive: ${why.join("; ")}.`,
      contradicted_by_source: ({ file, page, tier, reasons, conflicting }) => `Contradicted by source ${file} (section ${page}, Tier ${tier}): ${reasons.join("; ")}.` + (conflicting ? ` A matching fragment exists in ${conflicting.file} (Tier ${conflicting.tier}), but an equal or higher tier source contradicts it.` : ""),
      grounded_single: ({ file, page, tier, coverage, numbers, conflicting }) => `Grounded by verbatim fragment: ${file} (section ${page}, Tier ${tier}); concept coverage ${coverage}%` + (numbers ? `, numbers match (${numbers})` : "") + "." + (conflicting ? ` Note: lower tier source (${conflicting.file}, Tier ${conflicting.tier}) claims otherwise.` : ""),
      grounded_multi: ({ file, page, tier, count, coverage, numbers }) => `Grounded by ${count} verbatim fragments: ${file} (section ${page}, Tier ${tier}); coverage ${coverage}%` + (numbers ? `, numbers match (${numbers})` : "") + ".",
      reason_polarity_claim_neg: () => "polarity: claim denies, source affirms",
      reason_polarity_source_neg: (cues) => `polarity: source denies/rejects (${cues})`,
      reason_currency_mismatch: (claim, source) => `currency: claim ${claim}, source ${source}`,
      reason_value_mismatch: (claim, source) => `value: claim ${claim}, source ${source}`,
      reason_low_coverage: (pct, missing) => `concept coverage too low (${pct}%, missing: ${missing || "\u2014"})`,
      reason_numbers_missing: () => "numbers from claim do not appear in this fragment",
      reason_polarity_mismatch: () => "polarity mismatch",
      reason_compound_claim: (count) => `compound claim: grounded by ${count} fragments of the same section`,
      reason_lower_tier_match: () => "matches source of lower or equal tier",
      reason_lower_tier_claims_otherwise: (file, tier) => `lower tier source (${file}, Tier ${tier}) claims otherwise`,
      reason_modality_mismatch: () => "modality mismatch: source expresses right, obligation, deliberation or future intent, but does not confirm factual occurrence",
      reason_superseded_by_later: (file) => `superseded by later amendment or agreement (${file})`,
      reason_role_mismatch: () => "role mismatch: parties or roles swapped between claim and source"
    },
    pl: {
      unsupported_no_terms: () => "Brak oparcia: twierdzenie nie zawiera poj\u0119\u0107, kt\xF3re mo\u017Cna sprawdzi\u0107 w korpusie.",
      unsupported_no_docs: () => "Brak oparcia w korpusie: \u017Caden dokument nie odnosi si\u0119 do tego twierdzenia.",
      unsupported_nearest: ({ file, page, why }) => `Brak wystarczaj\u0105cego oparcia. Najbli\u017Cszy fragment (${file}, sekcja ${page}) nie rozstrzyga: ${why.join("; ")}.`,
      contradicted_by_source: ({ file, page, tier, reasons, conflicting }) => `Sprzeczne ze \u017Ar\xF3d\u0142em ${file} (sekcja ${page}, Tier ${tier}): ${reasons.join("; ")}.` + (conflicting ? ` Zgodny fragment istnieje w ${conflicting.file} (Tier ${conflicting.tier}), ale \u017Ar\xF3d\u0142o o wy\u017Cszej lub r\xF3wnej randze mu przeczy.` : ""),
      grounded_single: ({ file, page, tier, coverage, numbers, conflicting }) => `Potwierdzone dos\u0142ownym fragmentem: ${file} (sekcja ${page}, Tier ${tier}); pokrycie poj\u0119\u0107 ${coverage}%` + (numbers ? `, liczby zgodne (${numbers})` : "") + "." + (conflicting ? ` Uwaga: \u017Ar\xF3d\u0142o o ni\u017Cszej randze (${conflicting.file}, Tier ${conflicting.tier}) twierdzi inaczej.` : ""),
      grounded_multi: ({ file, page, tier, count, coverage, numbers }) => `Potwierdzone ${count} dos\u0142ownymi fragmentami: ${file} (sekcja ${page}, Tier ${tier}); pokrycie ${coverage}%` + (numbers ? `, liczby zgodne (${numbers})` : "") + ".",
      reason_polarity_claim_neg: () => "polaryzacja: twierdzenie zaprzecza, \u017Ar\xF3d\u0142o twierdzi",
      reason_polarity_source_neg: (cues) => `polaryzacja: \u017Ar\xF3d\u0142o zaprzecza/odrzuca (${cues})`,
      reason_currency_mismatch: (claim, source) => `waluta: twierdzenie ${claim}, \u017Ar\xF3d\u0142o ${source}`,
      reason_value_mismatch: (claim, source) => `warto\u015B\u0107: twierdzenie ${claim}, \u017Ar\xF3d\u0142o ${source}`,
      reason_low_coverage: (pct, missing) => `za niskie pokrycie poj\u0119\u0107 (${pct}%, brakuje: ${missing || "\u2014"})`,
      reason_numbers_missing: () => "liczby z twierdzenia nie wyst\u0119puj\u0105 w tym fragmencie",
      reason_polarity_mismatch: () => "niezgodna polaryzacja",
      reason_compound_claim: (count) => `twierdzenie z\u0142o\u017Cone: potwierdzone ${count} fragmentami tej samej sekcji`,
      reason_lower_tier_match: () => "zgodne ze \u017Ar\xF3d\u0142em o ni\u017Cszej lub r\xF3wnej randze",
      reason_lower_tier_claims_otherwise: (file, tier) => `\u017Ar\xF3d\u0142o o ni\u017Cszej randze (${file}, Tier ${tier}) twierdzi inaczej`,
      reason_modality_mismatch: () => "niezgodno\u015B\u0107 modalno\u015Bci: \u017Ar\xF3d\u0142o wyra\u017Ca prawo, zobowi\u0105zanie, zamiar lub rozwa\u017Canie, ale nie potwierdza zaistnienia faktu",
      reason_superseded_by_later: (file) => `zast\u0105pione przez p\xF3\u017Aniejszy aneks lub dokument (${file})`,
      reason_role_mismatch: () => "niezgodno\u015B\u0107 r\xF3l stron: role podmiot\xF3w zamienione mi\u0119dzy twierdzeniem a \u017Ar\xF3d\u0142em"
    }
  };

  // src/lang/en.ts
  var TOKEN_RE = /[\p{L}][\p{L}\p{N}]*(?:[-'’][\p{L}\p{N}]+)*/gu;
  var B = "(?<![\\p{L}\\p{N}])";
  var E = "(?![\\p{L}\\p{N}])";
  function tokenize(text) {
    const out = [];
    for (const t of text.toLowerCase().match(TOKEN_RE) || []) {
      out.push(t);
      if (t.includes("-")) {
        for (const part of t.split("-")) {
          if (/^[\p{L}]+$/u.test(part)) out.push(part);
        }
      }
    }
    return out.filter((t) => t.length >= 2);
  }
  function isAscii(s) {
    return /^[a-z0-9'-]+$/.test(s);
  }
  function stemMatch(a, b) {
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
  var STOPWORDS = /* @__PURE__ */ new Set([
    "the",
    "a",
    "an",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "has",
    "have",
    "had",
    "may",
    "shall",
    "will",
    "would",
    "should",
    "can",
    "could",
    "must",
    "of",
    "in",
    "on",
    "at",
    "to",
    "for",
    "by",
    "with",
    "and",
    "or",
    "from",
    "as",
    "that",
    "this",
    "these",
    "those",
    "its",
    "it",
    "into",
    "per",
    "any",
    "all",
    "each",
    "which",
    "who",
    "whom",
    "also",
    "such",
    "than",
    "there",
    "their",
    "our",
    "we",
    "you",
    "your",
    "i.e",
    "e.g",
    "non",
    "remains",
    "remain",
    "under",
    "upon",
    "within",
    "via",
    "does",
    "did",
    "gbp",
    "eur",
    "pln",
    "euro",
    "every",
    "basis",
    "nr",
    "sp",
    "o.o"
  ]);
  var GENERIC = /* @__PURE__ */ new Set([
    "ltd",
    "limited",
    "plc",
    "inc",
    "gmbh",
    "supplier",
    "customer",
    "party",
    "parties",
    "company"
  ]);
  var CONTRACT_TERMS = /* @__PURE__ */ new Set([
    "agreement",
    "contract",
    "annex",
    "amendment",
    "schedule",
    "section",
    "clause",
    "stage",
    "phase",
    "article"
  ]);
  var LEGAL_FORMS = /* @__PURE__ */ new Set(["ltd", "limited", "plc", "inc", "gmbh", "b.v", "sas", "llc", "sp", "o.o", "z", "s.a"]);
  var WEEKDAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  var ABBREVIATIONS = /* @__PURE__ */ new Set(["dr", "nr", "sp", "st", "no", "ref", "prof", "art", "vs", "inc", "e.g", "i.e", "o.o", "z"]);
  var NEG_EXACT = /* @__PURE__ */ new Set([
    "not",
    "no",
    "never",
    "neither",
    "nor",
    "none",
    "cannot",
    "can't",
    "won't",
    "isn't",
    "doesn't",
    "don't",
    "wasn't",
    "excluded",
    "disclaimed",
    "barred",
    "prohibited",
    "rejected",
    "reject",
    "deleted",
    "void",
    "inaccurate",
    "incorrect",
    "abandoned",
    "stalled",
    "unpaid",
    "unsigned",
    "struck"
  ]);
  var NEG_PREFIX = [];
  var UNPREFIX = { unpaid: "paid", unsigned: "signed" };
  var LEGAL_FORMULAS_NOT_NEGATION = [
    `${B}(?:not|no)\\s+(?:less|more|later|earlier|fewer|greater)\\s+than${E}`,
    `${B}not\\s+(?:to\\s+)?exceed\\w*`,
    `${B}no[.:]`
  ];
  var LEGAL_FORMULAS_REGEX = new RegExp(LEGAL_FORMULAS_NOT_NEGATION.join("|"), "giu");
  function isNegCue(t) {
    return NEG_EXACT.has(t) || NEG_PREFIX.some((p) => t.startsWith(p));
  }
  function negationCues(text) {
    const cleaned = text.replace(LEGAL_FORMULAS_REGEX, " ");
    return tokenize(cleaned).filter(isNegCue);
  }
  var ANTONYM_PAIRS = [
    { pos: "exclusive", neg: "nonexclusive" },
    { pos: "revocable", neg: "irrevocable" }
  ];
  var MODALITY_CUES = [
    "may",
    "can",
    "could",
    "might",
    "shall",
    "will",
    "must",
    "agrees to",
    "undertakes",
    "commits",
    "entitled",
    "permitted",
    "allowed",
    "proposal",
    "proposed",
    "deliberat",
    "consider"
  ];
  var COMPLETED_EVENT_CUES = [
    "imposed",
    "terminated",
    "demanded",
    "removed",
    "delivered",
    "signed",
    "entered into",
    "paid",
    "granted",
    "accepted",
    "executed",
    "countersigned",
    "issued"
  ];
  function isModalText(text) {
    const lower = text.toLowerCase();
    return MODALITY_CUES.some((c) => lower.includes(c));
  }
  function isFactualText(text) {
    const lower = text.toLowerCase();
    return COMPLETED_EVENT_CUES.some((c) => lower.includes(c));
  }
  var HEDGE_PREFIXES = ["propos", "request", "claimed", "alleg", "purport", "draft"];
  function isHedge(t) {
    return HEDGE_PREFIXES.some((p) => t.startsWith(p));
  }
  function extractRoles(text) {
    const lower = text.toLowerCase();
    let subject;
    let recipient;
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
  var CANONICAL_MONTHS = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
  ];
  var MONTH_NAMES = {
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
    december: 11
  };
  function parseNumber(s) {
    let n = s.replace(/[\s\u00A0]/g, "");
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
  var CURRENCY_PATTERNS = [
    [/^(?:gbp|pounds?)$/iu, "GBP"],
    [/^(?:eur|euro)$/iu, "EUR"],
    [/^(?:pln)$/iu, "PLN"]
  ];
  var LEXICON_GROUPS = {
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
    month_12: ["december"]
  };
  var enPack = {
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
      extractRoles
    },
    monthNames: MONTH_NAMES,
    canonicalMonths: CANONICAL_MONTHS,
    numberFormat: {
      parseNumber,
      currencyPatterns: CURRENCY_PATTERNS,
      millionPattern: /^\s*million(?![\p{L}])/iu,
      percentWordPattern: /^\s*(?:\*\*)?\s*percent/iu,
      netWordPattern: /^(?:million|net)$/iu,
      clauseRefWords: ["section", "sections", "sec\\.?", "article", "point", "\xA7", "schedule\\s+[a-z]"],
      clauseConjunctions: ["and", ","],
      headerDatePattern: /(?:dated\s+|as\s+of\s+)(\d{1,2})\s+([a-z]+)\s+(20\d{2})/iu,
      replacementPattern: /(?:replaces|is\s+replaced\s+(?:by|with)|supersedes)/i,
      normalizeUnitWord: (word) => word
    },
    lexiconGroups: LEXICON_GROUPS,
    decisiveConceptIds: ["germany", "ireland", "london", "england", "wales", "poland", "warsaw"],
    messages: MESSAGES.en
  };

  // src/lang/pl.ts
  var TOKEN_RE2 = /[\p{L}][\p{L}\p{N}]*(?:[-'’][\p{L}\p{N}]+)*/gu;
  var B2 = "(?<![\\p{L}\\p{N}])";
  var E2 = "(?![\\p{L}\\p{N}])";
  function tokenize2(text) {
    const out = [];
    for (const t of text.toLowerCase().match(TOKEN_RE2) || []) {
      out.push(t);
      if (t.includes("-")) {
        for (const part of t.split("-")) {
          if (/^[\p{L}]+$/u.test(part)) out.push(part);
        }
      }
    }
    return out.filter((t) => t.length >= 2);
  }
  function isAscii2(s) {
    return /^[a-z0-9'-]+$/.test(s);
  }
  function stemMatch2(a, b) {
    if (a === b) return true;
    if (a + "s" === b || b + "s" === a) return true;
    const m = Math.min(a.length, b.length);
    if (m <= 3) return false;
    let p = 0;
    while (p < m && a[p] === b[p]) p++;
    if (m === 4) return isAscii2(a) && isAscii2(b) ? p === 4 : p >= 3;
    if (m === 5) return p >= 4;
    return p >= Math.max(5, m - 3);
  }
  var STOPWORDS2 = /* @__PURE__ */ new Set([
    "w",
    "we",
    "z",
    "ze",
    "za",
    "do",
    "od",
    "po",
    "o",
    "i",
    "a",
    "oraz",
    "lub",
    "na",
    "nad",
    "pod",
    "przy",
    "przez",
    "dla",
    "jako",
    "si\u0119",
    "to",
    "ten",
    "ta",
    "te",
    "tego",
    "tej",
    "tym",
    "kt\xF3ry",
    "kt\xF3ra",
    "kt\xF3re",
    "kt\xF3rych",
    "kt\xF3rym",
    "\u017Ce",
    "czy",
    "jak",
    "jego",
    "jej",
    "ich",
    "r",
    "rok",
    "roku",
    "wynosi",
    "wyni\xF3s\u0142",
    "wynios\u0142a",
    "wynios\u0142o",
    "wynios\u0142y",
    "wynosz\u0105",
    "by\u0142a",
    "by\u0142",
    "by\u0142o",
    "by\u0142y",
    "zosta\u0142a",
    "zosta\u0142",
    "zosta\u0142o",
    "zosta\u0142y",
    "jest",
    "s\u0105",
    "ma",
    "maj\u0105",
    "mia\u0142",
    "mia\u0142a",
    "wszystkie",
    "wszystkich",
    "te\u017C",
    "tak\u017Ce",
    "co",
    "tak",
    "nr",
    "sp",
    "o.o",
    "ramach",
    "tytu\u0142u",
    "wysoko\u015Bci",
    "terenie",
    "mi\u0119dzy",
    "dnia",
    "obrotowy",
    "gbp",
    "eur",
    "pln",
    "z\u0142",
    "euro",
    "ka\u017Cdy",
    "ka\u017Cda",
    "ka\u017Cde",
    "podstawie"
  ]);
  var GENERIC2 = /* @__PURE__ */ new Set([
    "sp\xF3\u0142ka",
    "sp\xF3\u0142ki",
    "dostawca",
    "dostawcy",
    "dostawc\u0119",
    "dostawc\u0105",
    "zamawiaj\u0105cy",
    "zamawiaj\u0105cego",
    "zamawiaj\u0105cemu",
    "zamawiaj\u0105cym",
    "zamawiaj\u0105cych",
    "klient",
    "klienta",
    "klientowi",
    "firma",
    "strona",
    "strony",
    "ltd",
    "limited",
    "plc",
    "inc",
    "gmbh"
  ]);
  var CONTRACT_TERMS2 = /* @__PURE__ */ new Set([
    "umowa",
    "umowy",
    "umowie",
    "umow\u0119",
    "umow\u0105",
    "aneks",
    "aneksu",
    "aneksem",
    "aneksie",
    "za\u0142\u0105cznik",
    "za\u0142\u0105cznika",
    "za\u0142\u0105czniku",
    "za\u0142\u0105cznikiem",
    "protok\xF3\u0142",
    "protoko\u0142u",
    "protoko\u0142em",
    "protokole",
    "etap",
    "etapu",
    "etapem",
    "etapie",
    "etapy",
    "etap\xF3w",
    "harmonogram",
    "harmonogramu",
    "harmonogramem",
    "art",
    "artyku\u0142",
    "artyku\u0142u",
    "paragraf",
    "ust\u0119p",
    "punkt",
    "sekcja"
  ]);
  var LEGAL_FORMS2 = /* @__PURE__ */ new Set(["sp", "o.o", "z", "s.a", "ltd", "limited", "plc", "inc", "gmbh", "b.v", "sas", "llc"]);
  var WEEKDAYS2 = ["poniedzia\u0142ek", "wtorek", "\u015Broda", "czwartek", "pi\u0105tek", "sobota", "niedziela"];
  var ABBREVIATIONS2 = /* @__PURE__ */ new Set(["ul", "mec", "dr", "nr", "sp", "r", "tj", "np", "ok", "ref", "al", "prof", "pkt", "ust", "art", "o.o", "z"]);
  var NEG_EXACT2 = /* @__PURE__ */ new Set([
    "nie",
    "nigdy",
    "brak",
    "braku",
    "\u017Caden",
    "\u017Cadna",
    "\u017Cadne",
    "\u017Cadnych",
    "\u017Cadnego",
    "\u017Cadnej"
  ]);
  var NEG_PREFIX2 = [
    "odrzuc",
    "wykre\u015Bl",
    "zakaz",
    "niewa\u017Cn",
    "bezpodstawn",
    "wy\u0142\u0105czy",
    "wy\u0142\u0105czon",
    "nieprawdziw",
    "niedopuszczaln",
    "wykluczon"
  ];
  var UNPREFIX2 = {};
  var LEGAL_FORMULAS_NOT_NEGATION2 = [
    `${B2}nie\\s+(?:mniej|wi\u0119cej|p\xF3\u017Aniej|wcze\u015Bniej)\\s+ni\u017C${E2}`,
    `${B2}nie\\s+przekracz\\p{L}*`,
    `${B2}pod\\s+rygorem\\s+niewa\u017Cno\\p{L}*`,
    `${B2}(?:po\\s+|oraz\\s+|i\\s+)?bezskuteczn\\p{L}*\\s+up\u0142yw\\p{L}*`
  ];
  var LEGAL_FORMULAS_REGEX2 = new RegExp(LEGAL_FORMULAS_NOT_NEGATION2.join("|"), "giu");
  function isNegCue2(t) {
    return NEG_EXACT2.has(t) || NEG_PREFIX2.some((p) => t.startsWith(p));
  }
  function negationCues2(text) {
    const cleaned = text.replace(LEGAL_FORMULAS_REGEX2, " ");
    return tokenize2(cleaned).filter(isNegCue2);
  }
  var ANTONYM_PAIRS2 = [
    { pos: "wy\u0142\u0105czn", neg: "niewy\u0142\u0105czn" },
    { pos: "okre\u015Blon", neg: "nieoznaczon", alts: ["nieokre\u015Blon"] },
    { pos: "oznaczon", neg: "nieoznaczon" },
    { pos: "istotn", neg: "nieistotn" },
    { pos: "odp\u0142atn", neg: "nieodp\u0142atn" },
    { pos: "zbywaln", neg: "niezbywaln" },
    { pos: "ograniczon", neg: "nieograniczon" }
  ];
  var MODALITY_PREFIX_CUES = [
    "uprawnion",
    "dopuszcz",
    "zezwala",
    "zobowi\u0105z",
    "rozwa\u017Ca"
  ];
  var MODALITY_EXACT_OR_PHRASE_CUES = [
    "mo\u017Ce",
    "mog\u0105",
    "ma prawo",
    "maj\u0105 prawo",
    "przys\u0142uguje",
    "powinien",
    "powinna",
    "powinni",
    "musi",
    "musz\u0105",
    "ma obowi\u0105zek",
    "maj\u0105 obowi\u0105zek",
    "b\u0119dzie",
    "b\u0119d\u0105",
    "zostanie",
    "zostan\u0105",
    "jest p\u0142atne",
    "jest p\u0142atny",
    "jest p\u0142atna",
    "s\u0105 p\u0142atne",
    "p\u0142atne w terminie",
    "p\u0142atny w terminie",
    "p\u0142atna w terminie",
    "termin p\u0142atno\u015Bci",
    "podlega zap\u0142acie",
    "usunie",
    "usun\u0105",
    "zawiadomi",
    "zawiadomi\u0105",
    "powiadomi",
    "powiadomi\u0105",
    "dokona",
    "dokonaj\u0105",
    "zg\u0142osi",
    "zg\u0142osz\u0105",
    "zap\u0142aci",
    "zap\u0142ac\u0105",
    "wystawi",
    "wystawi\u0105",
    "dor\u0119czy",
    "dor\u0119cz\u0105",
    "przeka\u017Ce",
    "przeka\u017C\u0105",
    "zrealizuje",
    "zrealizuj\u0105",
    "zapewni",
    "zapewni\u0105",
    "udost\u0119pni",
    "udost\u0119pni\u0105",
    "zwr\xF3ci",
    "zwr\xF3c\u0105",
    "wyp\u0142aci",
    "wyp\u0142ac\u0105",
    "wyznaczy",
    "do decyzji",
    "planuje",
    "zamierza"
  ];
  var MODALITY_REGEX = new RegExp(
    [
      ...MODALITY_PREFIX_CUES.map((p) => `${B2}${p}\\p{L}*${E2}`),
      ...MODALITY_EXACT_OR_PHRASE_CUES.map((p) => `${B2}${p.replace(/\s+/g, "\\s+")}${E2}`)
    ].join("|"),
    "iu"
  );
  var MODALITY_CUES2 = [...MODALITY_PREFIX_CUES, ...MODALITY_EXACT_OR_PHRASE_CUES];
  var COMPLETED_EVENT_CUES2 = [
    "naliczy\u0142",
    "naliczy\u0142a",
    "naliczono",
    "rozwi\u0105za\u0142",
    "rozwi\u0105za\u0142a",
    "rozwi\u0105zano",
    "wypowiedzia\u0142",
    "wypowiedzia\u0142a",
    "wypowiedziano",
    "usun\u0105\u0142",
    "usun\u0119\u0142a",
    "usuni\u0119to",
    "za\u017C\u0105da\u0142",
    "za\u017C\u0105da\u0142a",
    "za\u017C\u0105dano",
    "wprowadzi\u0142",
    "wprowadzi\u0142a",
    "wprowadzono",
    "podpisa\u0142",
    "podpisa\u0142a",
    "podpisano",
    "dor\u0119czy\u0142",
    "dor\u0119czy\u0142a",
    "dor\u0119czono",
    "odebra\u0142",
    "odebra\u0142a",
    "odebrano",
    "odebrany",
    "odebrana",
    "odebrane",
    "zap\u0142aci\u0142",
    "zap\u0142aci\u0142a",
    "zap\u0142acono",
    "na\u0142o\u017Cy\u0142",
    "na\u0142o\u017Cy\u0142a",
    "na\u0142o\u017Cono",
    "przyzna\u0142",
    "przyzna\u0142a",
    "przyznano",
    "zaakceptowa\u0142",
    "zaakceptowa\u0142a",
    "zaakceptowano",
    "wykre\u015Blono",
    "stwierdzono",
    "wystawiono",
    "wystawiona",
    "wystawiony",
    "zas\u0105dzono",
    "wys\u0142ano",
    "zg\u0142osi\u0142",
    "zg\u0142osi\u0142a",
    "zg\u0142oszono",
    "udzieli\u0142",
    "udzielono"
  ];
  var IMPERSONAL_NON_VERBS = /* @__PURE__ */ new Set([
    "jedno",
    "okno",
    "sukno",
    "w\u0142\xF3kno",
    "pi\u0119kno",
    "rzekomo",
    "wolno",
    "wiadomo",
    "osobno",
    "r\xF3wno",
    "pewno",
    "dawno",
    "trudno",
    "p\xF3\u017Ano",
    "\u017Cyto",
    "sito",
    "myto",
    "z\u0142oto",
    "b\u0142oto"
  ]);
  var PAST_TENSE_EXCLUSIONS = /* @__PURE__ */ new Set([
    "by\u0142",
    "by\u0142a",
    "by\u0142o",
    "byli",
    "by\u0142y",
    "zosta\u0142",
    "zosta\u0142a",
    "zosta\u0142o",
    "zostali",
    "zosta\u0142y",
    "mia\u0142",
    "mia\u0142a",
    "mia\u0142o",
    "mieli",
    "mia\u0142y",
    "m\xF3g\u0142",
    "mog\u0142a",
    "mog\u0142o",
    "mogli",
    "mog\u0142y",
    "musia\u0142",
    "musia\u0142a",
    "musia\u0142o",
    "musieli",
    "musia\u0142y",
    "wyni\xF3s\u0142",
    "wynios\u0142a",
    "wynios\u0142o",
    "wynios\u0142y",
    "si\u0142a",
    "skala",
    "wola",
    "rola",
    "kontrola",
    "szko\u0142a",
    "regu\u0142a",
    "formu\u0142a",
    "klauzula",
    "uchwa\u0142a",
    "siedziba",
    "kwarta\u0142",
    "protok\xF3\u0142",
    "artyku\u0142",
    "tytu\u0142",
    "kapita\u0142",
    "udzia\u0142",
    "oddzia\u0142",
    "podzia\u0142",
    "materia\u0142",
    "orygina\u0142",
    "zesp\xF3\u0142",
    "sygna\u0142",
    "szczeg\xF3\u0142",
    "og\xF3\u0142",
    "kana\u0142",
    "fina\u0142",
    "idea\u0142",
    "portal",
    "lokal",
    "szpital",
    "ca\u0142a",
    "ca\u0142o",
    "ma\u0142a",
    "ma\u0142o",
    "sta\u0142a",
    "bia\u0142a"
  ]);
  function isModalText2(text) {
    return MODALITY_REGEX.test(text);
  }
  function isFactualText2(text) {
    const lower = text.toLowerCase();
    if (COMPLETED_EVENT_CUES2.some((c) => lower.includes(c))) return true;
    if (/(?<![\p{L}\p{N}])(?:został|została|zostało|zostały)\s+(?:[\p{L}]+\s+)?[\p{L}]{3,}(?:n[yiae]|t[yiae])(?![\p{L}\p{N}])/iu.test(lower)) {
      return true;
    }
    if (/(?<![\p{L}\p{N}])[\p{L}]{3,}(?:n[yiae]|t[yiae])\s+(?:został|została|zostało|zostały)(?![\p{L}\p{N}])/iu.test(lower)) {
      return true;
    }
    const words = lower.match(/[\p{L}]+/gu) || [];
    for (const w of words) {
      if (w.length >= 5 && /(?:ano|ono|iono|ęto|yto|ito)$/u.test(w) && !IMPERSONAL_NON_VERBS.has(w)) {
        return true;
      }
      if (w.length >= 4 && /(?:ał|ała|ało|ali|ił|iła|iło|ili|ył|yła|yło|yli|ął|ęła|ęło|ęli|edł|zła|zło|zli)$/u.test(w) && !PAST_TENSE_EXCLUSIONS.has(w) && !w.endsWith("by")) {
        return true;
      }
    }
    if (/(?<![\p{L}\p{N}])dochodzi(?![\p{L}\p{N}])/u.test(lower) && !/(?<![\p{L}\p{N}])(?:może|ma\s+prawo)\s+dochodzić(?![\p{L}\p{N}])/u.test(lower)) {
      return true;
    }
    return false;
  }
  var HEDGE_PREFIXES2 = ["zawnioskow", "wnios", "propozyc", "proponu", "twierdz", "rzekom", "domag", "\u017C\u0105da", "\u017C\u0105dan"];
  function isHedge2(t) {
    return HEDGE_PREFIXES2.some((p) => t.startsWith(p));
  }
  function extractRoles2(text) {
    const lower = text.toLowerCase();
    let subject;
    let recipient;
    if (/(?<![\p{L}\p{N}])(?:to\s+)?dostawca(?![\p{L}\p{N}])/u.test(lower)) {
      subject = "supplier";
    } else if (/(?<![\p{L}\p{N}])(?:to\s+)?(?:zamawiający|klient)(?![\p{L}\p{N}])/u.test(lower)) {
      subject = "customer";
    }
    if (/(?<![\p{L}\p{N}])(?:udziela\s+)?dostawcy(?![\p{L}\p{N}])/u.test(lower)) {
      recipient = "supplier";
    } else if (/(?<![\p{L}\p{N}])(?:udziela\s+)?(?:zamawiającemu|klientowi)(?![\p{L}\p{N}])/u.test(lower)) {
      recipient = "customer";
    }
    return { subject, recipient };
  }
  var CANONICAL_MONTHS2 = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
  ];
  var MONTH_NAMES2 = {
    stycznia: 0,
    stycze\u0144: 0,
    lutego: 1,
    luty: 1,
    marca: 2,
    marzec: 2,
    kwietnia: 3,
    kwiecie\u0144: 3,
    maja: 4,
    maj: 4,
    czerwca: 5,
    czerwiec: 5,
    lipca: 6,
    lipiec: 6,
    sierpnia: 7,
    sierpie\u0144: 7,
    wrze\u015Bnia: 8,
    wrzesie\u0144: 8,
    pa\u017Adziernika: 9,
    pa\u017Adziernik: 9,
    listopada: 10,
    listopad: 10,
    grudnia: 11,
    grudzie\u0144: 11
  };
  function parseNumber2(s) {
    let n = s.replace(/[\s\u00A0]/g, "");
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
  var CURRENCY_PATTERNS2 = [
    [/^(?:gbp|funt\p{L}*)$/iu, "GBP"],
    [/^(?:eur|euro)$/iu, "EUR"],
    [/^(?:pln|zł|złotych)$/iu, "PLN"]
  ];
  var LEXICON_GROUPS2 = {
    contract: ["umow", "kontrakt", "msa"],
    master: ["ramow"],
    signed: ["podpis", "zawar"],
    fee: ["op\u0142at", "stawk", "=cen", "=cena", "=ceny", "=cen\u0119", "koszt"],
    annual: ["roczn"],
    quarter: ["kwarta\u0142", "kwartaln", "=rat", "=raty", "=ratach", "=ratami"],
    month: ["miesi\u0119c", "miesi\u0105c"],
    availability: ["dost\u0119pn"],
    guarantee: ["gwarant"],
    penalty: ["=kara", "=kary", "=kar\u0119", "=kar\u0105", "=kar", "karn"],
    outage: ["awari", "niedost\u0119pn"],
    invoice: ["faktur"],
    increase: ["podnie", "podwy\u017C", "indeks", "waloryz"],
    inflation: ["inflac", "cpi"],
    revenue: ["przychod", "sprzeda\u017C"],
    profit: ["zysk"],
    net: ["netto"],
    gross: ["brutto"],
    liability: ["odpowiedzial"],
    cap: ["limit", "ograniczon"],
    hosting: ["hosting", "przetwarz", "przechow", "utrzymuj", "klastr", "serwer"],
    germany: ["niemc", "niemie"],
    ireland: ["irland"],
    london: ["londyn"],
    england: ["angli", "angiel"],
    wales: ["wali"],
    poland: ["polsk", "polsce"],
    law: ["praw", "uprawn"],
    court: ["=s\u0105d", "=s\u0105dy", "s\u0105du", "s\u0105d\xF3w"],
    jurisdiction: ["jurysdyk"],
    governed: ["podleg"],
    exclusive: ["wy\u0142\u0105czn", "jedyn", "=tylko"],
    unilateral: ["jednostron"],
    annex: ["aneks"],
    vehicle: ["pojazd", "naczep", "=aut", "=auta", "=aut."],
    fleet: ["flot"],
    expansion: ["rozszerz"],
    license: ["licenc", "subskryp", "abonament"],
    data: ["=dane", "=danych"],
    telemetry: ["telemetr", "telematy"],
    renewal: ["odnow", "przed\u0142u\u017C"],
    automatic: ["automat"],
    refund: ["zwrot", "zwrac", "got\xF3wk"],
    deadline: ["termin", "up\u0142yw"],
    payment: ["p\u0142atn", "zap\u0142ac", "op\u0142acon", "uregulow", "uiszcz"],
    board: ["zarz\u0105d"],
    proposal: ["propozyc", "wniosek", "wnioskow"],
    total: ["pe\u0142n", "ca\u0142kowit", "\u0142\u0105czn"],
    period: ["okres"],
    initial: ["pocz\u0105tkow"],
    days: ["=dni", "=dnia"],
    value: ["warto\u015B"],
    amount: ["kwot"],
    cover: ["obejm", "przewid"],
    allowed: ["dopuszcz"],
    effect: ["obowi\u0105z"],
    expire: ["ko\u0144cz"],
    remedy: ["wyci\u0105g"],
    service: ["service", "serwis", "us\u0142ug"],
    credit: ["credit", "credits", "kredyt", "rabat"],
    maximum: ["maksym"],
    support: ["wsparc"],
    office: ["biur"],
    warsaw: ["warszaw"],
    tax: ["=vat"],
    blocked: ["zablokow"],
    refrigerated: ["ch\u0142odnicz"],
    gateway: ["bramk"],
    terminate: ["wypowiedz", "rozwi\u0105za"],
    accept: ["akcept", "zaakcept"],
    require: ["wymag", "wym\xF3g", "rygor", "rygorem", "obowi\u0105zk"],
    notice: ["o\u015Bwiadczen", "zawiadomien", "deklaracj"],
    deliver: ["dor\u0119cz", "dor\u0119czen"],
    receive: ["odebra", "odebran", "odbior"],
    issue: ["wystawi", "wystawion"],
    definite: ["okre\u015Blon", "oznaczon"],
    month_01: ["stycz"],
    month_02: ["lut"],
    month_03: ["=marca", "=marzec"],
    month_04: ["kwiec", "kwietn"],
    month_05: ["=maja", "=maj"],
    month_06: ["czerw"],
    month_07: ["lipc", "lipiec"],
    month_08: ["sierp"],
    month_09: ["wrze\u015B", "wrzes"],
    month_10: ["pa\u017Adzier"],
    month_11: ["listopad"],
    month_12: ["grud"]
  };
  var plPack = {
    lang: "pl",
    tokenize: tokenize2,
    stemMatch: stemMatch2,
    stopwords: STOPWORDS2,
    generic: GENERIC2,
    contractTerms: CONTRACT_TERMS2,
    legalForms: LEGAL_FORMS2,
    weekdays: WEEKDAYS2,
    abbreviations: ABBREVIATIONS2,
    negExact: NEG_EXACT2,
    negPrefix: NEG_PREFIX2,
    unprefix: UNPREFIX2,
    legalFormulasNotNegation: LEGAL_FORMULAS_NOT_NEGATION2,
    legalFormulasRegex: LEGAL_FORMULAS_REGEX2,
    isNegCue: isNegCue2,
    negationCues: negationCues2,
    antonymPairs: ANTONYM_PAIRS2,
    modalityCues: MODALITY_CUES2,
    completedEventCues: COMPLETED_EVENT_CUES2,
    isModalText: isModalText2,
    isFactualText: isFactualText2,
    hedgePrefixes: HEDGE_PREFIXES2,
    isHedge: isHedge2,
    roleLexicon: {
      supplier: ["dostawc"],
      customer: ["zamawiaj\u0105c", "klient"],
      extractRoles: extractRoles2
    },
    monthNames: MONTH_NAMES2,
    canonicalMonths: CANONICAL_MONTHS2,
    numberFormat: {
      parseNumber: parseNumber2,
      currencyPatterns: CURRENCY_PATTERNS2,
      millionPattern: /^\s*(?:mln|milion\p{L}*)(?![\p{L}])/iu,
      percentWordPattern: /^\s*(?:\*\*)?\s*procent/iu,
      netWordPattern: /^(?:mln|milion\p{L}*|netto)$/iu,
      clauseRefWords: ["pkt", "punkt\\p{L}*", "\xA7"],
      clauseConjunctions: ["i", "oraz", ","],
      headerDatePattern: /(?:z\s+dnia\s+|dnia\s+)(\d{1,2})\s+([a-ząćęłńóśźż]+)\s+(20\d{2})/iu,
      replacementPattern: /(?:zastępuje(?:\s+się)?|zastąpion)/i,
      normalizeUnitWord: (word) => word && word.startsWith("dni") ? "dni" : word
    },
    lexiconGroups: LEXICON_GROUPS2,
    decisiveConceptIds: ["germany", "ireland", "london", "england", "wales", "poland", "warsaw"],
    messages: MESSAGES.pl
  };

  // src/lang/index.ts
  var LANGUAGE_PACKS = {
    en: enPack,
    pl: plPack
  };
  function getLanguagePack(lang) {
    return LANGUAGE_PACKS[lang] || enPack;
  }
  var PL_DIACRITICS_RE = /[ąćęłńóśźż]/i;
  function detectLanguage(text, fallback = "en") {
    const words = text.toLowerCase().match(/[\p{L}]+/gu) || [];
    let plScore = 0;
    let enScore = 0;
    for (const w of words) {
      if (PL_DIACRITICS_RE.test(w)) plScore += 2;
      if (plPack.stopwords.has(w) && !enPack.stopwords.has(w)) plScore += 2;
      else if (enPack.stopwords.has(w) && !plPack.stopwords.has(w)) enScore += 2;
      if (plPack.generic.has(w) || plPack.contractTerms.has(w)) plScore += 2;
      if (enPack.generic.has(w) || enPack.contractTerms.has(w)) enScore += 2;
    }
    if (plScore === enScore) return fallback;
    return plScore > enScore ? "pl" : "en";
  }

  // src/engine.ts
  var THRESHOLDS = {
    support: 0.6,
    // min coverage (unit + context) to confirm
    supportUnit: 0.5,
    // min coverage by the quoted unit itself to confirm
    contradict: 0.45,
    // min coverage (unit + titles, no neighbours) to contradict
    override: 0.75,
    // a higher-tier contradiction must be at least this relevant vs. the support
    tieMargin: 0.15
    // an equal-tier negation this close in relevance blocks confirmation
  };
  var NEIGHBOUR_CREDIT = 0;
  var ALL_PACKS = Object.values(LANGUAGE_PACKS);
  function buildConceptGroups() {
    const byId = /* @__PURE__ */ new Map();
    const decisiveIds = /* @__PURE__ */ new Set();
    for (const pack of ALL_PACKS) {
      for (const id of pack.decisiveConceptIds) decisiveIds.add(id);
      for (const [id, members] of Object.entries(pack.lexiconGroups)) {
        const list = byId.get(id) || [];
        for (const m of members) if (!list.includes(m)) list.push(m);
        byId.set(id, list);
      }
    }
    const groups = [];
    const decisiveGroups = [];
    for (const [id, members] of byId.entries()) {
      groups.push(members);
      if (decisiveIds.has(id)) decisiveGroups.push(members);
    }
    return { groups, decisiveGroups };
  }
  var { groups: CONCEPT_GROUPS, decisiveGroups: DECISIVE_CONCEPT_GROUPS } = buildConceptGroups();
  var CANONICAL_MONTHS3 = getLanguagePack("en").canonicalMonths;
  var TOKEN_RE3 = /[\p{L}][\p{L}\p{N}]*(?:[-'’][\p{L}\p{N}]+)*/gu;
  function checkAntonymConflict(claimToks, unitToks, packs) {
    const pairs = packs.flatMap((p) => p.antonymPairs);
    for (const pair of pairs) {
      const negs = [pair.neg, ...pair.alts || []];
      const claimHasPos = claimToks.some((t) => t.startsWith(pair.pos) && !negs.some((n) => t.startsWith(n)));
      const claimHasNeg = claimToks.some((t) => negs.some((n) => t.startsWith(n)));
      const unitHasPos = unitToks.some((t) => t.startsWith(pair.pos) && !negs.some((n) => t.startsWith(n)));
      const unitHasNeg = unitToks.some((t) => negs.some((n) => t.startsWith(n)));
      if (claimHasPos && unitHasNeg || claimHasNeg && unitHasPos) {
        return true;
      }
    }
    return false;
  }
  function memberMatch(member, word, pack) {
    if (member.startsWith("=")) return member.slice(1) === word;
    if (member.startsWith("~")) return pack.stemMatch(member.slice(1), word);
    return pack.stemMatch(member, word) || word.startsWith(member);
  }
  function currencyOf(word, packs = ALL_PACKS) {
    for (const p of packs) {
      for (const [re, c] of p.numberFormat.currencyPatterns) {
        if (re.test(word)) return c;
      }
    }
    return void 0;
  }
  function currenciesIn(text, packs = ALL_PACKS) {
    const s = /* @__PURE__ */ new Set();
    if (text.includes("\xA3")) s.add("GBP");
    if (text.includes("\u20AC")) s.add("EUR");
    for (const w of text.match(/[\p{L}]+/gu) || []) {
      const c = currencyOf(w, packs);
      if (c) s.add(c);
    }
    return s;
  }
  function extractNumbers(text, defaultCurrency, lang = "en") {
    const primaryPack = getLanguagePack(lang);
    const extraTokens = [];
    const numbers = [];
    let t = " " + text + " ";
    t = t.replace(/[\p{L}]+(?:-[\p{L}\p{N}]+)*-\d[\p{L}\p{N}-]*/gu, " ");
    t = t.replace(/(?<![\p{L}\p{N}])[\p{L}]+\d[\p{L}\p{N}]*/gu, " ");
    const clauseWords = ALL_PACKS.flatMap((p) => p.numberFormat.clauseRefWords).join("|");
    const clauseConj = ALL_PACKS.flatMap((p) => p.numberFormat.clauseConjunctions).join("|");
    const clauseRefRe = new RegExp(
      `(?:${clauseWords})\\s*\\d+(?:\\.\\d+)*(?:\\s*(?:${clauseConj})\\s*\\d+(?:\\.\\d+)*)*`,
      "giu"
    );
    t = t.replace(clauseRefRe, " ");
    t = t.replace(/\d{1,2}:\d{2}/g, " ");
    t = t.replace(/\d+\/\d+/g, " ");
    t = t.replace(/^\s*(?:[>*#-]\s*)*\d+(?:\.\d+)+\.?\s/, " ");
    t = t.replace(/^\s*#+\s*\d+\.\s/, " ");
    t = t.replace(/(?<!\d)(\d{1,2})\.(\d{1,2})\.(\d{4})(?!\d)/g, (_m, d, mo, y) => {
      const mi = +mo - 1;
      const moCanonical = mi >= 0 && mi < 12 ? CANONICAL_MONTHS3[mi] : void 0;
      numbers.push({ value: +d, kind: "plain", raw: d, word: moCanonical }, { value: +y, kind: "year", raw: y });
      if (moCanonical) extraTokens.push(moCanonical);
      return " ";
    });
    const allMonthsMap = {};
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
      const moCanonical = mi !== void 0 && mi >= 0 && mi < 12 ? CANONICAL_MONTHS3[mi] : void 0;
      numbers.push({ value: +d, kind: "plain", raw: d, word: moCanonical }, { value: +y, kind: "year", raw: y });
      if (moCanonical) extraTokens.push(moCanonical);
      return " ";
    });
    const re = /([£€]\s?)?(\d{1,3}(?:[ \u00a0]\d{3})+(?:[.,]\d+)?|\d+(?:[.,]\d+)*)(?:st|nd|rd|th)?(?![\p{L}\d])(\s?%)?(?:-([\p{L}]+))?/gu;
    let m;
    while (m = re.exec(t)) {
      const raw = m[0].trim();
      let value = primaryPack.numberFormat.parseNumber(m[2]);
      if (!isFinite(value)) continue;
      const after = t.slice(re.lastIndex, re.lastIndex + 24);
      let currency = m[1] ? m[1].includes("\xA3") ? "GBP" : "EUR" : void 0;
      const nextWords = (after.match(/[\p{L}%]+/gu) || []).slice(0, 2);
      const coded = currencyOf(nextWords[0] || "");
      if (coded) currency = coded;
      let percent = !!m[3];
      if (ALL_PACKS.some((p) => p.numberFormat.percentWordPattern.test(after))) percent = true;
      if (ALL_PACKS.some((p) => p.numberFormat.millionPattern.test(after))) value *= 1e6;
      if (!currency) {
        for (const w of nextWords) {
          const c = currencyOf(w);
          if (c) {
            currency = c;
            break;
          }
          if (!ALL_PACKS.some((p) => p.numberFormat.netWordPattern.test(w))) break;
        }
      }
      let kind;
      if (percent) kind = "percent";
      else if (currency) kind = "money";
      else if (Number.isInteger(value) && value >= 1990 && value <= 2100 && !/[.,\s]/.test(m[2])) kind = "year";
      else if (value >= 1e3 || /[.,]\d{2}$/.test(m[2])) kind = "money";
      else kind = "plain";
      if (kind === "money" && !currency && defaultCurrency) currency = defaultCurrency;
      let word = m[4] ? m[4].toLowerCase() : (after.match(/^[\s*)]*([\p{L}]+)/u)?.[1] || "").toLowerCase() || void 0;
      for (const p of ALL_PACKS) {
        word = p.numberFormat.normalizeUnitWord(word);
      }
      numbers.push({ value, kind, currency, raw, word });
    }
    return { numbers, extraTokens };
  }
  function fmt(n) {
    return n.currency && !/[£€]|gbp|eur|pln|zł/i.test(n.raw) ? `${n.raw} ${n.currency}` : n.raw;
  }
  function sameValue(a, b) {
    return Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));
  }
  function extractDocDate(file, raw) {
    const mFile = file.match(/\b(20\d{2})[-_](\d{2})[-_](\d{2})\b/);
    if (mFile) return +`${mFile[1]}${mFile[2]}${mFile[3]}`;
    const head = raw.slice(0, 1e3);
    for (const pack of ALL_PACKS) {
      const m = head.match(pack.numberFormat.headerDatePattern);
      if (m) {
        const mi = pack.monthNames[m[2].toLowerCase()];
        if (mi !== void 0) {
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
  function tierOf(file) {
    const f = file.toLowerCase();
    if (/(email|e-mail|mail|correspondence|korespond)/.test(f)) return 3;
    if (/(crm|pipeline|notes|notatk)/.test(f)) return 2;
    return 1;
  }
  function splitSentences(line, pack) {
    const out = [];
    let start = 0;
    const re = /[.!?](?=\s+[\p{Lu}\d"*(\[>„])/gu;
    let m;
    while (m = re.exec(line)) {
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
  var RedlineEngineCore = class {
    lang = "en";
    sections = [];
    sources = [];
    units = [];
    sectionUnits = /* @__PURE__ */ new Map();
    vocabulary = /* @__PURE__ */ new Set();
    parties = [];
    constructor(lang = "en") {
      this.lang = lang;
    }
    setLanguage(lang) {
      this.lang = lang;
    }
    tokenize(text) {
      return getLanguagePack(this.lang).tokenize(text);
    }
    loadDocuments(docs) {
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
        const docSections = [];
        let title = file.replace(/\.md$/, "");
        let buf = [];
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
    buildUnits(sec, docContext, docDate) {
      const secPack = getLanguagePack(sec.lang);
      const context = /* @__PURE__ */ new Set([...secPack.tokenize(sec.title), ...docContext]);
      const lines = sec.content.split("\n");
      const units = [];
      let header = null;
      let headerCurrency;
      const extractUnitNegCues = (txt) => {
        let cleaned = txt;
        for (const p of ALL_PACKS) cleaned = cleaned.replace(p.legalFormulasRegex, " ");
        return secPack.tokenize(cleaned).filter((tok) => ALL_PACKS.some((p) => p.isNegCue(tok)));
      };
      const extractUnitRoles = (txt) => {
        const primary = secPack.roleLexicon.extractRoles(txt);
        if (primary.subject || primary.recipient) return primary;
        for (const p of ALL_PACKS) {
          if (p.lang === secPack.lang) continue;
          const r = p.roleLexicon.extractRoles(txt);
          if (r.subject || r.recipient) return r;
        }
        return primary;
      };
      const push = (text, tokenText, extraNumbers = [], defCur) => {
        const unitLang = detectLanguage(text, sec.lang);
        const { numbers, extraTokens } = extractNumbers(text, defCur, unitLang);
        const rawToks = secPack.tokenize(tokenText);
        const tokens = /* @__PURE__ */ new Set([...rawToks, ...extraTokens]);
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
            cues: extractUnitNegCues(c)
          })),
          docDate,
          modal: ALL_PACKS.some((p) => p.isModalText(text)),
          factual: ALL_PACKS.some((p) => p.isFactualText(text)),
          roles: extractUnitRoles(text)
        });
      };
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || /^-{3,}$/.test(line)) continue;
        if (/^#{1,6}\s/.test(line)) {
          const cleanHeader = line.replace(/^#{1,6}\s+/, "").trim();
          const hasHeaderDate = /\b20\d{2}\b/.test(cleanHeader) || ALL_PACKS.some((p) => p.numberFormat.headerDatePattern.test(cleanHeader));
          if (hasHeaderDate && secPack.tokenize(cleanHeader).length >= 4) {
            const cur = currenciesIn(cleanHeader);
            push(cleanHeader, cleanHeader, [], cur.size === 1 ? [...cur][0] : void 0);
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
            headerCurrency = hc.size === 1 ? [...hc][0] : void 0;
            continue;
          }
          const rowCur = /* @__PURE__ */ new Set();
          cells.forEach((c) => {
            const cc = currencyOf(c.replace(/\*/g, ""));
            if (cc) rowCur.add(cc);
          });
          const defCur = rowCur.size === 1 ? [...rowCur][0] : headerCurrency;
          const labelled = cells.map((c, k) => `${header?.[k] ?? ""}: ${c}`).join(" | ");
          const headerYears = header ? extractNumbers(header.join(" | "), void 0, sec.lang).numbers.filter((n) => n.kind === "year") : [];
          push(line, labelled, headerYears, defCur);
          continue;
        }
        header = null;
        for (const s of splitSentences(line, secPack)) {
          const cur = currenciesIn(s);
          push(s, s, [], cur.size === 1 ? [...cur][0] : void 0);
        }
      }
      this.sectionUnits.set(`${sec.file}#${sec.page}`, units);
      this.units.push(...units);
    }
    /**
     * Definitions clause convention: **Full Name Ltd**, … ("Supplier" or "Short Name").
     * Each party gets its distinctive name tokens plus the role words it is defined as.
     */
    readParties(raw, pack) {
      const roleGroups = [
        ALL_PACKS.flatMap((p) => p.roleLexicon.supplier),
        ALL_PACKS.flatMap((p) => p.roleLexicon.customer)
      ];
      const re = /\*\*([^*\n]+)\*\*,[^\n]*?\(\s*"([^"]+)"(?:\s+or\s+"([^"]+)")?\s*\)/g;
      let m;
      while (m = re.exec(raw)) {
        const name = m[1].trim();
        if (this.parties.some((p) => p.name === name)) continue;
        const toks = /* @__PURE__ */ new Set();
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
      for (const p of this.parties) {
        p.tokens = p.tokens.filter((t) => this.parties.filter((q) => q.tokens.includes(t)).length === 1);
        p.names = p.names.filter((t) => p.tokens.includes(t));
      }
    }
    partiesIn(tokens, namesOnly = false) {
      const found = /* @__PURE__ */ new Set();
      for (const t of tokens) for (const p of this.parties) {
        if ((namesOnly ? p.names : p.tokens).some((pt) => t === pt || t.startsWith(pt))) found.add(p.name);
      }
      return found;
    }
    /**
     * A unit that NAMES another party (by name, not by role word — roles appear in every contract
     * sentence as actors) and never refers to the claim's party cannot support the claim.
     */
    partyMismatch(claimParties, u) {
      if (claimParties.size === 0) return false;
      const named = this.partiesIn(u.tokens, true);
      if (named.size === 0) return false;
      const referred = this.partiesIn(u.tokens);
      return ![...claimParties].some((p) => referred.has(p));
    }
    listSources() {
      return this.sources;
    }
    quote(file, page) {
      const pageNum = typeof page === "string" ? parseInt(page, 10) : page;
      const match = this.sections.find(
        (s) => s.file.toLowerCase() === file.toLowerCase() && (isNaN(pageNum) ? s.title === page : s.page === pageNum)
      );
      if (!match) return null;
      return { file: match.file, page: match.page, quote: match.content };
    }
    // ── claim analysis ──
    features(claim) {
      const claimLang = detectLanguage(claim, this.lang);
      const claimPack = getLanguagePack(claimLang);
      let cleaned = claim;
      for (const p of ALL_PACKS) cleaned = cleaned.replace(p.legalFormulasRegex, " ");
      const toks = claimPack.tokenize(cleaned);
      const isNeg = (t) => ALL_PACKS.some((p) => p.isNegCue(t));
      const isStopword = (t) => ALL_PACKS.some((p) => p.stopwords.has(t));
      const isGeneric = (t) => ALL_PACKS.some((p) => p.generic.has(t));
      const isContractTerm = (t) => ALL_PACKS.some((p) => p.contractTerms.has(t));
      const isWeekday = (t) => ALL_PACKS.some((p) => p.weekdays.includes(t));
      const negative = toks.some(isNeg);
      const content = /* @__PURE__ */ new Set();
      for (const t of toks) {
        for (const p of ALL_PACKS) {
          if (p.unprefix[t]) content.add(p.unprefix[t]);
        }
        if (isNeg(t) || isStopword(t) || isGeneric(t) || currencyOf(t)) continue;
        if (this.parties.some((p) => p.tokens.includes(t))) continue;
        content.add(t);
      }
      const alts = /* @__PURE__ */ new Map();
      for (const t of content) {
        const members = [`~${t}`];
        for (const g of CONCEPT_GROUPS) {
          if (g.some((mem) => memberMatch(mem, t, claimPack))) members.push(...g);
        }
        const hits = /* @__PURE__ */ new Set();
        for (const v of this.vocabulary) {
          if (members.some((mem) => memberMatch(mem, v, claimPack))) hits.add(v);
        }
        alts.set(t, hits);
      }
      const weight = /* @__PURE__ */ new Map();
      const N = this.units.length || 1;
      for (const [t, hits] of alts) {
        const df = this.units.filter((u) => [...u.tokens].some((x) => hits.has(x))).length;
        weight.set(t, Math.log(1 + N / (df + 1)));
      }
      const claimCur = currenciesIn(claim);
      const { numbers } = extractNumbers(claim, claimCur.size === 1 ? [...claimCur][0] : void 0, claimLang);
      const cased = claim.match(TOKEN_RE3) || [];
      const proper = [...new Set(cased.slice(1).filter((w) => /^\p{Lu}/u.test(w)).map((w) => w.toLowerCase()))].filter(
        (t) => content.has(t) && !CANONICAL_MONTHS3.includes(t) && !isWeekday(t) && !isContractTerm(t)
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
          if (r.subject || r.recipient) {
            roles = r;
            break;
          }
        }
      }
      const negatedTerms = /* @__PURE__ */ new Set();
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
        negatedTerms
      };
    }
    scoreUnit(f, u) {
      const msg = getLanguagePack(this.lang).messages;
      const sectionUnits = this.sectionUnits.get(`${u.file}#${u.page}`) || [];
      let cov = 0, full = 0, ctx = 0;
      const matched = [], missing = [];
      let W = 0;
      for (const t of f.content) {
        const hits = f.alts.get(t);
        const w = f.weight.get(t);
        W += w;
        if ([...u.tokens].some((x) => hits.has(x))) {
          cov += w;
          full++;
          matched.push(t);
          continue;
        }
        if ([...u.context].some((x) => hits.has(x))) {
          if (/\d/.test(t)) {
            cov += w;
            full++;
            matched.push(`${t}^`);
            continue;
          }
          cov += 0.5 * w;
          ctx += 0.5 * w;
          matched.push(`${t}^`);
          continue;
        }
        const inSection = sectionUnits.some((s) => [...s.tokens].some((x) => hits.has(x)));
        if (inSection) {
          cov += NEIGHBOUR_CREDIT * w;
          matched.push(`${t}~`);
        } else missing.push(t);
      }
      const fullW = f.content.filter((t) => matched.includes(t) || matched.includes(`${t}^`) && /\d/.test(t)).reduce((a, t) => a + f.weight.get(t), 0);
      const n = W || 1;
      const coverage = cov / n;
      const unitCoverage = fullW / n;
      const contraCoverage = (fullW + ctx) / n;
      const conflicts = [];
      const conflictCodes = [];
      let numbersOk = true;
      const isReplacementUnit = ALL_PACKS.some((p) => p.numberFormat.replacementPattern.test(u.text));
      let replacedNum;
      let replacementNum;
      if (isReplacementUnit) {
        for (let i = 0; i < u.numbers.length; i++) {
          for (let j = i + 1; j < u.numbers.length; j++) {
            const a = u.numbers[i], b = u.numbers[j];
            const sameKind = a.kind === b.kind;
            const sameWord = !a.word && !b.word || !!a.word && !!b.word && (this.sameConcept(a.word, b.word) || a.word === b.word);
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
      const sectionYears = sectionUnits.flatMap((s) => s.numbers.filter((n2) => n2.kind === "year"));
      for (const n2 of f.numbers) {
        if (replacedNum && replacementNum && sameValue(n2.value, replacedNum.value)) {
          numbersOk = false;
          conflictCodes.push(REASON_CODES.NUMBER_MISMATCH);
          conflicts.push(msg.reason_value_mismatch(fmt(n2), fmt(replacementNum)));
          continue;
        }
        const same = u.numbers.filter((x) => sameValue(x.value, n2.value));
        const curClash = n2.currency && same.length > 0 && same.every((x) => x.currency && x.currency !== n2.currency);
        const monthClash = n2.word && CANONICAL_MONTHS3.includes(n2.word) && same.length > 0 && same.every((x) => x.word && CANONICAL_MONTHS3.includes(x.word) && x.word !== n2.word);
        const found = !curClash && !monthClash && same.length > 0 || n2.kind === "year" && sectionYears.some((y) => y.value === n2.value);
        if (curClash) {
          numbersOk = false;
          conflictCodes.push(REASON_CODES.CURRENCY_MISMATCH);
          conflicts.push(msg.reason_currency_mismatch(fmt(n2), fmt(same[0])));
          continue;
        }
        if (monthClash) {
          numbersOk = false;
          conflictCodes.push(REASON_CODES.NUMBER_MISMATCH);
          conflicts.push(msg.reason_value_mismatch(`${n2.raw} ${n2.word}`, `${same[0].raw} ${same[0].word}`));
          continue;
        }
        if (found) continue;
        numbersOk = false;
        const rivals = u.numbers.filter((x) => {
          if (n2.kind === "money") return x.kind === "money";
          if (n2.kind === "percent") return x.kind === "percent";
          if (n2.kind === "year") return x.kind === "year";
          return x.kind === "plain" && !f.numbers.some((c) => sameValue(c.value, x.value)) && !!n2.word && !!x.word && (this.sameConcept(n2.word, x.word) || CANONICAL_MONTHS3.includes(n2.word) && CANONICAL_MONTHS3.includes(x.word));
        });
        if (rivals.length > 0) {
          conflictCodes.push(REASON_CODES.NUMBER_MISMATCH);
          conflicts.push(msg.reason_value_mismatch(fmt(n2), rivals.map(fmt).join(" / ")));
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
      const hitsIn = (c) => f.content.filter((t) => [...c.tokens].some((x) => f.alts.get(t).has(x))).length;
      const best = Math.max(0, ...u.clauses.map(hitsIn));
      const relevant = best > 0 ? u.clauses.filter((c) => hitsIn(c) === best) : [];
      const unitNegative = relevant.length ? relevant.some((c) => c.cues.length > 0) : u.negCues.length > 0;
      const polarityFlip = f.negative !== unitNegative;
      const numFound = f.numbers.length - (numbersOk ? 0 : f.numbers.filter((x) => !u.numbers.some((y) => sameValue(x.value, y.value))).length);
      const NW = Math.log(1 + (this.units.length || 1) / 2);
      const denom = W + f.numbers.length * NW || 1;
      const supportCoverage = (cov + Math.max(0, numFound) * NW) / denom;
      const supportUnitCoverage = (fullW + Math.max(0, numFound) * NW) / denom;
      const score = coverage + (3 - u.tier) * 0.02 + (numbersOk && f.numbers.length ? 0.1 : 0);
      return { unit: u, unitNegative, coverage, unitCoverage, contraCoverage, supportCoverage, supportUnitCoverage, valueConflict: conflicts.length > 0, full, matched, missing, numbersOk, conflicts, conflictCodes, polarityFlip, score, antonymConflict, roleMismatch, roleContra, modalityMismatch };
    }
    /** Two words denote the same concept (stem match or same lexicon group). */
    sameConcept(a, b) {
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
    combine(f, seed) {
      const isField = (u) => u.text.startsWith("|") || u.text.length <= 160 && /^[\s*>-]*\*{0,2}[\p{L}][\p{L}\s/()&-]{1,40}:\*{0,2}\s/u.test(u.text);
      const pool = (this.sectionUnits.get(`${seed.unit.file}#${seed.unit.page}`) || []).filter((u) => isField(u) && !this.partyMismatch(f.parties, u) && u.negCues.length > 0 === f.negative && !(u.hedged && u.negCues.length === 0 && !f.hedged) && !(f.factual && !f.modal && u.modal && !u.factual));
      const hasTok = (u, t) => {
        const hits = f.alts.get(t);
        return [...u.tokens].some((x) => hits.has(x)) || /\d/.test(t) && [...u.context].some((x) => hits.has(x));
      };
      const hasNum = (u, n) => u.numbers.some((x) => sameValue(x.value, n.value) && !(n.currency && x.currency && x.currency !== n.currency));
      const chosen = [];
      const covered = (t) => chosen.some((u) => hasTok(u, t));
      const gotNum = (n) => chosen.some((u) => hasNum(u, n)) || n.kind === "year" && pool.some((u) => hasNum(u, n));
      for (let k = 0; k < 3; k++) {
        let best = null, gain = 0;
        for (const u of pool) {
          if (chosen.includes(u)) continue;
          const g = f.content.filter((t) => !covered(t) && hasTok(u, t)).length + f.numbers.filter((n) => !gotNum(n) && hasNum(u, n)).length;
          if (g > gain) {
            gain = g;
            best = u;
          }
        }
        if (!best) break;
        chosen.push(best);
      }
      if (chosen.length < 2 || !f.numbers.every(gotNum)) return null;
      if (!f.proper.every(covered)) return null;
      for (const n of f.numbers.filter((x) => x.kind === "money")) {
        if (chosen.some((u) => u.numbers.some((x) => x.kind === "money" && x.currency === n.currency && !sameValue(x.value, n.value)) && !hasNum(u, n))) return null;
      }
      const matched = f.content.filter(covered);
      const missing = f.content.filter((t) => !covered(t));
      const NW = Math.log(1 + (this.units.length || 1) / 2);
      const wsum = (ts) => ts.reduce((a, t) => a + f.weight.get(t), 0);
      const coverage = (wsum(matched) + f.numbers.length * NW) / (wsum(f.content) + f.numbers.length * NW);
      return { units: chosen, coverage, matched, missing };
    }
    toEvidence(s, reasons = []) {
      return {
        file: s.unit.file,
        page: s.unit.page,
        tier: s.unit.tier,
        quote: s.unit.text,
        coverage: Math.round(s.coverage * 100) / 100,
        matched: s.matched,
        missing: s.missing,
        reasons
      };
    }
    search(query, limit = 5) {
      const f = this.features(query);
      if (f.content.length === 0 && f.numbers.length === 0) return [];
      return this.units.map((u) => this.scoreUnit(f, u)).filter((s) => s.full > 0 || f.numbers.length > 0 && s.numbersOk).sort((a, b) => b.score - a.score).slice(0, limit).map((s) => ({ file: s.unit.file, page: s.unit.page, quote: s.unit.text, score: Math.round(s.score * 100) / 100 }));
    }
    verify(claim) {
      const msg = getLanguagePack(this.lang).messages;
      const claimPack = getLanguagePack(detectLanguage(claim, this.lang));
      const allCompletedCues = ALL_PACKS.flatMap((p) => p.completedEventCues);
      const f = this.features(claim);
      if (f.content.length === 0) {
        return {
          status: "UNSUPPORTED",
          claim,
          explanation: msg.unsupported_no_terms(),
          reasonCodes: [REASON_CODES.NO_CHECKABLE_TERMS]
        };
      }
      const minFull = Math.min(2, f.content.length);
      const scored = this.units.map((u) => this.scoreUnit(f, u)).sort((a, b) => b.score - a.score);
      const supports = scored.filter((s) => s.supportCoverage >= THRESHOLDS.support && s.supportUnitCoverage >= THRESHOLDS.supportUnit && s.full >= minFull && s.numbersOk && s.conflicts.length === 0 && !s.polarityFlip && !this.partyMismatch(f.parties, s.unit) && !s.antonymConflict && !s.roleMismatch && !s.modalityMismatch && f.proper.every((t) => s.matched.includes(t) || s.matched.includes(`${t}^`)) && !(s.unit.hedged && s.unit.negCues.length === 0 && !f.hedged));
      const polarityContra = (s) => {
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
      const contras = scored.filter((s) => s.contraCoverage >= THRESHOLDS.contradict && s.full >= minFull && (s.valueConflict && !s.modalityMismatch || polarityContra(s)) && (f.proper.length === 0 || f.proper.every((t) => s.matched.some((m) => m.startsWith(t)))));
      const pick = (arr) => arr.slice().sort((a, b) => a.unit.tier - b.unit.tier || b.unit.docDate - a.unit.docDate || b.score - a.score)[0];
      const bestS = pick(supports);
      const overrides = (c) => !bestS || c.unit.tier < bestS.unit.tier && c.contraCoverage >= THRESHOLDS.override * bestS.contraCoverage || c.unit.tier === bestS.unit.tier && c.unit.docDate > bestS.unit.docDate && (c.valueConflict || c.antonymConflict) && c.contraCoverage >= THRESHOLDS.contradict || c.unit.tier === bestS.unit.tier && polarityContra(c) && c.numbersOk && c.contraCoverage >= bestS.contraCoverage - THRESHOLDS.tieMargin;
      const bestC = pick(contras.filter(overrides));
      const contraReasonDetails = (c) => {
        const codes = [];
        const reasons = [];
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
            const cues = c.unit.clauses.flatMap((k) => k.cues).slice(0, 3).join(", ") || c.unit.negCues.slice(0, 3).join(", ");
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
        const reasonCodes2 = [...new Set(contraCodes)];
        let conflicting;
        if (bestS) {
          reasonCodes2.push(REASON_CODES.HIGHER_TIER_CONFLICT);
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
            conflicting: conflicting ? { file: conflicting.file, tier: conflicting.tier } : void 0
          }),
          reasonCodes: reasonCodes2,
          evidence: ev,
          conflicting
        };
      }
      if (!bestS && !bestC) {
        const seeds = scored.filter((s) => s.full > 0).slice(0, 5);
        for (const seed of seeds) {
          const combo = this.combine(f, seed);
          if (!combo || combo.coverage < THRESHOLDS.support) continue;
          const c = pick(contras);
          if (c && c.unit.tier <= seed.unit.tier) break;
          const ordered = combo.units.slice().sort((a, b) => this.units.indexOf(a) - this.units.indexOf(b));
          const ev = {
            file: seed.unit.file,
            page: seed.unit.page,
            tier: seed.unit.tier,
            quote: ordered.map((u) => u.text).join(" [\u2026] "),
            coverage: Math.round(combo.coverage * 100) / 100,
            matched: combo.matched,
            missing: combo.missing,
            reasons: [msg.reason_compound_claim(ordered.length)]
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
              numbers: f.numbers.length ? f.numbers.map((n) => n.raw).join(", ") : void 0
            }),
            reasonCodes: [REASON_CODES.COMPLEX_CLAIM_MULTI_UNIT, REASON_CODES.EXACT_MATCH],
            evidence: ev
          };
        }
      }
      if (bestS) {
        const ev = this.toEvidence(bestS);
        const lower = pick(contras.filter((c) => c.unit.tier > bestS.unit.tier));
        const reasonCodes2 = [REASON_CODES.EXACT_MATCH];
        let conflicting;
        if (lower) {
          reasonCodes2.push(REASON_CODES.LOWER_TIER_CONFLICT);
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
            numbers: f.numbers.length ? f.numbers.map((n) => n.raw).join(", ") : void 0,
            conflicting: conflicting ? { file: conflicting.file, tier: conflicting.tier } : void 0
          }),
          reasonCodes: reasonCodes2,
          evidence: ev,
          conflicting
        };
      }
      const near = scored[0];
      const nearest = near && near.full > 0 ? this.toEvidence(near) : void 0;
      const why = [];
      const reasonCodes = [];
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
        explanation: nearest ? msg.unsupported_nearest({ file: nearest.file, page: nearest.page, why }) : msg.unsupported_no_docs(),
        reasonCodes: reasonCodes.length > 0 ? [...new Set(reasonCodes)] : [REASON_CODES.NO_RELEVANT_DOCUMENTS],
        nearest
      };
    }
  };

  // src/browser.ts
  if (typeof window !== "undefined") {
    window.RedlineEngine = RedlineEngineCore;
  }
  return __toCommonJS(browser_exports);
})();
