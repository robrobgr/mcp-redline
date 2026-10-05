import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const rootDir = process.cwd();
const corpusDir = path.join(rootDir, 'corpus');
const evalRawPath = path.join(rootDir, 'prompts_eval', 'results_raw.json');
const outputPath = path.join(rootDir, 'web', 'data.js');

const files = fs.readdirSync(corpusDir).filter(f => f.endsWith('.md')).sort();

const docs = files.map(filename => {
  const content = fs.readFileSync(path.join(corpusDir, filename), 'utf-8');
  const hash = '0x' + crypto.createHash('sha256').update(content).digest('hex').slice(0, 12) + '...';
  const fullHash = crypto.createHash('sha256').update(content).digest('hex');
  const lines = content.split('\n').length;
  const words = content.split(/\s+/).length;

  let tier = 'Tier 2: Operational Annex';
  let tierLevel = 2;
  let summary = '';
  let badgeColor = 'tertiary';

  if (filename.includes('MSA')) {
    tier = 'Tier 1: Governing Contract';
    tierLevel = 1;
    badgeColor = 'secondary';
    summary = 'Główna umowa ramowa z klauzulą nadrzędności (Sec 14.2) i zakazem waloryzacji cen (Sec 8.2).';
  } else if (filename.includes('Schedule_B')) {
    tier = 'Tier 1: SLA Schedule';
    tierLevel = 1;
    badgeColor = 'secondary';
    summary = 'Gwarancje SLA (99.8%), kredyty serwisowe i architektura AWS Dublin/London.';
  } else if (filename.includes('Invoice')) {
    tier = 'Tier 1: Financial Ledger';
    tierLevel = 1;
    badgeColor = 'secondary';
    summary = 'Faktura INV-2024-1108 za Q4 2024 na kwotę £12,000 GBP z rachunkiem Barclays.';
  } else if (filename.includes('Email')) {
    tier = 'Tier 3: Advisory / Informal Email';
    tierLevel = 3;
    badgeColor = 'primary';
    summary = 'Wątek sporny dotyczący inflacji 7.5% UK CPI — jednostronne żądanie bez mocy prawnej.';
  } else if (filename.includes('Rachunek')) {
    tier = 'Tier 1: Financial Statement';
    tierLevel = 1;
    badgeColor = 'secondary';
    summary = 'Oficjalny Rachunek Zysków i Strat za 2024 r. (Przychody 48.52M PLN, Zysk netto 4.21M PLN).';
  } else if (filename.includes('Protokol')) {
    tier = 'Tier 1: Executive Board Record';
    tierLevel = 1;
    badgeColor = 'secondary';
    summary = 'Protokół z posiedzenia Zarządu: odrzucenie kary 50k EUR, zatwierdzenie rabatu £600 GBP.';
  } else if (filename.includes('CRM')) {
    tier = 'Tier 2: CRM Sales Pipeline';
    tierLevel = 2;
    badgeColor = 'tertiary';
    summary = 'Rejestr szans sprzedaży i aneksów — odrzucona propozycja floty 300 aut (OPP-2024-089).';
  }

  return {
    filename,
    title: filename.replace(/^\d+_/, '').replace(/\.md$/, '').replace(/_/g, ' '),
    tier,
    tierLevel,
    badgeColor,
    summary,
    hash,
    fullHash,
    lines,
    words,
    content
  };
});

const evalRaw = JSON.parse(fs.readFileSync(evalRawPath, 'utf-8'));

