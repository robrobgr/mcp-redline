import { describe, it } from "node:test";
import * as assert from "node:assert";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { RedlineEngine } from "../src/index.js";

describe("mcp-redline — Polish legal semantics (v1.4.0 failure classes)", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "redline-pl-test-"));

  const docContract = `
# UMOWA WDROŻENIOWA
*Data zawarcia: 10 stycznia 2024 r.*

## § 1 Przedmiot i licencja
1. Dostawca udziela Zamawiającemu licencji niewyłącznej na system ERP.
2. Licencja zostaje udzielona na czas nieoznaczony.

## § 2 Odpowiedzialność i kary
1. Zamawiający może naliczyć karę umowną w wysokości 10 000 PLN za zwłokę.
2. Zamawiający może dochodzić odszkodowania uzupełniającego na zasadach ogólnych.

## § 3 Okres wypowiedzenia
1. Każda ze Stron może wypowiedzieć Umowę z zachowaniem 90-dniowego okresu wypowiedzenia pod rygorem nieważności.
`;

  const docAnnex = `
# ANEKS NR 1 Z DNIA 15 CZERWCA 2024 R. DO UMOWY WDROŻENIOWEJ

## § 1 Zmiana okresu wypowiedzenia
1. W § 3 ust. 1 Umowy okres wypowiedzenia 90-dniowy zastępuje się okresem 60-dniowym.

## § 2 Terminy
1. Termin odbioru Etapu I wyznacza się na dzień 30 września 2024 r.
`;

  fs.writeFileSync(path.join(tmpDir, "01_Umowa_2024-01-10.md"), docContract.trim(), "utf-8");
  fs.writeFileSync(path.join(tmpDir, "02_Aneks_2024-06-15.md"), docAnnex.trim(), "utf-8");

  const engine = new RedlineEngine(tmpDir, "pl");

  it("Class 1: Modality vs fact — permission, future, and payment norms do not ground past/passive/impersonal facts", () => {
    // Contract allows penalty, but does not state it was charged
    const r1 = engine.verify("Zamawiający naliczył karę umowną w wysokości 10 000 PLN.");
    assert.strictEqual(r1.status, "UNSUPPORTED");
    assert.ok(r1.reasonCodes.includes("MODALITY_MISMATCH"));

    // Modal claim matches modal source
    const r2 = engine.verify("Zamawiający może dochodzić odszkodowania uzupełniającego.");
    assert.strictEqual(r2.status, "GROUNDED");

    // Inline snippet corpus (independent of dev claims)
    const maintEngine = new RedlineEngine(undefined, "pl");
    maintEngine.loadDocuments([
      {
        file: "01_Umowa_serwisowa_2025-02-01.md",
        content: [
          "# Umowa serwisowa z dnia 1 lutego 2025 r.",
          "1. Opłata abonamentowa jest płatna w terminie 21 dni od doręczenia faktury.",
          "2. Dostawca przekaże raport bezpieczeństwa w terminie 5 dni roboczych.",
          "3. Dostawca wdrożył poprawkę krytyczną modułu logowania w dniu 10 lutego 2025 r.",
        ].join("\n"),
      },
    ]);

    // Passive past participle against payment-term norm -> UNSUPPORTED (MODALITY_MISMATCH)
    const rPassive = maintEngine.verify("Opłata abonamentowa została zapłacona w terminie 21 dni.");
    assert.strictEqual(rPassive.status, "UNSUPPORTED");
    assert.ok(rPassive.reasonCodes.includes("MODALITY_MISMATCH"));

    // Impersonal past against future obligation -> UNSUPPORTED (MODALITY_MISMATCH)
    const rImpersonal = maintEngine.verify("Przekazano raport bezpieczeństwa w terminie 5 dni roboczych.");
    assert.strictEqual(rImpersonal.status, "UNSUPPORTED");
    assert.ok(rImpersonal.reasonCodes.includes("MODALITY_MISMATCH"));

    // Normative claim against normative payment term -> stays GROUNDED
    const rNormGrounded = maintEngine.verify("Opłata abonamentowa jest płatna w terminie 21 dni od doręczenia faktury.");
    assert.strictEqual(rNormGrounded.status, "GROUNDED");

    // Completed event claim against completed event source -> stays GROUNDED
    const rFactGrounded = maintEngine.verify("Dostawca wdrożył poprawkę krytyczną modułu logowania 10 lutego 2025 r.");
    assert.strictEqual(rFactGrounded.status, "GROUNDED");
  });

  it("Class 2: Role mismatch — subject/recipient inversion is refused", () => {
    // Inverted licensor/licensee roles
    const r = engine.verify("Zamawiający udziela Dostawcy licencji na system ERP.");
    assert.strictEqual(r.status, "CONTRADICTED");
    assert.ok(r.reasonCodes.includes("ROLE_MISMATCH"));
  });

  it("Class 3: Polish negation morphology & antonyms", () => {
    // niewyłączna vs wyłączna
    const rAntonym1 = engine.verify("Licencja na system ERP jest wyłączna.");
    assert.strictEqual(rAntonym1.status, "CONTRADICTED");
    assert.ok(rAntonym1.reasonCodes.includes("POLARITY_MISMATCH"));

    // nieoznaczony vs określony
    const rAntonym2 = engine.verify("Licencja została udzielona na czas określony.");
    assert.strictEqual(rAntonym2.status, "CONTRADICTED");
    assert.ok(rAntonym2.reasonCodes.includes("POLARITY_MISMATCH"));

    // 'pod rygorem nieważności' grounds affirmative requirement
    const rForm = engine.verify("Wypowiedzenie Umowy wymaga zachowania okresu pod rygorem nieważności.");
    assert.strictEqual(rForm.status, "GROUNDED");
  });

  it("Class 4: Chronological supersession — later amendment overrides earlier contract", () => {
    // 60 days confirmed in Aneks 1 (later doc)
    const rNew = engine.verify("Okres wypowiedzenia Umowy wynosi 60 dni.");
    assert.strictEqual(rNew.status, "GROUNDED");
    assert.strictEqual(rNew.file, "02_Aneks_2024-06-15.md");

    // 90 days from Umowa contradicted by Aneks 1
    const rOld = engine.verify("Okres wypowiedzenia Umowy wynosi 90 dni.");
    assert.strictEqual(rOld.status, "CONTRADICTED");
    assert.strictEqual(rOld.file, "02_Aneks_2024-06-15.md");
    assert.ok(rOld.reasonCodes.includes("SUPERSEDED_BY_LATER_DOCUMENT"));
  });

  it("Class 5: Named dates & number matching", () => {
    // Correct date with Polish month
    const rDateOk = engine.verify("Termin odbioru Etapu I to 30 września 2024 r.");
    assert.strictEqual(rDateOk.status, "GROUNDED");

    // Clashing month
    const rDateClash = engine.verify("Termin odbioru Etapu I to 30 października 2024 r.");
    assert.strictEqual(rDateClash.status, "CONTRADICTED");
    assert.ok(rDateClash.reasonCodes.includes("NUMBER_MISMATCH"));
  });
});
