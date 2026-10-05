// Auto-generated dataset for mcp-redline interactive single-page demo
// Generated at: 2026-10-05T16:19:10.924Z

export const CORPUS_DOCS = [
  {
    "filename": "01_Apex_VeloNova_MSA_2023.md",
    "title": "Apex VeloNova MSA 2023",
    "tier": "Tier 1: Governing Contract",
    "tierLevel": 1,
    "badgeColor": "secondary",
    "summary": "Główna umowa ramowa z klauzulą nadrzędności (Sec 14.2) i zakazem waloryzacji cen (Sec 8.2).",
    "hash": "0x982271509f5a...",
    "fullHash": "982271509f5a92b8286c99fbeb20cdec4c97f21172ca72e82b857169f1715849",
    "lines": 71,
    "words": 778,
    "content": "# MASTER SERVICES AGREEMENT (MSA)\n**Reference: AMT-MSA-2023-0115**\n\nThis Master Services Agreement (\"Agreement\") is entered into on the **15th day of January, 2023** (the \"Effective Date\"), by and between:\n\n1. **Apex Meridian Technologies Ltd**, a private limited company incorporated under the laws of England and Wales with company number 09841234, having its registered office at 25 Bank Street, Canary Wharf, London, E14 5JP, United Kingdom (\"Supplier\" or \"Apex Meridian\"); and\n2. **VeloNova Logistics Sp. z o.o.**, a company incorporated under the laws of the Republic of Poland, registered in the National Court Register (KRS) under number 0000845123, Tax Identification Number (NIP): 5252819432, having its registered office at ul. Prosta 68, 00-838 Warsaw, Poland (\"Customer\" or \"VeloNova\").\n\n---\n\n### RECITALS\nWHEREAS Supplier operates a proprietary cloud-based telemetry, routing optimization, and cold-chain temperature monitoring platform known as the \"Apex Meridian Fleet Engine\"; and\nWHEREAS Customer desires to license the platform for its European transport fleet under the terms and conditions set forth herein.\n\n---\n\n### 1. SCOPE OF SERVICES\n1.1 Supplier grants to Customer a non-exclusive, non-transferable subscription license to access and use the Apex Meridian Fleet Engine for up to 180 commercial fleet vehicles operated by Customer across the European Union.\n1.2 Support services, service uptime commitments, and data residency protocols are governed by Schedule B (Service Levels and Credits) attached hereto.\n\n---\n\n### 2. TERM\n2.1 **Initial Term:** This Agreement commences on the Effective Date (15 January 2023) and shall remain in full force and effect for an initial term of **thirty-six (36) months** ending on 14 January 2026, unless terminated earlier in accordance with Section 12.\n2.2 **Renewal:** Following the Initial Term, the Agreement may be renewed only upon the express mutual written agreement of both Parties at least sixty (60) days prior to expiration. Automatic rollover renewal is explicitly excluded.\n\n---\n\n### 3. FEES AND PAYMENT TERMS\n3.1 **Annual Subscription Fee:** Customer shall pay Supplier an annual base platform fee of **£48,000.00 GBP (forty-eight thousand British Pounds Sterling) net**, exclusive of applicable Value Added Tax.\n3.2 **Invoicing Schedule:** The Annual Subscription Fee shall be billed quarterly in advance in four (4) equal installments of **£12,000.00 GBP net** on the first business day of January, April, July, and October.\n3.3 **Payment Terms:** Invoices are payable within thirty (30) calendar days from the date of issuance to the Supplier bank account designated in Section 15.\n\n---\n\n### 8. PRICE ADJUSTMENTS AND INFLATION\n8.1 All fees set forth in Section 3 are fixed for the entire duration of the Initial Term.\n8.2 **Price Renegotiation Clause:**\n> *[NEGOTIATION RECORD NOTE: Initial draft clause permitting unilateral price indexing linked to UK CPI or Polish GUS inflation was deleted and rejected by Customer during contract execution.]*\n> \n> Neither Party shall have the right to unilaterally adjust subscription fees, rates, or surcharges. Any adjustment to the Annual Subscription Fee or payment terms requires an express written addendum signed by authorized statutory representatives of both Parties. Any notice purporting to unilaterally index or increase pricing without a countersigned addendum is null and void *ab initio*.\n\n---\n\n### 11. LIMITATION OF LIABILITY\n11.1 Neither Party shall be liable to the other for indirect, special, incidental, punitive, or consequential damages, including loss of profits, loss of data, or loss of business opportunity.\n11.2 **Aggregate Liability Cap:** Except for breaches of Section 10 (Confidentiality) or willful misconduct, Supplier's total aggregate liability arising out of or related to this Agreement, whether in contract, tort (including negligence), or otherwise, shall be strictly limited to **one hundred percent (100%) of the total fees actually paid by Customer to Supplier in the twelve (12) months immediately preceding the event giving rise to liability**.\n11.3 **Sole Remedy for Uptime Breaches:** The Service Credits detailed in Schedule B constitute Customer's sole and exclusive financial remedy for any unavailability, degradation, or disruption of the Services. Liquidated damages or arbitrary contractual penalties are expressly disclaimed and barred.\n\n---\n\n### 14. GOVERNING LAW AND JURISDICTION\n14.1 This Agreement, and any dispute or claim arising out of or in connection with it or its subject matter or formation (including non-contractual disputes or claims), shall be governed by and construed in accordance with the **laws of England and Wales**.\n14.2 The Parties irrevocably agree that the **courts of England and Wales** shall have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with this Agreement.\n\n---\n\n### SIGNATURES\n\n**For Apex Meridian Technologies Ltd:**\n*Signed:* [James Harrington]  \n*Name:* James Harrington  \n*Title:* Senior Vice President, EMEA  \n*Date:* 15 January 2023  \n\n**For VeloNova Logistics Sp. z o.o.:**\n*Signed:* [Tomasz Rogowski]  \n*Name:* Tomasz Rogowski  \n*Title:* President of the Management Board (Prezes Zarządu)  \n*Date:* 15 January 2023  \n"
  },
  {
    "filename": "02_Schedule_B_Service_Levels_and_Credits.md",
    "title": "Schedule B Service Levels and Credits",
    "tier": "Tier 1: SLA Schedule",
    "tierLevel": 1,
    "badgeColor": "secondary",
    "summary": "Gwarancje SLA (99.8%), kredyty serwisowe i architektura AWS Dublin/London.",
    "hash": "0xc65e28d70e2d...",
    "fullHash": "c65e28d70e2d3485c5fd0bd36b1edbf1fd7c2f8c51b028b20c17ae5f5f7541b3",
    "lines": 37,
    "words": 429,
    "content": "# SCHEDULE B: SERVICE LEVEL AGREEMENT (SLA) & DATA ARCHITECTURE\n**Attachment to Master Services Agreement AMT-MSA-2023-0115**\n\n---\n\n### 1. SERVICE AVAILABILITY COMMITMENT\n1.1 **Scope:** This Schedule B defines the availability and operational uptime commitments for the Apex Meridian Fleet Engine core telemetry API, web console, and telematics ingestion gateways.\n1.2 **Availability Target:** Supplier guarantees that the Services shall maintain a Monthly Uptime Percentage of not less than **99.8% (ninety-nine point eight percent)** during each calendar month of the Term.\n1.3 **Measurement:** Monthly Uptime Percentage is calculated excluding scheduled maintenance windows (conducted Sundays between 02:00 and 05:00 UTC with at least 5 business days advance notification) and force majeure events.\n\n---\n\n### 2. SERVICE CREDITS\n2.1 In the event Supplier fails to achieve the guaranteed Monthly Uptime Percentage of 99.8% in any calendar month, Customer shall be entitled to request a Service Credit calculated as follows:\n* **Uptime 99.0% to 99.79%:** Service Credit equal to **5% (five percent)** of the pro-rated quarterly fee for the affected month.\n* **Uptime 95.0% to 98.99%:** Service Credit equal to **10% (ten percent)** of the pro-rated quarterly fee.\n* **Uptime below 95.0%:** Service Credit equal to **15% (fifteen percent)** of the pro-rated quarterly fee (Maximum Cap).\n2.2 **Limitation and Claim Procedure:**\n* Service Credits must be requested in writing within thirty (30) days of the end of the month in which the service degradation occurred.\n* Service Credits shall be applied solely as an offset against future quarterly subscription invoices. In no event shall Service Credits be refunded as cash payments.\n* Total Service Credits in any single calendar quarter shall not exceed 15% of the quarterly fee payable for that quarter (i.e. £1,800.00 GBP maximum).\n* As stated in Section 11.3 of the Master Services Agreement, Service Credits represent Customer's sole and exclusive financial remedy. No lump-sum penalties, fines, or third-party indemnifications may be imposed.\n\n---\n\n### 3. INFRASTRUCTURE AND DATA RESIDENCY\n3.1 **Hosting Infrastructure:**\n* **Primary Processing & Live Telemetry Ingestion:** Hosted in Amazon Web Services (AWS) Europe Region located in **Dublin, Ireland (Region: eu-west-1)**.\n* **Secondary Disaster Recovery & Analytics Archive:** Hosted in Amazon Web Services (AWS) Region located in **London, United Kingdom (Region: eu-west-2)**.\n3.2 **Data Sovereignty Note:** Customer fleet data is synchronized between Dublin and London under UK-EU Adequacy Decision guidelines. Supplier does not maintain dedicated compute or storage clusters in the Federal Republic of Germany (Frankfurt). Any claims indicating exclusive German data residency are inaccurate and inconsistent with Supplier’s multi-region architectural specification.\n\n---\n\n*Signed for identification:*\n*Apex Meridian Technologies Ltd:* [JH]  \n*VeloNova Logistics Sp. z o.o.:* [TR]  \n"
  },
  {
    "filename": "03_Invoice_INV-2024-1108.md",
    "title": "Invoice INV-2024-1108",
    "tier": "Tier 1: Financial Ledger",
    "tierLevel": 1,
    "badgeColor": "secondary",
    "summary": "Faktura INV-2024-1108 za Q4 2024 na kwotę £12,000 GBP z rachunkiem Barclays.",
    "hash": "0x4d1cfe700bb2...",
    "fullHash": "4d1cfe700bb26a87841d5ad1640e7ee886b021468e79b0418f771a05ae1e0fa9",
    "lines": 63,
    "words": 276,
    "content": "# COMMERCIAL INVOICE\n**Invoice Number: INV-2024-1108**\n\n---\n\n### INVOICE DETAILS\n* **Invoice Date:** 02 October 2024\n* **Tax / Supply Date:** 01 October 2024\n* **Due Date:** 01 November 2024\n* **Payment Terms:** Net 30 Calendar Days\n* **Currency:** British Pounds Sterling (GBP, £)\n* **Contract Reference:** AMT-MSA-2023-0115\n\n---\n\n### SUPPLIER (SELLER)\n**Apex Meridian Technologies Ltd**  \n25 Bank Street, Canary Wharf  \nLondon, E14 5JP  \nUnited Kingdom  \n*Company Registration No:* 09841234  \n*VAT Registration No:* GB 984 1234 56  \n\n---\n\n### CUSTOMER (BUYER)\n**VeloNova Logistics Sp. z o.o.**  \nul. Prosta 68  \n00-838 Warszawa  \nPoland  \n*KRS:* 0000845123  \n*EU VAT ID:* PL5252819432  \n\n---\n\n### LINE ITEMS\n\n| Line | Description | Period | Qty | Unit Price (GBP) | Net Amount (GBP) | VAT Rate | VAT Amount (GBP) | Gross Total (GBP) |\n|---|---|---|---|---|---|---|---|---|\n| 01 | Apex Meridian Fleet Engine Platform — Enterprise Telematics Subscription (Tier 1: Up to 180 vehicles) | Q4 2024 (01.10.2024 – 31.12.2024) | 1 Quarter | £12,000.00 | £12,000.00 | 0% (Reverse Charge) | £0.00 | £12,000.00 |\n\n---\n\n### INVOICE TOTALS\n* **Total Net Amount:** **£12,000.00 GBP**\n* **Total Value Added Tax (VAT 0%):** £0.00 GBP  \n  *(VAT Reverse Charge: Article 196 EU VAT Directive / UK VAT Act cross-border supply of services)*\n* **TOTAL PAYABLE AMOUNT:** **£12,000.00 GBP**  \n*(Say: Twelve thousand British Pounds Sterling zero pence)*\n\n---\n\n### REMITTANCE INSTRUCTIONS\n* **Bank Name:** Barclays Bank UK PLC\n* **Branch:** 1 Churchill Place, Canary Wharf, London\n* **Account Name:** Apex Meridian Technologies Ltd\n* **IBAN:** GB33BARC20000012345678\n* **BIC / SWIFT Code:** BARCGB22\n* **Payment Reference:** INV-2024-1108 / VeloNova\n\n---\n*Status: Approved and paid in full by VeloNova Logistics on 28 October 2024.*\n"
  },
  {
    "filename": "04_Email_Thread_Inflation_Dispute_Nov2024.md",
    "title": "Email Thread Inflation Dispute Nov2024",
    "tier": "Tier 3: Advisory / Informal Email",
    "tierLevel": 3,
    "badgeColor": "primary",
    "summary": "Wątek sporny dotyczący inflacji 7.5% UK CPI — jednostronne żądanie bez mocy prawnej.",
    "hash": "0xe0bb1263f70f...",
    "fullHash": "e0bb1263f70f2b92e5b769d74ac7e3bd06548559c0703a40b6e5d9942dbd45d3",
    "lines": 93,
    "words": 738,
    "content": "# CORRESPONDENCE ARCHIVE: INFLATION ADJUSTMENT DISPUTE\n**Thread Subject: RE: Apex Meridian / VeloNova — 2025 Annual Fee Indexation Notice [AMT-MSA-2023-0115]**\n\n---\n\n### MESSAGE 1 (OUTGOING FROM SUPPLIER)\n* **From:** James Harrington `<j.harrington@apexmeridian.co.uk>`\n* **To:** Tomasz Rogowski `<t.rogowski@velonova.pl>`, Marta Wiśniewska `<m.wisniewska@velonova.pl>`\n* **Date:** Tuesday, 12 November 2024, 10:14 GMT\n* **Subject:** Apex Meridian / VeloNova — 2025 Annual Fee Indexation Notice [AMT-MSA-2023-0115]\n\nDear Tomasz and Marta,\n\nI hope this email finds you well and that Q4 operations across your European corridors are progressing smoothly.\n\nAs we approach the third year of our partnership under Master Services Agreement AMT-MSA-2023-0115, I am writing to provide formal notice regarding our standard annual fee revision. Due to sustained increases in UK data centre operational costs and broader inflation, Apex Meridian is applying an annual adjustment of **7.5% (seven point five percent)**, corresponding to the published UK Consumer Price Index (CPI) over the preceding twelve-month period.\n\nPursuant to Section 8.2 of the Agreement, starting from the Q1 2025 billing cycle (invoice date: 02 January 2025), the quarterly subscription fee will adjust from £12,000.00 GBP to **£12,900.00 GBP net per quarter** (annual total: £51,600.00 GBP).\n\nPlease confirm receipt of this notification and update your enterprise procurement and ERP records accordingly.\n\nWarm regards,  \n**James Harrington**  \nSenior Vice President, EMEA  \nApex Meridian Technologies Ltd | 25 Bank Street, London, E14 5JP  \n\n---\n\n### MESSAGE 2 (INTERNAL VELONOVA)\n* **From:** Tomasz Rogowski `<t.rogowski@velonova.pl>`\n* **To:** mec. Robert Dąbrowski `<r.dabrowski@velonova.pl>`\n* **Cc:** Marta Wiśniewska `<m.wisniewska@velonova.pl>`\n* **Date:** Tuesday, 12 November 2024, 11:32 CET\n* **Subject:** FW: Apex Meridian / VeloNova — 2025 Annual Fee Indexation Notice [AMT-MSA-2023-0115]\n\nCześć Robert,\n\nSpójrz proszę na poniższego maila od Jamesa z Apexu. Twierdzą, że na podstawie pkt 8.2 podnoszą nam stawkę o 7,5% od stycznia 2025 (dodatkowe 900 funtów kwartalnie). \n\nO ile pamiętam, w grudniu 2022 r. stoczyliśmy o to batalię i twardo wykreśliliśmy jakąkolwiek automatyczną waloryzację inflacyjną na 3-letni okres umowy. Czy możesz to pilnie zweryfikować z podpisanym oryginałem i przygotować odpowiedź? Nie zamierzamy płacić ani pensa więcej.\n\nPozdrawiam,  \n**Tomasz Rogowski**  \nPrezes Zarządu | VeloNova Logistics Sp. z o.o.  \n\n---\n\n### MESSAGE 3 (INTERNAL LEGAL OPINION)\n* **From:** mec. Robert Dąbrowski `<r.dabrowski@velonova.pl>`\n* **To:** Tomasz Rogowski `<t.rogowski@velonova.pl>`, Marta Wiśniewska `<m.wisniewska@velonova.pl>`\n* **Date:** Wednesday, 13 November 2024, 09:45 CET\n* **Subject:** RE: Apex Meridian / VeloNova — 2025 Annual Fee Indexation Notice [AMT-MSA-2023-0115]\n\nTomaszu, Marto,\n\nZweryfikowałem podpisany 15 stycznia 2023 r. oryginał Master Services Agreement (ref: AMT-MSA-2023-0115). \n\nStanowisko Jamesa Harringtona jest całkowicie bezpodstawne. W toku negocjacji w styczniu 2023 r. usunęliśmy klauzulę jednostronnej waloryzacji. Zgodnie z brzmieniem **Section 8.2 podpisanego MSA**:\n\n> *\"Neither Party shall have the right to unilaterally adjust subscription fees, rates, or surcharges. Any adjustment to the Annual Subscription Fee or payment terms requires an express written addendum signed by authorized statutory representatives of both Parties. Any notice purporting to unilaterally index or increase pricing without a countersigned addendum is null and void ab initio.\"*\n\nPonadto Section 8.1 wprost stanowi, że opłaty są stałe przez cały 36-miesięczny Initial Term (czyli do 14 stycznia 2026 r.). \n\nW świetle prawa angielskiego (któremu podlega umowa — Section 14.1) ich jednostronne pismo nie wywołuje żadnych skutków prawnych. Przygotowałem poniżej projekt formalnego pisma odmownego.\n\nZ poważaniem,  \n**mec. Robert Dąbrowski**  \nDyrektor Działu Prawnego | Radca Prawny (WA-11204)  \nVeloNova Logistics Sp. z o.o.  \n\n---\n\n### MESSAGE 4 (FORMAL REFUSAL TO SUPPLIER)\n* **From:** Tomasz Rogowski `<t.rogowski@velonova.pl>`\n* **To:** James Harrington `<j.harrington@apexmeridian.co.uk>`\n* **Cc:** Marta Wiśniewska `<m.wisniewska@velonova.pl>`, mec. Robert Dąbrowski `<r.dabrowski@velonova.pl>`\n* **Date:** Thursday, 14 November 2024, 14:20 CET\n* **Subject:** RE: Apex Meridian / VeloNova — 2025 Annual Fee Indexation Notice [AMT-MSA-2023-0115]\n\nDear James,\n\nWe acknowledge receipt of your email dated 12 November 2024. \n\nWe formally reject the proposed 7.5% price indexation and dispute your interpretation of Section 8.2 of the Master Services Agreement (AMT-MSA-2023-0115). As agreed during contract execution on 15 January 2023 and documented in Section 8.1 and 8.2 of the executed Agreement, all subscription fees are strictly fixed for the entire 36-month Initial Term. The clause enabling unilateral indexation was specifically struck out and prohibited; any price adjustment strictly requires an express bilateral written addendum.\n\nAccordingly, any unilateral invoice reflecting an adjusted amount will be disputed and rejected by our finance department. VeloNova Logistics will continue honoring our contractual commitment of exactly **£12,000.00 GBP net per quarter** through the remainder of the Initial Term.\n\nSincerely,  \n**Tomasz Rogowski**  \nPresident of the Management Board  \nVeloNova Logistics Sp. z o.o.  \nul. Prosta 68, 00-838 Warsaw, Poland  \n"
  },
  {
    "filename": "05_Rachunek_Zyskow_i_Strat_2024_PLN.md",
    "title": "Rachunek Zyskow i Strat 2024 PLN",
    "tier": "Tier 1: Financial Statement",
    "tierLevel": 1,
    "badgeColor": "secondary",
    "summary": "Oficjalny Rachunek Zysków i Strat za 2024 r. (Przychody 48.52M PLN, Zysk netto 4.21M PLN).",
    "hash": "0xe30dcaba87c0...",
    "fullHash": "e30dcaba87c00ac5694a82dae810254f0a3a9541728a6e241486261e59e3ce5d",
    "lines": 41,
    "words": 493,
    "content": "# RACHUNEK ZYSKÓW I STRAT (WARIANT PORÓWNAWCZY)\n**VeloNova Logistics Sp. z o.o.**  \n*KRS: 0000845123 | NIP: 5252819432*  \n*Okres sprawozdawczy: 01.01.2024 – 31.12.2024 (zestawienie w PLN)*\n\n---\n\n| Pozycja | Wyszczególnienie | Rok bieżący (2024) [PLN] | Rok poprzedni (2023) [PLN] |\n|---|---|---|---|\n| **A.** | **Przychody netto ze sprzedaży i zrównane z nimi** | **48 520 000,00** | **41 200 000,00** |\n| I. | Przychody netto ze sprzedaży usług spedycyjnych i transportowych | 46 850 000,00 | 39 800 000,00 |\n| II. | Przychody z usług logistyki magazynowej i chłodniczej | 1 670 000,00 | 1 400 000,00 |\n| **B.** | **Koszty działalności operacyjnej** | **43 180 000,00** | **37 050 000,00** |\n| I. | Amortyzacja środków trwałych | 2 150 000,00 | 1 950 000,00 |\n| II. | Zużycie materiałów i energii (w tym paliwo floty 180 pojazdów) | 12 600 000,00 | 11 100 000,00 |\n| III. | Usługi obce (w tym telematyka i infrastruktura chmurowa) | **8 920 000,00** | 7 600 000,00 |\n| IV. | Podatki i opłaty drogowe (Viapoll, MAUT, Eurovignette) | 1 060 000,00 | 950 000,00 |\n| V. | Wynagrodzenia (kierowcy, spedycja, administracja) | 15 250 000,00 | 12 800 000,00 |\n| VI. | Ubezpieczenia społeczne i inne świadczenia | 3 200 000,00 | 2 650 000,00 |\n| **C.** | **Zysk (strata) ze sprzedaży (A - B)** | **5 340 000,00** | **4 150 000,00** |\n| **D.** | **Pozostałe przychody operacyjne** | 180 000,00 | 120 000,00 |\n| **E.** | **Pozostałe koszty operacyjne** | 210 000,00 | 160 000,00 |\n| **F.** | **Zysk (strata) z działalności operacyjnej (C + D - E)** | **5 310 000,00** | **4 110 000,00** |\n| **G.** | **Przychody finansowe** | 90 000,00 | 60 000,00 |\n| **H.** | **Koszty finansowe (w tym różnice kursowe GBP/EUR/PLN)** | 210 000,00 | 190 000,00 |\n| **I.** | **Zysk (strata) brutto (F + G - H)** | **5 190 000,00** | **3 980 000,00** |\n| **J.** | **Podatek dochodowy (CIT 19%)** | 980 000,00 | 756 200,00 |\n| **L.** | **ZYSK NETTO (I - J)** | **4 210 000,00** | **3 223 800,00** |\n\n---\n\n### NOTA OBJAŚNIAJĄCA NR 4: KOSZTY USŁUG OBCYCH I CYFROWEJ FLOTY\nW pozycji B.III (Usługi obce) ujęto m.in. koszty licencji telematyki i monitoringu temperatury chłodniczej w transporcie farmaceutycznym:\n* W roku obrotowym 2024 łączny koszt subskrypcji platformy Apex Meridian Fleet Engine (dostawca: Apex Meridian Technologies Ltd, Wielka Brytania) wyniósł **£48,000.00 GBP**, co po przeliczeniu na walutę polską według średnich kursów NBP z dni poprzedzających wystawienie faktur kwartalnych stanowiło równowartość **246 840,00 PLN**.\n* Płatności były realizowane terminowo w cyklach kwartalnych (£12 000 GBP na kwartał). Spółka nie utworzyła rezerw na roszczenia sporne ani indeksację inflacyjną wobec odrzucenia bezpodstawnych żądań dostawcy.\n\n---\n*Sporządziła:* Marta Wiśniewska (Dyrektor Finansowa / Główna Księgowa)  \n*Zatwierdził:* Tomasz Rogowski (Prezes Zarządu)  \n*Data sporządzenia:* 28 lutego 2025 r.  \n"
  },
  {
    "filename": "06_Protokol_Zarzadu_VeloNova_11_2024.md",
    "title": "Protokol Zarzadu VeloNova 11 2024",
    "tier": "Tier 1: Executive Board Record",
    "tierLevel": 1,
    "badgeColor": "secondary",
    "summary": "Protokół z posiedzenia Zarządu: odrzucenie kary 50k EUR, zatwierdzenie rabatu £600 GBP.",
    "hash": "0x1a95fc5b504b...",
    "fullHash": "1a95fc5b504bd03102dbd88bc37278b17358720232beab427d81af74e97224ec",
    "lines": 52,
    "words": 439,
    "content": "# PROTOKÓŁ NR 11/2024 Z POSIEDZENIA ZARZĄDU\n**Spółki VeloNova Logistics Sp. z o.o. z siedzibą w Warszawie**  \n*Data posiedzenia: 22 listopada 2024 r., godz. 11:00*  \n*Miejsce: Siedziba Spółki, ul. Prosta 68, 00-838 Warszawa (Sala Konferencyjna A)*\n\n---\n\n### OBECNI:\n1. **Tomasz Rogowski** — Prezes Zarządu, Przewodniczący posiedzenia\n2. **Marta Wiśniewska** — Członek Zarządu ds. Finansowych (CFO)\n3. **Marek Czarnecki** — Dyrektor Operacyjny (COO), zaproszony gość\n4. **mec. Robert Dąbrowski** — Radca Prawny, Head of Legal, zaproszony gość\n\n---\n\n### PORZĄDEK OBRAD:\n1. Otwarcie posiedzenia i przyjęcie porządku obrad.\n2. Wstępne wyniki finansowe za okres styczeń–październik 2024 r.\n3. **Omówienie 4-godzinnej awarii telematyki w hubie Frankfurt w dniu 14.11.2024 r. oraz kwestii roszczeń odszkodowawczych wobec dostawcy Apex Meridian Technologies Ltd.**\n4. Status sporu dotyczącego żądania indeksacji cenowej przez Apex Meridian Technologies Ltd.\n5. Wolne wnioski i zamknięcie posiedzenia.\n\n---\n\n### PRZEBIEG DYSKUSJI I USTALENIA DO PUNKTU 3:\n\n* **Relacja COO (Marek Czarnecki):**  \n  W dniu 14 listopada 2024 r. w godzinach 08:30–12:30 wystąpiła niedostępność bramki telemetrycznej Apex Meridian, co zablokowało dyspozycję 32 naczep chłodniczych z ładunkiem farmaceutycznym na trasie Frankfurt–Rotterdam. Spowodowało to konieczność ręcznej weryfikacji rejestratorów temperatury i opóźnienia w oknach dostaw.  \n  *Wniosek COO:* Dyrektor Operacyjny zawnioskował o wystawienie dostawcy noty obciążeniowej na **karę umowną w wysokości 50 000,00 EUR** tytułem zryczałtowanego odszkodowania za straty wizerunkowe i operacyjne.\n\n* **Opinia prawna (mec. Robert Dąbrowski):**  \n  Radca prawny przypomniał treść podpisanego Master Services Agreement (ref: AMT-MSA-2023-0115) oraz Schedule B. Zgodnie z Section 11.3 umowy, strony wprost wyłączyły możliwość nakładania kar umownych (liquidated damages / penalties). Jedynym dopuszczalnym kontraktowo środkiem rekompensaty są **Service Credits** potrącane z kolejnej faktury abonamentowej:\n  * Miesięczna dostępność w listopadzie mimo 4-godzinnej awarii wyniosła 99.44% (mieści się w przedziale 99.0%–99.79%).\n  * Zgodnie z Schedule B Section 2.1 uprawnia to VeloNova wyłącznie do kredytu w wysokości **5% opłaty kwartalnej**, co daje dokładnie kwotę **£600.00 GBP** rabatu na fakturze za Q1 2025.\n  * Wszelkie roszczenia o karę 50 000 EUR zostałyby natychmiast oddalone przez sąd angielski (Courts of England and Wales), a Spółka naraziłaby się na koszty postępowania.\n\n* **Decyzja Zarządu:**  \n  Zarząd **jednogłośnie odrzucił propozycję nałożenia kary umownej 50 000 EUR**. Zobowiązano Dział Prawny do formalnego wystąpienia do Apex Meridian o przyznanie Service Credit w wysokości **£600.00 GBP** przy rozliczeniu faktury za I kwartał 2025 r.\n\n---\n\n### PRZEBIEG DYSKUSJI I USTALENIA DO PUNKTU 4:\n\n* Zarząd przyjął do wiadomości treść pisma Prezesa Zarządu z 14 listopada 2024 r. odrzucającego żądanie 7,5% indeksacji inflacyjnej zgłoszone przez Jamesa Harringtona.\n* CFO Marta Wiśniewska potwierdziła, że budżet IT na 2025 r. zakłada niezmienioną stawkę **£12,000.00 GBP kwartalnie** (£48,000 GBP rocznie).\n\n---\n\n### PODPISY:\n*Tomasz Rogowski* — Prezes Zarządu  \n*Marta Wiśniewska* — Członek Zarządu  \n"
  },
  {
    "filename": "07_CRM_Export_Enterprise_Contracts_2024.md",
    "title": "CRM Export Enterprise Contracts 2024",
    "tier": "Tier 2: CRM Sales Pipeline",
    "tierLevel": 2,
    "badgeColor": "tertiary",
    "summary": "Rejestr szans sprzedaży i aneksów — odrzucona propozycja floty 300 aut (OPP-2024-089).",
    "hash": "0xfc1273c03613...",
    "fullHash": "fc1273c03613a6239059bd053e36e4dc4f523b49971cb62aebee8ee2ae6b8112",
    "lines": 39,
    "words": 506,
    "content": "# ENTERPRISE CONTRACTS & PIPELINE EXPORT (CRM Q4 2024)\n**System: Salesforce CRM Enterprise / VeloNova Logistics Sp. z o.o.**  \n*Data eksportu: 05 grudnia 2024 r., 16:30 CET*  \n*Filtry: Segment Enterprise, Kontrakty Strategiczne oraz Szanse Partnerskie (2023–2025)*\n\n---\n\n### TABELA 1: AKTYWNE KONTRAKTY DOSTAWCÓW TECHNOLOGICZNYCH (PROCUREMENT)\n\n| ID Kontraktu | Dostawca | Przedmiot umowy | Data rozpoczęcia | Data zakończenia | Wartość roczna | Waluta | Status kontraktu | Osoba odpowiedzialna |\n|---|---|---|---|---|---|---|---|---|\n| **CNT-2023-014** | **Apex Meridian Technologies Ltd** | Telematyka i optymalizacja tras (180 naczep chłodniczych) | 15.01.2023 | 14.01.2026 | **48 000,00** | **GBP** | **ACTIVE / SIGNED** | T. Rogowski / M. Wiśniewska |\n| CNT-2023-088 | ThermoKing Telematics Europe B.V. | Sensory IoT i czujniki temperatury komory | 01.03.2023 | 28.02.2026 | 32 400,00 | EUR | ACTIVE / SIGNED | M. Czarnecki |\n| CNT-2024-002 | T-Mobile Polska S.A. | Łączność M2M / SIM EU Roaming (250 kart) | 01.01.2024 | 31.12.2025 | 74 000,00 | PLN | ACTIVE / SIGNED | K. Lewandowski |\n| CNT-2022-105 | DKV Euro Service GmbH | Karty paliwowe i opłaty drogowe UE | 01.06.2022 | 31.05.2025 | 11 500 000,00 | PLN | ACTIVE / SIGNED | M. Wiśniewska |\n\n---\n\n### TABELA 2: SZANSE ROZSZERZENIA I WNIOSKI ZAKUPOWE (PIPELINE & AMENDMENTS)\n\n| Opportunity ID | Partner / Podmiot | Nazwa projektu / Szansy | Zgłoszona wartość | Waluta | Data modyfikacji | Etap procesu | Status decyzyjny | Notatka z przeglądu ofert |\n|---|---|---|---|---|---|---|---|---|\n| **OPP-2024-089** | **Apex Meridian Technologies Ltd** | **Fleet Expansion to 300 vehicles (Annex 2 Proposal)** | **95 000,00** | **EUR** | 18.09.2024 | Closed Lost / Abandoned | **STALLED / REJECTED** | **Oferta rozszerzenia odrzucona przez Zarząd w Q3 2024.** Dostawca żądał rozliczenia w EUR po niekorzystnym kursie i próbował narzucić klauzulę CPI. Aneks nigdy nie został podpisany. Obowiązuje wyłącznie pierwotny limit 180 pojazdów. |\n| OPP-2024-112 | Trans-Euro Freight Hub Frankfurt | Dedykowane doki przeładunkowe w hubie DE | 180 000,00 | EUR | 28.11.2024 | Negotiations | IN PROGRESS | Trwają negocjacje umowy najmu powierzchni chłodniczej od marca 2025. |\n| OPP-2024-045 | Nordic Green Transport | Projekt pilotażowy ciągników elektrycznych | 320 000,00 | EUR | 15.06.2024 | Evaluation | ON HOLD | Analiza TCO wstrzymana do czasu rozbudowy infrastruktury ładowania. |\n\n---\n\n### TABELA 3: KLUCZOWE KONTRAKTY PRZYCHODOWE Z KLIENTAMI (B2B PHARMA)\n\n| ID Klienta | Nazwa klienta | Kraj docelowy | Roczny wolumen | Szacowany przychód 2024 | Waluta | Wymóg SLA temperatury |\n|---|---|---|---|---|---|---|\n| CLI-001 | BioPharm Global Logistics GmbH | Niemcy / Beneluks | 4 200 frachtów | 14 200 000,00 | EUR | 99.9% (zakres +2°C do +8°C) |\n| CLI-002 | PolPharma Direct S.A. | Polska / CEE | 6 800 frachtów | 18 500 000,00 | PLN | 99.8% (zakres +15°C do +25°C) |\n| CLI-003 | MedicoDistrib SAS | Francja | 2 100 frachtów | 7 800 000,00 | EUR | 99.9% (monitoring ciągły GPS/temp) |\n\n---\n*Wygenerowano automatycznie z instancji produkcyjnej Salesforce VeloNova Logistics.*\n"
  }
];

