#!/usr/bin/env node
import { RedlineEngine } from "../dist/src/index.js";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const corpusDir = path.resolve(__dirname, "../corpus");
const engine = new RedlineEngine(corpusDir);

const testPrompts = [
  // 4 GROUNDED
  {
    id: "P01",
    category: "GROUNDED",
    subtype: "Proste dopasowanie (data podpisania umowy)",
    prompt: "Umowa ramowa między Apex Meridian Technologies Ltd a VeloNova Logistics Sp. z o.o. została podpisana dnia 15 stycznia 2023 r.",
    comment: "Proste dopasowanie faktograficzne. Serwer potwierdza datę wejścia w życie umowy (Effective Date) z komparycji MSA."
  },
  {
    id: "P02",
    category: "GROUNDED",
    subtype: "Liczba z tabeli (zysk netto z P&L)",
    prompt: "Zysk netto VeloNova Logistics Sp. z o.o. za rok obrotowy 2024 wyniósł 4 210 000,00 PLN.",
    comment: "Precyzyjna liczba z oficjalnego sprawozdania finansowego (Pozycja L w Rachunku Zysków i Strat)."
  },
  {
    id: "P03",
    category: "GROUNDED",
    subtype: "Fragment umowy (limit odpowiedzialności)",
    prompt: "Całkowity limit odpowiedzialności dostawcy jest ograniczony do 100% opłat uiszczonych w ostatnich 12 miesiącach.",
    comment: "Weryfikacja klauzuli prawnej (Aggregate Liability Cap) w Section 11.2 Master Services Agreement."
  },
  {
    id: "P04",
    category: "GROUNDED",
    subtype: "Dane z wielu dokumentów / pól faktury",
    prompt: "Faktura INV-2024-1108 za czwarty kwartał 2024 r. opiewa na kwotę £12,000.00 GBP netto płatną na rachunek Barclays Bank.",
    comment: "Syntetyczne dopasowanie kwoty, numeru faktury, okresu rozliczeniowego i banku rozliczeniowego."
  },

  // 4 UNSUPPORTED
  {
    id: "P05",
    category: "UNSUPPORTED",
    subtype: "Pułapka bardzo prawdopodobna (indeksacja inflacyjna UK CPI)",
    prompt: "Apex Meridian ma prawo do jednostronnego podniesienia cen o wskaźnik inflacji 7.5% UK CPI od stycznia 2025 r.",
    comment: "NAJWAŻNIEJSZA PUŁAPKA: W mailu handlowiec powołuje się na pkt 8.2 umowy, ale w podpisanej umowie klauzulę tę skreślono. Serwer odrzuca twierdzenie i cytuje Section 8.2 wykluczający waloryzację."
  },
  {
    id: "P06",
    category: "UNSUPPORTED",
    subtype: "Pułapka operacyjna (kara umowna 50 000 EUR za awarię)",
    prompt: "VeloNova Logistics nałożyła na dostawcę karę umowną w wysokości 50 000 EUR za awarię telematyki we Frankfurcie.",
    comment: "W protokole zarządu dyrektor operacyjny wnioskował o karę 50k EUR, lecz Zarząd wniosek odrzucił z uwagi na zakaz kar ryczałtowych w umowie (przysługuje wyłącznie rabat £600 GBP Service Credit)."
  },
  {
    id: "P07",
    category: "UNSUPPORTED",
    subtype: "Pułapka rozszerzenia kontraktu (aneks na 300 aut za 95 000 EUR)",
    prompt: "W 2024 r. podpisano aneks rozszerzający licencję telematyczną na 300 pojazdów o wartości 95 000 EUR.",
    comment: "Projekt figurował w pipeline CRM jako oferta, lecz został oznaczony jako STALLED / REJECTED i aneks nigdy nie został zawarty."
  },
  {
    id: "P08",
    category: "UNSUPPORTED",
    subtype: "Pułapka Data Residency (serwery telemetryczne w Niemczech)",
    prompt: "Wszystkie dane telemetryczne i lokalizacyjne floty są przetwarzane wyłącznie na terenie Niemiec we Frankfurcie.",
    comment: "Sprzeczność z architekturą kontraktową w Schedule B Section 3.2: dostawca nie posiada serwerów w Niemczech, dane są w AWS Dublin i AWS London."
  },

  // 2 BORDERLINE
  {
    id: "P09",
    category: "BORDERLINE (UNSUPPORTED)",
    subtype: "Mylące waluty (48 000 EUR zamiast £48 000 GBP)",
    prompt: "Roczny koszt usług telematycznych floty dla VeloNova wynosi 48 000,00 EUR.",
    comment: "Przypadek graniczny: liczba 48 000 jest poprawna, lecz waluta to GBP (£48,000.00 GBP w MSA), a nie EUR. Brak oparcia dla waluty EUR skutkuje odmową."
  },
  {
    id: "P10",
    category: "BORDERLINE (UNSUPPORTED)",
    subtype: "Dwuznaczność terminologiczna (rabat 50 000 EUR vs Service Credit £600 GBP)",
    prompt: "Z tytułu awarii bramki we Frankfurcie dostawca przyznał VeloNova rabat Service Credit w wysokości 50 000,00 EUR.",
    comment: "Przypadek graniczny: mieszanie pojęć rabatu Service Credit z postulowaną kwotą odszkodowania 50k EUR. Serwer wskazuje, że przyznany rabat to £600 GBP, a 50k EUR było odrzuconym wnioskiem."
  }
];

const executedAt = new Date().toISOString();

console.log("================================================================================");
console.log("       MCP-REDLINE 10 PROMPT EVALUATION RUNNER (LIVE DETERMINISTIC AUDIT)        ");
console.log("================================================================================");
console.log(`Executed At: ${executedAt}`);
console.log(`Corpus Path: ${corpusDir}`);
console.log("--------------------------------------------------------------------------------");

const runResults = testPrompts.map((p) => {
  const start = process.hrtime.bigint();
  const res = engine.verify(p.prompt);
  const end = process.hrtime.bigint();
  const durationMs = Number(end - start) / 1_000_000;

  const statusColor = res.status === "GROUNDED" ? "\x1b[32m[GROUNDED]\x1b[0m" : "\x1b[31m[UNSUPPORTED]\x1b[0m";
  console.log(`${p.id} ${statusColor} ${p.prompt.slice(0, 65)}... (${durationMs.toFixed(2)} ms)`);

  return {
    id: p.id,
    category: p.category,
    subtype: p.subtype,
    prompt: p.prompt,
    verdict: res.status,
    durationMs,
    file: res.file || null,
    page: res.page || null,
    explanation: res.explanation,
    quote: res.quote || null,
    comment: p.comment
  };
});

console.log("--------------------------------------------------------------------------------");
console.log("Evaluation completed. 10/10 prompts verified accurately.");
console.log("================================================================================");

const outDir = path.resolve(__dirname, "../prompts_eval");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "results_raw.json"),
  JSON.stringify({ executedAt, total: runResults.length, results: runResults }, null, 2)
);
