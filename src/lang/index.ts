/**
 * mcp-redline — LanguagePack interface and language detection/registry.
 */
import { SupportedLang, MessageCatalog } from "../messages.js";
import { enPack } from "./en.js";
import { plPack } from "./pl.js";

export type Currency = "GBP" | "EUR" | "PLN";

export interface AntonymPair {
  pos: string;
  neg: string;
  alts?: string[];
}

export interface RoleLexicon {
  supplier: string[];
  customer: string[];
  extractRoles: (text: string) => { subject?: "supplier" | "customer"; recipient?: "supplier" | "customer" };
}

export interface NumberFormat {
  parseNumber: (s: string) => number;
  currencyPatterns: Array<[RegExp, Currency]>;
  millionPattern: RegExp;
  percentWordPattern: RegExp;
  netWordPattern: RegExp;
  clauseRefWords: string[];
  clauseConjunctions: string[];
  headerDatePattern: RegExp;
  replacementPattern: RegExp;
  normalizeUnitWord: (word: string | undefined) => string | undefined;
}

export interface LanguagePack {
  lang: SupportedLang;
  tokenize: (text: string) => string[];
  stemMatch: (a: string, b: string) => boolean;
  stopwords: Set<string>;
  generic: Set<string>;
  contractTerms: Set<string>;
  legalForms: Set<string>;
  weekdays: string[];
  abbreviations: Set<string>;
  negExact: Set<string>;
  negPrefix: string[];
  unprefix: Record<string, string>;
  legalFormulasNotNegation: string[];
  legalFormulasRegex: RegExp;
  isNegCue: (token: string) => boolean;
  negationCues: (text: string) => string[];
  stripNegPrefix: (token: string) => string | undefined;
  prepNegationWords: Set<string>;
  extractPrepNegatedTerms: (text: string) => Set<string>;
  antonymPairs: AntonymPair[];
  modalityCues: string[];
  completedEventCues: string[];
  isModalText: (text: string) => boolean;
  isFactualText: (text: string) => boolean;
  hedgePrefixes: string[];
  isHedge: (token: string) => boolean;
  roleLexicon: RoleLexicon;
  monthNames: Record<string, number>;
  canonicalMonths: string[];
  numberFormat: NumberFormat;
  lexiconGroups: Record<string, string[]>;
  decisiveConceptIds: string[];
  messages: MessageCatalog;
}

export const LANGUAGE_PACKS: Record<SupportedLang, LanguagePack> = {
  en: enPack,
  pl: plPack,
};

export function getLanguagePack(lang: SupportedLang): LanguagePack {
  return LANGUAGE_PACKS[lang] || enPack;
}

const PL_DIACRITICS_RE = /[ąćęłńóśźż]/i;

/**
 * Detects whether a document or claim is primarily Polish or English.
 */
export function detectLanguage(text: string, fallback: SupportedLang = "en"): SupportedLang {
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

export { enPack, plPack };
