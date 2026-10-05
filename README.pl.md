🇬🇧 [English](README.md)

# mcp-redline

> **Deterministyczny serwer MCP do weryfikacji twierdzeń w lokalnym korpusie dokumentów — z dosłownym cytatem albo jawną odmową.**

🌐 **Live Demo:** [redline.robertgrabowski.com](https://redline.robertgrabowski.com)  
*Demo działa całkowicie w przeglądarce i ma wymuszony nagłówek Content-Security-Policy `connect-src 'none'` (zero połączeń wychodzących — sprawdź sam w DevTools).*

Modele językowe potrafią z pewnością siebie podawać nieprawdziwe liczby, daty i klauzule. `mcp-redline` daje modelowi dostęp do lokalnego korpusu i wymusza, by każde twierdzenie było albo potwierdzone **dosłownym fragmentem źródła**, albo jawnie oznaczone jako **sprzeczne** lub **niepotwierdzone**.

Weryfikator nie używa LLM, sieci ani zewnętrznych usług: ten sam korpus i to samo twierdzenie zawsze dają ten sam wynik z tym samym uzasadnieniem. **W razie wątpliwości nie potwierdza.** To nie znaczy, że się nie myli — patrz [Ograniczenia](#ograniczenia) i [raport ewaluacji](prompts_eval/EVALUATION_REPORT.md).

> **Uwaga:** Wszystkie podmioty, osoby, numery rejestrowe (KRS, Company No, NIP, VAT) oraz kwoty w korpusie są fikcyjne i służą wyłącznie do testowania oraz ewaluacji odporności modeli na halucynacje.

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

Odpowiedź zawiera też `evidence` (pokrycie, dopasowane i brakujące pojęcia, powody), kody przyczyn `reasonCodes: string[]` oraz `conflicting` — np. mail, który twierdzi coś, czemu przeczy umowa.

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

Progi są jawne w `THRESHOLDS` w `src/engine.ts`.

---

## Ewaluacja

```bash
npm test        # testy jednostkowe (node:test)
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
> Początkowy zbiór holdout (`H01`–`H23`) uzyskał w pierwszym, czystym uruchomieniu wynik 18/23 (78%) i 1 fałszywe GROUNDED. Po naprawieniu wykrytych luk architektury silnika wynik wzrósł do 20/23 (87%) i 0 fałszywych GROUNDED.  
> Ponieważ holdout został ułożony przez tego samego autora i widział kolejne iteracje kodu, **nie jest już traktowany jako niezależny zbiór ślepej próby**. Rzetelna zewnętrzna ewaluacja wymaga holdoutu ułożonego przez niezależną stronę trzecią.

---

## Ograniczenia

* **Dopasowanie leksykalne, nie rozumienie.** Parafraza spoza słownika domenowego da `UNSUPPORTED` (bezpieczny błąd). Nowa domena wymaga rozszerzenia `GROUPS` w `src/engine.ts`.
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
* **Język:** EN domyślnie, PL przez zmienną środowiskową `MCP_REDLINE_LANG=pl`.

---

## Szybki start (Quick Start)

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

Interaktywny interfejs demonstracyjny w katalogu `web/` działa **w 100% offline** (zero zewnętrznych zapytań sieciowych).

```bash
npm run demo
# Otwórz przeglądarkę pod adresem http://localhost:3333
```

Demo produkcyjne: [redline.robertgrabowski.com](https://redline.robertgrabowski.com) (lub z wymuszeniem języka polskiego: [redline.robertgrabowski.com/?lang=pl](https://redline.robertgrabowski.com/?lang=pl)).

---

## Konfiguracja klienta MCP (stdio)

```json
{
  "mcpServers": {
    "mcp-redline": {
      "command": "node",
      "args": ["<path-to-repo>/dist/src/index.js"],
      "env": {
        "MCP_REDLINE_CORPUS_DIR": "<path-to-repo>/corpus",
        "MCP_REDLINE_LANG": "pl"
      }
    }
  }
}
```

---
 
## Architektura i Diagramy

Wizualizacje algorytmu weryfikacji, granic zaufania CISO oraz porównania z tradycyjnym RAG:
* **[Przegląd Architektury i Diagramów](diagrams/README.md)**
* [Diagram 1: Algorytm przepływu `verify`](diagrams/01_verify_flow.pl.svg)
* [Diagram 2: Granica zaufania i izolacji CISO](diagrams/02_ciso_data_boundary.pl.svg)
* [Diagram 3: RAG wektorowy vs mcp-redline](diagrams/03_rag_vs_redline.pl.svg)

---

## Licencja

[MIT](LICENSE) · Copyright (c) 2026 Robert Grabowski.
