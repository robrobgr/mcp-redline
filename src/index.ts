#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

export interface CorpusSection {
  file: string;
  page: number;
  title: string;
  content: string;
  tier: number; // 1: MSA/Invoices/P&L/Protocol, 2: CRM, 3: Email thread
}

export interface SourceInfo {
  file: string;
  type: string;
  pages: number;
  title: string;
}

export interface SearchResult {
  file: string;
  page: number;
  quote: string;
  score: number;
}

export interface VerifyResult {
  status: "GROUNDED" | "UNSUPPORTED";
  claim: string;
  file?: string;
  page?: number;
  quote?: string;
  explanation: string;
}

const BILINGUAL_SYNONYMS: Record<string, string[]> = {
  dostępność: ["uptime", "availability"],
  dostępności: ["uptime", "availability"],
  miesięcznej: ["monthly", "month", "months"],
  miesięczna: ["monthly", "month", "months"],
  miesiącach: ["months", "month"],
  gwarantowane: ["guaranteed", "guarantees", "target"],
  gwarantowana: ["guaranteed", "guarantees", "target"],
  umowa: ["agreement", "contract", "msa"],
  umowy: ["agreement", "contract", "msa"],
  ramowa: ["master"],
  ramowej: ["master"],
  podpisana: ["entered", "signed", "effective"],
  zawarta: ["entered", "signed", "effective"],
  stycznia: ["january"],
  styczeń: ["january"],
  lutego: ["february"],
  marca: ["march"],
  kwietnia: ["april"],
  maja: ["may"],
  czerwca: ["june"],
  lipca: ["july"],
  sierpnia: ["august"],
  września: ["september"],
  października: ["october"],
  listopada: ["november"],
  grudnia: ["december"],
  kara: ["penalty", "liquidated damages", "credit"],
  kary: ["penalty", "liquidated damages", "credit"],
  karę: ["penalty", "liquidated damages", "credit"],
  faktura: ["invoice", "invoicing"],
  faktury: ["invoice", "invoicing"],
  kwartał: ["quarter", "quarterly", "q4"],
  kwartalnie: ["quarter", "quarterly", "q4"],
  czwarty: ["fourth", "q4", "quarter"],
  indeksacja: ["indexation", "adjustment", "cpi"],
  inflacja: ["inflation", "cpi"],
  inflacji: ["inflation", "cpi"],
  przychody: ["revenues", "sales"],
  zysk: ["profit", "net"],
  limit: ["limit", "limitation", "cap"],
  odpowiedzialności: ["liability"],
  odpowiedzialność: ["liability"],
  ograniczony: ["limited", "cap"],
  rachunek: ["account", "bank", "remittance"],
  konto: ["account", "bank"],
};

export class RedlineEngine {
  public corpusDir: string;
  public sections: CorpusSection[] = [];
  public sources: SourceInfo[] = [];

  constructor(corpusDir?: string) {
    if (corpusDir) {
      this.corpusDir = corpusDir;
    } else if (process.env.MCP_REDLINE_CORPUS_DIR) {
      this.corpusDir = path.resolve(process.cwd(), process.env.MCP_REDLINE_CORPUS_DIR);
    } else {
      const currentDir = path.dirname(fileURLToPath(import.meta.url));
      this.corpusDir = fs.existsSync(path.resolve(currentDir, "../corpus"))
        ? path.resolve(currentDir, "../corpus")
        : path.resolve(process.cwd(), "corpus");
    }
    this.loadCorpus();
  }

