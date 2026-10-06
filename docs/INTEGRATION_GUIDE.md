# INTEGRATION GUIDE: Connecting `mcp-redline` to a Live LLM

This document provides a guide for connecting the **mcp-redline** server to Model Context Protocol (MCP) clients and directly via API (Claude Desktop, Cursor, OpenAI, Anthropic, Google Gemini, Ollama).

---

## 1. How the LLM Connection Works

Under the **Model Context Protocol (MCP)** specification:
- **Your application / LLM host** (e.g. Claude Desktop, Cursor, or an agent script) acts as the **Client (Host)**.
- **mcp-redline** acts as the **Server**, communicating over standard input/output (`stdio`) using JSON-RPC 2.0.
- The server opens no network ports and makes no outbound calls. Your corpus stays on disk. When you use a cloud model, the claim and the quotes the server returns are sent to the model provider — the full corpus is not. For zero egress, use a local model (Ollama, LM Studio). The LLM is granted 4 tools: `verify`, `search`, `quote`, `list_sources`.

When a user asks a factual question (e.g., *"Does the supplier have the right to charge a 50,000 EUR contractual penalty?"*), the agent:
1. Recognizes the need to verify facts against the evidential corpus.
2. Dispatches a `tools/call: verify` request to `mcp-redline`.
3. The deterministic AST engine verifies the claim in ~2 ms and returns a verdict (`GROUNDED`, `CONTRADICTED`, or `UNSUPPORTED`), reason codes, and verbatim quotes.
4. The model formulates its response strictly grounded in verified facts, incapable of generating ungrounded assertions.

---

## 2. Language Configuration (`MCP_REDLINE_LANG`)

The verification engine supports bilingual explanation generation:

- **`MCP_REDLINE_LANG=en` (Default):** Generates human-readable `explanation` text and reasons in English.
- **`MCP_REDLINE_LANG=pl`:** Generates human-readable `explanation` text and reasons in Polish.

```bash
# Example launching the stdio server with Polish explanations:
MCP_REDLINE_LANG=pl node <path-to-repo>/dist/src/index.js
```

> [!NOTE]
> Machine-level statuses (`GROUNDED`, `CONTRADICTED`, `UNSUPPORTED`) and structured `reasonCodes` (`NUMBER_MISMATCH`, `CURRENCY_MISMATCH`, `NEGATED`, etc.) remain **identical** regardless of language setting. Only human-facing explanations adapt.

---

## 3. Connecting to Claude Desktop (Anthropic API / Claude 3.5 Sonnet)

1. Ensure the project is built:
   ```bash
   cd <path-to-repo>
   npm run build
   ```

2. Open the Claude Desktop configuration file:
   - **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

3. Add `mcp-redline` under `mcpServers`:
   ```json
   {
     "mcpServers": {
       "redline": {
         "command": "node",
         "args": [
           "<path-to-repo>/dist/src/index.js"
         ],
         "env": {
           "MCP_REDLINE_CORPUS_DIR": "<path-to-repo>/corpus",
           "MCP_REDLINE_LANG": "en"
         }
       }
     }
   }
   ```

4. Restart Claude Desktop. The hammer icon in the prompt input will show 4 available tools (`verify`, `quote`, `search`, `list_sources`).

---

## 4. Connecting to Cursor IDE

1. Open Cursor Settings: `Cursor Settings` -> `Features` -> `MCP Servers`.
2. Click **Add New MCP Server**.
3. Fill in:
   - **Name:** `mcp-redline`
   - **Type:** `stdio`
   - **Command:** `node <path-to-repo>/dist/src/index.js`
4. Or in your project's `.cursor/mcp.json`:
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

---

## 5. Live Model Verification Prompts

Here are sample prompts that demonstrate the difference in agent behavior:

### Test 1: Inflation Trap (7.5% UK CPI Price Increase)
> **Prompt:** *"Can UK telematics supplier Apex Meridian unilaterally increase subscription fees by 7.5% UK CPI starting January 2025?"*  
> **Without Redline:** Standard LLMs often cite the supplier's sales email and agree that inflation adjustment is permissible.  
> **With Redline:** `verify` triggers `CONTRADICTED`, citing MSA Section 8.2 where the unilateral CPI indexation clause was explicitly struck out during contract execution.

### Test 2: Fraudulent Penalty Claim (50,000 EUR Outage Fine)
> **Prompt:** *"Did VeloNova successfully impose a 50,000 EUR contractual penalty on Apex Meridian for the Frankfurt gateway outage?"*  
> **Without Redline:** Models often validate the COO proposal mentioned in executive minutes.  
> **With Redline:** `verify` flags that the board unanimously rejected the proposal and that liquidated damages are excluded by MSA Section 11, returning `CONTRADICTED`.
