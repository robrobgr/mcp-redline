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

Run the automated evaluation harnesses over the English/bilingual corpus (64 claims) and the Polish legal case file corpus (44 claims):

```bash
npm run eval       # 64 claims (corpus/ + prompts_eval/claims.json)
npm run eval:pl    # 44 Polish legal claims (eval_pl/corpus/ + eval_pl/claims.json)
```

### English / Bilingual Benchmark (`prompts_eval`, n = 64)

| Split | Claims (n) | 3-Class Accuracy | False GROUNDED | Facts Confirmed | Non-facts Refused |
|---|---|---|---|---|---|
| `legacy` | 10 | 90% (9/10) | **0** | 4/4 (100%) | 6/6 (100%) |
| `dev` | 31 | 94% (29/31) | **0** | 18/18 (100%) | 13/13 (100%) |
| `holdout` | 23 | 87% (20/23) | **0** | 10/10 (100%) | 13/13 (100%) |
| **TOTAL** | **64** | **91% (58/64)** | **0** | **32/32 (100%)** | **32/32 (100%)** |

### Polish Legal Benchmark (`eval_pl`, n = 44)

| Split | Claims (n) | 3-Class Accuracy | False GROUNDED | Facts Confirmed | Non-facts Refused |
|---|---|---|---|---|---|
| `dev` (`D01`–`D44`) | 44 | **100% (44/44)** | **0** | **17/17 (100%)** | **27/27 (100%)** |

> [!NOTE]
> **Safe Asymmetry:** All 6 discrepancies out of 64 on `prompts_eval` are conservative refusals (`UNSUPPORTED` instead of `CONTRADICTED`, or one `CONTRADICTED` instead of `UNSUPPORTED`). False-GROUNDED rate is strictly 0 across both suites.

> [!WARNING]
> **Contaminated Holdout Disclosure:**  
> The initial holdout run scored 18/23 (78%) with 1 false GROUNDED (`H19`). After resolving architectural gaps (party binding and compound clause negation scope), the score reached 20/23 (87%) and 0 false GROUNDED. Because this holdout was authored by the same engineer and informed subsequent code revisions, it is documented as contaminated. Fully independent evaluation requires third-party authored assertions. See [prompts_eval/HOLDOUT_LOG.md](prompts_eval/HOLDOUT_LOG.md).

---

## How `verify` Works

The engine is split into a language-neutral core ([`src/engine.ts`](src/engine.ts)) and per-language packs ([`src/lang/en.ts`](src/lang/en.ts), [`src/lang/pl.ts`](src/lang/pl.ts)) implementing `LanguagePack`. It contains **no corpus-specific heuristics or hardcoded trap rules**.

1. **Verbatim Units:** Corpus is split into sentence units, key-value rows, and table lines. Every returned quote is an exact substring of the source file.
2. **Weighted Concept Coverage:** Rare terms carry higher weight (IDF), supplemented by language-pack lexicons and stemming. Proper nouns and stage/annex identifiers must be present in the quoted unit itself.
3. **Whole-Token & Clause-Scoped Numbers:** Numeric tokens are typed (money, percentage, year, count) with strict whole-number boundaries across space/NBSP/separator thousand groups and scoped to the clause matching the claim's stage or annex qualifier.
4. **Bidirectional Negation Scope:** Polarity is evaluated within the governing clause across verb negation (`not`, `nie`), prepositional antonymy (`bez X` vs `z X`, `without` vs `with`), and productive morphological `nie-`/`non-` prefixes, while ignoring legal validity formulas (`pod rygorem nieważności`).
5. **Modality vs. Completed Events:** Contractual norms, permissions, obligations, and payment deadlines (`may`, `shall`, `może`, `zobowiązuje się`, `płatne w terminie`) never ground claims of completed events in active past, passive participle (`zostało zapłacone`), or impersonal (`naliczono`, `odebrano`) form (`MODALITY_MISMATCH`).
6. **Multi-Slot Party & Role Binding:** Defined entity names and contractual roles (`Supplier`/`Dostawca`, `Customer`/`Zamawiający`) are bound across nominative subject, dative/prepositional recipient, and genitive possessor slots (`ROLE_MISMATCH`).
7. **Authority Tiers & Term-Level Chronology:** Tier 1 (executed contracts, amendments, protocols, invoices) overrides Tier 2 (CRM) and Tier 3 (email). Within the same tier, a later amendment supersedes an earlier agreement only on clauses sharing the same subject and attribute (`SUPERSEDED_BY_LATER_DOCUMENT`).
8. **Event–Date Binding:** Dates are bound to their event category (`signing`, `readiness`, `acceptance`, `issuance`, `delivery`, `deadline`, `effective`) so one date on a stage or annex never grounds a claim about another event.
9. **Compound Claims:** Up to 3 adjacent units of a single record (e.g. invoice number, amount, payment bank) may be combined. Prose sentences are never stitched together.

---

## Known Limitations

* **Lexical and morphological matching, not deep semantic inference:** Paraphrases outside the language-pack lexicons (`src/lang/en.ts`, `src/lang/pl.ts`) result in `UNSUPPORTED` (a safe failure mode). Adapting to a new domain requires expanding `LEXICON_GROUPS` in the language pack.
* **Single assertion per verify:** Sentences combining facts from distinct prose sentences or documents are not stitched into a synthetic composite; agents should split them into separate `verify` calls.
* **Multi-hop arithmetic and conditional calculation:** The engine verifies explicit figures and replacement clauses (`replaces X with Y`), but does not compute derived totals, interest accruals, or multi-step arithmetic across clauses.
* **Table column layout:** Numeric values in markdown tables are bound to table rows and header years rather than arbitrary multi-column matrix coordinates.
* **Tier extraction:** Inferred from filename patterns (`Email`, `CRM`, etc.) rather than document frontmatter metadata.
* **Section/Page indexing in markdown and prose:** In plain markdown and prose documents without physical pagination, the `page` field returned in results refers to logical sections (delimited by headers `#`, `##`, `###`) rather than physical printed page numbers.

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

## Architecture & Diagrams

Visualizations of the verification mechanism and data boundary:
* **[Architecture Overview](diagrams/README.md)**
* [Diagram 1: `verify` Algorithmic Flow](diagrams/01_verify_flow.en.svg)
* [Diagram 2: CISO & Compliance Data Boundary](diagrams/02_ciso_data_boundary.en.svg)
* [Diagram 3: Traditional RAG vs mcp-redline](diagrams/03_rag_vs_redline.en.svg)

---

## License

[MIT](LICENSE) · Copyright (c) 2026 Robert Grabowski.
