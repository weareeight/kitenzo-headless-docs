# Kitenzo Headless — documentation site

The public documentation for **Kitenzo Headless**, served at **[headless.kitenzo.com](https://headless.kitenzo.com)**.

Kitenzo Headless lets merchants pull their bundles into any headless storefront (Shopify Hydrogen, Next.js, custom) via a REST API, a typed JS/TS SDK (`@kitenzo/core` + `@kitenzo/react`), and an embeddable web component. The feature is currently **invite-only** (behind the `headless_api` feature flag) — every page carries a banner directing merchants to `support@kitenzo.com`.

> **Source of truth.** This site documents code that lives in the **`Bundle-Builder`** repo (the Kitenzo Shopify app). This repo only holds the docs. When the feature changes there, update the docs here — see [Keeping docs in sync](#-keeping-docs-in-sync-the-important-part).

---

## Tech stack

- **[Astro](https://astro.build) + [Starlight](https://starlight.astro.build)** — static documentation framework (search, nav, TOC, dark/light, a11y out of the box).
- **MDX** content under `src/content/docs/`.
- Theme matched to the **Kitenzo brand** (see `kitenzo-website` repo): warm "Planar" palette (warm white `#FAFAF7`, cream sections, near-black `#2C2A22` text, **olive accent `#8B9A6B`**), **no gradients**, rounded-full pill buttons. All in `src/styles/theme.css`.
- **Single fixed appearance** — the light/dark toggle is removed (`ThemeSelect` overridden with an empty component) and code blocks use one fixed theme (`expressiveCode.themes: ['github-dark']`). The same warm tokens are applied for every `data-theme`.
- **Dark, sticky, technical header + footer**, light warm content in between. The header logo is inverted white + small; the title is set to `Headless` and styled as a mono uppercase label, so it reads "kitenzo · HEADLESS". Search is centered.
- **Fonts:** Switzer (sans, via Fontshare CDN) + Geist Mono (code, via Google Fonts) — the same sources kitenzo.com uses. Loaded in `head` in `astro.config.mjs`.
- Logo: `src/assets/logo.png` (the kitenzo wordmark).
- **Landing** (`index.mdx`, `template: splash`) mirrors the kitenzo.com marketing style: two-tone hero with an animated request/response visual, alternating cream/white full-bleed sections with mono kickers + two-tone headings, warm-toned feature icons, numbered steps, and a dark sitemap footer for secondary nav. Scroll-reveal fade-ups via a small IntersectionObserver (inline script in `head`) + `.kz-reveal`.
- Deployed to **GitHub Pages** (optionally fronted by Cloudflare) — see [Deployment](#deployment).

## Local development

```bash
npm install        # install dependencies (Node 18+; built with Node 22 / npm 10)
npm run dev        # dev server at http://localhost:4321
npm run build      # static build to dist/
npm run preview    # preview the production build locally
```

## Repository layout

```
.
├── astro.config.mjs           # Starlight config: title, logo, sidebar, banner + Hero overrides
├── src/
│   ├── content.config.ts      # Starlight docs content collection
│   ├── content/docs/          # ← all documentation pages (MDX)
│   │   ├── index.mdx           #   landing / gate page (template: splash)
│   │   ├── introduction/       #   overview, modes, architecture, glossary
│   │   ├── getting-started/    #   access, api-keys, cors, quickstart
│   │   ├── embed/              #   Mode 1 — web component, react, vanilla, cart
│   │   ├── sdk/                #   Mode 2 — provider, hooks, cart, ssr
│   │   ├── api/                #   REST reference — auth, limits, cors, errors, endpoints, embed-api
│   │   ├── data/              #   "data you can pull" — types, products, discounts, rules, …
│   │   ├── reference/          #   @kitenzo/core, @kitenzo/react, TypeScript types
│   │   ├── guides/             #   Hydrogen, Next.js, cart & discounts, local dev
│   │   └── resources/          #   changelog, limits, support
│   ├── components/
│   │   ├── Banner.astro        #   site-wide invite-only banner (overrides Starlight Banner)
│   │   ├── ThemeSelect.astro   #   empty override — removes the light/dark toggle
│   │   ├── Hero.astro          #   custom landing hero (overrides Starlight Hero): kicker, two-tone title, CTAs, visual
│   │   ├── HeroVisual.astro    #   looping CSS animation — a bundle being built in a headless storefront
│   │   ├── Landing.astro       #   below-the-hero landing sections + footer
│   │   ├── SiteFooter.astro    #   dark sitemap footer (secondary nav)
│   │   └── Endpoint.astro      #   <Endpoint method path /> for the API reference
│   ├── styles/theme.css        #   the entire visual theme (warm palette, dark chrome, sections, animations)
│   └── assets/logo.png         #   kitenzo wordmark logo (inverted white in the dark header)
├── public/
│   ├── CNAME                   #   headless.kitenzo.com (do not remove)
│   ├── favicon.svg
│   └── og.png                  #   social card (regenerate from scripts/og.svg)
├── scripts/og.svg              #   source for og.png (rasterized with sharp)
└── .github/workflows/deploy.yml
```

## Authoring pages

- Add a page by creating an `.mdx` file under `src/content/docs/…`, then add it to the `sidebar` in `astro.config.mjs`. Sidebar `link`s use the page's URL path (trailing slash), e.g. `/api/errors/`.
- **Do not** use the Markdown `## Heading {#custom-id}` syntax — MDX parses `{…}` as JSX and the build fails. Link to auto-generated slugs instead (e.g. `## Price a selection` → `#price-a-selection`).
- Available MDX components: Starlight's `Card`, `CardGrid`, `LinkCard`, `Tabs`/`TabItem`, `Steps`, `Aside`, plus the local `Endpoint` (`import Endpoint from '…/components/Endpoint.astro'`). Use `:::note` / `:::caution` / `:::danger` asides for callouts.
- Code fences: use languages Shiki bundles (`bash`, `ts`, `tsx`, `json`, `html`, `css`, `ini`). Avoid `env` (not bundled).

## Custom CSS helpers (in `theme.css`)

- `.kz-method[data-method="GET|POST|…"]` — HTTP method pills (used by `Endpoint`).
- `.kz-badge` — status badge (e.g. `<span class="kz-badge">v0.2.6 · published</span>`).
- `.kz-kicker` — mono uppercase section label. `.kz-twotone` + `.ink` — two-tone heading (olive with a warm-black lead-in span).
- `.kz-section` (+ `--cream` / `--alt`) — full-bleed landing section that breaks out of the splash content column. `.kz-feature[data-c="olive|clay|slate|amber"]` — feature card with a warm-toned icon. `.kz-steps` — numbered "how it works" grid. `.kz-visual` — animated hero request/response card. `.kz-footer` — dark sitemap footer.
- `.kz-reveal` — fade-up on scroll (handled by the inline IntersectionObserver in `head`); respects `prefers-reduced-motion`.
- Palette tokens: `--kz-surface`, `--kz-surface-muted`, `--kz-content`, `--kz-accent` (olive `#8B9A6B`), `--kz-ink` (dark chrome), `--kz-border`. **No gradient tokens** — the brand is flat and warm. Keep it that way.

---

## 🔑 Keeping docs in sync (the important part)

This site must stay **100% accurate** to the code. When Kitenzo Headless changes in the `Bundle-Builder` repo, update the docs from the files below. **Never document an SDK export that isn't in `index.ts`, or an API field that isn't in the serializer.** When in doubt, read the source — it's the source of truth, not these docs.

| If this changes in `Bundle-Builder`… | …update these docs | Read from (source of truth) |
|---|---|---|
| REST endpoints / request / response shapes | `api/endpoints.mdx`, `api/index.mdx`, `data/*` | `headless_api/views.py`, `headless_api/urls.py` |
| Auth, key format, key storage | `api/authentication.mdx`, `getting-started/api-keys.mdx` | `headless_api/auth.py`, `headless_api/models.py` |
| Rate limits | `api/rate-limits.mdx`, `resources/limits.mdx` | `headless_api/throttling.py` |
| CORS behavior | `api/cors.mdx`, `getting-started/cors.mdx` | `headless_api/middleware.py` |
| Feature flag / gating | `getting-started/access.mdx` | `core/constants.py` (`FEATURE_HEADLESS_API`), migration `0420_headless_api_feature.py` |
| Bundle data model (discounts, limit rules, sections, required items, conditions) | `data/*` | `core/models.py` |
| SDK exports, client methods, hooks, types | `reference/core.mdx`, `reference/react.mdx`, `reference/types.mdx`, `sdk/*` | `packages/kitenzo-core/src/index.ts` + `types.ts`, `packages/kitenzo-react/src/index.ts` |
| SDK version | `reference/core.mdx`, `reference/react.mdx`, `sdk/index.mdx`, `resources/changelog.mdx` | `packages/*/package.json` (`version`) |
| Admin key management UX | `getting-started/api-keys.mdx` | `src/components/admin/SettingsPage/HeadlessSettings.tsx` |
| Web component attributes / embed events | `embed/web-component.mdx`, `embed/cart.mdx` | the storefront bundle script + `headless_api/views.py` embed endpoints |
| Public host / base URL | search-and-replace `live.bb.eight-cdn.com` | `packages/kitenzo-core/src/client.ts`, `embed.ts` |

### Accuracy rules

1. **Exports must match `index.ts` exactly.** The React package exports exactly one component (`BundleEmbed`) and the core package exports a fixed list of functions — keep `reference/core.mdx` / `reference/react.mdx` aligned with those files. Do **not** reintroduce a `<BundleBuilder>` component; it doesn't exist.
2. **Client methods are** `listBundles`, `getBundle`, `submitBundle`, `getSettings` (verified in `client.ts`). Anything else is private.
3. **Field names and types in tables must be verbatim** from the serializer / TS types.
4. **The `multiples-of` limit rule** exists in the backend (`core/models.py`). If the SDK's `LimitRuleType` union doesn't list it yet, document it as backend-supported and note the gap (see `data/limit-rules.mdx` and `reference/types.mdx`).
5. When the SDK publishes a new version, bump every `v0.x.y` reference and the changelog.

### Verifying accuracy

Run a quick audit after any data change:

```bash
npm run build                       # must pass with no MDX/lang errors
grep -rn "BundleBuilder>" src/      # should return nothing (no such component)
grep -rn "getFullBundle\|getBundles(" src/   # stale client method names — should be empty
```

---

## Deployment

The site is built and deployed by **`.github/workflows/deploy.yml`** on every push to `main` (GitHub Pages via `withastro/action`).

**One-time setup:**

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. `public/CNAME` already contains `headless.kitenzo.com` — keep it; it's copied to `dist/` on every build so the custom domain survives redeploys.
3. **DNS (Cloudflare):** add a `CNAME` record `headless` → `<github-user-or-org>.github.io` (Cloudflare flattens it). Use SSL mode **Full**. You can proxy through Cloudflare or point straight at Pages — both work.
4. In GitHub Pages settings, set the custom domain to `headless.kitenzo.com` and enable **Enforce HTTPS** once the cert is issued.

`astro.config.mjs` sets `site: 'https://headless.kitenzo.com'` (used for canonical URLs, sitemap and the OG image URL).

### Regenerating the social image

```bash
node -e "const s=require('sharp'),fs=require('fs');s(fs.readFileSync('scripts/og.svg'),{density:144}).png().resize(1200,630).toFile('public/og.png')"
```
