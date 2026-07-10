#!/usr/bin/env node
/**
 * Parse DOCS/appStoreMetadata.md into clarify JSON format.
 * Usage: node scripts/parse-metadata.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MD_PATH = path.join(__dirname, '../../country-days/DOCS/appStoreMetadata.md');
const OUT_PATH = path.join(__dirname, '../../clarify/locales/appStoreMetadata-countrydays.json');

const LOCALE_MAP = {
  'en-US': 'en-US',
  'en-GB': 'en-GB',
  'en-AU': 'en-AU',
  'en-CA': 'en-CA',
  ar: 'ar',
  ca: 'ca',
  'zh-Hans': 'zh-Hans',
  'zh-Hant': 'zh-Hant',
  hr: 'hr',
  cs: 'cs',
  da: 'da',
  nl: 'nl',
  fi: 'fi',
  fr: 'fr',
  'fr-CA': 'fr-CA',
  de: 'de',
  el: 'el',
  he: 'he',
  hi: 'hi',
  hu: 'hu',
  id: 'id',
  it: 'it',
  ja: 'ja',
  ko: 'ko',
  ms: 'ms',
  nb: 'nb',
  pl: 'pl',
  'pt-BR': 'pt-BR',
  'pt-PT': 'pt-PT',
  ro: 'ro',
  ru: 'ru',
  sk: 'sk',
  es: 'es',
  'es-MX': 'es-MX',
  sv: 'sv',
  th: 'th',
  tr: 'tr',
  uk: 'uk',
  vi: 'vi',
};

const md = fs.readFileSync(MD_PATH, 'utf8');
const blocks = md.split(/^### /m).slice(1);
const result = {
  _comment:
    'App Store metadata for Country Days. name (30), subtitle (30), keywords (100), description (4000), whatsNew (4000).',
};

for (const block of blocks) {
  const headerMatch = block.match(/^(.+?) — `([^`]+)`/);
  if (!headerMatch) continue;
  const localeName = headerMatch[1].trim();
  const localeKey = headerMatch[2].trim();
  if (!LOCALE_MAP[localeKey] && !localeKey.match(/^[a-z]/)) continue;

  const key = localeKey;
  const name = block.match(/\*\*name:\*\* (.+)/)?.[1]?.trim();
  const subtitle = block.match(/\*\*subtitle:\*\* (.+)/)?.[1]?.trim();
  const keywords = block.match(/\*\*keywords:\*\* (.+)/)?.[1]?.trim();
  if (!name) continue;

  const descStart = block.indexOf('**description:**');
  const whatsStart = block.indexOf('**whatsNew:**');
  if (descStart === -1) continue;

  let description = block.slice(descStart + '**description:**'.length, whatsStart > -1 ? whatsStart : undefined).trim();
  let whatsNew = whatsStart > -1 ? block.slice(whatsStart + '**whatsNew:**'.length).split(/^---/m)[0].trim() : '';

  // Strip wrapping quotes from first line only if the whole block was quoted
  description = description.replace(/^["']/, '').replace(/["']\s*$/, '').trim();
  whatsNew = whatsNew.replace(/^["']/, '').replace(/["']\s*$/, '').trim();

  result[key] = {
    localeName,
    name,
    subtitle: subtitle || '',
    keywords: keywords || '',
    description,
    whatsNew: whatsNew || 'This version includes bug fixes and improvements.',
  };
}

fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2) + '\n');
console.log(`Wrote ${Object.keys(result).length - 1} locales to ${OUT_PATH}`);
