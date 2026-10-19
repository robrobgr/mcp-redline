/**
 * mcp-redline — Polish language pack.
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
  const compRe = /(?<![\p{L}\p{N}])(etap\p{L}*|faz\p{L}*|aneks\p{L}*|załącznik\p{L}*)\s+(?:nr\.?\s*)?(i{1,3}|iv|vi?|[1-9])(?![\p{L}\p{N}])/gu;
  let m: RegExpExecArray | null;
  while ((m = compRe.exec(lower))) {
    const rawHead = m[1];
    const rawIdx = m[2];
    const idx = ROMAN_MAP[rawIdx] || rawIdx;
    const head = rawHead.startsWith("etap") || rawHead.startsWith("faz")
      ? "etap"
      : rawHead.startsWith("aneks")
        ? "aneks"
        : "zalacznik";
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

const NIE_ROOT_PREFIXES = [
  "niemc", "niemie", "niemal", "niestet", "nieb", "niech", "niekied",
  "nieco", "niektór", "niebaw", "niedawn", "niedług", "niedźwied", "niewiast", "niewol", "niec",
];

function stripNegPrefix(token: string): string | undefined {
  if (UNPREFIX[token]) return UNPREFIX[token];
  if (token.startsWith("nie") && token.length >= 7 && !NIE_ROOT_PREFIXES.some((p) => token.startsWith(p))) {
    return token.slice(3);
  }
  return undefined;
}

const PREP_NEGATION_WORDS = new Set(["bez"]);

const PREP_NEG_SKIP = new Set([
  "żaden", "żadna", "żadne", "żadnych", "żadnego", "żadnej",
  "jakichkolwiek", "jakiejkolwiek", "jakiegokolwiek",
  "dodatkowych", "dodatkowego", "dodatkowej",
  "uprzedniej", "uprzedniego", "osobnej", "osobnego", "odrębnej", "odrębnego",
]);

function extractPrepNegatedTerms(text: string): Set<string> {
  const cleaned = text.replace(LEGAL_FORMULAS_REGEX, " ");
  const out = new Set<string>();
  for (const clause of cleaned.split(/[,;:()—–]|\s-\s/)) {
    const toks = tokenize(clause).filter((t) => !/^(?:etap|aneks|zalacznik)_\d+$/.test(t));
    for (let i = 0; i < toks.length; i++) {
      if (toks[i] === "bez") {
        let collected = 0;
        for (let j = i + 1; j < toks.length && collected < 2; j++) {
          const w = toks[j];
          if (w === "bez") break;
          if (STOPWORDS.has(w) || PREP_NEG_SKIP.has(w)) continue;
          if (isFactualText(w) || isModalText(w)) break;
          out.add(w);
          collected++;
        }
      }
    }
  }
  return out;
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

const MODALITY_PREFIX_CUES = [
  "uprawnion", "dopuszcz", "zezwala", "zobowiąz", "rozważa",
];

const MODALITY_EXACT_OR_PHRASE_CUES = [
  "może", "mogą", "ma prawo", "mają prawo", "przysługuje",
  "powinien", "powinna", "powinni", "musi", "muszą", "ma obowiązek", "mają obowiązek",
  "będzie", "będą", "zostanie", "zostaną",
  "jest płatne", "jest płatny", "jest płatna", "są płatne",
  "płatne w terminie", "płatny w terminie", "płatna w terminie",
  "termin płatności", "podlega zapłacie",
  "usunie", "usuną", "zawiadomi", "zawiadomią", "powiadomi", "powiadomią",
  "dokona", "dokonają", "zgłosi", "zgłoszą", "zapłaci", "zapłacą",
  "wystawi", "wystawią", "doręczy", "doręczą", "przekaże", "przekażą",
  "zrealizuje", "zrealizują", "zapewni", "zapewnią", "udostępni", "udostępnią",
  "zwróci", "zwrócą", "wypłaci", "wypłacą", "wyznaczy",
  "do decyzji", "planuje", "zamierza",
];

const MODALITY_REGEX = new RegExp(
  [
    ...MODALITY_PREFIX_CUES.map((p) => `${B}${p}\\p{L}*${E}`),
    ...MODALITY_EXACT_OR_PHRASE_CUES.map((p) => `${B}${p.replace(/\s+/g, "\\s+")}${E}`),
  ].join("|"),
  "iu"
);

const MODALITY_CUES = [...MODALITY_PREFIX_CUES, ...MODALITY_EXACT_OR_PHRASE_CUES];

const COMPLETED_EVENT_CUES = [
  "naliczył", "naliczyła", "naliczono", "rozwiązał", "rozwiązała", "rozwiązano",
  "wypowiedział", "wypowiedziała", "wypowiedziano", "usunął", "usunęła", "usunięto",
  "zażądał", "zażądała", "zażądano", "wprowadził", "wprowadziła", "wprowadzono",
  "podpisał", "podpisała", "podpisano", "doręczył", "doręczyła", "doręczono",
  "odebrał", "odebrała", "odebrano", "odebrany", "odebrana", "odebrane",
  "zapłacił", "zapłaciła", "zapłacono", "nałożył", "nałożyła", "nałożono",
  "przyznał", "przyznała", "przyznano", "zaakceptował", "zaakceptowała", "zaakceptowano",
  "wykreślono", "stwierdzono", "wystawiono", "wystawiona", "wystawiony",
  "zasądzono", "wysłano", "zgłosił", "zgłosiła", "zgłoszono", "udzielił", "udzielono",
];

const IMPERSONAL_NON_VERBS = new Set([
  "jedno", "okno", "sukno", "włókno", "piękno", "rzekomo", "wolno", "wiadomo",
  "osobno", "równo", "pewno", "dawno", "trudno", "późno", "żyto", "sito", "myto", "złoto", "błoto",
]);

const PAST_TENSE_EXCLUSIONS = new Set([
  "był", "była", "było", "byli", "były",
  "został", "została", "zostało", "zostali", "zostały",
  "miał", "miała", "miało", "mieli", "miały",
  "mógł", "mogła", "mogło", "mogli", "mogły",
  "musiał", "musiała", "musiało", "musieli", "musiały",
  "wyniósł", "wyniosła", "wyniosło", "wyniosły",
  "siła", "skala", "wola", "rola", "kontrola", "szkoła", "reguła", "formuła", "klauzula", "uchwała", "siedziba",
  "kwartał", "protokół", "artykuł", "tytuł", "kapitał", "udział", "oddział", "podział", "materiał", "oryginał",
  "zespół", "sygnał", "szczegół", "ogół", "kanał", "finał", "ideał", "portal", "lokal", "szpital",
  "cała", "cało", "mała", "mało", "stała", "biała",
]);

function isModalText(text: string): boolean {
  return MODALITY_REGEX.test(text);
}

function isFactualText(text: string): boolean {
  const lower = text.toLowerCase();
  if (COMPLETED_EVENT_CUES.some((c) => lower.includes(c))) return true;
  // Passive past: został/została/zostało/zostały + passive participle (-ny/-na/-ne/-ni/-ty/-ta/-te/-ci)
  if (/(?<![\p{L}\p{N}])(?:został|została|zostało|zostały)\s+(?:[\p{L}]+\s+)?[\p{L}]{3,}(?:n[yiae]|t[yiae])(?![\p{L}\p{N}])/iu.test(lower)) {
    return true;
  }
  if (/(?<![\p{L}\p{N}])[\p{L}]{3,}(?:n[yiae]|t[yiae])\s+(?:został|została|zostało|zostały)(?![\p{L}\p{N}])/iu.test(lower)) {
    return true;
  }
  const words = lower.match(/[\p{L}]+/gu) || [];
  for (const w of words) {
    // Impersonal past (-ano, -ono, -iono, -ęto, -yto, -ito)
    if (w.length >= 5 && /(?:ano|ono|iono|ęto|yto|ito)$/u.test(w) && !IMPERSONAL_NON_VERBS.has(w)) {
      return true;
    }
    // Active 3rd-person past (-ł, -ła, -ło, -li)
    if (
      w.length >= 4 &&
      /(?:ał|ała|ało|ali|ił|iła|iło|ili|ył|yła|yło|yli|ął|ęła|ęło|ęli|edł|zła|zło|zli)$/u.test(w) &&
      !PAST_TENSE_EXCLUSIONS.has(w) &&
      !w.endsWith("by")
    ) {
      return true;
    }
  }
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

const DATIVE_RECIPIENT_PREP_OR_VERB =
  "(?:udziel\\p{L}*|przysługuj\\p{L}*|przekaz\\p{L}*|przekaż\\p{L}*|doręcz\\p{L}*|wypłac\\p{L}*|zapłac\\p{L}*|zwróc\\p{L}*|zwrac\\p{L}*|zleca\\p{L}*|powierz\\p{L}*|zgłasz\\p{L}*|zgłosi\\p{L}*|wobec|względem|na\\s+rzecz)";

function extractRoles(text: string): {
  subject?: "supplier" | "customer";
  recipient?: "supplier" | "customer";
  genitive?: "supplier" | "customer";
  isPermissive?: boolean;
} {
  const lower = text.toLowerCase();
  let subject: "supplier" | "customer" | undefined;
  let recipient: "supplier" | "customer" | undefined;
  let genitive: "supplier" | "customer" | undefined;

  if (/(?<![\p{L}\p{N}])(?:to\s+)?(?:dostawca|wykonawca)(?![\p{L}\p{N}])/u.test(lower)) {
    subject = "supplier";
  } else if (/(?<![\p{L}\p{N}])(?:to\s+)?(?:zamawiający|klient)(?![\p{L}\p{N}])/u.test(lower)) {
    subject = "customer";
  }

  const supRecipRe = new RegExp(
    `(?<![\\p{L}\\p{N}])${DATIVE_RECIPIENT_PREP_OR_VERB}\\s+(?:[\\p{L}]+\\s+)?(?:dostawcy|wykonawcy)(?![\\p{L}\\p{N}])`,
    "u"
  );
  const custRecipRe = new RegExp(
    `(?<![\\p{L}\\p{N}])(?:(?:zamawiającemu|klientowi)|${DATIVE_RECIPIENT_PREP_OR_VERB}\\s+(?:[\\p{L}]+\\s+)?(?:zamawiającego|klienta))(?![\\p{L}\\p{N}])`,
    "u"
  );

  if (supRecipRe.test(lower)) {
    recipient = "supplier";
  } else if (custRecipRe.test(lower)) {
    recipient = "customer";
  }

  const withoutRecip = lower.replace(supRecipRe, " ").replace(custRecipRe, " ");

  const hasSupGen = /(?<![\p{L}\p{N}])(?:dostawcy|dostawcę|dostawcą|wykonawcy|wykonawcę|wykonawcą)(?![\p{L}\p{N}])/u.test(withoutRecip);
  const hasCustGen = /(?<![\p{L}\p{N}])(?:zamawiającego|zamawiającym|klienta|klientem)(?![\p{L}\p{N}])/u.test(withoutRecip);

  if (hasSupGen && !hasCustGen) {
    genitive = "supplier";
  } else if (hasCustGen && !hasSupGen) {
    genitive = "customer";
  }

  const isPermissive = /(?<![\p{L}\p{N}])(?:może|mogą|ma\s+prawo|mają\s+prawo|uprawnion\p{L}*)(?![\p{L}\p{N}])/u.test(lower);

  return { subject, recipient, genitive, isPermissive };
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
  receive: ["odebra", "odebran", "odbior", "odbiór"],
  issue: ["wystawi", "wystawion"],
  definite: ["określon", "oznaczon"],
  defect: ["=wad", "=wada", "=wady", "=wadę", "=wadą", "=wadami", "=wadach", "usterk"],
  reservation: ["zastrzeż"],
  suspend: ["wstrzym"],
  consent: ["=zgod", "=zgoda", "=zgody", "=zgodę", "=zgodą"],
  subcontractor: ["podwykonaw"],
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
  stripNegPrefix,
  prepNegationWords: PREP_NEGATION_WORDS,
  extractPrepNegatedTerms,
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
