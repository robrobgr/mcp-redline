// Bilingual {en, pl} content for the web demo. Consumed by scripts/build-web-data.js.
// Rule: every user-visible string exists in both languages; claims themselves stay verbatim in their original language
// (the eval corpus is bilingual on purpose), and the other language is shown only as a reference translation.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

// P01-P10: hand-written scenarios with full bilingual narratives.
export const P_SCENARIOS = JSON.parse(fs.readFileSync(path.join(here, 'p-scenarios.json'), 'utf-8'));

// Corpus document summaries and display titles.
export const DOC_TEXT = {
  MSA: {
    summary: {
      en: 'Master agreement with a precedence clause (Sec 14.2) and a ban on price indexation (Sec 8.2).',
      pl: 'Główna umowa ramowa z klauzulą nadrzędności (Sec 14.2) i zakazem waloryzacji cen (Sec 8.2).'
    }
  },
  Schedule_B: {
    summary: {
      en: 'SLA guarantees (99.8%), service credits and the AWS Dublin/London architecture.',
      pl: 'Gwarancje SLA (99.8%), kredyty serwisowe i architektura AWS Dublin/London.'
    }
  },
  Invoice: {
    summary: {
      en: 'Invoice INV-2024-1108 for Q4 2024 for £12,000 GBP with a Barclays account.',
      pl: 'Faktura INV-2024-1108 za Q4 2024 na kwotę £12,000 GBP z rachunkiem Barclays.'
    }
  },
  Email: {
    summary: {
      en: 'Disputed thread on 7.5% UK CPI inflation — a unilateral demand with no legal force.',
      pl: 'Wątek sporny dotyczący inflacji 7.5% UK CPI — jednostronne żądanie bez mocy prawnej.'
    }
  },
  Rachunek: {
    summary: {
      en: 'Official Profit and Loss Statement for 2024 (revenue 48.52M PLN, net profit 4.21M PLN).',
      pl: 'Oficjalny Rachunek Zysków i Strat za 2024 r. (Przychody 48.52M PLN, Zysk netto 4.21M PLN).'
    },
    title: { en: 'Profit and Loss Statement 2024 PLN', pl: 'Rachunek Zysków i Strat 2024 PLN' }
  },
  Protokol: {
    summary: {
      en: 'Board minutes: the 50k EUR penalty was rejected and a £600 GBP credit approved.',
      pl: 'Protokół z posiedzenia Zarządu: odrzucenie kary 50k EUR, zatwierdzenie rabatu £600 GBP.'
    },
    title: { en: 'Board Minutes VeloNova 11 2024', pl: 'Protokół Zarządu VeloNova 11 2024' }
  },
  CRM: {
    summary: {
      en: 'Register of sales opportunities and annexes — the 300-vehicle fleet proposal was rejected (OPP-2024-089).',
      pl: 'Rejestr szans sprzedaży i aneksów — odrzucona propozycja floty 300 aut (OPP-2024-089).'
    }
  }
};

