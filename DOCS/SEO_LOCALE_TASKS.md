# Country Days locale tasks

Source: `locales/landing-phrases.json`. The builder joins `appName + after` in `linkedText` (`scripts/build-locale-pages.mjs`). The store name ends in `GPS`. `faq1AAfter`, `sectionAboutCopyAfter`, and `ctaDescriptionAfter` often have no leading space, so the page renders `GPSFügt`, `GPSajoute`, `GPS是`.

Keep **Country days** in every `metaTitle`. That is the query. Also keep **Schengen** and **90/180**. A local-script spelling can sit beside `Schengen`. Do not translate `Country days` away. The live English title says `Country Days`. The form to write is `Country days`.

## Do once

In `linkedText`, insert one space between `appName` and `after` when `after` does not already start with whitespace or punctuation:

```js
const tail = after || '';
const gap = tail && !/^[\s.,;:!?—–\-]/.test(tail) ? ' ' : '';
return `${before || ''}${appLink(storeUrl, appName)}${gap}${tail}`;
```

ru, pl, and uk already start `after` with a space. This guard must not add a second one.

Set every `metaTitle` from the table below. Locales whose title has no Latin `Schengen` (ru, uk, ja, zh-Hans, zh-Hant, hi) get it in that same title. `90/180` stays in the description.

## Titles

| Locale | Write this `metaTitle` |
|---|---|
| en | `Country days \| Schengen and Tax Day Counter` |
| de | `Country days \| Schengen- und Steuertage zählen` |
| fr | `Country days \| Compteur Schengen et résidence fiscale` |
| fr-CA | `Country days \| Compteur Schengen et résidence fiscale au Canada` |
| es | `Country days \| Contador Schengen y residencia fiscal` |
| es-MX | `Country days \| Cuenta días Schengen y residencia fiscal` |
| it | `Country days \| Contatore Schengen e residenza fiscale` |
| pt-BR | `Country days \| Contador Schengen e residência fiscal` |
| pt-PT | `Country days \| Contador Schengen e residência fiscal em Portugal` |
| nl | `Country days \| Schengen- en belastingdagen tellen` |
| pl | `Country days \| Licznik Schengen i rezydencji podatkowej` |
| cs | `Country days \| Počítadlo Schengenu a daňového pobytu` |
| sk | `Country days \| Počítadlo Schengenu a daňového pobytu na Slovensku` |
| da | `Country days \| Tæl Schengen- og skattedage` |
| sv | `Country days \| Räkna Schengen- och skattedagar` |
| nb | `Country days \| Tell Schengen- og skattedager` |
| fi | `Country days \| Schengen- ja veropäivälaskuri` |
| hu | `Country days \| Schengen- és adóügyi napok számláló` |
| hr | `Country days \| Brojač Schengena i poreznog boravka` |
| ro | `Country days \| Contor Schengen și rezidență fiscală` |
| tr | `Country days \| Schengen ve vergi gün sayacı` |
| ca | `Country days \| Comptador Schengen i residència fiscal` |
| el | `Country days \| Schengen — Μετρητής Σένγκεν και φορολογικής κατοικίας` |
| id | `Country days \| Penghitung hari Schengen dan domisili pajak` |
| ms | `Country days \| Pengira hari Schengen dan pemastautin cukai` |
| vi | `Country days \| Đếm ngày Schengen và cư trú thuế` |
| ko | `Country days \| Schengen — 솅겐과 세금 거주 일수 계산기` |
| ja | `Country days \| Schengen — シェンゲンと税務居住の日数カウンター` |
| zh-Hans | `Country days \| Schengen — 申根与税务居住天数计数` |
| zh-Hant | `Country days \| Schengen — 申根與稅務居住天數計數` |
| ru | `Country days \| Schengen — Счётчик Шенгена и налогового резидентства` |
| uk | `Country days \| Schengen — Лічильник Шенгену та податкового резидентства` |
| ar | `Country days \| Schengen — عداد أيام شنغن والإقامة الضريبية` |
| he | `Country days \| Schengen — מונה ימי שנגן ותושבות מס` |
| hi | `Country days \| Schengen — शेंगेन और टैक्स रेजिडेंसी दिन गणक` |
| th | `Country days \| Schengen — ตัวนับวันเชงเก้นและถิ่นที่อยู่ภาษี` |

en is the root `index.html`, not a key in `landing-phrases.json`. fr and fr-CA, pt-BR and pt-PT, and cs and sk must not share a title. hu drops `adónap`. That word is a tax-filing day.

## FAQ title

`faqTitle` was translated as "country days" and came back as parliament, a picnic, or a national holiday. Write this.

| Locale | Now | Write |
|---|---|---|
| de | `Landtage` | `Ländertage` |
| fr | `Journées champêtres` | `Jours par pays` |
| fr-CA | `Journées champêtres` | `Jours par pays` |
| es | `Días de campo` | `Días por país` |
| es-MX | `Días de campo` | `Días por país` |
| it | `Giornate di campagna` | `Giorni per paese` |
| ko | `국가의 날` | `국가별 일수` |
| fi | `Maalaispäivät` | `Päivät maittain` |
| hu | `Vidéki Napok` | `Napok országonként` |
| id | `Hari Negara` | `Hari per negara` |
| ms | `Hari Negara` | `Hari setiap negara` |
| nl | `Landelijke Dagen` | `Dagen per land` |
| pt-BR | `Dias do País` | `Dias por país` |
| pt-PT | `Dias do País` | `Dias por país` |
| ro | `Zilele Țării` | `Zile pe țară` |
| hi | `देश दिवस` | `देश के दिन` |
| sk | `Country Days` | `Dni v krajinách` |

