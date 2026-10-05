# i18n English Primary & Onboarding Guide Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add internationalization (i18n) with English as primary default, Polish alternative toggle (EN / PL), and an auto-opening onboarding guide ("How to use this demo" / Story Mode) on initial load, strictly adhering to zero-network CSP (`connect-src 'none'`).

**Architecture:** A standalone lightweight vanilla JS dictionary in `web/i18n.js` with DOM `data-i18n` bindings, header language switcher, localStorage state persistence, and startup modal trigger.

**Tech Stack:** Vanilla JavaScript (ESM/Browser), Tailwind CSS (precompiled), HTML5, Chrome DevTools MCP.

---

### Task 1: Create `web/i18n.js` Dictionary

**Files:**
- Create: `web/i18n.js`

**Step 1: Write `web/i18n.js`**
Define `window.I18N = { en: {...}, pl: {...} }` containing all translation strings:
- Header & Thesis
- Navigation actions & switcher labels
- Zone A: Corpus titles, Tier badges, search placeholder
- Zone B: Scenario selector, Triad perspectives (1. Lonely LLM / 2. LLM + Redline / 3. Redline Fail-Safe), CFO Liability Meter, claim input, noise button, A/B comparison cards
- Zone C: MCP inspector, RPC tabs, stdio trace, security footnotes
- Modals: Story Mode 3 Acts + Onboarding Guide "How to use this workbench", Quickstart guide, Architecture diagrams
- Footer: Author attribution
- Bilingual scenario metadata for P01–P10 (prompts, illustrative LLM responses, CFO financial liability analyses).

**Step 2: Verify `web/i18n.js` syntax**
Run: `node -c web/i18n.js`
Expected: Exit code 0 (valid JavaScript syntax).

**Step 3: Commit**
```bash
git add web/i18n.js
git commit -m "feat(i18n): create translation dictionary for en and pl"
```

---

### Task 2: Update `web/index.html` Markup

**Files:**
- Modify: `web/index.html`

**Step 1: Add `<script src="i18n.js"></script>` in `<head>`**
Insert script tag right before `dist/engine.bundle.js` or `data.js`.

**Step 2: Add Language Switcher to Header**
Insert segmented toggle button `EN | PL` next to Story Mode button:
```html
<div class="flex items-center rounded border border-brand-border bg-brand-surface p-0.5 text-xs font-mono shrink-0">
  <button id="btn-lang-en" class="px-2 py-0.5 rounded font-bold transition-colors">EN</button>
  <button id="btn-lang-pl" class="px-2 py-0.5 rounded transition-colors text-zinc-400">PL</button>
</div>
```

**Step 3: Add `data-i18n` attributes to all UI elements in `web/index.html`**
Tag all static strings with `data-i18n="key"` and `data-i18n-placeholder="key"`.

**Step 4: Enhance Story Mode Modal with Onboarding Guide**
Add introductory "How to use this workbench" guide section into the Story Mode modal.

**Step 5: Commit**
```bash
git add web/index.html
git commit -m "feat(i18n): add language switcher and data-i18n attributes to index.html"
```

---

### Task 3: Implement Translation Logic & Onboarding Auto-Open in `web/index.html`

**Files:**
- Modify: `web/index.html`

**Step 1: Add `applyLanguage(lang)` function**
Update:
- All `[data-i18n]` textContent
- All `[data-i18n-placeholder]` placeholder
- Active switcher button styling (`btn-lang-en` / `btn-lang-pl`)
- `<html lang="en">` or `<html lang="pl">`
- Refresh active scenario and liability meter with bilingual content

**Step 2: Connect Language Switcher Event Listeners**
Switch on click, persist to `localStorage.setItem('redline_lang', lang)`.

**Step 3: Auto-open Story Mode on first visit**
Check `!localStorage.getItem('redline_guide_seen')`:
- Open Story Mode modal automatically.
- Save flag to `localStorage.setItem('redline_guide_seen', '1')`.

**Step 4: Commit**
```bash
git add web/index.html
git commit -m "feat(i18n): implement language switching, persistence, and auto-opening onboarding guide"
```

---

### Task 4: Verify Locally in Browser & Mobile Viewport

**Files:**
- Test via Chrome DevTools MCP & `http://localhost:3333`

**Step 1: Run build & verify local server**
Run: `npm run build`
Check response on `http://localhost:3333`

**Step 2: Test Onboarding Modal & Language Switcher**
- Verify Story Mode opens automatically on fresh load
- Verify closing leaves English active
- Verify clicking `PL` switches everything to Polish
- Verify clicking `EN` restores English
- Verify 375px mobile viewport: `scrollWidth === 375 && !hasHorizontalScroll`
- Verify 0 console errors and 0 network requests outside localhost

---

### Task 5: Production Deployment & Live Verification

**Files:**
- Modify: `BACKLOG.md`, `CHANGELOG.md`

**Step 1: Commit and push to `origin/main`**
```bash
git add -A
git commit -m "feat(deploy): release i18n english primary and onboarding guide"
git push origin main
```

**Step 2: Verify on `https://redline.robertgrabowski.com`**
- Check HTTP 200, CSP `connect-src 'none'`
- Check initial English load + Story Mode onboarding
- Check language switcher EN/PL live
- Check 375px responsiveness
