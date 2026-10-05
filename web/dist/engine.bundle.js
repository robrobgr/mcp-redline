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
      reason_lower_tier_claims_otherwise: (file, tier) => `lower tier source (${file}, Tier ${tier}) claims otherwise`
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
      reason_lower_tier_claims_otherwise: (file, tier) => `\u017Ar\xF3d\u0142o o ni\u017Cszej randze (${file}, Tier ${tier}) twierdzi inaczej`
    }
  };

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
  var GROUPS = [
    ["umow", "agreement", "contract", "msa", "kontrakt"],
    ["ramow", "master"],
    ["podpis", "zawar", "signed", "sign", "entered", "executed", "countersigned"],
    ["op\u0142at", "fee", "stawk", "=cen", "=cena", "=ceny", "=cen\u0119", "price", "pricing", "koszt", "cost", "rates"],
    ["roczn", "annual", "annually", "yearly"],
    ["kwarta\u0142", "kwartaln", "quarter", "quarterly", "installments", "=rat", "=raty", "=ratach", "=ratami"],
    ["miesi\u0119c", "miesi\u0105c", "month", "monthly"],
    ["dost\u0119pn", "availability", "uptime", "available"],
    ["gwarant", "guarantee", "guaranteed", "guarantees", "commitment"],
    ["=kara", "=kary", "=kar\u0119", "=kar\u0105", "=kar", "karn", "penalty", "penalties", "liquidated", "fines"],
    ["awari", "outage", "failure", "unavailability", "niedost\u0119pn", "disruption", "degradation"],
    ["faktur", "invoice", "invoices", "invoiced", "invoicing", "billed", "billing"],
    ["podnie", "podwy\u017C", "raise", "increase", "increasing", "adjust", "adjustment", "indeks", "index", "indexing", "indexation", "waloryz"],
    ["inflac", "inflation", "cpi"],
    ["przychod", "revenue", "revenues", "sales", "sprzeda\u017C"],
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
    ["=s\u0105d", "=s\u0105dy", "s\u0105du", "s\u0105d\xF3w", "court", "courts"],
    ["jurysdyk", "jurisdiction"],
    ["podleg", "governed", "construed"],
    ["wy\u0142\u0105czn", "exclusive", "exclusively", "sole", "solely", "only", "jedyn", "=tylko"],
    ["jednostron", "unilateral", "unilaterally"],
    ["aneks", "annex", "addendum", "amendment"],
    ["pojazd", "vehicle", "vehicles", "naczep", "trailer", "trailers", "=aut", "=auta", "=aut."],
    ["flot", "fleet"],
    ["rozszerz", "expansion", "expand", "extend", "extension"],
    ["licenc", "license", "licence", "subscription", "subskryp", "abonament"],
    ["=dane", "=danych", "=data"],
    ["telemetr", "telematy", "telemetry", "telematics"],
    ["odnow", "przed\u0142u\u017C", "renewal", "renew", "renewed", "rollover"],
    ["automat", "automatic", "automatically"],
    ["zwrot", "zwrac", "refund", "refunded", "got\xF3wk", "cash"],
    ["termin", "due", "deadline"],
    ["p\u0142atn", "payable", "payment", "payments", "paid", "zap\u0142ac", "op\u0142acon", "uregulow", "uiszcz"],
    ["zarz\u0105d", "board", "management"],
    ["propozyc", "proposal", "proposed", "wniosek", "wnioskow", "request"],
    ["pe\u0142n", "full", "ca\u0142kowit", "total", "\u0142\u0105czn", "aggregate"],
    ["okres", "term", "period"],
    ["pocz\u0105tkow", "initial"],
    ["=dni", "=dnia", "days", "day"],
    ["warto\u015B", "value"],
    ["kwot", "amount"],
    ["obejm", "cover", "covers", "include", "includes", "przewid", "provide", "provides"],
    ["dopuszcz", "allowed", "permitted", "permit", "permitting", "allow"],
    ["obowi\u0105z", "effect", "force"],
    ["ko\u0144cz", "ending", "ends", "expire", "expiration"],
    ["wyci\u0105g", "remedy"],
    ["service", "serwis", "us\u0142ug", "services"],
    ["credit", "credits", "kredyt", "rabat"],
    ["maksym", "maximum", "max", "exceed"],
    ["wsparc", "support"],
    ["biur", "office"],
    ["warszaw", "warsaw"],
    ["=vat", "tax"],
    ["zablokow", "blocked", "block"],
    ["ch\u0142odnicz", "refrigerated", "cold"],
    ["bramk", "gateway", "gateways"],
    ["wypowiedz", "terminate", "terminated", "termination"],
    ["stycz", "january"],
    ["lut", "february"],
    ["=marca", "=marzec", "march"],
    ["kwiec", "kwietn", "april"],
    ["=maja", "=maj", "may"],
    ["czerw", "june"],
    ["lipc", "lipiec", "july"],
    ["sierp", "august"],
    ["wrze\u015B", "wrzes", "september"],
    ["pa\u017Adzier", "october"],
    ["listopad", "november"],
    ["grud", "december"]
  ];
  var WEEKDAYS_EN = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  var DECISIVE_GROUPS = GROUPS.filter((g) => ["niemc", "irland", "londyn", "angli", "wali", "polsk", "warszaw"].includes(g[0]));
  var MONTHS_EN = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
  var STOPWORDS = /* @__PURE__ */ new Set([
    // EN
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
    // PL
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
    "every",
    "podstawie",
    "basis"
  ]);
  var GENERIC = /* @__PURE__ */ new Set([
    "ltd",
    "limited",
    "plc",
    "inc",
    "gmbh",
    "sp\xF3\u0142ka",
    "sp\xF3\u0142ki",
    "supplier",
    "customer",
    "party",
    "parties",
    "dostawca",
    "dostawcy",
    "dostawc\u0119",
    "dostawc\u0105",
    "klient",
    "klienta",
    "klientowi",
    "firma",
    "company",
    "strona",
    "strony"
  ]);
  var ROLE_GROUPS = [
    ["supplier", "dostawc", "vendor", "provider", "licensor"],
    ["customer", "klient", "client", "licensee", "buyer"]
  ];
  var LEGAL_FORM = /* @__PURE__ */ new Set(["ltd", "limited", "plc", "inc", "gmbh", "sp", "o.o", "z", "s.a", "b.v", "sas", "llc"]);
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
    "struck",
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
  var NEG_PREFIX = ["odrzuc", "wykre\u015Bl", "zakaz", "niewa\u017Cn", "bezpodstawn", "bezskuteczn", "wy\u0142\u0105czy", "wy\u0142\u0105czon", "nieprawdziw", "niedopuszczaln", "wykluczon"];
  var UNPREFIX = { unpaid: "paid", unsigned: "signed" };
  var HEDGE_PREFIX = ["zawnioskow", "wnios", "propozyc", "proponu", "propos", "request", "claimed", "alleg", "twierdz", "rzekom", "purport", "draft", "domag", "\u017C\u0105da", "\u017C\u0105dan"];
  function isHedge(t) {
    return HEDGE_PREFIX.some((p) => t.startsWith(p));
  }
  var NEIGHBOUR_CREDIT = 0;
  var B = "(?<![\\p{L}\\p{N}])";
  var E = "(?![\\p{L}\\p{N}])";
  var QUANT_RE = new RegExp(
    [
      `${B}(?:not|no)\\s+(?:less|more|later|earlier|fewer|greater)\\s+than${E}`,
      `${B}not\\s+(?:to\\s+)?exceed\\w*`,
      `${B}nie\\s+(?:mniej|wi\u0119cej|p\xF3\u017Aniej|wcze\u015Bniej)\\s+ni\u017C${E}`,
      `${B}nie\\s+przekracz\\p{L}*`,
      `${B}no[.:]`
    ].join("|"),
    "giu"
  );
  var TOKEN_RE = /[\p{L}][\p{L}\p{N}]*(?:[-'’][\p{L}\p{N}]+)*/gu;
  function rawTokens(text) {
    const out = [];
    for (const t of text.toLowerCase().match(TOKEN_RE) || []) {
      out.push(t);
      if (t.includes("-") && !/\d/.test(t)) out.push(...t.split("-"));
    }
    return out.filter((t) => t.length >= 2);
  }
  function isNegCue(t) {
    return NEG_EXACT.has(t) || NEG_PREFIX.some((p) => t.startsWith(p));
  }
  function negationCues(text) {
    const cleaned = text.replace(QUANT_RE, " ");
    return rawTokens(cleaned).filter(isNegCue);
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
  function memberMatch(member, word) {
    if (member.startsWith("=")) return member.slice(1) === word;
    if (member.startsWith("~")) return stemMatch(member.slice(1), word);
    return stemMatch(member, word) || word.startsWith(member);
  }
  var CUR_WORD = [
    [/^(?:gbp|funt\p{L}*|pounds?)$/iu, "GBP"],
    [/^(?:eur|euro)$/iu, "EUR"],
    [/^(?:pln|zł|złotych)$/iu, "PLN"]
  ];
  function currencyOf(word) {
    for (const [re, c] of CUR_WORD) if (re.test(word)) return c;
    return void 0;
  }
  function currenciesIn(text) {
    const s = /* @__PURE__ */ new Set();
    if (text.includes("\xA3")) s.add("GBP");
    if (text.includes("\u20AC")) s.add("EUR");
    for (const w of text.match(/[\p{L}]+/gu) || []) {
      const c = currencyOf(w);
      if (c) s.add(c);
    }
    return s;
  }
  function parseNumber(s) {
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
  function extractNumbers(text, defaultCurrency) {
    const extraTokens = [];
    const numbers = [];
    let t = " " + text + " ";
    t = t.replace(/[\p{L}]+(?:-[\p{L}\p{N}]+)*-\d[\p{L}\p{N}-]*/gu, " ");
    t = t.replace(/(?<![\p{L}\p{N}])[\p{L}]+\d[\p{L}\p{N}]*/gu, " ");
    t = t.replace(/(?:section|sections|sec\.?|article|pkt|punkt\p{L}*|point|§|schedule\s+[a-z])\s*\d+(?:\.\d+)*(?:\s*(?:and|i|oraz|,)\s*\d+(?:\.\d+)*)*/giu, " ");
    t = t.replace(/\d{1,2}:\d{2}/g, " ");
    t = t.replace(/\d+\/\d+/g, " ");
    t = t.replace(/^\s*(?:[>*#-]\s*)*\d+(?:\.\d+)+\.?\s/, " ");
    t = t.replace(/^\s*#+\s*\d+\.\s/, " ");
    t = t.replace(/(?<!\d)(\d{1,2})\.(\d{1,2})\.(\d{4})(?!\d)/g, (_m, d, mo, y) => {
      numbers.push({ value: +d, kind: "plain", raw: d }, { value: +y, kind: "year", raw: y });
      const mi = +mo - 1;
      if (mi >= 0 && mi < 12) extraTokens.push(MONTHS_EN[mi]);
      return " ";
    });
    const re = /([£€]\s?)?(\d{1,3}(?:[  ]\d{3})+(?:[.,]\d+)?|\d+(?:[.,]\d+)*)(?:st|nd|rd|th)?(?![\p{L}\d])(\s?%)?/gu;
    let m;
    while (m = re.exec(t)) {
      const raw = m[0].trim();
      let value = parseNumber(m[2]);
      if (!isFinite(value)) continue;
      const after = t.slice(re.lastIndex, re.lastIndex + 24);
      let currency = m[1] ? m[1].includes("\xA3") ? "GBP" : "EUR" : void 0;
      const nextWords = (after.match(/[\p{L}%]+/gu) || []).slice(0, 2);
      const coded = currencyOf(nextWords[0] || "");
      if (coded) currency = coded;
      let percent = !!m[3];
      if (/^\s*(?:\*\*)?\s*(?:percent|procent)/iu.test(after)) percent = true;
      if (/^\s*(?:mln|million|milion\p{L}*)(?![\p{L}])/iu.test(after)) value *= 1e6;
      if (!currency) {
        for (const w of nextWords) {
          const c = currencyOf(w);
          if (c) {
            currency = c;
            break;
          }
          if (!/^(?:mln|million|milion\p{L}*|net|netto)$/iu.test(w)) break;
        }
      }
      let kind;
      if (percent) kind = "percent";
      else if (currency) kind = "money";
      else if (Number.isInteger(value) && value >= 1990 && value <= 2100 && !/[.,\s]/.test(m[2])) kind = "year";
      else if (value >= 1e3 || /[.,]\d{2}$/.test(m[2])) kind = "money";
      else kind = "plain";
      if (kind === "money" && !currency && defaultCurrency) currency = defaultCurrency;
      const word = (after.match(/^[\s*)]*([\p{L}]+)/u)?.[1] || "").toLowerCase() || void 0;
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
  function tierOf(file) {
    const f = file.toLowerCase();
    if (/(email|e-mail|mail|correspondence|korespond)/.test(f)) return 3;
    if (/(crm|pipeline|notes|notatk)/.test(f)) return 2;
    return 1;
  }
  var ABBREV = /* @__PURE__ */ new Set(["ul", "mec", "dr", "nr", "sp", "st", "no", "r", "tj", "np", "ok", "ref", "al", "prof", "pkt", "ust", "art", "vs", "inc", "e.g", "i.e", "o.o", "z"]);
  function splitSentences(line) {
    const out = [];
    let start = 0;
    const re = /[.!?](?=\s+[\p{Lu}\d"*(\[>„])/gu;
    let m;
    while (m = re.exec(line)) {
      const before = line.slice(start, m.index);
      const lastWord = (before.match(/([\p{L}.]+)$/u)?.[1] || "").toLowerCase();
      if (ABBREV.has(lastWord) || lastWord.length === 1 || /^[\s\d.*#>-]*$/.test(before)) continue;
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
      return rawTokens(text);
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
        this.readParties(raw);
        const lines = raw.split("\n");
        const isSinglePage = /invoice|faktura/i.test(file);
        const headerLines = lines.filter((l) => l.trim() && l.trim() !== "---").slice(0, 2);
        const docContext = rawTokens(headerLines.join(" "));
        const docSections = [];
        let title = file.replace(/\.md$/, "");
        let buf = [];
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
    buildUnits(sec, docContext) {
      const context = /* @__PURE__ */ new Set([...rawTokens(sec.title), ...docContext]);
      const lines = sec.content.split("\n");
      const units = [];
      let header = null;
      let headerCurrency;
      const push = (text, tokenText, extraNumbers = [], defCur) => {
        const { numbers, extraTokens } = extractNumbers(text, defCur);
        const tokens = /* @__PURE__ */ new Set([...rawTokens(tokenText), ...extraTokens]);
        tokens.forEach((t) => this.vocabulary.add(t));
        units.push({
          file: sec.file,
          page: sec.page,
          tier: sec.tier,
          text,
          tokens,
          context,
          numbers: [...numbers, ...extraNumbers],
          negCues: negationCues(text),
          hedged: rawTokens(text).some(isHedge),
          // Table rows keep one scope (a status cell negates the whole record); prose is split
          // into clauses so that "under English law (which governs the contract) the letter has
          // NO effect" does not negate "the contract is governed by English law".
          clauses: (text.startsWith("|") ? [text] : text.split(/[,;:()—–]|\s-\s/)).map((c) => ({ tokens: new Set(rawTokens(c)), cues: negationCues(c) }))
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
          const headerYears = header ? extractNumbers(header.join(" | ")).numbers.filter((n) => n.kind === "year") : [];
          push(line, labelled, headerYears, defCur);
          continue;
        }
        header = null;
        for (const s of splitSentences(line)) {
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
    readParties(raw) {
      const re = /\*\*([^*\n]+)\*\*,[^\n]*?\(\s*"([^"]+)"(?:\s+or\s+"([^"]+)")?\s*\)/g;
      let m;
      while (m = re.exec(raw)) {
        const name = m[1].trim();
        if (this.parties.some((p) => p.name === name)) continue;
        const toks = /* @__PURE__ */ new Set();
        for (const part of [m[1], m[2], m[3] || ""]) for (const t of rawTokens(part)) if (!LEGAL_FORM.has(t)) toks.add(t);
        const names = [...toks].filter((t) => !ROLE_GROUPS.some((g) => g.some((r) => t.startsWith(r))));
        for (const t of [...toks]) for (const g of ROLE_GROUPS) if (g.some((r) => t.startsWith(r))) g.forEach((r) => toks.add(r));
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
      const cleaned = claim.replace(QUANT_RE, " ");
      const toks = rawTokens(cleaned);
      const negative = toks.some(isNegCue);
      const content = /* @__PURE__ */ new Set();
      for (const t of toks) {
        if (UNPREFIX[t]) content.add(UNPREFIX[t]);
        if (isNegCue(t) || STOPWORDS.has(t) || GENERIC.has(t) || currencyOf(t)) continue;
        if (this.parties.some((p) => p.tokens.includes(t))) continue;
        content.add(t);
      }
      const alts = /* @__PURE__ */ new Map();
      for (const t of content) {
        const members = [`~${t}`];
        for (const g of GROUPS) if (g.some((mem) => memberMatch(mem, t))) members.push(...g);
        const hits = /* @__PURE__ */ new Set();
        for (const v of this.vocabulary) if (members.some((mem) => memberMatch(mem, v))) hits.add(v);
        alts.set(t, hits);
      }
      const weight = /* @__PURE__ */ new Map();
      const N = this.units.length || 1;
      for (const [t, hits] of alts) {
        const df = this.units.filter((u) => [...u.tokens].some((x) => hits.has(x))).length;
        weight.set(t, Math.log(1 + N / (df + 1)));
      }
      const claimCur = currenciesIn(claim);
      const { numbers } = extractNumbers(claim, claimCur.size === 1 ? [...claimCur][0] : void 0);
      const cased = claim.match(TOKEN_RE) || [];
      const proper = [...new Set(cased.slice(1).filter((w) => /^\p{Lu}/u.test(w)).map((w) => w.toLowerCase()))].filter((t) => content.has(t) && !MONTHS_EN.includes(t) && !WEEKDAYS_EN.includes(t));
      for (const t of content) if (DECISIVE_GROUPS.some((g) => g.some((m) => memberMatch(m, t))) && !proper.includes(t)) proper.push(t);
      return { content: [...content], alts, weight, numbers, negative, hedged: toks.some(isHedge), parties: this.partiesIn(toks), proper };
    }
    scoreUnit(f, u) {
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
      const sectionYears = sectionUnits.flatMap((s) => s.numbers.filter((n2) => n2.kind === "year"));
      for (const n2 of f.numbers) {
        const same = u.numbers.filter((x) => sameValue(x.value, n2.value));
        const curClash = n2.currency && same.length > 0 && same.every((x) => x.currency && x.currency !== n2.currency);
        const found = same.some((x) => !(n2.currency && x.currency && x.currency !== n2.currency)) || n2.kind === "year" && sectionYears.some((y) => y.value === n2.value);
        if (curClash) {
          numbersOk = false;
          conflictCodes.push(REASON_CODES.CURRENCY_MISMATCH);
          conflicts.push(MESSAGES[this.lang].reason_currency_mismatch(fmt(n2), fmt(same[0])));
          continue;
        }
        if (found) continue;
        numbersOk = false;
        const rivals = u.numbers.filter((x) => {
          if (n2.kind === "money") return x.kind === "money";
          if (n2.kind === "percent") return x.kind === "percent";
          if (n2.kind === "year") return x.kind === "year";
          return x.kind === "plain" && !f.numbers.some((c) => sameValue(c.value, x.value)) && !!n2.word && !!x.word && this.sameConcept(n2.word, x.word);
        });
        if (rivals.length > 0) {
          conflictCodes.push(REASON_CODES.NUMBER_MISMATCH);
          conflicts.push(MESSAGES[this.lang].reason_value_mismatch(fmt(n2), rivals.map(fmt).join(" / ")));
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
      return { unit: u, unitNegative, coverage, unitCoverage, contraCoverage, supportCoverage, supportUnitCoverage, valueConflict: conflicts.length > 0, full, matched, missing, numbersOk, conflicts, conflictCodes, polarityFlip, score };
    }
    /** Two words denote the same concept (stem match or same lexicon group). */
    sameConcept(a, b) {
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
    combine(f, seed) {
      const isField = (u) => u.text.startsWith("|") || u.text.length <= 160 && /^[\s*>-]*\*{0,2}[\p{L}][\p{L}\s/()&-]{1,40}:\*{0,2}\s/u.test(u.text);
      const pool = (this.sectionUnits.get(`${seed.unit.file}#${seed.unit.page}`) || []).filter((u) => isField(u) && !this.partyMismatch(f.parties, u) && u.negCues.length > 0 === f.negative && !(u.hedged && u.negCues.length === 0 && !f.hedged));
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
      const f = this.features(claim);
      if (f.content.length === 0) {
        return {
          status: "UNSUPPORTED",
          claim,
          explanation: MESSAGES[this.lang].unsupported_no_terms(),
          reasonCodes: [REASON_CODES.NO_CHECKABLE_TERMS]
        };
      }
      const minFull = Math.min(2, f.content.length);
      const scored = this.units.map((u) => this.scoreUnit(f, u)).sort((a, b) => b.score - a.score);
      const supports = scored.filter((s) => s.supportCoverage >= THRESHOLDS.support && s.supportUnitCoverage >= THRESHOLDS.supportUnit && s.full >= minFull && s.numbersOk && s.conflicts.length === 0 && !s.polarityFlip && !this.partyMismatch(f.parties, s.unit) && f.proper.every((t) => s.matched.includes(t) || s.matched.includes(`${t}^`)) && !(s.unit.hedged && s.unit.negCues.length === 0 && !f.hedged));
      const polarityContra = (s) => s.polarityFlip && (!f.negative || !s.unit.hedged && s.numbersOk && s.contraCoverage >= THRESHOLDS.support);
      const contras = scored.filter((s) => s.contraCoverage >= THRESHOLDS.contradict && s.full >= minFull && (s.valueConflict || polarityContra(s)));
      const pick = (arr) => arr.slice().sort((a, b) => a.unit.tier - b.unit.tier || b.score - a.score)[0];
      const bestS = pick(supports);
      const overrides = (c) => !bestS || c.unit.tier < bestS.unit.tier && c.contraCoverage >= THRESHOLDS.override * bestS.contraCoverage || c.unit.tier === bestS.unit.tier && polarityContra(c) && c.numbersOk && c.contraCoverage >= bestS.contraCoverage - THRESHOLDS.tieMargin;
      const bestC = pick(contras.filter(overrides));
      const contraReasonDetails = (c) => {
        const codes = [];
        const reasons = [];
        if (polarityContra(c)) {
          codes.push(REASON_CODES.POLARITY_MISMATCH, REASON_CODES.NEGATED);
          if (f.negative) {
            reasons.push(MESSAGES[this.lang].reason_polarity_claim_neg());
          } else {
            const cues = c.unit.clauses.flatMap((k) => k.cues).slice(0, 3).join(", ") || c.unit.negCues.slice(0, 3).join(", ");
            reasons.push(MESSAGES[this.lang].reason_polarity_source_neg(cues));
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
          conflicting = this.toEvidence(bestS, [MESSAGES[this.lang].reason_lower_tier_match()]);
        }
        return {
          status: "CONTRADICTED",
          claim,
          file: ev.file,
          page: ev.page,
          tier: ev.tier,
          quote: ev.quote,
          explanation: MESSAGES[this.lang].contradicted_by_source({
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
            reasons: [MESSAGES[this.lang].reason_compound_claim(ordered.length)]
          };
          return {
            status: "GROUNDED",
            claim,
            file: ev.file,
            page: ev.page,
            tier: ev.tier,
            quote: ev.quote,
            explanation: MESSAGES[this.lang].grounded_multi({
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
          explanation: MESSAGES[this.lang].grounded_single({
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
        if (near.coverage < THRESHOLDS.support) {
          reasonCodes.push(REASON_CODES.LOW_COVERAGE);
          why.push(MESSAGES[this.lang].reason_low_coverage(Math.round(near.coverage * 100), near.missing.join(", ")));
        }
        if (!near.numbersOk) {
          reasonCodes.push(REASON_CODES.NUMBERS_MISSING);
          why.push(MESSAGES[this.lang].reason_numbers_missing());
        }
        if (near.polarityFlip) {
          reasonCodes.push(REASON_CODES.POLARITY_MISMATCH);
          why.push(MESSAGES[this.lang].reason_polarity_mismatch());
        }
      }
      if (!nearest) {
        reasonCodes.push(REASON_CODES.NO_RELEVANT_DOCUMENTS);
      }
      return {
        status: "UNSUPPORTED",
        claim,
        explanation: nearest ? MESSAGES[this.lang].unsupported_nearest({ file: nearest.file, page: nearest.page, why }) : MESSAGES[this.lang].unsupported_no_docs(),
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
