# BACKLOG — mcp-redline

---

## Zadania ukończone (Done)

- [x] **Etap 0: Bramka zero — Audyt rynku i rejestrów**
  - Przeszukanie oficjalnego rejestru MCP (`modelcontextprotocol/servers`), awesome-mcp-servers, GitHub, npm i PyPI pod kątem serwerów weryfikacji i cytowania.
  - Weryfikacja dostępności nazwy `mcp-redline` (npm: wolna, PyPI: wolna, GitHub handle: wolny).
  - Sporządzenie raportu z listą najbliższych odpowiedników (`shinpr/mcp-local-rag`, `Franksterino/citeguard`, `fabio-rovai/tardygrada`, `2akouwu/reverify`).
  - Werdykt: **BUDUJEMY** (zaakceptowany).
  - Inicjalizacja dedykowanego katalogu projektu (`1_Projects/mcp-redline`) i plików higieny (`README.md`, `MEMORY.md`, `BACKLOG.md`, `CHANGELOG.md`, `.env.example`, `.gitignore`).

---

## Zadania w toku / Kolejny krok (In Progress / Next)

- [x] **Etap 1: Przygotowanie korpusu fikcyjnych firm z pułapkami (Ground Truth)**
  - Zdefiniowanie relacji: Apex Meridian Technologies Ltd (Global UK SaaS) i VeloNova Logistics Sp. z o.o. (Polska/UE).
  - Opracowanie `00_Master_Fact_Sheet.md` z listą twardych faktów i matrycą 4 celowych pułapek.
  - Wygenerowanie 7 powiązanych dokumentów w `corpus/`:
    - `01_Apex_VeloNova_MSA_2023.md` (Umowa ramowa na 36 miesięcy, £48k GBP rocznie, brak jednostronnej waloryzacji).
    - `02_Schedule_B_Service_Levels_and_Credits.md` (SLA 99.8%, Service Credits, hosting AWS Dublin/London, brak hostingu w DE).
    - `03_Invoice_INV-2024-1108.md` (Faktura za Q4 2024 na £12,000 GBP, Reverse Charge).
    - `04_Email_Thread_Inflation_Dispute_Nov2024.md` (Wątek sporu o 7.5% UK CPI z analizą prawną i odmową).
    - `05_Rachunek_Zyskow_i_Strat_2024_PLN.md` (P&L 2024: 48.52 mln PLN przychodu, 4.21 mln PLN zysku netto).
    - `06_Protokol_Zarzadu_VeloNova_11_2024.md` (Protokół zarządu: awaria we Frankfurcie, odrzucenie kary 50k EUR, limit Service Credit do £600).
    - `07_CRM_Export_Enterprise_Contracts_2024.md` (Eksport CRM: szansa rozszerzenia do 300 aut za 95k EUR jako Stalled/Rejected).

---

- [x] **Etap 2: Implementacja serwera MCP (`mcp-redline`)**
  - Wybór technologii: Node.js + TypeScript (ESM, strict mode).
  - Implementacja 4 narzędzi MCP: `list_sources`, `search`, `quote`, `verify`.
  - Deterministyczny algorytm weryfikacji w `verify` bez udziału modelu LLM (hierarchia autorytatywności dokumentów, wykrywanie klauzul negacyjnych i sprzeczności, badanie pokrycia pojęciowego, dyskretne dopasowanie liczb).
  - Zapewnienie działania po `stdio`, zero sieci, zero telemetrii, brak zewnętrznych kluczy API.
  - Pakiet testów automatycznych w `node:test` (5 testów, 100% pass), w tym kluczowy test sprawdzający zwrot `UNSUPPORTED` dla twierdzeń fałszywych i celowych pułapek.
  - Licencja MIT, plik `LICENSE` i kompletna dokumentacja uruchomienia w `README.md`.

---

## Zadania w toku / Kolejny krok (In Progress / Next)