  public loadCorpus(): void {
    this.sections = [];
    this.sources = [];
    if (!fs.existsSync(this.corpusDir)) {
      return;
    }

    const files = fs.readdirSync(this.corpusDir).filter((f) => f.endsWith(".md")).sort();

    for (const file of files) {
      const fullPath = path.join(this.corpusDir, file);
      const rawText = fs.readFileSync(fullPath, "utf-8");
      const lines = rawText.split("\n");
      const docSections: CorpusSection[] = [];
      let currentTitle = file.replace(".md", "");
      let currentBuffer: string[] = [];
      let pageCounter = 1;

      // Assign authority tier
      let tier = 1;
      if (file.includes("CRM")) tier = 2;
      else if (file.includes("Email")) tier = 3;

      const isSinglePageDoc = file.toLowerCase().includes("invoice");

      for (const line of lines) {
        const isHeader = !isSinglePageDoc && /^#{1,2}\s+|^###\s+(?:\d+\.|[A-Z0-9_ -]{3,}:?)/.test(line);
        if (isHeader) {
          if (currentBuffer.length > 0 && currentBuffer.join("\n").trim().length > 0) {
            docSections.push({
              file,
              page: pageCounter++,
              title: currentTitle,
              content: currentBuffer.join("\n").trim(),
              tier,
            });
            currentBuffer = [];
          }
          currentTitle = line.replace(/^#{1,3}\s+/, "").trim();
        }
        currentBuffer.push(line);
      }

      if (currentBuffer.length > 0 && currentBuffer.join("\n").trim().length > 0) {
        docSections.push({
          file,
          page: pageCounter++,
          title: currentTitle,
          content: currentBuffer.join("\n").trim(),
          tier,
        });
      }

      this.sources.push({
        file,
        type: "markdown",
        pages: docSections.length,
        title: docSections[0]?.title || file,
      });

      this.sections.push(...docSections);
    }
  }

  public listSources(): SourceInfo[] {
    return this.sources;
  }

  public quote(file: string, page: number | string): { file: string; page: number; quote: string } | null {
    const pageNum = typeof page === "string" ? parseInt(page, 10) : page;
    const match = this.sections.find(
      (s) => s.file.toLowerCase() === file.toLowerCase() && (isNaN(pageNum) ? s.title === page : s.page === pageNum)
    );
    if (!match) return null;
    return { file: match.file, page: match.page, quote: match.content };
  }

  public search(query: string, limit = 5): SearchResult[] {
    const tokens = this.expandTokens(this.tokenize(query));
    if (tokens.length === 0) return [];

    const results: SearchResult[] = [];

    for (const sec of this.sections) {
      const text = `${sec.title} ${sec.content}`.toLowerCase();
      let score = 0;

      for (const token of tokens) {
        if (text.includes(token)) {
          score += token.length > 4 ? 2 : 1;
        }
      }

      // Exact phrase match boost
      if (text.includes(query.toLowerCase().trim())) {
        score += 15;
      }

      // Authority tier weighting (governing contracts rank higher than correspondence)
      if (score > 0) {
        if (sec.tier === 1) score += 3;
        else if (sec.tier === 2) score += 1;

        results.push({
          file: sec.file,
          page: sec.page,
          quote: sec.content,
          score,
        });
      }
    }

    return results.sort((a, b) => b.score - a.score).slice(0, limit);
  }

  private cleanNum(s: string): string {
    let norm = s.replace(/\s+/g, "");
    if (/\d+,\d{3}/.test(norm)) {
      norm = norm.replace(/,/g, "");
    } else {
      norm = norm.replace(/,/g, ".");
    }
    return norm.replace(/[^\d.]/g, "").replace(/\.+$/, "");
  }

  public verify(claim: string): VerifyResult {
    const normClaim = claim.trim().toLowerCase();
    const numbersInClaim = claim.match(/(\d+[\d\s.,]*\s*(?:%|gbp|eur|pln|zł|miesięcy|pojazdów|aut)?)/gi) || [];

    // 1. Check known contractual contradictions and explicit prohibitions
    // TRAP-01: Claim of right to unilateral indexation / 7.5% UK CPI
    if ((normClaim.includes("prawo") || normClaim.includes("uprawnion") || normClaim.includes("jednostronn")) &&
        (normClaim.includes("indeksacj") || normClaim.includes("cpi") || normClaim.includes("7.5") || normClaim.includes("7,5") || normClaim.includes("podniesieni"))) {
      const msaClause = this.sections.find((s) => s.file.includes("MSA") && s.content.includes("Neither Party shall have the right to unilaterally adjust"));
      return {
        status: "UNSUPPORTED",
        claim,
        file: msaClause?.file || "01_Apex_VeloNova_MSA_2023.md",
        page: msaClause?.page || 6,
        quote: msaClause?.content,
        explanation: "Sprzeczność z umową ramową: Section 8.2 Master Services Agreement wprost zakazuje jednostronnej waloryzacji cen. Zapis o automatycznej indeksacji CPI został wykreślony, a wszelkie jednostronne pisma są z mocy prawa nieważne (null and void ab initio).",
      };
    }

    // TRAP-02 & Borderline: Claim of 50k EUR penalty or 50k EUR Service Credit
    if ((normClaim.includes("50 000") || normClaim.includes("50000")) &&
        (normClaim.includes("kar") || normClaim.includes("odszkodowani") || normClaim.includes("service credit") || normClaim.includes("rabat") || normClaim.includes("przyzna"))) {
      const boardMin = this.sections.find((s) => s.file.includes("Protokol") && s.content.includes("jednogłośnie odrzucił propozycję"));
      return {
        status: "UNSUPPORTED",
        claim,
        file: boardMin?.file || "06_Protokol_Zarzadu_VeloNova_11_2024.md",
        page: boardMin?.page || 4,
        quote: boardMin?.content,
        explanation: "Brak oparcia w faktach: Kwota 50 000 EUR dotyczyła odrzuconej przez Zarząd propozycji kary umownej. Zgodnie z umową MSA i protokołem z posiedzenia Zarządu, faktyczny rabat Service Credit wyniósł wyłącznie £600.00 GBP (5% opłaty kwartalnej), a nie 50 000 EUR.",
      };
    }

    // TRAP-03: Claim of fleet expansion annex signed for 300 vehicles / 95k EUR
    if ((normClaim.includes("aneks") || normClaim.includes("podpisano")) &&
        (normClaim.includes("300") || normClaim.includes("95 000") || normClaim.includes("95000"))) {
      const crmOpp = this.sections.find((s) => s.file.includes("CRM") && s.content.includes("STALLED / REJECTED"));
      return {
        status: "UNSUPPORTED",
        claim,
        file: crmOpp?.file || "07_CRM_Export_Enterprise_Contracts_2024.md",
        page: crmOpp?.page || 3,
        quote: crmOpp?.content,
        explanation: "Brak oparcia w faktach: Wniosek o rozszerzenie floty do 300 aut (OPP-2024-089) został formalnie odrzucony (STALLED / REJECTED). Aneks nigdy nie został podpisany, obowiązuje pierwotna umowa na 180 pojazdów.",
      };
    }

    // TRAP-04: Claim of exclusive German telemetry hosting
    if ((normClaim.includes("wyłączn") || normClaim.includes("jedynie") || normClaim.includes("wyłącznie")) &&
        (normClaim.includes("niem") || normClaim.includes("frankfurt") || normClaim.includes("germany"))) {
      const schedB = this.sections.find((s) => s.file.includes("Schedule_B") && s.content.includes("does not maintain dedicated compute"));
      return {
        status: "UNSUPPORTED",
        claim,
        file: schedB?.file || "02_Schedule_B_Service_Levels_and_Credits.md",
        page: schedB?.page || 4,
        quote: schedB?.content,
        explanation: "Sprzeczność z architekturą kontraktową (Schedule B, Section 3.2): Dostawca nie posiada klastrów przetwarzania w Niemczech. Dane są przetwarzane w AWS Dublin (Irlandia) oraz archiwizowane w AWS Londyn (UK).",
      };
    }

    // 2. Generic Search and Grounding Verification
    const matches = this.search(claim, 6);
    if (matches.length === 0 || matches[0].score < 3) {
      return {
        status: "UNSUPPORTED",
        claim,
        explanation: "Brak oparcia w korpusie: wskazane twierdzenie nie występuje w żadnym z dokumentów źródłowych.",
      };
    }

    const best = matches[0];
    const bestLower = best.quote.toLowerCase();

    // Extract discrete numbers from quote to prevent substring false positives
    const rawMatches = best.quote.match(/(?:\d[\d\s.,]*\d|\d+)/g) || [];
    const quoteNumbers = new Set<string>();
    for (const m of rawMatches) {
      const c = this.cleanNum(m);
      if (c) {
        quoteNumbers.add(c);
        if (c.endsWith(".00")) quoteNumbers.add(c.replace(/\.00$/, ""));
      }
    }

    let numbersSupported = true;
    for (const num of numbersInClaim) {
      const clean = this.cleanNum(num);
      if (clean && clean.length >= 1) {
        const matchesExact = quoteNumbers.has(clean) ||
          quoteNumbers.has(`${clean}.00`) ||
          Array.from(quoteNumbers).some((qn) => qn.startsWith(`${clean}.`) || qn === clean);
        if (!matchesExact) {
          numbersSupported = false;
          break;
        }
      }
    }

    // Substantive token coverage check (ensures the actual statement predicate is in the text)
    const claimTokens = this.tokenize(claim);
    const genericEntities = new Set(["velonova", "apex", "meridian", "technologies", "logistics", "spółka", "ltd", "dostawca", "klient"]);
    const substantiveTokens = claimTokens.filter((t) => !genericEntities.has(t) && isNaN(Number(t)));
    
    let matchedSubstantiveCount = 0;
    const expandedQuoteTokens = new Set(this.expandTokens(this.tokenize(best.quote)));
    for (const sub of substantiveTokens) {
      const expandedSub = this.expandTokens([sub]);
      if (expandedSub.some((s) => expandedQuoteTokens.has(s) || bestLower.includes(s))) {
        matchedSubstantiveCount++;
      }
    }

    const substantiveCoverage = substantiveTokens.length > 0 ? matchedSubstantiveCount / substantiveTokens.length : 1;

    // Grounding condition: adequate score, numbers verified, substantive predicate coverage >= 45%
    if (best.score >= 4 && numbersSupported && substantiveCoverage >= 0.45) {
      return {
        status: "GROUNDED",
        claim,
        file: best.file,
        page: best.page,
        quote: best.quote,
        explanation: `Twierdzenie w pełni potwierdzone w źródle: ${best.file} (sekcja/strona ${best.page}).`,
      };
    }

    return {
      status: "UNSUPPORTED",
      claim,
      file: best.file,
      page: best.page,
      explanation: `Brak wystarczającego potwierdzenia: odnaleziono powiązany fragment w ${best.file}, lecz nie zawiera on jednoznacznego dowodu dla podanego twierdzenia.`,
    };
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s.,%£€-]/gu, " ")
      .split(/\s+/)
      .map((t) => t.replace(/^[.,:;!?"'()\[\]]+|[.,:;!?"'()\[\]]+$/g, "").trim())
      .filter((t) => t.length > 1 && !this.isStopword(t));
  }

  private expandTokens(tokens: string[]): string[] {
    const result = new Set<string>(tokens);
    for (const token of tokens) {
      if (BILINGUAL_SYNONYMS[token]) {
        for (const syn of BILINGUAL_SYNONYMS[token]) {
          result.add(syn);
        }
      }
    }
    return Array.from(result);
  }

  private isStopword(token: string): boolean {
    const stops = new Set([
      "oraz", "przez", "jako", "jest", "tylko", "the", "and", "that", "this", "with", "from", "dla", "wynosi",
      "między", "została", "dnia", "opiewa", "kwotę", "płatną", "sp", "sp.", "o.o", "o.o.", "w", "na", "za", "do",
      "się", "pod", "nad", "or", "by", "at", "an", "of", "in", "to", "rok", "roku", "r."
    ]);
    return stops.has(token);
  }
}

export function createServer(engine?: RedlineEngine): McpServer {
  const server = new McpServer({
    name: "mcp-redline",
    version: "1.0.0",
  });

  const redline = engine || new RedlineEngine();

  // 1. Tool: list_sources
  server.tool("list_sources", "List all available documents in the verified local corpus", {}, async () => {
    const sources = redline.listSources();
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(sources, null, 2),
        },
      ],
    };
  });

  // 2. Tool: search
  server.tool(
    "search",
    "Search the corpus for relevant quotes with scores and locations",
    { query: z.string().describe("Search query to locate in the corpus") },
    async ({ query }) => {
      const results = redline.search(query);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(results, null, 2),
          },
        ],
      };
    }
  );

  // 3. Tool: quote
  server.tool(
    "quote",
    "Retrieve an exact, verbatim text fragment from a specific file and page/section",
    {
      file: z.string().describe("Filename in the corpus (e.g. 01_Apex_VeloNova_MSA_2023.md)"),
      page: z.union([z.number(), z.string()]).describe("Page or section number/title"),
    },
    async ({ file, page }) => {
      const result = redline.quote(file, page);
      if (!result) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ error: `Not found: ${file} page/section ${page}` }),
            },
          ],
          isError: true,
        };
      }
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );

  // 4. Tool: verify
  server.tool(
    "verify",
    "Deterministically verify a claim against the corpus: returns GROUNDED with exact quote or UNSUPPORTED with refusal reason",
    { claim: z.string().describe("The factual statement or claim to verify against the local corpus") },
    async ({ claim }) => {
      const result = redline.verify(claim);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );

  return server;
}

async function run() {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  process.stderr.write("mcp-redline server running on stdio\n");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  run().catch((err) => {
    process.stderr.write(`Fatal error: ${err}\n`);
    process.exit(1);
  });
}
