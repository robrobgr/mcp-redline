# Raport ewaluacji — mcp-redline

> Plik generowany automatycznie przez `npm run eval` — nie edytować ręcznie.

- Uruchomienie: **2026-09-23T22:58:33.031Z**, Node v22.23.2
- Zestaw: [`claims.json`](claims.json) — 64 twierdzeń, spisanych przed przepisaniem silnika (historia git).
- Podziały: `legacy` = 10 promptów z Etapu 3 (stary silnik był pod nie strojony), `dev` = zestaw, na którym strojono nowy silnik, `holdout` = zestaw, na którym silnika **nie** strojono (uczciwa miara uogólnienia).
- Krytyczna metryka: **fałszywe GROUNDED** — twierdzenie bez oparcia oznaczone jako potwierdzone. Każde takie zdarzenie kończy `npm run eval` kodem błędu.

## Wyniki zbiorcze

| Podział | n | Trafność (3 klasy) | Fałszywe GROUNDED | Fakty potwierdzone | Nie-fakty odrzucone |
|---|---|---|---|---|---|
| legacy | 10 | 90% | 0 | 4/4 | 6/6 |
| dev | 31 | 94% | 0 | 18/18 | 13/13 |
| holdout | 23 | 87% | 0 | 10/10 | 13/13 |
| **RAZEM** | 64 | 91% | 0 | 32/32 | 32/32 |

### Macierz pomyłek (holdout)

| oczekiwane \ wynik | GROUNDED | CONTRADICTED | UNSUPPORTED |
|---|---|---|---|
| GROUNDED | 10 | 0 | 0 |
| CONTRADICTED | 0 | 6 | 2 |
| UNSUPPORTED | 0 | 1 | 4 |

### Macierz pomyłek (wszystkie)

| oczekiwane \ wynik | GROUNDED | CONTRADICTED | UNSUPPORTED |
|---|---|---|---|
| GROUNDED | 32 | 0 | 0 |
| CONTRADICTED | 0 | 18 | 5 |
| UNSUPPORTED | 0 | 1 | 8 |

## Wyniki szczegółowe

