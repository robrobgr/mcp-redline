# mcp-redline

> **Deterministyczny serwer MCP do weryfikacji twierdzeń w lokalnym korpusie dokumentów — z dosłownym cytatem albo jawną odmową.**

Modele językowe potrafią z pewnością siebie podawać nieprawdziwe liczby, daty i klauzule. `mcp-redline` daje modelowi dostęp do lokalnego korpusu i wymusza, by każde twierdzenie było albo potwierdzone **dosłownym fragmentem źródła**, albo jawnie oznaczone jako **sprzeczne** lub **niepotwierdzone**.

Weryfikator nie używa LLM, sieci ani zewnętrznych usług: ten sam korpus i to samo twierdzenie zawsze dają ten sam wynik z tym samym uzasadnieniem. **W razie wątpliwości nie potwierdza.** To nie znaczy, że się nie myli — patrz [Ograniczenia](#ograniczenia) i [raport ewaluacji](prompts_eval/EVALUATION_REPORT.md).

---

## Narzędzia MCP

| Narzędzie | Argumenty | Zwracana wartość |
|---|---|---|
| `list_sources` | — | Dokumenty w korpusie: nazwa, liczba sekcji, **ranga źródła (Tier)** |
| `search` | `query` | Dosłowne fragmenty na poziomie zdania / wiersza tabeli: `{file, page, quote, score}` |
| `quote` | `file`, `page` | Dosłowna treść sekcji, bez parafrazy |
| `verify` | `claim` | `GROUNDED` + cytat · `CONTRADICTED` + cytat przeczący · `UNSUPPORTED` + powód |

### Statusy `verify`

| Status | Znaczenie | Co model może zrobić |
|---|---|---|
| `GROUNDED` | Istnieje fragment, który zawiera pojęcia i liczby twierdzenia, ma tę samą polaryzację i nie jest sprzeczny ze źródłem o wyższej randze. | Podać jako fakt, z cytatem. |
| `CONTRADICTED` | Źródło o randze równej lub wyższej przeczy twierdzeniu: zaprzeczenie/odrzucenie, inna wartość, inna waluta, inny rok. | Poinformować, że źródło mówi co innego — i zacytować je. |
| `UNSUPPORTED` | Nic w korpusie nie rozstrzyga. | Odmówić podania jako faktu. |

Odpowiedź zawiera też `evidence` (pokrycie, dopasowane i brakujące pojęcia, powody) oraz `conflicting` — np. mail, który twierdzi coś, czemu przeczy umowa.

---

## Jak działa `verify`

W silniku **nie ma reguł pisanych pod konkretny korpus** (żadnych „pułapek” na sztywno). Testy obejmują osobny, syntetyczny korpus (umowa najmu), na którym silnik działa bez zmian.

1. **Jednostki dosłowne.** Korpus dzielony jest na zdania, pola „Klucz: wartość” i wiersze tabel. Każdy cytat jest dosłownym podciągiem pliku źródłowego (sprawdzane w testach).
2. **Pokrycie pojęć** ważone rzadkością (IDF), z dwujęzycznym słownikiem domenowym PL/EN i lekkim stemmingiem. Nazwy własne i nazwy geograficzne muszą występować w samym cytowanym fragmencie.
3. **Liczby** porównywane jako wartości z rodzajem (kwota + waluta, %, rok, liczba z jednostką). Inna wartość tego samego rodzaju lub inna waluta = konflikt.
4. **Polaryzacja** liczona w członie zdania, którego dotyczy twierdzenie (`not`, `neither`, `deleted`, `rejected`, `nie`, `odrzucił`, `wykreślono`…). Wzmianka twierdząca nie obala prawdziwego twierdzenia przeczącego.
5. **Mowa zależna nie jest faktem.** Fragment, który tylko relacjonuje wniosek lub żądanie („COO zawnioskował o karę…”), nie potwierdza, że coś się stało.
6. **Strony umowy** odczytywane są z klauzuli definicji (`("Supplier" or "Apex Meridian")`). Fragment o innej stronie nie potwierdza twierdzenia.
7. **Ranga źródeł:** Tier 1 (umowa, faktura, sprawozdanie, protokół) > Tier 2 (CRM) > Tier 3 (korespondencja). Sprzeczność w źródle o wyższej randze wygrywa z potwierdzeniem w niższej.
8. **Twierdzenia złożone** (np. faktura: numer + kwota + bank) mogą być potwierdzone maks. 3 polami tego samego rekordu — nigdy przez sklejanie zdań prozy.

Progi są jawne w `THRESHOLDS` w `src/index.ts`.

---

## Ewaluacja

```bash
npm test        # 14 testów jednostkowych (node:test)
npm run eval    # 64 twierdzenia; kończy się błędem przy KAŻDYM fałszywym GROUNDED
npm run eval -- --strict   # błąd przy jakiejkolwiek rozbieżności
```

| Zbiór | Liczba twierdzeń | Dokładność 3-klasowa | Fałszywe GROUNDED | Potwierdzone fakty | Odrzucone niefakty |
|---|---|---|---|---|---|
| `legacy` | 10 | 90% (9/10) | **0** | 4/4 (100%) | 6/6 (100%) |
| `dev` | 31 | 94% (29/31) | **0** | 18/18 (100%) | 13/13 (100%) |
| `holdout` | 23 | 87% (20/23) | **0** | 10/10 (100%) | 13/13 (100%) |
| **ŁĄCZNIE** | **64** | **91% (58/64)** | **0** | **32/32 (100%)** | **32/32 (100%)** |

> [!NOTE]
> **Bezpieczna asymetria:** Wszystkie 6 rozbieżności (58/64) to konserwatywne odmowy (system zwrócił bezpieczne `UNSUPPORTED` zamiast `CONTRADICTED`, lub w jednym przypadku `CONTRADICTED` zamiast `UNSUPPORTED`). Ani razu silnik nie potwierdził fałszu (`false GROUNDED = 0`).

> [!WARNING]
> **Metodologiczna uwaga o skażonym holdoucie (Contaminated Holdout Disclosure):**  
> Początkowy zbiór holdout (`H01`–`H23`) uzyskał w pierwszym, czystym uruchomieniu wynik 18/23 (78%) i 1 fałszywe GROUNDED. Po naprawieniu wykrytych luk architektury silnika (m.in. wiązanie stron, zakres negacji w zdaniu złożonym) wynik wzrósł do 20/23 (87%) i 0 fałszywych GROUNDED.  
> Ponieważ holdout został ułożony przez tego samego autora i widział kolejne iteracje kodu, **nie jest już traktowany jako niezależny zbiór ślepej próby**. Rzetelna zewnętrzna ewaluacja wymaga holdoutu ułożonego przez niezależną stronę trzecią (zadanie `P0-5b` w [BACKLOG.md](BACKLOG.md)).

---

## Ograniczenia

* **Dopasowanie leksykalne, nie rozumienie.** Parafraza spoza słownika domenowego da `UNSUPPORTED` (bezpieczny błąd). Nowa domena wymaga rozszerzenia `GROUPS` w `src/index.ts`.
* **Jedno twierdzenie = jeden fakt.** Twierdzenia złożone z faktów z różnych zdań nie zostaną potwierdzone — model powinien rozbić je na osobne wywołania `verify`.
* **Kolumny tabel:** wartość jest wiązana z wierszem, nie z kolumną. Kwota z kolumny 2023 może potwierdzić twierdzenie o 2024.
* **Ranga źródła wynika z nazwy pliku** (`Email`/`CRM`) — docelowo pole w nagłówku dokumentu.
* Część fałszywych twierdzeń kończy się `UNSUPPORTED` zamiast `CONTRADICTED` — bezpieczne, ale mniej informatywne.

---

## Zasady i twarde ograniczenia

* **Zero wywołań sieciowych** — działa offline (z wyłączonym Wi-Fi).
* **Transport stdio** — zero transmisji danych do chmury (wymogi CISO / tajemnica przedsiębiorstwa).
* **Zero telemetrii i logowania treści dokumentów.**
* **`verify` bez LLM** — deterministyczne i audytowalne.

---

## Struktura projektu

```text
mcp-redline/
├── corpus/               # Korpus testowy fikcyjnej polskiej firmy (z pułapkami)
├── src/                  # Kod serwera MCP (stdio) i silnik weryfikacji (engine.ts)
├── tests/                # Testy jednostkowe (w tym korpus syntetyczny)
├── scripts/eval.js       # Ewaluacja: claims.json -> results_raw.json + EVALUATION_REPORT.md
├── prompts_eval/         # Zestaw 64 twierdzeń, wyniki, raport, historia holdoutu
├── diagrams/             # Źródła diagramów (Mermaid / SVG)
├── web/                  # Demo single-page (100% offline, zasilane prawdziwym engine.bundle.js)
├── README.md · MEMORY.md · BACKLOG.md · CHANGELOG.md
└── .env.example · .gitignore
```

---

## Instalacja i uruchomienie

Wymagania: Node.js >= 18, npm >= 9.

```bash
git clone https://github.com/robrobgr/mcp-redline.git
cd mcp-redline
npm install
npm run build
npm test
npm run eval
```

---

## Interaktywne Demo Web

Interaktywny interfejs demonstracyjny dostępny w katalogu `web/` działa **w 100% offline** (zero zapytań do zewnętrznych CDN — lokalny Tailwind CSS oraz fonty Inter i JetBrains Mono).

Silnik weryfikacji w przeglądarce (`web/dist/engine.bundle.js`) jest kompilowany bezpośrednio z kodu źródłowego silnika (`src/engine.ts`) przez `esbuild` i wykonuje identyczny algorytm deterministyczny co serwer MCP.

* Odpowiedzi w kolumnie „Standard LLM” są oznaczone jako **ilustracyjne symulacje** (symulacja braku twardej bramki).
* Licznik ryzyka zarządczego (CFO Liability Meter) wylicza kwoty wyłącznie na podstawie wzorów z dokumentów źródłowych (np. `7.5% × £48 000 GBP = £3,600 GBP/rok` z umowy MSA).

```bash
npm run demo
# Otwórz przeglądarkę na http://localhost:3333 (działa również przy odłączonym Wi-Fi)
```

---

## Konfiguracja klienta MCP (stdio)

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

## Przykładowy zapis sesji

### Zapytanie użytkownika
> *„Czy brytyjski dostawca Apex Meridian ma prawo podnieść nam opłaty o 7.5% UK CPI od stycznia 2025 r.?”*

### Wywołanie `verify`
```json
{
  "name": "verify",
  "arguments": {
    "claim": "Apex Meridian ma prawo do jednostronnego podniesienia cen o wskaźnik inflacji 7.5% UK CPI od stycznia 2025 r."
  }
}
```

### Odpowiedź serwera (skrócona; pełna zawiera też `evidence`)
```json
{
  "status": "CONTRADICTED",
  "file": "01_Apex_VeloNova_MSA_2023.md",
  "page": 6,
  "tier": 1,
  "quote": "> *[NEGOTIATION RECORD NOTE: Initial draft clause permitting unilateral price indexing linked to UK CPI or Polish GUS inflation was deleted and rejected by Customer during contract execution.]*",
  "explanation": "Sprzeczne ze źródłem 01_Apex_VeloNova_MSA_2023.md (sekcja 6, Tier 1): polaryzacja: źródło zaprzecza/odrzuca (deleted, rejected). Zgodny fragment istnieje w 04_Email_Thread_Inflation_Dispute_Nov2024.md (Tier 3), ale źródło o wyższej lub równej randze mu przeczy.",
  "conflicting": {
    "file": "04_Email_Thread_Inflation_Dispute_Nov2024.md",
    "tier": 3,
    "quote": "Due to sustained increases in UK data centre operational costs and broader inflation, Apex Meridian is applying an annual adjustment of **7.5% (seven point five percent)**, corresponding to the published UK Consumer Price Index (CPI) over the preceding twelve-month period."
  }
}
```

Model może dodatkowo sprawdzić twierdzenie przeciwne — `"Apex Meridian nie ma prawa do jednostronnej indeksacji cen o UK CPI"` — i dostaje `GROUNDED` z cytatem z umowy.

### Odpowiedź asystenta dla zarządu
> **Nie.** Umowa ramowa (MSA, sekcja 8) przeczy żądaniu dostawcy: klauzula indeksacji do UK CPI została wykreślona i odrzucona przy podpisaniu umowy, a Section 8.2 stanowi, że żadna ze stron nie może jednostronnie zmienić opłat. Mail dostawcy (Tier 3) nie zmienia umowy (Tier 1).

---

## Licencja

[MIT](LICENSE) · Copyright (c) 2026 Robert Grabowski.
