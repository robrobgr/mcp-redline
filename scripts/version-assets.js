import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8'));
const version = pkg.version;

const htmlPath = path.join(rootDir, 'web', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf-8');

// Replace asset query params with current version
// fonts/fonts.css(?v=...)?
html = html.replace(/href="fonts\/fonts\.css(?:\?v=[^"]*)?"/g, `href="fonts/fonts.css?v=${version}"`);
// dist/tailwind.css(?v=...)?
html = html.replace(/href="dist\/tailwind\.css(?:\?v=[^"]*)?"/g, `href="dist/tailwind.css?v=${version}"`);
// i18n.js(?v=...)?
html = html.replace(/src="i18n\.js(?:\?v=[^"]*)?"/g, `src="i18n.js?v=${version}"`);
// dist/engine.bundle.js(?v=...)?
html = html.replace(/src="dist\/engine\.bundle\.js(?:\?v=[^"]*)?"/g, `src="dist/engine.bundle.js?v=${version}"`);
// import ... from './data.js(?v=...)?'
html = html.replace(/from '\.\/data\.js(?:\?v=[^']*)?'/g, `from './data.js?v=${version}'`);
// import ... from './i18n.js(?v=...)?'
html = html.replace(/from '\.\/i18n\.js(?:\?v=[^']*)?'/g, `from './i18n.js?v=${version}'`);
// #arch-img default src: assets/01_verify_flow.en.svg(?v=...)?
html = html.replace(/src="assets\/01_verify_flow\.en\.svg(?:\?v=[^"]*)?"/g, `src="assets/01_verify_flow.en.svg?v=${version}"`);
// archFiles in setArchTab: `assets/01_verify_flow.${langSuffix}.svg(?v=...)?`
html = html.replace(/`assets\/01_verify_flow\.\$\{langSuffix\}\.svg(?:\?v=[^`]*)?`/g, `\`assets/01_verify_flow.\${langSuffix}.svg?v=${version}\``);
html = html.replace(/`assets\/02_ciso_data_boundary\.\$\{langSuffix\}\.svg(?:\?v=[^`]*)?`/g, `\`assets/02_ciso_data_boundary.\${langSuffix}.svg?v=${version}\``);

fs.writeFileSync(htmlPath, html, 'utf-8');
console.log(`[version-assets] Injected ?v=${version} into web/index.html assets.`);
