# Changelog — mcp-redline

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.3.2] — 2026-10-06

### Fixed
- **Cache revalidation:** Added `Cache-Control: public, max-age=0, must-revalidate` in `vercel.json` and automated asset URL version query params (`?v=1.3.2`) in build pipeline for instant refresh on returning clients.
- **Polish translations:** Corrected Polish `brand_badge` to `stdio · bez portów sieciowych`, updated `quickstart_ciso_2` with the accurate data boundary statement, and renamed Diagram 2 in `README.pl.md` to *Granica danych*.
- **Overstated claims:** Replaced absolute phrases across EN/PL UI (`FAIL-SAFE // REFUSES WHEN UNSURE`, `VERBATIM EVIDENCE`, `GROUNDED // VERBATIM QUOTE`, `Same input, same verdict`, `Local stdio process, no network ports`, refused before decision).
- **Coverage thresholds in Story Mode:** Corrected verification coverage threshold numbers (0.6 unit+context, 0.5 unit, 0.45 contradiction) in Story Mode Act 2 and removed arbitrary latency claims.
- **Diagram theme contrast:** Re-rendered all architecture diagrams with Mermaid dark theme (`-t dark -b transparent`) ensuring clear contrast for edge arrows and labels on dark backgrounds.

---

## [1.3.1] — 2026-10-06

### Fixed
- **Accurate data boundary description:** Described the actual data boundary accurately across documentation, UI, and diagrams. The server opens no network ports and keeps the corpus on disk. Cloud models receive claims and returned quotes from the MCP client; zero egress requires a local model (Ollama, LM Studio). Removed inaccurate air-gap/zero-data claims.
- **Architecture modal:** Removed misleading Diagram 3 (RAG comparison); rewrote Diagram 1 strictly according to the deterministic `verify` algorithm and actual thresholds; rewrote Diagram 2 to illustrate the genuine workstation vs model data boundary. Renamed modal to *Security architecture* / *Architektura bezpieczeństwa*.
- **Initial claim in English mode:** Clean visits in English mode start with an English-language claim (D01: MSA execution fact) instead of a Polish claim.
- **Scenario translation gloss:** Reference translation under `#claim-input` recomputes dynamically on every scenario change and hides completely when the claim is in the current interface language.
- **English scenario content:** Complete English translations provided for all scenarios (D01–D31 and H01–H23) via bilingual generator in `scripts/build-web-data.js`.
- **Dynamic scenario kind labels:** Scenario dropdown options show specific kind labels (`Fact in Tier N`, `Trap`, `Out of corpus`) consistent with engine verdicts.
- **Server execution path:** Corrected executable path in quickstart instructions to `dist/src/index.js`.
- **Wording:** Replaced all occurrences of `hallucination-free` / `bez halucynacji` with `Deterministic engine, no language model` / `Silnik deterministyczny, bez modelu językowego`.

### Removed
- Removed unused unsuffixed diagram assets and deleted infographic button, modal, images, and keys.

---

## [1.3.0] — 2026-10-05

### Changed
- **Default verification language:** Default language for verification explanations (`explanation`) and reasons switched from Polish to English. Polish explanations remain available on demand via `MCP_REDLINE_LANG=pl` environment variable or engine parameter `lang: "pl"`.
- **Reason codes in `VerifyResult`:** Added structured `reasonCodes: string[]` (e.g. `NUMBER_MISMATCH`, `CURRENCY_MISMATCH`, `NEGATED`, `PARTY_MISMATCH`, `NO_CHECKABLE_TERMS`, `HIGHER_TIER_CONFLICT`) enabling programmatic assertions independent of language-specific explanation strings.
- **Message catalog extraction:** Extracted all ~55 lines of verification message templates into a structured dictionary (`src/messages.ts`) with typed parameterization for `en` and `pl`.
- **English primary documentation:** Repository documentation rewritten in English (`README.md`, `CHANGELOG.md`, `ROADMAP.md`, `docs/INTEGRATION_GUIDE.md`, `docs/00_Master_Fact_Sheet.md`, `diagrams/README.md`), with `README.pl.md` maintained as the official Polish reference.
- **Evaluation report template:** Automated evaluation runner (`scripts/eval.js`) now generates English evaluation reports (`prompts_eval/EVALUATION_REPORT.md`).

