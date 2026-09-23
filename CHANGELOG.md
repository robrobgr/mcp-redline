# CHANGELOG — mcp-redline

Wszystkie istotne zmiany w projekcie są dokumentowane w tym pliku.

Format oparty na [Keep a Changelog](https://keepachangelog.com/pl/1.0.0/).

---

## [Unreleased]

### 2026-09-23
- **Dodano:**
  - Utworzenie dedykowanego katalogu projektu `1_Projects/mcp-redline`.
  - Inicjalizacja bazowych plików higieny projektu: `README.md`, `MEMORY.md`, `BACKLOG.md`, `CHANGELOG.md`, `.env.example`, `.gitignore`.
  - Przeprowadzenie analizy Etapu 0 (Bramka zero): audyt rejestrów MCP, repozytoriów GitHub, paczek npm/PyPI pod kątem serwerów weryfikacji i cytowania.
  - Sprawdzenie dostępności nazwy: zatwierdzenie nazwy `mcp-redline` (dostępna w npm i PyPI).
  - Werdykt Bramki Zero: **BUDUJEMY** (zaakceptowany).
  - Wpisanie do `BACKLOG.md` i `MEMORY.md` decyzji o wykorzystaniu oddzielnego silnika, modelu GEMINI lub nowego NotebookLM do generowania fikcyjnego korpusu w Etapie 1.
  - **Etap 2: Implementacja serwera MCP (`mcp-redline` w Node.js + TypeScript):**
    - Konfiguracja środowiska: `package.json`, `tsconfig.json`, licencja MIT w pliku `LICENSE`.
    - Implementacja silnika `src/index.ts` z obsługą protokołu MCP przez `StdioServerTransport` i 4 narzędziami: `list_sources`, `search`, `quote`, `verify`.
    - Deterministyczny algorytm weryfikacji bez LLM z hierarchią dowodów kontraktowych, wykrywaniem sprzeczności/odmów i badaniem pokrycia pojęciowego.
    - Opracowanie i przejście testów automatycznych w `tests/server.test.ts` (100% pass) z twardą weryfikacją wyniku `UNSUPPORTED`.
    - Potwierdzenie działania protokołu JSON-RPC na stdin/stdout bez wywołań sieciowych.
    - Aktualizacja `README.md` z instrukcją czystego klona, konfiguracją klienta MCP i zapisem sesji z wynikiem `UNSUPPORTED`.
  - **Etap 3: Zestaw 10 promptów ewaluacyjnych z surowymi wynikami:**
    - Zdefiniowanie 10 twierdzeń testowych (4x GROUNDED, 4x UNSUPPORTED, 2x graniczne).
    - Implementacja narzędzia ewaluacyjnego `scripts/eval.js` i komendy `npm run eval`.
    - Uruchomienie na żywo na serwerze i wygenerowanie surowego raportu maszynowego `prompts_eval/results_raw.json` z czasem wykonania poniżej 3 ms na zapytanie.
  - **Etap 4: Trzy diagramy architektury i infografika instruktażowa:**
    - Wygenerowanie i wyrenderowanie 3 diagramów w formacie Mermaid i SVG w katalogu `diagrams/`:
      - `01_verify_flow` (algorytm verify bez LLM, deterministyczna ścieżka do UNSUPPORTED/GROUNDED).
      - `02_ciso_data_boundary` (granica bezpieczeństwa CISO: zero wycieku danych, 100% lokalny obieg w stdio).
      - `03_rag_vs_redline` (porównanie tradycyjnego podejścia RAG z deterministycznym mcp-redline).
    - Opracowanie `diagrams/README.md` z opisem technicznym każdego przepływu.
    - Wygenerowanie autorskiej, wysokiej jakości infografiki instruktażowej `diagrams/mcp_redline_infographic.jpg` przy użyciu Gemini Image Creation, przedstawiającej krok po kroku uruchomienie serwera offline.
  - **Etap 5: Wizualne demo single-page HTML (Web / Vercel):**
    - Projekt UX/UI opracowany za pomocą **Stitch UX/UI MCP** (projekt `mcp-redline-demo`, dark mode enterprise console).
    - Implementacja kompletnej, w 100% statycznej aplikacji single-page w `web/index.html` z dynamicznym datasetem w `web/data.js`.
    - Moduł porównawczy A/B: Standardowy model (syntetyzujący/halucynujący, analiza ryzyka i ekspozycji prawnej/finansowej) vs `mcp-redline` (ścisły cytat lub twarda odmowa `UNSUPPORTED`).
    - Eksplorator korpusu z oznaczaniem Tierów prawnych oraz oknem podglądu pełnej zawartości dokumentów i sum kontrolnych SHA-256.
    - Inspektor protokołu JSON-RPC 2.0 (żądania, odpowiedzi, ślad stdio z mikrosekundową precyzją).
    - Zintegrowana przeglądarka infografiki instruktażowej i 3 diagramów architektury CISO.
    - Konfiguracja `vercel.json` i skrypt `npm run demo` do uruchamiania w trybie zerowego backendu.
  - **Poprawka silnika Web SPA:**
    - Przeniesienie pełnego algorytmu `RedlineEngine` (tokenizacja, stopwordy, synonimy dwujęzyczne, scoring sekcji, ekstrakcja liczb) do kodu klienta w `web/index.html`.
    - Obsługa pytań otwartych (np. *"jakie są przychody operacyjne?"*) przez deterministyczny mechanizm wyszukiwania i cytowania `search & quote`, zamiast naiwnego dopasowywania pełnego podciągu.
    - Weryfikacja: zapytanie o przychody natychmiast odnajduje oficjalny RZiS (`05_Rachunek_Zyskow_i_Strat_2024_PLN.md`) ze statusem `GROUNDED` i dokładną tabelą (Pozycja A: 48 520 000 PLN, Pozycja D: 180 000 PLN).


