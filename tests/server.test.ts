import { describe, it, before, after } from "node:test";
import * as assert from "node:assert";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { RedlineEngine } from "../src/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const corpusDir = path.resolve(__dirname, "../../corpus");

describe("mcp-redline — corpus loading, search, quote", () => {
  const engine = new RedlineEngine(corpusDir);

  it("list_sources returns all 7 documents with authority tiers", () => {
    const sources = engine.listSources();
    assert.strictEqual(sources.length, 7);
    const tier = (f: string) => sources.find((s) => s.file === f)?.tier;
    assert.strictEqual(tier("01_Apex_VeloNova_MSA_2023.md"), 1);
    assert.strictEqual(tier("07_CRM_Export_Enterprise_Contracts_2024.md"), 2);
    assert.strictEqual(tier("04_Email_Thread_Inflation_Dispute_Nov2024.md"), 3);
  });

  it("search returns sentence-level verbatim quotes", () => {
    const results = engine.search("SLA 99.8% availability", 3);
    assert.ok(results.length > 0);
    assert.strictEqual(results[0].file, "02_Schedule_B_Service_Levels_and_Credits.md");
    assert.ok(results[0].quote.includes("99.8%"));
    assert.ok(results[0].quote.length < 300, "quote should be a sentence, not a whole section");
  });

  it("quote returns a section verbatim", () => {
    const q = engine.quote("03_Invoice_INV-2024-1108.md", 1);
    assert.ok(q && q.quote.includes("Apex Meridian Technologies Ltd"));
  });

  it("every quote returned by verify is a verbatim substring of its source file", () => {
    const claims = [
      "Roczna opłata abonamentowa wynosi £48,000.00 GBP netto.",
      "Supplier may raise prices by 7.5% UK CPI from January 2025.",
      "Aneks rozszerzający flotę do 300 pojazdów nigdy nie został podpisany.",
      "Faktura INV-2024-1108 za czwarty kwartał 2024 r. opiewa na kwotę £12,000.00 GBP netto płatną na rachunek Barclays Bank.",
    ];
    for (const c of claims) {
      const r = engine.verify(c);
      assert.ok(r.quote && r.file, `expected a quote for: ${c}`);
      const src = fs.readFileSync(path.join(corpusDir, r.file!), "utf-8");
      for (const fragment of r.quote!.split(" […] ")) {
        assert.ok(src.includes(fragment), `not verbatim: ${fragment}`);
      }
    }
  });
});

describe("mcp-redline — verify on the demo corpus", () => {
  const engine = new RedlineEngine(corpusDir);
  const v = (c: string) => engine.verify(c);

  it("GROUNDED for facts, in PL and EN, including negative facts", () => {
    assert.strictEqual(v("Customer shall pay Supplier an annual base platform fee of £48,000.00 GBP net").status, "GROUNDED");
    assert.strictEqual(v("Gwarantowane SLA miesięcznej dostępności wynosi 99.8%").status, "GROUNDED");
    assert.strictEqual(v("Przychody netto ze sprzedaży VeloNova Logistics w 2024 wyniosły 48 520 000,00 PLN").status, "GROUNDED");
    assert.strictEqual(v("Dostawca nie ma prawa jednostronnie podnieść cen.").status, "GROUNDED");
    assert.strictEqual(v("Zarząd jednogłośnie odrzucił propozycję kary umownej 50 000 EUR.").status, "GROUNDED");
  });

  it("CONTRADICTED for the four traps — also when paraphrased in English", () => {
    const expectContra = (c: string, file?: string) => {
      const r = v(c);
      assert.strictEqual(r.status, "CONTRADICTED", `${c} -> ${r.status}: ${r.explanation}`);
      if (file) assert.strictEqual(r.file, file);
    };
    expectContra("Apex Meridian ma prawo do jednostronnego podniesienia cen o wskaźnik inflacji 7.5% UK CPI", "01_Apex_VeloNova_MSA_2023.md");
    expectContra("Supplier may raise prices by 7.5% UK CPI from January 2025.", "01_Apex_VeloNova_MSA_2023.md");
    expectContra("VeloNova nałożyła na dostawcę karę umowną w wysokości 50 000 EUR za awarię we Frankfurcie");
    expectContra("Podpisano aneks rozszerzający flotę do 300 pojazdów o wartości 95 000 EUR");
    expectContra("Telemetry data is hosted in Frankfurt, Germany.");
  });

  it("CONTRADICTED on wrong numbers, years and currencies", () => {
    const rCur = v("The annual fee is £48,000.00 EUR.");
    assert.strictEqual(rCur.status, "CONTRADICTED");
    assert.ok(rCur.reasonCodes.includes("CURRENCY_MISMATCH"));

    const rNum = v("Gwarantowana dostępność wynosi 99.9%.");
    assert.strictEqual(rNum.status, "CONTRADICTED");
    assert.ok(rNum.reasonCodes.includes("NUMBER_MISMATCH"));

    assert.strictEqual(v("Zysk netto VeloNova za 2024 wyniósł 4 310 000,00 PLN.").status, "CONTRADICTED");
    assert.strictEqual(v("Umowa ramowa została podpisana 15 stycznia 2021 r.").status, "CONTRADICTED");
  });

  it("an e-mail (Tier 3) cannot ground a claim that the contract (Tier 1) contradicts", () => {
    const r = v("Supplier may raise prices by 7.5% UK CPI from January 2025.");
    assert.strictEqual(r.status, "CONTRADICTED");
    assert.strictEqual(r.tier, 1);
    assert.strictEqual(r.conflicting?.tier, 3);
    assert.ok(r.reasonCodes.includes("HIGHER_TIER_CONFLICT"));
  });

  it("a proposal is not a fact: the COO's penalty request does not ground 'penalty was imposed'", () => {
    assert.notStrictEqual(v("VeloNova nałożyła na dostawcę karę umowną w wysokości 50 000 EUR.").status, "GROUNDED");
  });

  it("party binding: a fact about one party does not ground a claim about the other", () => {
    // Warsaw is VeloNova's seat, not Apex's (regression for holdout H19)
    assert.notStrictEqual(v("Apex Meridian has an office in Warsaw.").status, "GROUNDED");
    assert.notStrictEqual(v("VeloNova Logistics has its registered office in London.").status, "GROUNDED");
    assert.strictEqual(v("Apex Meridian has its registered office in London.").status, "GROUNDED");
  });

  it("negation scope is the clause, not the sentence", () => {
    // e-mail: "under English law (which governs the contract) their letter has NO effect"
    assert.strictEqual(v("Umowa podlega prawu angielskiemu").status, "GROUNDED");
    assert.notStrictEqual(v("Umowa podlega prawu polskiemu.").status, "GROUNDED");
  });

  it("an affirmative mention does not contradict a true negative claim", () => {
    assert.strictEqual(v("Aneks na 300 aut nie został podpisany").status, "GROUNDED");
    assert.strictEqual(v("Apex Meridian nie ma prawa do jednostronnej indeksacji cen o UK CPI").status, "GROUNDED");
  });

  it("UNSUPPORTED for claims the corpus is silent about", () => {
    const r = v("VeloNova Logistics posiada flotę 50 statków morskich pływających pod banderą panamską");
    assert.strictEqual(r.status, "UNSUPPORTED");
    assert.strictEqual(r.quote, undefined, "UNSUPPORTED must not present a quote as evidence");
    assert.ok(r.reasonCodes.includes("LOW_COVERAGE"));
    assert.strictEqual(v("CISO Apex Meridian nazywa się Dr. Aris Thorne.").status, "UNSUPPORTED");
  });
});

