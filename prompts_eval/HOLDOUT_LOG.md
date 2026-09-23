## Historia zbioru holdout

| Etap | Commit silnika | Holdout | Fałszywe GROUNDED | Co się zmieniło |
|---|---|---|---|---|
| 1. pierwsze, czyste uruchomienie | `3ad22a7` (zamrożony przed uruchomieniem) | 18/23 (78%) | **1** — H19 „Apex Meridian has an office in Warsaw.” | — |
| 2. poprawka bezpieczeństwa H19 | następny commit | 19/23 (83%) | 0 | Wiązanie stron: strony umowy odczytywane z klauzuli definicji (`("Supplier" or "Apex Meridian")`); fragment nazywający z nazwy inną stronę nie potwierdza twierdzenia. |
| 3. poprawki z testów spoza zestawu | ten sam commit | 20/23 (87%) | 0 | Własne testy (umowa najmu, 15 twierdzeń z audytu) wykazały: (a) brakujące nazwy własne / geograficzne uzupełniane z sąsiednich zdań → wymóg obecności w cytowanym fragmencie, bez punktów za sąsiednie zdania; (b) zasięg przeczenia liczony per zdanie → per człon zdania; (c) twierdzenie przeczące obalane samą wzmianką → wymagany fragment, który sam potwierdziłby wersję twierdzącą; (d) „claim” (roszczenie) traktowane jak mowa zależna. |

**Konsekwencja:** po etapach 2–3 holdout nie jest już w pełni „czysty” — H19 był widziany, a reguły z etapu 3 mogły pośrednio pomóc innym twierdzeniom holdoutu. Rzetelna miara uogólnienia wymaga **nowego** zestawu twierdzeń, najlepiej spisanego przez osobę, która nie widziała kodu silnika. Najbardziej wiarygodna liczba z tego zestawu to etap 1: **78%, 1 fałszywe GROUNDED na 23**.