export const SECTIONS = [
  {
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 1,
    "title": "MASTER SERVICES AGREEMENT (MSA)",
    "content": "# MASTER SERVICES AGREEMENT (MSA)\n**Reference: AMT-MSA-2023-0115**\n\nThis Master Services Agreement (\"Agreement\") is entered into on the **15th day of January, 2023** (the \"Effective Date\"), by and between:\n\n1. **Apex Meridian Technologies Ltd**, a private limited company incorporated under the laws of England and Wales with company number 09841234, having its registered office at 25 Bank Street, Canary Wharf, London, E14 5JP, United Kingdom (\"Supplier\" or \"Apex Meridian\"); and\n2. **VeloNova Logistics Sp. z o.o.**, a company incorporated under the laws of the Republic of Poland, registered in the National Court Register (KRS) under number 0000845123, Tax Identification Number (NIP): 5252819432, having its registered office at ul. Prosta 68, 00-838 Warsaw, Poland (\"Customer\" or \"VeloNova\").\n\n---",
    "tier": 1
  },
  {
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 2,
    "title": "RECITALS",
    "content": "### RECITALS\nWHEREAS Supplier operates a proprietary cloud-based telemetry, routing optimization, and cold-chain temperature monitoring platform known as the \"Apex Meridian Fleet Engine\"; and\nWHEREAS Customer desires to license the platform for its European transport fleet under the terms and conditions set forth herein.\n\n---",
    "tier": 1
  },
  {
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 3,
    "title": "1. SCOPE OF SERVICES",
    "content": "### 1. SCOPE OF SERVICES\n1.1 Supplier grants to Customer a non-exclusive, non-transferable subscription license to access and use the Apex Meridian Fleet Engine for up to 180 commercial fleet vehicles operated by Customer across the European Union.\n1.2 Support services, service uptime commitments, and data residency protocols are governed by Schedule B (Service Levels and Credits) attached hereto.\n\n---",
    "tier": 1
  },
  {
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 4,
    "title": "2. TERM",
    "content": "### 2. TERM\n2.1 **Initial Term:** This Agreement commences on the Effective Date (15 January 2023) and shall remain in full force and effect for an initial term of **thirty-six (36) months** ending on 14 January 2026, unless terminated earlier in accordance with Section 12.\n2.2 **Renewal:** Following the Initial Term, the Agreement may be renewed only upon the express mutual written agreement of both Parties at least sixty (60) days prior to expiration. Automatic rollover renewal is explicitly excluded.\n\n---",
    "tier": 1
  },
  {
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 5,
    "title": "3. FEES AND PAYMENT TERMS",
    "content": "### 3. FEES AND PAYMENT TERMS\n3.1 **Annual Subscription Fee:** Customer shall pay Supplier an annual base platform fee of **£48,000.00 GBP (forty-eight thousand British Pounds Sterling) net**, exclusive of applicable Value Added Tax.\n3.2 **Invoicing Schedule:** The Annual Subscription Fee shall be billed quarterly in advance in four (4) equal installments of **£12,000.00 GBP net** on the first business day of January, April, July, and October.\n3.3 **Payment Terms:** Invoices are payable within thirty (30) calendar days from the date of issuance to the Supplier bank account designated in Section 15.\n\n---",
    "tier": 1
  },
  {
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 6,
    "title": "8. PRICE ADJUSTMENTS AND INFLATION",
    "content": "### 8. PRICE ADJUSTMENTS AND INFLATION\n8.1 All fees set forth in Section 3 are fixed for the entire duration of the Initial Term.\n8.2 **Price Renegotiation Clause:**\n> *[NEGOTIATION RECORD NOTE: Initial draft clause permitting unilateral price indexing linked to UK CPI or Polish GUS inflation was deleted and rejected by Customer during contract execution.]*\n> \n> Neither Party shall have the right to unilaterally adjust subscription fees, rates, or surcharges. Any adjustment to the Annual Subscription Fee or payment terms requires an express written addendum signed by authorized statutory representatives of both Parties. Any notice purporting to unilaterally index or increase pricing without a countersigned addendum is null and void *ab initio*.\n\n---",
    "tier": 1
  },
  {
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 7,
    "title": "11. LIMITATION OF LIABILITY",
    "content": "### 11. LIMITATION OF LIABILITY\n11.1 Neither Party shall be liable to the other for indirect, special, incidental, punitive, or consequential damages, including loss of profits, loss of data, or loss of business opportunity.\n11.2 **Aggregate Liability Cap:** Except for breaches of Section 10 (Confidentiality) or willful misconduct, Supplier's total aggregate liability arising out of or related to this Agreement, whether in contract, tort (including negligence), or otherwise, shall be strictly limited to **one hundred percent (100%) of the total fees actually paid by Customer to Supplier in the twelve (12) months immediately preceding the event giving rise to liability**.\n11.3 **Sole Remedy for Uptime Breaches:** The Service Credits detailed in Schedule B constitute Customer's sole and exclusive financial remedy for any unavailability, degradation, or disruption of the Services. Liquidated damages or arbitrary contractual penalties are expressly disclaimed and barred.\n\n---",
    "tier": 1
  },
  {
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 8,
    "title": "14. GOVERNING LAW AND JURISDICTION",
    "content": "### 14. GOVERNING LAW AND JURISDICTION\n14.1 This Agreement, and any dispute or claim arising out of or in connection with it or its subject matter or formation (including non-contractual disputes or claims), shall be governed by and construed in accordance with the **laws of England and Wales**.\n14.2 The Parties irrevocably agree that the **courts of England and Wales** shall have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with this Agreement.\n\n---",
    "tier": 1
  },
  {
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 9,
    "title": "SIGNATURES",
    "content": "### SIGNATURES\n\n**For Apex Meridian Technologies Ltd:**\n*Signed:* [James Harrington]  \n*Name:* James Harrington  \n*Title:* Senior Vice President, EMEA  \n*Date:* 15 January 2023  \n\n**For VeloNova Logistics Sp. z o.o.:**\n*Signed:* [Tomasz Rogowski]  \n*Name:* Tomasz Rogowski  \n*Title:* President of the Management Board (Prezes Zarządu)  \n*Date:* 15 January 2023",
    "tier": 1
  },
  {
    "file": "02_Schedule_B_Service_Levels_and_Credits.md",
    "page": 1,
    "title": "SCHEDULE B: SERVICE LEVEL AGREEMENT (SLA) & DATA ARCHITECTURE",
    "content": "# SCHEDULE B: SERVICE LEVEL AGREEMENT (SLA) & DATA ARCHITECTURE\n**Attachment to Master Services Agreement AMT-MSA-2023-0115**\n\n---",
    "tier": 1
  },
  {
    "file": "02_Schedule_B_Service_Levels_and_Credits.md",
    "page": 2,
    "title": "1. SERVICE AVAILABILITY COMMITMENT",
    "content": "### 1. SERVICE AVAILABILITY COMMITMENT\n1.1 **Scope:** This Schedule B defines the availability and operational uptime commitments for the Apex Meridian Fleet Engine core telemetry API, web console, and telematics ingestion gateways.\n1.2 **Availability Target:** Supplier guarantees that the Services shall maintain a Monthly Uptime Percentage of not less than **99.8% (ninety-nine point eight percent)** during each calendar month of the Term.\n1.3 **Measurement:** Monthly Uptime Percentage is calculated excluding scheduled maintenance windows (conducted Sundays between 02:00 and 05:00 UTC with at least 5 business days advance notification) and force majeure events.\n\n---",
    "tier": 1
  },
  {
    "file": "02_Schedule_B_Service_Levels_and_Credits.md",
    "page": 3,
    "title": "2. SERVICE CREDITS",
    "content": "### 2. SERVICE CREDITS\n2.1 In the event Supplier fails to achieve the guaranteed Monthly Uptime Percentage of 99.8% in any calendar month, Customer shall be entitled to request a Service Credit calculated as follows:\n* **Uptime 99.0% to 99.79%:** Service Credit equal to **5% (five percent)** of the pro-rated quarterly fee for the affected month.\n* **Uptime 95.0% to 98.99%:** Service Credit equal to **10% (ten percent)** of the pro-rated quarterly fee.\n* **Uptime below 95.0%:** Service Credit equal to **15% (fifteen percent)** of the pro-rated quarterly fee (Maximum Cap).\n2.2 **Limitation and Claim Procedure:**\n* Service Credits must be requested in writing within thirty (30) days of the end of the month in which the service degradation occurred.\n* Service Credits shall be applied solely as an offset against future quarterly subscription invoices. In no event shall Service Credits be refunded as cash payments.\n* Total Service Credits in any single calendar quarter shall not exceed 15% of the quarterly fee payable for that quarter (i.e. £1,800.00 GBP maximum).\n* As stated in Section 11.3 of the Master Services Agreement, Service Credits represent Customer's sole and exclusive financial remedy. No lump-sum penalties, fines, or third-party indemnifications may be imposed.\n\n---",
    "tier": 1
  },
  {
    "file": "02_Schedule_B_Service_Levels_and_Credits.md",
    "page": 4,
    "title": "3. INFRASTRUCTURE AND DATA RESIDENCY",
    "content": "### 3. INFRASTRUCTURE AND DATA RESIDENCY\n3.1 **Hosting Infrastructure:**\n* **Primary Processing & Live Telemetry Ingestion:** Hosted in Amazon Web Services (AWS) Europe Region located in **Dublin, Ireland (Region: eu-west-1)**.\n* **Secondary Disaster Recovery & Analytics Archive:** Hosted in Amazon Web Services (AWS) Region located in **London, United Kingdom (Region: eu-west-2)**.\n3.2 **Data Sovereignty Note:** Customer fleet data is synchronized between Dublin and London under UK-EU Adequacy Decision guidelines. Supplier does not maintain dedicated compute or storage clusters in the Federal Republic of Germany (Frankfurt). Any claims indicating exclusive German data residency are inaccurate and inconsistent with Supplier’s multi-region architectural specification.\n\n---\n\n*Signed for identification:*\n*Apex Meridian Technologies Ltd:* [JH]  \n*VeloNova Logistics Sp. z o.o.:* [TR]",
    "tier": 1
  },
  {
    "file": "03_Invoice_INV-2024-1108.md",
    "page": 1,
    "title": "03_Invoice_INV-2024-1108",
    "content": "# COMMERCIAL INVOICE\n**Invoice Number: INV-2024-1108**\n\n---\n\n### INVOICE DETAILS\n* **Invoice Date:** 02 October 2024\n* **Tax / Supply Date:** 01 October 2024\n* **Due Date:** 01 November 2024\n* **Payment Terms:** Net 30 Calendar Days\n* **Currency:** British Pounds Sterling (GBP, £)\n* **Contract Reference:** AMT-MSA-2023-0115\n\n---\n\n### SUPPLIER (SELLER)\n**Apex Meridian Technologies Ltd**  \n25 Bank Street, Canary Wharf  \nLondon, E14 5JP  \nUnited Kingdom  \n*Company Registration No:* 09841234  \n*VAT Registration No:* GB 984 1234 56  \n\n---\n\n### CUSTOMER (BUYER)\n**VeloNova Logistics Sp. z o.o.**  \nul. Prosta 68  \n00-838 Warszawa  \nPoland  \n*KRS:* 0000845123  \n*EU VAT ID:* PL5252819432  \n\n---\n\n### LINE ITEMS\n\n| Line | Description | Period | Qty | Unit Price (GBP) | Net Amount (GBP) | VAT Rate | VAT Amount (GBP) | Gross Total (GBP) |\n|---|---|---|---|---|---|---|---|---|\n| 01 | Apex Meridian Fleet Engine Platform — Enterprise Telematics Subscription (Tier 1: Up to 180 vehicles) | Q4 2024 (01.10.2024 – 31.12.2024) | 1 Quarter | £12,000.00 | £12,000.00 | 0% (Reverse Charge) | £0.00 | £12,000.00 |\n\n---\n\n### INVOICE TOTALS\n* **Total Net Amount:** **£12,000.00 GBP**\n* **Total Value Added Tax (VAT 0%):** £0.00 GBP  \n  *(VAT Reverse Charge: Article 196 EU VAT Directive / UK VAT Act cross-border supply of services)*\n* **TOTAL PAYABLE AMOUNT:** **£12,000.00 GBP**  \n*(Say: Twelve thousand British Pounds Sterling zero pence)*\n\n---\n\n### REMITTANCE INSTRUCTIONS\n* **Bank Name:** Barclays Bank UK PLC\n* **Branch:** 1 Churchill Place, Canary Wharf, London\n* **Account Name:** Apex Meridian Technologies Ltd\n* **IBAN:** GB33BARC20000012345678\n* **BIC / SWIFT Code:** BARCGB22\n* **Payment Reference:** INV-2024-1108 / VeloNova\n\n---\n*Status: Approved and paid in full by VeloNova Logistics on 28 October 2024.*",
    "tier": 1
  },
  {
    "file": "04_Email_Thread_Inflation_Dispute_Nov2024.md",
    "page": 1,
    "title": "CORRESPONDENCE ARCHIVE: INFLATION ADJUSTMENT DISPUTE",
    "content": "# CORRESPONDENCE ARCHIVE: INFLATION ADJUSTMENT DISPUTE\n**Thread Subject: RE: Apex Meridian / VeloNova — 2025 Annual Fee Indexation Notice [AMT-MSA-2023-0115]**\n\n---",
    "tier": 3
  },
  {
    "file": "04_Email_Thread_Inflation_Dispute_Nov2024.md",
    "page": 2,
    "title": "MESSAGE 1 (OUTGOING FROM SUPPLIER)",
    "content": "### MESSAGE 1 (OUTGOING FROM SUPPLIER)\n* **From:** James Harrington `<j.harrington@apexmeridian.co.uk>`\n* **To:** Tomasz Rogowski `<t.rogowski@velonova.pl>`, Marta Wiśniewska `<m.wisniewska@velonova.pl>`\n* **Date:** Tuesday, 12 November 2024, 10:14 GMT\n* **Subject:** Apex Meridian / VeloNova — 2025 Annual Fee Indexation Notice [AMT-MSA-2023-0115]\n\nDear Tomasz and Marta,\n\nI hope this email finds you well and that Q4 operations across your European corridors are progressing smoothly.\n\nAs we approach the third year of our partnership under Master Services Agreement AMT-MSA-2023-0115, I am writing to provide formal notice regarding our standard annual fee revision. Due to sustained increases in UK data centre operational costs and broader inflation, Apex Meridian is applying an annual adjustment of **7.5% (seven point five percent)**, corresponding to the published UK Consumer Price Index (CPI) over the preceding twelve-month period.\n\nPursuant to Section 8.2 of the Agreement, starting from the Q1 2025 billing cycle (invoice date: 02 January 2025), the quarterly subscription fee will adjust from £12,000.00 GBP to **£12,900.00 GBP net per quarter** (annual total: £51,600.00 GBP).\n\nPlease confirm receipt of this notification and update your enterprise procurement and ERP records accordingly.\n\nWarm regards,  \n**James Harrington**  \nSenior Vice President, EMEA  \nApex Meridian Technologies Ltd | 25 Bank Street, London, E14 5JP  \n\n---",
    "tier": 3
  },
  {
    "file": "04_Email_Thread_Inflation_Dispute_Nov2024.md",
    "page": 3,
    "title": "MESSAGE 2 (INTERNAL VELONOVA)",
    "content": "### MESSAGE 2 (INTERNAL VELONOVA)\n* **From:** Tomasz Rogowski `<t.rogowski@velonova.pl>`\n* **To:** mec. Robert Dąbrowski `<r.dabrowski@velonova.pl>`\n* **Cc:** Marta Wiśniewska `<m.wisniewska@velonova.pl>`\n* **Date:** Tuesday, 12 November 2024, 11:32 CET\n* **Subject:** FW: Apex Meridian / VeloNova — 2025 Annual Fee Indexation Notice [AMT-MSA-2023-0115]\n\nCześć Robert,\n\nSpójrz proszę na poniższego maila od Jamesa z Apexu. Twierdzą, że na podstawie pkt 8.2 podnoszą nam stawkę o 7,5% od stycznia 2025 (dodatkowe 900 funtów kwartalnie). \n\nO ile pamiętam, w grudniu 2022 r. stoczyliśmy o to batalię i twardo wykreśliliśmy jakąkolwiek automatyczną waloryzację inflacyjną na 3-letni okres umowy. Czy możesz to pilnie zweryfikować z podpisanym oryginałem i przygotować odpowiedź? Nie zamierzamy płacić ani pensa więcej.\n\nPozdrawiam,  \n**Tomasz Rogowski**  \nPrezes Zarządu | VeloNova Logistics Sp. z o.o.  \n\n---",
    "tier": 3
  },
  {
    "file": "04_Email_Thread_Inflation_Dispute_Nov2024.md",
    "page": 4,
    "title": "MESSAGE 3 (INTERNAL LEGAL OPINION)",
    "content": "### MESSAGE 3 (INTERNAL LEGAL OPINION)\n* **From:** mec. Robert Dąbrowski `<r.dabrowski@velonova.pl>`\n* **To:** Tomasz Rogowski `<t.rogowski@velonova.pl>`, Marta Wiśniewska `<m.wisniewska@velonova.pl>`\n* **Date:** Wednesday, 13 November 2024, 09:45 CET\n* **Subject:** RE: Apex Meridian / VeloNova — 2025 Annual Fee Indexation Notice [AMT-MSA-2023-0115]\n\nTomaszu, Marto,\n\nZweryfikowałem podpisany 15 stycznia 2023 r. oryginał Master Services Agreement (ref: AMT-MSA-2023-0115). \n\nStanowisko Jamesa Harringtona jest całkowicie bezpodstawne. W toku negocjacji w styczniu 2023 r. usunęliśmy klauzulę jednostronnej waloryzacji. Zgodnie z brzmieniem **Section 8.2 podpisanego MSA**:\n\n> *\"Neither Party shall have the right to unilaterally adjust subscription fees, rates, or surcharges. Any adjustment to the Annual Subscription Fee or payment terms requires an express written addendum signed by authorized statutory representatives of both Parties. Any notice purporting to unilaterally index or increase pricing without a countersigned addendum is null and void ab initio.\"*\n\nPonadto Section 8.1 wprost stanowi, że opłaty są stałe przez cały 36-miesięczny Initial Term (czyli do 14 stycznia 2026 r.). \n\nW świetle prawa angielskiego (któremu podlega umowa — Section 14.1) ich jednostronne pismo nie wywołuje żadnych skutków prawnych. Przygotowałem poniżej projekt formalnego pisma odmownego.\n\nZ poważaniem,  \n**mec. Robert Dąbrowski**  \nDyrektor Działu Prawnego | Radca Prawny (WA-11204)  \nVeloNova Logistics Sp. z o.o.  \n\n---",
    "tier": 3
  },
  {
    "file": "04_Email_Thread_Inflation_Dispute_Nov2024.md",
    "page": 5,
    "title": "MESSAGE 4 (FORMAL REFUSAL TO SUPPLIER)",
    "content": "### MESSAGE 4 (FORMAL REFUSAL TO SUPPLIER)\n* **From:** Tomasz Rogowski `<t.rogowski@velonova.pl>`\n* **To:** James Harrington `<j.harrington@apexmeridian.co.uk>`\n* **Cc:** Marta Wiśniewska `<m.wisniewska@velonova.pl>`, mec. Robert Dąbrowski `<r.dabrowski@velonova.pl>`\n* **Date:** Thursday, 14 November 2024, 14:20 CET\n* **Subject:** RE: Apex Meridian / VeloNova — 2025 Annual Fee Indexation Notice [AMT-MSA-2023-0115]\n\nDear James,\n\nWe acknowledge receipt of your email dated 12 November 2024. \n\nWe formally reject the proposed 7.5% price indexation and dispute your interpretation of Section 8.2 of the Master Services Agreement (AMT-MSA-2023-0115). As agreed during contract execution on 15 January 2023 and documented in Section 8.1 and 8.2 of the executed Agreement, all subscription fees are strictly fixed for the entire 36-month Initial Term. The clause enabling unilateral indexation was specifically struck out and prohibited; any price adjustment strictly requires an express bilateral written addendum.\n\nAccordingly, any unilateral invoice reflecting an adjusted amount will be disputed and rejected by our finance department. VeloNova Logistics will continue honoring our contractual commitment of exactly **£12,000.00 GBP net per quarter** through the remainder of the Initial Term.\n\nSincerely,  \n**Tomasz Rogowski**  \nPresident of the Management Board  \nVeloNova Logistics Sp. z o.o.  \nul. Prosta 68, 00-838 Warsaw, Poland",
    "tier": 3
  },
  {
    "file": "05_Rachunek_Zyskow_i_Strat_2024_PLN.md",
    "page": 1,
    "title": "RACHUNEK ZYSKÓW I STRAT (WARIANT PORÓWNAWCZY)",
    "content": "# RACHUNEK ZYSKÓW I STRAT (WARIANT PORÓWNAWCZY)\n**VeloNova Logistics Sp. z o.o.**  \n*KRS: 0000845123 | NIP: 5252819432*  \n*Okres sprawozdawczy: 01.01.2024 – 31.12.2024 (zestawienie w PLN)*\n\n---\n\n| Pozycja | Wyszczególnienie | Rok bieżący (2024) [PLN] | Rok poprzedni (2023) [PLN] |\n|---|---|---|---|\n| **A.** | **Przychody netto ze sprzedaży i zrównane z nimi** | **48 520 000,00** | **41 200 000,00** |\n| I. | Przychody netto ze sprzedaży usług spedycyjnych i transportowych | 46 850 000,00 | 39 800 000,00 |\n| II. | Przychody z usług logistyki magazynowej i chłodniczej | 1 670 000,00 | 1 400 000,00 |\n| **B.** | **Koszty działalności operacyjnej** | **43 180 000,00** | **37 050 000,00** |\n| I. | Amortyzacja środków trwałych | 2 150 000,00 | 1 950 000,00 |\n| II. | Zużycie materiałów i energii (w tym paliwo floty 180 pojazdów) | 12 600 000,00 | 11 100 000,00 |\n| III. | Usługi obce (w tym telematyka i infrastruktura chmurowa) | **8 920 000,00** | 7 600 000,00 |\n| IV. | Podatki i opłaty drogowe (Viapoll, MAUT, Eurovignette) | 1 060 000,00 | 950 000,00 |\n| V. | Wynagrodzenia (kierowcy, spedycja, administracja) | 15 250 000,00 | 12 800 000,00 |\n| VI. | Ubezpieczenia społeczne i inne świadczenia | 3 200 000,00 | 2 650 000,00 |\n| **C.** | **Zysk (strata) ze sprzedaży (A - B)** | **5 340 000,00** | **4 150 000,00** |\n| **D.** | **Pozostałe przychody operacyjne** | 180 000,00 | 120 000,00 |\n| **E.** | **Pozostałe koszty operacyjne** | 210 000,00 | 160 000,00 |\n| **F.** | **Zysk (strata) z działalności operacyjnej (C + D - E)** | **5 310 000,00** | **4 110 000,00** |\n| **G.** | **Przychody finansowe** | 90 000,00 | 60 000,00 |\n| **H.** | **Koszty finansowe (w tym różnice kursowe GBP/EUR/PLN)** | 210 000,00 | 190 000,00 |\n| **I.** | **Zysk (strata) brutto (F + G - H)** | **5 190 000,00** | **3 980 000,00** |\n| **J.** | **Podatek dochodowy (CIT 19%)** | 980 000,00 | 756 200,00 |\n| **L.** | **ZYSK NETTO (I - J)** | **4 210 000,00** | **3 223 800,00** |\n\n---",
    "tier": 1
  },
  {
    "file": "05_Rachunek_Zyskow_i_Strat_2024_PLN.md",
    "page": 2,
    "title": "NOTA OBJAŚNIAJĄCA NR 4: KOSZTY USŁUG OBCYCH I CYFROWEJ FLOTY",
    "content": "### NOTA OBJAŚNIAJĄCA NR 4: KOSZTY USŁUG OBCYCH I CYFROWEJ FLOTY\nW pozycji B.III (Usługi obce) ujęto m.in. koszty licencji telematyki i monitoringu temperatury chłodniczej w transporcie farmaceutycznym:\n* W roku obrotowym 2024 łączny koszt subskrypcji platformy Apex Meridian Fleet Engine (dostawca: Apex Meridian Technologies Ltd, Wielka Brytania) wyniósł **£48,000.00 GBP**, co po przeliczeniu na walutę polską według średnich kursów NBP z dni poprzedzających wystawienie faktur kwartalnych stanowiło równowartość **246 840,00 PLN**.\n* Płatności były realizowane terminowo w cyklach kwartalnych (£12 000 GBP na kwartał). Spółka nie utworzyła rezerw na roszczenia sporne ani indeksację inflacyjną wobec odrzucenia bezpodstawnych żądań dostawcy.\n\n---\n*Sporządziła:* Marta Wiśniewska (Dyrektor Finansowa / Główna Księgowa)  \n*Zatwierdził:* Tomasz Rogowski (Prezes Zarządu)  \n*Data sporządzenia:* 28 lutego 2025 r.",
    "tier": 1
  },
  {
    "file": "06_Protokol_Zarzadu_VeloNova_11_2024.md",
    "page": 1,
    "title": "PROTOKÓŁ NR 11/2024 Z POSIEDZENIA ZARZĄDU",
    "content": "# PROTOKÓŁ NR 11/2024 Z POSIEDZENIA ZARZĄDU\n**Spółki VeloNova Logistics Sp. z o.o. z siedzibą w Warszawie**  \n*Data posiedzenia: 22 listopada 2024 r., godz. 11:00*  \n*Miejsce: Siedziba Spółki, ul. Prosta 68, 00-838 Warszawa (Sala Konferencyjna A)*\n\n---",
    "tier": 1
  },
  {
    "file": "06_Protokol_Zarzadu_VeloNova_11_2024.md",
    "page": 2,
    "title": "OBECNI:",
    "content": "### OBECNI:\n1. **Tomasz Rogowski** — Prezes Zarządu, Przewodniczący posiedzenia\n2. **Marta Wiśniewska** — Członek Zarządu ds. Finansowych (CFO)\n3. **Marek Czarnecki** — Dyrektor Operacyjny (COO), zaproszony gość\n4. **mec. Robert Dąbrowski** — Radca Prawny, Head of Legal, zaproszony gość\n\n---",
    "tier": 1
  },
  {
    "file": "06_Protokol_Zarzadu_VeloNova_11_2024.md",
    "page": 3,
    "title": "PORZĄDEK OBRAD:",
    "content": "### PORZĄDEK OBRAD:\n1. Otwarcie posiedzenia i przyjęcie porządku obrad.\n2. Wstępne wyniki finansowe za okres styczeń–październik 2024 r.\n3. **Omówienie 4-godzinnej awarii telematyki w hubie Frankfurt w dniu 14.11.2024 r. oraz kwestii roszczeń odszkodowawczych wobec dostawcy Apex Meridian Technologies Ltd.**\n4. Status sporu dotyczącego żądania indeksacji cenowej przez Apex Meridian Technologies Ltd.\n5. Wolne wnioski i zamknięcie posiedzenia.\n\n---",
    "tier": 1
  },
  {
    "file": "06_Protokol_Zarzadu_VeloNova_11_2024.md",
    "page": 4,
    "title": "PRZEBIEG DYSKUSJI I USTALENIA DO PUNKTU 3:",
    "content": "### PRZEBIEG DYSKUSJI I USTALENIA DO PUNKTU 3:\n\n* **Relacja COO (Marek Czarnecki):**  \n  W dniu 14 listopada 2024 r. w godzinach 08:30–12:30 wystąpiła niedostępność bramki telemetrycznej Apex Meridian, co zablokowało dyspozycję 32 naczep chłodniczych z ładunkiem farmaceutycznym na trasie Frankfurt–Rotterdam. Spowodowało to konieczność ręcznej weryfikacji rejestratorów temperatury i opóźnienia w oknach dostaw.  \n  *Wniosek COO:* Dyrektor Operacyjny zawnioskował o wystawienie dostawcy noty obciążeniowej na **karę umowną w wysokości 50 000,00 EUR** tytułem zryczałtowanego odszkodowania za straty wizerunkowe i operacyjne.\n\n* **Opinia prawna (mec. Robert Dąbrowski):**  \n  Radca prawny przypomniał treść podpisanego Master Services Agreement (ref: AMT-MSA-2023-0115) oraz Schedule B. Zgodnie z Section 11.3 umowy, strony wprost wyłączyły możliwość nakładania kar umownych (liquidated damages / penalties). Jedynym dopuszczalnym kontraktowo środkiem rekompensaty są **Service Credits** potrącane z kolejnej faktury abonamentowej:\n  * Miesięczna dostępność w listopadzie mimo 4-godzinnej awarii wyniosła 99.44% (mieści się w przedziale 99.0%–99.79%).\n  * Zgodnie z Schedule B Section 2.1 uprawnia to VeloNova wyłącznie do kredytu w wysokości **5% opłaty kwartalnej**, co daje dokładnie kwotę **£600.00 GBP** rabatu na fakturze za Q1 2025.\n  * Wszelkie roszczenia o karę 50 000 EUR zostałyby natychmiast oddalone przez sąd angielski (Courts of England and Wales), a Spółka naraziłaby się na koszty postępowania.\n\n* **Decyzja Zarządu:**  \n  Zarząd **jednogłośnie odrzucił propozycję nałożenia kary umownej 50 000 EUR**. Zobowiązano Dział Prawny do formalnego wystąpienia do Apex Meridian o przyznanie Service Credit w wysokości **£600.00 GBP** przy rozliczeniu faktury za I kwartał 2025 r.\n\n---",
    "tier": 1
  },
  {
    "file": "06_Protokol_Zarzadu_VeloNova_11_2024.md",
    "page": 5,
    "title": "PRZEBIEG DYSKUSJI I USTALENIA DO PUNKTU 4:",
    "content": "### PRZEBIEG DYSKUSJI I USTALENIA DO PUNKTU 4:\n\n* Zarząd przyjął do wiadomości treść pisma Prezesa Zarządu z 14 listopada 2024 r. odrzucającego żądanie 7,5% indeksacji inflacyjnej zgłoszone przez Jamesa Harringtona.\n* CFO Marta Wiśniewska potwierdziła, że budżet IT na 2025 r. zakłada niezmienioną stawkę **£12,000.00 GBP kwartalnie** (£48,000 GBP rocznie).\n\n---",
    "tier": 1
  },
  {
    "file": "06_Protokol_Zarzadu_VeloNova_11_2024.md",
    "page": 6,
    "title": "PODPISY:",
    "content": "### PODPISY:\n*Tomasz Rogowski* — Prezes Zarządu  \n*Marta Wiśniewska* — Członek Zarządu",
    "tier": 1
  },
  {
    "file": "07_CRM_Export_Enterprise_Contracts_2024.md",
    "page": 1,
    "title": "ENTERPRISE CONTRACTS & PIPELINE EXPORT (CRM Q4 2024)",
    "content": "# ENTERPRISE CONTRACTS & PIPELINE EXPORT (CRM Q4 2024)\n**System: Salesforce CRM Enterprise / VeloNova Logistics Sp. z o.o.**  \n*Data eksportu: 05 grudnia 2024 r., 16:30 CET*  \n*Filtry: Segment Enterprise, Kontrakty Strategiczne oraz Szanse Partnerskie (2023–2025)*\n\n---",
    "tier": 2
  },
  {
    "file": "07_CRM_Export_Enterprise_Contracts_2024.md",
    "page": 2,
    "title": "TABELA 1: AKTYWNE KONTRAKTY DOSTAWCÓW TECHNOLOGICZNYCH (PROCUREMENT)",
    "content": "### TABELA 1: AKTYWNE KONTRAKTY DOSTAWCÓW TECHNOLOGICZNYCH (PROCUREMENT)\n\n| ID Kontraktu | Dostawca | Przedmiot umowy | Data rozpoczęcia | Data zakończenia | Wartość roczna | Waluta | Status kontraktu | Osoba odpowiedzialna |\n|---|---|---|---|---|---|---|---|---|\n| **CNT-2023-014** | **Apex Meridian Technologies Ltd** | Telematyka i optymalizacja tras (180 naczep chłodniczych) | 15.01.2023 | 14.01.2026 | **48 000,00** | **GBP** | **ACTIVE / SIGNED** | T. Rogowski / M. Wiśniewska |\n| CNT-2023-088 | ThermoKing Telematics Europe B.V. | Sensory IoT i czujniki temperatury komory | 01.03.2023 | 28.02.2026 | 32 400,00 | EUR | ACTIVE / SIGNED | M. Czarnecki |\n| CNT-2024-002 | T-Mobile Polska S.A. | Łączność M2M / SIM EU Roaming (250 kart) | 01.01.2024 | 31.12.2025 | 74 000,00 | PLN | ACTIVE / SIGNED | K. Lewandowski |\n| CNT-2022-105 | DKV Euro Service GmbH | Karty paliwowe i opłaty drogowe UE | 01.06.2022 | 31.05.2025 | 11 500 000,00 | PLN | ACTIVE / SIGNED | M. Wiśniewska |\n\n---",
    "tier": 2
  },
  {
    "file": "07_CRM_Export_Enterprise_Contracts_2024.md",
    "page": 3,
    "title": "TABELA 2: SZANSE ROZSZERZENIA I WNIOSKI ZAKUPOWE (PIPELINE & AMENDMENTS)",
    "content": "### TABELA 2: SZANSE ROZSZERZENIA I WNIOSKI ZAKUPOWE (PIPELINE & AMENDMENTS)\n\n| Opportunity ID | Partner / Podmiot | Nazwa projektu / Szansy | Zgłoszona wartość | Waluta | Data modyfikacji | Etap procesu | Status decyzyjny | Notatka z przeglądu ofert |\n|---|---|---|---|---|---|---|---|---|\n| **OPP-2024-089** | **Apex Meridian Technologies Ltd** | **Fleet Expansion to 300 vehicles (Annex 2 Proposal)** | **95 000,00** | **EUR** | 18.09.2024 | Closed Lost / Abandoned | **STALLED / REJECTED** | **Oferta rozszerzenia odrzucona przez Zarząd w Q3 2024.** Dostawca żądał rozliczenia w EUR po niekorzystnym kursie i próbował narzucić klauzulę CPI. Aneks nigdy nie został podpisany. Obowiązuje wyłącznie pierwotny limit 180 pojazdów. |\n| OPP-2024-112 | Trans-Euro Freight Hub Frankfurt | Dedykowane doki przeładunkowe w hubie DE | 180 000,00 | EUR | 28.11.2024 | Negotiations | IN PROGRESS | Trwają negocjacje umowy najmu powierzchni chłodniczej od marca 2025. |\n| OPP-2024-045 | Nordic Green Transport | Projekt pilotażowy ciągników elektrycznych | 320 000,00 | EUR | 15.06.2024 | Evaluation | ON HOLD | Analiza TCO wstrzymana do czasu rozbudowy infrastruktury ładowania. |\n\n---",
    "tier": 2
  },
  {
    "file": "07_CRM_Export_Enterprise_Contracts_2024.md",
    "page": 4,
    "title": "TABELA 3: KLUCZOWE KONTRAKTY PRZYCHODOWE Z KLIENTAMI (B2B PHARMA)",
    "content": "### TABELA 3: KLUCZOWE KONTRAKTY PRZYCHODOWE Z KLIENTAMI (B2B PHARMA)\n\n| ID Klienta | Nazwa klienta | Kraj docelowy | Roczny wolumen | Szacowany przychód 2024 | Waluta | Wymóg SLA temperatury |\n|---|---|---|---|---|---|---|\n| CLI-001 | BioPharm Global Logistics GmbH | Niemcy / Beneluks | 4 200 frachtów | 14 200 000,00 | EUR | 99.9% (zakres +2°C do +8°C) |\n| CLI-002 | PolPharma Direct S.A. | Polska / CEE | 6 800 frachtów | 18 500 000,00 | PLN | 99.8% (zakres +15°C do +25°C) |\n| CLI-003 | MedicoDistrib SAS | Francja | 2 100 frachtów | 7 800 000,00 | EUR | 99.9% (monitoring ciągły GPS/temp) |\n\n---\n*Wygenerowano automatycznie z instancji produkcyjnej Salesforce VeloNova Logistics.*",
    "tier": 2
  }
];

