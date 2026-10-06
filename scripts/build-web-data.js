import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { DOC_TEXT, CLAIM_TR, QUOTE_EN, P_SCENARIOS, kindOf, riskFor, genericContent } from './scenario-content.mjs';

const rootDir = process.cwd();
const corpusDir = path.join(rootDir, 'corpus');
const evalRawPath = path.join(rootDir, 'prompts_eval', 'results_raw.json');
const outputPath = path.join(rootDir, 'web', 'data.js');

const files = fs.readdirSync(corpusDir).filter(f => f.endsWith('.md')).sort();

const docs = files.map(filename => {
  const content = fs.readFileSync(path.join(corpusDir, filename), 'utf-8');
  const hash = '0x' + crypto.createHash('sha256').update(content).digest('hex').slice(0, 12) + '...';
  const fullHash = crypto.createHash('sha256').update(content).digest('hex');
  const lines = content.split('\n').length;
  const words = content.split(/\s+/).length;

  let tier = 'Tier 2: Operational Annex';
  let tierLevel = 2;
  let docKey = null;
  let badgeColor = 'tertiary';

  if (filename.includes('MSA')) {
    tier = 'Tier 1: Governing Contract';
    tierLevel = 1;
    badgeColor = 'secondary';
    docKey = 'MSA';
  } else if (filename.includes('Schedule_B')) {
    tier = 'Tier 1: SLA Schedule';
    tierLevel = 1;
    badgeColor = 'secondary';
    docKey = 'Schedule_B';
  } else if (filename.includes('Invoice')) {
    tier = 'Tier 1: Financial Ledger';
    tierLevel = 1;
    badgeColor = 'secondary';
    docKey = 'Invoice';
  } else if (filename.includes('Email')) {
    tier = 'Tier 3: Advisory / Informal Email';
    tierLevel = 3;
    badgeColor = 'primary';
    docKey = 'Email';
  } else if (filename.includes('Rachunek')) {
    tier = 'Tier 1: Financial Statement';
    tierLevel = 1;
    badgeColor = 'secondary';
    docKey = 'Rachunek';
  } else if (filename.includes('Protokol')) {
    tier = 'Tier 1: Executive Board Record';
    tierLevel = 1;
    badgeColor = 'secondary';
    docKey = 'Protokol';
  } else if (filename.includes('CRM')) {
    tier = 'Tier 2: CRM Sales Pipeline';
    tierLevel = 2;
    badgeColor = 'tertiary';
    docKey = 'CRM';
  }

  const fileTitle = filename.replace(/^\d+_/, '').replace(/\.md$/, '').replace(/_/g, ' ');
  const text = DOC_TEXT[docKey];

  return {
    filename,
    title: { en: (text.title && text.title.en) || fileTitle, pl: (text.title && text.title.pl) || fileTitle },
    tier,
    tierLevel,
    badgeColor,
    summary: text.summary,
    hash,
    fullHash,
    lines,
    words,
    content
  };
});

const evalRaw = JSON.parse(fs.readFileSync(evalRawPath, 'utf-8'));