| ID | Podział | Twierdzenie | Oczekiwane | Wynik | Ocena | Źródło |
|---|---|---|---|---|---|---|
| P01 | legacy | Umowa ramowa między Apex Meridian Technologies Ltd a VeloNova Logistics Sp. z o.o. została podpisana dnia 15 stycznia 2023 r. | GROUNDED | **GROUNDED** | ✅ | 01_Apex_VeloNova_MSA_2023.md §1 (T1) |
| P02 | legacy | Zysk netto VeloNova Logistics Sp. z o.o. za rok obrotowy 2024 wyniósł 4 210 000,00 PLN. | GROUNDED | **GROUNDED** | ✅ | 05_Rachunek_Zyskow_i_Strat_2024_PLN.md §1 (T1) |
| P03 | legacy | Całkowity limit odpowiedzialności dostawcy jest ograniczony do 100% opłat uiszczonych w ostatnich 12 miesiącach. | GROUNDED | **GROUNDED** | ✅ | 01_Apex_VeloNova_MSA_2023.md §7 (T1) |
| P04 | legacy | Faktura INV-2024-1108 za czwarty kwartał 2024 r. opiewa na kwotę £12,000.00 GBP netto płatną na rachunek Barclays Bank. | GROUNDED | **GROUNDED** | ✅ | 03_Invoice_INV-2024-1108.md §1 (T1) |
| P05 | legacy | Apex Meridian ma prawo do jednostronnego podniesienia cen o wskaźnik inflacji 7.5% UK CPI od stycznia 2025 r. | CONTRADICTED | **CONTRADICTED** | ✅ | 01_Apex_VeloNova_MSA_2023.md §6 (T1) |
| P06 | legacy | VeloNova Logistics nałożyła na dostawcę karę umowną w wysokości 50 000 EUR za awarię telematyki we Frankfurcie. | CONTRADICTED | **CONTRADICTED** | ✅ | 06_Protokol_Zarzadu_VeloNova_11_2024.md §4 (T1) |
| P07 | legacy | W 2024 r. podpisano aneks rozszerzający licencję telematyczną na 300 pojazdów o wartości 95 000 EUR. | CONTRADICTED | **CONTRADICTED** | ✅ | 03_Invoice_INV-2024-1108.md §1 (T1) |
| P08 | legacy | Wszystkie dane telemetryczne i lokalizacyjne floty są przetwarzane wyłącznie na terenie Niemiec we Frankfurcie. | CONTRADICTED | **UNSUPPORTED** | 🟠 | — |
| P09 | legacy | Roczny koszt usług telematycznych floty dla VeloNova wynosi 48 000,00 EUR. | CONTRADICTED | **CONTRADICTED** | ✅ | 03_Invoice_INV-2024-1108.md §1 (T1) |
| P10 | legacy | Z tytułu awarii bramki we Frankfurcie dostawca przyznał VeloNova rabat Service Credit w wysokości 50 000,00 EUR. | CONTRADICTED | **CONTRADICTED** | ✅ | 06_Protokol_Zarzadu_VeloNova_11_2024.md §4 (T1) |
| D01 | dev | The Master Services Agreement was entered into on 15 January 2023. | GROUNDED | **GROUNDED** | ✅ | 01_Apex_VeloNova_MSA_2023.md §1 (T1) |
| D02 | dev | Roczna opłata abonamentowa wynosi £48,000.00 GBP netto. | GROUNDED | **GROUNDED** | ✅ | 01_Apex_VeloNova_MSA_2023.md §5 (T1) |
| D03 | dev | Opłata jest fakturowana kwartalnie w czterech ratach po £12,000.00 GBP. | GROUNDED | **GROUNDED** | ✅ | 01_Apex_VeloNova_MSA_2023.md §5 (T1) |
| D04 | dev | Umowa obowiązuje przez 36 miesięcy i kończy się 14 stycznia 2026 r. | GROUNDED | **GROUNDED** | ✅ | 01_Apex_VeloNova_MSA_2023.md §4 (T1) |
| D05 | dev | Automatic rollover renewal is excluded. | GROUNDED | **GROUNDED** | ✅ | 01_Apex_VeloNova_MSA_2023.md §4 (T1) |
| D06 | dev | Umowa podlega prawu Anglii i Walii. | GROUNDED | **GROUNDED** | ✅ | 01_Apex_VeloNova_MSA_2023.md §8 (T1) |
| D07 | dev | Gwarantowana miesięczna dostępność usługi wynosi 99.8%. | GROUNDED | **GROUNDED** | ✅ | 02_Schedule_B_Service_Levels_and_Credits.md §2 (T1) |
| D08 | dev | Apex nie utrzymuje klastrów obliczeniowych w Niemczech. | GROUNDED | **GROUNDED** | ✅ | 02_Schedule_B_Service_Levels_and_Credits.md §4 (T1) |
| D09 | dev | Neither party may unilaterally adjust subscription fees. | GROUNDED | **GROUNDED** | ✅ | 01_Apex_VeloNova_MSA_2023.md §6 (T1) |
| D10 | dev | Dostawca nie ma prawa jednostronnie podnieść cen. | GROUNDED | **GROUNDED** | ✅ | 01_Apex_VeloNova_MSA_2023.md §6 (T1) |
| D11 | dev | Zarząd jednogłośnie odrzucił propozycję kary umownej 50 000 EUR. | GROUNDED | **GROUNDED** | ✅ | 06_Protokol_Zarzadu_VeloNova_11_2024.md §4 (T1) |
| D12 | dev | Service Credit za awarię z listopada 2024 wyniósł £600.00 GBP. | GROUNDED | **GROUNDED** | ✅ | 06_Protokol_Zarzadu_VeloNova_11_2024.md §4 (T1) |
| D13 | dev | Aneks rozszerzający flotę do 300 pojazdów nigdy nie został podpisany. | GROUNDED | **GROUNDED** | ✅ | 07_CRM_Export_Enterprise_Contracts_2024.md §3 (T2) |
| D14 | dev | Przychody netto ze sprzedaży w 2024 wyniosły 48 520 000 PLN. | GROUNDED | **GROUNDED** | ✅ | 05_Rachunek_Zyskow_i_Strat_2024_PLN.md §1 (T1) |
| D15 | dev | Faktura INV-2024-1108 ma termin płatności 01 listopada 2024. | GROUNDED | **GROUNDED** | ✅ | 03_Invoice_INV-2024-1108.md §1 (T1) |
| D16 | dev | Maksymalny Service Credit w kwartale to £1,800.00 GBP. | GROUNDED | **GROUNDED** | ✅ | 02_Schedule_B_Service_Levels_and_Credits.md §3 (T1) |
| D17 | dev | Licencja obejmuje do 180 pojazdów. | GROUNDED | **GROUNDED** | ✅ | 01_Apex_VeloNova_MSA_2023.md §3 (T1) |
| D18 | dev | Niedostępność bramki telemetrycznej zablokowała 32 naczepy chłodnicze. | GROUNDED | **GROUNDED** | ✅ | 06_Protokol_Zarzadu_VeloNova_11_2024.md §4 (T1) |
| D19 | dev | Supplier may raise prices by 7.5% UK CPI from January 2025. | CONTRADICTED | **CONTRADICTED** | ✅ | 01_Apex_VeloNova_MSA_2023.md §6 (T1) |
| D20 | dev | The annual fee is £48,000.00 EUR. | CONTRADICTED | **CONTRADICTED** | ✅ | 01_Apex_VeloNova_MSA_2023.md §5 (T1) |
| D21 | dev | Gwarantowana dostępność wynosi 99.9%. | CONTRADICTED | **CONTRADICTED** | ✅ | 02_Schedule_B_Service_Levels_and_Credits.md §2 (T1) |
| D22 | dev | Umowa ramowa została podpisana 15 stycznia 2021 r. | CONTRADICTED | **CONTRADICTED** | ✅ | 01_Apex_VeloNova_MSA_2023.md §1 (T1) |
| D23 | dev | Umowa podlega prawu polskiemu. | CONTRADICTED | **UNSUPPORTED** | 🟠 | — |
| D24 | dev | Telemetry data is hosted in Frankfurt, Germany. | CONTRADICTED | **CONTRADICTED** | ✅ | 02_Schedule_B_Service_Levels_and_Credits.md §4 (T1) |
| D25 | dev | Zysk netto VeloNova za 2024 wyniósł 4 310 000,00 PLN. | CONTRADICTED | **CONTRADICTED** | ✅ | 05_Rachunek_Zyskow_i_Strat_2024_PLN.md §1 (T1) |
| D26 | dev | Kary umowne za awarie są dopuszczalne na podstawie umowy MSA. | CONTRADICTED | **CONTRADICTED** | ✅ | 01_Apex_VeloNova_MSA_2023.md §6 (T1) |
| D27 | dev | Umowa MSA przewiduje karę umowną za każdy dzień opóźnienia. | CONTRADICTED | **UNSUPPORTED** | 🟠 | — |
| D28 | dev | VeloNova posiada flotę 50 statków morskich. | UNSUPPORTED | **UNSUPPORTED** | ✅ | — |
| D29 | dev | VeloNova planuje wejście na giełdę w 2025 r. | UNSUPPORTED | **UNSUPPORTED** | ✅ | — |
| D30 | dev | CISO Apex Meridian nazywa się Dr. Aris Thorne. | UNSUPPORTED | **UNSUPPORTED** | ✅ | — |
| D31 | dev | Dostawca zapewnia wsparcie 24/7 w języku polskim. | UNSUPPORTED | **UNSUPPORTED** | ✅ | — |
| H01 | holdout | The initial term of the agreement is thirty-six months. | GROUNDED | **GROUNDED** | ✅ | 01_Apex_VeloNova_MSA_2023.md §4 (T1) |
| H02 | holdout | Sądy Anglii i Walii mają wyłączną jurysdykcję w sporach z umowy. | GROUNDED | **GROUNDED** | ✅ | 01_Apex_VeloNova_MSA_2023.md §8 (T1) |
| H03 | holdout | The disaster recovery archive is hosted in AWS London. | GROUNDED | **GROUNDED** | ✅ | 02_Schedule_B_Service_Levels_and_Credits.md §4 (T1) |
| H04 | holdout | Invoice INV-2024-1108 was paid in full on 28 October 2024. | GROUNDED | **GROUNDED** | ✅ | 03_Invoice_INV-2024-1108.md §1 (T1) |
| H05 | holdout | Stawka VAT na fakturze INV-2024-1108 wynosi 0%. | GROUNDED | **GROUNDED** | ✅ | 03_Invoice_INV-2024-1108.md §1 (T1) |
| H06 | holdout | Service Credits cannot be refunded as cash. | GROUNDED | **GROUNDED** | ✅ | 02_Schedule_B_Service_Levels_and_Credits.md §3 (T1) |
| H07 | holdout | Koszt subskrypcji Apex w 2024 r. wyniósł 246 840,00 PLN. | GROUNDED | **GROUNDED** | ✅ | 05_Rachunek_Zyskow_i_Strat_2024_PLN.md §2 (T1) |
| H08 | holdout | Umowa z ThermoKing Telematics ma wartość 32 400 EUR rocznie. | GROUNDED | **GROUNDED** | ✅ | 07_CRM_Export_Enterprise_Contracts_2024.md §2 (T2) |
| H09 | holdout | Primary telemetry processing is hosted in AWS Dublin, Ireland. | GROUNDED | **GROUNDED** | ✅ | 02_Schedule_B_Service_Levels_and_Credits.md §4 (T1) |
| H10 | holdout | Supplier's aggregate liability is capped at 100% of fees paid in the preceding 12 months. | GROUNDED | **GROUNDED** | ✅ | 01_Apex_VeloNova_MSA_2023.md §7 (T1) |
| H11 | holdout | Od 2025 r. opłata kwartalna wynosi £12,900.00 GBP. | CONTRADICTED | **CONTRADICTED** | ✅ | 01_Apex_VeloNova_MSA_2023.md §5 (T1) |
| H12 | holdout | Automatic renewal of the agreement is allowed. | CONTRADICTED | **CONTRADICTED** | ✅ | 01_Apex_VeloNova_MSA_2023.md §4 (T1) |
| H13 | holdout | Service Credits can be refunded as cash payments. | CONTRADICTED | **CONTRADICTED** | ✅ | 02_Schedule_B_Service_Levels_and_Credits.md §3 (T1) |
| H14 | holdout | Licencja obejmuje 300 pojazdów. | CONTRADICTED | **CONTRADICTED** | ✅ | 03_Invoice_INV-2024-1108.md §1 (T1) |
| H15 | holdout | The initial term of the agreement is 24 months. | CONTRADICTED | **CONTRADICTED** | ✅ | 01_Apex_VeloNova_MSA_2023.md §4 (T1) |
| H16 | holdout | Faktura INV-2024-1108 opiewa na £12,900.00 GBP. | CONTRADICTED | **UNSUPPORTED** | 🟠 | — |
| H17 | holdout | Invoice INV-2024-1108 remains unpaid. | CONTRADICTED | **CONTRADICTED** | ✅ | 03_Invoice_INV-2024-1108.md §1 (T1) |
| H18 | holdout | The supplier granted a Service Credit of 50,000 EUR for the Frankfurt outage. | CONTRADICTED | **UNSUPPORTED** | 🟠 | — |
| H19 | holdout | Apex Meridian has an office in Warsaw. | UNSUPPORTED | **UNSUPPORTED** | ✅ | — |
| H20 | holdout | The MSA includes a non-compete clause. | UNSUPPORTED | **UNSUPPORTED** | ✅ | — |
| H21 | holdout | Apex Meridian is certified to ISO 27001. | UNSUPPORTED | **UNSUPPORTED** | ✅ | — |
| H22 | holdout | Either party may terminate the contract with 30 days notice. | UNSUPPORTED | **CONTRADICTED** | 🟠 | 01_Apex_VeloNova_MSA_2023.md §4 (T1) |
| H23 | holdout | Przychody VeloNova w 2025 r. wyniosły 55 mln PLN. | UNSUPPORTED | **UNSUPPORTED** | ✅ | — |