// Claim translations for D01-D31 and H01-H23: [original language, translation into the other language].
export const CLAIM_TR = {
  D01: ['en', 'Umowa ramowa została zawarta dnia 15 stycznia 2023 r.'],
  D02: ['pl', 'The annual subscription fee is £48,000.00 GBP net.'],
  D03: ['pl', 'The fee is invoiced quarterly in four instalments of £12,000.00 GBP.'],
  D04: ['pl', 'The agreement runs for 36 months and ends on 14 January 2026.'],
  D05: ['en', 'Automatyczne przedłużenie umowy jest wyłączone.'],
  D06: ['pl', 'The agreement is governed by the law of England and Wales.'],
  D07: ['pl', 'The guaranteed monthly service availability is 99.8%.'],
  D08: ['pl', 'Apex does not maintain compute clusters in Germany.'],
  D09: ['en', 'Żadna ze stron nie może jednostronnie zmieniać opłat abonamentowych.'],
  D10: ['pl', 'The supplier has no right to raise prices unilaterally.'],
  D11: ['pl', 'The Board unanimously rejected the proposal of a 50,000 EUR contractual penalty.'],
  D12: ['pl', 'The Service Credit for the November 2024 outage was £600.00 GBP.'],
  D13: ['pl', 'The annex expanding the fleet to 300 vehicles was never signed.'],
  D14: ['pl', 'Net sales revenue in 2024 was 48,520,000 PLN.'],
  D15: ['pl', 'Invoice INV-2024-1108 has a payment due date of 1 November 2024.'],
  D16: ['pl', 'The maximum Service Credit per quarter is £1,800.00 GBP.'],
  D17: ['pl', 'The licence covers up to 180 vehicles.'],
  D18: ['pl', 'The telemetry gateway outage blocked 32 refrigerated trailers.'],
  D19: ['en', 'Dostawca może podnieść ceny o 7,5% UK CPI od stycznia 2025 r.'],
  D20: ['en', 'Roczna opłata wynosi £48,000.00 EUR.'],
  D21: ['pl', 'The guaranteed availability is 99.9%.'],
  D22: ['pl', 'The master agreement was signed on 15 January 2021.'],
  D23: ['pl', 'The agreement is governed by Polish law.'],
  D24: ['en', 'Dane telemetryczne są hostowane we Frankfurcie w Niemczech.'],
  D25: ['pl', "VeloNova's net profit for 2024 was 4,310,000.00 PLN."],
  D26: ['pl', 'Contractual penalties for outages are permitted under the MSA.'],
  D27: ['pl', 'The MSA provides for a contractual penalty for each day of delay.'],
  D28: ['pl', 'VeloNova owns a fleet of 50 seagoing ships.'],
  D29: ['pl', 'VeloNova plans to list on the stock exchange in 2025.'],
  D30: ['pl', 'The CISO of Apex Meridian is named Dr. Aris Thorne.'],
  D31: ['pl', 'The supplier provides 24/7 support in Polish.'],
  H01: ['en', 'Początkowy okres obowiązywania umowy wynosi trzydzieści sześć miesięcy.'],
  H02: ['pl', 'The courts of England and Wales have exclusive jurisdiction over disputes arising from the agreement.'],
  H03: ['en', 'Archiwum odtwarzania awaryjnego jest hostowane w AWS Londyn.'],
  H04: ['en', 'Faktura INV-2024-1108 została w całości opłacona 28 października 2024 r.'],
  H05: ['pl', 'The VAT rate on invoice INV-2024-1108 is 0%.'],
  H06: ['en', 'Service Credits nie podlegają zwrotowi w gotówce.'],
  H07: ['pl', "Apex's subscription cost in 2024 was 246,840.00 PLN."],
  H08: ['pl', 'The agreement with ThermoKing Telematics is worth 32,400 EUR per year.'],
  H09: ['en', 'Podstawowe przetwarzanie telemetrii jest hostowane w AWS Dublin w Irlandii.'],
  H10: ['en', 'Łączna odpowiedzialność dostawcy jest ograniczona do 100% opłat zapłaconych w ciągu poprzednich 12 miesięcy.'],
  H11: ['pl', 'From 2025 the quarterly fee is £12,900.00 GBP.'],
  H12: ['en', 'Automatyczne odnowienie umowy jest dozwolone.'],
  H13: ['en', 'Service Credits mogą być zwracane w formie płatności gotówkowych.'],
  H14: ['pl', 'The licence covers 300 vehicles.'],
  H15: ['en', 'Początkowy okres obowiązywania umowy wynosi 24 miesiące.'],
  H16: ['pl', 'Invoice INV-2024-1108 is for £12,900.00 GBP.'],
  H17: ['en', 'Faktura INV-2024-1108 pozostaje niezapłacona.'],
  H18: ['en', 'Dostawca przyznał Service Credit w wysokości 50 000 EUR za awarię we Frankfurcie.'],
  H19: ['en', 'Apex Meridian ma biuro w Warszawie.'],
  H20: ['en', 'Umowa MSA zawiera klauzulę zakazu konkurencji.'],
  H21: ['en', 'Apex Meridian posiada certyfikat ISO 27001.'],
  H22: ['en', 'Każda ze stron może wypowiedzieć umowę z 30-dniowym wypowiedzeniem.'],
  H23: ['pl', "VeloNova's revenue in 2025 was 55 million PLN."]
};

// English reference translations of corpus passages quoted from Polish-language source documents.
// The verbatim original stays in the source file and in the document viewer.
export const QUOTE_EN = {
  P06: 'The Board **unanimously rejected the proposal to impose a contractual penalty of 50,000 EUR**.',
  P10: 'The Legal Department was instructed to formally request from Apex Meridian a Service Credit of **£600.00 GBP** when settling the invoice for Q1 2025.',
  D11: 'The Board **unanimously rejected the proposal to impose a contractual penalty of 50,000 EUR**.',
  D12: 'The Legal Department was instructed to formally request from Apex Meridian a Service Credit of **£600.00 GBP** when settling the invoice for Q1 2025.',
  D13: '| **OPP-2024-089** | **Apex Meridian Technologies Ltd** | **Fleet Expansion to 300 vehicles (Annex 2 Proposal)** | **95,000.00** | **EUR** | 18.09.2024 | Closed Lost / Abandoned | **STALLED / REJECTED** | **Expansion offer rejected by the Board in Q3 2024.** The supplier demanded settlement in EUR at an unfavourable exchange rate and tried to impose a CPI clause. The annex was never signed. Only the original limit of 180 vehicles applies. |',
  D14: '| **A.** | **Net revenue from sales and equivalent** | **48,520,000.00** | **41,200,000.00** |',
  D18: 'On 14 November 2024, between 08:30 and 12:30, the Apex Meridian telemetry gateway was unavailable, which blocked the dispatch of 32 refrigerated trailers carrying pharmaceutical cargo on the Frankfurt–Rotterdam route.',
  H07: '* In fiscal year 2024 the total subscription cost of the Apex Meridian Fleet Engine platform (supplier: Apex Meridian Technologies Ltd, United Kingdom) was **£48,000.00 GBP**, which, converted into Polish currency at the average NBP rates from the days preceding the issue of the quarterly invoices, was equivalent to **246,840.00 PLN**.'
};