const POLISH_CHARS = /[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/;
const MONEY = /(?:[£€]\s*)?\b\d{1,3}(?:[ ,.]\d{3})*(?:[.,]\d+)?\s*(?:GBP|EUR|PLN|zł|euro|funt\p{L}*|pounds?)/iu;

function collectStrings(value, out = []) {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach(v => collectStrings(v, out));
  else if (value && typeof value === 'object') Object.values(value).forEach(v => collectStrings(v, out));
  return out;
}

// Every scenario carries its content as an {en, pl} pair. The claim itself stays verbatim in its original language;
// the other language is the reference translation only.
const scenarios = evalRaw.results.map(r => {
  const kind = kindOf(r.expected);
  const isP = r.id.startsWith('P');
  const pEntry = isP ? P_SCENARIOS[r.id] : null;

  let claimLang;
  let translation;
  if (isP) {
    claimLang = 'pl';
    translation = pEntry.en.prompt;
  } else {
    if (!CLAIM_TR[r.id]) throw new Error(`Missing claim translation for ${r.id}`);
    [claimLang, translation] = CLAIM_TR[r.id];
  }
  const otherLang = claimLang === 'pl' ? 'en' : 'pl';
  const claimText = { [claimLang]: r.claim, [otherLang]: translation };

  const quoteIsPolish = POLISH_CHARS.test(r.quote || '');
  if (quoteIsPolish && !QUOTE_EN[r.id]) throw new Error(`Missing English quote translation for ${r.id}`);
  const quoteText = { pl: r.quote || '', en: quoteIsPolish ? QUOTE_EN[r.id] : (r.quote || '') };

  const amountMatch = r.claim.match(MONEY);
  const amount = amountMatch ? amountMatch[0] : '';

  const i18n = {};
  for (const lang of ['en', 'pl']) {
    if (isP) {
      i18n[lang] = { ...pEntry[lang], prompt: claimText[lang] };
    } else {
      i18n[lang] = genericContent(lang, {
        kind,
        text: claimText[lang],
        amount,
        file: r.file,
        page: r.page,
        tier: r.tier,
        verdict: r.verdict,
        quote: quoteText[lang]
      });
    }
  }
  if (quoteIsPolish) i18n.en.quote = QUOTE_EN[r.id];

  const polishInEn = collectStrings(i18n.en).filter(s => POLISH_CHARS.test(s));
  if (polishInEn.length > 0) throw new Error(`Polish characters in English content of ${r.id}: ${polishInEn[0]}`);

  const { explanation, ...rest } = r;
  return {
    ...rest,
    prompt: r.claim,
    claim: r.claim,
    claimLang,
    kind,
    category: r.verdict,
    riskLevel: isP ? pEntry.riskLevel : riskFor(kind),
    i18n
  };
});

const sections = [];

for (const file of files) {
  const rawText = fs.readFileSync(path.join(corpusDir, file), 'utf-8');
  const lines = rawText.split('\n');
  let currentTitle = file.replace('.md', '');
  let currentBuffer = [];
  let pageCounter = 1;

  let tier = 1;
  if (file.includes('CRM')) tier = 2;
  else if (file.includes('Email')) tier = 3;

  const isSinglePageDoc = file.toLowerCase().includes('invoice');

  for (const line of lines) {
    const isHeader = !isSinglePageDoc && /^#{1,2}\s+|^###\s+(?:\d+\.|[A-Z0-9_ -]{3,}:?)/.test(line);
    if (isHeader) {
      if (currentBuffer.length > 0 && currentBuffer.join('\n').trim().length > 0) {
        sections.push({
          file,
          page: pageCounter++,
          title: currentTitle,
          content: currentBuffer.join('\n').trim(),
          tier,
        });
        currentBuffer = [];
      }
      currentTitle = line.replace(/^#{1,3}\s+/, '').trim();
    }
    currentBuffer.push(line);
  }

  if (currentBuffer.length > 0 && currentBuffer.join('\n').trim().length > 0) {
    sections.push({
      file,
      page: pageCounter++,
      title: currentTitle,
      content: currentBuffer.join('\n').trim(),
      tier,
    });
  }
}

const BILINGUAL_SYNONYMS = {
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
  przychody: ["revenues", "sales", "przychód", "sprzedaż"],
  przychód: ["revenues", "sales"],
  operacyjne: ["operating", "operations", "operacyjna", "działalności"],
  operacyjna: ["operating", "operations"],
  zysk: ["profit", "net"],
  limit: ["limit", "limitation", "cap"],
  odpowiedzialności: ["liability"],
  odpowiedzialność: ["liability"],
  ograniczony: ["limited", "cap"],
  rachunek: ["account", "bank", "remittance"],
  konto: ["account", "bank"],
};

const fileContent = `// Auto-generated dataset for mcp-redline interactive single-page demo
// Generated at: ${new Date().toISOString()}

export const CORPUS_DOCS = ${JSON.stringify(docs, null, 2)};

export const SECTIONS = ${JSON.stringify(sections, null, 2)};

export const BILINGUAL_SYNONYMS = ${JSON.stringify(BILINGUAL_SYNONYMS, null, 2)};

export const SCENARIOS = ${JSON.stringify(scenarios, null, 2)};
`;

fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log('Successfully generated web/data.js (' + Buffer.byteLength(fileContent) + ' bytes, ' + sections.length + ' sections)');