describe("mcp-redline — bilingual parity (en vs pl)", () => {
  const engineEn = new RedlineEngine(corpusDir, "en");
  const enginePl = new RedlineEngine(corpusDir, "pl");

  it("produces identical status, reasonCodes, and quote across 5 claims, with different explanation", () => {
    const claims = [
      "Customer shall pay Supplier an annual base platform fee of £48,000.00 GBP net",
      "Supplier may raise prices by 7.5% UK CPI from January 2025.",
      "The annual fee is £48,000.00 EUR.",
      "Gwarantowana dostępność wynosi 99.9%.",
      "VeloNova Logistics posiada flotę 50 statków morskich.",
    ];

    for (const c of claims) {
      const rEn = engineEn.verify(c);
      const rPl = enginePl.verify(c);

      assert.strictEqual(rEn.status, rPl.status, `Status mismatch for: ${c}`);
      assert.deepStrictEqual(rEn.reasonCodes, rPl.reasonCodes, `ReasonCodes mismatch for: ${c}`);
      assert.strictEqual(rEn.quote, rPl.quote, `Quote mismatch for: ${c}`);
      assert.notStrictEqual(rEn.explanation, rPl.explanation, `Explanation should differ between languages for: ${c}`);
      assert.ok(rEn.reasonCodes.length > 0, `Expected reasonCodes for: ${c}`);
    }
  });
});

describe("mcp-redline — generality (no corpus-specific rules)", () => {
  let dir: string;
  let engine: RedlineEngine;
  before(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "redline-"));
    fs.writeFileSync(path.join(dir, "01_Lease_Agreement.md"),
      "# LEASE AGREEMENT\n\n### 1. RENT\n1.1 The monthly rent is fixed at 3,000 EUR.\n1.2 The landlord shall not increase the rent during the first 24 months.\n\n### 2. DEPOSIT\n2.1 The tenant paid a deposit of 6,000 EUR on 1 March 2024.\n");
    fs.writeFileSync(path.join(dir, "02_Email_Landlord.md"),
      "# EMAIL\n\nFrom the landlord: from June 2024 the monthly rent will be increased to 3,300 EUR.\n");
    engine = new RedlineEngine(dir);
  });
  after(() => fs.rmSync(dir, { recursive: true, force: true }));

  it("works on an unrelated corpus", () => {
    assert.strictEqual(engine.verify("The monthly rent is 3,000 EUR.").status, "GROUNDED");
    assert.strictEqual(engine.verify("The deposit was 6,000 EUR.").status, "GROUNDED");
    assert.strictEqual(engine.verify("The monthly rent is 3,000 PLN.").status, "CONTRADICTED");
    assert.strictEqual(engine.verify("The landlord may increase the rent.").status, "CONTRADICTED");
    assert.strictEqual(engine.verify("The monthly rent is 3,300 EUR.").status, "CONTRADICTED", "contract beats e-mail");
    assert.strictEqual(engine.verify("The apartment has a balcony with sea view.").status, "UNSUPPORTED");
  });
});
