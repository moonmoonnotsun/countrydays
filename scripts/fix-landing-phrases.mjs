#!/usr/bin/env node
/**
 * Apply curated landing copy aligned with App Store metadata.
 * Fixes auto-translate mistakes (e.g. "country" → rural/village).
 * Usage: node scripts/fix-landing-phrases.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const PHRASES_PATH = path.join(ROOT, '../locales/landing-phrases.json');
const REF_PATH = path.join(ROOT, '../../decibel-meter/locales/landing-phrases.json');

/** @type {Record<string, Record<string, string>>} */
const CURATED = {
  ru: {
    metaTitle: 'Счётчик дней в странах - виза и налоги | iPhone',
    metaDescription:
      'Счётчик дней в странах для iPhone — дни в каждой стране, Шенген 90/180, налоговое резидентство, GPS и импорт поездок из фото. Данные остаются на устройстве.',
    heroSlogan: 'Счётчик дней в странах для iPhone',
    heroH1Before: 'Считайте ',
    heroH1Highlight: 'дни для визы и налогов',
    heroH1After: ' автоматически',
    heroTagline:
      'считает дни в каждой стране, помогает соблюдать лимиты Шенгена 90/180 и налогового резидентства, импортирует поездки из фото — всё на вашем устройстве.',
    sectionFeaturesLine1: 'Визовый контроль,',
    sectionFeaturesLine2: 'налоговое резидентство без догадок',
    sectionFeaturesSubtitle:
      'Всё для учёта дней за границей: от Шенгена до правила 183 дней — в одном приложении.',
    sectionScreenshotsTitle: 'Посмотрите в действии',
    sectionScreenshotsSubtitle: 'Удобный интерфейс для путешественников и экспатов',
    sectionAboutTitle: 'Что такое ',
    sectionAboutTitleAccent: 'счётчик дней в странах',
    sectionAboutTitleEnd: '?',
    sectionAboutCopy:
      'Счётчик дней в странах показывает, сколько дней вы провели в каждой стране — для виз, налогового резидентства и личного учёта поездок. ',
    sectionAboutCopyAfter:
      ' — приложение для iPhone: Шенген 90/180, налоговые лимиты, GPS, импорт из фото, календарь и виджеты.',
    faqTitle: 'Счётчик дней ',
    faqTitleAccent: 'FAQ',
    faqSubtitle: 'Частые вопросы о счётчике дней в странах для iPhone',
    faq1Q: 'Что такое счётчик дней в странах?',
    faq1A: 'Это приложение, которое считает дни в каждой стране для виз и налоговых правил. ',
    faq1AAfter:
      ' добавляет счётчики Шенгена 90/180, налоговое резидентство, GPS и импорт поездок из фото.',
    faq2Q: 'Поддерживается ли правило Шенгена 90/180?',
    faq2A:
      'Да. Встроенный счётчик отслеживает скользящее окно 180 дней и предупреждает до превышения 90 дней.',
    faq3Q: 'Можно ли отслеживать налоговое резидентство (183 дня)?',
    faq3A:
      'Да. Готовые счётчики для 183-дневного правила, UK SRT и других лимитов с предупреждением о переборе.',
    faq4Q: 'Загружаются ли мои данные о местоположении?',
    faq4A:
      'Нет. Данные остаются на устройстве. Мы сохраняем только название страны, не точные GPS-координаты.',
    faq5Q: 'Можно ли импортировать поездки из фото?',
    faq5A:
      'Да. Импортируйте прошлые поездки из метаданных геолокации фото на устройстве.',
    faq6Q: 'Приложение бесплатное?',
    faq6A: 'Да — бесплатная загрузка в App Store. Premium — опциональная подписка.',
    feature1Title: 'Дни в каждой стране',
    feature1Desc:
      'Статистика по странам: топ стран, пересечения границ и общее число дней в поездках.',
    feature2Title: 'Счётчики виз и налогов',
    feature2Desc:
      'Шенген 90/180, 183 дня, UK SRT и свои лимиты с предупреждением о переборе.',
    feature3Title: 'Календарь поездок',
    feature3Desc: 'Каждый день с флагом страны — вся история поездок на одном экране.',
    feature4Title: 'Автоматический GPS',
    feature4Desc: 'Опциональное определение страны в фоне при пересечении границ.',
    feature5Title: 'Импорт из фото',
    feature5Desc: 'Восстановите историю поездок из геоданных фото на устройстве.',
    feature6Title: 'Виджеты',
    feature6Desc: 'Статистика года и топ стран прямо на главном экране.',
    ctaTitle: 'Скачайте счётчик дней в странах',
    ctaDescription: 'Скачайте ',
    ctaDescriptionAfter:
      ' на iPhone — визы, налоговое резидентство, GPS и импорт поездок из фото.',
  },
  uk: {
    metaTitle: 'Лічильник днів у країнах - віза та податки | iPhone',
    metaDescription:
      'Лічильник днів у країнах для iPhone — дні в кожній країні, Шенген 90/180, податкове резидентство, GPS та імпорт поїздок із фото. Дані залишаються на пристрої.',
    heroSlogan: 'Лічильник днів у країнах для iPhone',
    heroH1Before: 'Рахуйте ',
    heroH1Highlight: 'дні для візи та податків',
    heroH1After: ' автоматично',
    heroTagline:
      'рахує дні в кожній країні, допомагає дотримуватися лімітів Шенгену 90/180 і податкового резидентства, імпортує поїздки з фото — усе на вашому пристрої.',
    sectionFeaturesLine1: 'Візовий контроль,',
    sectionFeaturesLine2: 'податкове резидентство без здогадок',
    sectionFeaturesSubtitle:
      'Усе для обліку днів за кордоном: від Шенгену до правила 183 днів — в одному додатку.',
    sectionScreenshotsTitle: 'Подивіться в дії',
    sectionScreenshotsSubtitle: 'Зручний інтерфейс для мандрівників і експатів',
    sectionAboutTitle: 'Що таке ',
    sectionAboutTitleAccent: 'лічильник днів у країнах',
    sectionAboutTitleEnd: '?',
    sectionAboutCopy:
      'Лічильник днів у країнах показує, скільки днів ви провели в кожній країні — для віз, податкового резидентства та особистого обліку. ',
    sectionAboutCopyAfter:
      ' — додаток для iPhone: Шенген 90/180, податкові ліміти, GPS, імпорт з фото, календар і віджети.',
    faqTitle: 'Лічильник днів ',
    faqTitleAccent: 'FAQ',
    faqSubtitle: 'Поширені питання про лічильник днів у країнах для iPhone',
    faq1Q: 'Що таке лічильник днів у країнах?',
    faq1A: 'Це додаток, який рахує дні в кожній країні для віз і податкових правил. ',
    faq1AAfter:
      ' додає лічильники Шенгену 90/180, податкове резидентство, GPS та імпорт поїздок із фото.',
    faq2Q: 'Чи підтримується правило Шенгену 90/180?',
    faq2A:
      'Так. Вбудований лічильник відстежує ковзне вікно 180 днів і попереджає до перевищення 90 днів.',
    faq3Q: 'Чи можна відстежувати податкове резидентство (183 дні)?',
    faq3A:
      'Так. Готові лічильники для правила 183 днів, UK SRT та інших лімітів із попередженням про перебір.',
    faq4Q: 'Чи завантажуються мої дані про місцезнаходження?',
    faq4A:
      'Ні. Дані залишаються на пристрої. Ми зберігаємо лише назву країни, не точні GPS-координати.',
    faq5Q: 'Чи можна імпортувати поїздки з фото?',
    faq5A: 'Так. Імпортуйте минулі поїздки з геоданих фото на пристрої.',
    faq6Q: 'Додаток безкоштовний?',
    faq6A: 'Так — безкоштовне завантаження в App Store. Premium — опційна підписка.',
    feature1Title: 'Дні в кожній країні',
    feature1Desc: 'Статистика: топ країн, перетини кордонів і загальна кількість днів у поїздках.',
    feature2Title: 'Лічильники віз і податків',
    feature2Desc: 'Шенген 90/180, 183 дні, UK SRT та власні ліміти з попередженням.',
    feature3Title: 'Календар подорожей',
    feature3Desc: 'Кожен день із прапором країни — вся історія на одному екрані.',
    feature4Title: 'Автоматичний GPS',
    feature4Desc: 'Опційне визначення країни у фоні при перетині кордонів.',
    feature5Title: 'Імпорт із фото',
    feature5Desc: 'Відновіть історію поїздок із геоданих фото на пристрої.',
    feature6Title: 'Віджети',
    feature6Desc: 'Статистика року та топ країн на головному екрані.',
    ctaTitle: 'Завантажте лічильник днів у країнах',
    ctaDescription: 'Завантажте ',
    ctaDescriptionAfter:
      ' на iPhone — візи, податкове резидентство, GPS та імпорт поїздок із фото.',
  },
  pl: {
    metaTitle: 'Licznik dni w krajach - wiza i podatki | iPhone',
    metaDescription:
      'Licznik dni w krajach dla iPhone — dni w każdym kraju, Schengen 90/180, rezydencja podatkowa, GPS i import podróży ze zdjęć. Dane zostają na urządzeniu.',
    heroSlogan: 'Licznik dni w krajach dla iPhone',
    heroH1Before: 'Licz ',
    heroH1Highlight: 'dni pod wizę i podatki',
    heroH1After: ' automatycznie',
    heroTagline:
      'liczy dni w każdym kraju, pomaga nie przekraczać limitów Schengen 90/180 i rezydencji podatkowej, importuje podróże ze zdjęć — wszystko na Twoim urządzeniu.',
    sectionFeaturesLine1: 'Kontrola wiz,',
    sectionFeaturesLine2: 'rezydencja podatkowa bez zgadywania',
    sectionFeaturesSubtitle:
      'Wszystko do liczenia dni za granicą: od Schengen po regułę 183 dni — w jednej aplikacji.',
    sectionScreenshotsTitle: 'Zobacz w akcji',
    sectionScreenshotsSubtitle: 'Prosty interfejs dla podróżników i expatów',
    sectionAboutTitle: 'Czym jest ',
    sectionAboutTitleAccent: 'licznik dni w krajach',
    sectionAboutTitleEnd: '?',
    sectionAboutCopy:
      'Licznik dni w krajach pokazuje, ile dni spędziłeś w każdym kraju — pod kątem wiz, rezydencji podatkowej i własnych zapisów. ',
    sectionAboutCopyAfter:
      ' — aplikacja na iPhone: Schengen 90/180, limity podatkowe, GPS, import ze zdjęć, kalendarz i widżety.',
    faqTitle: 'Licznik dni ',
    faqTitleAccent: 'FAQ',
    faqSubtitle: 'Najczęstsze pytania o licznik dni w krajach na iPhone',
    faq1Q: 'Czym jest licznik dni w krajach?',
    faq1A: 'To aplikacja, która liczy dni w każdym kraju pod kątem wiz i podatków. ',
    faq1AAfter:
      ' dodaje liczniki Schengen 90/180, rezydencję podatkową, GPS i import podróży ze zdjęć.',
    faq2Q: 'Czy obsługuje zasadę Schengen 90/180?',
    faq2A:
      'Tak. Wbudowany licznik śledzi okno 180 dni i ostrzega przed przekroczeniem 90 dni.',
    faq3Q: 'Czy śledzi rezydencję podatkową (183 dni)?',
    faq3A:
      'Tak. Gotowe liczniki dla reguły 183 dni, UK SRT i własnych limitów z ostrzeżeniem o przekroczeniu.',
    faq4Q: 'Czy moja lokalizacja jest wysyłana na serwer?',
    faq4A:
      'Nie. Dane zostają na urządzeniu. Zapisujemy tylko nazwę kraju, nie dokładne współrzędne GPS.',
    faq5Q: 'Czy mogę importować podróże ze zdjęć?',
    faq5A: 'Tak. Importuj wcześniejsze podróże z metadanych lokalizacji zdjęć na urządzeniu.',
    faq6Q: 'Czy aplikacja jest darmowa?',
    faq6A: 'Tak — darmowe pobranie w App Store. Premium to opcjonalna subskrypcja.',
    feature1Title: 'Dni w każdym kraju',
    feature1Desc: 'Statystyki: top kraje, przekroczenia granic i łączna liczba dni podróży.',
    feature2Title: 'Liczniki wiz i podatków',
    feature2Desc: 'Schengen 90/180, 183 dni, UK SRT i własne limity z ostrzeżeniami.',
    feature3Title: 'Kalendarz podróży',
    feature3Desc: 'Każdy dzień z flagą kraju — pełna historia na jednym ekranie.',
    feature4Title: 'Automatyczny GPS',
    feature4Desc: 'Opcjonalne wykrywanie kraju w tle przy przekraczaniu granic.',
    feature5Title: 'Import ze zdjęć',
    feature5Desc: 'Odtwórz historię podróży z geodanych zdjęć na urządzeniu.',
    feature6Title: 'Widżety',
    feature6Desc: 'Statystyki roku i top kraje na ekranie głównym.',
    ctaTitle: 'Pobierz licznik dni w krajach',
    ctaDescription: 'Pobierz ',
    ctaDescriptionAfter:
      ' na iPhone — wizy, rezydencja podatkowa, GPS i import podróży ze zdjęć.',
  },
  de: {
    metaTitle: 'Tageszähler pro Land - Visum & Steuern | iPhone',
    metaDescription:
      'Tageszähler pro Land für iPhone — Tage in jedem Land, Schengen 90/180, Steuerresidenz, GPS und Foto-Import. Daten bleiben auf dem Gerät.',
    heroSlogan: 'Tageszähler pro Land für iPhone',
    heroH1Before: 'Zählen Sie ',
    heroH1Highlight: 'Visum- und Steuertage',
    heroH1After: ' automatisch',
    heroTagline:
      'zählt Tage in jedem Land, hilft bei Schengen 90/180 und Steuerresidenz, importiert Reisen aus Fotos — alles auf Ihrem Gerät.',
    sectionAboutTitleAccent: 'Tageszähler pro Land',
    faq1Q: 'Was ist ein Tageszähler pro Land?',
    faq1A: 'Eine App, die Tage in jedem Land für Visum- und Steuerregeln zählt. ',
    ctaTitle: 'Tageszähler pro Land herunterladen',
  },
  fr: {
    metaTitle: 'Compteur de jours par pays - visa et impôts | iPhone',
    metaDescription:
      'Compteur de jours par pays pour iPhone — jours dans chaque pays, Schengen 90/180, résidence fiscale, GPS et import photo. Données sur l\'appareil.',
    heroSlogan: 'Compteur de jours par pays pour iPhone',
    heroH1Before: 'Comptez vos ',
    heroH1Highlight: 'jours visa et impôts',
    heroH1After: ' automatiquement',
    heroTagline:
      'compte les jours dans chaque pays, aide pour Schengen 90/180 et résidence fiscale, importe les voyages depuis vos photos — sur votre appareil.',
    sectionAboutTitleAccent: 'compteur de jours par pays',
    faq1Q: 'Qu\'est-ce qu\'un compteur de jours par pays ?',
    faq1A: 'Une app qui compte les jours passés dans chaque pays pour les visas et les impôts. ',
    ctaTitle: 'Télécharger le compteur de jours par pays',
  },
  es: {
    metaTitle: 'Contador de días por país - visa e impuestos | iPhone',
    heroSlogan: 'Contador de días por país para iPhone',
    heroH1Before: 'Cuenta ',
    heroH1Highlight: 'días de visa e impuestos',
    heroH1After: ' automáticamente',
    sectionAboutTitleAccent: 'contador de días por país',
    faq1Q: '¿Qué es un contador de días por país?',
    faq1A: 'Una app que cuenta los días en cada país para visados e impuestos. ',
    ctaTitle: 'Descarga el contador de días por país',
  },
  'es-MX': {
    heroSlogan: 'Contador de días por país para iPhone',
    heroH1Before: 'Cuenta ',
    heroH1Highlight: 'días de visa e impuestos',
    heroH1After: ' automáticamente',
    sectionAboutTitleAccent: 'contador de días por país',
    faq1Q: '¿Qué es un contador de días por país?',
  },
  it: {
    metaTitle: 'Contatore giorni per paese - visto e tasse | iPhone',
    heroSlogan: 'Contatore giorni per paese per iPhone',
    heroH1Before: 'Conta i ',
    heroH1Highlight: 'giorni visto e tasse',
    heroH1After: ' automaticamente',
    sectionAboutTitleAccent: 'contatore giorni per paese',
    faq1Q: 'Cos\'è un contatore giorni per paese?',
    faq1A: 'Un\'app che conta i giorni in ogni paese per visti e tasse. ',
    ctaTitle: 'Scarica il contatore giorni per paese',
  },
  nl: {
    metaTitle: 'Dagenteller per land - visum en belasting | iPhone',
    metaDescription:
      'Dagenteller per land voor iPhone — dagen in elk land, Schengen 90/180, fiscale woonplaats, GPS en foto-import. Gegevens blijven op uw apparaat.',
    heroSlogan: 'Dagenteller per land voor iPhone',
    heroH1Before: 'Tel ',
    heroH1Highlight: 'visum- en belastingdagen',
    heroH1After: ' automatisch',
    sectionAboutTitleAccent: 'dagenteller per land',
    sectionAboutCopy:
      'Een dagenteller per land telt hoeveel dagen u in elk land doorbrengt voor visa, belasting en reisadministratie. ',
    faq1Q: 'Wat is een dagenteller per land?',
    faq1A: 'Een app die dagen per land telt voor visum- en belastingregels. ',
    faqSubtitle: 'Veelgestelde vragen over onze dagenteller per land voor iPhone',
    ctaTitle: 'Download de dagenteller per land',
  },
  'pt-BR': {
    heroSlogan: 'Contador de dias por país para iPhone',
    heroH1Before: 'Conte ',
    heroH1Highlight: 'dias de visto e impostos',
    heroH1After: ' automaticamente',
    sectionAboutTitleAccent: 'contador de dias por país',
    faq1Q: 'O que é um contador de dias por país?',
  },
  'pt-PT': {
    heroSlogan: 'Contador de dias por país para iPhone',
    heroH1Before: 'Conte ',
    heroH1Highlight: 'dias de visto e impostos',
    heroH1After: ' automaticamente',
    sectionAboutTitleAccent: 'contador de dias por país',
    faq1Q: 'O que é um contador de dias por país?',
  },
  'zh-Hans': {
    metaTitle: '国别日数计数器 - 签证与税务 | iPhone',
    metaDescription:
      'iPhone 国别日数计数器 — 统计各国停留天数，申根 90/180、税务居民、GPS 自动追踪与照片导入，数据保存在设备本地。',
    heroSlogan: 'iPhone 国别日数计数器',
    heroH1Before: '自动统计',
    heroH1Highlight: '签证与税务天数',
    heroH1After: '',
    heroTagline:
      '统计您在每个国家的停留天数，帮助遵守申根 90/180 与税务居民规则，并可从照片导入行程 — 全部在设备本地完成。',
    sectionAboutTitleAccent: '国别日数计数器',
    faqTitle: '国别日数',
    faqSubtitle: '关于 iPhone 国别日数计数器的常见问题',
    faq1Q: '什么是国别日数计数器？',
    faq1A: '用于统计各国停留天数的应用，适用于签证与税务规则。',
    faq1AAfter: ' 提供申根 90/180、税务居民预设、GPS 追踪与照片导入。',
    ctaTitle: '下载国别日数计数器',
  },
  'zh-Hant': {
    metaTitle: '國別日數計數器 - 簽證與稅務 | iPhone',
    metaDescription:
      'iPhone 國別日數計數器 — 統計各國停留天數，申根 90/180、稅務居民、GPS 自動追蹤與照片匯入，資料保存在裝置本機。',
    heroSlogan: 'iPhone 國別日數計數器',
    heroH1Before: '自動統計',
    heroH1Highlight: '簽證與稅務天數',
    heroH1After: '',
    sectionAboutTitleAccent: '國別日數計數器',
    faqTitle: '國別日數',
    faqSubtitle: '關於 iPhone 國別日數計數器的常見問題',
    faq1Q: '什麼是國別日數計數器？',
    faq1A: '用於統計各國停留天數的 App，適用於簽證與稅務規則。',
    faq1AAfter: ' 提供申根 90/180、稅務居民預設、GPS 追蹤與照片匯入。',
    ctaTitle: '下載國別日數計數器',
  },
  ja: {
    metaTitle: '国別日数カウンター - ビザ・税金 | iPhone',
    heroSlogan: 'iPhone用 国別日数カウンター',
    heroH1Before: '',
    heroH1Highlight: 'ビザ・税金の日数',
    heroH1After: 'を自動で記録',
    sectionAboutTitleAccent: '国別日数カウンター',
    faq1Q: '国別日数カウンターとは？',
    faq1A: '各国の滞在日数をビザや税金のルール用に数えるアプリです。',
    ctaTitle: '国別日数カウンターをダウンロード',
  },
  ko: {
    metaTitle: '국가별 일수 카운터 - 비자 및 세금 | iPhone',
    heroSlogan: 'iPhone용 국가별 일수 카운터',
    heroH1Before: '',
    heroH1Highlight: '비자·세금 일수',
    heroH1After: '를 자동으로 기록',
    sectionAboutTitleAccent: '국가별 일수 카운터',
    faq1Q: '국가별 일수 카운터란?',
    faq1A: '비자 및 세금 규정을 위해 각 국가 체류 일수를 세는 앱입니다.',
    ctaTitle: '국가별 일수 카운터 다운로드',
  },
  vi: {
    metaTitle: 'Đếm ngày theo quốc gia - visa và thuế | iPhone',
    heroSlogan: 'Đếm ngày theo quốc gia cho iPhone',
    heroH1Before: 'Tự động đếm ',
    heroH1Highlight: 'ngày visa và thuế',
    heroH1After: '',
    sectionAboutTitleAccent: 'đếm ngày theo quốc gia',
    faqTitle: 'Đếm ngày theo quốc gia',
    faq1Q: 'Đếm ngày theo quốc gia là gì?',
    faq1A: 'Ứng dụng đếm số ngày ở mỗi quốc gia cho quy tắc visa và thuế. ',
    ctaTitle: 'Tải ứng dụng đếm ngày theo quốc gia',
  },
  id: {
    heroSlogan: 'Penghitung hari per negara untuk iPhone',
    heroH1Before: 'Hitung ',
    heroH1Highlight: 'hari visa dan pajak',
    heroH1After: ' otomatis',
    sectionAboutTitleAccent: 'penghitung hari per negara',
    faq1Q: 'Apa itu penghitung hari per negara?',
  },
  th: {
    heroSlogan: 'ตัวนับวันตามประเทศสำหรับ iPhone',
    heroH1Before: 'นับ',
    heroH1Highlight: 'วันวีซ่าและภาษี',
    heroH1After: ' อัตโนมัติ',
    sectionAboutTitleAccent: 'ตัวนับวันตามประเทศ',
    faq1Q: 'ตัวนับวันตามประเทศคืออะไร?',
    faq1A: 'แอปที่นับจำนวนวันในแต่ละประเทศสำหรับกฎวีซ่าและภาษี ',
  },
  ar: {
    heroSlogan: 'عداد أيام الدول لـ iPhone',
    heroH1Before: 'احسب ',
    heroH1Highlight: 'أيام التأشيرة والضرائب',
    heroH1After: ' تلقائياً',
    sectionAboutTitleAccent: 'عداد أيام الدول',
    faq1Q: 'ما هو عداد أيام الدول؟',
  },
  tr: {
    heroSlogan: 'Ülke bazlı gün sayacı için iPhone',
    heroH1Before: '',
    heroH1Highlight: 'Vize ve vergi günlerini',
    heroH1After: ' otomatik sayın',
    sectionAboutTitleAccent: 'ülke bazlı gün sayacı',
    faq1Q: 'Ülke bazlı gün sayacı nedir?',
  },
  cs: {
    heroSlogan: 'Počítadlo dní v zemích pro iPhone',
    heroH1Before: 'Počítejte ',
    heroH1Highlight: 'dny víza a daní',
    heroH1After: ' automaticky',
    sectionAboutTitleAccent: 'počítadlo dní v zemích',
    faq1Q: 'Co je počítadlo dní v zemích?',
    faq1A: 'Aplikace, která počítá dny v každé zemi pro víza a daně. ',
    ctaTitle: 'Stáhněte počítadlo dní v zemích',
  },
  sk: {
    heroSlogan: 'Počítadlo dní v krajinách pre iPhone',
    heroH1Before: 'Počítajte ',
    heroH1Highlight: 'dni víz a daní',
    heroH1After: ' automaticky',
    sectionAboutTitleAccent: 'počítadlo dní v krajinách',
    faq1Q: 'Čo je počítadlo dní v krajinách?',
  },
  da: {
    metaTitle: 'Dagtæller per land - visum og skat | iPhone',
    heroSlogan: 'Dagtæller per land til iPhone',
    heroH1Before: 'Tæl ',
    heroH1Highlight: 'visum- og skattedage',
    heroH1After: ' automatisk',
    sectionAboutTitleAccent: 'dagtæller per land',
    sectionAboutCopy: 'En dagtæller per land tæller, hvor mange dage du tilbringer i hvert land for visa, skat og rejseoverblik. ',
    faq1Q: 'Hvad er en dagtæller per land?',
    faq1A: 'En app, der tæller dage i hvert land for visum- og skatteregler. ',
    faqSubtitle: 'Almindelige spørgsmål om vores dagtæller per land til iPhone',
    ctaTitle: 'Download dagtælleren per land',
  },
  nb: {
    metaTitle: 'Dagteller per land - visum og skatt | iPhone',
    heroSlogan: 'Dagteller per land for iPhone',
    heroH1Before: 'Tell ',
    heroH1Highlight: 'visum- og skattedager',
    heroH1After: ' automatisk',
    sectionAboutTitleAccent: 'dagteller per land',
    sectionAboutCopy: 'En dagteller per land teller hvor mange dager du tilbringer i hvert land for visa, skatt og reiseoversikt. ',
    faq1Q: 'Hva er en dagteller per land?',
    faq1A: 'En app som teller dager i hvert land for visum- og skatteregler. ',
    ctaTitle: 'Last ned dagteller per land',
  },
  sv: {
    metaTitle: 'Dagräknare per land - visum och skatt | iPhone',
    heroSlogan: 'Dagräknare per land för iPhone',
    heroH1Before: 'Räkna ',
    heroH1Highlight: 'visum- och skattedagar',
    heroH1After: ' automatiskt',
    sectionAboutTitleAccent: 'dagräknare per land',
    faq1Q: 'Vad är en dagräknare per land?',
    faq1A: 'En app som räknar dagar i varje land för visum- och skatteregler. ',
    faqSubtitle: 'Vanliga frågor om vår dagräknare per land för iPhone',
    ctaTitle: 'Ladda ner dagräknaren per land',
  },
  fi: {
    heroSlogan: 'Päivälaskuri maittain iPhonelle',
    heroH1Before: 'Laske ',
    heroH1Highlight: 'viisa- ja veropäivät',
    heroH1After: ' automaattisesti',
    sectionAboutTitleAccent: 'päivälaskuri maittain',
    faq1Q: 'Mikä on päivälaskuri maittain?',
  },
  ro: {
    heroSlogan: 'Contor de zile pe țări pentru iPhone',
    heroH1Before: 'Numără ',
    heroH1Highlight: 'zilele de viză și taxe',
    heroH1After: ' automat',
    sectionAboutTitleAccent: 'contor de zile pe țări',
    faq1Q: 'Ce este un contor de zile pe țări?',
  },
  hu: {
    heroSlogan: 'Országonkénti napszámláló iPhone-ra',
    heroH1Before: 'Számolja ',
    heroH1Highlight: 'a vízum- és adónapokat',
    heroH1After: ' automatikusan',
    sectionAboutTitleAccent: 'országonkénti napszámláló',
    faq1Q: 'Mi az országonkénti napszámláló?',
  },
  hr: {
    heroSlogan: 'Brojač dana po državama za iPhone',
    heroH1Before: 'Brojite ',
    heroH1Highlight: 'dane vize i poreza',
    heroH1After: ' automatski',
    sectionAboutTitleAccent: 'brojač dana po državama',
    faq1Q: 'Što je brojač dana po državama?',
  },
  el: {
    heroSlogan: 'Μετρητής ημερών ανά χώρα για iPhone',
    heroH1Before: 'Μετρήστε ',
    heroH1Highlight: 'ημέρες βίζας και φόρου',
    heroH1After: ' αυτόματα',
    sectionAboutTitleAccent: 'μετρητής ημερών ανά χώρα',
    faq1Q: 'Τι είναι ο μετρητής ημερών ανά χώρα;',
  },
  he: {
    heroSlogan: 'מונה ימים לפי מדינה ל-iPhone',
    heroH1Before: 'ספרו ',
    heroH1Highlight: 'ימי ויזה ומס',
    heroH1After: ' אוטומטית',
    sectionAboutTitleAccent: 'מונה ימים לפי מדינה',
    faq1Q: 'מהו מונה ימים לפי מדינה?',
  },
  ca: {
    heroSlogan: 'Comptador de dies per país per a iPhone',
    heroH1Before: 'Compta ',
    heroH1Highlight: 'dies de visat i impostos',
    heroH1After: ' automàticament',
    sectionAboutTitleAccent: 'comptador de dies per país',
    faq1Q: 'Què és un comptador de dies per país?',
  },
  ms: {
    heroSlogan: 'Pengira hari mengikut negara untuk iPhone',
    heroH1Before: 'Kira ',
    heroH1Highlight: 'hari visa dan cukai',
    heroH1After: ' secara automatik',
    sectionAboutTitleAccent: 'pengira hari mengikut negara',
    faq1Q: 'Apakah pengira hari mengikut negara?',
  },
  hi: {
    heroSlogan: 'iPhone के लिए देशवार दिन गणक',
    heroH1Before: '',
    heroH1Highlight: 'वीज़ा और कर के दिन',
    heroH1After: ' स्वचालित रूप से गिनें',
    sectionAboutTitleAccent: 'देशवार दिन गणक',
    faq1Q: 'देशवार दिन गणक क्या है?',
  },
  'fr-CA': {
    heroSlogan: 'Compteur de jours par pays pour iPhone',
    heroH1Before: 'Comptez vos ',
    heroH1Highlight: 'jours visa et impôts',
    heroH1After: ' automatiquement',
    sectionAboutTitleAccent: 'compteur de jours par pays',
    faq1Q: 'Qu\'est-ce qu\'un compteur de jours par pays ?',
  },
};

const LOCALES = Object.keys(CURATED);

async function main() {
  const phrases = JSON.parse(await fs.readFile(PHRASES_PATH, 'utf8'));
  const ref = JSON.parse(await fs.readFile(REF_PATH, 'utf8'));

  for (const locale of LOCALES) {
    if (!phrases[locale]) {
      console.warn(`Skip missing locale: ${locale}`);
      continue;
    }
    const patch = CURATED[locale];
    Object.assign(phrases[locale], patch);

    // Keep localized UI labels from decibel reference when available
    const refLocale = ref[locale];
    if (refLocale) {
      for (const key of [
        'downloadAppStore',
        'free',
        'privacy',
        'terms',
        'support',
        'contact',
        'langSwitcherLabel',
      ]) {
        if (refLocale[key]) phrases[locale][key] = refLocale[key];
      }
    }
    console.log(`Fixed ${locale}`);
  }

  await fs.writeFile(PHRASES_PATH, JSON.stringify(phrases, null, 2) + '\n');
  console.log(`Updated ${LOCALES.length} locales in ${PHRASES_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
