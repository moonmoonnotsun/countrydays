#!/usr/bin/env node
/**
 * Generate localized landing phrases for countrydays.app
 * Usage: node scripts/generate-landing-phrases.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const APP_METADATA_PATH = path.join(ROOT, '../../clarify/locales/appStoreMetadata-countrydays.json');
const REFERENCE_PHRASES_PATH = path.join(ROOT, '../../decibel-meter/locales/landing-phrases.json');
const OUTPUT_PATH = path.join(ROOT, '../locales/landing-phrases.json');

const LOCALES = [
  'de', 'fr', 'es', 'ru', 'pl', 'ja', 'pt-BR', 'zh-Hans', 'ko', 'it', 'nl', 'tr', 'uk',
  'ar', 'sv', 'zh-Hant', 'pt-PT', 'vi', 'id', 'th', 'cs', 'da', 'nb', 'fi', 'he', 'ca',
  'hr', 'el', 'hi', 'hu', 'ms', 'es-MX', 'ro', 'sk', 'fr-CA',
];

const APP_STORE_COUNTRY = {
  de: 'de', fr: 'fr', es: 'es', ru: 'ru', pl: 'pl', ja: 'jp', 'pt-BR': 'br',
  'zh-Hans': 'cn', ko: 'kr', it: 'it', nl: 'nl', tr: 'tr', uk: 'ua', ar: 'sa', sv: 'se',
  'zh-Hant': 'tw', 'pt-PT': 'pt', vi: 'vn', id: 'id', th: 'th', cs: 'cz', da: 'dk',
  nb: 'no', fi: 'fi', he: 'il', ca: 'es', hr: 'hr', el: 'gr', hi: 'in', hu: 'hu',
  ms: 'my', 'es-MX': 'mx', ro: 'ro', sk: 'sk', 'fr-CA': 'ca',
};

const OG_LOCALE = {
  de: 'de_DE', fr: 'fr_FR', es: 'es_ES', ru: 'ru_RU', pl: 'pl_PL', ja: 'ja_JP',
  'pt-BR': 'pt_BR', 'zh-Hans': 'zh_CN', ko: 'ko_KR', it: 'it_IT', nl: 'nl_NL',
  tr: 'tr_TR', uk: 'uk_UA', ar: 'ar_SA', sv: 'sv_SE', 'zh-Hant': 'zh_TW',
  'pt-PT': 'pt_PT', vi: 'vi_VN', id: 'id_ID', th: 'th_TH', cs: 'cs_CZ', da: 'da_DK',
  nb: 'nb_NO', fi: 'fi_FI', he: 'he_IL', ca: 'ca_ES', hr: 'hr_HR', el: 'el_GR',
  hi: 'hi_IN', hu: 'hu_HU', ms: 'ms_MY', 'es-MX': 'es_MX', ro: 'ro_RO', sk: 'sk_SK',
  'fr-CA': 'fr_CA',
};

const HTML_LANG = {
  de: 'de', fr: 'fr', es: 'es', ru: 'ru', pl: 'pl', ja: 'ja', 'pt-BR': 'pt-BR',
  'zh-Hans': 'zh-CN', ko: 'ko', it: 'it', nl: 'nl', tr: 'tr', uk: 'uk', ar: 'ar',
  sv: 'sv', 'zh-Hant': 'zh-TW', 'pt-PT': 'pt-PT', vi: 'vi', id: 'id', th: 'th',
  cs: 'cs', da: 'da', nb: 'nb', fi: 'fi', he: 'he', ca: 'ca', hr: 'hr', el: 'el',
  hi: 'hi', hu: 'hu', ms: 'ms', 'es-MX': 'es-MX', ro: 'ro', sk: 'sk', 'fr-CA': 'fr-CA',
};

const TRANSLATE_TARGET = {
  'pt-BR': 'pt', 'pt-PT': 'pt', 'es-MX': 'es', 'fr-CA': 'fr',
  'zh-Hans': 'zh-CN', 'zh-Hant': 'zh-TW', nb: 'no',
};

const STATIC_LABELS = {
  downloadAppStore: 'Download on the App Store',
  free: 'Free',
  privacy: 'Privacy',
  terms: 'Terms',
  support: 'Support',
  contact: 'Contact',
  langSwitcherLabel: 'Language',
};

const CURATED_OVERRIDES = {
  ru: {
    metaTitle: 'Счетчик дней в странах - виза и налоги | iPhone',
    heroH1Before: 'Считайте дни для ',
    heroH1Highlight: 'визы и налогов',
    sectionScreenshotsTitle: 'Скриншоты',
    sectionScreenshotsSubtitle: 'Удобный интерфейс для путешественников и экспатов',
  },
  pl: {
    heroH1Before: 'Licz dni pod ',
    heroH1Highlight: 'wizę i podatki',
    sectionScreenshotsTitle: 'Zrzuty ekranu',
    sectionScreenshotsSubtitle: 'Prosty interfejs dla podróżników i expatów',
  },
  uk: {
    heroH1Before: 'Рахуйте дні для ',
    heroH1Highlight: 'візи та податків',
    sectionScreenshotsTitle: 'Скріншоти',
    sectionScreenshotsSubtitle: 'Зручний інтерфейс для мандрівників і експатів',
  },
  de: {
    heroH1Before: 'Tage zählen für ',
    heroH1Highlight: 'Visum und Steuern',
  },
  fr: {
    heroH1Before: 'Comptez vos jours pour ',
    heroH1Highlight: 'visa et impôts',
  },
};

const SOURCE_FIELDS = [
  'metaTitle', 'metaDescription', 'heroSlogan', 'heroH1Before', 'heroH1Highlight', 'heroH1After',
  'heroTagline', 'sectionFeaturesLine1', 'sectionFeaturesLine2', 'sectionFeaturesSubtitle',
  'sectionScreenshotsTitle', 'sectionScreenshotsSubtitle', 'sectionAboutTitle',
  'sectionAboutTitleAccent', 'sectionAboutTitleEnd', 'sectionAboutCopy', 'sectionAboutCopyAfter',
  'faqTitle', 'faqTitleAccent', 'faqSubtitle', 'faq1Q', 'faq1A', 'faq1AAfter',
  'faq2Q', 'faq2A', 'faq3Q', 'faq3A', 'faq4Q', 'faq4A', 'faq5Q', 'faq5A', 'faq6Q', 'faq6A',
  'feature1Title', 'feature1Desc', 'feature2Title', 'feature2Desc', 'feature3Title', 'feature3Desc',
  'feature4Title', 'feature4Desc', 'feature5Title', 'feature5Desc', 'feature6Title', 'feature6Desc',
  'ctaTitle', 'ctaDescription', 'ctaDescriptionAfter',
];

function buildEnglishTemplates() {
  return {
    metaTitle: 'Country Days Tracker - Visa & Tax Day Counter | iPhone',
    metaDescription:
      'Country days tracker for iPhone - count days in every country, follow Schengen 90/180 and tax residency rules, with GPS auto-tracking, photo import, and on-device privacy.',
    heroSlogan: 'Days abroad tracker for iPhone',
    heroH1Before: 'Track ',
    heroH1Highlight: 'visa & tax days',
    heroH1After: ' automatically',
    heroTagline:
      'counts days in every country, helps you stay under Schengen 90/180 and tax residency limits, and imports past trips from photos - all on your device.',
    sectionFeaturesLine1: 'Visa compliance,',
    sectionFeaturesLine2: 'tax residency, zero guesswork',
    sectionFeaturesSubtitle:
      'Everything you need to track days abroad. From Schengen limits to 183-day tax rules, all in one clean app.',
    sectionScreenshotsTitle: 'See it in action',
    sectionScreenshotsSubtitle: 'Clean interface built for travelers, nomads, and expats',
    sectionAboutTitle: 'What is a ',
    sectionAboutTitleAccent: 'country days tracker',
    sectionAboutTitleEnd: '?',
    sectionAboutCopy:
      'A country days tracker counts how many days you spend in each country for visa limits, tax residency, and travel records. ',
    sectionAboutCopyAfter:
      ' is a day counter for iPhone - Schengen 90/180, tax residency presets, GPS auto-tracking, photo import, calendar, and widgets.',
    faqTitle: 'Country Days ',
    faqTitleAccent: 'FAQ',
    faqSubtitle: 'Common questions about our country days tracker for iPhone',
    faq1Q: 'What is a country days tracker?',
    faq1A: 'A country days tracker counts days spent in each country for visa and tax rules. ',
    faq1AAfter:
      ' adds Schengen 90/180 counters, tax residency presets, GPS tracking, and photo import on iPhone.',
    faq2Q: 'Does it support Schengen 90/180?',
    faq2A: 'Yes. Built-in Schengen counter tracks your rolling 180-day window and warns you before you exceed 90 days.',
    faq3Q: 'Can it track tax residency (183-day rule)?',
    faq3A: 'Yes. Preset counters for tax residency thresholds including 183-day rules, UK SRT, and custom country limits.',
    faq4Q: 'Is my location data uploaded?',
    faq4A: 'No. Your location data stays on your device. We save only the country name - never your precise GPS coordinates.',
    faq5Q: 'Can I import trips from photos?',
    faq5A: 'Yes. Import past trips from photo location metadata on your device to rebuild your travel history quickly.',
    faq6Q: 'Is this app free?',
    faq6A: 'Yes - free download on the App Store. Premium features are optional in-app purchases.',
    feature1Title: 'Day count per country',
    feature1Desc:
      'See how many days you spent in each country with stats, top countries, border crossings, and travel day totals.',
    feature2Title: 'Visa & tax counters',
    feature2Desc:
      'Preset day limit counters for Schengen 90/180, 183-day tax residency, UK SRT, and custom rules with overstay warnings.',
    feature3Title: 'Travel calendar',
    feature3Desc:
      'Calendar view shows every day with country flags so you can review your full travel history at a glance.',
    feature4Title: 'Automatic GPS tracking',
    feature4Desc:
      'Optional background country detection counts days automatically when you cross borders - no manual entry needed.',
    feature5Title: 'Photo trip import',
    feature5Desc:
      'Rebuild travel history from photo location metadata on your device. Import past trips in seconds.',
    feature6Title: 'Home screen widgets',
    feature6Desc:
      'Widgets show year stats and top countries on your home screen so you always know where you stand.',
    ctaTitle: 'Download the country days tracker',
    ctaDescription: 'Get ',
    ctaDescriptionAfter:
      ' on iPhone - track visa limits, tax residency days, and travel history with GPS and photo import.',
  };
}

async function translateText(text, locale) {
  const target = TRANSLATE_TARGET[locale] ?? locale;
  const url = new URL('https://translate.googleapis.com/translate_a/single');
  url.searchParams.set('client', 'gtx');
  url.searchParams.set('sl', 'en');
  url.searchParams.set('tl', target);
  url.searchParams.set('dt', 't');
  url.searchParams.set('q', text);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Translation failed (${response.status}) for ${locale}`);
  const data = await response.json();
  return data[0].map((chunk) => chunk[0]).join('');
}

function normalizeDashes(str) {
  return str.replace(/[—–]/g, '-');
}

function applyCurated(locale, item) {
  const overrides = CURATED_OVERRIDES[locale];
  if (overrides) Object.assign(item, overrides);
  for (const key of Object.keys(item)) {
    if (typeof item[key] === 'string') item[key] = normalizeDashes(item[key]);
  }
  return item;
}

function truncateAtWord(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trim();
}

function normalizeLengths(item) {
  if (item.metaTitle.length < 50) item.metaTitle = `${item.metaTitle} iPhone`;
  item.metaTitle = truncateAtWord(item.metaTitle, 65);
  if (item.metaDescription.length < 140) {
    item.metaDescription = `${item.metaDescription}`;
  }
  item.metaDescription = truncateAtWord(item.metaDescription, 160);
  return item;
}

function getMetadataName(metadata, locale) {
  return metadata[locale]?.name ?? metadata['en-US']?.name ?? 'Country Days Tracker & Counter';
}

async function main() {
  const metadata = JSON.parse(await fs.readFile(APP_METADATA_PATH, 'utf8'));
  const refPhrases = JSON.parse(await fs.readFile(REFERENCE_PHRASES_PATH, 'utf8'));
  const enTemplates = buildEnglishTemplates();
  const output = {};

  for (const locale of LOCALES) {
    const appName = getMetadataName(metadata, locale);
    const item = {
      htmlLang: HTML_LANG[locale],
      ogLocale: OG_LOCALE[locale],
      appStoreCountry: APP_STORE_COUNTRY[locale],
      ...STATIC_LABELS,
    };

    // Copy translated static labels from decibel reference where available
    const ref = refPhrases[locale];
    if (ref) {
      item.downloadAppStore = ref.downloadAppStore ?? item.downloadAppStore;
      item.free = ref.free ?? item.free;
      item.privacy = ref.privacy ?? item.privacy;
      item.terms = ref.terms ?? item.terms;
      item.support = ref.support ?? item.support;
      item.contact = ref.contact ?? item.contact;
      item.langSwitcherLabel = ref.langSwitcherLabel ?? item.langSwitcherLabel;
    }

    for (const field of SOURCE_FIELDS) {
      const source = enTemplates[field];
      if (!source) continue;
      try {
        item[field] = await translateText(source, locale);
        await new Promise((r) => setTimeout(r, 120));
      } catch (err) {
        console.warn(`Fallback EN for ${locale}.${field}: ${err.message}`);
        item[field] = source;
      }
    }

    applyCurated(locale, item);
    normalizeLengths(item);
    output[locale] = item;
    console.log(`Generated ${locale}`);
  }

  await fs.writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2) + '\n');
  console.log(`Wrote ${Object.keys(output).length} locales to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
