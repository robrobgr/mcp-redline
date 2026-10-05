🇵🇱 [Wersja polska](README.pl.md)

# mcp-redline

> **Deterministic Model Context Protocol (MCP) server for document citation and claim verification with verbatim quotes or explicit refusal.**

🌐 **Live Demo:** [redline.robertgrabowski.com](https://redline.robertgrabowski.com)  
*Runs entirely in the browser with an enforced Content-Security-Policy header: `connect-src 'none'` (zero outbound network requests — verifiable in DevTools).*

Language models frequently assert false figures, dates, and contractual terms with high confidence. `mcp-redline` connects the model to a local evidential corpus and enforces that every factual assertion is either confirmed by a **verbatim source quote**, or explicitly flagged as **contradicted** or **unsupported**.

The verification engine uses no LLM, no vector database, and no external network calls: the same corpus and claim deterministically yield the same status, reason codes, and quote. **When in doubt, it refuses.**

> **Notice:** All entities, individuals, registration numbers (KRS, Company No, VAT), and financial figures in the demo corpus are entirely fictional and designed specifically to benchmark anti-hallucination resilience.

---

## 30-Second Quick Start

Requirements: Node.js >= 18, npm >= 9.

```bash
git clone https://github.com/robrobgr/mcp-redline.git
cd mcp-redline
npm install
npm run build
npm test        # 15 unit tests
npm run eval    # 64 benchmark claims
```

### Run Web Workbench Locally (100% Offline)

```bash
npm run demo
# Open http://localhost:3333 in any browser (works with Wi-Fi disabled)
```

---

## MCP Tools

| Tool | Parameters | Output |
|---|---|---|
| `list_sources` | — | Corpus files, section counts, and evidential authority tier (1 = contract/ledger, 2 = CRM, 3 = email) |
| `search` | `query` | Sentence- and table-row-level verbatim quotes: `{file, page, quote, score}` |
| `quote` | `file`, `page` | Exact verbatim section text without paraphrase |
| `verify` | `claim` | `status` (`GROUNDED` / `CONTRADICTED` / `UNSUPPORTED`), `reasonCodes: string[]`, `quote`, `explanation` |

### Verification Statuses

| Status | Definition | Permitted Agent Action |
|---|---|---|
| `GROUNDED` | A verbatim source unit matches the claim's concepts and numbers, shares polarity, and is not overridden by a higher tier. | Present as fact, citing the exact quote. |
| `CONTRADICTED` | An equal- or higher-tier source contradicts the claim (negation, conflicting numeric value, currency, or year). | State that source contradicts the claim, providing counter-quote. |
| `UNSUPPORTED` | The corpus contains insufficient evidence to decide. | Refuse to assert as fact. |

---

## Benchmark & Evaluation

Run the automated evaluation harness over 64 assertions:

```bash
npm run eval
```

| Split | Claims (n) | 3-Class Accuracy | False GROUNDED | Facts Confirmed | Non-facts Refused |
|---|---|---|---|---|---|
| `legacy` | 10 | 90% (9/10) | **0** | 4/4 (100%) | 6/6 (100%) |
| `dev` | 31 | 94% (29/31) | **0** | 18/18 (100%) | 13/13 (100%) |
| `holdout` | 23 | 87% (20/23) | **0** | 10/10 (100%) | 13/13 (100%) |
| **TOTAL** | **64** | **91% (58/64)** | **0** | **32/32 (100%)** | **32/32 (100%)** |

> [!NOTE]
> **Safe Asymmetry:** All 6 discrepancies out of 64 are conservative refusals (`UNSUPPORTED` instead of `CONTRADICTED`, or one `CONTRADICTED` instead of `UNSUPPORTED`). False-GROUNDED rate is strictly 0.

> [!WARNING]
> **Contaminated Holdout Disclosure:**  
> The initial holdout run scored 18/23 (78%) with 1 false GROUNDED (`H19`). After resolving architectural gaps (party binding and compound clause negation scope), the score reached 20/23 (87%) and 0 false GROUNDED. Because this holdout was authored by the same engineer and informed subsequent code revisions, it is documented as contaminated. Fully independent evaluation requires third-party authored assertions. See [prompts_eval/HOLDOUT_LOG.md](prompts_eval/HOLDOUT_LOG.md).

---

## How `verify` Works

The engine contains **no corpus-specific heuristics or hardcoded trap rules**. Generality is validated against an independent synthetic corpus (lease agreement) in `tests/server.test.ts`.

1. **Verbatim Units:** Corpus is split into sentence units, key-value rows, and table lines. Every returned quote is an exact substring of the source file.
2. **Weighted Concept Coverage:** Rare terms carry higher weight (IDF), supplemented by a bilingual PL/EN domain lexicon and lightweight stemming. Proper nouns must be present in the quoted unit itself.
3. **Number & Currency Matching:** Numeric tokens are typed (money, percentage, year, count). Mismatched numbers or currencies produce immediate contradiction.
4. **Negation Scope:** Polarity is evaluated within the specific clause governing the matched terms. An affirmative mention elsewhere does not contradict a valid negative fact.
5. **Reported Speech vs Fact:** Mere proposals or meeting requests ("COO requested penalty...") do not confirm that an action occurred.
6. **Party Binding:** Defined entity tokens (`("Supplier" or "Apex Meridian")`) prevent attributing terms of one party to another.
7. **Authority Tiers:** Tier 1 (executed contracts, invoices, balance sheets) overrides Tier 2 (CRM) and Tier 3 (email correspondence).
8. **Compound Claims:** Up to 3 adjacent units of a single record (e.g. invoice number, amount, payment bank) may be combined. Prose sentences are never stitched together.

---

## Limitations

* **Lexical matching, not deep semantic inference:** Paraphrases outside the domain lexicon result in `UNSUPPORTED` (a safe failure mode). Adapting to a new domain requires expanding `GROUPS` in `src/engine.ts`.
* **Single assertion per verify:** Sentences combining facts from distinct documents are not combined into a synthetic composite; agents should split them into separate `verify` calls.
* **Table column layout:** Numeric values are bound to table rows rather than individual header columns.
* **Tier extraction:** Currently inferred from filename patterns (`Email`, `CRM`, etc.) rather than metadata frontmatter.

---

## Integration Configuration

### Claude Desktop (`claude_desktop_config.json`)

```json
{
  "mcpServers": {
    "mcp-redline": {
      "command": "node",
      "args": ["<path-to-repo>/dist/src/index.js"],
      "env": {
        "MCP_REDLINE_CORPUS_DIR": "<path-to-repo>/corpus",
        "MCP_REDLINE_LANG": "en"
      }
    }
  }
}
```

Set `MCP_REDLINE_LANG=pl` to receive explanations in Polish while preserving identical machine-level statuses and reason codes.

---

## License

[MIT](LICENSE) · Copyright (c) 2026 Robert Grabowski.
