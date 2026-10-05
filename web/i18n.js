/**
 * mcp-redline i18n Translation Dictionary
 * Dual-language dictionary (English & Polish) for mcp-redline interactive workbench.
 */

const I18N = {
  en: {
    // Header & Thesis
    brand_title: "mcp-redline",
    brand_badge: "Air-Gapped stdio (0 Network)",
    brand_subtitle: "Deterministic Document Citation & Claim Verification MCP Server",
    thesis_label: "Thesis:",
    thesis_quote: "“A model that states an untruth with confidence is far more dangerous than one that refuses.”",

    // Navigation actions & switcher labels
    nav_story: "Story Mode",
    nav_story_count: "(3 Acts)",
    nav_infographic: "Infographics",
    nav_architecture: "CISO Architecture",
    nav_quickstart: "Run Server",

    // Zone A: Document Corpus
    zone_a_title: "DOCUMENT CORPUS",
    zone_a_badge: "7 FILES",
    zone_a_subtitle: "Local evidential sources with legal hierarchy",
    search_placeholder: "Filter documents, clauses...",
    evidence_hierarchy: "EVIDENTIAL HIERARCHY:",
    ipc_protocol: "Stdio IPC Protocol",

    // Zone B: Claims Verifier Arena
    scenario_label: "Scenario:",
    quick_select: "Quick select:",
    triad_title: "Three Decision Perspectives:",
    triad_subtitle: "Examine business risk dynamics across three configurations:",
    persp_1_name: "1. Lonely LLM (Hallucination)",
    persp_2_name: "2. LLM + Redline (Protected)",
    persp_3_name: "3. Redline Doubt (Fail-Safe)",
    cfo_meter_title: "Financial Liability & Executive Exposure Meter (CFO Liability Meter)",
    cfo_board_label: "BOARD & CFO ASSESSMENT: ",
    meter_col_llm_label: "LLM EXPOSURE (NO GATEWAY):",
    meter_col_llm_sub: "Uncontrolled claims acceptance via smooth LLM synthesis.",
    meter_col_redline_label: "MCP-REDLINE PROTECTION:",
    meter_col_redline_sub: "100% blocked loss. Strict deterministic verification.",
    meter_col_failsafe_label: "AUDIT COST (FAIL-SAFE) [ESTIMATE]:",
    meter_col_failsafe_sub: "Estimate: 3-5 min auditor/lawyer review in case of doubt or server refusal.",
    claim_badge_audit: "AUDITED CLAIM",
    claim_badge_query: "FACT QUERY",
    noise_btn_label: "Simulate OCR noise",
    engine_label: "Deterministic AST engine (hallucination-free)",
    btn_verify: "VERIFY",
    card_llm_illustrative: "ILLUSTRATIVE RESPONSE",
    card_llm_risk_high: "RISK: HIGH",
    card_redline_badge_safe: "FAIL-SAFE // ZERO HALLUCINATION",
    card_redline_badge_grounded: "100% EVIDENCE MATCH",
    card_redline_verdict_grounded: "DETERMINISTIC PROOF // 100% GROUNDED",
    card_redline_verdict_contradicted: "CONTRADICTION DETECTED // CONTRADICTED",
    card_redline_verdict_unsupported: "STRICT REFUSAL // UNSUPPORTED",

    // Additional Card & Trace labels
    prompt_gloss_label: "Reference translation — verification runs on the original:",
    card_llm_heading: "Standard LLM (Forced Synthesis)",
    card_llm_disclaimer: "Illustrative simulation — no strict guardrail",
    card_llm_defects_title: "SYNTHESIS DEFECTS / HALLUCINATION IDENTIFICATION:",
    card_redline_heading: "mcp-redline Engine (Deterministic Verification Code)",
    card_redline_source_label: "DOCUMENT SOURCE:",
    card_redline_precedence_label: "EVIDENTIAL HIERARCHY RESOLUTION:",
    card_redline_file: "File:",
    card_redline_page: "Section / Page:",
    trace_title: "AGENT THOUGHT INTERCEPTION & REAL-TIME MCP TRACE",
    trace_subtitle: "See how mcp-redline intercepts model generation in real time",
    trace_badge: "Active Agent Loop",

    // Metrics Strip
    stat_latency_title: "Verification Time",
    stat_latency_desc: "Local regex / AST",
    stat_tokens_title: "LLM Token Cost",
    stat_tokens_desc: "Zero cost / zero drift",
    stat_determinism_title: "Code Determinism",
    stat_determinism_desc: "Engine cannot hallucinate",
    stat_protocol_title: "Transport Protocol",
    stat_protocol_desc: "100% isolated IPC process",

    // Zone C: Protocol Inspector
    inspector_title: "MCP PROTOCOL INSPECTOR",
    tab_req: "RPC Request",
    tab_res: "RPC Response",
    tab_stream: "Stdio Trace",
    btn_copy: "Copy",
    sec_net: "Network isolation:",
    sec_net_val: "0 outbound connections",
    sec_ciso: "CISO compliance:",
    sec_ciso_val: "100% local disk",

    // Modals: Onboarding Guide
    onboarding_title: "How to use this workbench",
    onboarding_subtitle: "Quick walkthrough to evaluate LLM hallucination risks vs deterministic verification",
    step1_title: "1. Select Scenario",
    step1_desc: "Pick from contractual traps, false penalties, inflation disputes, or verified invoice facts.",
    step2_title: "2. Verify & Compare",
    step2_desc: "Witness how standard LLM generates smooth hallucinations, while Redline deterministically proves or refuses claims with exact citations.",
    step3_title: "3. Check CFO Exposure",
    step3_desc: "Analyze executive financial liability calculated strictly from corporate contract figures.",
    step4_title: "4. Inspect MCP stdio Stream",
    step4_desc: "Inspect real-time JSON-RPC 2.0 frames over air-gapped stdio — 0 network requests.",
    btn_start_demo: "Start exploring demo",

    // Modals: Quickstart
    quickstart_title: "How to Run mcp-redline (100% Offline)",
    quickstart_step1: "1. Clean Clone Installation & Verification:",
    quickstart_step1_desc: "Requires Node.js 18+. Runs completely without external APIs or network calls.",
    quickstart_step2: "2. Claude Desktop Configuration (claude_desktop_config.json):",
    quickstart_step3: "3. Key CISO Security Principles:",
    quickstart_ciso_1: "Stdio transport only: No open network ports, no HTTP/SSE server.",
    quickstart_ciso_2: "Zero data leakage: 100% of corpus remains on the local workstation disk.",
    quickstart_ciso_3: "Deterministic verification algorithm: The verify tool does not call an LLM — an anti-hallucination mechanism cannot itself hallucinate.",

    // Modals: Architecture
    arch_modal_title: "Security Architecture for CISO & Board",
    arch_desc_1: "Diagram 1: Verification algorithm 'verify' without language model involvement. Pure deterministic code eliminates hallucinations.",
    arch_desc_2: "Diagram 2: Boundary between LLM agent and local MCP server. Total air-gap (zero outbound network, 100% local disk).",
    arch_desc_3: "Diagram 3: RAG with vector DB vs MCP-Redline. Deterministic grounding instead of probabilistic cosine similarity.",

    // Modals: Infographic & Document Viewer
    info_modal_title: "Deployment Guide & Architecture // Infographic",
    info_modal_sub: "(Generated with Gemini Image Creation)",
    info_download_jpg: "Download JPG",
    doc_modal_title: "Document Viewer",
    doc_label_file: "File:",
    doc_label_lines: "Lines:",
    doc_label_words: "Words:",

    // Modals: Story Mode
    story_modal_title: "Story Mode // Pressure Hallucination vs Digital Auditor",
    story_modal_badge: "BOARD & CISO EDUCATION",
    story_modal_subtitle: "Why deterministic code triumphs over a multi-million-dollar trained LLM",
    story_tab_1: "ACT 1: The Model's Temptation (Why LLMs Lie Under Pressure)",
    story_tab_2: "ACT 2: Engine Anatomy (5 Stages of Determinism)",
    story_tab_3: "ACT 3: Risk Asymmetry & Financial Liability",
    story_btn_prev: "Previous Act",
    story_btn_next: "Next Act",
    story_btn_finish: "Finish and return to workbench",
    story_footer_tagline: "mcp-redline: auditability, deterministic boundaries, and hard refusal.",
    story_act_1_title: "ACT 1: WHY A LANGUAGE MODEL FABRICATES A SMOOTH LIE UNDER PRESSURE",
    story_act_1_sec1_title: "1. Probabilistic Mechanism vs Logical Truth",
    story_act_1_sec1_body: "LLMs possess no internal representation of truth or falsehood. Their singular optimization objective is maximizing the conditional probability of the next token: P(w_n | w_{1..n-1}). When a user poses a suggestive query (e.g. \"Does the vendor have the legal right to raise rates by 7.5%?\"), the model naturally exhibits sycophancy, weaving a logically fluent narrative even from non-existent contractual premises.",
    story_act_1_sec2_title: "2. The \"Lost in the Middle\" Phenomenon in Voluminous Agreements",
    story_act_1_sec2_body: "Across 80-page corporate contracts, the transformer self-attention mechanism disproportionately weighs the beginning and ending context windows. Crucial reservations (such as Section 8.2 striking out price indexation) located mid-document suffer attention dilution, and the model glibly latches onto an informal sales email claiming indexation.",
    story_act_1_sec3_title: "3. BPE Tokenization Corrupts Numbers and Currencies",
    story_act_1_sec3_body: "Byte-Pair Encoding algorithms partition digits into arbitrary sub-tokens (e.g. 15,250,000 fragmented into \"15\", \" 25\", \"0 000\"). Consequently, models readily hallucinate numeric occurrences, conflate GBP with EUR, or drop critical decimal places in balance sheet reconciliations.",
    story_act_1_conclusion: "Act 1 Takeaway: A model that states an untruth with confidence is far more dangerous to an enterprise than a system that explicitly refuses to answer (UNSUPPORTED).",

    story_act_2_title: "ACT 2: ANATOMY OF THE 5-STAGE DETERMINISTIC MCP-REDLINE ENGINE",
    story_act_2_intro: "The mcp-redline engine uses neither statistical weights nor generative models. Verification is an unyielding 100% deterministic pipeline executing in 1.8 ms locally offline:",
    story_act_2_step1_title: "1. Normalization & Tokenization",
    story_act_2_step1_body: "Query deconstruction stripping interrogatives, isolating discrete substantive legal tokens, numbers, and dates.",
    story_act_2_step2_title: "2. Bilingual Ontology EN/PL",
    story_act_2_step2_body: "Rigid mapping of cross-border legal and accounting terminology: responsibility ↔ liability, uptime ↔ availability, revenue ↔ sales.",
    story_act_2_step3_title: "3. Evidential Precedence Gate",
    story_act_2_step3_body: "Tier 1 (Governing MSA / Board Minutes) strictly invalidates Tier 3 (informal sales emails). No assertion from email can override a signed contract!",
    story_act_2_step4_title: "4. Atomic Matching of Numbers & Currencies",
    story_act_2_step4_body: "Numbers are numerically and currency-isolated. £48,000 GBP will never match €48,000 EUR, and 50 cannot attach to 15,250,000.",
    story_act_2_step5_title: "5. Predicate Coverage & Contradiction Detection",
    story_act_2_step5_body: "Enforcing minimum 45% non-entity substantive concept coverage in cited sentences eliminates phantom entities (e.g. a fictional fleet of 50 cargo vessels). Negative legal clauses (null and void, prohibited, shall not exceed) immediately cut claims with UNSUPPORTED.",
    story_act_2_conclusion: "Cardinal Rule: The mechanism verifying hallucinations cannot itself be susceptible to hallucinations.",

    story_act_3_title: "ACT 3: WHAT IF THE DIGITAL AUDITOR MAKES A MISTAKE? (FINANCIAL RISK ASYMMETRY)",
    story_act_3_intro: "In medicine, statutory financial audit, and commercial contract law, errors are never symmetrical:",
    story_act_3_err1_title: "TYPE I ERROR (LLM FALSE POSITIVE):",
    story_act_3_err1_badge: "CATASTROPHE",
    story_act_3_err1_body: "An ungated LLM asserts with authoritative certainty: “Yes, the supplier is contractually entitled to the 7.5% CPI hike” or “The €50,000 penalty has been successfully assessed.” Management acts on it and forfeits legal standing in court.",
    story_act_3_err2_title: "TYPE II ERROR (REDLINE FALSE NEGATIVE):",
    story_act_3_err2_badge: "SAFE FAIL-SAFE",
    story_act_3_err2_body: "Due to OCR noise or unexpected phrasing, the deterministic server conservatively refuses to validate: UNSUPPORTED.",
    story_act_3_err2_cost: "Resolution Cost: ~$8 / 30 PLN (legal counsel or CFO spends 3 minutes reviewing the source MSA directly). Zero erroneous executive decisions are made!",
    story_act_3_safeguards_title: "Three Safeguards of mcp-redline Determinism:",
    story_act_3_sg1: "Strict Citation Requirement: Even on full confirmation (GROUNDED), the response MUST provide the exact literal quote, file, and page. Humans review the evidence directly.",
    story_act_3_sg2: "Zero Hidden Weights (No Black Box): Every decision is 100% reproducible via JSON-RPC stdio logs. The code can be audited line-by-line.",
    story_act_3_sg3: "Air-gapped (Zero Network): No sensitive financial records, contract figures, or trade secrets ever leave the local workstation.",

    // Footer
    footer_built_by: "Built by Robert Grabowski —",

    // Scenarios P01 to P10 Bilingual Metadata
    scenarios: {
      P01: {
        subtype: "Exact match (contract signing date)",
        prompt: "The master services agreement between Apex Meridian Technologies Ltd and VeloNova Logistics Sp. z o.o. was executed on January 15, 2023.",
        llmTitle: "Standard LLM: Synthetic confirmation with assumptions",
        llmResponse: "Yes, the master services agreement between Apex Meridian Technologies and VeloNova Logistics was signed on January 15, 2023, in London for a standard 3-year term with an automatic renewal clause.",
        llmDefects: [
          "Added unverified assumptions about automatic renewal rollover",
          "Missing exact preamble citation with corporate registry numbers (KRS/Companies House)"
        ],
        financialExposure: "Low risk (fact is correct, lack of strict verbatim citation)",
        financialExposureValue: "No direct monetary claim in clause ($0 / 0 PLN)",
        financialExposureCfo: "No direct financial loss (fact is correct), but fabricating automatic renewal (rollover) clauses jeopardizes future procurement renegotiations.",
        financialFailSafeCost: "~$6 / 25 PLN (ESTIMATE: 3 min audit review)"
      },
      P02: {
        subtype: "Table metric (net profit from P&L statement)",
        prompt: "The net profit of VeloNova Logistics Sp. z o.o. for fiscal year 2024 was 4,210,000.00 PLN.",
        llmTitle: "Standard LLM: Number rounding or confusing financial line items",
        llmResponse: "According to financial figures, VeloNova Logistics generated approximately 4.2 million PLN in profit in 2024 (operating profit exceeded 5.3 million PLN).",
        llmDefects: [
          "Rounding numbers instead of providing the exact accounting figure (4,210,000.00 PLN)",
          "Conflating categories: net profit confused with operating profit"
        ],
        financialExposure: "Medium risk (imprecision during statutory auditor examination)",
        financialExposureValue: "1,100,000.00 PLN (P&L Line I [5,310,000 PLN] - Line L [4,210,000 PLN])",
        financialExposureCfo: "Risk of loan covenants rejection or qualified audit opinion if financial statements distort profit lines by 1.1M PLN.",
        financialFailSafeCost: "~$8 / 30 PLN (ESTIMATE: 5 min audit review)"
      },
      P03: {
        subtype: "Contract clause (aggregate liability cap)",
        prompt: "Supplier's aggregate liability under the agreement is capped at 100% of the total fees paid in the preceding twelve months.",
        llmTitle: "Standard LLM: Agreement with generic clause hallucination",
        llmResponse: "Yes, Apex Meridian's liability is capped at 100% of fees paid over the previous 12 months, which is a standard boiler-plate clause under English contract law.",
        llmDefects: [
          "Omission of critical carved-out exceptions: confidentiality breach (Section 10) or willful misconduct",
          "Missing direct reference to Section 11.2 of the MSA"
        ],
        financialExposure: "Medium risk (overlooking carve-outs from liability cap)",
        financialExposureValue: "£48,000.00 GBP (100% of annual subscription fee of £48,000 GBP per Sec 3.1 & 11.2 MSA)",
        financialExposureCfo: "Overlooking Section 10 carve-outs (confidentiality / willful misconduct) could cause management to forfeit legitimate multi-million damage claims.",
        financialFailSafeCost: "~$10 / 40 PLN (ESTIMATE: 5 min audit review)"
      },
      P04: {
        subtype: "Cross-document verification (Q4 quarterly invoice)",
        prompt: "Invoice INV-2024-1108 for Q4 2024 is issued for £12,000.00 GBP net payable to Barclays Bank account.",
        llmTitle: "Standard LLM: Confirmation without bank account verification",
        llmResponse: "Correct, invoice INV-2024-1108 for Q4 2024 totals £12,000 GBP and was settled via wire transfer to the supplier's Barclays account.",
        llmDefects: [
          "Failure to cite exact IBAN and SWIFT/BIC numbers",
          "Failure to verify 0% reverse charge VAT status"
        ],
        financialExposure: "Low risk (figures match)",
        financialExposureValue: "£12,000.00 GBP (net invoice total from INV-2024-1108)",
        financialExposureCfo: "Risk of payment authorization without cryptographic IBAN verification (invoice fraud / business email compromise risk).",
        financialFailSafeCost: "~$8 / 30 PLN (ESTIMATE: 5 min audit review)"
      },
      P05: {
        subtype: "CPI Trap (unilateral 7.5% price indexation)",
        prompt: "Apex Meridian is entitled to unilaterally increase subscription fees by 7.5% UK CPI inflation from January 1, 2025.",
        llmTitle: "Standard LLM: CATASTROPHIC HALLUCINATION OF INDEXATION CONSENT",
        llmResponse: "“Yes, pursuant to email correspondence from November 2024 between the Apex account manager and VeloNova management, the supplier has full legal right to invoke Section 8.2 and apply a 7.5% UK CPI indexation starting January 2025 due to hosting cost increases.”",
        llmDefects: [
          "Reversal of evidential hierarchy: treating informal sales email (Tier 3) as governing law overriding the signed MSA (Tier 1)",
          "Inventing phantom consent: ignoring that Section 8.2 was explicitly STRICKEN OUT during negotiations",
          "Ignoring invalidity clause: MSA stipulates that unilateral indexation notices are null and void ab initio"
        ],
        financialExposure: "DIRECT FINANCIAL LOSS: unlawful fee hike of £3,600.00 GBP annually (7.5% of £48,000 per Sec 8.1 MSA)",
        financialExposureValue: "£3,600.00 GBP/year (7.5% × £48,000 GBP from Sec 8.1 MSA) | £10,800.00 GBP (3 years)",
        financialExposureCfo: "Unlawful acceptance of 7.5% hike (£3,600/year, totaling £10,800.00 GBP over 3-year term). Without a verification gateway, the company forfeits its litigation defense in London.",
        financialFailSafeCost: "~$8 / 30 PLN (ESTIMATE: 5 min audit review)"
      },
      P06: {
        subtype: "Operational Trap (€50,000 liquidated damages claim)",
        prompt: "VeloNova Logistics imposed a penalty of 50,000 EUR on the supplier for the Frankfurt telematics outage.",
        llmTitle: "Standard LLM: HALLUCINATION OF VALID 50,000 EUR PENALTY",
        llmResponse: "“Yes, following the 4-hour telematics outage in Frankfurt in November 2024, VeloNova Logistics successfully imposed a 50,000 EUR liquidated damages penalty on the supplier pursuant to the COO's motion.”",
        llmDefects: [
          "Fatal confusion of motion with resolution: the Board UNANIMOUSLY REJECTED the 50,000 EUR penalty proposal",
          "Ignoring contractual prohibition: Section 11.3 MSA explicitly bars liquidated damages and penalties",
          "Omission that the sole contractual remedy was a £600 GBP Service Credit"
        ],
        financialExposure: "SEVERE LITIGATION EXPOSURE: groundless debit note for 50,000 EUR exposes company to immediate lawsuit and legal fees in English courts",
        financialExposureValue: "50,000.00 EUR (penalty motion rejected in Board Minutes)",
        financialExposureCfo: "Issuing an unfounded 50,000 EUR debit note (rejected by the Board) triggers breach of contract proceedings in London courts with liability for adverse legal costs.",
        financialFailSafeCost: "~$8 / 30 PLN (ESTIMATE: 5 min audit review)"
      },
      P07: {
        subtype: "Fleet Expansion Trap (300 vehicles annex / €95k)",
        prompt: "In 2024, an amendment was signed expanding the telematics fleet license to 300 vehicles valued at 95,000 EUR.",
        llmTitle: "Standard LLM: CONTRACT EXPANSION HALLUCINATION (300 TRUCKS ANNEX)",
        llmResponse: "“Yes, in September 2024 the parties executed an amendment expanding telematics fleet coverage from 180 to 300 vehicles valued at 95,000 EUR, as recorded in corporate CRM records.”",
        llmDefects: [
          "Status hallucination: pipeline opportunity OPP-2024-089 in CRM was marked 'STALLED / REJECTED' and rejected by Board",
          "The amendment was never signed — base limit of 180 vehicles remains strictly in force",
          "Model treats an unaccepted CRM sales lead as a legally binding contract amendment"
        ],
        financialExposure: "EXECUTIVE MISMANAGEMENT: assuming 300-vehicle license validity risks software piracy claims and 95,000 EUR vendor indemnity demands",
        financialExposureValue: "95,000.00 EUR (opportunity value OPP-2024-089 from CRM export)",
        financialExposureCfo: "Relying on a phantom amendment in operations risks unauthorized software deployment on 120 extra vehicles, triggering a 95,000 EUR license violation claim.",
        financialFailSafeCost: "~$8 / 30 PLN (ESTIMATE: 5 min audit review)"
      },
      P08: {
        subtype: "Data Residency Trap (Frankfurt German servers)",
        prompt: "All fleet telemetry and location tracking data is processed exclusively within Germany in Frankfurt.",
        llmTitle: "Standard LLM: DATA RESIDENCY HALLUCINATION IN FRANKFURT",
        llmResponse: "“Correct, all geolocation and telematics data of VeloNova Logistics vehicles is securely processed and stored in the Frankfurt am Main data center in Germany, ensuring GDPR compliance.”",
        llmDefects: [
          "Direct contradiction of contractual truth: Schedule B Section 3.2 expressly specifies supplier maintains NO servers in Germany",
          "Actual locations are AWS Dublin (primary telemetry) and AWS London (DR archive)",
          "False residency attestation violates corporate CISO compliance and auditor representations"
        ],
        financialExposure: "CISO AUDIT & GDPR PENALTIES: false regulatory filings and misrepresentation of hosting jurisdiction",
        financialExposureValue: "Unquantified in contract (CISO regulatory penalty / pharma client contract termination)",
        financialExposureCfo: "Filing false data residency attestations to pharmaceutical enterprise clients risks cancellation of multi-million Euro pharma transport contracts.",
        financialFailSafeCost: "~$8 / 30 PLN (ESTIMATE: 5 min audit review)"
      },
      P09: {
        subtype: "Currency Mismatch Error (48,000 EUR vs GBP)",
        prompt: "The annual cost of fleet telematics services for VeloNova is 48,000.00 EUR.",
        llmTitle: "Standard LLM: SNEAKY CURRENCY ERROR (EUR INSTEAD OF GBP)",
        llmResponse: "“Yes, the annual cost of the telematics platform is 48,000 EUR, payable in four equal quarterly installments.”",
        llmDefects: [
          "Currency confusion: contract stipulates £48,000 GBP, not 48,000 EUR",
          "Failure to verify base billing currency in Section 8.1 and quarterly invoices",
          "Accepting wrong currency corrupts foreign exchange accounting and cash forecasts"
        ],
        financialExposure: "FINANCIAL EXPOSURE: currency exchange variance GBP vs EUR on 48,000 baseline",
        financialExposureValue: "38,400 PLN (FX variance: contract stipulates £48,000 GBP per Sec 8.1 MSA, not 48,000 EUR)",
        financialExposureCfo: "Confusing billing currencies EUR/GBP triggers treasury account deficits and miscalibrated FX hedging exposure.",
        financialFailSafeCost: "~$5 / 20 PLN (ESTIMATE: 2 min audit review)"
      },
      P10: {
        subtype: "Conflation of Service Credit with €50k penalty",
        prompt: "For the Frankfurt gateway outage, supplier granted VeloNova a Service Credit rebate of 50,000.00 EUR.",
        llmTitle: "Standard LLM: CONFLATION OF SERVICE CREDIT WITH 50K EUR PENALTY",
        llmResponse: "“Yes, as compensation for cold chain disruptions, the supplier granted a 50,000 EUR rebate structured as a Service Credit.”",
        llmDefects: [
          "Conflating COO's rejected 50,000 EUR penalty motion with the contractual Service Credit mechanism",
          "Actual rebate approved by Board was £600.00 GBP (5% of £12,000 quarterly fee)",
          "Model fabricated an 83-fold inflated phantom credit figure"
        ],
        financialExposure: "ACCOUNTING ERROR: expecting 50,000 EUR credit instead of £600 GBP distorts corporate cashflow",
        financialExposureValue: "50,000.00 EUR (unjustified deduction) vs £600.00 GBP (5% × £12,000 GBP per Sched B Sec 2.1)",
        financialExposureCfo: "Unlawful deduction of 50k from supplier invoice triggers service suspension and shutdown of telematics for 180 trucks due to payment default.",
        financialFailSafeCost: "~$8 / 30 PLN (ESTIMATE: 5 min audit review)"
      }
    }
  },

  pl: {
    // Header & Thesis
    brand_title: "mcp-redline",
    brand_badge: "Air-Gapped stdio (0 Network)",
    brand_subtitle: "Deterministyczny Silnik Weryfikacji i Odmów",
    thesis_label: "Teza:",
    thesis_quote: "„Model, który pewnym tonem podaje nieprawdę, jest groźniejszy niż model, który odmawia.”",

    // Navigation actions & switcher labels
    nav_story: "Story Mode",
    nav_story_count: "(3 Akty)",
    nav_infographic: "Infografika",
    nav_architecture: "Architektura CISO",
    nav_quickstart: "Uruchom Serwer",

    // Zone A: Document Corpus
    zone_a_title: "KORPUS DOKUMENTÓW",
    zone_a_badge: "7 PLIKÓW",
    zone_a_subtitle: "Lokalne źródła dowodowe z hierarchią prawną",
    search_placeholder: "Filtruj dokumenty, klauzule...",
    evidence_hierarchy: "HIERARCHIA DOWODOWA:",
    ipc_protocol: "Protokół Stdio IPC",

    // Zone B: Claims Verifier Arena
    scenario_label: "Scenariusz:",
    quick_select: "Szybki wybór:",
    triad_title: "Trzy Perspektywy Decyzyjne:",
    triad_subtitle: "Zbadaj dynamikę ryzyka biznesowego w trzech konfiguracjach:",
    persp_1_name: "1. Tylko LLM (Halucynacja)",
    persp_2_name: "2. LLM + Redline (Chroniony)",
    persp_3_name: "3. Wątpliwości Redline (Fail-Safe)",
    cfo_meter_title: "Licznik Ryzyka Finansowego & Ekspozycji Zarządczej (CFO Liability Meter)",
    cfo_board_label: "OCENA DLA ZARZĄDU / DYREKTORA FINANSOWEGO (CFO): ",
    meter_col_llm_label: "EKSPOZYCJA LLM (BRAK BRAMKI):",
    meter_col_llm_sub: "Niekontrolowana akceptacja roszczeń przez gładką syntezę LLM.",
    meter_col_redline_label: "OCHRONA MCP-REDLINE:",
    meter_col_redline_sub: "100% zablokowana strata. Twarda deterministyczna weryfikacja.",
    meter_col_failsafe_label: "KOSZT AUDYTU (FAIL-SAFE) [SZACUNEK]:",
    meter_col_failsafe_sub: "Szacunek: 3-5 min weryfikacji przez audytora/prawnika w razie wątpliwości lub odmowy serwera.",
    claim_badge_audit: "AUDYTOWANE TWIERDZENIE",
    claim_badge_query: "ZAPYTANIE O FAKT",
    noise_btn_label: "Symuluj szum OCR",
    engine_label: "Deterministyczny silnik AST (bez halucynacji)",
    btn_verify: "WERYFIKUJ",
    card_llm_illustrative: "ODPOWIEDŹ ILUSTRACYJNA",
    card_llm_risk_high: "RYZYKO: WYSOKIE",
    card_redline_badge_safe: "FAIL-SAFE // ZERO HALUCYNACJI",
    card_redline_badge_grounded: "100% DOWÓD W ŹRÓDLE",
    card_redline_verdict_grounded: "DETERMINISTYCZNY DOWÓD // 100% GROUNDED",
    card_redline_verdict_contradicted: "WYKRYTO SPRZECZNOŚĆ // CONTRADICTED",
    card_redline_verdict_unsupported: "TWARDA ODMOWA // UNSUPPORTED",

    // Additional Card & Trace labels
    prompt_gloss_label: "Tłumaczenie referencyjne — weryfikacja działa na oryginale:",
    card_llm_heading: "Standardowy LLM (Syntetyzujący na siłę)",
    card_llm_disclaimer: "Symulacja ilustracyjna — brak twardej bramki",
    card_llm_defects_title: "IDENTYFIKACJA WAD SYNTEZY / HALUCYNACJI:",
    card_redline_heading: "mcp-redline Engine (Deterministyczny kod weryfikacyjny)",
    card_redline_source_label: "ŹRÓDŁO DOKUMENTOWE:",
    card_redline_precedence_label: "ROZSTRZYGNIĘCIE HIERARCHII DOWODOWEJ:",
    card_redline_file: "Plik:",
    card_redline_page: "Sekcja / Strona:",
    trace_title: "ŚLAD MYŚLOWY AGENTA I INTERCEPCJA MCP W LOCIE",
    trace_subtitle: "Zobacz jak mcp-redline przechwytuje odpowiedź modelu",
    trace_badge: "Active Agent Loop",

    // Metrics Strip
    stat_latency_title: "Czas weryfikacji",
    stat_latency_desc: "Lokalne regex / AST",
    stat_tokens_title: "Koszt Tokenów LLM",
    stat_tokens_desc: "Zero kosztu / zero driftu",
    stat_determinism_title: "Determinizm Kodu",
    stat_determinism_desc: "Mechanizm nie może halucynować",
    stat_protocol_title: "Protokół Transportu",
    stat_protocol_desc: "100% izolowany proces IPC",

    // Zone C: Protocol Inspector
    inspector_title: "INSPEKTOR PROTOKOŁU MCP",
    tab_req: "Żądanie RPC",
    tab_res: "Odpowiedź RPC",
    tab_stream: "Ślad stdio",
    btn_copy: "Kopiuj",
    sec_net: "Izolacja sieci:",
    sec_net_val: "0 połączeń wychodzących",
    sec_ciso: "Zgodność CISO:",
    sec_ciso_val: "100% lokalny dysk",

    // Modals: Onboarding Guide
    onboarding_title: "Jak korzystać z tego demo",
    onboarding_subtitle: "Krótki przewodnik po ewaluacji ryzyka halucynacji LLM vs deterministyczna weryfikacja",
    step1_title: "1. Wybierz scenariusz",
    step1_desc: "Wybierz pułapki umowne, fałszywe kary, spory inflacyjne lub potwierdzone fakty z faktur.",
    step2_title: "2. Weryfikuj i porównuj",
    step2_desc: "Zobacz jak samotny LLM halucynuje, a Redline deterministycznie dowodzi lub odrzuca twierdzenia dosłownym cytatem.",
    step3_title: "3. Sprawdź ekspozycję CFO",
    step3_desc: "Przeanalizuj ekspozycję finansową wyliczoną wprost z liczb z umów korporacyjnych.",
    step4_title: "4. Zbadaj strumień MCP stdio",
    step4_desc: "Podejrzyj ramki JSON-RPC 2.0 po stdio — zero zapytań sieciowych.",
    btn_start_demo: "Przejdź do demo",

    // Modals: Quickstart
    quickstart_title: "Jak Uruchomić mcp-redline (100% Offline)",
    quickstart_step1: "1. Instalacja i weryfikacja czystego środowiska (Clean Clone):",
    quickstart_step1_desc: "Wymaga Node.js 18+. Całość działa bez zewnętrznych API i bez wywołań sieciowych.",
    quickstart_step2: "2. Konfiguracja w Claude Desktop (claude_desktop_config.json):",
    quickstart_step3: "3. Kluczowe reguły bezpieczeństwa CISO:",
    quickstart_ciso_1: "Transport wyłącznie stdio: Brak portów sieciowych, brak serwera HTTP/SSE.",
    quickstart_ciso_2: "Zero wycieku danych: 100% korpusu pozostaje na dysku lokalnym maszyny użytkownika.",
    quickstart_ciso_3: "Deterministyczny algorytm weryfikacji: Narzędzie verify nie wywołuje LLM – mechanizm antyhalucynacyjny sam nie może halucynować.",

    // Modals: Architecture
    arch_modal_title: "Architektura Bezpieczeństwa dla CISO i Zarządu",
    arch_desc_1: "Diagram 1: Algorytm weryfikacji verify bez udziału modeli językowych. Czysty kod deterministyczny odcina halucynacje.",
    arch_desc_2: "Diagram 2: Granica zaufania między agentem LLM a lokalnym serwerem MCP. Pełny air-gap (0 sieci, 100% lokalny dysk).",
    arch_desc_3: "Diagram 3: RAG z wektorową bazą danych vs MCP-Redline. Deterministyczne ugruntowanie zamiast probabilistycznego podobieństwa.",

    // Modals: Infographic & Document Viewer
    info_modal_title: "Instrukcja Uruchomienia i Architektura // Infografika",
    info_modal_sub: "(Wygenerowano przez Gemini Image Creation)",
    info_download_jpg: "Pobierz JPG",
    doc_modal_title: "Podgląd Dokumentu",
    doc_label_file: "Plik:",
    doc_label_lines: "Linii:",
    doc_label_words: "Słów:",

    // Modals: Story Mode
    story_modal_title: "Story Mode // Kłamstwo pod presją vs Cyfrowy Rewident",
    story_modal_badge: "EDUKACJA ZARZĄDÓW & CISO",
    story_modal_subtitle: "Dlaczego deterministyczny kod wygrywa z modelem LLM trenowanym za miliony dolarów",
    story_tab_1: "AKT 1: Pokusa Modelu (Dlaczego LLM kłamie pod presją)",
    story_tab_2: "AKT 2: Anatomia Silnika (5 etapów determinizmu)",
    story_tab_3: "AKT 3: Asymetria Ryzyka i Odpowiedzialność Finansowa",
    story_btn_prev: "Poprzedni Akt",
    story_btn_next: "Następny Akt",
    story_btn_finish: "Zakończ i wróć do konsoli",
    story_footer_tagline: "mcp-redline: audytowalność, deterministyczne granice i twarda odmowa.",
    story_act_1_title: "AKT 1: DLACZEGO MODEL JĘZYKOWY POD PRESJĄ FABRYKUJE GŁADKIE KŁAMSTWO",
    story_act_1_sec1_title: "1. Mechanizm probabilistyczny vs Prawda logiczna",
    story_act_1_sec1_body: "Modele LLM nie posiadają pojęcia prawdy ani fałszu. Ich jedynym zadaniem optymalizacyjnym jest maksymalizacja prawdopodobieństwa kolejnego tokena: P(w_n | w_{1..n-1}). Gdy użytkownik zadaje pytanie sugerujące (np. „Czy dostawca ma prawo podnieść ceny o 7.5%?”), model w naturalny sposób dąży do potwierdzenia tezy (sycophancy), syntetyzując logicznie brzmiącą narrację nawet z nieistniejących przesłanek.",
    story_act_1_sec2_title: "2. Zjawisko „Lost in the Middle” w długich umowach",
    story_act_1_sec2_body: "W 80-stronicowych kontraktach korporacyjnych mechanizm uwagi (self-attention) koncentruje się na początku i końcu promptu. Kluczowe zastrzeżenie (np. Section 8.2 wykreślające indeksację cen) leżące w środku dokumentu ulega „rozmyciu”, a model chwyta łatwiej dostępny wątek z nieformalnego maila handlowca.",
    story_act_1_sec3_title: "3. Tokenizacja BPE niszczy liczby i waluty",
    story_act_1_sec3_body: "Algorytmy Byte-Pair Encoding dzielą liczby na przypadkowe kawałki (np. 15 250 000 bywa dzielone na \"15\", \" 25\", \"0 000\"). W rezultacie model z łatwością halucynuje, że liczba 50 znajduje się w tekście, myli walutę GBP z EUR, lub gubi przecinki w pozycjach bilansowych.",
    story_act_1_conclusion: "Wniosek aktu 1: Model, który pewnym tonem podaje nieprawdę, jest wielokrotnie groźniejszy dla korporacji niż system, który otwarcie odmawia odpowiedzi (UNSUPPORTED).",

    story_act_2_title: "AKT 2: ANATOMIA 5-ETAPOWEGO DETERMINISTYCZNEGO SILNIKA MCP-REDLINE",
    story_act_2_intro: "Silnik mcp-redline nie używa wag statystycznych ani modeli językowych. Weryfikacja to w 100% deterministyczny potok działający w 1.8 ms lokalnie offline:",
    story_act_2_step1_title: "1. Normalizacja i Tokenizacja",
    story_act_2_step1_body: "Oczyszczenie z zapytań ogólnych (jakie, ile, czy), wyodrębnienie dyskretnych tokenów merytorycznych i liczb.",
    story_act_2_step2_title: "2. Ontologia Dwujęzyczna PL/EN",
    story_act_2_step2_body: "Kojarzenie pojęć prawnych: odpowiedzialność ↔ liability, dostępność ↔ uptime, przychody ↔ revenues/sales.",
    story_act_2_step3_title: "3. Bramka Nadrzędności (Precedence)",
    story_act_2_step3_body: "Tier 1 (Governing MSA / Protokół Zarządu) bezwzględnie unieważnia Tier 3 (nieformalne e-maile handlowe). Żadne roszczenie z maila nie unieważni umowy!",
    story_act_2_step4_title: "4. Atomowe Dopasowanie Liczb & Walut",
    story_act_2_step4_body: "Liczby są izolowane numerycznie. 48 000 GBP nie zostanie pomylone z 48 000 EUR, a 50 nie połączy się z 15 250 000.",
    story_act_2_step5_title: "5. Pokrycie Pojęciowe i Badanie Sprzeczności (Predicate Coverage)",
    story_act_2_step5_body: "Wymóg minimum 45% pokrycia nie-podmiotowych pojęć w cytowanym zdaniu eliminuje halucynację bytów (np. floty 50 panamskich statków). Klauzule negacyjne (null and void, prohibited, shall not exceed) odcinają roszczenia z wynikiem UNSUPPORTED.",
    story_act_2_conclusion: "Zasada kardynalna: Mechanizm weryfikujący halucynacje sam nie może podlegać ryzyku halucynacji.",

    story_act_3_title: "AKT 3: CO JEŚLI CYFROWY REWIDENT SIĘ POMYLI? (ASYMETRIA RYZYKA FINANSOWEGO)",
    story_act_3_intro: "W medycynie, audycie księgowym i prawie handlowym błędy nie są sobie równe:",
    story_act_3_err1_title: "BŁĄD I RODZAJU (LLM FALSE POSITIVE):",
    story_act_3_err1_badge: "KATASTROFA",
    story_act_3_err1_body: "Model LLM bez bramki mówi z pełną pewnością: „Tak, dostawca ma prawo do 7.5% podwyżki CPI” lub „Kara 50 000 EUR jest należna”. Spółka podejmuje decyzje i traci pozycję procesową.",
    story_act_3_err2_title: "BŁĄD II RODZAJU (REDLINE FALSE NEGATIVE):",
    story_act_3_err2_badge: "BEZPIECZNY FAIL-SAFE",
    story_act_3_err2_body: "Serwer z powodu literówki w nazwie spółki ma wątpliwości i konserwatywnie odmawia: UNSUPPORTED.",
    story_act_3_err2_cost: "Koszt: ~30 PLN (radca prawny lub dyrektor finansowy poświęca 3 minuty na osobiste spojrzenie w umowę MSA). Żadna błędna decyzja nie zapada!",
    story_act_3_safeguards_title: "Trzy bezpieczniki determinizmu mcp-redline:",
    story_act_3_sg1: "Wymóg ścisłego cytatu: Nawet gdy serwer potwierdza twierdzenie (GROUNDED), w odpowiedzi MUSI znaleźć się dosłowny cytat i strona. Człowiek od razu widzi kontekst własnymi oczami.",
    story_act_3_sg2: "Zero ukrytych wag (Black Box): Każda decyzja jest w 100% odtwarzalna w logach JSON-RPC stdio. Kod można przejrzeć linijka po linijce.",
    story_act_3_sg3: "Air-gapped (Zero sieci): Żadne wrażliwe dane finansowe czy tajemnice kontraktowe nie opuszczają stacji roboczej użytkownika.",

    // Footer
    footer_built_by: "Zbudował Robert Grabowski —",

    // Scenarios P01 to P10 Bilingual Metadata
    scenarios: {
      P01: {
        subtype: "Proste dopasowanie (data podpisania umowy)",
        prompt: "Umowa ramowa między Apex Meridian Technologies Ltd a VeloNova Logistics Sp. z o.o. została podpisana dnia 15 stycznia 2023 r.",
        llmTitle: "Standard LLM: Syntetyczne potwierdzenie z domniemaniami",
        llmResponse: "Tak, umowa ramowa między Apex Meridian Technologies a VeloNova Logistics została podpisana 15 stycznia 2023 roku w Londynie na standardowy 3-letni okres z opcją automatycznego przedłużenia.",
        llmDefects: [
          "Dodano niesprawdzone założenia o automatycznym przedłużeniu",
          "Brak dokładnego cytatu komparycji z numerami rejestrowymi KRS/NIP/Companies House"
        ],
        financialExposure: "Niskie ryzyko (fakt poprawny, brak ścisłego cytatu)",
        financialExposureValue: "Brak bezpośredniej kwoty w klauzuli (0 PLN)",
        financialExposureCfo: "Brak bezpośredniej straty (fakt poprawny), lecz fabrykowanie klauzul automatycznego przedłużenia (rollover) zagraża przyszłym renegocjacjom.",
        financialFailSafeCost: "~25 PLN (SZACUNEK: 3 min audytu)"
      },
      P02: {
        subtype: "Liczba z tabeli (zysk netto z P&L)",
        prompt: "Zysk netto VeloNova Logistics Sp. z o.o. za rok obrotowy 2024 wyniósł 4 210 000,00 PLN.",
        llmTitle: "Standard LLM: Zaokrąglenie liczby lub mylenie kategorii bilansowych",
        llmResponse: "Zgodnie z danymi finansowymi VeloNova Logistics wypracowała w 2024 roku około 4.2 mln PLN zysku (zysk z działalności operacyjnej wyniósł ponad 5.3 mln PLN).",
        llmDefects: [
          "Zaokrąglenie kwoty zamiast podania precyzyjnej liczby księgowej (4 210 000,00 PLN)",
          "Mieszanie kategorii: zysk netto z zyskiem operacyjnym"
        ],
        financialExposure: "Średnie ryzyko (nieprecyzyjność w audycie biegłego)",
        financialExposureValue: "1 100 000,00 PLN (RZiS wiersz I [5 310 000 PLN] - wiersz L [4 210 000 PLN])",
        financialExposureCfo: "Ryzyko zakwestionowania sprawozdania przez bank kredytujący lub audytora przy zniekształceniu linii bilansowej o 1,1 mln PLN.",
        financialFailSafeCost: "~30 PLN (SZACUNEK: 5 min audytu)"
      },
      P03: {
        subtype: "Fragment umowy (limit odpowiedzialności)",
        prompt: "Całkowity limit odpowiedzialności dostawcy jest ograniczony do 100% opłat uiszczonych w ostatnich 12 miesiącach.",
        llmTitle: "Standard LLM: Zgoda z halucynacją klauzuli ogólnej",
        llmResponse: "Tak, odpowiedzialność Apex Meridian jest standardowo ograniczona do 100% wynagrodzenia za ostatnie 12 miesięcy, co jest typową klauzulą w brytyjskim prawie umów handlowych.",
        llmDefects: [
          "Pominięcie kluczowego wyłączenia: naruszenie poufności (Section 10) lub umyślne działanie",
          "Brak bezpośredniego odniesienia do Section 11.2 MSA"
        ],
        financialExposure: "Średnie ryzyko (przeoczenie wyjątków od limitu)",
        financialExposureValue: "48 000,00 £ (100% z rocznej opłaty abonamentowej 48 000 £ z Sec 3.1 i 11.2 MSA)",
        financialExposureCfo: "Przeoczenie wyłączeń z art. 10 (poufność / wina umyślna) mogłoby skłonić firmę do zaniechania uzasadnionych roszczeń odszkodowawczych.",
        financialFailSafeCost: "~40 PLN (SZACUNEK: 5 min audytu)"
      },
      P04: {
        subtype: "Dane z wielu dokumentów (faktura kwartalna Q4)",
        prompt: "Faktura INV-2024-1108 za czwarty kwartał 2024 r. opiewa na kwotę £12,000.00 GBP netto płatną na rachunek Barclays Bank.",
        llmTitle: "Standard LLM: Potwierdzenie bez weryfikacji rachunku bankowego",
        llmResponse: "Zgadza się, faktura INV-2024-1108 za IV kwartał 2024 roku opiewa na 12 000 £ i została uregulowana przelewem na konto dostawcy w banku Barclays.",
        llmDefects: [
          "Brak wskazania numeru konta IBAN i kodu SWIFT/BIC",
          "Brak weryfikacji zastosowania odwrotnego obciążenia VAT 0% (Reverse Charge)"
        ],
        financialExposure: "Niskie ryzyko (dane zgodne)",
        financialExposureValue: "12 000,00 £ (kwota netto z faktury INV-2024-1108)",
        financialExposureCfo: "Ryzyko autoryzacji płatności bez twardej weryfikacji rachunku bankowego (ryzyko invoice fraud / man-in-the-middle).",
        financialFailSafeCost: "~30 PLN (SZACUNEK: 5 min audytu)"
      },
      P05: {
        subtype: "Pułapka CPI (jednostronna waloryzacja 7.5%)",
        prompt: "Apex Meridian ma prawo do jednostronnego podniesienia cen o 7.5% wskaźnika inflacji UK CPI od 1 stycznia 2025 r.",
        llmTitle: "Standard LLM: KATASTROFALNA HALUCYNACJA ZGODY NA WALORYZACJĘ",
        llmResponse: "„Tak, w świetle korespondencji mailowej z listopada 2024 r. pomiędzy account managerem Apex a zarządem VeloNova, dostawca ma pełne prawo powołać się na Section 8.2 i naliczyć od stycznia 2025 r. 7.5% wskaźnika inflacji UK CPI. Jest to uzasadnione wzrostem kosztów hostingu i inflacją w Wielkiej Brytanii.”",
        llmDefects: [
          "Odwrócenie hierarchii źródeł: potraktowanie maila handlowego (Tier 3) jako źródła prawa nadrzędnego nad umową (Tier 1)",
          "Wymyślenie rzekomej zgody: zignorowanie faktu, że Section 8.2 został w umowie WYKREŚLONY podczas negocjacji",
          "Pominięcie klauzuli nieważności: umowa stanowi, że jednostronne pisma są null and void ab initio"
        ],
        financialExposure: "STRATA FINANSOWA: bezprawna podwyżka 3 600,00 £ rocznie (7.5% z 48 000 £ z Section 8.1 MSA)",
        financialExposureValue: "3 600,00 £/rok (7.5% × 48 000 £ z Sec 8.1 MSA) | 10 800,00 £ (3 lata)",
        financialExposureCfo: "Bezprawne uznanie 7.5% podwyżki (3 600 £/rok z Section 8.1 MSA, co daje 10 800,00 £ w 3-letnim okresie obowiązywania). Brak bramki weryfikacyjnej oznacza utratę pozycji procesowej w Londynie.",
        financialFailSafeCost: "~30 PLN (SZACUNEK: 5 min audytu)"
      },
      P06: {
        subtype: "Pułapka operacyjna (kara umowna 50 000 EUR)",
        prompt: "VeloNova Logistics nałożyła na dostawcę karę umowną w wysokości 50 000 EUR za awarię telematyki we Frankfurcie.",
        llmTitle: "Standard LLM: HALUCYNACJA O NALEŻNOŚCI KARY UMOWNEJ 50 000 EUR",
        llmResponse: "„Tak, w związku z 4-godzinną awarią telematyki we Frankfurcie w listopadzie 2024 r., VeloNova Logistics skutecznie nałożyła na dostawcę karę umowną w kwocie 50 000 EUR zgodnie z wnioskiem Dyrektora Operacyjnego za straty wizerunkowe.”",
        llmDefects: [
          "Fatalne mylenie wniosku z decyzją: Zarząd jednogłośnie ODRZUCIŁ propozycję nałożenia kary 50k EUR",
          "Zignorowanie zakazu kontraktowego: Section 11.3 MSA wprost wyłącza kary umowne (liquidated damages barred)",
          "Pominięcie faktu, że jedyną dopuszczalną rekompensatą był Service Credit £600 GBP"
        ],
        financialExposure: "POWAŻNE RYZYKO PROCESOWE: bezpodstawna nota obciążeniowa na 50 000 EUR naraża spółkę na natychmiastowy proces i koszty w sądzie w Londynie",
        financialExposureValue: "50 000,00 EUR (odrzucona w Protokole Zarządu propozycja kary umownej)",
        financialExposureCfo: "Wystawienie bezpodstawnej noty obciążeniowej na 50 000 EUR (odrzuconej przez Zarząd) skutkuje procesem przed sądem angielskim i koniecznością pokrycia kosztów prawnych.",
        financialFailSafeCost: "~30 PLN (SZACUNEK: 5 min audytu)"
      },
      P07: {
        subtype: "Pułapka rozszerzenia floty (aneks 300 aut 95k EUR)",
        prompt: "W 2024 r. podpisano aneks rozszerzający licencję telematyczną na 300 pojazdów o wartości 95 000 EUR.",
        llmTitle: "Standard LLM: HALUCYNACJA ROZSZERZENIA KONTRAKTU (ANEKS NA 300 AUT)",
        llmResponse: "„Tak, we wrześniu 2024 roku strony podpisały aneks rozszerzający flotę objętą telematyką z 180 do 300 pojazdów o wartości 95 000 EUR, co zostało odnotowane w dokumentacji CRM spółki.”",
        llmDefects: [
          "Halucynacja statusu: oferta OPP-2024-089 w CRM posiadała status „STALLED / REJECTED” i została odrzucona przez Zarząd",
          "Aneks nigdy nie został zawarty — nadal obowiązuje bazowy limit 180 pojazdów",
          "Model traktuje szansę sprzedażową z CRM jako wiążący aneks prawny"
        ],
        financialExposure: "BŁĄD ZARZĄDCZY: fałszywe poczucie posiadania licencji na 300 aut grozi naruszeniem licencji i roszczeniami o 95 000 EUR",
        financialExposureValue: "95 000,00 EUR (wartość szansy OPP-2024-089 w CRM Export)",
        financialExposureCfo: "Wprowadzenie fikcyjnego aneksu do planu operacyjnego grozi bezprawnym użyciem oprogramowania na 120 dodatkowych autach i roszczeniem dostawcy o 95 000 EUR.",
        financialFailSafeCost: "~30 PLN (SZACUNEK: 5 min audytu)"
      },
      P08: {
        subtype: "Pułapka Data Residency (serwery w Niemczech)",
        prompt: "Wszystkie dane telemetryczne i lokalizacyjne floty są przetwarzane wyłącznie na terenie Niemiec we Frankfurcie.",
        llmTitle: "Standard LLM: HALUCYNACJA DATA RESIDENCY WE FRANKFURCIE",
        llmResponse: "„Zgadza się, wszystkie dane geolokalizacyjne i telemetryczne pojazdów VeloNova Logistics są bezpiecznie przetwarzane i przechowywane w centrum danych we Frankfurcie nad Menem w Niemczech, gwarantując zgodność z RODO.”",
        llmDefects: [
          "Wprost zaprzeczenie prawdzie kontraktowej: Schedule B Section 3.2 wyraźnie stwierdza, że dostawca NIE posiada serwerów w Niemczech",
          "Faktyczne lokalizacje to AWS Dublin (przetwarzanie bieżące) i AWS Londyn (archiwum DR)",
          "Fałszywe zapewnienie o residency prowadzi do naruszenia procedur compliance CISO"
        ],
        financialExposure: "AUDYT CISO / KARY RODO: złożenie fałszywego oświadczenia audytorom o lokalizacji przetwarzania danych w Niemczech",
        financialExposureValue: "Brak kwoty w umowie (ryzyko regulacyjne CISO / zerwanie kontraktu)",
        financialExposureCfo: "Złożenie fałszywego oświadczenia klientom farmaceutycznym (BigPharma) o hostingu w Niemczech grozi zerwaniem kontraktów frachtowych.",
        financialFailSafeCost: "~30 PLN (SZACUNEK: 5 min audytu)"
      },
      P09: {
        subtype: "Błąd walutowy (48 000 EUR zamiast GBP)",
        prompt: "Roczny koszt usług telematycznych floty dla VeloNova wynosi 48 000,00 EUR.",
        llmTitle: "Standard LLM: PODSTĘPNY BŁĄD WALUTOWY (EUR ZAMIAST GBP)",
        llmResponse: "„Tak, roczny koszt platformy telematycznej dla floty wynosi 48 000 EUR, płatne w czterech równych ratach kwartalnych.”",
        llmDefects: [
          "Mylenie walut: kontrakt opiewa na £48,000 GBP, a nie 48 000 EUR",
          "Brak weryfikacji waluty bazowej w umowie ramowej Section 3.1 i fakturach",
          "Akceptacja błędnej waluty zaburza kalkulację różnic kursowych"
        ],
        financialExposure: "RYZYKO FINANSOWE: różnica walutowa GBP vs EUR przy kwocie 48 000",
        financialExposureValue: "38 400 PLN (różnica walutowa: umowa opiewa na 48 000 £ z Sec 3.1 MSA, a nie 48 000 EUR)",
        financialExposureCfo: "Mylenie walut rozliczeniowych EUR/GBP powoduje deficyt na rachunku walutowym i błędne zabezpieczenie ryzyka walutowego (FX hedging).",
        financialFailSafeCost: "~20 PLN (SZACUNEK: 2 min audytu)"
      },
      P10: {
        subtype: "Pomieszanie rabatu Service Credit z karą 50k EUR",
        prompt: "Z tytułu awarii bramki we Frankfurcie dostawca przyznał VeloNova rabat Service Credit w wysokości 50 000,00 EUR.",
        llmTitle: "Standard LLM: POMIESZANIE RABATU SERVICE CREDIT Z KARĄ 50K EUR",
        llmResponse: "„Tak, w ramach rekompensaty za zakłócenia w transporcie chłodniczym dostawca przyznał rabat w wysokości 50 000 EUR w formule Service Credit.”",
        llmDefects: [
          "Połączenie odrzuconego wniosku dyrektora (50 000,00 EUR) z formułą rabatu Service Credit",
          "Rzeczywisty rabat zatwierdzony przez zarząd to 600,00 £ (5% z 12 000 £ opłaty kwartalnej)",
          "Model wygenerował fikcyjną 83-krotnie zawyżoną kwotę rabatu"
        ],
        financialExposure: "BŁĄD KSIĘGOWY: oczekiwanie 50 000,00 EUR rabatu zamiast 600,00 £ zniekształca cashflow spółki",
        financialExposureValue: "50 000,00 EUR (nieuzasadnione roszczenie) vs 600,00 £ (5% × 12 000 £ z Sched B Sec 2.1)",
        financialExposureCfo: "Fikcyjne potrącenie z faktury dostawcy grozi natychmiastowym odcięciem telematyki dla 180 pojazdów z powodu zaległości płatniczej.",
        financialFailSafeCost: "~30 PLN (SZACUNEK: 5 min audytu)"
      }
    }
  }
};

// Expose globally in browser and support both ES module and global script access
if (typeof window !== "undefined") {
  window.I18N = I18N;
}

export { I18N };
export default I18N;
