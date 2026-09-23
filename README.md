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
npm test        # testy jednostkowe (node:test)
npm run eval    # 64 twierdzenia; kończy się błędem przy KAŻDYM fałszywym GROUNDED
npm run eval -- --strict   # błąd przy jakiejkolwiek rozbieżności
```

Zestaw [`prompts_eval/claims.json`](prompts_eval/claims.json) spisano **przed** przepisaniem silnika (historia git). Podziały: `legacy` (10 promptów z Etapu 3), `dev` (strojenie), `holdout` (bez strojenia). Raport generuje skrypt: [`prompts_eval/EVALUATION_REPORT.md`](prompts_eval/EVALUATION_REPORT.md).

| | Wynik |
|---|---|
| Pierwsze, czyste uruchomienie holdoutu | **18/23 (78%)**, **1 fałszywe GROUNDED** |
| Wszystkie 64 twierdzenia, stan obecny | 91% (3 klasy), 0 fałszywych GROUNDED, 32/32 faktów potwierdzonych |

Holdout nie jest już w pełni „czysty” — szczegóły w raporcie (sekcja „Historia zbioru holdout”). Kolejna rzetelna miara wymaga nowego zestawu twierdzeń od osoby, która nie widziała kodu.

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
├── src/                  # Kod serwera MCP (stdio) i silnik weryfikacji
├── tests/                # Testy jednostkowe (w tym korpus syntetyczny)
├── scripts/eval.js       # Ewaluacja: claims.json -> results_raw.json + EVALUATION_REPORT.md
├── prompts_eval/         # Zestaw 64 twierdzeń, wyniki, raport, historia holdoutu
├── diagrams/             # Źródła diagramów (Mermaid / SVG)
├── web/                  # Demo single-page (patrz uwaga niżej)
├── README.md · MEMORY.md · BACKLOG.md · CHANGELOG.md
└── .env.example · .gitignore
```

---

## Instalacja i uruchomienie

Wymagania: Node.js >= 18, npm >= 9.

```bash
git clone https://github.com/robertgrabowski/mcp-redline.git
cd mcp-redline
npm install
npm run build
npm test
npm run eval
```

---

## Interaktywne Demo Web

> ⚠️ **Demo w `web/` używa jeszcze starej, skopiowanej wersji silnika (z pułapkami wpisanymi na sztywno)** i ładuje Tailwind oraz fonty z CDN, więc nie działa offline. Odpowiedzi „Standard LLM” w porównaniu A/B są napisane ręcznie (symulowane). Do poprawy — patrz `BACKLOG.md`.

```bash
npm run demo
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
