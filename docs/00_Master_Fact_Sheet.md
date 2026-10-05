# MASTER FACT SHEET & TRUTH MATRIX — VeloNova & Apex Meridian

> *Answer key for the corpus. If you are writing an independent holdout set, do not read this file.*

Reference document defining the ground truth facts and intentionally constructed audit traps within the corpus. Used for deterministic validation of the `quote` and `verify` tools.

---

## 1. Entity Profiles

### Apex Meridian Technologies Ltd (Supplier / Global UK)
* **Legal form and jurisdiction:** Private Limited Company, England and Wales (Company No: 00000001).
* **Registered office:** 25 Bank Street, Canary Wharf, London, E14 5JP, United Kingdom.
* **Tax identification:** VAT GB 984 1234 56.
* **Core business:** Global provider of cloud telematics and fleet routing optimization (SaaS).
* **Key personnel:** James Harrington (Senior Vice President, EMEA Sales), Dr. Aris Thorne (Chief Information Security Officer).

### VeloNova Logistics Sp. z o.o. (Customer / Poland & Europe)
* **Legal form and jurisdiction:** Limited liability company (Spółka z o.o.), Poland (KRS: 0000000001, NIP: 5252819432, REGON: 385912430).
* **Registered office:** ul. Prosta 68, 00-838 Warsaw, Poland.
* **Operational hubs:** Warsaw (HQ), Poznań, Frankfurt am Main (DE), Venlo (NL).
* **Core business:** International refrigerated transport and pharmaceutical cold-chain logistics across the EU.
* **Key personnel:** Tomasz Rogowski (President of the Board / CEO), Marta Wiśniewska (Chief Financial Officer / CFO), Robert Dąbrowski, Esq. (Legal Counsel / Head of Legal).
* **Fleet and scale:** 180 tractor-trailer refrigerated units, 140 employees, 48,520,000 PLN revenue in 2024.

---

## 2. Established Facts (Ground Truth)

| ID | Fact | Source (File & Section) |
|---|---|---|
| **F01** | The Master Services Agreement (MSA) was entered into on 15 January 2023 for a fixed initial term of 36 months. | `01_Apex_VeloNova_MSA_2023.md`, Section 2.1 |
| **F02** | The annual base subscription fee is £48,000 GBP net, invoiced quarterly in advance at £12,000 GBP per installment. | `01_Apex_VeloNova_MSA_2023.md`, Section 4.1; `03_Invoice_INV-2024-1108.md` |
| **F03** | Invoice INV-2024-1108 for Q4 2024 amounts to £12,000.00 GBP with payment due date of 01 November 2024. | `03_Invoice_INV-2024-1108.md` |
| **F04** | Guaranteed monthly platform availability SLA is 99.8%. | `02_Schedule_B_Service_Levels_and_Credits.md`, Section 1.2 |
| **F05** | Supplier's aggregate liability cap is limited to 100% of fees paid during the preceding 12 months. | `01_Apex_VeloNova_MSA_2023.md`, Section 11.2 |
| **F06** | Net sales revenues of VeloNova Logistics Sp. z o.o. for FY 2024 totaled 48,520,000.00 PLN. | `05_Rachunek_Zyskow_i_Strat_2024_PLN.md`, Item A |
| **F07** | Net profit of VeloNova Logistics Sp. z o.o. for FY 2024 totaled 4,210,000.00 PLN. | `05_Rachunek_Zyskow_i_Strat_2024_PLN.md`, Item L |
| **F08** | The governing law for the Master Services Agreement is the law of England and Wales. | `01_Apex_VeloNova_MSA_2023.md`, Section 14.1 |

---

## 3. Deliberate Trap Matrix (Expected: CONTRADICTED or UNSUPPORTED)

| ID | Test Claim | Deceptive Premise | Actual Contractual / Fact State | Expected Status |
|---|---|---|---|---|
| **TRAP-01** | *Apex Meridian has the right to unilaterally raise prices by UK CPI inflation without customer consent.* | Sales email from James Harrington on 12 Nov 2024 invoking MSA Section 8.2. | In the executed MSA (Section 8.2), the unilateral CPI indexation clause was explicitly struck out and rejected during execution. Any price adjustment requires mutual written amendment. | **`CONTRADICTED`** |
| **TRAP-02** | *VeloNova Logistics imposed a 50,000 EUR contractual penalty on the supplier for the Frankfurt outage.* | COO proposal recorded in board minutes dated 22 Nov 2024 suggesting a 50k EUR penalty. | The agreement explicitly precludes liquidated damages or penalties; the sole remedy is Service Credits (capped at 5% of quarterly fee = £600). The 50,000 EUR penalty was unanimously rejected. | **`CONTRADICTED`** |
| **TRAP-03** | *In Q3 2024, an amendment expanding the telematics license to 300 vehicles valued at 95,000 EUR was signed.* | Sales notes and a draft opportunity in the CRM pipeline. | In official CRM records, the opportunity is marked `STALLED / REJECTED`. No amendment was ever signed. | **`CONTRADICTED`** |
| **TRAP-04** | *All telematics and location tracking data of VeloNova is stored and processed exclusively in Germany.* | Marketing brochure and sales email declaration. | Schedule B (Section 3.1) explicitly defines AWS regions: Primary processing in Dublin (Ireland) and Backup/Analytics in London (United Kingdom). | **`CONTRADICTED`** / **`UNSUPPORTED`** |