Leave ru `Счётчик дней`, uk `Лічильник днів`, pl `Licznik dni`, zh-Hans `国别日数`, zh-Hant `國別日數`, ja `カントリーデイズ`, and vi `Đếm ngày theo quốc gia`. Those already mean a day counter.

## Per locale

| Locale | Key | Now | Write |
|---|---|---|---|
| de | `faqTitle` | `Landtage` | `Ländertage`. Feature copy that says `Steuerschalter` is a teller window. Write `Steuertage`. |
| fr | `faqTitle`, `sectionAboutCopyAfter` | `Journées champêtres`, glued `GPSajoute` | `Jours par pays`. The space fix handles the glue. `Comptoirs` → `compteurs` if that feature title is the visa counter. |
| fr-CA | whole block | copy of fr, CTA `jours de campagne` | `jours par pays`. Give fr-CA its own `metaDescription`. |
| es | `faqTitle` | `Días de campo` | `Días por país`. `Mostradores` → `contadores`. |
| es-MX | `faqTitle` and the feature body | same `Días de campo` as es | `Días por país`, and a description that is not the Spain string. |
| it | `faqTitle` | `Giornate di campagna` | `Giorni per paese`. `Sportelli` → `contatori`. |
| hu | `faqTitle`, `metaTitle` | `Vidéki Napok`, `adónap` | FAQ `Napok országonként`. Title is the hu row above. The FAQ already has the right term `adóügyi illetőség`. |
| fi | `faqTitle`, about heading | `Maalaispäivät`, `Mikä on a` | `Päivät maittain`. The heading `Mikä on a` lost the word `Country`. Write `Mikä on Country Days?`. |
| ko | `faqTitle` | `국가의 날` | `국가별 일수`. Keep one spelling of Schengen, plus the Latin `Schengen`. |
| tr | the FAQ that is still the English sentence | English left in the Turkish FAQ | translate that answer. `vergi muafiyeti` means tax exemption. Write `vergi mukimliği` for tax residency. |
| cs | about heading, `metaTitle` shared with sk | `Co je a počítadlo` | `Co je Country Days?`. `Počet dní na zemi` → `Počet dní v zemi`. Give sk a different title. |
| sk | `faqTitle`, about heading | `Country Days`, `Čo je a počítadlo` | `Dni v krajinách` and `Čo je Country Days?`. |
| sv | about heading, overstay line | `Vad är a`, `översta tid` | `Vad är Country Days?`. `översta tid` → `överskriden tid`. `skattediskar` → `skattedagar`. |
| nl | about and CTA | `GPSvoegt`, `iPhone en Android en Android` | space fix, then delete the second `en Android`. |
| pt-PT | almost the whole block | 46 of 47 fields match pt-BR, including `você`, `aplicativo`, `Baixe` | rewrite `metaDescription`, `heroTagline`, and the CTA in European Portuguese: `aplicação`, `Descarregue`, `si`. |
| ja | `metaDescription` | no Latin `Schengen` in the description | add `Schengen` once in the description too. The title is the ja row above. |
| zh-Hans | `metaDescription` | no Latin `Schengen`, `签证和税务柜台` | add `Schengen`. `柜台` → `天数`. |
| zh-Hant | body | `支持` is simplified, `製` inside `限製` | `支援`, and `限制` without `製`. Add Latin `Schengen`. |
| ru | `metaDescription` | `Шенген` only | add `Schengen` once. The joins are already spaced. |
| uk | `metaDescription` | `Шенген` only | add `Schengen` once. |
| hi | `metaTitle` | `शेंगेन` only | the hi row above. Keep `टैक्स रेजिडेंसी`. |
| id | about heading, `faqTitle` | `Apa itu a`, `Hari Negara` | `Apa itu Country Days?` and `Hari per negara`. |
| vi | about heading | `một là gì` | `Country Days là gì?` |
| th | about heading | `ก.คืออะไร` | `Country Days คืออะไร`. `ใช้จ่าย` in the day-count sentence means spend money. Write `นับวัน`. |
| he | about heading | `מה זה א` | `מה זה Country Days?` |
| ca | about heading | `Què és a` | `Què és Country Days?` |
| hr | subtitle | `iPhoneu i Androidu i Androidu` | one `i Androidu`. |
| ro | about heading | `Ce este a contor` | `Ce este Country Days?` |
| ms | about heading | `Apakah a` | `Apakah Country Days?` |
| da | feature copy | `skatteskranker`, and Norwegian `skatteopphold` | `skattedage`. Use Danish `skattemæssigt ophold`. |
| nb | CTA | `BliDagteller` | `Skaff Dagteller`. `Bli` means become, and it is glued to the app name. |
| el | about heading | `Τι είναι ένα μετρητής` | `Τι είναι το Country Days;`. Gender must match. Add Latin `Schengen` beside `Σένγκεν` in the title. |
| ar | `metaDescription` | Latin `Schengen` only in one FAQ | add `Schengen` to the description. |
| pl | feature | `Kontrola wiz` | `Limit wizowy`. The title is the pl row above. |

The headings `Co je a`, `Vad är a`, `Mikä on a`, `Apa itu a` are the English `What is a` with the noun left in English and then dropped. Restoring `Country Days` in that heading is the whole fix for those locales.

Rebuild `de/index.html`. The `<title>` must contain `Country days` and `Schengen`. The page must contain `Ländertage` and `GPS Fügt` or `GPS fügt` with a space. It must not contain `GPSFügt` or `Landtage`.