// Claim kind, derived from what the claim is, not from what the engine returned.
export const KIND_LABEL = {
  fact: {
    en: (tier) => `Fact in Tier ${tier}`,
    pl: (tier) => `Fakt w Tier ${tier}`
  },
  trap: { en: () => 'Trap', pl: () => 'Pułapka' },
  out_of_corpus: { en: () => 'Out of corpus', pl: () => 'Spoza korpusu' }
};

export function kindOf(expected) {
  return expected === 'GROUNDED' ? 'fact' : expected === 'CONTRADICTED' ? 'trap' : 'out_of_corpus';
}

const RISK = { fact: 'LOW', trap: 'HIGH', out_of_corpus: 'MEDIUM' };
export const riskFor = (kind) => RISK[kind];

// Generic templates for D01-D31 / H01-H23. ctx = { kind, text, amount, file, page, verdict, quote }
// `text` is the claim in the language being rendered; `quote` is the evidence passage in that language.
const T = {
  en: {
    llmTitle: {
      fact: 'Standard LLM: plausible confirmation with no citation',
      trap: 'Standard LLM: confident acceptance of a false claim',
      out_of_corpus: 'Standard LLM: speculation where the corpus is silent'
    },
    llmResponse: (c) => `“Yes — ${c.text}”`,
    llmDefects: {
      fact: [
        'No file, page or verbatim quote to check the statement against',
        'Wording may drift from the governing text (rounded figures, merged clauses)'
      ],
      trap: [
        'The statement contradicts the governing document',
        'Sounds certain but cannot point to a source'
      ],
      out_of_corpus: [
        'The corpus contains no evidence either way',
        'The model fills the gap with plausible-sounding detail'
      ]
    },
    financialExposure: {
      fact: 'Low risk: the claim is correct, but nothing checkable stands behind it',
      trap: 'High risk: acting on a claim the governing documents contradict',
      out_of_corpus: 'Medium risk: a statement presented as fact with nothing behind it'
    },
    value: (c) => (c.amount ? `${c.amount} (figure stated in the claim)` : 'No direct monetary amount in the claim'),
    cfo: {
      fact: 'No direct loss: the fact is consistent with the governing documents. The remaining risk is acting on it without a citation.',
      trap: 'Accepting a statement the governing documents contradict invites disputes, unwarranted payments or a weakened legal position.',
      out_of_corpus: 'A fabricated fact in a report or a negotiation cannot be defended once someone asks for the source.'
    },
    failSafeCost: '~$8 / 30 PLN (ESTIMATE: 5 min audit review)',
    draft: (c) => `Yes — ${c.text}`,
    intercept: (c) =>
      c.verdict === 'GROUNDED'
        ? `tools/call: verify -> GROUNDED in ${c.file}, page ${c.page}. Exact quote returned.`
        : c.verdict === 'CONTRADICTED'
          ? `tools/call: verify -> CONTRADICTED by ${c.file}, page ${c.page}. The governing source bars the claim.`
          : 'tools/call: verify -> UNSUPPORTED. No source in the corpus supports the claim; the engine refuses.',
    corrected: (c) =>
      c.verdict === 'GROUNDED'
        ? c.quote
        : c.verdict === 'CONTRADICTED'
          ? `REJECTED: the claim is contradicted by ${c.file}.`
          : 'REFUSED: no source in the corpus supports this claim.',
    failSafeExplanation: (c) =>
      c.verdict === 'GROUNDED'
        ? 'If the engine were unsure it would return UNSUPPORTED, and a reviewer would open the cited file.'
        : 'The refusal stops the statement from entering a report or a decision; a reviewer checks the cited source.',
    riskAsymmetry: {
      fact: 'Type II error (Redline): a few minutes of review. Type I error (LLM): acting on an unchecked statement.',
      trap: 'Type II error (Redline): a few minutes of review. Type I error (LLM): a decision built on a false statement.',
      out_of_corpus: 'Type II error (Redline): a few minutes of review. Type I error (LLM): a made-up fact in circulation.'
    }
  },
  pl: {
    llmTitle: {
      fact: 'Standard LLM: wiarygodne potwierdzenie bez cytatu',
      trap: 'Standard LLM: pewne przyjęcie fałszywego twierdzenia',
      out_of_corpus: 'Standard LLM: spekulacja tam, gdzie korpus milczy'
    },
    llmResponse: (c) => `„Tak — ${c.text}”`,
    llmDefects: {
      fact: [
        'Brak pliku, strony i dosłownego cytatu, z którym można porównać twierdzenie',
        'Brzmienie może odbiegać od tekstu nadrzędnego (zaokrąglone liczby, połączone klauzule)'
      ],
      trap: [
        'Twierdzenie jest sprzeczne z dokumentem nadrzędnym',
        'Brzmi pewnie, ale nie wskazuje źródła'
      ],
      out_of_corpus: [
        'Korpus nie zawiera dowodów w żadną stronę',
        'Model wypełnia lukę wiarygodnie brzmiącymi szczegółami'
      ]
    },
    financialExposure: {
      fact: 'Niskie ryzyko: twierdzenie jest poprawne, ale nic sprawdzalnego za nim nie stoi',
      trap: 'Wysokie ryzyko: działanie na podstawie twierdzenia, któremu przeczą dokumenty nadrzędne',
      out_of_corpus: 'Średnie ryzyko: twierdzenie podane jako fakt bez żadnego oparcia'
    },
    value: (c) => (c.amount ? `${c.amount} (kwota wskazana w twierdzeniu)` : 'Brak bezpośredniej kwoty w twierdzeniu'),
    cfo: {
      fact: 'Brak bezpośredniej straty: fakt jest spójny z dokumentami nadrzędnymi. Pozostaje ryzyko działania na nim bez cytatu.',
      trap: 'Przyjęcie twierdzenia, któremu przeczą dokumenty nadrzędne, grozi sporem, nienależnymi płatnościami lub osłabieniem pozycji prawnej.',
      out_of_corpus: 'Zmyślonego faktu w raporcie lub negocjacjach nie da się obronić, gdy ktoś zapyta o źródło.'
    },
    failSafeCost: '~30 PLN (SZACUNEK: 5 min audytu)',
    draft: (c) => `Tak — ${c.text}`,
    intercept: (c) =>
      c.verdict === 'GROUNDED'
        ? `tools/call: verify -> GROUNDED w ${c.file}, strona ${c.page}. Zwrócono dosłowny cytat.`
        : c.verdict === 'CONTRADICTED'
          ? `tools/call: verify -> CONTRADICTED przez ${c.file}, strona ${c.page}. Źródło nadrzędne wyklucza twierdzenie.`
          : 'tools/call: verify -> UNSUPPORTED. Żadne źródło w korpusie nie potwierdza twierdzenia; silnik odmawia.',
    corrected: (c) =>
      c.verdict === 'GROUNDED'
        ? c.quote
        : c.verdict === 'CONTRADICTED'
          ? `ODRZUCONO: twierdzeniu przeczy ${c.file}.`
          : 'ODMOWA: żadne źródło w korpusie nie potwierdza tego twierdzenia.',
    failSafeExplanation: (c) =>
      c.verdict === 'GROUNDED'
        ? 'Gdyby silnik miał wątpliwość, zwróciłby UNSUPPORTED, a recenzent otworzyłby wskazany plik.'
        : 'Odmowa nie dopuszcza twierdzenia do raportu ani decyzji; recenzent sprawdza wskazane źródło.',
    riskAsymmetry: {
      fact: 'Błąd typu II (Redline): kilka minut weryfikacji. Błąd typu I (LLM): działanie na niesprawdzonym twierdzeniu.',
      trap: 'Błąd typu II (Redline): kilka minut weryfikacji. Błąd typu I (LLM): decyzja oparta na fałszywym twierdzeniu.',
      out_of_corpus: 'Błąd typu II (Redline): kilka minut weryfikacji. Błąd typu I (LLM): zmyślony fakt w obiegu.'
    }
  }
};

export function genericContent(lang, ctx) {
  const t = T[lang];
  const k = ctx.kind;
  return {
    subtype: KIND_LABEL[k][lang](ctx.tier || 1),
    prompt: ctx.text,
    llmTitle: t.llmTitle[k],
    llmResponse: t.llmResponse(ctx),
    llmDefects: t.llmDefects[k],
    financialExposure: t.financialExposure[k],
    financialExposureValue: t.value(ctx),
    financialExposureCfo: t.cfo[k],
    financialFailSafeCost: t.failSafeCost,
    agentTrace: {
      llmDraft: t.draft(ctx),
      mcpIntercept: t.intercept(ctx),
      correctedOutput: t.corrected(ctx)
    },
    perspective3Analysis: {
      failSafeExplanation: t.failSafeExplanation(ctx),
      riskAsymmetry: t.riskAsymmetry[k]
    }
  };
}
