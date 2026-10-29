// Puts the redesign online as a separate preview, without touching the live site.
// It copies only the website files into preview-build/ (git-ignored), adds a
// "hide from Google" header, and deploys that folder to the Vercel project
// kdo-redesign-preview, at https://kdo-redesign-preview.vercel.app
//
// Run it from this folder:  node deploy-preview.mjs
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join } from 'node:path';

const PROJECT = 'kdo-redesign-preview';
const OUT = 'preview-build';
const SITE_FILES = [
    'index.html',
    'privacy.html',
    'terms.html',
    'favicon.svg',
    'og.png',
    'assets/css/kdo.css',
    'assets/js/kdo.js',
    'assets/fonts',
];

// Start from a clean copy each time, but keep the .vercel link so it isn't relinked
mkdirSync(OUT, { recursive: true });
for (const entry of readdirSync(OUT)) {
    if (entry !== '.vercel') rmSync(join(OUT, entry), { recursive: true, force: true });
}
for (const file of SITE_FILES) cpSync(file, join(OUT, file), { recursive: true });

// Same security headers as the live site, plus "don't list this in Google"
const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
config.headers[0].headers.push({ key: 'X-Robots-Tag', value: 'noindex, nofollow' });
writeFileSync(join(OUT, 'vercel.json'), JSON.stringify(config, null, 2) + '\n');

const run = (cmd) => execSync(cmd, { cwd: OUT, stdio: 'inherit' });

if (!existsSync(join(OUT, '.vercel'))) {
    try {
        run(`npx vercel project create ${PROJECT}`);
    } catch {
        // The project already exists, which is fine: just link to it
    }
    run(`npx vercel link --yes --project ${PROJECT}`);
}
run('npx vercel deploy --prod --yes');
