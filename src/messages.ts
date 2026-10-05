/**
 * mcp-redline — bilingual message catalog for engine explanations and reason codes.
 */

export type SupportedLang = "en" | "pl";

export const REASON_CODES = {
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
  EXACT_MATCH: "EXACT_MATCH",
} as const;

export type ReasonCode = (typeof REASON_CODES)[keyof typeof REASON_CODES];

export interface MessageCatalog {
  unsupported_no_terms: () => string;
  unsupported_no_docs: () => string;
  unsupported_nearest: (params: { file: string; page: number; why: string[] }) => string;
  contradicted_by_source: (params: {
    file: string;
    page: number;
    tier: number;
    reasons: string[];
    conflicting?: { file: string; tier: number };
  }) => string;
  grounded_single: (params: {
    file: string;
    page: number;
    tier: number;
    coverage: number;
    numbers?: string;
    conflicting?: { file: string; tier: number };
  }) => string;
  grounded_multi: (params: {
    file: string;
    page: number;
    tier: number;
    count: number;
    coverage: number;
    numbers?: string;
  }) => string;
  reason_polarity_claim_neg: () => string;
  reason_polarity_source_neg: (cues: string) => string;
  reason_currency_mismatch: (claim: string, source: string) => string;
  reason_value_mismatch: (claim: string, source: string) => string;
  reason_low_coverage: (pct: number, missing: string) => string;
  reason_numbers_missing: () => string;
  reason_polarity_mismatch: () => string;
  reason_compound_claim: (count: number) => string;
  reason_lower_tier_match: () => string;
  reason_lower_tier_claims_otherwise: (file: string, tier: number) => string;
}

export const MESSAGES: Record<SupportedLang, MessageCatalog> = {
  en: {
    unsupported_no_terms: () =>
      "Unsupported: claim does not contain concepts that can be checked in the corpus.",
    unsupported_no_docs: () =>
      "Unsupported by corpus: no document refers to this claim.",
    unsupported_nearest: ({ file, page, why }) =>
      `Insufficient evidential support. The nearest fragment (${file}, section ${page}) is inconclusive: ${why.join("; ")}.`,
    contradicted_by_source: ({ file, page, tier, reasons, conflicting }) =>
      `Contradicted by source ${file} (section ${page}, Tier ${tier}): ${reasons.join("; ")}.` +
      (conflicting
        ? ` A matching fragment exists in ${conflicting.file} (Tier ${conflicting.tier}), but an equal or higher tier source contradicts it.`
        : ""),
    grounded_single: ({ file, page, tier, coverage, numbers, conflicting }) =>
      `Grounded by verbatim fragment: ${file} (section ${page}, Tier ${tier}); concept coverage ${coverage}%` +
      (numbers ? `, numbers match (${numbers})` : "") +
      "." +
      (conflicting
        ? ` Note: lower tier source (${conflicting.file}, Tier ${conflicting.tier}) claims otherwise.`
        : ""),
    grounded_multi: ({ file, page, tier, count, coverage, numbers }) =>
      `Grounded by ${count} verbatim fragments: ${file} (section ${page}, Tier ${tier}); coverage ${coverage}%` +
      (numbers ? `, numbers match (${numbers})` : "") +
      ".",
    reason_polarity_claim_neg: () =>
      "polarity: claim denies, source affirms",
    reason_polarity_source_neg: (cues) =>
      `polarity: source denies/rejects (${cues})`,
    reason_currency_mismatch: (claim, source) =>
      `currency: claim ${claim}, source ${source}`,
    reason_value_mismatch: (claim, source) =>
      `value: claim ${claim}, source ${source}`,
    reason_low_coverage: (pct, missing) =>
      `concept coverage too low (${pct}%, missing: ${missing || "—"})`,
    reason_numbers_missing: () =>
      "numbers from claim do not appear in this fragment",
    reason_polarity_mismatch: () =>
      "polarity mismatch",
    reason_compound_claim: (count) =>
      `compound claim: grounded by ${count} fragments of the same section`,
    reason_lower_tier_match: () =>
      "matches source of lower or equal tier",
    reason_lower_tier_claims_otherwise: (file, tier) =>
      `lower tier source (${file}, Tier ${tier}) claims otherwise`,
  },
  pl: {
    unsupported_no_terms: () =>
      "Brak oparcia: twierdzenie nie zawiera pojęć, które można sprawdzić w korpusie.",
    unsupported_no_docs: () =>
      "Brak oparcia w korpusie: żaden dokument nie odnosi się do tego twierdzenia.",
    unsupported_nearest: ({ file, page, why }) =>
      `Brak wystarczającego oparcia. Najbliższy fragment (${file}, sekcja ${page}) nie rozstrzyga: ${why.join("; ")}.`,
    contradicted_by_source: ({ file, page, tier, reasons, conflicting }) =>
      `Sprzeczne ze źródłem ${file} (sekcja ${page}, Tier ${tier}): ${reasons.join("; ")}.` +
      (conflicting
        ? ` Zgodny fragment istnieje w ${conflicting.file} (Tier ${conflicting.tier}), ale źródło o wyższej lub równej randze mu przeczy.`
        : ""),
    grounded_single: ({ file, page, tier, coverage, numbers, conflicting }) =>
      `Potwierdzone dosłownym fragmentem: ${file} (sekcja ${page}, Tier ${tier}); pokrycie pojęć ${coverage}%` +
      (numbers ? `, liczby zgodne (${numbers})` : "") +
      "." +
      (conflicting
        ? ` Uwaga: źródło o niższej randze (${conflicting.file}, Tier ${conflicting.tier}) twierdzi inaczej.`
        : ""),
    grounded_multi: ({ file, page, tier, count, coverage, numbers }) =>
      `Potwierdzone ${count} dosłownymi fragmentami: ${file} (sekcja ${page}, Tier ${tier}); pokrycie ${coverage}%` +
      (numbers ? `, liczby zgodne (${numbers})` : "") +
      ".",
    reason_polarity_claim_neg: () =>
      "polaryzacja: twierdzenie zaprzecza, źródło twierdzi",
    reason_polarity_source_neg: (cues) =>
      `polaryzacja: źródło zaprzecza/odrzuca (${cues})`,
    reason_currency_mismatch: (claim, source) =>
      `waluta: twierdzenie ${claim}, źródło ${source}`,
    reason_value_mismatch: (claim, source) =>
      `wartość: twierdzenie ${claim}, źródło ${source}`,
    reason_low_coverage: (pct, missing) =>
      `za niskie pokrycie pojęć (${pct}%, brakuje: ${missing || "—"})`,
    reason_numbers_missing: () =>
      "liczby z twierdzenia nie występują w tym fragmencie",
    reason_polarity_mismatch: () =>
      "niezgodna polaryzacja",
    reason_compound_claim: (count) =>
      `twierdzenie złożone: potwierdzone ${count} fragmentami tej samej sekcji`,
    reason_lower_tier_match: () =>
      "zgodne ze źródłem o niższej lub równej randze",
    reason_lower_tier_claims_otherwise: (file, tier) =>
      `źródło o niższej randze (${file}, Tier ${tier}) twierdzi inaczej`,
  },
};