Surowe odpowiedzi (z cytatami i uzasadnieniami): [`results_raw.json`](results_raw.json).

## Historia zbioru holdout

| Etap | Commit silnika | Holdout | Fałszywe GROUNDED | Co się zmieniło |
|---|---|---|---|---|
| 1. pierwsze, czyste uruchomienie | `3ad22a7` (zamrożony przed uruchomieniem) | 18/23 (78%) | **1** — H19 „Apex Meridian has an office in Warsaw.” | — |
| 2. poprawka bezpieczeństwa H19 | następny commit | 19/23 (83%) | 0 | Wiązanie stron: strony umowy odczytywane z klauzuli definicji (`("Supplier" or "Apex Meridian")`); fragment nazywający z nazwy inną stronę nie potwierdza twierdzenia. |
| 3. poprawki z testów spoza zestawu | ten sam commit | 20/23 (87%) | 0 | Własne testy (umowa najmu, 15 twierdzeń z audytu) wykazały: (a) brakujące nazwy własne / geograficzne uzupełniane z sąsiednich zdań → wymóg obecności w cytowanym fragmencie, bez punktów za sąsiednie zdania; (b) zasięg przeczenia liczony per zdanie → per człon zdania; (c) twierdzenie przeczące obalane samą wzmianką → wymagany fragment, który sam potwierdziłby wersję twierdzącą; (d) „claim” (roszczenie) traktowane jak mowa zależna. |

**Konsekwencja:** po etapach 2–3 holdout nie jest już w pełni „czysty” — H19 był widziany, a reguły z etapu 3 mogły pośrednio pomóc innym twierdzeniom holdoutu. Rzetelna miara uogólnienia wymaga **nowego** zestawu twierdzeń, najlepiej spisanego przez osobę, która nie widziała kodu silnika. Najbardziej wiarygodna liczba z tego zestawu to etap 1: **78%, 1 fałszywe GROUNDED na 23**.