export const BILINGUAL_SYNONYMS = {
  "dostępność": [
    "uptime",
    "availability"
  ],
  "dostępności": [
    "uptime",
    "availability"
  ],
  "miesięcznej": [
    "monthly",
    "month",
    "months"
  ],
  "miesięczna": [
    "monthly",
    "month",
    "months"
  ],
  "miesiącach": [
    "months",
    "month"
  ],
  "gwarantowane": [
    "guaranteed",
    "guarantees",
    "target"
  ],
  "gwarantowana": [
    "guaranteed",
    "guarantees",
    "target"
  ],
  "umowa": [
    "agreement",
    "contract",
    "msa"
  ],
  "umowy": [
    "agreement",
    "contract",
    "msa"
  ],
  "ramowa": [
    "master"
  ],
  "ramowej": [
    "master"
  ],
  "podpisana": [
    "entered",
    "signed",
    "effective"
  ],
  "zawarta": [
    "entered",
    "signed",
    "effective"
  ],
  "stycznia": [
    "january"
  ],
  "styczeń": [
    "january"
  ],
  "lutego": [
    "february"
  ],
  "marca": [
    "march"
  ],
  "kwietnia": [
    "april"
  ],
  "maja": [
    "may"
  ],
  "czerwca": [
    "june"
  ],
  "lipca": [
    "july"
  ],
  "sierpnia": [
    "august"
  ],
  "września": [
    "september"
  ],
  "października": [
    "october"
  ],
  "listopada": [
    "november"
  ],
  "grudnia": [
    "december"
  ],
  "kara": [
    "penalty",
    "liquidated damages",
    "credit"
  ],
  "kary": [
    "penalty",
    "liquidated damages",
    "credit"
  ],
  "karę": [
    "penalty",
    "liquidated damages",
    "credit"
  ],
  "faktura": [
    "invoice",
    "invoicing"
  ],
  "faktury": [
    "invoice",
    "invoicing"
  ],
  "kwartał": [
    "quarter",
    "quarterly",
    "q4"
  ],
  "kwartalnie": [
    "quarter",
    "quarterly",
    "q4"
  ],
  "czwarty": [
    "fourth",
    "q4",
    "quarter"
  ],
  "indeksacja": [
    "indexation",
    "adjustment",
    "cpi"
  ],
  "inflacja": [
    "inflation",
    "cpi"
  ],
  "inflacji": [
    "inflation",
    "cpi"
  ],
  "przychody": [
    "revenues",
    "sales",
    "przychód",
    "sprzedaż"
  ],
  "przychód": [
    "revenues",
    "sales"
  ],
  "operacyjne": [
    "operating",
    "operations",
    "operacyjna",
    "działalności"
  ],
  "operacyjna": [
    "operating",
    "operations"
  ],
  "zysk": [
    "profit",
    "net"
  ],
  "limit": [
    "limit",
    "limitation",
    "cap"
  ],
  "odpowiedzialności": [
    "liability"
  ],
  "odpowiedzialność": [
    "liability"
  ],
  "ograniczony": [
    "limited",
    "cap"
  ],
  "rachunek": [
    "account",
    "bank",
    "remittance"
  ],
  "konto": [
    "account",
    "bank"
  ]
};