### Added
- **MCP server language selection:** Stdio server accepts `MCP_REDLINE_LANG=en|pl` (documented in `.env.example`).
- **Web demo language persistence & URL parameter:** Supported `?lang=pl|en` URL parameter with precedence over `localStorage`, header language toggle (`EN` / `PL`), and synchronized engine explanation language.
- **Bilingual parity test:** Added unit test in `tests/server.test.ts` verifying identical status, reasonCodes, and verbatim quotes between English and Polish engine modes.
- **Fictional data disclosure:** Explicit notification across documentation that all entities, individuals, registration numbers, and financial values are entirely fictional.

---

## [1.2.0] — 2026-10-05

### Changed
- **Browser demo powered by genuine engine:** Extracted `RedlineEngineCore` into `src/engine.ts` and compiled browser bundle `web/dist/engine.bundle.js` via `esbuild`. Replaced manual duplicated logic in `web/index.html` and deleted hardcoded trap handlers (`TRAP-01…04`).
- **100% offline workbench:** Built dedicated local Tailwind CSS (`web/dist/tailwind.css`), bundled local Inter, JetBrains Mono, and Material Symbols fonts (zero outbound network requests, functions with Wi-Fi disabled).
- **Financial rigor in Risk Meter:** Added explicit formulas derived directly from corpus contracts for all CFO Liability Meter figures (e.g., `7.5% × £48,000 GBP = £3,600 GBP/yr`), marking fail-safe audit costs as estimates.
- **Illustrative simulation badge:** Added explicit `ILLUSTRATIVE RESPONSE` labels and warning banners to simulated standard LLM responses.
- **Package exports:** Updated `main` and `bin` to point to `dist/src/index.js`, configured `files` array, and bound `bundle:engine` to build lifecycle.

### Added
- **Contaminated holdout disclosure:** Documented holdout tuning history and published complete evaluation matrix (91% 3-class accuracy across 64 assertions, 0 false GROUNDED).
- **Three decision perspectives:** Added comparison perspectives (Lonely LLM, LLM + Redline, Redline Doubt) and OCR noise simulator in web interface.
- **Production Vercel deployment:** Configured continuous git deployment for `redline.robertgrabowski.com` via push to `main`.
- **Enforced Content-Security-Policy:** Implemented browser-enforced header `connect-src 'none'`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy: no-referrer`.
- **Mobile responsiveness:** Fixed layout scaling for 375 px viewport with no horizontal overflow.
- **Legal precision:** Aligned terminology with MSA Clause 11.2 (*willful misconduct* → "wina umyślna").

---

## [1.1.0] — 2026-09-24

### Changed
- **Engine rewrite from first principles:** Replaced hardcoded keyword branches (`TRAP-01…04`) with general deterministic AST parsing and verification logic. The legacy engine previously misclassified 9 out of 15 new assertions, producing 4 false GROUNDED verdicts.
- **Three-state verification:** Introduced `GROUNDED`, `CONTRADICTED`, and `UNSUPPORTED` statuses (replacing two-state logic to support verified negative claims).
- **Granular verbatim citations:** Replaced whole-section quotes with sentence-, key-value-, and table-row-level verbatim substrings.
- **Source precedence:** Implemented tier rankings: Tier 1 (contracts, invoices, financial statements) > Tier 2 (CRM) > Tier 3 (correspondence).
- **Evidence structures:** Expanded `verify` output to include `evidence` (coverage, matched/missing concepts, reasons) and `conflicting` sources.

### Added
- **Evaluation dataset:** Added `prompts_eval/claims.json` containing 64 assertions across `legacy`, `dev`, and `holdout` splits.
- **Evaluation runner:** Added `scripts/eval.js` with per-split metrics, confusion matrices, and hard exit-code failure on any false GROUNDED.
- **Holdout log:** Added `prompts_eval/HOLDOUT_LOG.md` recording historical evaluation runs.
- **Comprehensive test suite:** Added tests for verbatim quotes, English paraphrases, source hierarchy, reported speech, party binding, and an independent synthetic lease agreement corpus.

---

## [1.0.0] — 2026-09-23

### Added
- Initial implementation of `mcp-redline` in Node.js and TypeScript.
- MCP stdio transport implementation supporting `list_sources`, `search`, `quote`, and `verify`.
- Synthetic corpus representing a UK-Polish commercial logistics dispute.
- Architecture diagrams: verification flow, CISO data boundary, and RAG vs Redline comparison.
- Web demonstration interface with JSON-RPC protocol inspector.
