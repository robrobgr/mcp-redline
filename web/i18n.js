/**
 * mcp-redline i18n Translation Dictionary
 * Dual-language dictionary (English & Polish) for mcp-redline interactive workbench.
 */

const I18N = {
  en: {
    // Header & Thesis
    brand_title: "mcp-redline",
    brand_badge: "stdio · no network ports",
    brand_subtitle: "Deterministic Document Citation & Claim Verification MCP Server",
    thesis_label: "Thesis:",
    thesis_quote: "“A model that states an untruth with confidence is far more dangerous than one that refuses.”",

    // Navigation actions & switcher labels
    nav_story: "Story Mode",
    nav_story_count: "(3 Acts)",
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
    engine_label: "Deterministic engine, no language model",
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
    quote_translated_prefix: "[Reference translation of a Polish source passage — the verbatim original is in the cited file]",
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
    sec_ciso_val: "corpus stays on disk",

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
    step4_desc: "Inspect real-time JSON-RPC 2.0 frames over stdio — no network ports.",
    btn_start_demo: "Start exploring demo",

    // Modals: Quickstart
    quickstart_title: "How to Run mcp-redline (100% Offline)",
    quickstart_step1: "1. Clean Clone Installation & Verification:",
    quickstart_step1_desc: "Requires Node.js 18+. Runs completely without external APIs or network calls.",
    quickstart_step2: "2. Claude Desktop Configuration (claude_desktop_config.json):",
    quickstart_step3: "3. Key CISO Security Principles:",
    quickstart_ciso_1: "Stdio transport only: No open network ports, no HTTP/SSE server.",
    quickstart_ciso_2: "The server opens no network ports and makes no outbound calls. Your corpus stays on disk. When you use a cloud model, the claim and the quotes the server returns are sent to the model provider — the full corpus is not. For zero egress, use a local model (Ollama, LM Studio).",
    quickstart_ciso_3: "Deterministic verification algorithm: The verify tool does not call an LLM — an anti-hallucination mechanism cannot itself hallucinate.",

    // Modals: Architecture
    arch_modal_title: "Security architecture",
    arch_desc_1: "Diagram 1: Deterministic verification pipeline of the verify tool. The engine contains no language model.",
    arch_desc_2: "Diagram 2: Data boundary. The server opens no network ports and makes no outbound calls. Your corpus stays on disk. When you use a cloud model, the claim and the quotes the server returns are sent to the model provider — the full corpus is not. For zero egress, use a local model (Ollama, LM Studio).",

    // Modals: Document Viewer
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
    story_act_3_sg3: "The server opens no network ports and makes no outbound calls. Your corpus stays on disk. When you use a cloud model, the claim and the quotes the server returns are sent to the model provider — the full corpus is not. For zero egress, use a local model (Ollama, LM Studio).",

    // Footer
    footer_built_by: "Built by Robert Grabowski —"
  },

  pl: {
    // Header & Thesis
    brand_title: "mcp-redline",
    brand_badge: "stdio · bez portów sieciowych",
    brand_subtitle: "Deterministyczny Silnik Weryfikacji i Odmów",
    thesis_label: "Teza:",
    thesis_quote: "„Model, który pewnym tonem podaje nieprawdę, jest groźniejszy niż model, który odmawia.”",

    // Navigation actions & switcher labels
    nav_story: "Story Mode",
    nav_story_count: "(3 Akty)",
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
    engine_label: "Silnik deterministyczny, bez modelu językowego",
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
    quote_translated_prefix: "",
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
    sec_ciso_val: "korpus zostaje na dysku",

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
    step4_desc: "Podejrzyj ramki JSON-RPC 2.0 po stdio — bez portów sieciowych.",
    btn_start_demo: "Przejdź do demo",

    // Modals: Quickstart
    quickstart_title: "Jak Uruchomić mcp-redline (100% Offline)",
    quickstart_step1: "1. Instalacja i weryfikacja czystego środowiska (Clean Clone):",
    quickstart_step1_desc: "Wymaga Node.js 18+. Całość działa bez zewnętrznych API i bez wywołań sieciowych.",
    quickstart_step2: "2. Konfiguracja w Claude Desktop (claude_desktop_config.json):",
    quickstart_step3: "3. Kluczowe reguły bezpieczeństwa CISO:",
    quickstart_ciso_1: "Transport wyłącznie stdio: Brak portów sieciowych, brak serwera HTTP/SSE.",
    quickstart_ciso_2: "Granica danych: Serwer nie otwiera portów i nie wykonuje połączeń wychodzących. Korpus zostaje na dysku. Przy modelu w chmurze twierdzenie i zwrócone cytaty trafiają do dostawcy modelu — cały korpus nie. Zero ruchu wychodzącego daje dopiero model lokalny (Ollama, LM Studio).",
    quickstart_ciso_3: "Deterministyczny algorytm weryfikacji: Narzędzie verify nie wywołuje LLM – mechanizm antyhalucynacyjny sam nie może halucynować.",

    // Modals: Architecture
    arch_modal_title: "Architektura bezpieczeństwa",
    arch_desc_1: "Diagram 1: Deterministyczny potok weryfikacji narzędzia verify. Silnik nie zawiera modelu językowego.",
    arch_desc_2: "Diagram 2: Granica danych. Serwer nie otwiera portów i nie wykonuje połączeń wychodzących. Korpus zostaje na dysku. Przy modelu w chmurze twierdzenie i zwrócone cytaty trafiają do dostawcy modelu — cały korpus nie. Zero ruchu wychodzącego daje dopiero model lokalny (Ollama, LM Studio).",

    // Modals: Document Viewer
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
    story_act_3_sg3: "Serwer nie otwiera portów i nie wykonuje połączeń wychodzących. Korpus zostaje na dysku. Przy modelu w chmurze twierdzenie i zwrócone cytaty trafiają do dostawcy modelu — cały korpus nie. Zero ruchu wychodzącego daje dopiero model lokalny (Ollama, LM Studio).",

    // Footer
    footer_built_by: "Zbudował Robert Grabowski —"
  }
};

// Expose globally in browser and support both ES module and global script access
if (typeof window !== "undefined") {
  window.I18N = I18N;
}

export { I18N };
export default I18N;
