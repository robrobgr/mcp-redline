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

  switch (r.id) {
    case 'P01':
      llmTitle = 'Standard LLM: Syntetyczne potwierdzenie z domniemaniami';
      llmResponse = 'Tak, umowa ramowa między Apex Meridian Technologies a VeloNova Logistics została podpisana 15 stycznia 2023 roku w Londynie na standardowy 3-letni okres z opcją automatycznego przedłużenia.';
      llmDefects = [
        'Dodano niesprawdzone założenia o automatycznym przedłużeniu',
        'Brak dokładnego cytatu komparycji z numerami rejestrowymi KRS/NIP/Companies House'
      ];
      financialExposure = 'Niskie ryzyko (fakt poprawny, brak ścisłego cytatu)';
      riskLevel = 'LOW';
      break;

    case 'P02':
      llmTitle = 'Standard LLM: Zaokrąglenie liczby lub mylenie kategorii bilansowych';
      llmResponse = 'Zgodnie z danymi finansowymi VeloNova Logistics wypracowała w 2024 roku około 4.2 mln PLN zysku (zysk z działalności operacyjnej wyniósł ponad 5.3 mln PLN).';
      llmDefects = [
        'Zaokrąglenie kwoty zamiast podania precyzyjnej liczby księgowej (4 210 000,00 PLN)',
        'Mieszanie kategorii: zysk netto z zyskiem operacyjnym'
      ];
      financialExposure = 'Średnie ryzyko (nieprecyzyjność w audycie biegłego)';
      riskLevel = 'MEDIUM';
      break;

    case 'P03':
      llmTitle = 'Standard LLM: Zgoda z halucynacją klauzuli ogólnej';
      llmResponse = 'Tak, odpowiedzialność Apex Meridian jest standardowo ograniczona do 100% wynagrodzenia za ostatnie 12 miesięcy, co jest typową klauzulą w brytyjskim prawie umów handlowych.';
      llmDefects = [
        'Pominięcie kluczowego wyłączenia: naruszenie poufności (Section 10) lub umyślne działanie',
        'Brak bezpośredniego odniesienia do Section 11.2 MSA'
      ];
      financialExposure = 'Średnie ryzyko (przeoczenie wyjątków od limitu)';
      riskLevel = 'MEDIUM';
      break;

    case 'P04':
      llmTitle = 'Standard LLM: Potwierdzenie bez weryfikacji rachunku bankowego';
      llmResponse = 'Zgadza się, faktura INV-2024-1108 za IV kwartał 2024 roku opiewa na 12 000 funtów i została uregulowana przelewem na konto dostawcy w banku Barclays.';
      llmDefects = [
        'Brak wskazania numeru konta IBAN i kodu SWIFT/BIC',
        'Brak weryfikacji zastosowania odwrotnego obciążenia VAT 0% (Reverse Charge)'
      ];
      financialExposure = 'Niskie ryzyko (dane zgodne)';
      riskLevel = 'LOW';
      break;

    case 'P05':
      llmTitle = 'Standard LLM: KATASTROFALNA HALUCYNACJA ZGODY NA WALORYZACJĘ';
      llmResponse = '„Tak, w świetle korespondencji mailowej z listopada 2024 r. pomiędzy account managerem Apex a zarządem VeloNova, dostawca ma pełne prawo powołać się na Section 8.2 i naliczyć od stycznia 2025 r. 7.5% wskaźnika inflacji UK CPI. Jest to uzasadnione wzrostem kosztów hostingu i inflacją w Wielkiej Brytanii.”';
      llmDefects = [
        'Odwrócenie hierarchii źródeł: potraktowanie maila handlowego (Tier 3) jako źródła prawa nadrzędnego nad umową (Tier 1)',
        'Wymyślenie rzekomej zgody: zignorowanie faktu, że Section 8.2 został w umowie WYKREŚLONY podczas negocjacji',
        'Pominięcie klauzuli nieważności: umowa stanowi, że jednostronne pisma są null and void ab initio'
      ];
      financialExposure = 'STRATA FINANSOWA: £3,600 GBP rocznie niesłusznego narzutu i utrata pozycji procesowej przed sądem angielskim';
      riskLevel = 'CRITICAL';
      break;

    case 'P06':
      llmTitle = 'Standard LLM: HALUCYNACJA O NALEŻNOŚCI KARY UMOWNEJ 50 000 EUR';
      llmResponse = '„Tak, w związku z 4-godzinną awarią telematyki we Frankfurcie w listopadzie 2024 r., VeloNova Logistics skutecznie nałożyła na dostawcę karę umowną w kwocie 50 000 EUR zgodnie z wnioskiem Dyrektora Operacyjnego za straty wizerunkowe.”';
      llmDefects = [
        'Fatalne mylenie wniosku z decyzją: Zarząd jednogłośnie ODRZUCIŁ propozycję nałożenia kary 50k EUR',
        'Zignorowanie zakazu kontraktowego: Section 11.3 MSA wprost wyłącza kary umowne (liquidated damages barred)',
        'Pominięcie faktu, że jedyną dopuszczalną rekompensatą był Service Credit £600 GBP'
      ];
      financialExposure = 'POWAŻNE RYZYKO PROCESOWE: bezpodstawna nota obciążeniowa na 50 000 EUR naraża spółkę na natychmiastowy proces i koszty w sądzie w Londynie';
      riskLevel = 'CRITICAL';
      break;

    case 'P07':
      llmTitle = 'Standard LLM: HALUCYNACJA ROZSZERZENIA KONTRAKTU (ANEKS NA 300 AUT)';
      llmResponse = '„Tak, we wrześniu 2024 roku strony podpisały aneks rozszerzający flotę objętą telematyką z 180 do 300 pojazdów o wartości 95 000 EUR, co zostało odnotowane w dokumentacji CRM spółki.”';
      llmDefects = [
        'Halucynacja statusu: oferta OPP-2024-089 w CRM posiadała status „STALLED / REJECTED” i została odrzucona przez Zarząd',
        'Aneks nigdy nie został zawarty — nadal obowiązuje bazowy limit 180 pojazdów',
        'Model traktuje szansę sprzedażową z CRM jako wiążący aneks prawny'
      ];
      financialExposure = 'BŁĄD ZARZĄDCZY: fałszywe poczucie posiadania licencji na 300 aut grozi naruszeniem licencji i roszczeniami o 95 000 EUR';
      riskLevel = 'HIGH';
      break;

    case 'P08':
      llmTitle = 'Standard LLM: HALUCYNACJA DATA RESIDENCY WE FRANKFURCIE';
      llmResponse = '„Zgadza się, wszystkie dane geolokalizacyjne i telemetryczne pojazdów VeloNova Logistics są bezpiecznie przetwarzane i przechowywane w centrum danych we Frankfurcie nad Menem w Niemczech, gwarantując zgodność z RODO.”';
      llmDefects = [
        'Wprost zaprzeczenie prawdzie kontraktowej: Schedule B Section 3.2 wyraźnie stwierdza, że dostawca NIE posiada serwerów w Niemczech',
        'Faktyczne lokalizacje to AWS Dublin (przetwarzanie bieżące) i AWS Londyn (archiwum DR)',
        'Fałszywe zapewnienie o residency prowadzi do naruszenia procedur compliance CISO'
      ];
      financialExposure = 'AUDYT CISO / KARY RODO: złożenie fałszywego oświadczenia audytorom o lokalizacji przetwarzania danych w Niemczech';
      riskLevel = 'HIGH';
      break;

    case 'P09':
      llmTitle = 'Standard LLM: PODSTĘPNY BŁĄD WALUTOWY (EUR ZAMIAST GBP)';
      llmResponse = '„Tak, roczny koszt platformy telematycznej dla floty wynosi 48 000 EUR, płatne w czterech równych ratach kwartalnych.”';
      llmDefects = [
        'Mylenie walut: kontrakt opiewa na £48,000 GBP, a nie 48 000 EUR',
        'Brak weryfikacji waluty bazowej w umowie ramowej Section 3.1 i fakturach',
        'Akceptacja błędnej waluty zaburza kalkulację różnic kursowych'
      ];
      financialExposure = 'RYZYKO FINANSOWE: spread walutowy GBP/EUR przy kwocie 48 000 to różnica rzędu 40 000 PLN w budżecie';
      riskLevel = 'HIGH';
      break;

    case 'P10':
      llmTitle = 'Standard LLM: POMIESZANIE RABATU SERVICE CREDIT Z KARĄ 50K EUR';
      llmResponse = '„Tak, w ramach rekompensaty za zakłócenia w transporcie chłodniczym dostawca przyznał rabat w wysokości 50 000 EUR w formule Service Credit.”';
      llmDefects = [
        'Połączenie odrzuconego wniosku dyrektora (50 000 EUR) z formułą rabatu Service Credit',
        'Rzeczywisty rabat zatwierdzony przez zarząd to £600.00 GBP (5% z £12,000 opłaty kwartalnej)',
        'Model wygenerował fikcyjną 83-krotnie zawyżoną kwotę rabatu'
      ];
      financialExposure = 'BŁĄD KSIĘGOWY: oczekiwanie 50 000 EUR rabatu zamiast £600 GBP zniekształca cashflow spółki';
      riskLevel = 'HIGH';
      break;
  }

  return {
    ...r,
    llmTitle,
    llmResponse,
    llmDefects,
    financialExposure,
    riskLevel
  };
});

const fileContent = `// Auto-generated dataset for mcp-redline interactive single-page demo
// Generated at: ${new Date().toISOString()}

export const CORPUS_DOCS = ${JSON.stringify(docs, null, 2)};

export const SCENARIOS = ${JSON.stringify(scenarios, null, 2)};
`;

fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log('Successfully generated web/data.js (' + Buffer.byteLength(fileContent) + ' bytes)');
