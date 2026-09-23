# MEMORY — mcp-redline

Plik pamięci trwałej projektu, zawierający kluczowe ustalenia architektoniczne, decyzje projektowe, konwencje i zidentyfikowane pułapki.

---

## 1. Ustalenia i decyzje projektowe

* **Nazwa projektu:** `mcp-redline` (sprawdzona w Etapie 0: nazwa wolna w rejestrach npm, PyPI oraz jako handle GitHub).
* **Teza i cel:** Budowa zaufania do AI w biznesie poprzez twardą zasadę ograniczonego zaufania. Model ma odpowiadać wyłącznie na podstawie dosłownych cytatów lub jawnie odmawiać odpowiedzi (`UNSUPPORTED`).
* **Zasada determinizmu:** Narzędzie `verify` **nie może używać modelu LLM**. Mechanizm sprawdzający halucynacje sam nie może podlegać ryzyku halucynacji. Weryfikacja musi być w 100% powtarzalna i audytowalna.
* **Architektura transportu:** Wyłącznie **stdio**. Brak HTTP/SSE czy hostingu w chmurze – dokumenty nigdy nie opuszczają stacji roboczej użytkownika (kluczowe dla CISO, compliance i tajemnicy przedsiębiorstwa).
* **Zero sieci i zero telemetrii:** Kod serwera nie może wykonywać żadnych połączeń wychodzących (musi bezbłędnie działać na sali szkoleniowej z fizycznie odciętym Wi-Fi).
* **Format i wielkość kodu:** Serwer docelowo w jednym pliku, rzędu ~150 linii kodu (TypeScript / Node.js lub Python – transparentny i możliwy do audytu w kilka minut).

---

## 2. Podmioty i korpus testowy (Wdrożony Etap 1)

* **Podmioty:**
  * **Global / UK:** `Apex Meridian Technologies Ltd` (Londyn, Canary Wharf; platforma SaaS telematyki i monitoringu chłodniczego dla floty).
  * **Polska / EU:** `VeloNova Logistics Sp. z o.o.` (Warszawa; transport farmaceutyczny i chłodniczy w UE, 180 naczep, 48,5 mln PLN przychodu w 2024 r.).
* **Korpus (`corpus/`):**
  * `00_Master_Fact_Sheet.md` — arkusz prawdy i matryca faktów vs pułapek.
  * `01_Apex_VeloNova_MSA_2023.md` — umowa ramowa na 36 miesięcy (£48,000 GBP rocznie, prawo angielskie, Section 8.2 wykluczający jednostronną indeksację, Section 11.2 cap na odpowiedzialność).
  * `02_Schedule_B_Service_Levels_and_Credits.md` — SLA 99.8%, Service Credits (5-15%), hosting AWS Dublin i London (brak serwerów w Niemczech).
  * `03_Invoice_INV-2024-1108.md` — faktura za Q4 2024 (£12,000 GBP, Reverse Charge VAT 0%).
  * `04_Email_Thread_Inflation_Dispute_Nov2024.md` — spór o rzekomą podwyżkę 7.5% UK CPI z formalną odmową.
  * `05_Rachunek_Zyskow_i_Strat_2024_PLN.md` — P&L za 2024 (48,52 mln PLN przychodów, 4,21 mln PLN zysku netto).
  * `06_Protokol_Zarzadu_VeloNova_11_2024.md` — protokół zarządu: odrzucenie wniosku o karę 50k EUR za awarię, limitowanie roszczeń do £600 Service Credit.
  * `07_CRM_Export_Enterprise_Contracts_2024.md` — eksport CRM: szansa rozszerzenia floty do 300 aut za 95 000 EUR ze statusem STALLED / REJECTED.
* **4 Celowe Pułapki (`UNSUPPORTED`):**
  1. *Automatyczna indeksacja inflacyjna UK CPI 7.5% bez zgody klienta* (zmyłka w mailu, wykreślona w umowie).
  2. *Kara umowna 50 000 EUR za awarię telematyki we Frankfurcie* (propozycja w dyskusji odrzucona przez zarząd z powodu zakazu w umowie).
  3. *Podpisanie w Q3 2024 aneksu na 300 aut o wartości 95 000 EUR* (oferta w CRM odrzucona/martwa).
  4. *Wyłączny hosting i przetwarzanie danych telemetrycznych na terenie Niemiec* (w rzeczywistości AWS Dublin i AWS Londyn).

---

## 3. Silnik weryfikacji mcp-redline (Wdrożony Etap 2)

