# countrydays.app

Landing page for **Country Days Tracker & Counter** (iOS).

## Deploy

Hosted on [GitHub Pages](https://pages.github.com/) with custom domain `countrydays.app`.

```bash
git push origin main
```

## GitHub Pages setup

1. Create repo `countrydays` on GitHub (public)
2. Push this folder
3. **Settings → Pages →** deploy from `main` branch, root `/`
4. Set custom domain: `countrydays.app`
5. Enable **Enforce HTTPS** after DNS check passes

## Cloudflare DNS

For apex domain `countrydays.app`:

| Type | Name | Value |
|------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `moonmoonnotsun.github.io` |

Use DNS only (grey cloud). Set SSL mode to **Full** in Cloudflare.

## Build locale pages

```bash
node scripts/generate-landing-phrases.mjs   # regenerate translations
node scripts/build-locale-pages.mjs       # build de/, pl/, etc.
```

## Links

- App Store: https://apps.apple.com/us/app/country-days-tracker-counter/id6782627594
- Privacy: https://mpc-app-c2e7a.web.app/country-days-privacy.html
- Terms: https://mpc-app-c2e7a.web.app/country-days-terms.html
