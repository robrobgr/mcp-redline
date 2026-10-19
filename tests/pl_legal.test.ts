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

  it("Class 2: Role mismatch — subject/recipient/genitive/prepositional inversion is contradicted", () => {
    // Inverted licensor/licensee roles
    const r = engine.verify("Zamawiający udziela Dostawcy licencji na system ERP.");
    assert.strictEqual(r.status, "CONTRADICTED");
    assert.ok(r.reasonCodes.includes("ROLE_MISMATCH"));

    // Inline snippet corpus for nominative obligation, genitive condition, and prepositional phrase
    const roleEngine = new RedlineEngine(undefined, "pl");
    roleEngine.loadDocuments([
      {
        file: "01_Umowa_Wdrozeniowa_2025-01-20.md",
        content: [
          "# Umowa wdrożeniowa z dnia 20 stycznia 2025 r.",
          "1. Zamawiający w terminie 7 dni roboczych przeprowadza testy akceptacyjne modułu.",
          "2. Zmiana architektury bazy danych wymaga pisemnej zgody Zamawiającego.",
          "3. Sprzęt serwerowy jest przechowywany w magazynie Zamawiającego.",
        ].join("\n"),
      },
    ]);

    // Matching role stays GROUNDED
    const rGenOk = roleEngine.verify("Zmiana architektury bazy danych wymaga pisemnej zgody Zamawiającego.");
    assert.strictEqual(rGenOk.status, "GROUNDED");

    // Nominative obligation assigned to the wrong party -> CONTRADICTED (ROLE_MISMATCH)
    const rSubjSwap = roleEngine.verify("Dostawca w terminie 7 dni roboczych przeprowadza testy akceptacyjne modułu.");
    assert.strictEqual(rSubjSwap.status, "CONTRADICTED");
    assert.ok(rSubjSwap.reasonCodes.includes("ROLE_MISMATCH"));

    // Genitive condition ("zgody Dostawcy" vs "zgody Zamawiającego") -> CONTRADICTED (ROLE_MISMATCH)
    const rGenSwap = roleEngine.verify("Zmiana architektury bazy danych wymaga pisemnej zgody Dostawcy.");
    assert.strictEqual(rGenSwap.status, "CONTRADICTED");
    assert.ok(rGenSwap.reasonCodes.includes("ROLE_MISMATCH"));

    // Prepositional phrase ("w magazynie Dostawcy" vs "w magazynie Zamawiającego") -> CONTRADICTED (ROLE_MISMATCH)
    const rPrepSwap = roleEngine.verify("Sprzęt serwerowy jest przechowywany w magazynie Dostawcy.");
    assert.strictEqual(rPrepSwap.status, "CONTRADICTED");
    assert.ok(rPrepSwap.reasonCodes.includes("ROLE_MISMATCH"));
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

    // Bidirectional prepositional ("bez <noun>" vs "z <noun>"), verb ("nie <verb>"), and morphological ("nie-") negation
    const negEngine = new RedlineEngine(undefined, "pl");
    negEngine.loadDocuments([
      {
        file: "01_Protokol_i_Licencja_2025-03-10.md",
        content: [
          "# Protokół i warunki licencji z dnia 10 marca 2025 r.",
          "1. Odbioru modułu analitycznego dokonano bez zastrzeżeń.",
          "2. Odbioru modułu księgowego dokonano z wadami.",
          "3. Zgłoszenie uwag redakcyjnych nie wstrzymuje płatności faktury.",
          "4. Awaria krytyczna wstrzymuje bieg terminu gwarancji.",
          "5. Licencja na moduł testowy jest nieodpłatna i niezbywalna.",
        ].join("\n"),
      },
    ]);

    // "bez zastrzeżeń" vs "bez zastrzeżeń" -> GROUNDED
    const rBezOk = negEngine.verify("Odbioru modułu analitycznego dokonano bez zastrzeżeń.");
    assert.strictEqual(rBezOk.status, "GROUNDED");

    // "bez zastrzeżeń" (source) vs "z zastrzeżeniami" (claim) -> CONTRADICTED
    const rBezVsZ = negEngine.verify("Odbioru modułu analitycznego dokonano z zastrzeżeniami.");
    assert.strictEqual(rBezVsZ.status, "CONTRADICTED");
    assert.ok(rBezVsZ.reasonCodes.includes("POLARITY_MISMATCH"));

    // "z wadami" (source) vs "bez wad" (claim) -> CONTRADICTED (reverse direction)
    const rZVsBez = negEngine.verify("Odbioru modułu księgowego dokonano bez wad.");
    assert.strictEqual(rZVsBez.status, "CONTRADICTED");
    assert.ok(rZVsBez.reasonCodes.includes("POLARITY_MISMATCH"));

    // "nie <verb>" (source) vs affirmative <verb> (claim) -> CONTRADICTED
    const rVerbNegToPos = negEngine.verify("Zgłoszenie uwag redakcyjnych wstrzymuje płatność faktury.");
    assert.strictEqual(rVerbNegToPos.status, "CONTRADICTED");
    assert.ok(rVerbNegToPos.reasonCodes.includes("POLARITY_MISMATCH"));

    // affirmative <verb> (source) vs "nie <verb>" (claim) -> CONTRADICTED
    const rVerbPosToNeg = negEngine.verify("Awaria krytyczna nie wstrzymuje biegu terminu gwarancji.");
    assert.strictEqual(rVerbPosToNeg.status, "CONTRADICTED");
    assert.ok(rVerbPosToNeg.reasonCodes.includes("POLARITY_MISMATCH"));

    // Morphological "nie-" prefix ("nieodpłatna", "niezbywalna") vs positive stem -> CONTRADICTED
    const rMorph1 = negEngine.verify("Licencja na moduł testowy jest odpłatna.");
    assert.strictEqual(rMorph1.status, "CONTRADICTED");
    assert.ok(rMorph1.reasonCodes.includes("POLARITY_MISMATCH"));

    const rMorph2 = negEngine.verify("Licencja na moduł testowy jest zbywalna.");
    assert.strictEqual(rMorph2.status, "CONTRADICTED");
    assert.ok(rMorph2.reasonCodes.includes("POLARITY_MISMATCH"));

    // Morphological "nie-" matching "nie-" -> GROUNDED
    const rMorphOk = negEngine.verify("Licencja na moduł testowy jest nieodpłatna.");
    assert.strictEqual(rMorphOk.status, "GROUNDED");
  });

  it("Class 4: Chronological supersession — later amendment overrides only the specific term it changes", () => {
    // 60 days confirmed in Aneks 1 (later doc)
    const rNew = engine.verify("Okres wypowiedzenia Umowy wynosi 60 dni.");
    assert.strictEqual(rNew.status, "GROUNDED");
    assert.strictEqual(rNew.file, "02_Aneks_2024-06-15.md");

    // 90 days from Umowa contradicted by Aneks 1
    const rOld = engine.verify("Okres wypowiedzenia Umowy wynosi 90 dni.");
    assert.strictEqual(rOld.status, "CONTRADICTED");
    assert.strictEqual(rOld.file, "02_Aneks_2024-06-15.md");
    assert.ok(rOld.reasonCodes.includes("SUPERSEDED_BY_LATER_DOCUMENT"));

    // Inline snippet corpus: amendment changes Stage II price; Stage I, Stage III, and conclusion date stay GROUNDED
    const stageEngine = new RedlineEngine(undefined, "pl");
    stageEngine.loadDocuments([
      {
        file: "01_Umowa_wdrozeniowa_2024-03-05.md",
        content: [
          "# Umowa wdrożeniowa z dnia 5 marca 2024 r.",
          "Zawarta w Poznaniu pomiędzy Alfa S.A. (Zamawiający) a Beta sp. z o.o. (Dostawca).",
          "## § 1 Wynagrodzenie",
          "1. Wynagrodzenie za Etap I wynosi 150 000 PLN netto.",
          "2. Wynagrodzenie za Etap II wynosi 300 000 PLN netto.",
          "3. Wynagrodzenie za Etap III wynosi 450 000 PLN netto.",
        ].join("\n"),
      },
      {
        file: "02_Aneks_nr_1_2024-09-12.md",
        content: [
          "# Aneks nr 1 z dnia 12 września 2024 r. do Umowy wdrożeniowej",
          "## § 1 Zmiana wynagrodzenia za Etap II",
          "1. Wynagrodzenie za Etap II zmienia się na kwotę 350 000 PLN netto.",
        ].join("\n"),
      },
    ]);

    // Amended Stage II old price is contradicted by the amendment
    const rStage2Old = stageEngine.verify("Wynagrodzenie za Etap II wynosi 300 000 PLN netto.");
    assert.strictEqual(rStage2Old.status, "CONTRADICTED");
    assert.ok(rStage2Old.reasonCodes.includes("SUPERSEDED_BY_LATER_DOCUMENT"));

    // Unamended Stage I and Stage III prices stay GROUNDED
    const rStage1 = stageEngine.verify("Wynagrodzenie za Etap I wynosi 150 000 PLN netto.");
    assert.strictEqual(rStage1.status, "GROUNDED");

    const rStage3 = stageEngine.verify("Wynagrodzenie za Etap III wynosi 450 000 PLN netto.");
    assert.strictEqual(rStage3.status, "GROUNDED");

    // Base agreement conclusion date and place stay GROUNDED (not overridden by amendment date)
    const rConclusionDate = stageEngine.verify("Umowa wdrożeniowa została zawarta 5 marca 2024 r.");
    assert.strictEqual(rConclusionDate.status, "GROUNDED");

    const rConclusionPlace = stageEngine.verify("Umowa wdrożeniowa została zawarta w Poznaniu.");
    assert.strictEqual(rConclusionPlace.status, "GROUNDED");
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

  it("Item 3: Whole-token number matching (280 000 vs 1 280 000) and clause-scoped numbers", () => {
    const numEnginePl = new RedlineEngine(undefined, "pl");
    numEnginePl.loadDocuments([
      {
        file: "01_Umowa_Dostawy.md",
        content: [
          "# Umowa dostawy z dnia 12 lutego 2025 r.",
          "1. Łączne wynagrodzenie Wykonawcy wynosi 1\u00A0280\u00A0000 PLN netto.",
          "2. Wynagrodzenie za Etap I wynosi 280 000 PLN netto, a wynagrodzenie za Etap II wynosi 1 000 000 PLN netto.",
        ].join("\n"),
      },
    ]);

    // 280 000 PLN for Etap I must stay GROUNDED and not collide with 1 280 000 or 1 000 000
    const rStage1Ok = numEnginePl.verify("Wynagrodzenie za Etap I wynosi 280 000 PLN netto.");
    assert.strictEqual(rStage1Ok.status, "GROUNDED");

    // 280 000 PLN claimed as total fee must be CONTRADICTED by 1 280 000 PLN (not matched as suffix)
    const rTotalWrong = numEnginePl.verify("Łączne wynagrodzenie Wykonawcy wynosi 280 000 PLN netto.");
    assert.strictEqual(rTotalWrong.status, "CONTRADICTED");
    assert.ok(rTotalWrong.reasonCodes.includes("NUMBER_MISMATCH"));

    // Wrong Stage I amount in a multi-clause sentence is CONTRADICTED
    const rStage1Wrong = numEnginePl.verify("Wynagrodzenie za Etap I wynosi 1 000 000 PLN netto.");
    assert.strictEqual(rStage1Wrong.status, "CONTRADICTED");
    assert.ok(rStage1Wrong.reasonCodes.includes("NUMBER_MISMATCH"));

    // English comma-separated thousands: 280,000 vs 1,280,000
    const numEngineEn = new RedlineEngine(undefined, "en");
    numEngineEn.loadDocuments([
      {
        file: "01_Master_Agreement.md",
        content: [
          "# Master Services Agreement",
          "The total contract value is 1,280,000 EUR net.",
        ].join("\n"),
      },
    ]);
    const rEnTotalOk = numEngineEn.verify("The total contract value is 1,280,000 EUR net.");
    assert.strictEqual(rEnTotalOk.status, "GROUNDED");

    const rEnSuffixWrong = numEngineEn.verify("The total contract value is 280,000 EUR net.");
    assert.strictEqual(rEnSuffixWrong.status, "CONTRADICTED");
    assert.ok(rEnSuffixWrong.reasonCodes.includes("NUMBER_MISMATCH"));
  });
});