export const SCENARIOS = [
  {
    "id": "P01",
    "split": "legacy",
    "expected": "GROUNDED",
    "claim": "Umowa ramowa między Apex Meridian Technologies Ltd a VeloNova Logistics Sp. z o.o. została podpisana dnia 15 stycznia 2023 r.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 7.113625,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 1,
    "tier": 1,
    "quote": "This Master Services Agreement (\"Agreement\") is entered into on the **15th day of January, 2023** (the \"Effective Date\"), by and between:",
    "explanation": "Potwierdzone dosłownym fragmentem: 01_Apex_VeloNova_MSA_2023.md (sekcja 1, Tier 1); pokrycie pojęć 100%, liczby zgodne (15, 2023). Uwaga: źródło o niższej randze (04_Email_Thread_Inflation_Dispute_Nov2024.md, Tier 3) twierdzi inaczej.",
    "prompt": "Umowa ramowa między Apex Meridian Technologies Ltd a VeloNova Logistics Sp. z o.o. została podpisana dnia 15 stycznia 2023 r.",
    "category": "GROUNDED",
    "subtype": "Proste dopasowanie (data podpisania umowy)",
    "llmTitle": "Standard LLM: Syntetyczne potwierdzenie z domniemaniami",
    "llmResponse": "Tak, umowa ramowa między Apex Meridian Technologies a VeloNova Logistics została podpisana 15 stycznia 2023 roku w Londynie na standardowy 3-letni okres z opcją automatycznego przedłużenia.",
    "llmDefects": [
      "Dodano niesprawdzone założenia o automatycznym przedłużeniu",
      "Brak dokładnego cytatu komparycji z numerami rejestrowymi KRS/NIP/Companies House"
    ],
    "financialExposure": "Niskie ryzyko (fakt poprawny, brak ścisłego cytatu)",
    "financialExposureValue": "Brak bezpośredniej kwoty w klauzuli (0 PLN)",
    "financialExposureCfo": "Brak bezpośredniej straty (fakt poprawny), lecz fabrykowanie klauzul automatycznego przedłużenia (rollover) zagraża przyszłym renegocjacjom.",
    "financialFailSafeCost": "~25 PLN (SZACUNEK: 3 min audytu)",
    "agentTrace": {
      "llmDraft": "Tak, umowa została podpisana 15 stycznia 2023 r. w Londynie na 3 lata z automatycznym odnowieniem.",
      "mcpIntercept": "tools/call: verify -> GROUNDED w 01_Apex_VeloNova_MSA_2023.md. Odcięto domniemanie o automatycznym odnowieniu (Section 2.2 wymaga express written agreement).",
      "correctedOutput": "Potwierdzono w Section 1 MSA: podpisano 15.01.2023 r. Zgodnie z Section 2.2 automatyczne odnowienie jest wyłączone."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Gdyby serwer miał wątpliwości z powodu literówki w nazwie, zwróci UNSUPPORTED. Człowiek weryfikuje nagłówek umowy w 2 minuty.",
      "riskAsymmetry": "Błąd typu II (Redline): 2 minuty pracy audytora. Błąd typu I (LLM): akceptacja niekorzystnej klauzuli rollover wiążącej spółkę na lata."
    },
    "riskLevel": "LOW"
  },
  {
    "id": "P02",
    "split": "legacy",
    "expected": "GROUNDED",
    "claim": "Zysk netto VeloNova Logistics Sp. z o.o. za rok obrotowy 2024 wyniósł 4 210 000,00 PLN.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 2.650042,
    "file": "05_Rachunek_Zyskow_i_Strat_2024_PLN.md",
    "page": 1,
    "tier": 1,
    "quote": "| **L.** | **ZYSK NETTO (I - J)** | **4 210 000,00** | **3 223 800,00** |",
    "explanation": "Potwierdzone dosłownym fragmentem: 05_Rachunek_Zyskow_i_Strat_2024_PLN.md (sekcja 1, Tier 1); pokrycie pojęć 100%, liczby zgodne (2024, 4 210 000,00).",
    "prompt": "Zysk netto VeloNova Logistics Sp. z o.o. za rok obrotowy 2024 wyniósł 4 210 000,00 PLN.",
    "category": "GROUNDED",
    "subtype": "Liczba z tabeli (zysk netto z P&L)",
    "llmTitle": "Standard LLM: Zaokrąglenie liczby lub mylenie kategorii bilansowych",
    "llmResponse": "Zgodnie z danymi finansowymi VeloNova Logistics wypracowała w 2024 roku około 4.2 mln PLN zysku (zysk z działalności operacyjnej wyniósł ponad 5.3 mln PLN).",
    "llmDefects": [
      "Zaokrąglenie kwoty zamiast podania precyzyjnej liczby księgowej (4 210 000,00 PLN)",
      "Mieszanie kategorii: zysk netto z zyskiem operacyjnym"
    ],
    "financialExposure": "Średnie ryzyko (nieprecyzyjność w audycie biegłego)",
    "financialExposureValue": "1 100 000,00 PLN (RZiS wiersz I [5 310 000 PLN] - wiersz L [4 210 000 PLN])",
    "financialExposureCfo": "Ryzyko zakwestionowania sprawozdania przez bank kredytujący lub audytora przy zniekształceniu linii bilansowej o 1,1 mln PLN.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 5 min audytu)",
    "agentTrace": {
      "llmDraft": "Zysk spółki to około 4.2 mln PLN (zysk operacyjny ponad 5.3 mln PLN).",
      "mcpIntercept": "tools/call: verify -> GROUNDED w 05_Rachunek_Zyskow_i_Strat_2024_PLN.md. Wymuszono dokładną liczbę 4 210 000,00 PLN z wiersza L.",
      "correctedOutput": "Zysk netto wynosi dokładnie 4 210 000,00 PLN (RZiS 2024, Pozycja L). Zysk z działalności operacyjnej (Pozycja F) to 5 310 000,00 PLN."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "W razie wątpliwości analityk osobiście otwiera plik RZiS i sprawdza pozycję L.",
      "riskAsymmetry": "Błąd typu II (Redline): 3 minuty wglądu do arkusza. Błąd typu I (LLM): wprowadzenie Zarządu w błąd co do struktury wyniku operacyjnego."
    },
    "riskLevel": "MEDIUM"
  },
  {
    "id": "P03",
    "split": "legacy",
    "expected": "GROUNDED",
    "claim": "Całkowity limit odpowiedzialności dostawcy jest ograniczony do 100% opłat uiszczonych w ostatnich 12 miesiącach.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 8.721042,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 7,
    "tier": 1,
    "quote": "11.2 **Aggregate Liability Cap:** Except for breaches of Section 10 (Confidentiality) or willful misconduct, Supplier's total aggregate liability arising out of or related to this Agreement, whether in contract, tort (including negligence), or otherwise, shall be strictly limited to **one hundred percent (100%) of the total fees actually paid by Customer to Supplier in the twelve (12) months immediately preceding the event giving rise to liability**.",
    "explanation": "Potwierdzone dosłownym fragmentem: 01_Apex_VeloNova_MSA_2023.md (sekcja 7, Tier 1); pokrycie pojęć 80%, liczby zgodne (100%, 12).",
    "prompt": "Całkowity limit odpowiedzialności dostawcy jest ograniczony do 100% opłat uiszczonych w ostatnich 12 miesiącach.",
    "category": "GROUNDED",
    "subtype": "Fragment umowy (limit odpowiedzialności)",
    "llmTitle": "Standard LLM: Zgoda z halucynacją klauzuli ogólnej",
    "llmResponse": "Tak, odpowiedzialność Apex Meridian jest standardowo ograniczona do 100% wynagrodzenia za ostatnie 12 miesięcy, co jest typową klauzulą w brytyjskim prawie umów handlowych.",
    "llmDefects": [
      "Pominięcie kluczowego wyłączenia: naruszenie poufności (Section 10) lub umyślne działanie",
      "Brak bezpośredniego odniesienia do Section 11.2 MSA"
    ],
    "financialExposure": "Średnie ryzyko (przeoczenie wyjątków od limitu)",
    "financialExposureValue": "£48,000.00 GBP (100% z rocznej opłaty abonamentowej £48 000 GBP z Sec 8.1 i 11.2 MSA)",
    "financialExposureCfo": "Przeoczenie wyłączeń z art. 10 (poufność / rażące niedbalstwo) mogłoby skłonić firmę do zaniechania uzasadnionych roszczeń odszkodowawczych.",
    "financialFailSafeCost": "~40 PLN (SZACUNEK: 5 min audytu)",
    "agentTrace": {
      "llmDraft": "Odpowiedzialność jest bezwzględnie ograniczona do 100% opłat za ostatnie 12 miesięcy.",
      "mcpIntercept": "tools/call: verify -> GROUNDED w 01_Apex_VeloNova_MSA_2023.md. Zwrócono pełne brzmienie Section 11.2 z wyjątkami poufności i winy umyślnej.",
      "correctedOutput": "Limit wynosi 100% opłat z ostatnich 12 miesięcy, Z WYŁĄCZENIEM naruszeń poufności (Sec 10) oraz winy umyślnej (Sec 11.2)."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Prawnik weryfikuje Section 11.2 i natychmiast zauważa pełną treść klauzuli liability cap.",
      "riskAsymmetry": "Błąd typu II (Redline): 5 minut analizy umowy. Błąd typu I (LLM): błędne przekonanie o braku możliwości dochodzenia strat przy wycieku danych."
    },
    "riskLevel": "MEDIUM"
  },
  {
    "id": "P04",
    "split": "legacy",
    "expected": "GROUNDED",
    "claim": "Faktura INV-2024-1108 za czwarty kwartał 2024 r. opiewa na kwotę £12,000.00 GBP netto płatną na rachunek Barclays Bank.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 10.306417,
    "file": "03_Invoice_INV-2024-1108.md",
    "page": 1,
    "tier": 1,
    "quote": "**Invoice Number: INV-2024-1108** […] | 01 | Apex Meridian Fleet Engine Platform — Enterprise Telematics Subscription (Tier 1: Up to 180 vehicles) | Q4 2024 (01.10.2024 – 31.12.2024) | 1 Quarter | £12,000.00 | £12,000.00 | 0% (Reverse Charge) | £0.00 | £12,000.00 | […] * **Bank Name:** Barclays Bank UK PLC",
    "explanation": "Potwierdzone 3 dosłownymi fragmentami: 03_Invoice_INV-2024-1108.md (sekcja 1, Tier 1); pokrycie 64%, liczby zgodne (2024, £12,000.00).",
    "prompt": "Faktura INV-2024-1108 za czwarty kwartał 2024 r. opiewa na kwotę £12,000.00 GBP netto płatną na rachunek Barclays Bank.",
    "category": "GROUNDED",
    "subtype": "Dane z wielu dokumentów (faktura kwartalna Q4)",
    "llmTitle": "Standard LLM: Potwierdzenie bez weryfikacji rachunku bankowego",
    "llmResponse": "Zgadza się, faktura INV-2024-1108 za IV kwartał 2024 roku opiewa na 12 000 funtów i została uregulowana przelewem na konto dostawcy w banku Barclays.",
    "llmDefects": [
      "Brak wskazania numeru konta IBAN i kodu SWIFT/BIC",
      "Brak weryfikacji zastosowania odwrotnego obciążenia VAT 0% (Reverse Charge)"
    ],
    "financialExposure": "Niskie ryzyko (dane zgodne)",
    "financialExposureValue": "£12,000.00 GBP (kwota netto z faktury INV-2024-1108)",
    "financialExposureCfo": "Ryzyko autoryzacji płatności bez twardej weryfikacji rachunku bankowego (ryzyko invoice fraud / man-in-the-middle).",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 5 min audytu)",
    "agentTrace": {
      "llmDraft": "Faktura opiewa na 12 000 GBP i została opłacona do Barclays Bank.",
      "mcpIntercept": "tools/call: verify -> GROUNDED w 03_Invoice_INV-2024-1108.md. Pobrano nienaruszone dane konta: IBAN GB33BARC20000012345678, VAT 0% Reverse Charge.",
      "correctedOutput": "Faktura INV-2024-1108: £12,000.00 GBP netto (VAT 0% Reverse Charge). Rachunek: Barclays Bank, IBAN: GB33BARC20000012345678, SWIFT: BARCGB22."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Dział finansowy konfrontuje IBAN z białym rejestrem lub oryginałem faktury.",
      "riskAsymmetry": "Błąd typu II (Redline): krótki telefon do księgowości. Błąd typu I (LLM): wysłanie przelewu zagranicznego bez weryfikacji rachunku docelowego."
    },
    "riskLevel": "LOW"
  },
  {
    "id": "P05",
    "split": "legacy",
    "expected": "CONTRADICTED",
    "claim": "Apex Meridian ma prawo do jednostronnego podniesienia cen o wskaźnik inflacji 7.5% UK CPI od stycznia 2025 r.",
    "verdict": "CONTRADICTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 6.685459,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 6,
    "tier": 1,
    "quote": "> *[NEGOTIATION RECORD NOTE: Initial draft clause permitting unilateral price indexing linked to UK CPI or Polish GUS inflation was deleted and rejected by Customer during contract execution.]*",
    "explanation": "Sprzeczne ze źródłem 01_Apex_VeloNova_MSA_2023.md (sekcja 6, Tier 1): polaryzacja: źródło zaprzecza/odrzuca (deleted, rejected). Zgodny fragment istnieje w 04_Email_Thread_Inflation_Dispute_Nov2024.md (Tier 3), ale źródło o wyższej lub równej randze mu przeczy.",
    "prompt": "Apex Meridian ma prawo do jednostronnego podniesienia cen o wskaźnik inflacji 7.5% UK CPI od stycznia 2025 r.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka CPI (jednostronna waloryzacja 7.5%)",
    "llmTitle": "Standard LLM: KATASTROFALNA HALUCYNACJA ZGODY NA WALORYZACJĘ",
    "llmResponse": "„Tak, w świetle korespondencji mailowej z listopada 2024 r. pomiędzy account managerem Apex a zarządem VeloNova, dostawca ma pełne prawo powołać się na Section 8.2 i naliczyć od stycznia 2025 r. 7.5% wskaźnika inflacji UK CPI. Jest to uzasadnione wzrostem kosztów hostingu i inflacją w Wielkiej Brytanii.”",
    "llmDefects": [
      "Odwrócenie hierarchii źródeł: potraktowanie maila handlowego (Tier 3) jako źródła prawa nadrzędnego nad umową (Tier 1)",
      "Wymyślenie rzekomej zgody: zignorowanie faktu, że Section 8.2 został w umowie WYKREŚLONY podczas negocjacji",
      "Pominięcie klauzuli nieważności: umowa stanowi, że jednostronne pisma są null and void ab initio"
    ],
    "financialExposure": "STRATA FINANSOWA: bezprawna podwyżka £3,600.00 GBP rocznie (7.5% z £48,000 z Section 8.1 MSA)",
    "financialExposureValue": "£3,600.00 GBP/rok (7.5% × £48 000 GBP z Sec 8.1 MSA) | £10,800.00 GBP (3 lata)",
    "financialExposureCfo": "Bezprawne uznanie 7.5% podwyżki (£3,600/rok z Section 8.1 MSA, co daje £10,800.00 GBP w 3-letnim okresie obowiązywania). Brak bramki weryfikacyjnej oznacza utratę pozycji procesowej w Londynie.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 5 min audytu)",
    "agentTrace": {
      "llmDraft": "Tak, zgodnie z mailem z 12 listopada dostawca ma prawo powołać się na Section 8.2 i naliczyć 7.5% UK CPI.",
      "mcpIntercept": "tools/call: verify -> UNSUPPORTED / CONTRADICTED. Bramka hierarchii (Precedence Gate): Section 8.2 MSA unieważnia jednostronne maile. Klauzula CPI została wykreślona!",
      "correctedOutput": "KATEGORYCZNA ODMOWA: Section 8.2 MSA wprost zakazuje jednostronnej waloryzacji cen. Zapis o inflacji został wykreślony. Pismo dostawcy jest z mocy prawa bezskuteczne (null and void ab initio)."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Nawet gdyby serwer miał wątpliwość wejściową, odmowa uruchamia 5-minutowy przegląd umowy przez radcę prawnego.",
      "riskAsymmetry": "Błąd typu II (Redline): 5 minut czasu prawnika (~30 PLN). Błąd typu I (LLM): katastrofalna zgoda na bezprawne podwyżki i strata dziesiątek tysięcy funtów."
    },
    "riskLevel": "CRITICAL"
  },
  {
    "id": "P06",
    "split": "legacy",
    "expected": "CONTRADICTED",
    "claim": "VeloNova Logistics nałożyła na dostawcę karę umowną w wysokości 50 000 EUR za awarię telematyki we Frankfurcie.",
    "verdict": "CONTRADICTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 4.343791,
    "file": "06_Protokol_Zarzadu_VeloNova_11_2024.md",
    "page": 4,
    "tier": 1,
    "quote": "Zarząd **jednogłośnie odrzucił propozycję nałożenia kary umownej 50 000 EUR**.",
    "explanation": "Sprzeczne ze źródłem 06_Protokol_Zarzadu_VeloNova_11_2024.md (sekcja 4, Tier 1): polaryzacja: źródło zaprzecza/odrzuca (odrzucił).",
    "prompt": "VeloNova Logistics nałożyła na dostawcę karę umowną w wysokości 50 000 EUR za awarię telematyki we Frankfurcie.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka operacyjna (kara umowna 50 000 EUR)",
    "llmTitle": "Standard LLM: HALUCYNACJA O NALEŻNOŚCI KARY UMOWNEJ 50 000 EUR",
    "llmResponse": "„Tak, w związku z 4-godzinną awarią telematyki we Frankfurcie w listopadzie 2024 r., VeloNova Logistics skutecznie nałożyła na dostawcę karę umowną w kwocie 50 000 EUR zgodnie z wnioskiem Dyrektora Operacyjnego za straty wizerunkowe.”",
    "llmDefects": [
      "Fatalne mylenie wniosku z decyzją: Zarząd jednogłośnie ODRZUCIŁ propozycję nałożenia kary 50k EUR",
      "Zignorowanie zakazu kontraktowego: Section 11.3 MSA wprost wyłącza kary umowne (liquidated damages barred)",
      "Pominięcie faktu, że jedyną dopuszczalną rekompensatą był Service Credit £600 GBP"
    ],
    "financialExposure": "POWAŻNE RYZYKO PROCESOWE: bezpodstawna nota obciążeniowa na 50 000 EUR naraża spółkę na natychmiastowy proces i koszty w sądzie w Londynie",
    "financialExposureValue": "50 000.00 EUR (odrzucona w Protokole Zarządu propozycja kary umownej)",
    "financialExposureCfo": "Wystawienie bezpodstawnej noty obciążeniowej na 50 000 EUR (odrzuconej przez Zarząd) skutkuje procesem przed sądem angielskim i koniecznością pokrycia kosztów prawnych.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 5 min audytu)",
    "agentTrace": {
      "llmDraft": "Tak, VeloNova skutecznie nałożyła karę umowną 50 000 EUR za awarię we Frankfurcie.",
      "mcpIntercept": "tools/call: verify -> UNSUPPORTED. Protokół Zarządu 11/2024: Zarząd jednogłośnie odrzucił wniosek o karę 50k EUR. Section 11.3 MSA wyłącza liquidated damages.",
      "correctedOutput": "FAŁSZ: Zarząd jednogłośnie odrzucił wniosek o karę 50 000 EUR (Protokół 11/2024). Umowa MSA zakazuje kar umownych; przysługuje wyłącznie rabat £600 GBP Service Credit."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Odmowa serwera zapobiega wysłaniu błędnej noty obciążeniowej i kieruje sprawę do radcy prawnego.",
      "riskAsymmetry": "Błąd typu II (Redline): 5 minut na wgląd w protokół zarządu. Błąd typu I (LLM): natychmiastowy spór międzynarodowy i odpis 215 000 PLN."
    },
    "riskLevel": "CRITICAL"
  },
  {
    "id": "P07",
    "split": "legacy",
    "expected": "CONTRADICTED",
    "claim": "W 2024 r. podpisano aneks rozszerzający licencję telematyczną na 300 pojazdów o wartości 95 000 EUR.",
    "verdict": "CONTRADICTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 5.73975,
    "file": "03_Invoice_INV-2024-1108.md",
    "page": 1,
    "tier": 1,
    "quote": "| 01 | Apex Meridian Fleet Engine Platform — Enterprise Telematics Subscription (Tier 1: Up to 180 vehicles) | Q4 2024 (01.10.2024 – 31.12.2024) | 1 Quarter | £12,000.00 | £12,000.00 | 0% (Reverse Charge) | £0.00 | £12,000.00 |",
    "explanation": "Sprzeczne ze źródłem 03_Invoice_INV-2024-1108.md (sekcja 1, Tier 1): wartość: twierdzenie 300, źródło 180; wartość: twierdzenie 95 000 EUR, źródło £12,000.00 / £12,000.00 / £0.00 / £12,000.00.",
    "prompt": "W 2024 r. podpisano aneks rozszerzający licencję telematyczną na 300 pojazdów o wartości 95 000 EUR.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka rozszerzenia floty (aneks 300 aut 95k EUR)",
    "llmTitle": "Standard LLM: HALUCYNACJA ROZSZERZENIA KONTRAKTU (ANEKS NA 300 AUT)",
    "llmResponse": "„Tak, we wrześniu 2024 roku strony podpisały aneks rozszerzający flotę objętą telematyką z 180 do 300 pojazdów o wartości 95 000 EUR, co zostało odnotowane w dokumentacji CRM spółki.”",
    "llmDefects": [
      "Halucynacja statusu: oferta OPP-2024-089 w CRM posiadała status „STALLED / REJECTED” i została odrzucona przez Zarząd",
      "Aneks nigdy nie został zawarty — nadal obowiązuje bazowy limit 180 pojazdów",
      "Model traktuje szansę sprzedażową z CRM jako wiążący aneks prawny"
    ],
    "financialExposure": "BŁĄD ZARZĄDCZY: fałszywe poczucie posiadania licencji na 300 aut grozi naruszeniem licencji i roszczeniami o 95 000 EUR",
    "financialExposureValue": "95 000.00 EUR (wartość szansy OPP-2024-089 w CRM Export)",
    "financialExposureCfo": "Wprowadzenie fikcyjnego aneksu do planu operacyjnego grozi bezprawnym użyciem oprogramowania na 120 dodatkowych autach i roszczeniem dostawcy o 95 000 EUR.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 5 min audytu)",
    "agentTrace": {
      "llmDraft": "Tak, we wrześniu 2024 r. podpisano aneks rozszerzający licencję do 300 pojazdów za 95 000 EUR.",
      "mcpIntercept": "tools/call: verify -> UNSUPPORTED. Eksport CRM: rekord OPP-2024-089 posiada status STALLED / REJECTED. Aneks nie istnieje w obrocie prawnym.",
      "correctedOutput": "FAŁSZ: Aneks nie został podpisany. Szansa OPP-2024-089 w CRM została formalnie odrzucona (STALLED / REJECTED). Obowiązuje limit 180 aut."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Zarząd weryfikuje status w Salesforce przed podpisaniem leasingu na kolejne naczepy.",
      "riskAsymmetry": "Błąd typu II (Redline): 2 minuty na sprawdzenie CRM. Błąd typu I (LLM): rozszerzenie floty bez ochrony licencyjnej za 410 000 PLN."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "P08",
    "split": "legacy",
    "expected": "CONTRADICTED",
    "claim": "Wszystkie dane telemetryczne i lokalizacyjne floty są przetwarzane wyłącznie na terenie Niemiec we Frankfurcie.",
    "verdict": "UNSUPPORTED",
    "correct": false,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 6.29775,
    "file": null,
    "page": null,
    "tier": null,
    "quote": null,
    "explanation": "Brak wystarczającego oparcia. Najbliższy fragment (02_Schedule_B_Service_Levels_and_Credits.md, sekcja 4) nie rozstrzyga: za niskie pokrycie pojęć (43%, brakuje: lokalizacyjne); niezgodna polaryzacja.",
    "prompt": "Wszystkie dane telemetryczne i lokalizacyjne floty są przetwarzane wyłącznie na terenie Niemiec we Frankfurcie.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka Data Residency (serwery w Niemczech)",
    "llmTitle": "Standard LLM: HALUCYNACJA DATA RESIDENCY WE FRANKFURCIE",
    "llmResponse": "„Zgadza się, wszystkie dane geolokalizacyjne i telemetryczne pojazdów VeloNova Logistics są bezpiecznie przetwarzane i przechowywane w centrum danych we Frankfurcie nad Menem w Niemczech, gwarantując zgodność z RODO.”",
    "llmDefects": [
      "Wprost zaprzeczenie prawdzie kontraktowej: Schedule B Section 3.2 wyraźnie stwierdza, że dostawca NIE posiada serwerów w Niemczech",
      "Faktyczne lokalizacje to AWS Dublin (przetwarzanie bieżące) i AWS Londyn (archiwum DR)",
      "Fałszywe zapewnienie o residency prowadzi do naruszenia procedur compliance CISO"
    ],
    "financialExposure": "AUDYT CISO / KARY RODO: złożenie fałszywego oświadczenia audytorom o lokalizacji przetwarzania danych w Niemczech",
    "financialExposureValue": "Brak kwoty w umowie (ryzyko regulacyjne CISO / zerwanie kontraktu)",
    "financialExposureCfo": "Złożenie fałszywego oświadczenia klientom farmaceutycznym (BigPharma) o hostingu w Niemczech grozi zerwaniem kontraktów frachtowych.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 5 min audytu)",
    "agentTrace": {
      "llmDraft": "Tak, dane telemetryczne są przetwarzane wyłącznie w centrum danych we Frankfurcie nad Menem.",
      "mcpIntercept": "tools/call: verify -> UNSUPPORTED. Schedule B Section 3.2: dostawca wprost oświadcza, że NIE posiada serwerów w Niemczech (AWS Dublin i London).",
      "correctedOutput": "SPRZECZNOŚĆ Z UMOWĄ: Dane nie są przetwarzane w Niemczech. Schedule B Section 3.2 wskazuje AWS Dublin (bieżące) oraz AWS Londyn (archiwum)."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Oficer CISO weryfikuje załącznik bezpieczeństwa Schedule B.",
      "riskAsymmetry": "Błąd typu II (Redline): 5 minut analizy topologii AWS. Błąd typu I (LLM): poświadczenie nieprawdy w audycie ISO/RODO skutkujące zerwaniem umów z klientami pharma."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "P09",
    "split": "legacy",
    "expected": "CONTRADICTED",
    "claim": "Roczny koszt usług telematycznych floty dla VeloNova wynosi 48 000,00 EUR.",
    "verdict": "CONTRADICTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 3.583625,
    "file": "03_Invoice_INV-2024-1108.md",
    "page": 1,
    "tier": 1,
    "quote": "| 01 | Apex Meridian Fleet Engine Platform — Enterprise Telematics Subscription (Tier 1: Up to 180 vehicles) | Q4 2024 (01.10.2024 – 31.12.2024) | 1 Quarter | £12,000.00 | £12,000.00 | 0% (Reverse Charge) | £0.00 | £12,000.00 |",
    "explanation": "Sprzeczne ze źródłem 03_Invoice_INV-2024-1108.md (sekcja 1, Tier 1): wartość: twierdzenie 48 000,00 EUR, źródło £12,000.00 / £12,000.00 / £0.00 / £12,000.00.",
    "prompt": "Roczny koszt usług telematycznych floty dla VeloNova wynosi 48 000,00 EUR.",
    "category": "UNSUPPORTED",
    "subtype": "Błąd walutowy (48 000 EUR zamiast GBP)",
    "llmTitle": "Standard LLM: PODSTĘPNY BŁĄD WALUTOWY (EUR ZAMIAST GBP)",
    "llmResponse": "„Tak, roczny koszt platformy telematycznej dla floty wynosi 48 000 EUR, płatne w czterech równych ratach kwartalnych.”",
    "llmDefects": [
      "Mylenie walut: kontrakt opiewa na £48,000 GBP, a nie 48 000 EUR",
      "Brak weryfikacji waluty bazowej w umowie ramowej Section 3.1 i fakturach",
      "Akceptacja błędnej waluty zaburza kalkulację różnic kursowych"
    ],
    "financialExposure": "RYZYKO FINANSOWE: różnica walutowa GBP vs EUR przy kwocie 48 000",
    "financialExposureValue": "38 400 PLN (różnica walutowa: umowa opiewa na £48 000 GBP z Sec 8.1 MSA, a nie 48 000 EUR)",
    "financialExposureCfo": "Mylenie walut rozliczeniowych EUR/GBP powoduje deficyt na rachunku walutowym i błędne zabezpieczenie ryzyka walutowego (FX hedging).",
    "financialFailSafeCost": "~20 PLN (SZACUNEK: 2 min audytu)",
    "agentTrace": {
      "llmDraft": "Tak, roczny koszt platformy wynosi 48 000 EUR w ratach kwartalnych.",
      "mcpIntercept": "tools/call: verify -> UNSUPPORTED. Weryfikator walut wykrył brak dopasowania: Section 3.1 MSA określa £48,000.00 GBP, a nie EUR.",
      "correctedOutput": "BŁĄD WALUTOWY: Umowa opiewa na £48,000.00 GBP (funtów brytyjskich), a nie EUR. Faktury wystawiane są w funtach po £12,000.00 GBP kwartalnie."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Księgowa sprawdza walutę na fakturze w 30 sekund.",
      "riskAsymmetry": "Błąd typu II (Redline): 30 sekund na wgląd w nagłówek faktury. Błąd typu I (LLM): brakujące środki w walucie kontraktowej przy realizacji przelewu."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "P10",
    "split": "legacy",
    "expected": "CONTRADICTED",
    "claim": "Z tytułu awarii bramki we Frankfurcie dostawca przyznał VeloNova rabat Service Credit w wysokości 50 000,00 EUR.",
    "verdict": "CONTRADICTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 4.531375,
    "file": "06_Protokol_Zarzadu_VeloNova_11_2024.md",
    "page": 4,
    "tier": 1,
    "quote": "Zobowiązano Dział Prawny do formalnego wystąpienia do Apex Meridian o przyznanie Service Credit w wysokości **£600.00 GBP** przy rozliczeniu faktury za I kwartał 2025 r.",
    "explanation": "Sprzeczne ze źródłem 06_Protokol_Zarzadu_VeloNova_11_2024.md (sekcja 4, Tier 1): wartość: twierdzenie 50 000,00 EUR, źródło £600.00.",
    "prompt": "Z tytułu awarii bramki we Frankfurcie dostawca przyznał VeloNova rabat Service Credit w wysokości 50 000,00 EUR.",
    "category": "UNSUPPORTED",
    "subtype": "Pomieszanie rabatu Service Credit z karą 50k EUR",
    "llmTitle": "Standard LLM: POMIESZANIE RABATU SERVICE CREDIT Z KARĄ 50K EUR",
    "llmResponse": "„Tak, w ramach rekompensaty za zakłócenia w transporcie chłodniczym dostawca przyznał rabat w wysokości 50 000 EUR w formule Service Credit.”",
    "llmDefects": [
      "Połączenie odrzuconego wniosku dyrektora (50 000 EUR) z formułą rabatu Service Credit",
      "Rzeczywisty rabat zatwierdzony przez zarząd to £600.00 GBP (5% z £12,000 opłaty kwartalnej)",
      "Model wygenerował fikcyjną 83-krotnie zawyżoną kwotę rabatu"
    ],
    "financialExposure": "BŁĄD KSIĘGOWY: oczekiwanie 50 000 EUR rabatu zamiast £600 GBP zniekształca cashflow spółki",
    "financialExposureValue": "5 000.00 EUR (nieuzasadnione roszczenie) vs £600.00 GBP (5% × £12 000 GBP z Sched B Sec 4.1)",
    "financialExposureCfo": "Fikcyjne potrącenie z faktury dostawcy grozi natychmiastowym odcięciem telematyki dla 180 pojazdów z powodu zaległości płatniczej.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 5 min audytu)",
    "agentTrace": {
      "llmDraft": "Tak, dostawca przyznał rabat Service Credit w wysokości 50 000 EUR.",
      "mcpIntercept": "tools/call: verify -> UNSUPPORTED. Mieszanie pojęć: faktyczny Service Credit to £600 GBP (Schedule B). 50k EUR to odrzucona propozycja kary.",
      "correctedOutput": "FAŁSZ: Rabat Service Credit wyniósł £600.00 GBP (5% z opłaty kwartalnej). Kwota 50 000 EUR dotyczyła odrzuconej propozycji kary."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Dział finansowy konfrontuje kwotę rabatu z uchwałą zarządu i Schedule B.",
      "riskAsymmetry": "Błąd typu II (Redline): 3 minuty wglądu w arkusz rozliczeń. Błąd typu I (LLM): wstrzymanie zapłaty faktury i odcięcie monitoringu temperatury chłodni farmaceutycznych."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D01",
    "split": "dev",
    "expected": "GROUNDED",
    "claim": "The Master Services Agreement was entered into on 15 January 2023.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 3.7545,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 1,
    "tier": 1,
    "quote": "This Master Services Agreement (\"Agreement\") is entered into on the **15th day of January, 2023** (the \"Effective Date\"), by and between:",
    "explanation": "Potwierdzone dosłownym fragmentem: 01_Apex_VeloNova_MSA_2023.md (sekcja 1, Tier 1); pokrycie pojęć 100%, liczby zgodne (15, 2023). Uwaga: źródło o niższej randze (04_Email_Thread_Inflation_Dispute_Nov2024.md, Tier 3) twierdzi inaczej.",
    "prompt": "The Master Services Agreement was entered into on 15 January 2023.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"The Master Services Agreement was entered into on 15 January 2023.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "Brak bezpośredniej kwoty (0 PLN)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"The Master Services Agreement was entered into on 15 January 2023.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (01_Apex_VeloNova_MSA_2023.md).",
      "correctedOutput": "This Master Services Agreement (\"Agreement\") is entered into on the **15th day of January, 2023** (the \"Effective Date\"), by and between:"
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D02",
    "split": "dev",
    "expected": "GROUNDED",
    "claim": "Roczna opłata abonamentowa wynosi £48,000.00 GBP netto.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 2.892,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 5,
    "tier": 1,
    "quote": "3.1 **Annual Subscription Fee:** Customer shall pay Supplier an annual base platform fee of **£48,000.00 GBP (forty-eight thousand British Pounds Sterling) net**, exclusive of applicable Value Added Tax.",
    "explanation": "Potwierdzone dosłownym fragmentem: 01_Apex_VeloNova_MSA_2023.md (sekcja 5, Tier 1); pokrycie pojęć 100%, liczby zgodne (£48,000.00). Uwaga: źródło o niższej randze (04_Email_Thread_Inflation_Dispute_Nov2024.md, Tier 3) twierdzi inaczej.",
    "prompt": "Roczna opłata abonamentowa wynosi £48,000.00 GBP netto.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Roczna opłata abonamentowa wynosi £48,000.00 GBP netto.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "£48,000.00 GBP (kwota wskazana w badanym twierdzeniu)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Roczna opłata abonamentowa wynosi £48,000.00 GBP netto.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (01_Apex_VeloNova_MSA_2023.md).",
      "correctedOutput": "3.1 **Annual Subscription Fee:** Customer shall pay Supplier an annual base platform fee of **£48,000.00 GBP (forty-eight thousand British Pounds Sterling) net**, exclusive of applicable Value Added Tax."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D03",
    "split": "dev",
    "expected": "GROUNDED",
    "claim": "Opłata jest fakturowana kwartalnie w czterech ratach po £12,000.00 GBP.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 3.536125,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 5,
    "tier": 1,
    "quote": "3.2 **Invoicing Schedule:** The Annual Subscription Fee shall be billed quarterly in advance in four (4) equal installments of **£12,000.00 GBP net** on the first business day of January, April, July, and October.",
    "explanation": "Potwierdzone dosłownym fragmentem: 01_Apex_VeloNova_MSA_2023.md (sekcja 5, Tier 1); pokrycie pojęć 66%, liczby zgodne (£12,000.00). Uwaga: źródło o niższej randze (04_Email_Thread_Inflation_Dispute_Nov2024.md, Tier 3) twierdzi inaczej.",
    "prompt": "Opłata jest fakturowana kwartalnie w czterech ratach po £12,000.00 GBP.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Opłata jest fakturowana kwartalnie w czterech ratach po £12,000.00 GBP.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "£12,000.00 GBP (kwota wskazana w badanym twierdzeniu)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Opłata jest fakturowana kwartalnie w czterech ratach po £12,000.00 GBP.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (01_Apex_VeloNova_MSA_2023.md).",
      "correctedOutput": "3.2 **Invoicing Schedule:** The Annual Subscription Fee shall be billed quarterly in advance in four (4) equal installments of **£12,000.00 GBP net** on the first business day of January, April, July, and October."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D04",
    "split": "dev",
    "expected": "GROUNDED",
    "claim": "Umowa obowiązuje przez 36 miesięcy i kończy się 14 stycznia 2026 r.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 4.774417,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 4,
    "tier": 1,
    "quote": "2.1 **Initial Term:** This Agreement commences on the Effective Date (15 January 2023) and shall remain in full force and effect for an initial term of **thirty-six (36) months** ending on 14 January 2026, unless terminated earlier in accordance with Section 12.",
    "explanation": "Potwierdzone dosłownym fragmentem: 01_Apex_VeloNova_MSA_2023.md (sekcja 4, Tier 1); pokrycie pojęć 100%, liczby zgodne (36, 14, 2026). Uwaga: źródło o niższej randze (04_Email_Thread_Inflation_Dispute_Nov2024.md, Tier 3) twierdzi inaczej.",
    "prompt": "Umowa obowiązuje przez 36 miesięcy i kończy się 14 stycznia 2026 r.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Umowa obowiązuje przez 36 miesięcy i kończy się 14 stycznia 2026 r.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "Brak bezpośredniej kwoty (0 PLN)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Umowa obowiązuje przez 36 miesięcy i kończy się 14 stycznia 2026 r.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (01_Apex_VeloNova_MSA_2023.md).",
      "correctedOutput": "2.1 **Initial Term:** This Agreement commences on the Effective Date (15 January 2023) and shall remain in full force and effect for an initial term of **thirty-six (36) months** ending on 14 January 2026, unless terminated earlier in accordance with Section 12."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D05",
    "split": "dev",
    "expected": "GROUNDED",
    "claim": "Automatic rollover renewal is excluded.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 2.305833,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 4,
    "tier": 1,
    "quote": "Automatic rollover renewal is explicitly excluded.",
    "explanation": "Potwierdzone dosłownym fragmentem: 01_Apex_VeloNova_MSA_2023.md (sekcja 4, Tier 1); pokrycie pojęć 100%.",
    "prompt": "Automatic rollover renewal is excluded.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Automatic rollover renewal is excluded.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "Brak bezpośredniej kwoty (0 PLN)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Automatic rollover renewal is excluded.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (01_Apex_VeloNova_MSA_2023.md).",
      "correctedOutput": "Automatic rollover renewal is explicitly excluded."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D06",
    "split": "dev",
    "expected": "GROUNDED",
    "claim": "Umowa podlega prawu Anglii i Walii.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 3.827,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 8,
    "tier": 1,
    "quote": "14.1 This Agreement, and any dispute or claim arising out of or in connection with it or its subject matter or formation (including non-contractual disputes or claims), shall be governed by and construed in accordance with the **laws of England and Wales**.",
    "explanation": "Potwierdzone dosłownym fragmentem: 01_Apex_VeloNova_MSA_2023.md (sekcja 8, Tier 1); pokrycie pojęć 100%.",
    "prompt": "Umowa podlega prawu Anglii i Walii.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Umowa podlega prawu Anglii i Walii.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "Brak bezpośredniej kwoty (0 PLN)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Umowa podlega prawu Anglii i Walii.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (01_Apex_VeloNova_MSA_2023.md).",
      "correctedOutput": "14.1 This Agreement, and any dispute or claim arising out of or in connection with it or its subject matter or formation (including non-contractual disputes or claims), shall be governed by and construed in accordance with the **laws of England and Wales**."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D07",
    "split": "dev",
    "expected": "GROUNDED",
    "claim": "Gwarantowana miesięczna dostępność usługi wynosi 99.8%.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 2.877375,
    "file": "02_Schedule_B_Service_Levels_and_Credits.md",
    "page": 2,
    "tier": 1,
    "quote": "1.2 **Availability Target:** Supplier guarantees that the Services shall maintain a Monthly Uptime Percentage of not less than **99.8% (ninety-nine point eight percent)** during each calendar month of the Term.",
    "explanation": "Potwierdzone dosłownym fragmentem: 02_Schedule_B_Service_Levels_and_Credits.md (sekcja 2, Tier 1); pokrycie pojęć 100%, liczby zgodne (99.8%).",
    "prompt": "Gwarantowana miesięczna dostępność usługi wynosi 99.8%.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Gwarantowana miesięczna dostępność usługi wynosi 99.8%.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "Brak bezpośredniej kwoty (0 PLN)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Gwarantowana miesięczna dostępność usługi wynosi 99.8%.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (02_Schedule_B_Service_Levels_and_Credits.md).",
      "correctedOutput": "1.2 **Availability Target:** Supplier guarantees that the Services shall maintain a Monthly Uptime Percentage of not less than **99.8% (ninety-nine point eight percent)** during each calendar month of the Term."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D08",
    "split": "dev",
    "expected": "GROUNDED",
    "claim": "Apex nie utrzymuje klastrów obliczeniowych w Niemczech.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 3.631708,
    "file": "02_Schedule_B_Service_Levels_and_Credits.md",
    "page": 4,
    "tier": 1,
    "quote": "Supplier does not maintain dedicated compute or storage clusters in the Federal Republic of Germany (Frankfurt).",
    "explanation": "Potwierdzone dosłownym fragmentem: 02_Schedule_B_Service_Levels_and_Credits.md (sekcja 4, Tier 1); pokrycie pojęć 64%.",
    "prompt": "Apex nie utrzymuje klastrów obliczeniowych w Niemczech.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Apex nie utrzymuje klastrów obliczeniowych w Niemczech.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "Brak bezpośredniej kwoty (0 PLN)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Apex nie utrzymuje klastrów obliczeniowych w Niemczech.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (02_Schedule_B_Service_Levels_and_Credits.md).",
      "correctedOutput": "Supplier does not maintain dedicated compute or storage clusters in the Federal Republic of Germany (Frankfurt)."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D09",
    "split": "dev",
    "expected": "GROUNDED",
    "claim": "Neither party may unilaterally adjust subscription fees.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 3.311625,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 6,
    "tier": 1,
    "quote": "> Neither Party shall have the right to unilaterally adjust subscription fees, rates, or surcharges.",
    "explanation": "Potwierdzone dosłownym fragmentem: 01_Apex_VeloNova_MSA_2023.md (sekcja 6, Tier 1); pokrycie pojęć 100%. Uwaga: źródło o niższej randze (04_Email_Thread_Inflation_Dispute_Nov2024.md, Tier 3) twierdzi inaczej.",
    "prompt": "Neither party may unilaterally adjust subscription fees.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Neither party may unilaterally adjust subscription fees.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "Brak bezpośredniej kwoty (0 PLN)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Neither party may unilaterally adjust subscription fees.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (01_Apex_VeloNova_MSA_2023.md).",
      "correctedOutput": "> Neither Party shall have the right to unilaterally adjust subscription fees, rates, or surcharges."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D10",
    "split": "dev",
    "expected": "GROUNDED",
    "claim": "Dostawca nie ma prawa jednostronnie podnieść cen.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 3.575917,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 6,
    "tier": 1,
    "quote": "> Neither Party shall have the right to unilaterally adjust subscription fees, rates, or surcharges.",
    "explanation": "Potwierdzone dosłownym fragmentem: 01_Apex_VeloNova_MSA_2023.md (sekcja 6, Tier 1); pokrycie pojęć 100%. Uwaga: źródło o niższej randze (04_Email_Thread_Inflation_Dispute_Nov2024.md, Tier 3) twierdzi inaczej.",
    "prompt": "Dostawca nie ma prawa jednostronnie podnieść cen.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Dostawca nie ma prawa jednostronnie podnieść cen.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "Brak bezpośredniej kwoty (0 PLN)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Dostawca nie ma prawa jednostronnie podnieść cen.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (01_Apex_VeloNova_MSA_2023.md).",
      "correctedOutput": "> Neither Party shall have the right to unilaterally adjust subscription fees, rates, or surcharges."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D11",
    "split": "dev",
    "expected": "GROUNDED",
    "claim": "Zarząd jednogłośnie odrzucił propozycję kary umownej 50 000 EUR.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 3.431542,
    "file": "06_Protokol_Zarzadu_VeloNova_11_2024.md",
    "page": 4,
    "tier": 1,
    "quote": "Zarząd **jednogłośnie odrzucił propozycję nałożenia kary umownej 50 000 EUR**.",
    "explanation": "Potwierdzone dosłownym fragmentem: 06_Protokol_Zarzadu_VeloNova_11_2024.md (sekcja 4, Tier 1); pokrycie pojęć 100%, liczby zgodne (50 000).",
    "prompt": "Zarząd jednogłośnie odrzucił propozycję kary umownej 50 000 EUR.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Zarząd jednogłośnie odrzucił propozycję kary umownej 50 000 EUR.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "50 000 EUR (kwota wskazana w badanym twierdzeniu)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Zarząd jednogłośnie odrzucił propozycję kary umownej 50 000 EUR.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (06_Protokol_Zarzadu_VeloNova_11_2024.md).",
      "correctedOutput": "Zarząd **jednogłośnie odrzucił propozycję nałożenia kary umownej 50 000 EUR**."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D12",
    "split": "dev",
    "expected": "GROUNDED",
    "claim": "Service Credit za awarię z listopada 2024 wyniósł £600.00 GBP.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 3.03,
    "file": "06_Protokol_Zarzadu_VeloNova_11_2024.md",
    "page": 4,
    "tier": 1,
    "quote": "Zobowiązano Dział Prawny do formalnego wystąpienia do Apex Meridian o przyznanie Service Credit w wysokości **£600.00 GBP** przy rozliczeniu faktury za I kwartał 2025 r.",
    "explanation": "Potwierdzone dosłownym fragmentem: 06_Protokol_Zarzadu_VeloNova_11_2024.md (sekcja 4, Tier 1); pokrycie pojęć 44%, liczby zgodne (2024, £600.00).",
    "prompt": "Service Credit za awarię z listopada 2024 wyniósł £600.00 GBP.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Service Credit za awarię z listopada 2024 wyniósł £600.00 GBP.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "£600.00 GBP (kwota wskazana w badanym twierdzeniu)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Service Credit za awarię z listopada 2024 wyniósł £600.00 GBP.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (06_Protokol_Zarzadu_VeloNova_11_2024.md).",
      "correctedOutput": "Zobowiązano Dział Prawny do formalnego wystąpienia do Apex Meridian o przyznanie Service Credit w wysokości **£600.00 GBP** przy rozliczeniu faktury za I kwartał 2025 r."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D13",
    "split": "dev",
    "expected": "GROUNDED",
    "claim": "Aneks rozszerzający flotę do 300 pojazdów nigdy nie został podpisany.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 3.893125,
    "file": "07_CRM_Export_Enterprise_Contracts_2024.md",
    "page": 3,
    "tier": 2,
    "quote": "| **OPP-2024-089** | **Apex Meridian Technologies Ltd** | **Fleet Expansion to 300 vehicles (Annex 2 Proposal)** | **95 000,00** | **EUR** | 18.09.2024 | Closed Lost / Abandoned | **STALLED / REJECTED** | **Oferta rozszerzenia odrzucona przez Zarząd w Q3 2024.** Dostawca żądał rozliczenia w EUR po niekorzystnym kursie i próbował narzucić klauzulę CPI. Aneks nigdy nie został podpisany. Obowiązuje wyłącznie pierwotny limit 180 pojazdów. |",
    "explanation": "Potwierdzone dosłownym fragmentem: 07_CRM_Export_Enterprise_Contracts_2024.md (sekcja 3, Tier 2); pokrycie pojęć 100%, liczby zgodne (300).",
    "prompt": "Aneks rozszerzający flotę do 300 pojazdów nigdy nie został podpisany.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Aneks rozszerzający flotę do 300 pojazdów nigdy nie został podpisany.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "Brak bezpośredniej kwoty (0 PLN)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Aneks rozszerzający flotę do 300 pojazdów nigdy nie został podpisany.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (07_CRM_Export_Enterprise_Contracts_2024.md).",
      "correctedOutput": "| **OPP-2024-089** | **Apex Meridian Technologies Ltd** | **Fleet Expansion to 300 vehicles (Annex 2 Proposal)** | **95 000,00** | **EUR** | 18.09.2024 | Closed Lost / Abandoned | **STALLED / REJECTED** | **Oferta rozszerzenia odrzucona przez Zarząd w Q3 2024.** Dostawca żądał rozliczenia w EUR po niekorzystnym kursie i próbował narzucić klauzulę CPI. Aneks nigdy nie został podpisany. Obowiązuje wyłącznie pierwotny limit 180 pojazdów. |"
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D14",
    "split": "dev",
    "expected": "GROUNDED",
    "claim": "Przychody netto ze sprzedaży w 2024 wyniosły 48 520 000 PLN.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 2.012333,
    "file": "05_Rachunek_Zyskow_i_Strat_2024_PLN.md",
    "page": 1,
    "tier": 1,
    "quote": "| **A.** | **Przychody netto ze sprzedaży i zrównane z nimi** | **48 520 000,00** | **41 200 000,00** |",
    "explanation": "Potwierdzone dosłownym fragmentem: 05_Rachunek_Zyskow_i_Strat_2024_PLN.md (sekcja 1, Tier 1); pokrycie pojęć 100%, liczby zgodne (2024, 48 520 000). Uwaga: źródło o niższej randze (07_CRM_Export_Enterprise_Contracts_2024.md, Tier 2) twierdzi inaczej.",
    "prompt": "Przychody netto ze sprzedaży w 2024 wyniosły 48 520 000 PLN.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Przychody netto ze sprzedaży w 2024 wyniosły 48 520 000 PLN.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "48 520 000 PLN (kwota wskazana w badanym twierdzeniu)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Przychody netto ze sprzedaży w 2024 wyniosły 48 520 000 PLN.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (05_Rachunek_Zyskow_i_Strat_2024_PLN.md).",
      "correctedOutput": "| **A.** | **Przychody netto ze sprzedaży i zrównane z nimi** | **48 520 000,00** | **41 200 000,00** |"
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D15",
    "split": "dev",
    "expected": "GROUNDED",
    "claim": "Faktura INV-2024-1108 ma termin płatności 01 listopada 2024.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 4.433458,
    "file": "03_Invoice_INV-2024-1108.md",
    "page": 1,
    "tier": 1,
    "quote": "* **Due Date:** 01 November 2024",
    "explanation": "Potwierdzone dosłownym fragmentem: 03_Invoice_INV-2024-1108.md (sekcja 1, Tier 1); pokrycie pojęć 72%, liczby zgodne (01, 2024).",
    "prompt": "Faktura INV-2024-1108 ma termin płatności 01 listopada 2024.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Faktura INV-2024-1108 ma termin płatności 01 listopada 2024.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "Brak bezpośredniej kwoty (0 PLN)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Faktura INV-2024-1108 ma termin płatności 01 listopada 2024.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (03_Invoice_INV-2024-1108.md).",
      "correctedOutput": "* **Due Date:** 01 November 2024"
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D16",
    "split": "dev",
    "expected": "GROUNDED",
    "claim": "Maksymalny Service Credit w kwartale to £1,800.00 GBP.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 2.315042,
    "file": "02_Schedule_B_Service_Levels_and_Credits.md",
    "page": 3,
    "tier": 1,
    "quote": "* Total Service Credits in any single calendar quarter shall not exceed 15% of the quarterly fee payable for that quarter (i.e. £1,800.00 GBP maximum).",
    "explanation": "Potwierdzone dosłownym fragmentem: 02_Schedule_B_Service_Levels_and_Credits.md (sekcja 3, Tier 1); pokrycie pojęć 100%, liczby zgodne (£1,800.00).",
    "prompt": "Maksymalny Service Credit w kwartale to £1,800.00 GBP.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Maksymalny Service Credit w kwartale to £1,800.00 GBP.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "£1,800.00 GBP (kwota wskazana w badanym twierdzeniu)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Maksymalny Service Credit w kwartale to £1,800.00 GBP.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (02_Schedule_B_Service_Levels_and_Credits.md).",
      "correctedOutput": "* Total Service Credits in any single calendar quarter shall not exceed 15% of the quarterly fee payable for that quarter (i.e. £1,800.00 GBP maximum)."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D17",
    "split": "dev",
    "expected": "GROUNDED",
    "claim": "Licencja obejmuje do 180 pojazdów.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 2.695334,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 3,
    "tier": 1,
    "quote": "1.1 Supplier grants to Customer a non-exclusive, non-transferable subscription license to access and use the Apex Meridian Fleet Engine for up to 180 commercial fleet vehicles operated by Customer across the European Union.",
    "explanation": "Potwierdzone dosłownym fragmentem: 01_Apex_VeloNova_MSA_2023.md (sekcja 3, Tier 1); pokrycie pojęć 67%, liczby zgodne (180). Uwaga: źródło o niższej randze (07_CRM_Export_Enterprise_Contracts_2024.md, Tier 2) twierdzi inaczej.",
    "prompt": "Licencja obejmuje do 180 pojazdów.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Licencja obejmuje do 180 pojazdów.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "Brak bezpośredniej kwoty (0 PLN)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Licencja obejmuje do 180 pojazdów.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (01_Apex_VeloNova_MSA_2023.md).",
      "correctedOutput": "1.1 Supplier grants to Customer a non-exclusive, non-transferable subscription license to access and use the Apex Meridian Fleet Engine for up to 180 commercial fleet vehicles operated by Customer across the European Union."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D18",
    "split": "dev",
    "expected": "GROUNDED",
    "claim": "Niedostępność bramki telemetrycznej zablokowała 32 naczepy chłodnicze.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 4.25375,
    "file": "06_Protokol_Zarzadu_VeloNova_11_2024.md",
    "page": 4,
    "tier": 1,
    "quote": "W dniu 14 listopada 2024 r. w godzinach 08:30–12:30 wystąpiła niedostępność bramki telemetrycznej Apex Meridian, co zablokowało dyspozycję 32 naczep chłodniczych z ładunkiem farmaceutycznym na trasie Frankfurt–Rotterdam.",
    "explanation": "Potwierdzone dosłownym fragmentem: 06_Protokol_Zarzadu_VeloNova_11_2024.md (sekcja 4, Tier 1); pokrycie pojęć 100%, liczby zgodne (32).",
    "prompt": "Niedostępność bramki telemetrycznej zablokowała 32 naczepy chłodnicze.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Niedostępność bramki telemetrycznej zablokowała 32 naczepy chłodnicze.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "Brak bezpośredniej kwoty (0 PLN)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Niedostępność bramki telemetrycznej zablokowała 32 naczepy chłodnicze.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (06_Protokol_Zarzadu_VeloNova_11_2024.md).",
      "correctedOutput": "W dniu 14 listopada 2024 r. w godzinach 08:30–12:30 wystąpiła niedostępność bramki telemetrycznej Apex Meridian, co zablokowało dyspozycję 32 naczep chłodniczych z ładunkiem farmaceutycznym na trasie Frankfurt–Rotterdam."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D19",
    "split": "dev",
    "expected": "CONTRADICTED",
    "claim": "Supplier may raise prices by 7.5% UK CPI from January 2025.",
    "verdict": "CONTRADICTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 3.070791,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 6,
    "tier": 1,
    "quote": "> *[NEGOTIATION RECORD NOTE: Initial draft clause permitting unilateral price indexing linked to UK CPI or Polish GUS inflation was deleted and rejected by Customer during contract execution.]*",
    "explanation": "Sprzeczne ze źródłem 01_Apex_VeloNova_MSA_2023.md (sekcja 6, Tier 1): polaryzacja: źródło zaprzecza/odrzuca (deleted, rejected). Zgodny fragment istnieje w 04_Email_Thread_Inflation_Dispute_Nov2024.md (Tier 3), ale źródło o wyższej lub równej randze mu przeczy.",
    "prompt": "Supplier may raise prices by 7.5% UK CPI from January 2025.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Supplier may raise prices by 7.5% UK CPI from January 2025.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "Brak bezpośredniej kwoty w klauzuli (0 PLN)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Supplier may raise prices by 7.5% UK CPI from January 2025.\"...",
      "mcpIntercept": "tools/call: verify -> CONTRADICTED (01_Apex_VeloNova_MSA_2023.md).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D20",
    "split": "dev",
    "expected": "CONTRADICTED",
    "claim": "The annual fee is £48,000.00 EUR.",
    "verdict": "CONTRADICTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 1.530083,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 5,
    "tier": 1,
    "quote": "3.1 **Annual Subscription Fee:** Customer shall pay Supplier an annual base platform fee of **£48,000.00 GBP (forty-eight thousand British Pounds Sterling) net**, exclusive of applicable Value Added Tax.",
    "explanation": "Sprzeczne ze źródłem 01_Apex_VeloNova_MSA_2023.md (sekcja 5, Tier 1): waluta: twierdzenie £48,000.00, źródło £48,000.00.",
    "prompt": "The annual fee is £48,000.00 EUR.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"The annual fee is £48,000.00 EUR.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "£48,000.00 EUR (kwota wskazana w badanym twierdzeniu)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"The annual fee is £48,000.00 EUR.\"...",
      "mcpIntercept": "tools/call: verify -> CONTRADICTED (01_Apex_VeloNova_MSA_2023.md).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D21",
    "split": "dev",
    "expected": "CONTRADICTED",
    "claim": "Gwarantowana dostępność wynosi 99.9%.",
    "verdict": "CONTRADICTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 1.443375,
    "file": "02_Schedule_B_Service_Levels_and_Credits.md",
    "page": 2,
    "tier": 1,
    "quote": "1.2 **Availability Target:** Supplier guarantees that the Services shall maintain a Monthly Uptime Percentage of not less than **99.8% (ninety-nine point eight percent)** during each calendar month of the Term.",
    "explanation": "Sprzeczne ze źródłem 02_Schedule_B_Service_Levels_and_Credits.md (sekcja 2, Tier 1): wartość: twierdzenie 99.9%, źródło 99.8%.",
    "prompt": "Gwarantowana dostępność wynosi 99.9%.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Gwarantowana dostępność wynosi 99.9%.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "Brak bezpośredniej kwoty w klauzuli (0 PLN)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Gwarantowana dostępność wynosi 99.9%.\"...",
      "mcpIntercept": "tools/call: verify -> CONTRADICTED (02_Schedule_B_Service_Levels_and_Credits.md).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D22",
    "split": "dev",
    "expected": "CONTRADICTED",
    "claim": "Umowa ramowa została podpisana 15 stycznia 2021 r.",
    "verdict": "CONTRADICTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 2.644875,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 1,
    "tier": 1,
    "quote": "This Master Services Agreement (\"Agreement\") is entered into on the **15th day of January, 2023** (the \"Effective Date\"), by and between:",
    "explanation": "Sprzeczne ze źródłem 01_Apex_VeloNova_MSA_2023.md (sekcja 1, Tier 1): wartość: twierdzenie 2021, źródło 2023.",
    "prompt": "Umowa ramowa została podpisana 15 stycznia 2021 r.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Umowa ramowa została podpisana 15 stycznia 2021 r.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "Brak bezpośredniej kwoty w klauzuli (0 PLN)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Umowa ramowa została podpisana 15 stycznia 2021 r.\"...",
      "mcpIntercept": "tools/call: verify -> CONTRADICTED (01_Apex_VeloNova_MSA_2023.md).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D23",
    "split": "dev",
    "expected": "CONTRADICTED",
    "claim": "Umowa podlega prawu polskiemu.",
    "verdict": "UNSUPPORTED",
    "correct": false,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 2.905458,
    "file": null,
    "page": null,
    "tier": null,
    "quote": null,
    "explanation": "Brak wystarczającego oparcia. Najbliższy fragment (01_Apex_VeloNova_MSA_2023.md, sekcja 8) nie rozstrzyga: .",
    "prompt": "Umowa podlega prawu polskiemu.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Umowa podlega prawu polskiemu.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "Brak bezpośredniej kwoty w klauzuli (0 PLN)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Umowa podlega prawu polskiemu.\"...",
      "mcpIntercept": "tools/call: verify -> UNSUPPORTED (korpus).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D24",
    "split": "dev",
    "expected": "CONTRADICTED",
    "claim": "Telemetry data is hosted in Frankfurt, Germany.",
    "verdict": "CONTRADICTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 3.561708,
    "file": "02_Schedule_B_Service_Levels_and_Credits.md",
    "page": 4,
    "tier": 1,
    "quote": "Supplier does not maintain dedicated compute or storage clusters in the Federal Republic of Germany (Frankfurt).",
    "explanation": "Sprzeczne ze źródłem 02_Schedule_B_Service_Levels_and_Credits.md (sekcja 4, Tier 1): polaryzacja: źródło zaprzecza/odrzuca (not).",
    "prompt": "Telemetry data is hosted in Frankfurt, Germany.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Telemetry data is hosted in Frankfurt, Germany.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "Brak bezpośredniej kwoty w klauzuli (0 PLN)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Telemetry data is hosted in Frankfurt, Germany.\"...",
      "mcpIntercept": "tools/call: verify -> CONTRADICTED (02_Schedule_B_Service_Levels_and_Credits.md).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D25",
    "split": "dev",
    "expected": "CONTRADICTED",
    "claim": "Zysk netto VeloNova za 2024 wyniósł 4 310 000,00 PLN.",
    "verdict": "CONTRADICTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 1.275542,
    "file": "05_Rachunek_Zyskow_i_Strat_2024_PLN.md",
    "page": 1,
    "tier": 1,
    "quote": "| **L.** | **ZYSK NETTO (I - J)** | **4 210 000,00** | **3 223 800,00** |",
    "explanation": "Sprzeczne ze źródłem 05_Rachunek_Zyskow_i_Strat_2024_PLN.md (sekcja 1, Tier 1): wartość: twierdzenie 4 310 000,00 PLN, źródło 4 210 000,00 PLN / 3 223 800,00 PLN.",
    "prompt": "Zysk netto VeloNova za 2024 wyniósł 4 310 000,00 PLN.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Zysk netto VeloNova za 2024 wyniósł 4 310 000,00 PLN.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "4 310 000,00 PLN (kwota wskazana w badanym twierdzeniu)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Zysk netto VeloNova za 2024 wyniósł 4 310 000,00 PLN.\"...",
      "mcpIntercept": "tools/call: verify -> CONTRADICTED (05_Rachunek_Zyskow_i_Strat_2024_PLN.md).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D26",
    "split": "dev",
    "expected": "CONTRADICTED",
    "claim": "Kary umowne za awarie są dopuszczalne na podstawie umowy MSA.",
    "verdict": "CONTRADICTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 4.198375,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 6,
    "tier": 1,
    "quote": "> *[NEGOTIATION RECORD NOTE: Initial draft clause permitting unilateral price indexing linked to UK CPI or Polish GUS inflation was deleted and rejected by Customer during contract execution.]*",
    "explanation": "Sprzeczne ze źródłem 01_Apex_VeloNova_MSA_2023.md (sekcja 6, Tier 1): polaryzacja: źródło zaprzecza/odrzuca (deleted, rejected). Zgodny fragment istnieje w 06_Protokol_Zarzadu_VeloNova_11_2024.md (Tier 1), ale źródło o wyższej lub równej randze mu przeczy.",
    "prompt": "Kary umowne za awarie są dopuszczalne na podstawie umowy MSA.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Kary umowne za awarie są dopuszczalne na podstawie umowy MSA.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "Brak bezpośredniej kwoty w klauzuli (0 PLN)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Kary umowne za awarie są dopuszczalne na podstawie umowy MSA.\"...",
      "mcpIntercept": "tools/call: verify -> CONTRADICTED (01_Apex_VeloNova_MSA_2023.md).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D27",
    "split": "dev",
    "expected": "CONTRADICTED",
    "claim": "Umowa MSA przewiduje karę umowną za każdy dzień opóźnienia.",
    "verdict": "UNSUPPORTED",
    "correct": false,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 4.543042,
    "file": null,
    "page": null,
    "tier": null,
    "quote": null,
    "explanation": "Brak wystarczającego oparcia. Najbliższy fragment (01_Apex_VeloNova_MSA_2023.md, sekcja 7) nie rozstrzyga: za niskie pokrycie pojęć (42%, brakuje: dzień, opóźnienia); niezgodna polaryzacja.",
    "prompt": "Umowa MSA przewiduje karę umowną za każdy dzień opóźnienia.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Umowa MSA przewiduje karę umowną za każdy dzień opóźnienia.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "Brak bezpośredniej kwoty w klauzuli (0 PLN)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Umowa MSA przewiduje karę umowną za każdy dzień opóźnienia.\"...",
      "mcpIntercept": "tools/call: verify -> UNSUPPORTED (korpus).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D28",
    "split": "dev",
    "expected": "UNSUPPORTED",
    "claim": "VeloNova posiada flotę 50 statków morskich.",
    "verdict": "UNSUPPORTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 2.7595,
    "file": null,
    "page": null,
    "tier": null,
    "quote": null,
    "explanation": "Brak wystarczającego oparcia. Najbliższy fragment (01_Apex_VeloNova_MSA_2023.md, sekcja 2) nie rozstrzyga: za niskie pokrycie pojęć (16%, brakuje: posiada, statków, morskich); liczby z twierdzenia nie występują w tym fragmencie.",
    "prompt": "VeloNova posiada flotę 50 statków morskich.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"VeloNova posiada flotę 50 statków morskich.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "Brak bezpośredniej kwoty w klauzuli (0 PLN)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"VeloNova posiada flotę 50 statków morskich.\"...",
      "mcpIntercept": "tools/call: verify -> UNSUPPORTED (korpus).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D29",
    "split": "dev",
    "expected": "UNSUPPORTED",
    "claim": "VeloNova planuje wejście na giełdę w 2025 r.",
    "verdict": "UNSUPPORTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 1.452167,
    "file": null,
    "page": null,
    "tier": null,
    "quote": null,
    "explanation": "Brak oparcia w korpusie: żaden dokument nie odnosi się do tego twierdzenia.",
    "prompt": "VeloNova planuje wejście na giełdę w 2025 r.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"VeloNova planuje wejście na giełdę w 2025 r.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "Brak bezpośredniej kwoty w klauzuli (0 PLN)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"VeloNova planuje wejście na giełdę w 2025 r.\"...",
      "mcpIntercept": "tools/call: verify -> UNSUPPORTED (korpus).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D30",
    "split": "dev",
    "expected": "UNSUPPORTED",
    "claim": "CISO Apex Meridian nazywa się Dr. Aris Thorne.",
    "verdict": "UNSUPPORTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 2.542459,
    "file": null,
    "page": null,
    "tier": null,
    "quote": null,
    "explanation": "Brak wystarczającego oparcia. Najbliższy fragment (01_Apex_VeloNova_MSA_2023.md, sekcja 7) nie rozstrzyga: za niskie pokrycie pojęć (16%, brakuje: ciso, nazywa, dr, thorne).",
    "prompt": "CISO Apex Meridian nazywa się Dr. Aris Thorne.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"CISO Apex Meridian nazywa się Dr. Aris Thorne.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "Brak bezpośredniej kwoty w klauzuli (0 PLN)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"CISO Apex Meridian nazywa się Dr. Aris Thorne.\"...",
      "mcpIntercept": "tools/call: verify -> UNSUPPORTED (korpus).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "D31",
    "split": "dev",
    "expected": "UNSUPPORTED",
    "claim": "Dostawca zapewnia wsparcie 24/7 w języku polskim.",
    "verdict": "UNSUPPORTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 2.171709,
    "file": null,
    "page": null,
    "tier": null,
    "quote": null,
    "explanation": "Brak wystarczającego oparcia. Najbliższy fragment (01_Apex_VeloNova_MSA_2023.md, sekcja 3) nie rozstrzyga: za niskie pokrycie pojęć (25%, brakuje: zapewnia, języku, polskim).",
    "prompt": "Dostawca zapewnia wsparcie 24/7 w języku polskim.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Dostawca zapewnia wsparcie 24/7 w języku polskim.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "Brak bezpośredniej kwoty w klauzuli (0 PLN)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Dostawca zapewnia wsparcie 24/7 w języku polskim.\"...",
      "mcpIntercept": "tools/call: verify -> UNSUPPORTED (korpus).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "H01",
    "split": "holdout",
    "expected": "GROUNDED",
    "claim": "The initial term of the agreement is thirty-six months.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 4.387417,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 4,
    "tier": 1,
    "quote": "2.1 **Initial Term:** This Agreement commences on the Effective Date (15 January 2023) and shall remain in full force and effect for an initial term of **thirty-six (36) months** ending on 14 January 2026, unless terminated earlier in accordance with Section 12.",
    "explanation": "Potwierdzone dosłownym fragmentem: 01_Apex_VeloNova_MSA_2023.md (sekcja 4, Tier 1); pokrycie pojęć 100%.",
    "prompt": "The initial term of the agreement is thirty-six months.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"The initial term of the agreement is thirty-six months.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "Brak bezpośredniej kwoty (0 PLN)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"The initial term of the agreement is thirty-six months.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (01_Apex_VeloNova_MSA_2023.md).",
      "correctedOutput": "2.1 **Initial Term:** This Agreement commences on the Effective Date (15 January 2023) and shall remain in full force and effect for an initial term of **thirty-six (36) months** ending on 14 January 2026, unless terminated earlier in accordance with Section 12."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "H02",
    "split": "holdout",
    "expected": "GROUNDED",
    "claim": "Sądy Anglii i Walii mają wyłączną jurysdykcję w sporach z umowy.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 5.014833,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 8,
    "tier": 1,
    "quote": "14.2 The Parties irrevocably agree that the **courts of England and Wales** shall have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with this Agreement.",
    "explanation": "Potwierdzone dosłownym fragmentem: 01_Apex_VeloNova_MSA_2023.md (sekcja 8, Tier 1); pokrycie pojęć 82%.",
    "prompt": "Sądy Anglii i Walii mają wyłączną jurysdykcję w sporach z umowy.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Sądy Anglii i Walii mają wyłączną jurysdykcję w sporach z umowy.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "Brak bezpośredniej kwoty (0 PLN)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Sądy Anglii i Walii mają wyłączną jurysdykcję w sporach z umowy.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (01_Apex_VeloNova_MSA_2023.md).",
      "correctedOutput": "14.2 The Parties irrevocably agree that the **courts of England and Wales** shall have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with this Agreement."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "H03",
    "split": "holdout",
    "expected": "GROUNDED",
    "claim": "The disaster recovery archive is hosted in AWS London.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 3.727833,
    "file": "02_Schedule_B_Service_Levels_and_Credits.md",
    "page": 4,
    "tier": 1,
    "quote": "* **Secondary Disaster Recovery & Analytics Archive:** Hosted in Amazon Web Services (AWS) Region located in **London, United Kingdom (Region: eu-west-2)**.",
    "explanation": "Potwierdzone dosłownym fragmentem: 02_Schedule_B_Service_Levels_and_Credits.md (sekcja 4, Tier 1); pokrycie pojęć 100%.",
    "prompt": "The disaster recovery archive is hosted in AWS London.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"The disaster recovery archive is hosted in AWS London.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "Brak bezpośredniej kwoty (0 PLN)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"The disaster recovery archive is hosted in AWS London.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (02_Schedule_B_Service_Levels_and_Credits.md).",
      "correctedOutput": "* **Secondary Disaster Recovery & Analytics Archive:** Hosted in Amazon Web Services (AWS) Region located in **London, United Kingdom (Region: eu-west-2)**."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "H04",
    "split": "holdout",
    "expected": "GROUNDED",
    "claim": "Invoice INV-2024-1108 was paid in full on 28 October 2024.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 3.8645,
    "file": "03_Invoice_INV-2024-1108.md",
    "page": 1,
    "tier": 1,
    "quote": "*Status: Approved and paid in full by VeloNova Logistics on 28 October 2024.*",
    "explanation": "Potwierdzone dosłownym fragmentem: 03_Invoice_INV-2024-1108.md (sekcja 1, Tier 1); pokrycie pojęć 91%, liczby zgodne (28, 2024).",
    "prompt": "Invoice INV-2024-1108 was paid in full on 28 October 2024.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Invoice INV-2024-1108 was paid in full on 28 October 2024.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "Brak bezpośredniej kwoty (0 PLN)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Invoice INV-2024-1108 was paid in full on 28 October 2024.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (03_Invoice_INV-2024-1108.md).",
      "correctedOutput": "*Status: Approved and paid in full by VeloNova Logistics on 28 October 2024.*"
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "H05",
    "split": "holdout",
    "expected": "GROUNDED",
    "claim": "Stawka VAT na fakturze INV-2024-1108 wynosi 0%.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 2.658583,
    "file": "03_Invoice_INV-2024-1108.md",
    "page": 1,
    "tier": 1,
    "quote": "| 01 | Apex Meridian Fleet Engine Platform — Enterprise Telematics Subscription (Tier 1: Up to 180 vehicles) | Q4 2024 (01.10.2024 – 31.12.2024) | 1 Quarter | £12,000.00 | £12,000.00 | 0% (Reverse Charge) | £0.00 | £12,000.00 |",
    "explanation": "Potwierdzone dosłownym fragmentem: 03_Invoice_INV-2024-1108.md (sekcja 1, Tier 1); pokrycie pojęć 88%, liczby zgodne (0%).",
    "prompt": "Stawka VAT na fakturze INV-2024-1108 wynosi 0%.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Stawka VAT na fakturze INV-2024-1108 wynosi 0%.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "Brak bezpośredniej kwoty (0 PLN)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Stawka VAT na fakturze INV-2024-1108 wynosi 0%.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (03_Invoice_INV-2024-1108.md).",
      "correctedOutput": "| 01 | Apex Meridian Fleet Engine Platform — Enterprise Telematics Subscription (Tier 1: Up to 180 vehicles) | Q4 2024 (01.10.2024 – 31.12.2024) | 1 Quarter | £12,000.00 | £12,000.00 | 0% (Reverse Charge) | £0.00 | £12,000.00 |"
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "H06",
    "split": "holdout",
    "expected": "GROUNDED",
    "claim": "Service Credits cannot be refunded as cash.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 2.611291,
    "file": "02_Schedule_B_Service_Levels_and_Credits.md",
    "page": 3,
    "tier": 1,
    "quote": "In no event shall Service Credits be refunded as cash payments.",
    "explanation": "Potwierdzone dosłownym fragmentem: 02_Schedule_B_Service_Levels_and_Credits.md (sekcja 3, Tier 1); pokrycie pojęć 100%.",
    "prompt": "Service Credits cannot be refunded as cash.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Service Credits cannot be refunded as cash.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "Brak bezpośredniej kwoty (0 PLN)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Service Credits cannot be refunded as cash.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (02_Schedule_B_Service_Levels_and_Credits.md).",
      "correctedOutput": "In no event shall Service Credits be refunded as cash payments."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "H07",
    "split": "holdout",
    "expected": "GROUNDED",
    "claim": "Koszt subskrypcji Apex w 2024 r. wyniósł 246 840,00 PLN.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 1.560083,
    "file": "05_Rachunek_Zyskow_i_Strat_2024_PLN.md",
    "page": 2,
    "tier": 1,
    "quote": "* W roku obrotowym 2024 łączny koszt subskrypcji platformy Apex Meridian Fleet Engine (dostawca: Apex Meridian Technologies Ltd, Wielka Brytania) wyniósł **£48,000.00 GBP**, co po przeliczeniu na walutę polską według średnich kursów NBP z dni poprzedzających wystawienie faktur kwartalnych stanowiło równowartość **246 840,00 PLN**.",
    "explanation": "Potwierdzone dosłownym fragmentem: 05_Rachunek_Zyskow_i_Strat_2024_PLN.md (sekcja 2, Tier 1); pokrycie pojęć 100%, liczby zgodne (2024, 246 840,00). Uwaga: źródło o niższej randze (04_Email_Thread_Inflation_Dispute_Nov2024.md, Tier 3) twierdzi inaczej.",
    "prompt": "Koszt subskrypcji Apex w 2024 r. wyniósł 246 840,00 PLN.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Koszt subskrypcji Apex w 2024 r. wyniósł 246 840,00 PLN.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "246 840,00 PLN (kwota wskazana w badanym twierdzeniu)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Koszt subskrypcji Apex w 2024 r. wyniósł 246 840,00 PLN.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (05_Rachunek_Zyskow_i_Strat_2024_PLN.md).",
      "correctedOutput": "* W roku obrotowym 2024 łączny koszt subskrypcji platformy Apex Meridian Fleet Engine (dostawca: Apex Meridian Technologies Ltd, Wielka Brytania) wyniósł **£48,000.00 GBP**, co po przeliczeniu na walutę polską według średnich kursów NBP z dni poprzedzających wystawienie faktur kwartalnych stanowiło równowartość **246 840,00 PLN**."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "H08",
    "split": "holdout",
    "expected": "GROUNDED",
    "claim": "Umowa z ThermoKing Telematics ma wartość 32 400 EUR rocznie.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 3.006958,
    "file": "07_CRM_Export_Enterprise_Contracts_2024.md",
    "page": 2,
    "tier": 2,
    "quote": "| CNT-2023-088 | ThermoKing Telematics Europe B.V. | Sensory IoT i czujniki temperatury komory | 01.03.2023 | 28.02.2026 | 32 400,00 | EUR | ACTIVE / SIGNED | M. Czarnecki |",
    "explanation": "Potwierdzone dosłownym fragmentem: 07_CRM_Export_Enterprise_Contracts_2024.md (sekcja 2, Tier 2); pokrycie pojęć 100%, liczby zgodne (32 400).",
    "prompt": "Umowa z ThermoKing Telematics ma wartość 32 400 EUR rocznie.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Umowa z ThermoKing Telematics ma wartość 32 400 EUR rocznie.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "32 400 EUR (kwota wskazana w badanym twierdzeniu)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Umowa z ThermoKing Telematics ma wartość 32 400 EUR rocznie.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (07_CRM_Export_Enterprise_Contracts_2024.md).",
      "correctedOutput": "| CNT-2023-088 | ThermoKing Telematics Europe B.V. | Sensory IoT i czujniki temperatury komory | 01.03.2023 | 28.02.2026 | 32 400,00 | EUR | ACTIVE / SIGNED | M. Czarnecki |"
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "H09",
    "split": "holdout",
    "expected": "GROUNDED",
    "claim": "Primary telemetry processing is hosted in AWS Dublin, Ireland.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 4.953875,
    "file": "02_Schedule_B_Service_Levels_and_Credits.md",
    "page": 4,
    "tier": 1,
    "quote": "* **Primary Processing & Live Telemetry Ingestion:** Hosted in Amazon Web Services (AWS) Europe Region located in **Dublin, Ireland (Region: eu-west-1)**.",
    "explanation": "Potwierdzone dosłownym fragmentem: 02_Schedule_B_Service_Levels_and_Credits.md (sekcja 4, Tier 1); pokrycie pojęć 100%.",
    "prompt": "Primary telemetry processing is hosted in AWS Dublin, Ireland.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Primary telemetry processing is hosted in AWS Dublin, Ireland.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "Brak bezpośredniej kwoty (0 PLN)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Primary telemetry processing is hosted in AWS Dublin, Ireland.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (02_Schedule_B_Service_Levels_and_Credits.md).",
      "correctedOutput": "* **Primary Processing & Live Telemetry Ingestion:** Hosted in Amazon Web Services (AWS) Europe Region located in **Dublin, Ireland (Region: eu-west-1)**."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "H10",
    "split": "holdout",
    "expected": "GROUNDED",
    "claim": "Supplier's aggregate liability is capped at 100% of fees paid in the preceding 12 months.",
    "verdict": "GROUNDED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 5.870166,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 7,
    "tier": 1,
    "quote": "11.2 **Aggregate Liability Cap:** Except for breaches of Section 10 (Confidentiality) or willful misconduct, Supplier's total aggregate liability arising out of or related to this Agreement, whether in contract, tort (including negligence), or otherwise, shall be strictly limited to **one hundred percent (100%) of the total fees actually paid by Customer to Supplier in the twelve (12) months immediately preceding the event giving rise to liability**.",
    "explanation": "Potwierdzone dosłownym fragmentem: 01_Apex_VeloNova_MSA_2023.md (sekcja 7, Tier 1); pokrycie pojęć 100%, liczby zgodne (100%, 12).",
    "prompt": "Supplier's aggregate liability is capped at 100% of fees paid in the preceding 12 months.",
    "category": "GROUNDED",
    "subtype": "Fakt potwierdzony w Tier 1",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Supplier's aggregate liability is capped at 100% of fees paid in the preceding 12 months.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Zgodność z dokumentacją źródłową",
    "financialExposureValue": "Brak bezpośredniej kwoty (0 PLN)",
    "financialExposureCfo": "Fakt w 100% spójny z umowami spółki.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Supplier's aggregate liability is capped at 100% of fees paid in the preceding 12 months.\"...",
      "mcpIntercept": "tools/call: verify -> GROUNDED (01_Apex_VeloNova_MSA_2023.md).",
      "correctedOutput": "11.2 **Aggregate Liability Cap:** Except for breaches of Section 10 (Confidentiality) or willful misconduct, Supplier's total aggregate liability arising out of or related to this Agreement, whether in contract, tort (including negligence), or otherwise, shall be strictly limited to **one hundred percent (100%) of the total fees actually paid by Customer to Supplier in the twelve (12) months immediately preceding the event giving rise to liability**."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "H11",
    "split": "holdout",
    "expected": "CONTRADICTED",
    "claim": "Od 2025 r. opłata kwartalna wynosi £12,900.00 GBP.",
    "verdict": "CONTRADICTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 1.589417,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 5,
    "tier": 1,
    "quote": "3.2 **Invoicing Schedule:** The Annual Subscription Fee shall be billed quarterly in advance in four (4) equal installments of **£12,000.00 GBP net** on the first business day of January, April, July, and October.",
    "explanation": "Sprzeczne ze źródłem 01_Apex_VeloNova_MSA_2023.md (sekcja 5, Tier 1): wartość: twierdzenie £12,900.00, źródło £12,000.00. Zgodny fragment istnieje w 04_Email_Thread_Inflation_Dispute_Nov2024.md (Tier 3), ale źródło o wyższej lub równej randze mu przeczy.",
    "prompt": "Od 2025 r. opłata kwartalna wynosi £12,900.00 GBP.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Od 2025 r. opłata kwartalna wynosi £12,900.00 GBP.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "£12,900.00 GBP (kwota wskazana w badanym twierdzeniu)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Od 2025 r. opłata kwartalna wynosi £12,900.00 GBP.\"...",
      "mcpIntercept": "tools/call: verify -> CONTRADICTED (01_Apex_VeloNova_MSA_2023.md).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "H12",
    "split": "holdout",
    "expected": "CONTRADICTED",
    "claim": "Automatic renewal of the agreement is allowed.",
    "verdict": "CONTRADICTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 2.609417,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 4,
    "tier": 1,
    "quote": "Automatic rollover renewal is explicitly excluded.",
    "explanation": "Sprzeczne ze źródłem 01_Apex_VeloNova_MSA_2023.md (sekcja 4, Tier 1): polaryzacja: źródło zaprzecza/odrzuca (excluded).",
    "prompt": "Automatic renewal of the agreement is allowed.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Automatic renewal of the agreement is allowed.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "Brak bezpośredniej kwoty w klauzuli (0 PLN)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Automatic renewal of the agreement is allowed.\"...",
      "mcpIntercept": "tools/call: verify -> CONTRADICTED (01_Apex_VeloNova_MSA_2023.md).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "H13",
    "split": "holdout",
    "expected": "CONTRADICTED",
    "claim": "Service Credits can be refunded as cash payments.",
    "verdict": "CONTRADICTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 3.426333,
    "file": "02_Schedule_B_Service_Levels_and_Credits.md",
    "page": 3,
    "tier": 1,
    "quote": "In no event shall Service Credits be refunded as cash payments.",
    "explanation": "Sprzeczne ze źródłem 02_Schedule_B_Service_Levels_and_Credits.md (sekcja 3, Tier 1): polaryzacja: źródło zaprzecza/odrzuca (no).",
    "prompt": "Service Credits can be refunded as cash payments.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Service Credits can be refunded as cash payments.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "Brak bezpośredniej kwoty w klauzuli (0 PLN)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Service Credits can be refunded as cash payments.\"...",
      "mcpIntercept": "tools/call: verify -> CONTRADICTED (02_Schedule_B_Service_Levels_and_Credits.md).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "H14",
    "split": "holdout",
    "expected": "CONTRADICTED",
    "claim": "Licencja obejmuje 300 pojazdów.",
    "verdict": "CONTRADICTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 2.844042,
    "file": "03_Invoice_INV-2024-1108.md",
    "page": 1,
    "tier": 1,
    "quote": "| 01 | Apex Meridian Fleet Engine Platform — Enterprise Telematics Subscription (Tier 1: Up to 180 vehicles) | Q4 2024 (01.10.2024 – 31.12.2024) | 1 Quarter | £12,000.00 | £12,000.00 | 0% (Reverse Charge) | £0.00 | £12,000.00 |",
    "explanation": "Sprzeczne ze źródłem 03_Invoice_INV-2024-1108.md (sekcja 1, Tier 1): wartość: twierdzenie 300, źródło 180.",
    "prompt": "Licencja obejmuje 300 pojazdów.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Licencja obejmuje 300 pojazdów.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "Brak bezpośredniej kwoty w klauzuli (0 PLN)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Licencja obejmuje 300 pojazdów.\"...",
      "mcpIntercept": "tools/call: verify -> CONTRADICTED (03_Invoice_INV-2024-1108.md).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "H15",
    "split": "holdout",
    "expected": "CONTRADICTED",
    "claim": "The initial term of the agreement is 24 months.",
    "verdict": "CONTRADICTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 3.2895,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 4,
    "tier": 1,
    "quote": "2.1 **Initial Term:** This Agreement commences on the Effective Date (15 January 2023) and shall remain in full force and effect for an initial term of **thirty-six (36) months** ending on 14 January 2026, unless terminated earlier in accordance with Section 12.",
    "explanation": "Sprzeczne ze źródłem 01_Apex_VeloNova_MSA_2023.md (sekcja 4, Tier 1): wartość: twierdzenie 24, źródło 36.",
    "prompt": "The initial term of the agreement is 24 months.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"The initial term of the agreement is 24 months.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "Brak bezpośredniej kwoty w klauzuli (0 PLN)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"The initial term of the agreement is 24 months.\"...",
      "mcpIntercept": "tools/call: verify -> CONTRADICTED (01_Apex_VeloNova_MSA_2023.md).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "H16",
    "split": "holdout",
    "expected": "CONTRADICTED",
    "claim": "Faktura INV-2024-1108 opiewa na £12,900.00 GBP.",
    "verdict": "UNSUPPORTED",
    "correct": false,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 2.014917,
    "file": null,
    "page": null,
    "tier": null,
    "quote": null,
    "explanation": "Brak wystarczającego oparcia. Najbliższy fragment (03_Invoice_INV-2024-1108.md, sekcja 1) nie rozstrzyga: za niskie pokrycie pojęć (57%, brakuje: opiewa); liczby z twierdzenia nie występują w tym fragmencie.",
    "prompt": "Faktura INV-2024-1108 opiewa na £12,900.00 GBP.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Faktura INV-2024-1108 opiewa na £12,900.00 GBP.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "£12,900.00 GBP (kwota wskazana w badanym twierdzeniu)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Faktura INV-2024-1108 opiewa na £12,900.00 GBP.\"...",
      "mcpIntercept": "tools/call: verify -> UNSUPPORTED (korpus).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "H17",
    "split": "holdout",
    "expected": "CONTRADICTED",
    "claim": "Invoice INV-2024-1108 remains unpaid.",
    "verdict": "CONTRADICTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 2.259709,
    "file": "03_Invoice_INV-2024-1108.md",
    "page": 1,
    "tier": 1,
    "quote": "* **Payment Terms:** Net 30 Calendar Days",
    "explanation": "Sprzeczne ze źródłem 03_Invoice_INV-2024-1108.md (sekcja 1, Tier 1): polaryzacja: twierdzenie zaprzecza, źródło twierdzi.",
    "prompt": "Invoice INV-2024-1108 remains unpaid.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Invoice INV-2024-1108 remains unpaid.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "Brak bezpośredniej kwoty w klauzuli (0 PLN)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Invoice INV-2024-1108 remains unpaid.\"...",
      "mcpIntercept": "tools/call: verify -> CONTRADICTED (03_Invoice_INV-2024-1108.md).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "H18",
    "split": "holdout",
    "expected": "CONTRADICTED",
    "claim": "The supplier granted a Service Credit of 50,000 EUR for the Frankfurt outage.",
    "verdict": "UNSUPPORTED",
    "correct": false,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 3.00375,
    "file": null,
    "page": null,
    "tier": null,
    "quote": null,
    "explanation": "Brak wystarczającego oparcia. Najbliższy fragment (01_Apex_VeloNova_MSA_2023.md, sekcja 7) nie rozstrzyga: za niskie pokrycie pojęć (50%, brakuje: granted, frankfurt); liczby z twierdzenia nie występują w tym fragmencie.",
    "prompt": "The supplier granted a Service Credit of 50,000 EUR for the Frankfurt outage.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"The supplier granted a Service Credit of 50,000 EUR for the Frankfurt outage.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "50,000 EUR (kwota wskazana w badanym twierdzeniu)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"The supplier granted a Service Credit of 50,000 EUR for the Frankfurt outage.\"...",
      "mcpIntercept": "tools/call: verify -> UNSUPPORTED (korpus).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "H19",
    "split": "holdout",
    "expected": "UNSUPPORTED",
    "claim": "Apex Meridian has an office in Warsaw.",
    "verdict": "UNSUPPORTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 1.330959,
    "file": null,
    "page": null,
    "tier": null,
    "quote": null,
    "explanation": "Brak wystarczającego oparcia. Najbliższy fragment (01_Apex_VeloNova_MSA_2023.md, sekcja 1) nie rozstrzyga: .",
    "prompt": "Apex Meridian has an office in Warsaw.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Apex Meridian has an office in Warsaw.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "Brak bezpośredniej kwoty w klauzuli (0 PLN)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Apex Meridian has an office in Warsaw.\"...",
      "mcpIntercept": "tools/call: verify -> UNSUPPORTED (korpus).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "H20",
    "split": "holdout",
    "expected": "UNSUPPORTED",
    "claim": "The MSA includes a non-compete clause.",
    "verdict": "UNSUPPORTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 2.788292,
    "file": null,
    "page": null,
    "tier": null,
    "quote": null,
    "explanation": "Brak wystarczającego oparcia. Najbliższy fragment (01_Apex_VeloNova_MSA_2023.md, sekcja 6) nie rozstrzyga: za niskie pokrycie pojęć (31%, brakuje: includes, non-compete, compete); niezgodna polaryzacja.",
    "prompt": "The MSA includes a non-compete clause.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"The MSA includes a non-compete clause.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "Brak bezpośredniej kwoty w klauzuli (0 PLN)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"The MSA includes a non-compete clause.\"...",
      "mcpIntercept": "tools/call: verify -> UNSUPPORTED (korpus).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "H21",
    "split": "holdout",
    "expected": "UNSUPPORTED",
    "claim": "Apex Meridian is certified to ISO 27001.",
    "verdict": "UNSUPPORTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 1.156042,
    "file": null,
    "page": null,
    "tier": null,
    "quote": null,
    "explanation": "Brak oparcia w korpusie: żaden dokument nie odnosi się do tego twierdzenia.",
    "prompt": "Apex Meridian is certified to ISO 27001.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Apex Meridian is certified to ISO 27001.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "Brak bezpośredniej kwoty w klauzuli (0 PLN)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Apex Meridian is certified to ISO 27001.\"...",
      "mcpIntercept": "tools/call: verify -> UNSUPPORTED (korpus).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "H22",
    "split": "holdout",
    "expected": "UNSUPPORTED",
    "claim": "Either party may terminate the contract with 30 days notice.",
    "verdict": "CONTRADICTED",
    "correct": false,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 4.004834,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 4,
    "tier": 1,
    "quote": "2.2 **Renewal:** Following the Initial Term, the Agreement may be renewed only upon the express mutual written agreement of both Parties at least sixty (60) days prior to expiration.",
    "explanation": "Sprzeczne ze źródłem 01_Apex_VeloNova_MSA_2023.md (sekcja 4, Tier 1): wartość: twierdzenie 30, źródło 60.",
    "prompt": "Either party may terminate the contract with 30 days notice.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Either party may terminate the contract with 30 days notice.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "Brak bezpośredniej kwoty w klauzuli (0 PLN)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Either party may terminate the contract with 30 days notice.\"...",
      "mcpIntercept": "tools/call: verify -> CONTRADICTED (01_Apex_VeloNova_MSA_2023.md).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  },
  {
    "id": "H23",
    "split": "holdout",
    "expected": "UNSUPPORTED",
    "claim": "Przychody VeloNova w 2025 r. wyniosły 55 mln PLN.",
    "verdict": "UNSUPPORTED",
    "correct": true,
    "safe": true,
    "falseGrounded": false,
    "durationMs": 1.768125,
    "file": null,
    "page": null,
    "tier": null,
    "quote": null,
    "explanation": "Brak wystarczającego oparcia. Najbliższy fragment (05_Rachunek_Zyskow_i_Strat_2024_PLN.md, sekcja 1) nie rozstrzyga: za niskie pokrycie pojęć (35%, brakuje: mln); liczby z twierdzenia nie występują w tym fragmencie.",
    "prompt": "Przychody VeloNova w 2025 r. wyniosły 55 mln PLN.",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka odcięta przez redline",
    "llmTitle": "Standard LLM: Syntetyczna odpowiedź",
    "llmResponse": "Standardowy model LLM syntetyzuje odpowiedź na twierdzenie: \"Przychody VeloNova w 2025 r. wyniosły 55 mln PLN.\".",
    "llmDefects": [
      "Brak bezpośredniego cytatu ze wskazaniem pliku i strony"
    ],
    "financialExposure": "Ryzyko operacyjne / compliance",
    "financialExposureValue": "Brak bezpośredniej kwoty w klauzuli (0 PLN)",
    "financialExposureCfo": "Brak oparcia w korpusie lub sprzeczność z nadrzędną umową rodzi ryzyko roszczeń.",
    "financialFailSafeCost": "~30 PLN (SZACUNEK: 3-5 min weryfikacji manualnej)",
    "agentTrace": {
      "llmDraft": "Szkic modelu: potwierdzam twierdzenie \"Przychody VeloNova w 2025 r. wyniosły 55 mln PLN.\"...",
      "mcpIntercept": "tools/call: verify -> UNSUPPORTED (korpus).",
      "correctedOutput": "Odmowa UNSUPPORTED na podstawie korpusu."
    },
    "perspective3Analysis": {
      "failSafeExplanation": "Audytor sprawdza dokumenty źródłowe w przypadku odmowy.",
      "riskAsymmetry": "False Negative = kilka minut weryfikacji. False Positive LLM = ryzyko błędnej decyzji zarządczej."
    },
    "riskLevel": "HIGH"
  }
];
