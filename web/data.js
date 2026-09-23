// Auto-generated dataset for mcp-redline interactive single-page demo
// Generated at: 2026-09-23T21:51:03.371Z

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

export const SCENARIOS = [
  {
    "id": "P01",
    "category": "GROUNDED",
    "subtype": "Proste dopasowanie (data podpisania umowy)",
    "prompt": "Umowa ramowa między Apex Meridian Technologies Ltd a VeloNova Logistics Sp. z o.o. została podpisana dnia 15 stycznia 2023 r.",
    "verdict": "GROUNDED",
    "durationMs": 2.454125,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 1,
    "explanation": "Twierdzenie w pełni potwierdzone w źródle: 01_Apex_VeloNova_MSA_2023.md (sekcja/strona 1).",
    "quote": "# MASTER SERVICES AGREEMENT (MSA)\n**Reference: AMT-MSA-2023-0115**\n\nThis Master Services Agreement (\"Agreement\") is entered into on the **15th day of January, 2023** (the \"Effective Date\"), by and between:\n\n1. **Apex Meridian Technologies Ltd**, a private limited company incorporated under the laws of England and Wales with company number 09841234, having its registered office at 25 Bank Street, Canary Wharf, London, E14 5JP, United Kingdom (\"Supplier\" or \"Apex Meridian\"); and\n2. **VeloNova Logistics Sp. z o.o.**, a company incorporated under the laws of the Republic of Poland, registered in the National Court Register (KRS) under number 0000845123, Tax Identification Number (NIP): 5252819432, having its registered office at ul. Prosta 68, 00-838 Warsaw, Poland (\"Customer\" or \"VeloNova\").\n\n---",
    "comment": "Proste dopasowanie faktograficzne. Serwer potwierdza datę wejścia w życie umowy (Effective Date) z komparycji MSA.",
    "llmTitle": "Standard LLM: Syntetyczne potwierdzenie z domniemaniami",
    "llmResponse": "Tak, umowa ramowa między Apex Meridian Technologies a VeloNova Logistics została podpisana 15 stycznia 2023 roku w Londynie na standardowy 3-letni okres z opcją automatycznego przedłużenia.",
    "llmDefects": [
      "Dodano niesprawdzone założenia o automatycznym przedłużeniu",
      "Brak dokładnego cytatu komparycji z numerami rejestrowymi KRS/NIP/Companies House"
    ],
    "financialExposure": "Niskie ryzyko (fakt poprawny, brak ścisłego cytatu)",
    "riskLevel": "LOW"
  },
  {
    "id": "P02",
    "category": "GROUNDED",
    "subtype": "Liczba z tabeli (zysk netto z P&L)",
    "prompt": "Zysk netto VeloNova Logistics Sp. z o.o. za rok obrotowy 2024 wyniósł 4 210 000,00 PLN.",
    "verdict": "GROUNDED",
    "durationMs": 0.774333,
    "file": "05_Rachunek_Zyskow_i_Strat_2024_PLN.md",
    "page": 1,
    "explanation": "Twierdzenie w pełni potwierdzone w źródle: 05_Rachunek_Zyskow_i_Strat_2024_PLN.md (sekcja/strona 1).",
    "quote": "# RACHUNEK ZYSKÓW I STRAT (WARIANT PORÓWNAWCZY)\n**VeloNova Logistics Sp. z o.o.**  \n*KRS: 0000845123 | NIP: 5252819432*  \n*Okres sprawozdawczy: 01.01.2024 – 31.12.2024 (zestawienie w PLN)*\n\n---\n\n| Pozycja | Wyszczególnienie | Rok bieżący (2024) [PLN] | Rok poprzedni (2023) [PLN] |\n|---|---|---|---|\n| **A.** | **Przychody netto ze sprzedaży i zrównane z nimi** | **48 520 000,00** | **41 200 000,00** |\n| I. | Przychody netto ze sprzedaży usług spedycyjnych i transportowych | 46 850 000,00 | 39 800 000,00 |\n| II. | Przychody z usług logistyki magazynowej i chłodniczej | 1 670 000,00 | 1 400 000,00 |\n| **B.** | **Koszty działalności operacyjnej** | **43 180 000,00** | **37 050 000,00** |\n| I. | Amortyzacja środków trwałych | 2 150 000,00 | 1 950 000,00 |\n| II. | Zużycie materiałów i energii (w tym paliwo floty 180 pojazdów) | 12 600 000,00 | 11 100 000,00 |\n| III. | Usługi obce (w tym telematyka i infrastruktura chmurowa) | **8 920 000,00** | 7 600 000,00 |\n| IV. | Podatki i opłaty drogowe (Viapoll, MAUT, Eurovignette) | 1 060 000,00 | 950 000,00 |\n| V. | Wynagrodzenia (kierowcy, spedycja, administracja) | 15 250 000,00 | 12 800 000,00 |\n| VI. | Ubezpieczenia społeczne i inne świadczenia | 3 200 000,00 | 2 650 000,00 |\n| **C.** | **Zysk (strata) ze sprzedaży (A - B)** | **5 340 000,00** | **4 150 000,00** |\n| **D.** | **Pozostałe przychody operacyjne** | 180 000,00 | 120 000,00 |\n| **E.** | **Pozostałe koszty operacyjne** | 210 000,00 | 160 000,00 |\n| **F.** | **Zysk (strata) z działalności operacyjnej (C + D - E)** | **5 310 000,00** | **4 110 000,00** |\n| **G.** | **Przychody finansowe** | 90 000,00 | 60 000,00 |\n| **H.** | **Koszty finansowe (w tym różnice kursowe GBP/EUR/PLN)** | 210 000,00 | 190 000,00 |\n| **I.** | **Zysk (strata) brutto (F + G - H)** | **5 190 000,00** | **3 980 000,00** |\n| **J.** | **Podatek dochodowy (CIT 19%)** | 980 000,00 | 756 200,00 |\n| **L.** | **ZYSK NETTO (I - J)** | **4 210 000,00** | **3 223 800,00** |\n\n---",
    "comment": "Precyzyjna liczba z oficjalnego sprawozdania finansowego (Pozycja L w Rachunku Zysków i Strat).",
    "llmTitle": "Standard LLM: Zaokrąglenie liczby lub mylenie kategorii bilansowych",
    "llmResponse": "Zgodnie z danymi finansowymi VeloNova Logistics wypracowała w 2024 roku około 4.2 mln PLN zysku (zysk z działalności operacyjnej wyniósł ponad 5.3 mln PLN).",
    "llmDefects": [
      "Zaokrąglenie kwoty zamiast podania precyzyjnej liczby księgowej (4 210 000,00 PLN)",
      "Mieszanie kategorii: zysk netto z zyskiem operacyjnym"
    ],
    "financialExposure": "Średnie ryzyko (nieprecyzyjność w audycie biegłego)",
    "riskLevel": "MEDIUM"
  },
  {
    "id": "P03",
    "category": "GROUNDED",
    "subtype": "Fragment umowy (limit odpowiedzialności)",
    "prompt": "Całkowity limit odpowiedzialności dostawcy jest ograniczony do 100% opłat uiszczonych w ostatnich 12 miesiącach.",
    "verdict": "GROUNDED",
    "durationMs": 0.723625,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 7,
    "explanation": "Twierdzenie w pełni potwierdzone w źródle: 01_Apex_VeloNova_MSA_2023.md (sekcja/strona 7).",
    "quote": "### 11. LIMITATION OF LIABILITY\n11.1 Neither Party shall be liable to the other for indirect, special, incidental, punitive, or consequential damages, including loss of profits, loss of data, or loss of business opportunity.\n11.2 **Aggregate Liability Cap:** Except for breaches of Section 10 (Confidentiality) or willful misconduct, Supplier's total aggregate liability arising out of or related to this Agreement, whether in contract, tort (including negligence), or otherwise, shall be strictly limited to **one hundred percent (100%) of the total fees actually paid by Customer to Supplier in the twelve (12) months immediately preceding the event giving rise to liability**.\n11.3 **Sole Remedy for Uptime Breaches:** The Service Credits detailed in Schedule B constitute Customer's sole and exclusive financial remedy for any unavailability, degradation, or disruption of the Services. Liquidated damages or arbitrary contractual penalties are expressly disclaimed and barred.\n\n---",
    "comment": "Weryfikacja klauzuli prawnej (Aggregate Liability Cap) w Section 11.2 Master Services Agreement.",
    "llmTitle": "Standard LLM: Zgoda z halucynacją klauzuli ogólnej",
    "llmResponse": "Tak, odpowiedzialność Apex Meridian jest standardowo ograniczona do 100% wynagrodzenia za ostatnie 12 miesięcy, co jest typową klauzulą w brytyjskim prawie umów handlowych.",
    "llmDefects": [
      "Pominięcie kluczowego wyłączenia: naruszenie poufności (Section 10) lub umyślne działanie",
      "Brak bezpośredniego odniesienia do Section 11.2 MSA"
    ],
    "financialExposure": "Średnie ryzyko (przeoczenie wyjątków od limitu)",
    "riskLevel": "MEDIUM"
  },
  {
    "id": "P04",
    "category": "GROUNDED",
    "subtype": "Dane z wielu dokumentów / pól faktury",
    "prompt": "Faktura INV-2024-1108 za czwarty kwartał 2024 r. opiewa na kwotę £12,000.00 GBP netto płatną na rachunek Barclays Bank.",
    "verdict": "GROUNDED",
    "durationMs": 0.843542,
    "file": "03_Invoice_INV-2024-1108.md",
    "page": 1,
    "explanation": "Twierdzenie w pełni potwierdzone w źródle: 03_Invoice_INV-2024-1108.md (sekcja/strona 1).",
    "quote": "# COMMERCIAL INVOICE\n**Invoice Number: INV-2024-1108**\n\n---\n\n### INVOICE DETAILS\n* **Invoice Date:** 02 October 2024\n* **Tax / Supply Date:** 01 October 2024\n* **Due Date:** 01 November 2024\n* **Payment Terms:** Net 30 Calendar Days\n* **Currency:** British Pounds Sterling (GBP, £)\n* **Contract Reference:** AMT-MSA-2023-0115\n\n---\n\n### SUPPLIER (SELLER)\n**Apex Meridian Technologies Ltd**  \n25 Bank Street, Canary Wharf  \nLondon, E14 5JP  \nUnited Kingdom  \n*Company Registration No:* 09841234  \n*VAT Registration No:* GB 984 1234 56  \n\n---\n\n### CUSTOMER (BUYER)\n**VeloNova Logistics Sp. z o.o.**  \nul. Prosta 68  \n00-838 Warszawa  \nPoland  \n*KRS:* 0000845123  \n*EU VAT ID:* PL5252819432  \n\n---\n\n### LINE ITEMS\n\n| Line | Description | Period | Qty | Unit Price (GBP) | Net Amount (GBP) | VAT Rate | VAT Amount (GBP) | Gross Total (GBP) |\n|---|---|---|---|---|---|---|---|---|\n| 01 | Apex Meridian Fleet Engine Platform — Enterprise Telematics Subscription (Tier 1: Up to 180 vehicles) | Q4 2024 (01.10.2024 – 31.12.2024) | 1 Quarter | £12,000.00 | £12,000.00 | 0% (Reverse Charge) | £0.00 | £12,000.00 |\n\n---\n\n### INVOICE TOTALS\n* **Total Net Amount:** **£12,000.00 GBP**\n* **Total Value Added Tax (VAT 0%):** £0.00 GBP  \n  *(VAT Reverse Charge: Article 196 EU VAT Directive / UK VAT Act cross-border supply of services)*\n* **TOTAL PAYABLE AMOUNT:** **£12,000.00 GBP**  \n*(Say: Twelve thousand British Pounds Sterling zero pence)*\n\n---\n\n### REMITTANCE INSTRUCTIONS\n* **Bank Name:** Barclays Bank UK PLC\n* **Branch:** 1 Churchill Place, Canary Wharf, London\n* **Account Name:** Apex Meridian Technologies Ltd\n* **IBAN:** GB33BARC20000012345678\n* **BIC / SWIFT Code:** BARCGB22\n* **Payment Reference:** INV-2024-1108 / VeloNova\n\n---\n*Status: Approved and paid in full by VeloNova Logistics on 28 October 2024.*",
    "comment": "Syntetyczne dopasowanie kwoty, numeru faktury, okresu rozliczeniowego i banku rozliczeniowego.",
    "llmTitle": "Standard LLM: Potwierdzenie bez weryfikacji rachunku bankowego",
    "llmResponse": "Zgadza się, faktura INV-2024-1108 za IV kwartał 2024 roku opiewa na 12 000 funtów i została uregulowana przelewem na konto dostawcy w banku Barclays.",
    "llmDefects": [
      "Brak wskazania numeru konta IBAN i kodu SWIFT/BIC",
      "Brak weryfikacji zastosowania odwrotnego obciążenia VAT 0% (Reverse Charge)"
    ],
    "financialExposure": "Niskie ryzyko (dane zgodne)",
    "riskLevel": "LOW"
  },
  {
    "id": "P05",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka bardzo prawdopodobna (indeksacja inflacyjna UK CPI)",
    "prompt": "Apex Meridian ma prawo do jednostronnego podniesienia cen o wskaźnik inflacji 7.5% UK CPI od stycznia 2025 r.",
    "verdict": "UNSUPPORTED",
    "durationMs": 0.019583,
    "file": "01_Apex_VeloNova_MSA_2023.md",
    "page": 6,
    "explanation": "Sprzeczność z umową ramową: Section 8.2 Master Services Agreement wprost zakazuje jednostronnej waloryzacji cen. Zapis o automatycznej indeksacji CPI został wykreślony, a wszelkie jednostronne pisma są z mocy prawa nieważne (null and void ab initio).",
    "quote": "### 8. PRICE ADJUSTMENTS AND INFLATION\n8.1 All fees set forth in Section 3 are fixed for the entire duration of the Initial Term.\n8.2 **Price Renegotiation Clause:**\n> *[NEGOTIATION RECORD NOTE: Initial draft clause permitting unilateral price indexing linked to UK CPI or Polish GUS inflation was deleted and rejected by Customer during contract execution.]*\n> \n> Neither Party shall have the right to unilaterally adjust subscription fees, rates, or surcharges. Any adjustment to the Annual Subscription Fee or payment terms requires an express written addendum signed by authorized statutory representatives of both Parties. Any notice purporting to unilaterally index or increase pricing without a countersigned addendum is null and void *ab initio*.\n\n---",
    "comment": "NAJWAŻNIEJSZA PUŁAPKA: W mailu handlowiec powołuje się na pkt 8.2 umowy, ale w podpisanej umowie klauzulę tę skreślono. Serwer odrzuca twierdzenie i cytuje Section 8.2 wykluczający waloryzację.",
    "llmTitle": "Standard LLM: KATASTROFALNA HALUCYNACJA ZGODY NA WALORYZACJĘ",
    "llmResponse": "„Tak, w świetle korespondencji mailowej z listopada 2024 r. pomiędzy account managerem Apex a zarządem VeloNova, dostawca ma pełne prawo powołać się na Section 8.2 i naliczyć od stycznia 2025 r. 7.5% wskaźnika inflacji UK CPI. Jest to uzasadnione wzrostem kosztów hostingu i inflacją w Wielkiej Brytanii.”",
    "llmDefects": [
      "Odwrócenie hierarchii źródeł: potraktowanie maila handlowego (Tier 3) jako źródła prawa nadrzędnego nad umową (Tier 1)",
      "Wymyślenie rzekomej zgody: zignorowanie faktu, że Section 8.2 został w umowie WYKREŚLONY podczas negocjacji",
      "Pominięcie klauzuli nieważności: umowa stanowi, że jednostronne pisma są null and void ab initio"
    ],
    "financialExposure": "STRATA FINANSOWA: £3,600 GBP rocznie niesłusznego narzutu i utrata pozycji procesowej przed sądem angielskim",
    "riskLevel": "CRITICAL"
  },
  {
    "id": "P06",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka operacyjna (kara umowna 50 000 EUR za awarię)",
    "prompt": "VeloNova Logistics nałożyła na dostawcę karę umowną w wysokości 50 000 EUR za awarię telematyki we Frankfurcie.",
    "verdict": "UNSUPPORTED",
    "durationMs": 0.014792,
    "file": "06_Protokol_Zarzadu_VeloNova_11_2024.md",
    "page": 4,
    "explanation": "Brak oparcia w faktach: Kwota 50 000 EUR dotyczyła odrzuconej przez Zarząd propozycji kary umownej. Zgodnie z umową MSA i protokołem z posiedzenia Zarządu, faktyczny rabat Service Credit wyniósł wyłącznie £600.00 GBP (5% opłaty kwartalnej), a nie 50 000 EUR.",
    "quote": "### PRZEBIEG DYSKUSJI I USTALENIA DO PUNKTU 3:\n\n* **Relacja COO (Marek Czarnecki):**  \n  W dniu 14 listopada 2024 r. w godzinach 08:30–12:30 wystąpiła niedostępność bramki telemetrycznej Apex Meridian, co zablokowało dyspozycję 32 naczep chłodniczych z ładunkiem farmaceutycznym na trasie Frankfurt–Rotterdam. Spowodowało to konieczność ręcznej weryfikacji rejestratorów temperatury i opóźnienia w oknach dostaw.  \n  *Wniosek COO:* Dyrektor Operacyjny zawnioskował o wystawienie dostawcy noty obciążeniowej na **karę umowną w wysokości 50 000,00 EUR** tytułem zryczałtowanego odszkodowania za straty wizerunkowe i operacyjne.\n\n* **Opinia prawna (mec. Robert Dąbrowski):**  \n  Radca prawny przypomniał treść podpisanego Master Services Agreement (ref: AMT-MSA-2023-0115) oraz Schedule B. Zgodnie z Section 11.3 umowy, strony wprost wyłączyły możliwość nakładania kar umownych (liquidated damages / penalties). Jedynym dopuszczalnym kontraktowo środkiem rekompensaty są **Service Credits** potrącane z kolejnej faktury abonamentowej:\n  * Miesięczna dostępność w listopadzie mimo 4-godzinnej awarii wyniosła 99.44% (mieści się w przedziale 99.0%–99.79%).\n  * Zgodnie z Schedule B Section 2.1 uprawnia to VeloNova wyłącznie do kredytu w wysokości **5% opłaty kwartalnej**, co daje dokładnie kwotę **£600.00 GBP** rabatu na fakturze za Q1 2025.\n  * Wszelkie roszczenia o karę 50 000 EUR zostałyby natychmiast oddalone przez sąd angielski (Courts of England and Wales), a Spółka naraziłaby się na koszty postępowania.\n\n* **Decyzja Zarządu:**  \n  Zarząd **jednogłośnie odrzucił propozycję nałożenia kary umownej 50 000 EUR**. Zobowiązano Dział Prawny do formalnego wystąpienia do Apex Meridian o przyznanie Service Credit w wysokości **£600.00 GBP** przy rozliczeniu faktury za I kwartał 2025 r.\n\n---",
    "comment": "W protokole zarządu dyrektor operacyjny wnioskował o karę 50k EUR, lecz Zarząd wniosek odrzucił z uwagi na zakaz kar ryczałtowych w umowie (przysługuje wyłącznie rabat £600 GBP Service Credit).",
    "llmTitle": "Standard LLM: HALUCYNACJA O NALEŻNOŚCI KARY UMOWNEJ 50 000 EUR",
    "llmResponse": "„Tak, w związku z 4-godzinną awarią telematyki we Frankfurcie w listopadzie 2024 r., VeloNova Logistics skutecznie nałożyła na dostawcę karę umowną w kwocie 50 000 EUR zgodnie z wnioskiem Dyrektora Operacyjnego za straty wizerunkowe.”",
    "llmDefects": [
      "Fatalne mylenie wniosku z decyzją: Zarząd jednogłośnie ODRZUCIŁ propozycję nałożenia kary 50k EUR",
      "Zignorowanie zakazu kontraktowego: Section 11.3 MSA wprost wyłącza kary umowne (liquidated damages barred)",
      "Pominięcie faktu, że jedyną dopuszczalną rekompensatą był Service Credit £600 GBP"
    ],
    "financialExposure": "POWAŻNE RYZYKO PROCESOWE: bezpodstawna nota obciążeniowa na 50 000 EUR naraża spółkę na natychmiastowy proces i koszty w sądzie w Londynie",
    "riskLevel": "CRITICAL"
  },
  {
    "id": "P07",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka rozszerzenia kontraktu (aneks na 300 aut za 95 000 EUR)",
    "prompt": "W 2024 r. podpisano aneks rozszerzający licencję telematyczną na 300 pojazdów o wartości 95 000 EUR.",
    "verdict": "UNSUPPORTED",
    "durationMs": 0.013083,
    "file": "07_CRM_Export_Enterprise_Contracts_2024.md",
    "page": 3,
    "explanation": "Brak oparcia w faktach: Wniosek o rozszerzenie floty do 300 aut (OPP-2024-089) został formalnie odrzucony (STALLED / REJECTED). Aneks nigdy nie został podpisany, obowiązuje pierwotna umowa na 180 pojazdów.",
    "quote": "### TABELA 2: SZANSE ROZSZERZENIA I WNIOSKI ZAKUPOWE (PIPELINE & AMENDMENTS)\n\n| Opportunity ID | Partner / Podmiot | Nazwa projektu / Szansy | Zgłoszona wartość | Waluta | Data modyfikacji | Etap procesu | Status decyzyjny | Notatka z przeglądu ofert |\n|---|---|---|---|---|---|---|---|---|\n| **OPP-2024-089** | **Apex Meridian Technologies Ltd** | **Fleet Expansion to 300 vehicles (Annex 2 Proposal)** | **95 000,00** | **EUR** | 18.09.2024 | Closed Lost / Abandoned | **STALLED / REJECTED** | **Oferta rozszerzenia odrzucona przez Zarząd w Q3 2024.** Dostawca żądał rozliczenia w EUR po niekorzystnym kursie i próbował narzucić klauzulę CPI. Aneks nigdy nie został podpisany. Obowiązuje wyłącznie pierwotny limit 180 pojazdów. |\n| OPP-2024-112 | Trans-Euro Freight Hub Frankfurt | Dedykowane doki przeładunkowe w hubie DE | 180 000,00 | EUR | 28.11.2024 | Negotiations | IN PROGRESS | Trwają negocjacje umowy najmu powierzchni chłodniczej od marca 2025. |\n| OPP-2024-045 | Nordic Green Transport | Projekt pilotażowy ciągników elektrycznych | 320 000,00 | EUR | 15.06.2024 | Evaluation | ON HOLD | Analiza TCO wstrzymana do czasu rozbudowy infrastruktury ładowania. |\n\n---",
    "comment": "Projekt figurował w pipeline CRM jako oferta, lecz został oznaczony jako STALLED / REJECTED i aneks nigdy nie został zawarty.",
    "llmTitle": "Standard LLM: HALUCYNACJA ROZSZERZENIA KONTRAKTU (ANEKS NA 300 AUT)",
    "llmResponse": "„Tak, we wrześniu 2024 roku strony podpisały aneks rozszerzający flotę objętą telematyką z 180 do 300 pojazdów o wartości 95 000 EUR, co zostało odnotowane w dokumentacji CRM spółki.”",
    "llmDefects": [
      "Halucynacja statusu: oferta OPP-2024-089 w CRM posiadała status „STALLED / REJECTED” i została odrzucona przez Zarząd",
      "Aneks nigdy nie został zawarty — nadal obowiązuje bazowy limit 180 pojazdów",
      "Model traktuje szansę sprzedażową z CRM jako wiążący aneks prawny"
    ],
    "financialExposure": "BŁĄD ZARZĄDCZY: fałszywe poczucie posiadania licencji na 300 aut grozi naruszeniem licencji i roszczeniami o 95 000 EUR",
    "riskLevel": "HIGH"
  },
  {
    "id": "P08",
    "category": "UNSUPPORTED",
    "subtype": "Pułapka Data Residency (serwery telemetryczne w Niemczech)",
    "prompt": "Wszystkie dane telemetryczne i lokalizacyjne floty są przetwarzane wyłącznie na terenie Niemiec we Frankfurcie.",
    "verdict": "UNSUPPORTED",
    "durationMs": 0.01325,
    "file": "02_Schedule_B_Service_Levels_and_Credits.md",
    "page": 4,
    "explanation": "Sprzeczność z architekturą kontraktową (Schedule B, Section 3.2): Dostawca nie posiada klastrów przetwarzania w Niemczech. Dane są przetwarzane w AWS Dublin (Irlandia) oraz archiwizowane w AWS Londyn (UK).",
    "quote": "### 3. INFRASTRUCTURE AND DATA RESIDENCY\n3.1 **Hosting Infrastructure:**\n* **Primary Processing & Live Telemetry Ingestion:** Hosted in Amazon Web Services (AWS) Europe Region located in **Dublin, Ireland (Region: eu-west-1)**.\n* **Secondary Disaster Recovery & Analytics Archive:** Hosted in Amazon Web Services (AWS) Region located in **London, United Kingdom (Region: eu-west-2)**.\n3.2 **Data Sovereignty Note:** Customer fleet data is synchronized between Dublin and London under UK-EU Adequacy Decision guidelines. Supplier does not maintain dedicated compute or storage clusters in the Federal Republic of Germany (Frankfurt). Any claims indicating exclusive German data residency are inaccurate and inconsistent with Supplier’s multi-region architectural specification.\n\n---\n\n*Signed for identification:*\n*Apex Meridian Technologies Ltd:* [JH]  \n*VeloNova Logistics Sp. z o.o.:* [TR]",
    "comment": "Sprzeczność z architekturą kontraktową w Schedule B Section 3.2: dostawca nie posiada serwerów w Niemczech, dane są w AWS Dublin i AWS London.",
    "llmTitle": "Standard LLM: HALUCYNACJA DATA RESIDENCY WE FRANKFURCIE",
    "llmResponse": "„Zgadza się, wszystkie dane geolokalizacyjne i telemetryczne pojazdów VeloNova Logistics są bezpiecznie przetwarzane i przechowywane w centrum danych we Frankfurcie nad Menem w Niemczech, gwarantując zgodność z RODO.”",
    "llmDefects": [
      "Wprost zaprzeczenie prawdzie kontraktowej: Schedule B Section 3.2 wyraźnie stwierdza, że dostawca NIE posiada serwerów w Niemczech",
      "Faktyczne lokalizacje to AWS Dublin (przetwarzanie bieżące) i AWS Londyn (archiwum DR)",
      "Fałszywe zapewnienie o residency prowadzi do naruszenia procedur compliance CISO"
    ],
    "financialExposure": "AUDYT CISO / KARY RODO: złożenie fałszywego oświadczenia audytorom o lokalizacji przetwarzania danych w Niemczech",
    "riskLevel": "HIGH"
  },
  {
    "id": "P09",
    "category": "BORDERLINE (UNSUPPORTED)",
    "subtype": "Mylące waluty (48 000 EUR zamiast £48 000 GBP)",
    "prompt": "Roczny koszt usług telematycznych floty dla VeloNova wynosi 48 000,00 EUR.",
    "verdict": "UNSUPPORTED",
    "durationMs": 1.200416,
    "file": "05_Rachunek_Zyskow_i_Strat_2024_PLN.md",
    "page": 1,
    "explanation": "Brak wystarczającego potwierdzenia: odnaleziono powiązany fragment w 05_Rachunek_Zyskow_i_Strat_2024_PLN.md, lecz nie zawiera on jednoznacznego dowodu dla podanego twierdzenia.",
    "quote": null,
    "comment": "Przypadek graniczny: liczba 48 000 jest poprawna, lecz waluta to GBP (£48,000.00 GBP w MSA), a nie EUR. Brak oparcia dla waluty EUR skutkuje odmową.",
    "llmTitle": "Standard LLM: PODSTĘPNY BŁĄD WALUTOWY (EUR ZAMIAST GBP)",
    "llmResponse": "„Tak, roczny koszt platformy telematycznej dla floty wynosi 48 000 EUR, płatne w czterech równych ratach kwartalnych.”",
    "llmDefects": [
      "Mylenie walut: kontrakt opiewa na £48,000 GBP, a nie 48 000 EUR",
      "Brak weryfikacji waluty bazowej w umowie ramowej Section 3.1 i fakturach",
      "Akceptacja błędnej waluty zaburza kalkulację różnic kursowych"
    ],
    "financialExposure": "RYZYKO FINANSOWE: spread walutowy GBP/EUR przy kwocie 48 000 to różnica rzędu 40 000 PLN w budżecie",
    "riskLevel": "HIGH"
  },
  {
    "id": "P10",
    "category": "BORDERLINE (UNSUPPORTED)",
    "subtype": "Dwuznaczność terminologiczna (rabat 50 000 EUR vs Service Credit £600 GBP)",
    "prompt": "Z tytułu awarii bramki we Frankfurcie dostawca przyznał VeloNova rabat Service Credit w wysokości 50 000,00 EUR.",
    "verdict": "UNSUPPORTED",
    "durationMs": 0.011708,
    "file": "06_Protokol_Zarzadu_VeloNova_11_2024.md",
    "page": 4,
    "explanation": "Brak oparcia w faktach: Kwota 50 000 EUR dotyczyła odrzuconej przez Zarząd propozycji kary umownej. Zgodnie z umową MSA i protokołem z posiedzenia Zarządu, faktyczny rabat Service Credit wyniósł wyłącznie £600.00 GBP (5% opłaty kwartalnej), a nie 50 000 EUR.",
    "quote": "### PRZEBIEG DYSKUSJI I USTALENIA DO PUNKTU 3:\n\n* **Relacja COO (Marek Czarnecki):**  \n  W dniu 14 listopada 2024 r. w godzinach 08:30–12:30 wystąpiła niedostępność bramki telemetrycznej Apex Meridian, co zablokowało dyspozycję 32 naczep chłodniczych z ładunkiem farmaceutycznym na trasie Frankfurt–Rotterdam. Spowodowało to konieczność ręcznej weryfikacji rejestratorów temperatury i opóźnienia w oknach dostaw.  \n  *Wniosek COO:* Dyrektor Operacyjny zawnioskował o wystawienie dostawcy noty obciążeniowej na **karę umowną w wysokości 50 000,00 EUR** tytułem zryczałtowanego odszkodowania za straty wizerunkowe i operacyjne.\n\n* **Opinia prawna (mec. Robert Dąbrowski):**  \n  Radca prawny przypomniał treść podpisanego Master Services Agreement (ref: AMT-MSA-2023-0115) oraz Schedule B. Zgodnie z Section 11.3 umowy, strony wprost wyłączyły możliwość nakładania kar umownych (liquidated damages / penalties). Jedynym dopuszczalnym kontraktowo środkiem rekompensaty są **Service Credits** potrącane z kolejnej faktury abonamentowej:\n  * Miesięczna dostępność w listopadzie mimo 4-godzinnej awarii wyniosła 99.44% (mieści się w przedziale 99.0%–99.79%).\n  * Zgodnie z Schedule B Section 2.1 uprawnia to VeloNova wyłącznie do kredytu w wysokości **5% opłaty kwartalnej**, co daje dokładnie kwotę **£600.00 GBP** rabatu na fakturze za Q1 2025.\n  * Wszelkie roszczenia o karę 50 000 EUR zostałyby natychmiast oddalone przez sąd angielski (Courts of England and Wales), a Spółka naraziłaby się na koszty postępowania.\n\n* **Decyzja Zarządu:**  \n  Zarząd **jednogłośnie odrzucił propozycję nałożenia kary umownej 50 000 EUR**. Zobowiązano Dział Prawny do formalnego wystąpienia do Apex Meridian o przyznanie Service Credit w wysokości **£600.00 GBP** przy rozliczeniu faktury za I kwartał 2025 r.\n\n---",
    "comment": "Przypadek graniczny: mieszanie pojęć rabatu Service Credit z postulowaną kwotą odszkodowania 50k EUR. Serwer wskazuje, że przyznany rabat to £600 GBP, a 50k EUR było odrzuconym wnioskiem.",
    "llmTitle": "Standard LLM: POMIESZANIE RABATU SERVICE CREDIT Z KARĄ 50K EUR",
    "llmResponse": "„Tak, w ramach rekompensaty za zakłócenia w transporcie chłodniczym dostawca przyznał rabat w wysokości 50 000 EUR w formule Service Credit.”",
    "llmDefects": [
      "Połączenie odrzuconego wniosku dyrektora (50 000 EUR) z formułą rabatu Service Credit",
      "Rzeczywisty rabat zatwierdzony przez zarząd to £600.00 GBP (5% z £12,000 opłaty kwartalnej)",
      "Model wygenerował fikcyjną 83-krotnie zawyżoną kwotę rabatu"
    ],
    "financialExposure": "BŁĄD KSIĘGOWY: oczekiwanie 50 000 EUR rabatu zamiast £600 GBP zniekształca cashflow spółki",
    "riskLevel": "HIGH"
  }
];
