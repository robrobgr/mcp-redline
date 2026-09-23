# mcp-redline

> **Deterministyczny serwer MCP do weryfikacji faktów w lokalnym korpusie dokumentów z jawną odmową (`UNSUPPORTED`).**

Współczesne modele językowe z dużą pewnością siebie potrafią podawać nieprawdziwe dane, zmyślać liczby i cytaty. `mcp-redline` rozwiązuje ten problem u źródła: daje modelowi dostęp do lokalnego korpusu dokumentów i wymusza oparcie każdej odpowiedzi wyłącznie na dosłownych cytatach i ich lokalizacji. Gdy twierdzenie nie ma bezpośredniego oparcia w źródle — serwer zwraca twarde `UNSUPPORTED` zamiast pozwalać modelowi na konfabulację.

Mechanizm łapiący halucynacje sam nie może halucynować: narzędzie `verify` działa w 100% deterministycznie, bez użycia LLM, bez sieci i bez zewnętrznych zależności.

---

## Narzędzia MCP

| Narzędzie | Argumenty | Zwracana wartość |
|---|---|---|
| `list_sources` | — | Lista dokumentów w korpusie: nazwa, typ, liczba stron / sekcji |
| `search` | `query` | Pasujące fragmenty z `{file, page, quote, score}` |
| `quote` | `file`, `page` | Dosłowny fragment ze źródła, bez parafrazy |
| `verify` | `claim` | `GROUNDED` z cytatem i lokalizacją **albo** `UNSUPPORTED` z informacją, czego nie znaleziono |

---

## Zasady i twarde ograniczenia

* **Zero wywołań sieciowych** — weryfikowalne offline (z wyłączonym Wi-Fi).
* **Transport stdio** — zero transmisji danych do chmury (zgodność z wymogami CISO / ochrona tajemnicy przedsiębiorstwa).
* **Zero telemetrii i logowania treści dokumentów**.
* **Zero halucynacji w weryfikatorze** — `verify` to deterministyczne dopasowanie, nie model LLM.

---

## Struktura projektu

```text
mcp-redline/
├── corpus/               # Korpus testowy fikcyjnej polskiej firmy (z pułapkami)
├── src/                  # Kod serwera MCP (stdio)
├── tests/                # Testy jednostkowe (w tym twardy test na UNSUPPORTED)
├── diagrams/             # Źródła diagramów (Mermaid / SVG)
├── prompts_eval/         # 10 promptów ewaluacyjnych z surowymi wynikami
├── README.md             # Główny opis projektu
├── MEMORY.md             # Ustalenia, decyzje techniczne, pułapki
├── BACKLOG.md            # Rejestr zadań i plan prac
├── CHANGELOG.md          # Historia zmian
├── .env.example          # Wzorzec konfiguracji środowiskowej
└── .gitignore            # Wykluczenia z repozytorium
```

---

## Instalacja i uruchomienie

### Wymagania
* Node.js >= 18.0.0
* npm >= 9.0.0

### Instalacja z czystego klona
```bash
git clone https://github.com/robertgrabowski/mcp-redline.git
cd mcp-redline
npm install
npm run build
```

### Uruchomienie testów automatycznych i ewaluacji
```bash
npm test        # Natywne testy jednostkowe node:test (100% pass)
npm run eval    # Ewaluacja na 10 scenariuszach korporacyjnych (10/10 trafności)
```

---

## Interaktywne Demo Web (Single-Page HTML / A/B Tester)

Projekt zawiera wbudowaną, w 100% statyczną aplikację demonstracyjną zaprojektowaną przy użyciu **Stitch UX/UI**:
* Wizualna porównywarka A/B: Halucynujący Standardowy LLM vs Deterministyczny `mcp-redline`.
* Podgląd wszystkich 10 scenariuszy ewaluacyjnych z pułapkami kontraktowymi.
* Eksplorator korpusu z podglądem pełnej treści dokumentów i wagą prawną (Tier 1 vs Tier 3).
* Inspektor protokołu JSON-RPC na żywo (żądania, odpowiedzi, ślad stdio).
* Pełna infografika Gemini Image Creation oraz diagramy CISO.

Aby uruchomić demo lokalnie:
```bash
npm run demo
```
Aplikacja otworzy się na `http://localhost:3000` (lub innym wolnym porcie) w trybie zero-backend (gotowa do wdrożenia na Vercel).

---

## Konfiguracja klienta MCP (stdio)

Dodaj serwer do konfiguracji swojego klienta (np. Claude Desktop, Cursor, Gemini CLI):

```json
{
  "mcpServers": {
    "mcp-redline": {
      "command": "node",
      "args": ["/sciezka/do/mcp-redline/dist/src/index.js"],
      "env": {
        "MCP_REDLINE_CORPUS_DIR": "/sciezka/do/mcp-redline/corpus"
      }
    }
  }
}
```

---

## Przykładowy zapis sesji (Demonstracja odmowy `UNSUPPORTED`)

### Zapytanie użytkownika:
> *"Czy brytyjski dostawca Apex Meridian ma prawo podnieść nam opłaty o 7.5% UK CPI od stycznia 2025 r.?"*

### Działanie modelu z narzędziem `verify`:
Model wywołuje narzędzie `verify` ze stwierdzeniem wyciągniętym z maila handlowca:
```json
{
  "name": "verify",
  "arguments": {
    "claim": "Apex Meridian ma prawo do jednostronnego podniesienia cen o wskaźnik inflacji 7.5% UK CPI"
  }
}
```

### Surowa odpowiedź serwera `mcp-redline` (deterministyczna odmowa):
```json
{
  "status": "UNSUPPORTED",
  "claim": "Apex Meridian ma prawo do jednostronnego podniesienia cen o wskaźnik inflacji 7.5% UK CPI",
  "file": "01_Apex_VeloNova_MSA_2023.md",
  "page": 6,
  "quote": "### 8. PRICE ADJUSTMENTS AND INFLATION\n8.1 All fees set forth in Section 3 are fixed for the entire duration of the Initial Term.\n8.2 Price Renegotiation Clause:\n> [NEGOTIATION RECORD NOTE: Initial draft clause permitting unilateral price indexing linked to UK CPI or Polish GUS inflation was deleted and rejected by Customer during contract execution.]\n> \n> Neither Party shall have the right to unilaterally adjust subscription fees, rates, or surcharges. Any adjustment to the Annual Subscription Fee or payment terms requires an express written addendum signed by authorized statutory representatives of both Parties. Any notice purporting to unilaterally index or increase pricing without a countersigned addendum is null and void ab initio.",
  "explanation": "Sprzeczność z umową ramową: Section 8.2 Master Services Agreement wprost zakazuje jednostronnej waloryzacji cen. Zapis o automatycznej indeksacji CPI został wykreślony, a wszelkie jednostronne pisma są z mocy prawa nieważne (null and void ab initio)."
}
```

### Ostateczna odpowiedź asystenta dla zarządu:
> **Nie.** Żądanie dostawcy nie ma mocy prawnej. Choć dyrektor sprzedaży Apex powołał się na Section 8.2 umowy, treść podpisanego kontraktu wprost zakazuje jednostronnej indeksacji cen, a robocza klauzula inflacyjna została wykreślona podczas negocjacji. Zgodnie z Section 8.2 pismo dostawcy jest bezskuteczne (*null and void ab initio*), a stawka pozostaje zablokowana na poziomie £12,000 GBP kwartalnie.

---

## Licencja

Projekt objęty jest licencją [MIT](file:///Users/robert/Code/1_Projects/mcp-redline/LICENSE).
Copyright (c) 2026 Robert Grabowski.

