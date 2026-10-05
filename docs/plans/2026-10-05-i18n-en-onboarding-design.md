# Design Doc: i18n English Primary & Onboarding Guide for mcp-redline

- **Date:** 2026-10-05
- **Author:** Robert Grabowski & Antigravity
- **Target:** `web/` demo workbench of `mcp-redline` (`redline.robertgrabowski.com`)

## 1. Problem Statement
The current interactive web demo is primarily rendered in Polish. To make the project accessible globally to the broader AI, MCP, and developer communities, English must be the primary/default landing language, with seamless in-browser switching to Polish (EN / PL). Additionally, first-time visitors need an immediate onboarding walkthrough ("How to use this demo" / Story Mode) opened automatically on initial load.

## 2. Constraints & Principles
1. **Zero Runtime Network:** Must strictly comply with Content-Security-Policy `connect-src 'none'`. No external CDN libraries, no remote translation fetches.
2. **Offline-first:** All dictionaries and assets bundled locally in `web/`.
3. **No Page Reloads on Language Switch:** Instant DOM text replacement via lightweight data attributes (`data-i18n`) and scenario re-rendering.
4. **Persistence:** User language choice and onboarding status stored in `localStorage` (`redline_lang`, `redline_guide_seen`).
5. **Default Language:** English (`en`).

## 3. Architecture & Components

### 3.1 Translation Dictionary (`web/i18n.js`)
- Exposes `window.I18N = { en: { ... }, pl: { ... } }`.
- Covers:
  - Header & branding (title, badges, thesis statement).
  - Navigation actions (Story Mode, Infographics, CISO Architecture, Run Server, EN/PL switcher).
  - Zone A: Corpus hierarchy, tier descriptions, search placeholders, protocol tags.
  - Zone B: Scenarios toolbar, triad perspectives (Lonely LLM, LLM + Redline, Redline Fail-Safe), CFO Liability Meter, claim input arena, noise simulation buttons, A/B comparison cards (Standard LLM illustration vs Redline proof), claim verification badges.
  - Zone C: MCP JSON-RPC protocol inspector, tabs (Request, Response, Stdio stream), security footnotes.
  - Modals: Story Mode 3 Acts + Onboarding Guide Step 0 ("How to Use This Workbench"), CISO Architecture tabs, Quickstart guide.
  - Footer: Author credit.
- Bilingual scenario metadata for P01–P10 (prompts, illustrative LLM responses, CFO financial exposure analyses, and explanations in EN & PL).

### 3.2 Language Switcher UI & State Management
- Segmented button `EN | PL` placed in the top navigation bar.
- On initialization:
  - Check `localStorage.getItem('redline_lang') || 'en'`.
  - Set `<html lang="en">` (or `pl`).
  - Update `data-i18n` elements and dynamic scenario view.
- On click:
  - Switch language immediately, save to `localStorage`, trigger re-rendering of active scenario.

### 3.3 Onboarding Guide & Startup Flow
- Integrated into Story Mode modal:
  - Includes a prominent "How to use this demo" section highlighting:
    1. Select a test scenario (traps, contradicted claims, verified facts).
    2. Click verify and compare Standard LLM hallucination vs Redline deterministic proof.
    3. Observe the CFO liability and financial exposure meter.
    4. Inspect raw JSON-RPC stdio protocol events in the right-hand inspector.
    5. Explore 3 Acts (The hallucination crisis, The deterministic guard, Fail-safe human audit).
- On initial visit:
  - If `!localStorage.getItem('redline_guide_seen')`, automatically open the modal in English.
  - Set `localStorage.setItem('redline_guide_seen', '1')`.
  - User can close via Escape, close button, or backdrop click. Re-accessible anytime via "Story Mode / Guide" button.

## 4. Verification & Testing
1. Load `https://redline.robertgrabowski.com` (and localhost:3333):
   - First visit automatically shows English onboarding Story Mode.
   - Closing modal leaves English UI active.
   - Clicking `PL` instantly translates entire UI, scenario, cards, inspector, and modals to Polish.
   - Clicking `EN` restores English.
2. Responsiveness: Verify 375px mobile viewport has no horizontal scrolling with the new language toggle.
3. Network: Verify zero network calls in Network tab (`connect-src 'none'`).
4. Unit/eval: `npm test && npm run eval` unaffected.
