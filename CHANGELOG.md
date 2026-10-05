# Changelog — mcp-redline

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
