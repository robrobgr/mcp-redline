/**
 * mcp-redline — Polish language pack.
 */
import { MESSAGES } from "../messages.js";
import type { LanguagePack, AntonymPair, Currency } from "./index.js";

const TOKEN_RE = /[\p{L}][\p{L}\p{N}]*(?:[-'’][\p{L}\p{N}]+)*/gu;
const B = "(?<![\\p{L}\\p{N}])";
const E = "(?![\\p{L}\\p{N}])";

function tokenize(text: string): string[] {
  const out: string[] = [];
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

function isAscii(s: string): boolean {
  return /^[a-z0-9'-]+$/.test(s);
}

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

const STOPWORDS = new Set([
  "w", "we", "z", "ze", "za", "do", "od", "po", "o", "i", "a", "oraz", "lub", "na", "nad", "pod", "przy", "przez", "dla", "jako",
  "się", "to", "ten", "ta", "te", "tego", "tej", "tym", "który", "która", "które", "których", "którym", "że", "czy", "jak", "jego",
  "jej", "ich", "r", "rok", "roku", "wynosi", "wyniósł", "wyniosła", "wyniosło", "wyniosły", "wynoszą", "była", "był", "było",
  "były", "została", "został", "zostało", "zostały", "jest", "są", "ma", "mają", "miał", "miała", "wszystkie", "wszystkich",
  "też", "także", "co", "tak", "nr", "sp", "o.o", "ramach", "tytułu", "wysokości", "terenie", "między", "dnia", "obrotowy",
  "gbp", "eur", "pln", "zł", "euro", "każdy", "każda", "każde", "podstawie",
]);

const GENERIC = new Set([
  "spółka", "spółki", "dostawca", "dostawcy", "dostawcę", "dostawcą",
  "zamawiający", "zamawiającego", "zamawiającemu", "zamawiającym", "zamawiających",
  "klient", "klienta", "klientowi", "firma", "strona", "strony",
  "ltd", "limited", "plc", "inc", "gmbh",
]);

const CONTRACT_TERMS = new Set([
  "umowa", "umowy", "umowie", "umowę", "umową",
  "aneks", "aneksu", "aneksem", "aneksie",
  "załącznik", "załącznika", "załączniku", "załącznikiem",
  "protokół", "protokołu", "protokołem", "protokole",
  "etap", "etapu", "etapem", "etapie", "etapy", "etapów",
  "harmonogram", "harmonogramu", "harmonogramem",
  "art", "artykuł", "artykułu", "paragraf", "ustęp", "punkt", "sekcja",
]);

const LEGAL_FORMS = new Set(["sp", "o.o", "z", "s.a", "ltd", "limited", "plc", "inc", "gmbh", "b.v", "sas", "llc"]);

const WEEKDAYS = ["poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"];

const ABBREVIATIONS = new Set(["ul", "mec", "dr", "nr", "sp", "r", "tj", "np", "ok", "ref", "al", "prof", "pkt", "ust", "art", "o.o", "z"]);

const NEG_EXACT = new Set([
  "nie", "nigdy", "brak", "braku", "żaden", "żadna", "żadne", "żadnych", "żadnego", "żadnej",
]);

const NEG_PREFIX = [
  "odrzuc", "wykreśl", "zakaz", "nieważn", "bezpodstawn", "wyłączy", "wyłączon", "nieprawdziw", "niedopuszczaln", "wykluczon",
];

const UNPREFIX: Record<string, string> = {};

const LEGAL_FORMULAS_NOT_NEGATION = [
  `${B}nie\\s+(?:mniej|więcej|później|wcześniej)\\s+niż${E}`,
  `${B}nie\\s+przekracz\\p{L}*`,
  `${B}pod\\s+rygorem\\s+nieważno\\p{L}*`,
  `${B}(?:po\\s+|oraz\\s+|i\\s+)?bezskuteczn\\p{L}*\\s+upływ\\p{L}*`,
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
  { pos: "wyłączn", neg: "niewyłączn" },
  { pos: "określon", neg: "nieoznaczon", alts: ["nieokreślon"] },
  { pos: "oznaczon", neg: "nieoznaczon" },
  { pos: "istotn", neg: "nieistotn" },
  { pos: "odpłatn", neg: "nieodpłatn" },
  { pos: "zbywaln", neg: "niezbywaln" },
  { pos: "ograniczon", neg: "nieograniczon" },
];

const MODALITY_CUES = [
  "może", "mogą", "ma prawo", "mają prawo", "uprawnion", "dopuszcz", "zezwala",
  "zobowiąz", "powinien", "powinna", "powinni", "musi", "muszą", "będzie", "zostanie", "zostaną",
  "do decyzji", "rozważa", "rozważają",
];

const COMPLETED_EVENT_CUES = [
  "naliczył", "naliczyła", "naliczono", "rozwiązał", "rozwiązała", "rozwiązano",
  "wypowiedział", "wypowiedziała", "wypowiedziano", "usunął", "usunęła", "usunięto",
  "zażądał", "zażądała", "zażądano", "wprowadził", "wprowadziła", "wprowadzono",
  "podpisał", "podpisała", "podpisano", "doręczył", "doręczyła", "doręczono",
  "odebrał", "odebrała", "odebrano", "odebrany", "odebrana", "odebrane",
  "zapłacił", "zapłaciła", "zapłacono", "nałożył", "nałożyła", "nałożono",
  "przyznał", "przyznała", "przyznano", "zaakceptował", "zaakceptowała", "zaakceptowano",
  "wykreślono", "stwierdzono", "wystawiono", "wystawiona", "wystawiony",
];

function isModalText(text: string): boolean {
  const lower = text.toLowerCase();
  return MODALITY_CUES.some((c) => lower.includes(c));
}

function isFactualText(text: string): boolean {
  const lower = text.toLowerCase();
  if (COMPLETED_EVENT_CUES.some((c) => lower.includes(c))) return true;
  if (/(?<![\p{L}\p{N}])dochodzi(?![\p{L}\p{N}])/u.test(lower) &&
      !/(?<![\p{L}\p{N}])(?:może|ma\s+prawo)\s+dochodzić(?![\p{L}\p{N}])/u.test(lower)) {
    return true;
  }
  return false;
}

const HEDGE_PREFIXES = ["zawnioskow", "wnios", "propozyc", "proponu", "twierdz", "rzekom", "domag", "żąda", "żądan"];

function isHedge(t: string): boolean {
  return HEDGE_PREFIXES.some((p) => t.startsWith(p));
}

function extractRoles(text: string): { subject?: "supplier" | "customer"; recipient?: "supplier" | "customer" } {
  const lower = text.toLowerCase();
  let subject: "supplier" | "customer" | undefined;
  let recipient: "supplier" | "customer" | undefined;

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

const CANONICAL_MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

const MONTH_NAMES: Record<string, number> = {
  stycznia: 0, styczeń: 0,
  lutego: 1, luty: 1,
  marca: 2, marzec: 2,
  kwietnia: 3, kwiecień: 3,
  maja: 4, maj: 4,
  czerwca: 5, czerwiec: 5,
  lipca: 6, lipiec: 6,
  sierpnia: 7, sierpień: 7,
  września: 8, wrzesień: 8,
  października: 9, październik: 9,
  listopada: 10, listopad: 10,
  grudnia: 11, grudzień: 11,
};

function parseNumber(s: string): number {
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

const CURRENCY_PATTERNS: Array<[RegExp, Currency]> = [
  [/^(?:gbp|funt\p{L}*)$/iu, "GBP"],
  [/^(?:eur|euro)$/iu, "EUR"],
  [/^(?:pln|zł|złotych)$/iu, "PLN"],
];

const LEXICON_GROUPS: Record<string, string[]> = {
  contract: ["umow", "kontrakt", "msa"],
  master: ["ramow"],
  signed: ["podpis", "zawar"],
  fee: ["opłat", "stawk", "=cen", "=cena", "=ceny", "=cenę", "koszt"],
  annual: ["roczn"],
  quarter: ["kwartał", "kwartaln", "=rat", "=raty", "=ratach", "=ratami"],
  month: ["miesięc", "miesiąc"],
  availability: ["dostępn"],
  guarantee: ["gwarant"],
  penalty: ["=kara", "=kary", "=karę", "=karą", "=kar", "karn"],
  outage: ["awari", "niedostępn"],
  invoice: ["faktur"],
  increase: ["podnie", "podwyż", "indeks", "waloryz"],
  inflation: ["inflac", "cpi"],
  revenue: ["przychod", "sprzedaż"],
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
  court: ["=sąd", "=sądy", "sądu", "sądów"],
  jurisdiction: ["jurysdyk"],
  governed: ["podleg"],
  exclusive: ["wyłączn", "jedyn", "=tylko"],
  unilateral: ["jednostron"],
  annex: ["aneks"],
  vehicle: ["pojazd", "naczep", "=aut", "=auta", "=aut."],
  fleet: ["flot"],
  expansion: ["rozszerz"],
  license: ["licenc", "subskryp", "abonament"],
  data: ["=dane", "=danych"],
  telemetry: ["telemetr", "telematy"],
  renewal: ["odnow", "przedłuż"],
  automatic: ["automat"],
  refund: ["zwrot", "zwrac", "gotówk"],
  deadline: ["termin", "upływ"],
  payment: ["płatn", "zapłac", "opłacon", "uregulow", "uiszcz"],
  board: ["zarząd"],
  proposal: ["propozyc", "wniosek", "wnioskow"],
  total: ["pełn", "całkowit", "łączn"],
  period: ["okres"],
  initial: ["początkow"],
  days: ["=dni", "=dnia"],
  value: ["wartoś"],
  amount: ["kwot"],
  cover: ["obejm", "przewid"],
  allowed: ["dopuszcz"],
  effect: ["obowiąz"],
  expire: ["kończ"],
  remedy: ["wyciąg"],
  service: ["service", "serwis", "usług"],
  credit: ["credit", "credits", "kredyt", "rabat"],
  maximum: ["maksym"],
  support: ["wsparc"],
  office: ["biur"],
  warsaw: ["warszaw"],
  tax: ["=vat"],
  blocked: ["zablokow"],
  refrigerated: ["chłodnicz"],
  gateway: ["bramk"],
  terminate: ["wypowiedz", "rozwiąza"],
  accept: ["akcept", "zaakcept"],
  require: ["wymag", "wymóg", "rygor", "rygorem", "obowiązk"],
  notice: ["oświadczen", "zawiadomien", "deklaracj"],
  deliver: ["doręcz", "doręczen"],
  receive: ["odebra", "odebran", "odbior"],
  issue: ["wystawi", "wystawion"],
  definite: ["określon", "oznaczon"],
  month_01: ["stycz"],
  month_02: ["lut"],
  month_03: ["=marca", "=marzec"],
  month_04: ["kwiec", "kwietn"],
  month_05: ["=maja", "=maj"],
  month_06: ["czerw"],
  month_07: ["lipc", "lipiec"],
  month_08: ["sierp"],
  month_09: ["wrześ", "wrzes"],
  month_10: ["paździer"],
  month_11: ["listopad"],
  month_12: ["grud"],
};

export const plPack: LanguagePack = {
  lang: "pl",
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
    supplier: ["dostawc"],
    customer: ["zamawiając", "klient"],
    extractRoles,
  },
  monthNames: MONTH_NAMES,
  canonicalMonths: CANONICAL_MONTHS,
  numberFormat: {
    parseNumber,
    currencyPatterns: CURRENCY_PATTERNS,
    millionPattern: /^\s*(?:mln|milion\p{L}*)(?![\p{L}])/iu,
    percentWordPattern: /^\s*(?:\*\*)?\s*procent/iu,
    netWordPattern: /^(?:mln|milion\p{L}*|netto)$/iu,
    clauseRefWords: ["pkt", "punkt\\p{L}*", "§"],
    clauseConjunctions: ["i", "oraz", ","],
    headerDatePattern: /(?:z\s+dnia\s+|dnia\s+)(\d{1,2})\s+([a-ząćęłńóśźż]+)\s+(20\d{2})/iu,
    replacementPattern: /(?:zastępuje(?:\s+się)?|zastąpion)/i,
    normalizeUnitWord: (word) => (word && word.startsWith("dni") ? "dni" : word),
  },
  lexiconGroups: LEXICON_GROUPS,
  decisiveConceptIds: ["germany", "ireland", "london", "england", "wales", "poland", "warsaw"],
  messages: MESSAGES.pl,
};
