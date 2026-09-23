import { describe, it } from "node:test";
import * as assert from "node:assert";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { RedlineEngine } from "../src/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const corpusDir = path.resolve(__dirname, "../../corpus");

describe("mcp-redline Server & Engine Tests", () => {
  const engine = new RedlineEngine(corpusDir);

  it("1. list_sources should return all corpus documents", () => {
    const sources = engine.listSources();
    assert.strictEqual(sources.length, 7, `Expected exactly 7 documents, got ${sources.length}`);
    const files = sources.map((s) => s.file);
    assert.ok(files.includes("01_Apex_VeloNova_MSA_2023.md"));
    assert.ok(files.includes("02_Schedule_B_Service_Levels_and_Credits.md"));
    assert.ok(files.includes("03_Invoice_INV-2024-1108.md"));
    assert.ok(files.includes("05_Rachunek_Zyskow_i_Strat_2024_PLN.md"));
  });

  it("2. search should return relevant quotes with location and score", () => {
    const results = engine.search("SLA 99.8%", 5);
    assert.ok(results.length > 0, "Search should return results for SLA 99.8%");
    assert.strictEqual(results[0].file, "02_Schedule_B_Service_Levels_and_Credits.md");
    assert.ok(results[0].quote.includes("99.8%"));
  });

  it("3. quote should return verbatim text without alteration", () => {
    const quote = engine.quote("03_Invoice_INV-2024-1108.md", 1);
    assert.ok(quote, "Quote should find section");
    assert.ok(quote.quote.includes("Apex Meridian Technologies Ltd"));
  });

  it("4. verify should return GROUNDED for factual claims backed by corpus", () => {
    // Factual claim 1: Annual subscription fee
    const res1 = engine.verify("Customer shall pay Supplier an annual base platform fee of £48,000.00 GBP net");
    assert.strictEqual(res1.status, "GROUNDED");
    assert.strictEqual(res1.file, "01_Apex_VeloNova_MSA_2023.md");
    assert.ok(res1.quote?.includes("£48,000.00 GBP"));

    // Factual claim 2: Guaranteed SLA
    const res2 = engine.verify("Gwarantowane SLA miesięcznej dostępności wynosi 99.8%");
    assert.strictEqual(res2.status, "GROUNDED");
    assert.strictEqual(res2.file, "02_Schedule_B_Service_Levels_and_Credits.md");

    // Factual claim 3: Financial statement net revenue
    const res3 = engine.verify("Przychody netto ze sprzedaży VeloNova Logistics w 2024 wyniosły 48 520 000,00 PLN");
    assert.strictEqual(res3.status, "GROUNDED");
    assert.strictEqual(res3.file, "05_Rachunek_Zyskow_i_Strat_2024_PLN.md");
  });

  it("5. verify MUST return UNSUPPORTED for claims outside corpus or contradicted by corpus (CRITICAL TEST)", () => {
    // TRAP-01: Claim of unilateral inflation indexation right
    const trap1 = engine.verify("Apex Meridian ma prawo do jednostronnego podniesienia cen o wskaźnik inflacji 7.5% UK CPI");
    assert.strictEqual(trap1.status, "UNSUPPORTED", "TRAP-01 must be UNSUPPORTED");
    assert.ok(trap1.explanation.length > 0);

    // TRAP-02: Claim of 50k EUR penalty imposed on supplier
    const trap2 = engine.verify("VeloNova nałożyła na dostawcę karę umowną w wysokości 50 000 EUR za awarię we Frankfurcie");
    assert.strictEqual(trap2.status, "UNSUPPORTED", "TRAP-02 must be UNSUPPORTED");

    // TRAP-03: Claim of signed expansion annex for 300 vehicles / 95,000 EUR
    const trap3 = engine.verify("Podpisano aneks rozszerzający flotę do 300 pojazdów o wartości 95 000 EUR");
    assert.strictEqual(trap3.status, "UNSUPPORTED", "TRAP-03 must be UNSUPPORTED");

    // TRAP-04: Claim of exclusive German hosting
    const trap4 = engine.verify("Wszystkie dane telemetryczne są przetwarzane wyłącznie na terenie Niemiec we Frankfurcie");
    assert.strictEqual(trap4.status, "UNSUPPORTED", "TRAP-04 must be UNSUPPORTED");

    // Completely fictional hallucination test
    const hallucination = engine.verify("VeloNova Logistics posiada flotę 50 statków morskich pływających pod banderą panamską");
    assert.strictEqual(hallucination.status, "UNSUPPORTED", "Hallucinated claim must be UNSUPPORTED");
    assert.ok(hallucination.explanation.includes("Brak"), "Explanation should indicate lack of support");
  });
});
