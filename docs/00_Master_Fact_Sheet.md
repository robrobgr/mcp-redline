# MASTER FACT SHEET & TRUTH MATRIX — VeloNova & Apex Meridian

Dokument referencyjny definiujący stan faktyczny (Ground Truth) oraz celowo zastawione pułapki audytowe dla korpusu dokumentów. Służy do deterministycznej weryfikacji poprawności działania narzędzi `quote` i `verify`.

---

## 1. Profile podmiotów

### Apex Meridian Technologies Ltd (Dostawca / Global UK)
* **Forma prawna i jurysdykcja:** Private Limited Company, Anglia i Walia (Company No: 09841234).
* **Siedziba:** 25 Bank Street, Canary Wharf, London, E14 5JP, United Kingdom.
* **Identyfikator podatkowy:** VAT GB 984 1234 56.
* **Profil działalności:** Globalny dostawca platformy telematycznej i optymalizacji tras floty w chmurze (SaaS).
* **Kluczowe osoby:** James Harrington (Senior Vice President, EMEA Sales), Dr. Aris Thorne (Chief Information Security Officer).

### VeloNova Logistics Sp. z o.o. (Klient / Polska & Europa)
* **Forma prawna i jurysdykcja:** Spółka z ograniczoną odpowiedzialnością, Polska (KRS: 0000845123, NIP: 5252819432, REGON: 385912430).
* **Siedziba:** ul. Prosta 68, 00-838 Warszawa, Polska.
* **Huby operacyjne:** Warszawa (HQ), Poznań, Frankfurt nad Menem (DE), Venlo (NL).
* **Profil działalności:** Międzynarodowy transport chłodniczy i logistyka farmaceutyczna w UE.
* **Kluczowe osoby:** Tomasz Rogowski (Prezes Zarządu / CEO), Marta Wiśniewska (Dyrektor Finansowa / CFO), mec. Robert Dąbrowski (Radca Prawny / Head of Legal).
* **Flota i skala:** 180 zestawów ciągnik + naczepa chłodnicza, 140 pracowników, 48 520 000 PLN przychodu w 2024 r.

---

## 2. Twarde fakty (Ground Truth)

| ID | Fakt | Źródło (Plik i sekcja) |
|---|---|---|
| **F01** | Umowa ramowa (MSA) została zawarta dnia 15 stycznia 2023 r. na czas określony 36 miesięcy. | `01_Apex_VeloNova_MSA_2023.md`, Section 2.1 |
| **F02** | Roczny abonament bazowy wynosi £48,000 GBP netto, fakturowany kwartalnie z góry po £12,000 GBP. | `01_Apex_VeloNova_MSA_2023.md`, Section 4.1; `03_Invoice_INV-2024-1108.md` |
| **F03** | Faktura INV-2024-1108 za Q4 2024 opiewa na kwotę £12,000.00 GBP z terminem płatności do 01.11.2024 r. | `03_Invoice_INV-2024-1108.md` |
| **F04** | Gwarantowane SLA miesięcznej dostępności platformy wynosi 99.8%. | `02_Schedule_B_Service_Levels_and_Credits.md`, Section 1.2 |
| **F05** | Całkowity limit odpowiedzialności (Liability Cap) dostawcy wynosi 100% opłat uiszczonych w ostatnich 12 miesiącach. | `01_Apex_VeloNova_MSA_2023.md`, Section 11.2 |
| **F06** | Przychody netto ze sprzedaży VeloNova Logistics Sp. z o.o. za 2024 r. wyniosły 48 520 000,00 PLN. | `05_Rachunek_Zyskow_i_Strat_2024_PLN.md`, Poz. A |
| **F07** | Zysk netto VeloNova Logistics Sp. z o.o. za 2024 r. wyniósł 4 210 000,00 PLN. | `05_Rachunek_Zyskow_i_Strat_2024_PLN.md`, Poz. L |
| **F08** | Prawem właściwym dla umowy ramowej jest prawo Anglii i Walii. | `01_Apex_VeloNova_MSA_2023.md`, Section 14.1 |

---

## 3. Matryca celowych pułapek (Oczekiwany wynik: UNSUPPORTED)

| ID | Twierdzenie testowe (Claim) | Pozorne oparcie (Gdzie pojawia się zmyłka?) | Rzeczywisty stan prawno-faktyczny | Oczekiwany werdykt |
|---|---|---|---|---|
| **TRAP-01** | *Apex Meridian ma prawo do jednostronnego podniesienia cen o wskaźnik inflacji UK CPI bez zgody klienta.* | Mail Jamesa Harringtona z 12.11.2024 r. powołujący się na Section 8.2 umowy. | W podpisanej umowie (Section 8.2) zapis o automatycznej indeksacji inflacyjnej został przekreślony i wyłączony. Wszelkie zmiany cen wymagają obustronnego aneksu. | **`UNSUPPORTED`** |
| **TRAP-02** | *VeloNova Logistics nałożyła na dostawcę karę umowną w wysokości 50 000 EUR za awarię telematyki we Frankfurcie.* | Wypowiedź wiceprezesa w protokole zarządu z 22.11.2024 r. sugerująca naliczenie 50k EUR kary. | Umowa wyklucza kary ryczałtowe; jedynym mechanizmem kompensacyjnym są Service Credits (maks. 5% wartości faktury kwartalnej, czyli £600). Kary 50k EUR nie nałożono. | **`UNSUPPORTED`** |
| **TRAP-03** | *W trzecim kwartale 2024 r. podpisano aneks rozszerzający licencję telematyczną na 300 pojazdów o wartości 95 000 EUR.* | Wpis w notatce handlowej oraz wersja robocza w pipeline CRM. | W oficjalnym eksporcie CRM projekt oznaczono jako `STALLED / REJECTED`. Żaden aneks nie został podpisany. | **`UNSUPPORTED`** |
| **TRAP-04** | *Wszystkie dane telematyczne i lokalizacyjne VeloNova są przechowywane i przetwarzane wyłącznie na terenie Niemiec.* | Broszura marketingowa i deklaracja w mailu ofertowym. | W Załączniku B (Schedule B, Section 3.1) wprost zdefiniowano regiony AWS: Primary w Dublinie (Irlandia) oraz Backup i analityka w Londynie (Wielka Brytania). | **`UNSUPPORTED`** |
