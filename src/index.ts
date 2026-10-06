#!/usr/bin/env node
/**
 * mcp-redline — deterministic claim verification over a local Markdown corpus.
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { RedlineEngineCore, SupportedLang } from "./engine.js";

export * from "./engine.js";

export class RedlineEngine extends RedlineEngineCore {
  public corpusDir: string = "";

  constructor(
    corpusDir?: string | Array<{ file: string; content: string }>,
    lang?: SupportedLang
  ) {
    const defaultLang = (process.env.MCP_REDLINE_LANG === "pl" ? "pl" : "en") as SupportedLang;
    super(lang || defaultLang);
    if (Array.isArray(corpusDir)) {
      this.loadDocuments(corpusDir);
      return;
    }
    if (corpusDir) {
      this.corpusDir = corpusDir;
    } else if (process.env.MCP_REDLINE_CORPUS_DIR) {
      this.corpusDir = path.resolve(process.cwd(), process.env.MCP_REDLINE_CORPUS_DIR);
    } else {
      const here = path.dirname(fileURLToPath(import.meta.url));
      const candidates = [path.resolve(here, "../corpus"), path.resolve(here, "../../corpus"), path.resolve(process.cwd(), "corpus")];
      this.corpusDir = candidates.find((c) => fs.existsSync(c)) || candidates[2];
    }
    this.loadCorpus();
  }

  public loadCorpus(): void {
    if (!this.corpusDir || !fs.existsSync(this.corpusDir)) return;
    const fileNames = fs.readdirSync(this.corpusDir).filter((f) => f.endsWith(".md")).sort();
    const docs = fileNames.map((file) => ({
      file,
      content: fs.readFileSync(path.join(this.corpusDir, file), "utf-8"),
    }));
    this.loadDocuments(docs);
  }
}

// ───────────────────────────── MCP server ─────────────────────────────

const json = (v: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(v, null, 2) }] });

export function createServer(engine?: RedlineEngine): McpServer {
  const server = new McpServer({ name: "mcp-redline", version: "1.3.1" });
  const redline = engine || new RedlineEngine();

  server.tool("list_sources", "List all documents in the local corpus with their authority tier (1 = contract/ledger, 2 = CRM, 3 = correspondence)", {}, async () =>
    json(redline.listSources()));

  server.tool(
    "search",
    "Search the corpus; returns verbatim sentence-level quotes with file, section and score",
    { query: z.string().describe("Search query") },
    async ({ query }) => json(redline.search(query))
  );

  server.tool(
    "quote",
    "Retrieve the exact, verbatim text of a section (page) of a corpus file",
    {
      file: z.string().describe("Filename in the corpus (e.g. 01_Apex_VeloNova_MSA_2023.md)"),
      page: z.union([z.number(), z.string()]).describe("Section number or title"),
    },
    async ({ file, page }) => {
      const result = redline.quote(file, page);
      if (!result) return { ...json({ error: `Not found: ${file} section ${page}` }), isError: true };
      return json(result);
    }
  );

  server.tool(
    "verify",
    "Deterministically verify a claim against the corpus (no LLM). Returns GROUNDED with a verbatim supporting quote, CONTRADICTED with a verbatim counter-quote from an equal-or-higher authority source, or UNSUPPORTED when nothing is decisive. Only GROUNDED may be presented as fact.",
    { claim: z.string().describe("A single factual statement to verify") },
    async ({ claim }) => json(redline.verify(claim))
  );

  return server;
}

async function run() {
  const server = createServer();
  await server.connect(new StdioServerTransport());
  process.stderr.write("mcp-redline server running on stdio\n");
}

if (process.argv[1] && fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run().catch((err) => {
    process.stderr.write(`Fatal error: ${err}\n`);
    process.exit(1);
  });
}