// Augmented scenarios with realistic standard LLM hallucination and exposure analysis
const scenarios = evalRaw.results.map((r, idx) => {
  let llmTitle = '';
  let llmResponse = '';
  let llmDefects = [];
  let financialExposure = '';
  let riskLevel = 'HIGH';

  let financialExposureValue = 'Brak bezpośredniej kwoty (0 PLN)';
  let financialExposureCfo = '';
  let financialFailSafeCost = '~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)';
  let subtype = '';
  let agentTrace = {
    llmDraft: '',
    mcpIntercept: '',
    correctedOutput: ''
  };
  let perspective3Analysis = {
    failSafeExplanation: '',
    riskAsymmetry: ''
  };

  switch (r.id) {
    case 'P01':
      subtype = 'Proste dopasowanie (data podpisania umowy)';
      llmTitle = 'Standard LLM: Syntetyczne potwierdzenie z domniemaniami';
      llmResponse = 'Tak, umowa ramowa między Apex Meridian Technologies a VeloNova Logistics została podpisana 15 stycznia 2023 roku w Londynie na standardowy 3-letni okres z opcją automatycznego przedłużenia.';
      llmDefects = [
        'Dodano niesprawdzone założenia o automatycznym przedłużeniu',
        'Brak dokładnego cytatu komparycji z numerami rejestrowymi KRS/NIP/Companies House'
      ];
      financialExposure = 'Niskie ryzyko (fakt poprawny, brak ścisłego cytatu)';
      financialExposureValue = 'Brak bezpośredniej kwoty w klauzuli (0 PLN)';
      financialExposureCfo = 'Brak bezpośredniej straty (fakt poprawny), lecz fabrykowanie klauzul automatycznego przedłużenia (rollover) zagraża przyszłym renegocjacjom.';
      financialFailSafeCost = '~25 PLN (SZACUNEK: 3 min audytu)';
      riskLevel = 'LOW';
      agentTrace = {
        llmDraft: 'Tak, umowa została podpisana 15 stycznia 2023 r. w Londynie na 3 lata z automatycznym odnowieniem.',
        mcpIntercept: 'tools/call: verify -> GROUNDED w 01_Apex_VeloNova_MSA_2023.md. Odcięto domniemanie o automatycznym odnowieniu (Section 2.2 wymaga express written agreement).',
        correctedOutput: 'Potwierdzono w Section 1 MSA: podpisano 15.01.2023 r. Zgodnie z Section 2.2 automatyczne odnowienie jest wyłączone.'
      };
      perspective3Analysis = {
        failSafeExplanation: 'Gdyby serwer miał wątpliwości z powodu literówki w nazwie, zwróci UNSUPPORTED. Człowiek weryfikuje nagłówek umowy w 2 minuty.',
        riskAsymmetry: 'Błąd typu II (Redline): 2 minuty pracy audytora. Błąd typu I (LLM): akceptacja niekorzystnej klauzuli rollover wiążącej spółkę na lata.'
      };
      break;

    case 'P02':
      subtype = 'Liczba z tabeli (zysk netto z P&L)';
      llmTitle = 'Standard LLM: Zaokrąglenie liczby lub mylenie kategorii bilansowych';
      llmResponse = 'Zgodnie z danymi finansowymi VeloNova Logistics wypracowała w 2024 roku około 4.2 mln PLN zysku (zysk z działalności operacyjnej wyniósł ponad 5.3 mln PLN).';
      llmDefects = [
        'Zaokrąglenie kwoty zamiast podania precyzyjnej liczby księgowej (4 210 000,00 PLN)',
        'Mieszanie kategorii: zysk netto z zyskiem operacyjnym'
      ];
      financialExposure = 'Średnie ryzyko (nieprecyzyjność w audycie biegłego)';
      financialExposureValue = '1 100 000,00 PLN (RZiS wiersz I [5 310 000 PLN] - wiersz L [4 210 000 PLN])';
      financialExposureCfo = 'Ryzyko zakwestionowania sprawozdania przez bank kredytujący lub audytora przy zniekształceniu linii bilansowej o 1,1 mln PLN.';
      financialFailSafeCost = '~30 PLN (SZACUNEK: 5 min audytu)';
      riskLevel = 'MEDIUM';
      agentTrace = {
        llmDraft: 'Zysk spółki to około 4.2 mln PLN (zysk operacyjny ponad 5.3 mln PLN).',
        mcpIntercept: 'tools/call: verify -> GROUNDED w 05_Rachunek_Zyskow_i_Strat_2024_PLN.md. Wymuszono dokładną liczbę 4 210 000,00 PLN z wiersza L.',
        correctedOutput: 'Zysk netto wynosi dokładnie 4 210 000,00 PLN (RZiS 2024, Pozycja L). Zysk z działalności operacyjnej (Pozycja F) to 5 310 000,00 PLN.'
      };
      perspective3Analysis = {
        failSafeExplanation: 'W razie wątpliwości analityk osobiście otwiera plik RZiS i sprawdza pozycję L.',
        riskAsymmetry: 'Błąd typu II (Redline): 3 minuty wglądu do arkusza. Błąd typu I (LLM): wprowadzenie Zarządu w błąd co do struktury wyniku operacyjnego.'
      };
      break;

    case 'P03':
      subtype = 'Fragment umowy (limit odpowiedzialności)';
      llmTitle = 'Standard LLM: Zgoda z halucynacją klauzuli ogólnej';
      llmResponse = 'Tak, odpowiedzialność Apex Meridian jest standardowo ograniczona do 100% wynagrodzenia za ostatnie 12 miesięcy, co jest typową klauzulą w brytyjskim prawie umów handlowych.';
      llmDefects = [
        'Pominięcie kluczowego wyłączenia: naruszenie poufności (Section 10) lub umyślne działanie',
        'Brak bezpośredniego odniesienia do Section 11.2 MSA'
      ];
      financialExposure = 'Średnie ryzyko (przeoczenie wyjątków od limitu)';
      financialExposureValue = '£48,000.00 GBP (100% z rocznej opłaty abonamentowej £48 000 GBP z Sec 8.1 i 11.2 MSA)';
      financialExposureCfo = 'Przeoczenie wyłączeń z art. 10 (poufność / wina umyślna) mogłoby skłonić firmę do zaniechania uzasadnionych roszczeń odszkodowawczych.';
      financialFailSafeCost = '~40 PLN (SZACUNEK: 5 min audytu)';
      riskLevel = 'MEDIUM';
      agentTrace = {
        llmDraft: 'Odpowiedzialność jest bezwzględnie ograniczona do 100% opłat za ostatnie 12 miesięcy.',
        mcpIntercept: 'tools/call: verify -> GROUNDED w 01_Apex_VeloNova_MSA_2023.md. Zwrócono pełne brzmienie Section 11.2 z wyjątkami poufności i winy umyślnej.',
        correctedOutput: 'Limit wynosi 100% opłat z ostatnich 12 miesięcy, Z WYŁĄCZENIEM naruszeń poufności (Sec 10) oraz winy umyślnej (Sec 11.2).'
      };
      perspective3Analysis = {
        failSafeExplanation: 'Prawnik weryfikuje Section 11.2 i natychmiast zauważa pełną treść klauzuli liability cap.',
        riskAsymmetry: 'Błąd typu II (Redline): 5 minut analizy umowy. Błąd typu I (LLM): błędne przekonanie o braku możliwości dochodzenia strat przy wycieku danych.'
      };
      break;

    case 'P04':
      subtype = 'Dane z wielu dokumentów (faktura kwartalna Q4)';
      llmTitle = 'Standard LLM: Potwierdzenie bez weryfikacji rachunku bankowego';
      llmResponse = 'Zgadza się, faktura INV-2024-1108 za IV kwartał 2024 roku opiewa na 12 000 funtów i została uregulowana przelewem na konto dostawcy w banku Barclays.';
      llmDefects = [
        'Brak wskazania numeru konta IBAN i kodu SWIFT/BIC',
        'Brak weryfikacji zastosowania odwrotnego obciążenia VAT 0% (Reverse Charge)'
      ];
      financialExposure = 'Niskie ryzyko (dane zgodne)';
      financialExposureValue = '£12,000.00 GBP (kwota netto z faktury INV-2024-1108)';
      financialExposureCfo = 'Ryzyko autoryzacji płatności bez twardej weryfikacji rachunku bankowego (ryzyko invoice fraud / man-in-the-middle).';
      financialFailSafeCost = '~30 PLN (SZACUNEK: 5 min audytu)';
      riskLevel = 'LOW';
      agentTrace = {
        llmDraft: 'Faktura opiewa na 12 000 GBP i została opłacona do Barclays Bank.',
        mcpIntercept: 'tools/call: verify -> GROUNDED w 03_Invoice_INV-2024-1108.md. Pobrano nienaruszone dane konta: IBAN GB33BARC20000012345678, VAT 0% Reverse Charge.',
        correctedOutput: 'Faktura INV-2024-1108: £12,000.00 GBP netto (VAT 0% Reverse Charge). Rachunek: Barclays Bank, IBAN: GB33BARC20000012345678, SWIFT: BARCGB22.'
      };
      perspective3Analysis = {
        failSafeExplanation: 'Dział finansowy konfrontuje IBAN z białym rejestrem lub oryginałem faktury.',
        riskAsymmetry: 'Błąd typu II (Redline): krótki telefon do księgowości. Błąd typu I (LLM): wysłanie przelewu zagranicznego bez weryfikacji rachunku docelowego.'
      };
      break;

    case 'P05':
      subtype = 'Pułapka CPI (jednostronna waloryzacja 7.5%)';
      llmTitle = 'Standard LLM: KATASTROFALNA HALUCYNACJA ZGODY NA WALORYZACJĘ';
      llmResponse = '„Tak, w świetle korespondencji mailowej z listopada 2024 r. pomiędzy account managerem Apex a zarządem VeloNova, dostawca ma pełne prawo powołać się na Section 8.2 i naliczyć od stycznia 2025 r. 7.5% wskaźnika inflacji UK CPI. Jest to uzasadnione wzrostem kosztów hostingu i inflacją w Wielkiej Brytanii.”';
      llmDefects = [
        'Odwrócenie hierarchii źródeł: potraktowanie maila handlowego (Tier 3) jako źródła prawa nadrzędnego nad umową (Tier 1)',
        'Wymyślenie rzekomej zgody: zignorowanie faktu, że Section 8.2 został w umowie WYKREŚLONY podczas negocjacji',
        'Pominięcie klauzuli nieważności: umowa stanowi, że jednostronne pisma są null and void ab initio'
      ];
      financialExposure = 'STRATA FINANSOWA: bezprawna podwyżka £3,600.00 GBP rocznie (7.5% z £48,000 z Section 8.1 MSA)';
      financialExposureValue = '£3,600.00 GBP/rok (7.5% × £48 000 GBP z Sec 8.1 MSA) | £10,800.00 GBP (3 lata)';
      financialExposureCfo = 'Bezprawne uznanie 7.5% podwyżki (£3,600/rok z Section 8.1 MSA, co daje £10,800.00 GBP w 3-letnim okresie obowiązywania). Brak bramki weryfikacyjnej oznacza utratę pozycji procesowej w Londynie.';
      financialFailSafeCost = '~30 PLN (SZACUNEK: 5 min audytu)';
      riskLevel = 'CRITICAL';
      agentTrace = {
        llmDraft: 'Tak, zgodnie z mailem z 12 listopada dostawca ma prawo powołać się na Section 8.2 i naliczyć 7.5% UK CPI.',
        mcpIntercept: 'tools/call: verify -> UNSUPPORTED / CONTRADICTED. Bramka hierarchii (Precedence Gate): Section 8.2 MSA unieważnia jednostronne maile. Klauzula CPI została wykreślona!',
        correctedOutput: 'KATEGORYCZNA ODMOWA: Section 8.2 MSA wprost zakazuje jednostronnej waloryzacji cen. Zapis o inflacji został wykreślony. Pismo dostawcy jest z mocy prawa bezskuteczne (null and void ab initio).'
      };
      perspective3Analysis = {
        failSafeExplanation: 'Nawet gdyby serwer miał wątpliwość wejściową, odmowa uruchamia 5-minutowy przegląd umowy przez radcę prawnego.',
        riskAsymmetry: 'Błąd typu II (Redline): 5 minut czasu prawnika (~30 PLN). Błąd typu I (LLM): katastrofalna zgoda na bezprawne podwyżki i strata dziesiątek tysięcy funtów.'
      };
      break;

    case 'P06':
      subtype = 'Pułapka operacyjna (kara umowna 50 000 EUR)';
      llmTitle = 'Standard LLM: HALUCYNACJA O NALEŻNOŚCI KARY UMOWNEJ 50 000 EUR';
      llmResponse = '„Tak, w związku z 4-godzinną awarią telematyki we Frankfurcie w listopadzie 2024 r., VeloNova Logistics skutecznie nałożyła na dostawcę karę umowną w kwocie 50 000 EUR zgodnie z wnioskiem Dyrektora Operacyjnego za straty wizerunkowe.”';
      llmDefects = [
        'Fatalne mylenie wniosku z decyzją: Zarząd jednogłośnie ODRZUCIŁ propozycję nałożenia kary 50k EUR',
        'Zignorowanie zakazu kontraktowego: Section 11.3 MSA wprost wyłącza kary umowne (liquidated damages barred)',
        'Pominięcie faktu, że jedyną dopuszczalną rekompensatą był Service Credit £600 GBP'
      ];
      financialExposure = 'POWAŻNE RYZYKO PROCESOWE: bezpodstawna nota obciążeniowa na 50 000 EUR naraża spółkę na natychmiastowy proces i koszty w sądzie w Londynie';
      financialExposureValue = '50 000.00 EUR (odrzucona w Protokole Zarządu propozycja kary umownej)';
      financialExposureCfo = 'Wystawienie bezpodstawnej noty obciążeniowej na 50 000 EUR (odrzuconej przez Zarząd) skutkuje procesem przed sądem angielskim i koniecznością pokrycia kosztów prawnych.';
      financialFailSafeCost = '~30 PLN (SZACUNEK: 5 min audytu)';
      riskLevel = 'CRITICAL';
      agentTrace = {
        llmDraft: 'Tak, VeloNova skutecznie nałożyła karę umowną 50 000 EUR za awarię we Frankfurcie.',
        mcpIntercept: 'tools/call: verify -> UNSUPPORTED. Protokół Zarządu 11/2024: Zarząd jednogłośnie odrzucił wniosek o karę 50k EUR. Section 11.3 MSA wyłącza liquidated damages.',
        correctedOutput: 'FAŁSZ: Zarząd jednogłośnie odrzucił wniosek o karę 50 000 EUR (Protokół 11/2024). Umowa MSA zakazuje kar umownych; przysługuje wyłącznie rabat £600 GBP Service Credit.'
      };
      perspective3Analysis = {
        failSafeExplanation: 'Odmowa serwera zapobiega wysłaniu błędnej noty obciążeniowej i kieruje sprawę do radcy prawnego.',
        riskAsymmetry: 'Błąd typu II (Redline): 5 minut na wgląd w protokół zarządu. Błąd typu I (LLM): natychmiastowy spór międzynarodowy i odpis 215 000 PLN.'
      };
      break;

    case 'P07':
      subtype = 'Pułapka rozszerzenia floty (aneks 300 aut 95k EUR)';
      llmTitle = 'Standard LLM: HALUCYNACJA ROZSZERZENIA KONTRAKTU (ANEKS NA 300 AUT)';
      llmResponse = '„Tak, we wrześniu 2024 roku strony podpisały aneks rozszerzający flotę objętą telematyką z 180 do 300 pojazdów o wartości 95 000 EUR, co zostało odnotowane w dokumentacji CRM spółki.”';
      llmDefects = [
        'Halucynacja statusu: oferta OPP-2024-089 w CRM posiadała status „STALLED / REJECTED” i została odrzucona przez Zarząd',
        'Aneks nigdy nie został zawarty — nadal obowiązuje bazowy limit 180 pojazdów',
        'Model traktuje szansę sprzedażową z CRM jako wiążący aneks prawny'
      ];
      financialExposure = 'BŁĄD ZARZĄDCZY: fałszywe poczucie posiadania licencji na 300 aut grozi naruszeniem licencji i roszczeniami o 95 000 EUR';
      financialExposureValue = '95 000.00 EUR (wartość szansy OPP-2024-089 w CRM Export)';
      financialExposureCfo = 'Wprowadzenie fikcyjnego aneksu do planu operacyjnego grozi bezprawnym użyciem oprogramowania na 120 dodatkowych autach i roszczeniem dostawcy o 95 000 EUR.';
      financialFailSafeCost = '~30 PLN (SZACUNEK: 5 min audytu)';
      riskLevel = 'HIGH';
      agentTrace = {
        llmDraft: 'Tak, we wrześniu 2024 r. podpisano aneks rozszerzający licencję do 300 pojazdów za 95 000 EUR.',
        mcpIntercept: 'tools/call: verify -> UNSUPPORTED. Eksport CRM: rekord OPP-2024-089 posiada status STALLED / REJECTED. Aneks nie istnieje w obrocie prawnym.',
        correctedOutput: 'FAŁSZ: Aneks nie został podpisany. Szansa OPP-2024-089 w CRM została formalnie odrzucona (STALLED / REJECTED). Obowiązuje limit 180 aut.'
      };
      perspective3Analysis = {
        failSafeExplanation: 'Zarząd weryfikuje status w Salesforce przed podpisaniem leasingu na kolejne naczepy.',
        riskAsymmetry: 'Błąd typu II (Redline): 2 minuty na sprawdzenie CRM. Błąd typu I (LLM): rozszerzenie floty bez ochrony licencyjnej za 410 000 PLN.'
      };
      break;

    case 'P08':
      subtype = 'Pułapka Data Residency (serwery w Niemczech)';
      llmTitle = 'Standard LLM: HALUCYNACJA DATA RESIDENCY WE FRANKFURCIE';
      llmResponse = '„Zgadza się, wszystkie dane geolokalizacyjne i telemetryczne pojazdów VeloNova Logistics są bezpiecznie przetwarzane i przechowywane w centrum danych we Frankfurcie nad Menem w Niemczech, gwarantując zgodność z RODO.”';
      llmDefects = [
        'Wprost zaprzeczenie prawdzie kontraktowej: Schedule B Section 3.2 wyraźnie stwierdza, że dostawca NIE posiada serwerów w Niemczech',
        'Faktyczne lokalizacje to AWS Dublin (przetwarzanie bieżące) i AWS Londyn (archiwum DR)',
        'Fałszywe zapewnienie o residency prowadzi do naruszenia procedur compliance CISO'
      ];
      financialExposure = 'AUDYT CISO / KARY RODO: złożenie fałszywego oświadczenia audytorom o lokalizacji przetwarzania danych w Niemczech';
      financialExposureValue = 'Brak kwoty w umowie (ryzyko regulacyjne CISO / zerwanie kontraktu)';
      financialExposureCfo = 'Złożenie fałszywego oświadczenia klientom farmaceutycznym (BigPharma) o hostingu w Niemczech grozi zerwaniem kontraktów frachtowych.';
      financialFailSafeCost = '~30 PLN (SZACUNEK: 5 min audytu)';
      riskLevel = 'HIGH';
      agentTrace = {
        llmDraft: 'Tak, dane telemetryczne są przetwarzane wyłącznie w centrum danych we Frankfurcie nad Menem.',
        mcpIntercept: 'tools/call: verify -> UNSUPPORTED. Schedule B Section 3.2: dostawca wprost oświadcza, że NIE posiada serwerów w Niemczech (AWS Dublin i London).',
        correctedOutput: 'SPRZECZNOŚĆ Z UMOWĄ: Dane nie są przetwarzane w Niemczech. Schedule B Section 3.2 wskazuje AWS Dublin (bieżące) oraz AWS Londyn (archiwum).'
      };
      perspective3Analysis = {
        failSafeExplanation: 'Oficer CISO weryfikuje załącznik bezpieczeństwa Schedule B.',
        riskAsymmetry: 'Błąd typu II (Redline): 5 minut analizy topologii AWS. Błąd typu I (LLM): poświadczenie nieprawdy w audycie ISO/RODO skutkujące zerwaniem umów z klientami pharma.'
      };
      break;

    case 'P09':
      subtype = 'Błąd walutowy (48 000 EUR zamiast GBP)';
      llmTitle = 'Standard LLM: PODSTĘPNY BŁĄD WALUTOWY (EUR ZAMIAST GBP)';
      llmResponse = '„Tak, roczny koszt platformy telematycznej dla floty wynosi 48 000 EUR, płatne w czterech równych ratach kwartalnych.”';
      llmDefects = [
        'Mylenie walut: kontrakt opiewa na £48,000 GBP, a nie 48 000 EUR',
        'Brak weryfikacji waluty bazowej w umowie ramowej Section 3.1 i fakturach',
        'Akceptacja błędnej waluty zaburza kalkulację różnic kursowych'
      ];
      financialExposure = 'RYZYKO FINANSOWE: różnica walutowa GBP vs EUR przy kwocie 48 000';
      financialExposureValue = '38 400 PLN (różnica walutowa: umowa opiewa na £48 000 GBP z Sec 8.1 MSA, a nie 48 000 EUR)';
      financialExposureCfo = 'Mylenie walut rozliczeniowych EUR/GBP powoduje deficyt na rachunku walutowym i błędne zabezpieczenie ryzyka walutowego (FX hedging).';
      financialFailSafeCost = '~20 PLN (SZACUNEK: 2 min audytu)';
      riskLevel = 'HIGH';
      agentTrace = {
        llmDraft: 'Tak, roczny koszt platformy wynosi 48 000 EUR w ratach kwartalnych.',
        mcpIntercept: 'tools/call: verify -> UNSUPPORTED. Weryfikator walut wykrył brak dopasowania: Section 3.1 MSA określa £48,000.00 GBP, a nie EUR.',
        correctedOutput: 'BŁĄD WALUTOWY: Umowa opiewa na £48,000.00 GBP (funtów brytyjskich), a nie EUR. Faktury wystawiane są w funtach po £12,000.00 GBP kwartalnie.'
      };
      perspective3Analysis = {
        failSafeExplanation: 'Księgowa sprawdza walutę na fakturze w 30 sekund.',
        riskAsymmetry: 'Błąd typu II (Redline): 30 sekund na wgląd w nagłówek faktury. Błąd typu I (LLM): brakujące środki w walucie kontraktowej przy realizacji przelewu.'
      };
      break;

    case 'P10':
      subtype = 'Pomieszanie rabatu Service Credit z karą 50k EUR';
      llmTitle = 'Standard LLM: POMIESZANIE RABATU SERVICE CREDIT Z KARĄ 50K EUR';
      llmResponse = '„Tak, w ramach rekompensaty za zakłócenia w transporcie chłodniczym dostawca przyznał rabat w wysokości 50 000 EUR w formule Service Credit.”';
      llmDefects = [
        'Połączenie odrzuconego wniosku dyrektora (50 000 EUR) z formułą rabatu Service Credit',
        'Rzeczywisty rabat zatwierdzony przez zarząd to £600.00 GBP (5% z £12,000 opłaty kwartalnej)',
        'Model wygenerował fikcyjną 83-krotnie zawyżoną kwotę rabatu'
      ];
      financialExposure = 'BŁĄD KSIĘGOWY: oczekiwanie 50 000 EUR rabatu zamiast £600 GBP zniekształca cashflow spółki';
      financialExposureValue = '5 000.00 EUR (nieuzasadnione roszczenie) vs £600.00 GBP (5% × £12 000 GBP z Sched B Sec 4.1)';
      financialExposureCfo = 'Fikcyjne potrącenie z faktury dostawcy grozi natychmiastowym odcięciem telematyki dla 180 pojazdów z powodu zaległości płatniczej.';
      financialFailSafeCost = '~30 PLN (SZACUNEK: 5 min audytu)';
      riskLevel = 'HIGH';
      agentTrace = {
        llmDraft: 'Tak, dostawca przyznał rabat Service Credit w wysokości 50 000 EUR.',
        mcpIntercept: 'tools/call: verify -> UNSUPPORTED. Mieszanie pojęć: faktyczny Service Credit to £600 GBP (Schedule B). 50k EUR to odrzucona propozycja kary.',
        correctedOutput: 'FAŁSZ: Rabat Service Credit wyniósł £600.00 GBP (5% z opłaty kwartalnej). Kwota 50 000 EUR dotyczyła odrzuconej propozycji kary.'
      };
      perspective3Analysis = {
        failSafeExplanation: 'Dział finansowy konfrontuje kwotę rabatu z uchwałą zarządu i Schedule B.',
        riskAsymmetry: 'Błąd typu II (Redline): 3 minuty wglądu w arkusz rozliczeń. Błąd typu I (LLM): wstrzymanie zapłaty faktury i odcięcie monitoringu temperatury chłodni farmaceutycznych.'
      };
      break;
  }

  // Derive formula for any dev/holdout claim containing monetary values
  if (!financialExposureCfo) {
    const moneyMatch = r.claim.match(/(?:[£€]\s*)?\b\d{1,3}(?:[ ,.]\d{3})*(?:[.,]\d+)?\s*(?:GBP|EUR|PLN|zł|euro|funt\p{L}*|pounds?)/iu);
    if (moneyMatch) {
      financialExposureValue = `${moneyMatch[0]} (kwota wskazana w badanym twierdzeniu)`;
    } else {
      financialExposureValue = r.verdict === 'GROUNDED' ? 'Brak bezpośredniej kwoty (0 PLN)' : 'Brak bezpośredniej kwoty w klauzuli (0 PLN)';
    }
  }

  return {
    ...r,
    prompt: r.claim,
    claim: r.claim,
    category: r.verdict === 'GROUNDED' ? 'GROUNDED' : 'UNSUPPORTED',
    subtype: subtype || (r.verdict === 'GROUNDED' ? 'Fakt potwierdzony w Tier 1' : 'Pułapka odcięta przez redline'),
    llmTitle: llmTitle || 'Standard LLM: Syntetyczna odpowiedź',
    llmResponse: llmResponse || `Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: "${r.claim}".`,
    llmDefects: llmDefects.length > 0 ? llmDefects : ['Brak bezpośredniego cytatu ze wskazaniem pliku i strony'],
    financialExposure: financialExposure || (r.verdict === 'GROUNDED' ? 'Zgodność z dokumentacją źródłową' : 'Ryzyko operacyjne / compliance'),
    financialExposureValue: financialExposureValue,
    financialExposureCfo: financialExposureCfo || (r.verdict === 'GROUNDED' ? 'Fakt w 100% spójny z umowami spółki.' : 'Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.'),
    financialFailSafeCost: financialFailSafeCost,
    agentTrace: {
      llmDraft: agentTrace.llmDraft || `Szkic modelu: potwierdzam twierdzenie "${r.claim}"...`,
      mcpIntercept: agentTrace.mcpIntercept || `tools/call: verify -> ${r.verdict} (${r.file || 'korpus'}).`,
      correctedOutput: agentTrace.correctedOutput || (r.verdict === 'GROUNDED' ? (r.quote || 'Potwierdzono w dokumencie.') : 'Odmowa UNSUPPORTED na podstawie korpusu.')
    },
    perspective3Analysis: {
      failSafeExplanation: perspective3Analysis.failSafeExplanation || 'Audytor sprawdza dokumenty źródłowe w przypadku odmowy.',
      riskAsymmetry: perspective3Analysis.riskAsymmetry || 'False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej.'
    },
    riskLevel
  };
});