- [x] **Etap 3: Zestaw 10 promptów ewaluacyjnych z surowymi wynikami**
  - Opracowanie 10 precyzyjnych twierdzeń ewaluacyjnych (4x GROUNDED, 4x UNSUPPORTED z pułapkami, 2x przypadki graniczne).
  - Skrypt ewaluacyjny [`scripts/eval.js`](file:///Users/robert/Code/1_Projects/mcp-redline/scripts/eval.js) (`npm run eval`).
  - Zapis surowych danych maszynowych z datą i czasem w [`prompts_eval/results_raw.json`](file:///Users/robert/Code/1_Projects/mcp-redline/prompts_eval/results_raw.json).
  - Tabela podsumowująca i szczegółowy raport w [`prompts_eval/EVALUATION_REPORT.md`](file:///Users/robert/Code/1_Projects/mcp-redline/prompts_eval/EVALUATION_REPORT.md).
  - 100% zgodności wyników z oczekiwaną matrycą faktów (Ground Truth).

---

## Zadania w toku / Kolejny krok (In Progress / Next)

- [x] **Etap 4: Trzy diagramy architektury i infografika instruktażowa** (Ukończono: 2026-09-23)
  - Diagram 1: Przepływ `verify` ([`diagrams/01_verify_flow.svg`](file:///Users/robert/Code/1_Projects/mcp-redline/diagrams/01_verify_flow.svg) i Mermaid) – od twierdzenia do `GROUNDED`/`UNSUPPORTED` bez LLM.
  - Diagram 2: Granica danych dla CISO ([`diagrams/02_ciso_data_boundary.svg`](file:///Users/robert/Code/1_Projects/mcp-redline/diagrams/02_ciso_data_boundary.svg) i Mermaid) – 100% danych lokalnie na maszynie, 0 bajtów do sieci.
  - Diagram 3: Porównanie tradycyjnego RAG z deterministycznym `mcp-redline` ([`diagrams/03_rag_vs_redline.svg`](file:///Users/robert/Code/1_Projects/mcp-redline/diagrams/03_rag_vs_redline.svg) i Mermaid).
  - Infografika instruktażowa: wygenerowana w wysokiej rozdzielczości przy pomocy **Gemini Image Creation** ([`diagrams/mcp_redline_infographic.jpg`](file:///Users/robert/Code/1_Projects/mcp-redline/diagrams/mcp_redline_infographic.jpg)) – gotowa do użycia w web demo.

---

- [x] **Etap 5: Wizualne demo single-page HTML (Web / Vercel)** (Ukończono: 2026-09-23)
  - Projekt UX/UI wygenerowany i ustrukturyzowany z wykorzystaniem **Stitch UX/UI MCP** (ID projektu: `15076906372090000593`).
  - Samodzielna aplikacja webowa SPA w katalogu [`web/index.html`](file:///Users/robert/Code/1_Projects/mcp-redline/web/index.html) oraz skompilowany dataset [`web/data.js`](file:///Users/robert/Code/1_Projects/mcp-redline/web/data.js).
  - Interaktywny eksplorator wszystkich 7 dokumentów korpusu z oznaczaniem Tierów prawnych i pełnym podglądem tekstu w oknie modalnym.
  - Narzędzie porównawcze A/B dla 10 scenariuszy ewaluacyjnych: Halucynujący Standardowy LLM (z analizą ekspozycji prawnej/finansowej) vs Deterministyczny `mcp-redline` (ścisły cytat lub twarda odmowa `UNSUPPORTED`).
  - Inspektor protokołu JSON-RPC 2.0 na żywo (żądania RPC, odpowiedzi oraz symulacja śladu stdio IPC).
  - Wbudowane modale: Infografika wygenerowana przez Gemini Image Creation oraz 3 diagramy wektorowe architektury SVG.
  - Konfiguracja zero-backend gotowa do natychmiastowego wdrożenia na Vercel ([`vercel.json`](file:///Users/robert/Code/1_Projects/mcp-redline/vercel.json)) oraz lokalne uruchomienie przez `npm run demo`.

---

## Zadania w toku / Kolejny krok (In Progress / Next)

- [ ] **Etap 6: Wideo demo (90 s) i integracja z NotebookLM**
  - Scenariusz: korpus → poprawne zapytanie → wiarygodne zapytanie z wynikiem `UNSUPPORTED` → dowód pracy offline (wyłączone Wi-Fi).
  - Wersja wizualizująca w NotebookLM jako plan awaryjny na szkolenia stacjonarne.

---

## Audyt 2026-09-24 — naprawa rdzenia (P0)

- [x] **P0-1** Usunięcie pułapek wpisanych na sztywno z `verify`; ogólny silnik (pokrycie IDF, liczby z walutą, polaryzacja, ranga źródeł, wiązanie stron). (2026-09-24)
- [x] **P0-2** Trzy statusy: `GROUNDED` / `CONTRADICTED` / `UNSUPPORTED`. (2026-09-24)
- [x] **P0-3** Cytaty zdaniowe zamiast całych sekcji, dosłowność sprawdzana testem. (2026-09-24)
- [x] **P0-4** `eval.js` z asercjami i kodem wyjścia. (2026-09-24)
- [x] **P0-5** Zestaw 64 twierdzeń z podziałem dev/holdout; raport generowany automatycznie. (2026-09-24)
- [ ] **P0-5b** Nowy, czysty holdout (min. 30 twierdzeń) spisany przez osobę, która nie widziała kodu silnika.
- [ ] **P0-6** Web demo offline: Tailwind i fonty lokalnie zamiast CDN; własny serwer statyczny zamiast `npx serve`.
- [ ] **P0-7** Web demo: oznaczyć odpowiedzi „Standard LLM” jako symulowane albo zastąpić prawdziwymi, zapisanymi odpowiedziami modelu (model + data).

## Dokumentacja i Landing Page (Edukacja Zarządów & CISO)

- [x] **UI-STORY: Interaktywny Storytelling UI („Kłamstwo pod presją vs Cyfrowy Rewident”)** (W toku / Wdrożenie)
  - Zbudować dedykowany tryb narracyjny / interaktywną ścieżkę edukacyjną w UI (na landing page i w konsoli web demo), która krok po kroku opowiada historię i tłumaczy mechanizmy decyzyjne:
    1. **Przełącznik 3 Perspektyw (Triad Switcher):**
       - *Perspektywa 1: Tylko LLM bez MCP Redline* — niekontrolowana generacja, uleganie presji pytającego, gładkie potakiwanie na fałszywe twierdzenia, halucynowanie podstaw prawnych i brak ścisłego cytatu.
       - *Perspektywa 2: LLM + MCP Redline (Protected Agent)* — pętla agenta, deterministyczne przechwycenie halucynacji w locie, zmuszenie modelu do cytowania Tier 1 lub twardej odmowy `UNSUPPORTED`.
       - *Perspektywa 3: Gdy MCP Redline ma wątpliwości / błąd wejścia (Fail-Safe & Asymetria Ryzyka)* — co jeśli serwer odmówi z ostrożności? Wyjaśnienie asymetrii ryzyka: False Negative to zaledwie 3-5 minut audytu człowieka (~30 PLN), podczas gdy False Positive modelu LLM to katastrofalna strata finansowa (setki tysięcy złotych/funtów/euro). Prezentacja jawności cytatów (zero czarnej skrzynki).
    2. **Licznik Ryzyka Finansowego i Odpowiedzialności Zarządczej (Financial Liability & Risk Meter):**
       - Precyzyjna kalkulacja ekspozycji finansowej dla każdego ze scenariuszy testowych:
         * Scenariusz P05 (CPI 7.5%): bezprawna nadpłata £3,600/rok na umowie, a w skali korporacyjnej utrata kontroli nad 100 kontraktami = **£184,200** nieuzasadnionych kosztów.
         * Scenariusz P06 (Kara 50k EUR): bezprawna nota obciążeniowa i odpis księgowy = **50 000 EUR** (~215 000 PLN) + koszty procesu w Londynie.
         * Scenariusz P07 (Aneks 300 aut): fikcyjne rozszerzenie licencji w budżecie = **95 000 EUR**.
         * Scenariusz P09 (Błąd walutowy EUR vs GBP): spread walutowy przy 48k = **~40 000 PLN** straty budżetowej.
       - Porównanie 3 wskaźników: *Ekspozycja LLM* (np. 50 000 EUR) vs *Ochrona Redline* (£0 / 0 PLN) vs *Koszt Fail-Safe* (~30 PLN / 5 min audytu).
    3. **Ślad Myślowy Agenta i Intercepcja w Locie (Agent Thought Interception Trace):**
       - Wizualizacja pętli decyzyjnej: 1. Prompt wejściowy -> 2. Surowy szkic LLM (uległa halucynacja) -> 3. Hak narzędziowy MCP Redline (`verify` -> `UNSUPPORTED`) -> 4. Ostateczna skorygowana odpowiedź agenta.
    4. **Symulator Zdegradowanych Danych (Dirty OCR & Noise Simulator):**
       - Przełącznik symulujący zaszumione wejście (błędy OCR, przestawione znaki, literówki), obrazujący odporność atomowego dopasowania i bezpieczne wycofanie do Fail-Safe.
    5. **Przewodnik Narracyjny (Guided Story Walkthrough Modal):**
       - Interaktywny modal oprowadzający po 3 aktach dramatu decyzyjnego: Akt 1 (Pułapka modelu), Akt 2 (Anatomia silnika 5-etapowego), Akt 3 (Asymetria ryzyka i zaufanie zarządu).
- [ ] **DOC-1: Landing Page / Web Demo — sekcja „Dlaczego determinizm wygrywa z LLM”**
  - Dodać do landing page / web demo dedykowaną sekcję lub panel edukacyjny wyjaśniający działanie algorytmu krok po kroku (5 etapów silnika).
  - Umieścić tabelaryczne porównanie: model probabilistyczny (LLM) vs deterministyczny algorytm weryfikacyjny (`mcp-redline`).
  - Podkreślić kluczowe argumenty: odporność na zjawisko *Lost in the Middle*, atomowa zgodność liczb i walut (brak zniekształceń tokenizacji BPE), zasada „mechanizm antyhalucynacyjny sam nie może halucynować” oraz 100% audytowalność offline.
- [ ] **DOC-2: Rozbudowa dokumentacji GitHub (`README.md`, `docs/ARCHITECTURE.md`)**
  - Wprowadzić do `README.md` oraz dokumentacji repozytorium GitHub szczegółowy opis techniczny algorytmu (Multi-Tier Semantic Fact-Checking & Precedence Resolution).
  - Opisać 5 etapów potoku weryfikacji (normalizacja, ontologia PL/EN, bramka hierarchii prawnej, dopasowanie liczb i walut, badanie pokrycia predykatu merytorycznego).
  - Dodać uzasadnienie biznesowe i architektoniczne dla CISO i Zarządów: dlaczego prosty lokalny kod jest skuteczniejszy i bezpieczniejszy w roli cyfrowego rewidenta niż potężny model zewnętrzny.

## P1 — jakość i utrzymanie

- [ ] `package.json`: `main`/`bin` wskazują nieistniejący `dist/index.js` (jest `dist/src/index.js`); dodać `files`.
- [ ] Web demo: zbudować silnik z `src/` (np. esbuild) zamiast ręcznej kopii w `web/index.html` — dziś demo działa na starym silniku.
- [ ] Ranga źródła z nagłówka dokumentu (`tier: 1`) zamiast z nazwy pliku.
- [ ] Wiązanie wartości z kolumną tabeli (rok 2024 vs 2023 w RZiS).
- [ ] Rozdzielić build i testy w `tsconfig`.


