# blueframeAI

Production landing page — Next.js 16 (App Router) · TypeScript (strict) · Tailwind CSS v4 · installable PWA.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm run start
```

## Deploy

**Vercel** — push to GitHub → import the repo at vercel.com/new → deploy (zero config).

**Netlify** — push to GitHub → import the repo → build command `npm run build`; Netlify's Next.js runtime handles the rest automatically.

## Before going live

- [ ] Swap the placeholder icons in `public/icons/` for your final brand icons (192×192, 512×512, apple-touch-icon 180×180).
- [ ] Replace `siteUrl` in `app/layout.tsx`, `app/robots.ts`, and `app/sitemap.ts` with your production domain.
- [ ] Point the social links in the footer (`app/page.tsx`) at your real profiles.
- [ ] Add real copy for the Solutions, Pricing, and Docs sections/routes once they exist (currently anchor placeholders).

## Architecture notes

- **PWA**: `public/sw.js` is a small, hand-written service worker registered from `app/layout.tsx`. Neither `next-pwa` nor Serwist is used — as of Next.js 16 (Turbopack-by-default for both `dev` and `build`), both packages currently require forcing the build back onto Webpack. This setup keeps the full Turbopack build with zero extra PWA dependencies, while still meeting the manifest + service-worker installability criteria for "Add to Home Screen."
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`, CSS-native engine). `tailwind.config.ts` is loaded via v4's `@config` directive in `app/globals.css` so the custom color/animation tokens stay in one typed file.
- **Mobile nav**: the Navbar's mobile menu is a pure-CSS checkbox toggle — no client component/JS needed, keeping `app/page.tsx` a fully static Server Component for best LCP/CLS.