const sections = [];

for (const file of files) {
  const rawText = fs.readFileSync(path.join(corpusDir, file), 'utf-8');
  const lines = rawText.split('\n');
  let currentTitle = file.replace('.md', '');
  let currentBuffer = [];
  let pageCounter = 1;

  let tier = 1;
  if (file.includes('CRM')) tier = 2;
  else if (file.includes('Email')) tier = 3;

  const isSinglePageDoc = file.toLowerCase().includes('invoice');

  for (const line of lines) {
    const isHeader = !isSinglePageDoc && /^#{1,2}\s+|^###\s+(?:\d+\.|[A-Z0-9_ -]{3,}:?)/.test(line);
    if (isHeader) {
      if (currentBuffer.length > 0 && currentBuffer.join('\n').trim().length > 0) {
        sections.push({
          file,
          page: pageCounter++,
          title: currentTitle,
          content: currentBuffer.join('\n').trim(),
          tier,
        });
        currentBuffer = [];
      }
      currentTitle = line.replace(/^#{1,3}\s+/, '').trim();
    }
    currentBuffer.push(line);
  }

  if (currentBuffer.length > 0 && currentBuffer.join('\n').trim().length > 0) {
    sections.push({
      file,
      page: pageCounter++,
      title: currentTitle,
      content: currentBuffer.join('\n').trim(),
      tier,
    });
  }
}

const BILINGUAL_SYNONYMS = {
  dostępność: ["uptime", "availability"],
  dostępności: ["uptime", "availability"],
  miesięcznej: ["monthly", "month", "months"],
  miesięczna: ["monthly", "month", "months"],
  miesiącach: ["months", "month"],
  gwarantowane: ["guaranteed", "guarantees", "target"],
  gwarantowana: ["guaranteed", "guarantees", "target"],
  umowa: ["agreement", "contract", "msa"],
  umowy: ["agreement", "contract", "msa"],
  ramowa: ["master"],
  ramowej: ["master"],
  podpisana: ["entered", "signed", "effective"],
  zawarta: ["entered", "signed", "effective"],
  stycznia: ["january"],
  styczeń: ["january"],
  lutego: ["february"],
  marca: ["march"],
  kwietnia: ["april"],
  maja: ["may"],
  czerwca: ["june"],
  lipca: ["july"],
  sierpnia: ["august"],
  września: ["september"],
  października: ["october"],
  listopada: ["november"],
  grudnia: ["december"],
  kara: ["penalty", "liquidated damages", "credit"],
  kary: ["penalty", "liquidated damages", "credit"],
  karę: ["penalty", "liquidated damages", "credit"],
  faktura: ["invoice", "invoicing"],
  faktury: ["invoice", "invoicing"],
  kwartał: ["quarter", "quarterly", "q4"],
  kwartalnie: ["quarter", "quarterly", "q4"],
  czwarty: ["fourth", "q4", "quarter"],
  indeksacja: ["indexation", "adjustment", "cpi"],
  inflacja: ["inflation", "cpi"],
  inflacji: ["inflation", "cpi"],
  przychody: ["revenues", "sales", "przychód", "sprzedaż"],
  przychód: ["revenues", "sales"],
  operacyjne: ["operating", "operations", "operacyjna", "działalności"],
  operacyjna: ["operating", "operations"],
  zysk: ["profit", "net"],
  limit: ["limit", "limitation", "cap"],
  odpowiedzialności: ["liability"],
  odpowiedzialność: ["liability"],
  ograniczony: ["limited", "cap"],
  rachunek: ["account", "bank", "remittance"],
  konto: ["account", "bank"],
};

const fileContent = `// Auto-generated dataset for mcp-redline interactive single-page demo
// Generated at: ${new Date().toISOString()}

export const CORPUS_DOCS = ${JSON.stringify(docs, null, 2)};

export const SECTIONS = ${JSON.stringify(sections, null, 2)};

export const BILINGUAL_SYNONYMS = ${JSON.stringify(BILINGUAL_SYNONYMS, null, 2)};

export const SCENARIOS = ${JSON.stringify(scenarios, null, 2)};
`;

fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log('Successfully generated web/data.js (' + Buffer.byteLength(fileContent) + ' bytes, ' + sections.length + ' sections)');

