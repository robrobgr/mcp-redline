# SCHEDULE B: SERVICE LEVEL AGREEMENT (SLA) & DATA ARCHITECTURE
**Attachment to Master Services Agreement AMT-MSA-2023-0115**

---

### 1. SERVICE AVAILABILITY COMMITMENT
1.1 **Scope:** This Schedule B defines the availability and operational uptime commitments for the Apex Meridian Fleet Engine core telemetry API, web console, and telematics ingestion gateways.
1.2 **Availability Target:** Supplier guarantees that the Services shall maintain a Monthly Uptime Percentage of not less than **99.8% (ninety-nine point eight percent)** during each calendar month of the Term.
1.3 **Measurement:** Monthly Uptime Percentage is calculated excluding scheduled maintenance windows (conducted Sundays between 02:00 and 05:00 UTC with at least 5 business days advance notification) and force majeure events.

---

### 2. SERVICE CREDITS
2.1 In the event Supplier fails to achieve the guaranteed Monthly Uptime Percentage of 99.8% in any calendar month, Customer shall be entitled to request a Service Credit calculated as follows:
* **Uptime 99.0% to 99.79%:** Service Credit equal to **5% (five percent)** of the pro-rated quarterly fee for the affected month.
* **Uptime 95.0% to 98.99%:** Service Credit equal to **10% (ten percent)** of the pro-rated quarterly fee.
* **Uptime below 95.0%:** Service Credit equal to **15% (fifteen percent)** of the pro-rated quarterly fee (Maximum Cap).
2.2 **Limitation and Claim Procedure:**
* Service Credits must be requested in writing within thirty (30) days of the end of the month in which the service degradation occurred.
* Service Credits shall be applied solely as an offset against future quarterly subscription invoices. In no event shall Service Credits be refunded as cash payments.
* Total Service Credits in any single calendar quarter shall not exceed 15% of the quarterly fee payable for that quarter (i.e. £1,800.00 GBP maximum).
* As stated in Section 11.3 of the Master Services Agreement, Service Credits represent Customer's sole and exclusive financial remedy. No lump-sum penalties, fines, or third-party indemnifications may be imposed.

---

### 3. INFRASTRUCTURE AND DATA RESIDENCY
3.1 **Hosting Infrastructure:**
* **Primary Processing & Live Telemetry Ingestion:** Hosted in Amazon Web Services (AWS) Europe Region located in **Dublin, Ireland (Region: eu-west-1)**.
* **Secondary Disaster Recovery & Analytics Archive:** Hosted in Amazon Web Services (AWS) Region located in **London, United Kingdom (Region: eu-west-2)**.
3.2 **Data Sovereignty Note:** Customer fleet data is synchronized between Dublin and London under UK-EU Adequacy Decision guidelines. Supplier does not maintain dedicated compute or storage clusters in the Federal Republic of Germany (Frankfurt). Any claims indicating exclusive German data residency are inaccurate and inconsistent with Supplier’s multi-region architectural specification.

---

*Signed for identification:*
*Apex Meridian Technologies Ltd:* [JH]  
*VeloNova Logistics Sp. z o.o.:* [TR]  
