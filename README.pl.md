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

Silnik jest podzielony na neutralny językowo rdzeń ([`src/engine.ts`](src/engine.ts)) oraz paczki językowe ([`src/lang/en.ts`](src/lang/en.ts), [`src/lang/pl.ts`](src/lang/pl.ts)) implementujące interfejs `LanguagePack`. W silniku **nie ma reguł pisanych pod konkretny korpus** (żadnych „pułapek” na sztywno).

1. **Jednostki dosłowne.** Korpus dzielony jest na zdania, pola „Klucz: wartość” i wiersze tabel. Każdy cytat jest dosłownym podciągiem pliku źródłowego (sprawdzane w testach).
2. **Pokrycie pojęć** ważone rzadkością (IDF), ze słownikiem domenowym PL/EN i lekkim stemmingiem. Nazwy własne, nazwy geograficzne oraz oznaczenia etapów/aneksów muszą występować w samym cytowanym fragmencie.
3. **Liczby (całe tokeny i zakres członu zdania).** Liczby są porównywane jako pełne wartości z rodzajem (kwota + waluta, %, rok, liczba z jednostką) z zachowaniem granic grup tysięcznych (spacja, NBSP, kropka, przecinek) oraz w obrębie członu zdania właściwego dla danego etapu lub aneksu.
4. **Dwukierunkowa negacja i antonimy.** Polaryzacja liczona jest w członie zdania dla przeczeń czasownikowych (`nie`, `not`), przyimkowych (`bez X` vs `z X`, `without` vs `with`) oraz produktywnych przedrostków morfologicznych (`nie-`, `non-`), z pominięciem formuł ważności czynności prawnych (`pod rygorem nieważności`).
5. **Modalność i normy vs fakty dokonane.** Uprawnienia, zobowiązania, czas przyszły i terminy płatności w umowie (`może`, `ma prawo`, `zobowiązuje się`, `płatne w terminie`) nigdy nie potwierdzają twierdzeń o faktach dokonanych w stronie czynnej (`naliczył`), biernej (`zostało zasądzone`, `zostało zapłacone`) ani bezosobowej (`naliczono`, `odebrano`) — zwracane jest `UNSUPPORTED` (`MODALITY_MISMATCH`).
6. **Wiązanie ról stron w przypadkach zależnych.** Nazwy i role stron (`Dostawca`/`Wykonawca` vs `Zamawiający`/`Klient`) są wiązane w mianowniku, celowniku/przyimkach adresata (`wobec`, `na rzecz`, `przez`) oraz dopełniaczu (`zgody Dostawcy` vs `zgody Zamawiającego`). Odwrócenie ról zwraca `CONTRADICTED` (`ROLE_MISMATCH`).
7. **Ranga źródeł i chronologia na poziomie postanowień:** Tier 1 (umowa, aneks, protokół, faktura) > Tier 2 (CRM) > Tier 3 (korespondencja). W obrębie tego samego Tieru późniejszy aneks nadpisuje wcześniejszą umowę wyłącznie w zakresie tego samego przedmiotu i atrybutu (`SUPERSEDED_BY_LATER_DOCUMENT`), nie nadpisując daty ani miejsca zawarcia umowy głównej.
8. **Wiązanie dat z kategorią zdarzenia.** Daty są wiązane z typem zdarzenia (`signing`, `readiness`, `acceptance`, `issuance`, `delivery`, `deadline`, `effective`), dzięki czemu data zgłoszenia gotowości, data odbioru, data podpisania aneksu i termin wykonania nie są ze sobą mylone.
9. **Twierdzenia złożone** (np. faktura: numer + kwota + bank) mogą być potwierdzone maks. 3 polami tego samego rekordu — nigdy przez sklejanie zdań prozy.

Progi są jawne w `THRESHOLDS` w `src/engine.ts`.

---

## Ewaluacja

```bash
npm test                   # testy jednostkowe (node:test)
npm run eval               # 64 twierdzenia (EN/PL); błąd przy każdym fałszywym GROUNDED
npm run eval:pl            # 44 twierdzenia prawne PL (eval_pl/); błąd przy każdym fałszywym GROUNDED
npm run eval -- --strict   # błąd przy jakiejkolwiek rozbieżności
```

### Benchmark angielsko-polski (`prompts_eval`, n = 64)