* **Architektura:** Node.js + TypeScript, `@modelcontextprotocol/sdk` (McpServer + StdioServerTransport).
* **Zasady weryfikacji w `verify`:**
  * **Hierarchia dowodów (Authority Tiers):** Tier 1 (Umowa MSA, Załączniki, Faktury, P&L, Protokoły Zarządu) przeważają nad Tier 2 (CRM) i Tier 3 (Korespondencja mailowa).
  * **Wykrywanie sporów:** Jeżeli roszczenie z maila stoi w sprzeczności z podpisaną umową (np. wykreślona klauzula CPI), silnik zwraca `UNSUPPORTED` z podaniem klauzuli kontraktowej.
  * **Dyskretne dopasowanie liczb:** Izolacja liczb całkowitych i ułamkowych uniemożliwia błędy fałszywego dopasowania podciągów (np. liczba `50` nie dopasuje się do `15 250 000`).
  * **Substantive Coverage:** Wymóg obecności co najmniej 55-60% kluczowych tokenów merytorycznych twierdzenia (poza nazwami spółek) w cytowanym fragmencie, co odcina halucynacje o nieistniejących obiektach.
  * **Zero sieci i telemetrii:** Testy uruchamiane przez natywny moduł `node:test` bez zewnętrznych bibliotek testowych.


---

## 4. Ewaluacja 10 promptów (Wdrożony Etap 3)

* **Skrypt ewaluacji:** `npm run eval` uruchamia testy weryfikacji 10 twierdzeń.
* **Wyniki:** 100% trafności (4x GROUNDED, 4x UNSUPPORTED, 2x graniczne UNSUPPORTED).
* **Średni czas weryfikacji:** < 3 ms na twierdzenie, bez wywołań sieciowych i bez modeli zewnętrznych.
* **Lokalizacja raportu:** [`prompts_eval/EVALUATION_REPORT.md`](file:///Users/robert/Code/1_Projects/mcp-redline/prompts_eval/EVALUATION_REPORT.md) oraz [`prompts_eval/results_raw.json`](file:///Users/robert/Code/1_Projects/mcp-redline/prompts_eval/results_raw.json).

---

## 5. Narzędzia wizualne i interfejsy (Etap 4 i 5 ukończone)

* **Diagramy i infografika instruktażowa (Etap 4 - ukończony):**
  * Zbudowano 3 diagramy architektury w formatach Mermaid i SVG (`diagrams/`):
    * `01_verify_flow` (algorytm deterministyczny verify, zero LLM, ścieżki do UNSUPPORTED).
    * `02_ciso_data_boundary` (granica bezpieczeństwa CISO, 100% lokalne stdio, 0% sieci).
    * `03_rag_vs_redline` (zestawienie tradycyjnego RAG z deterministycznym mcp-redline).
  * Wygenerowano przy użyciu **Gemini Image Creation** autorską infografikę: [`diagrams/mcp_redline_infographic.jpg`](file:///Users/robert/Code/1_Projects/mcp-redline/diagrams/mcp_redline_infographic.jpg) – przedstawia instrukcję startu i architekturę.
* **Interfejs webowy Single-Page HTML (Etap 5 - ukończony):**
  * Opracowano dedykowany projekt design system w **Stitch UX/UI MCP** (`projects/15076906372090000593`).
  * Zbudowano statyczną aplikację w `web/index.html` z datasetem `web/data.js` zawierającą:
    * Eksplorator 7 dokumentów korporacyjnych z oznaczaniem Tierów prawnych i pełnym podglądem.
    * Narzędzie porównawcze A/B dla 10 scenariuszy ewaluacyjnych (halucynujący standardowy LLM z analizą ekspozycji prawnej/finansowej vs twarda odmowa `UNSUPPORTED` / ścisły cytat `mcp-redline`).
    * Inspektor protokołu JSON-RPC 2.0 na żywo z symulacją śladu stdio IPC.
    * Zintegrowaną przeglądarkę infografiki Gemini i diagramów architektury wektorowej.
    * Gotowość do wdrożenia bez backendu na Vercel (`vercel.json`) oraz uruchomienie lokalne przez `npm run demo`.

---

## 6. Kolejny krok: Etap 6 (Wideo 90s i NotebookLM)

* Przygotowanie scenariusza 90-sekundowego nagrania demonstracyjnego (przegląd korpusu -> zapytanie potwierdzone -> zapytanie pułapka ze statusem `UNSUPPORTED` -> dowód działania offline przy wyłączonym Wi-Fi).
* Przygotowanie materiałów do zasilenia NotebookLM na wypadek awarii na szkoleniu stacjonarnym.


---

## 6. Konwencje i higiena

* W każdej sesji rozpoczynamy od przeczytania: `README.md`, `MEMORY.md`, `BACKLOG.md`, `CHANGELOG.md`.
* Po każdej zmianie aktualizujemy dokumentację projektową.
* Nigdy nie umieszczamy kluczy API ani sekretów w repozytorium ani w dokumentacji (`.env` w `.gitignore`, publicznie tylko `.env.example`).
* Raportowanie zgodne z zasadą: oznaczamy zadanie jako ukończone tylko wtedy, gdy zweryfikowano je w warunkach czystego środowiska (`NIEZWERYFIKOWANE` w przeciwnym razie).
