// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://headless.kitenzo.com',
  integrations: [
    starlight({
      title: 'Headless',
      description:
        'Pull your Kitenzo bundles into any headless storefront — Hydrogen, Next.js, or a fully custom frontend. REST API, JavaScript/TypeScript SDK, and an embeddable web component.',
      logo: {
        src: './src/assets/logo.png',
        alt: 'Kitenzo',
      },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/theme.css'],
      expressiveCode: {
        // Single fixed (dark) code theme — no light/dark switching.
        themes: ['github-dark'],
        styleOverrides: { borderRadius: '12px' },
      },
      components: {
        // Site-wide invite-only banner (renders on every page).
        Banner: './src/components/Banner.astro',
        // Single fixed appearance — remove the light/dark toggle.
        ThemeSelect: './src/components/ThemeSelect.astro',
        // Custom landing hero with the animated visual.
        Hero: './src/components/Hero.astro',
      },
      social: [
        { icon: 'email', label: 'Support', href: 'mailto:support@kitenzo.com' },
        { icon: 'external', label: 'Kitenzo', href: 'https://kitenzo.com' },
      ],
      lastUpdated: true,
      pagefind: true,
      head: [
        // Brand fonts — same sources as kitenzo.com (Switzer via Fontshare, Geist Mono via Google).
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://api.fontshare.com', crossorigin: true } },
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://api.fontshare.com/css?f[]=switzer@400,500,600,700&display=swap',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&display=swap',
          },
        },
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://headless.kitenzo.com/og.png' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#17150e' } },
        // Scroll-reveal: fade-up elements with .kz-reveal / animate the hero visual.
        {
          tag: 'script',
          content:
            "document.addEventListener('DOMContentLoaded',function(){var els=document.querySelectorAll('.kz-reveal,.kz-visual');if(!('IntersectionObserver'in window)){els.forEach(function(e){e.classList.add('is-visible')});return;}var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('is-visible');io.unobserve(x.target);}})},{rootMargin:'0px 0px -40px 0px'});els.forEach(function(e){io.observe(e)});});",
        },
      ],
      sidebar: [
        {
          label: 'Introduction',
          items: [
            { label: 'Overview', link: '/introduction/' },
            { label: 'Integration modes', link: '/introduction/modes/' },
            { label: 'Architecture', link: '/introduction/architecture/' },
            { label: 'Glossary', link: '/introduction/glossary/' },
          ],
        },
        {
          label: 'Getting started',
          items: [
            { label: 'Get access', link: '/getting-started/access/' },
            { label: 'Create an API key', link: '/getting-started/api-keys/' },
            { label: 'CORS & allowed origins', link: '/getting-started/cors/' },
            { label: 'Quickstart', link: '/getting-started/quickstart/' },
          ],
        },
        {
          label: 'Mode 1 — Embed',
          items: [
            { label: 'Overview', link: '/embed/' },
            { label: 'Web component', link: '/embed/web-component/' },
            { label: 'React (BundleEmbed)', link: '/embed/react/' },
            { label: 'Vanilla JS', link: '/embed/vanilla/' },
            { label: 'Cart integration', link: '/embed/cart/' },
          ],
        },
        {
          label: 'Mode 2 — SDK',
          items: [
            { label: 'Overview', link: '/sdk/' },
            { label: 'Provider & client', link: '/sdk/provider/' },
            { label: 'Hooks', link: '/sdk/hooks/' },
            { label: 'Cart helpers', link: '/sdk/cart/' },
            { label: 'Server-side rendering', link: '/sdk/ssr/' },
          ],
        },
        {
          label: 'API reference',
          items: [
            { label: 'Overview', link: '/api/' },
            { label: 'Authentication', link: '/api/authentication/' },
            { label: 'Rate limits', link: '/api/rate-limits/' },
            { label: 'CORS', link: '/api/cors/' },
            { label: 'Errors', link: '/api/errors/' },
            { label: 'Endpoints', link: '/api/endpoints/' },
            { label: 'Embed sub-API', link: '/api/embed-api/' },
          ],
        },
        {
          label: 'Data you can pull',
          items: [
            { label: 'Overview', link: '/data/' },
            { label: 'Bundle types', link: '/data/bundle-types/' },
            { label: 'Sections, products & variants', link: '/data/products/' },
            { label: 'Discounts', link: '/data/discounts/' },
            { label: 'Limit rules', link: '/data/limit-rules/' },
            { label: 'Required products', link: '/data/required-products/' },
            { label: 'Conditions & subscriptions', link: '/data/conditions-subscriptions/' },
          ],
        },
        {
          label: 'SDK reference',
          items: [
            { label: '@kitenzo/core', link: '/reference/core/' },
            { label: '@kitenzo/react', link: '/reference/react/' },
            { label: 'TypeScript types', link: '/reference/types/' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Shopify Hydrogen', link: '/guides/hydrogen/' },
            { label: 'Next.js', link: '/guides/nextjs/' },
            { label: 'Cart & discount application', link: '/guides/cart-discounts/' },
            { label: 'Local development', link: '/guides/local-dev/' },
          ],
        },
        {
          label: 'Resources',
          items: [
            { label: 'Versioning & changelog', link: '/resources/changelog/' },
            { label: 'Limits & quotas', link: '/resources/limits/' },
            { label: 'Support', link: '/resources/support/' },
          ],
        },
      ],
    }),
  ],
});
