# Kitenzo Headless — documentation site

The public documentation for **Kitenzo Headless**, served at **[headless.kitenzo.com](https://headless.kitenzo.com)**.

Kitenzo Headless lets merchants pull their bundles into any storefront (Shopify Hydrogen, Next.js, TapCart mobile apps, custom) via a REST API, a typed JS/TS SDK (`@kitenzo/core` + `@kitenzo/react`), and an embeddable web component. The feature is currently **invite-only** (behind the `headless_api` feature flag) — every page carries a banner directing merchants to `support@kitenzo.com`.

> **Source of truth.** This site documents code that lives in the **`Bundle-Builder`** repo (the Kitenzo Shopify app). This repo only holds the docs. When the feature changes there, update the docs here — see [Keeping docs in sync](#-keeping-docs-in-sync-the-important-part).

---

## Tech stack

- **[Astro](https://astro.build) + [Starlight](https://starlight.astro.build)** — static documentation framework (search, nav, TOC, a11y out of the box).
- **MDX** content under `src/content/docs/`.
- Theme matched to the **current kitenzo.com** (see the `kitenzo-website` repo's warm-black enterprise palette in `tailwind.config.js`): warm near-black surfaces (`#0C0B09` page / `#12110E` bands / `#1A1815` cards / `#060505` code wells), warm white text `#F4F2ED`, secondary `#A9A399`, **luminous olive accent `#A4B581`**, borders `#282520`/`#1C1A16`. Flat colour only — **no gradients**. All in `src/styles/theme.css`.
- **Single fixed dark appearance** — `ThemeProvider` is overridden to pin `data-theme="dark"`, `ThemeSelect` is overridden with an empty component, and the same tokens apply for every `data-theme`.
- **Code blocks** use a custom Expressive Code theme (`kitenzo-dark`, defined inline in `astro.config.mjs`): near-black well, muted keywords, warm-white identifiers, olive strings — the same palette kitenzo.com uses in its code panels.
- **Header** is flush with the page (dark-on-dark with a hairline), centered search, and a kitenzo.com-style right group (text link + "Get access" pill) via a `SocialIcons` override.
- **Fonts:** Switzer (sans, via Fontshare CDN) + Geist Mono (mono, via Google Fonts) — the same sources kitenzo.com uses. Loaded in `head` in `astro.config.mjs`. Mono is used for kickers/eyebrows, table headers, endpoint paths and meta strips (the kitenzo.com "ledger" motif).
- **Landing** (`index.mdx`, `template: splash`) mirrors the kitenzo.com homepage structure: two-tone hero with the **runtime visual** (a CSS-only clone of kitenzo.com's DecisionRuntime — code pane + engine rows lighting up in sequence), a "runs on" band, Mode 1/Mode 2 path cards with brand-coloured code panels, a full-width TapCart card, the "things you never implement again" + endpoints panel split, numbered steps, a data-layer grid, notes, CTA, and a site-map footer. Scroll-reveal fade-ups via a small IntersectionObserver (inline script in `head`) + `.kz-reveal`.
- Deployed to **GitHub Pages** — see [Deployment](#deployment).

## Local development

```bash
npm install        # install dependencies (Node 22+; Astro 6 / mdx require >= 22.12)
npm run dev        # dev server at http://localhost:4321
npm run build      # static build to dist/
npm run preview    # preview the production build locally
```

## Repository layout

```
.
├── astro.config.mjs           # Starlight config: sidebar, overrides, custom EC theme, head
├── src/
│   ├── content.config.ts      # Starlight docs content collection
│   ├── content/docs/          # ← all documentation pages (MDX)
│   │   ├── index.mdx           #   landing (template: splash)
│   │   ├── introduction/       #   overview, modes, architecture, glossary
│   │   ├── getting-started/    #   access, api-keys, cors, quickstart
│   │   ├── embed/              #   Mode 1 — web component, react, vanilla, cart
│   │   ├── sdk/                #   Mode 2 — provider, hooks, cart, ssr
│   │   ├── api/                #   REST reference — auth, limits, cors, errors, endpoints, embed-api
│   │   ├── data/               #   "data you can pull" — types, products, discounts, rules, …
│   │   ├── reference/          #   @kitenzo/core, @kitenzo/react, TypeScript types
│   │   ├── guides/             #   Hydrogen, Next.js, TAPCART, cart & discounts, local dev
│   │   └── resources/          #   changelog, limits, support
│   ├── components/
│   │   ├── Banner.astro        #   site-wide invite-only banner (overrides Starlight Banner)
│   │   ├── ThemeProvider.astro #   pins data-theme="dark" (single fixed appearance)
│   │   ├── ThemeSelect.astro   #   empty override — removes the light/dark toggle
│   │   ├── SocialIcons.astro   #   header right group: kitenzo.com link + "Get access" pill
│   │   ├── Hero.astro          #   custom landing hero (kicker, two-tone title, CTAs, meta, visual)
│   │   ├── HeroVisual.astro    #   the runtime visual (CSS-only DecisionRuntime clone)
│   │   ├── Landing.astro       #   below-the-hero landing sections + footer
│   │   ├── SiteFooter.astro    #   site-map footer (landing only)
│   │   └── Endpoint.astro      #   <Endpoint method path /> for the API reference
│   ├── styles/theme.css        #   the entire visual theme (brand tokens, chrome, landing, animations)
│   └── assets/logo.png         #   kitenzo wordmark (inverted white in the dark chrome)
├── public/
│   ├── CNAME                   #   headless.kitenzo.com (do not remove)
│   ├── favicon.svg             #   dark rounded square + layers mark
│   └── og.png                  #   social card (regenerate from scripts/og.svg)
├── scripts/og.svg              #   source for og.png (rasterized with sharp)
└── .github/workflows/deploy.yml
```

## Authoring pages

- Add a page by creating an `.mdx` file under `src/content/docs/…`, then add it to the `sidebar` in `astro.config.mjs`. Sidebar `link`s use the page's URL path (trailing slash), e.g. `/api/errors/`.
- **Do not** use the Markdown `## Heading {#custom-id}` syntax — MDX parses `{…}` as JSX and the build fails. Link to auto-generated slugs instead (e.g. `## Price a selection` → `#price-a-selection`).
- Available MDX components: Starlight's `Card`, `CardGrid`, `LinkCard`, `Tabs`/`TabItem`, `Steps`, `Aside`, plus the local `Endpoint` (`import Endpoint from '…/components/Endpoint.astro'`). Use `:::note` / `:::caution` / `:::danger` asides for callouts.
- Code fences: use languages Shiki bundles (`bash`, `ts`, `tsx`, `json`, `js`, `html`, `css`, `text`). Avoid `env` (not bundled).

## Custom CSS helpers (in `theme.css`)

- Brand tokens: `--kz-surface(-muted/-alt/-dark)`, `--kz-content(-secondary/-muted/-inverse)`, `--kz-accent(-light/-dark)`, `--kz-border(-muted)`, plus warm semantic tints (`--kz-amber`, `--kz-clay`, `--kz-slate`). **No gradient tokens** — the brand is flat. Keep it that way.
- `.kz-kicker` (+ `--accent`) — mono uppercase eyebrow. `.kz-h2 .dim` — second line of a heading in secondary colour (the kitenzo.com two-tone).
- `.kz-btn--primary` / `--secondary` — pill buttons (also applied to Starlight's `.sl-link-button`).
- `.kz-section` (+ `--muted`) — full-bleed landing band. `.kz-container` — 80rem container. `.kz-split`, `.kz-paths`/`.kz-path`, `.kz-steps`/`.kz-step`, `.kz-grid`/`.kz-cell`, `.kz-runs`, `.kz-plus`, `.kz-meta`, `.kz-cta` — landing building blocks.
- `.kz-code` — static brand-coloured code panel (`.kw`/`.fn`/`.str`/`.cm` spans); `.rt*` — the hero runtime visual.
- `.kz-method[data-method]`, `.kz-endpoint`, `.kz-badge` (+ `--new`) — API reference helpers.
- `.kz-reveal` — fade-up on scroll (IntersectionObserver in `head`); respects `prefers-reduced-motion`.

---

## 🔑 Keeping docs in sync (the important part)

This site must stay **100% accurate** to the code. When Kitenzo Headless changes in the `Bundle-Builder` repo, update the docs from the files below. **Never document an SDK export that isn't in `index.ts`, or an API field that isn't in the serializer.** When in doubt, read the source — it's the source of truth, not these docs.

| If this changes in `Bundle-Builder`… | …update these docs | Read from (source of truth) |
|---|---|---|
| REST endpoints / request / response shapes | `api/endpoints.mdx`, `api/index.mdx`, `data/*` | `headless_api/views.py`, `headless_api/urls.py` |
| `/configure` cart-ready payload (TapCart) | `api/endpoints.mdx`, `guides/tapcart.mdx`, `guides/cart-discounts.mdx` | `proxy/configure.py` (`build_native_cart_payload`), `headless_api/views.py`, `headless_api/tests/test_views_configure.py` |
| Auth, key format, key storage | `api/authentication.mdx`, `getting-started/api-keys.mdx` | `headless_api/auth.py`, `headless_api/models.py` |
| Rate limits | `api/rate-limits.mdx`, `resources/limits.mdx` | `headless_api/throttling.py` |
| CORS behavior | `api/cors.mdx`, `getting-started/cors.mdx` | `headless_api/middleware.py` |
| Feature flag / gating | `getting-started/access.mdx` | `core/constants.py` (`FEATURE_HEADLESS_API`) |
| Bundle data model (discounts, limit rules, sections, required items, conditions) | `data/*` | `core/models.py` |
| SDK exports, client methods, hooks, types | `reference/core.mdx`, `reference/react.mdx`, `reference/types.mdx`, `sdk/*` | `packages/kitenzo-core/src/index.ts` + `types.ts`, `packages/kitenzo-react/src/index.ts` (+ `src/hydrogen/index.ts`) |
| SDK version | `reference/core.mdx`, `reference/react.mdx`, `resources/changelog.mdx`, landing hero meta | `packages/*/package.json` (`version`), `packages/*/CHANGELOG.md` |
| Admin key management UX | `getting-started/api-keys.mdx` | `src/components/admin/SettingsPage/HeadlessSettings.tsx` |
| Web component attributes / embed events | `embed/web-component.mdx`, `embed/cart.mdx` | the storefront bundle script + `headless_api/views.py` embed endpoints |
| Public host / base URL | search-and-replace `live.bb.eight-cdn.com` | `packages/kitenzo-core/src/client.ts`, `embed.ts` |
| TapCart SDK action names / block tooling | `guides/tapcart.mdx` | TapCart's developer docs (dev.tapcart.com) + `docs/plans/2026-06-03-tapcart-*` in Bundle-Builder |

### Accuracy rules

1. **Exports must match `index.ts` exactly.** The React package exports exactly one component (`BundleEmbed`); keep `reference/core.mdx` / `reference/react.mdx` aligned with the index files. Do **not** reintroduce a `<BundleBuilder>` component; it doesn't exist.
2. **Client methods are** `listBundles`, `getBundle`, `getPrice`, `submitBundle`, `getSettings` (verified in `client.ts`). Anything else is private.
3. **Field names and types in tables must be verbatim** from the serializer / TS types.
4. **`cart` on `/configure` is native-bundles-only** and gated on the bundle's *actual* type server-side — never document it as available for other types.
5. When the SDK publishes a new version, bump every `v0.x.y` reference (both reference badges, changelog, landing hero meta).

### Verifying accuracy

Run a quick audit after any data change:

```bash
npm run build                       # must pass with no MDX/lang errors
grep -rn "BundleBuilder>" src/      # should return nothing (no such component)
grep -rn "getFullBundle" src/       # stale client method name — should be empty
```

---

## Deployment

The site is built and deployed by **`.github/workflows/deploy.yml`** on every push to `main` (GitHub Pages via `withastro/action`, Node 22).

**One-time setup:**

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. `public/CNAME` already contains `headless.kitenzo.com` — keep it; it's copied to `dist/` on every build so the custom domain survives redeploys.
3. **DNS (Cloudflare):** add a `CNAME` record `headless` → `<github-user-or-org>.github.io` (Cloudflare flattens it). Use SSL mode **Full**.
4. In GitHub Pages settings, set the custom domain to `headless.kitenzo.com` and enable **Enforce HTTPS** once the cert is issued.

`astro.config.mjs` sets `site: 'https://headless.kitenzo.com'` (used for canonical URLs, sitemap and the OG image URL).

### Regenerating the social image

```bash
node -e "const s=require('sharp'),fs=require('fs');s(fs.readFileSync('scripts/og.svg'),{density:144}).png().resize(1200,630).toFile('public/og.png')"
```