| Zbiór | Liczba twierdzeń | Dokładność 3-klasowa | Fałszywe GROUNDED | Potwierdzone fakty | Odrzucone niefakty |
|---|---|---|---|---|---|
| `legacy` | 10 | 90% (9/10) | **0** | 4/4 (100%) | 6/6 (100%) |
| `dev` | 31 | 94% (29/31) | **0** | 18/18 (100%) | 13/13 (100%) |
| `holdout` | 23 | 87% (20/23) | **0** | 10/10 (100%) | 13/13 (100%) |
| **ŁĄCZNIE** | **64** | **91% (58/64)** | **0** | **32/32 (100%)** | **32/32 (100%)** |

### Polski benchmark prawny (`eval_pl`, n = 44)

| Zbiór | Liczba twierdzeń | Dokładność 3-klasowa | Fałszywe GROUNDED | Potwierdzone fakty | Odrzucone niefakty |
|---|---|---|---|---|---|
| `dev` (`D01`–`D44`) | 44 | **100% (44/44)** | **0** | **17/17 (100%)** | **27/27 (100%)** |

> [!NOTE]
> **Bezpieczna asymetria:** Wszystkie 6 rozbieżności (58/64) w zbiorze `prompts_eval` to konserwatywne odmowy (system zwrócił bezpieczne `UNSUPPORTED` zamiast `CONTRADICTED`, lub w jednym przypadku `CONTRADICTED` zamiast `UNSUPPORTED`). Ani razu silnik nie potwierdził fałszu (`false GROUNDED = 0`).

> [!WARNING]
> **Metodologiczna uwaga o skażonym holdoucie (Contaminated Holdout Disclosure):**  
> Początkowy zbiór holdout (`H01`–`H23`) uzyskał w pierwszym, czystym uruchomieniu wynik 18/23 (78%) i 1 fałszywe GROUNDED. Po naprawieniu wykrytych luk architektury silnika wynik wzrósł do 20/23 (87%) i 0 fałszywych GROUNDED.  
> Ponieważ holdout został ułożony przez tego samego autora i widział kolejne iteracje kodu, **nie jest już traktowany jako niezależny zbiór ślepej próby**. Rzetelna zewnętrzna ewaluacja wymaga holdoutu ułożonego przez niezależną stronę trzecią.

---

## Znane ograniczenia

* **Dopasowanie leksykalno-morfologiczne, nie głębokie wnioskowanie.** Parafraza spoza słownika domenowego w paczce językowej (`src/lang/en.ts`, `src/lang/pl.ts`) da `UNSUPPORTED` (bezpieczna odmowa). Nowa domena wymaga rozszerzenia `LEXICON_GROUPS` w odpowiedniej paczce językowej.
* **Jedno twierdzenie = jeden fakt.** Twierdzenia złożone z faktów z różnych zdań prozy lub różnych dokumentów nie zostaną sklejone — model powinien rozbić je na osobne wywołania `verify`.
* **Brak obliczeń arytmetycznych i warunkowych.** Silnik weryfikuje jawnie zapisane kwoty i klauzule zastąpienia (`zastępuje się kwotą…`), ale nie wykonuje wieloetapowego sumowania, naliczania odsetek ani wnioskowania arytmetycznego między paragrafami.
* **Kolumny tabel:** wartość w tabeli Markdown jest wiązana z wierszem i rokiem w nagłówku, a nie z dowolną współrzędną wielokolumnowej macierzy.
* **Ranga źródła wynika z nazwy pliku** (`Email`/`CRM`) — docelowo pole metadanych w nagłówku dokumentu.
* Część fałszywych twierdzeń przy niskim pokryciu słownikowym kończy się `UNSUPPORTED` zamiast `CONTRADICTED` — bezpieczne, ale mniej informatywne.

---

## Zasady i twarde ograniczenia

* **Zero wywołań sieciowych** — działa offline (z wyłączonym Wi-Fi).
* **Transport stdio** — zero transmisji danych do chmury (wymogi CISO / tajemnica przedsiębiorstwa).
* **Zero telemetrii i logowania treści dokumentów.**
* **`verify` bez LLM** — deterministyczne i audytowalne.
* **Język:** EN domyślnie, PL przez zmienną środowiskową `MCP_REDLINE_LANG=pl`.
* **Pojęcie „strony” w dokumentach Markdown:** W dokumentach tekstowych i Markdown bez podziału na strony fizyczne pole `page` oznacza logiczną sekcję dokumentu (rozdzielaną nagłówkami `#`, `##`, `###`), a nie fizyczną stronę wydruku.

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
* [Diagram 2: Granica danych](diagrams/02_ciso_data_boundary.pl.svg)
* [Diagram 3: RAG wektorowy vs mcp-redline](diagrams/03_rag_vs_redline.pl.svg)

---

## Licencja

[MIT](LICENSE) · Copyright (c) 2026 Robert Grabowski.
