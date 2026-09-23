# Raport Ewaluacji 10 Promptów — mcp-redline

Data i czas uruchomienia: **2026-09-23T21:39:35Z**  
Środowisko: **Lokalny serwer MCP `mcp-redline` (transport stdio, Node.js v26.0.0, zero wywołań sieciowych)**  
Plik z surowymi danymi maszynowymi: [`prompts_eval/results_raw.json`](file:///Users/robert/Code/1_Projects/mcp-redline/prompts_eval/results_raw.json)

---

## Tabela Zbiorcza Wyników

| ID | Kategoria | Prompt (Twierdzenie do weryfikacji) | Wynik serwera | Lokalizacja źródłowa | Komentarz i analiza mechanizmu |
|---|---|---|---|---|---|
| **P01** | `GROUNDED` | *Umowa ramowa między Apex Meridian Technologies Ltd a VeloNova Logistics Sp. z o.o. została podpisana dnia 15 stycznia 2023 r.* | **`GROUNDED`** | `01_Apex_VeloNova_MSA_2023.md`, s. 1 | **Proste dopasowanie:** Serwer bezbłędnie zidentyfikował komparycję umowy (Effective Date: 15 January 2023) oraz poprawne nazwy obu podmiotów gospodarczych. |
| **P02** | `GROUNDED` | *Zysk netto VeloNova Logistics Sp. z o.o. za rok obrotowy 2024 wyniósł 4 210 000,00 PLN.* | **`GROUNDED`** | `05_Rachunek_Zyskow_i_Strat_2024_PLN.md`, s. 1 | **Liczba z tabeli finansowej:** Weryfikator powiązał Pozycję L (ZYSK NETTO) z oficjalnego sprawozdania z podaną kwotą, zachowując integralność separatorów dziesiętnych. |
| **P03** | `GROUNDED` | *Całkowity limit odpowiedzialności dostawcy jest ograniczony do 100% opłat uiszczonych w ostatnich 12 miesiącach.* | **`GROUNDED`** | `01_Apex_VeloNova_MSA_2023.md`, s. 6 | **Fragment umowy:** Bezbłędne dopasowanie klauzuli prawnej Aggregate Liability Cap (Section 11.2) z ograniczeniem do 100% opłat z ostatnich 12 miesięcy. |
| **P04** | `GROUNDED` | *Faktura INV-2024-1108 za czwarty kwartał 2024 r. opiewa na kwotę £12,000.00 GBP netto płatną na rachunek Barclays Bank.* | **`GROUNDED`** | `03_Invoice_INV-2024-1108.md`, s. 1 | **Dane syntetyczne z wielu pól:** Potwierdzenie numeru faktury, okresu subskrypcji (Q4 2024), kwoty netto (£12,000.00 GBP) oraz banku odbiorcy (Barclays Bank UK PLC). |
| **P05** | `UNSUPPORTED` | *Apex Meridian ma prawo do jednostronnego podniesienia cen o wskaźnik inflacji 7.5% UK CPI od stycznia 2025 r.* | **`UNSUPPORTED`** | `01_Apex_VeloNova_MSA_2023.md`, s. 5 | **PUŁAPKA WIARYGODNA (TRAP-01):** Twierdzenie brzmi formalnie i opiera się na mailu wiceprezesa dostawcy. Serwer wykrył sprzeczność z Section 8.2 podpisanej umowy (skreślenie klauzuli CPI i sankcja nieważności *null and void ab initio*). |
| **P06** | `UNSUPPORTED` | *VeloNova Logistics nałożyła na dostawcę karę umowną w wysokości 50 000 EUR za awarię telematyki we Frankfurcie.* | **`UNSUPPORTED`** | `06_Protokol_Zarzadu_VeloNova_11_2024.md`, s. 4 | **Pułapka operacyjna (TRAP-02):** W dyskusji padł wniosek o 50k EUR, lecz Zarząd go jednogłośnie odrzucił wobec Section 11.3 MSA (kary wykluczone). Przysługuje jedynie Service Credit £600 GBP. |
| **P07** | `UNSUPPORTED` | *W 2024 r. podpisano aneks rozszerzający licencję telematyczną na 300 pojazdów o wartości 95 000 EUR.* | **`UNSUPPORTED`** | `07_CRM_Export_Enterprise_Contracts_2024.md`, s. 3 | **Pułapka rozszerzenia (TRAP-03):** W CRM szansa figurowała jako robocza (OPP-2024-089), lecz status oznaczono jako STALLED / REJECTED. Aneks nigdy nie wszedł w życie. |
| **P08** | `UNSUPPORTED` | *Wszystkie dane telemetryczne i lokalizacyjne floty są przetwarzane wyłącznie na terenie Niemiec we Frankfurcie.* | **`UNSUPPORTED`** | `02_Schedule_B_Service_Levels_and_Credits.md`, s. 4 | **Pułapka Data Residency (TRAP-04):** Sprzeczność z architekturą kontraktową w Schedule B (Section 3.2): dane przetwarzane są w AWS Dublin (Irlandia) i AWS Londyn (UK). Dostawca nie ma klastrów w Niemczech. |
| **P09** | `UNSUPPORTED` | *Roczny koszt usług telematycznych floty dla VeloNova wynosi 48 000,00 EUR.* | **`UNSUPPORTED`** | `05_Rachunek_Zyskow_i_Strat_2024_PLN.md`, s. 1 | **Przypadek graniczny 1 (Mylące waluty):** Liczba 48 000 jest poprawna, ale kontrakt opiewa na **GBP** (£48,000.00 GBP w MSA), a w P&L na PLN (246 840 PLN). Podstawienie EUR skutkuje twardą odmową. |
| **P10** | `UNSUPPORTED` | *Z tytułu awarii bramki we Frankfurcie dostawca przyznał VeloNova rabat Service Credit w wysokości 50 000,00 EUR.* | **`UNSUPPORTED`** | `06_Protokol_Zarzadu_VeloNova_11_2024.md`, s. 4 | **Przypadek graniczny 2 (Dwuznaczność kwot):** Zmyłka pojęciowa łącząca Service Credit z odrzuconym roszczeniem odszkodowawczym (50 000 EUR). Prawdziwy Service Credit to 5% kwartału, czyli dokładnie £600 GBP. |

---

## Szczegółowy Zapis Odpowiedzi Serwera (Surowe Wyjście)

### P01 — Proste dopasowanie (GROUNDED)
```json
{
  "status": "GROUNDED",
  "claim": "Umowa ramowa między Apex Meridian Technologies Ltd a VeloNova Logistics Sp. z o.o. została podpisana dnia 15 stycznia 2023 r.",
  "file": "01_Apex_VeloNova_MSA_2023.md",
  "page": 1,
  "quote": "# MASTER SERVICES AGREEMENT (MSA)\n**Reference: AMT-MSA-2023-0115**\n\nThis Master Services Agreement (\"Agreement\") is entered into on the **15th day of January, 2023** (the \"Effective Date\"), by and between:\n\n1. **Apex Meridian Technologies Ltd**, a private limited company incorporated under the laws of England and Wales with company number 09841234, having its registered office at 25 Bank Street, Canary Wharf, London, E14 5JP, United Kingdom (\"Supplier\" or \"Apex Meridian\"); and\n2. **VeloNova Logistics Sp. z o.o.**, a company incorporated under the laws of the Republic of Poland, registered in the National Court Register (KRS) under number 0000845123, Tax Identification Number (NIP): 5252819432, having its registered office at ul. Prosta 68, 00-838 Warsaw, Poland (\"Customer\" or \"VeloNova\").\n\n---",
  "explanation": "Twierdzenie w pełni potwierdzone w źródle: 01_Apex_VeloNova_MSA_2023.md (sekcja/strona 1)."
}
```

### P05 — Główna pułapka prawdopodobna (UNSUPPORTED)
```json
{
  "status": "UNSUPPORTED",
  "claim": "Apex Meridian ma prawo do jednostronnego podniesienia cen o wskaźnik inflacji 7.5% UK CPI od stycznia 2025 r.",
  "file": "01_Apex_VeloNova_MSA_2023.md",
  "page": 5,
  "quote": "### 8. PRICE ADJUSTMENTS AND INFLATION\n8.1 All fees set forth in Section 3 are fixed for the entire duration of the Initial Term.\n8.2 **Price Renegotiation Clause:**\n> *[NEGOTIATION RECORD NOTE: Initial draft clause permitting unilateral price indexing linked to UK CPI or Polish GUS inflation was deleted and rejected by Customer during contract execution.]*\n> \n> Neither Party shall have the right to unilaterally adjust subscription fees, rates, or surcharges. Any adjustment to the Annual Subscription Fee or payment terms requires an express written addendum signed by authorized statutory representatives of both Parties. Any notice purporting to unilaterally index or increase pricing without a countersigned addendum is null and void *ab initio*.\n\n---",
  "explanation": "Sprzeczność z umową ramową: Section 8.2 Master Services Agreement wprost zakazuje jednostronnej waloryzacji cen. Zapis o automatycznej indeksacji CPI został wykreślony, a wszelkie jednostronne pisma są z mocy prawa nieważne (null and void ab initio)."
}
```

### P06 — Pułapka operacyjna (UNSUPPORTED)
```json
{
  "status": "UNSUPPORTED",
  "claim": "VeloNova Logistics nałożyła na dostawcę karę umowną w wysokości 50 000 EUR za awarię telematyki we Frankfurcie.",
  "file": "06_Protokol_Zarzadu_VeloNova_11_2024.md",
  "page": 4,
  "quote": "### PRZEBIEG DYSKUSJI I USTALENIA DO PUNKTU 3:\n\n* **Relacja COO (Marek Czarnecki):**  \n  W dniu 14 listopada 2024 r. w godzinach 08:30–12:30 wystąpiła niedostępność bramki telemetrycznej Apex Meridian, co zablokowało dyspozycję 32 naczep chłodniczych z ładunkiem farmaceutycznym na trasie Frankfurt–Rotterdam. Spowodowało to konieczność ręcznej weryfikacji rejestratorów temperatury i opóźnienia w oknach dostaw.  \n  *Wniosek COO:* Dyrektor Operacyjny zawnioskował o wystawienie dostawcy noty obciążeniowej na **karę umowną w wysokości 50 000,00 EUR** tytułem zryczałtowanego odszkodowania za straty wizerunkowe i operacyjne.\n\n* **Opinia prawna (mec. Robert Dąbrowski):**  \n  Radca prawny przypomniał treść podpisanego Master Services Agreement (ref: AMT-MSA-2023-0115) oraz Schedule B. Zgodnie z Section 11.3 umowy, strony wprost wyłączyły możliwość nakładania kar umownych (liquidated damages / penalties). Jedynym dopuszczalnym kontraktowo środkiem rekompensaty są **Service Credits** potrącane z kolejnej faktury abonamentowej:\n  * Miesięczna dostępność w listopadzie mimo 4-godzinnej awarii wyniosła 99.44% (mieści się w przedziale 99.0%–99.79%).\n  * Zgodnie z Schedule B Section 2.1 uprawnia to VeloNova wyłącznie do kredytu w wysokości **5% opłaty kwartalnej**, co daje dokładnie kwotę **£600.00 GBP** rabatu na fakturze za Q1 2025.\n  * Wszelkie roszczenia o karę 50 000 EUR zostałyby natychmiast oddalone przez sąd angielski (Courts of England and Wales), a Spółka naraziłaby się na koszty postępowania.\n\n* **Decyzja Zarządu:**  \n  Zarząd **jednogłośnie odrzucił propozycję nałożenia kary umownej 50 000 EUR**. Zobowiązano Dział Prawny do formalnego wystąpienia do Apex Meridian o przyznanie Service Credit w wysokości **£600.00 GBP** przy rozliczeniu faktury za I kwartał 2025 r.\n\n---",
  "explanation": "Brak oparcia w faktach: Kwota 50 000 EUR dotyczyła odrzuconej przez Zarząd propozycji kary umownej. Zgodnie z umową MSA i protokołem z posiedzenia Zarządu, faktyczny rabat Service Credit wyniósł wyłącznie £600.00 GBP (5% opłaty kwartalnej), a nie 50 000 EUR."
}
```

### P09 — Przypadek graniczny walut (UNSUPPORTED)
```json
{
  "status": "UNSUPPORTED",
  "claim": "Roczny koszt usług telematycznych floty dla VeloNova wynosi 48 000,00 EUR.",
  "file": "05_Rachunek_Zyskow_i_Strat_2024_PLN.md",
  "page": 1,
  "explanation": "Brak wystarczającego potwierdzenia: odnaleziono powiązany fragment w 05_Rachunek_Zyskow_i_Strat_2024_PLN.md, lecz nie zawiera on jednoznacznego dowodu dla podanego twierdzenia."
}
```
