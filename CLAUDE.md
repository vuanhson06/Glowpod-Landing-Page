# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

A working local storefront prototype for **GlowPod**, a fictional student beauty-tech brand. Its product, GlowPod Blend, is a device that dispenses foundation from refill cartridges. The site is in English, prices are placeholders in VND, and checkout is a mock: there is no backend and no payment.

Stack: Next.js 16 (App Router, `cacheComponents` and `partialPrefetching` enabled), React 19, TypeScript, Tailwind CSS v4 (CSS-first config, no `tailwind.config`), npm. Next 16 differs from older versions, so read `node_modules/next/dist/docs/` before using an unfamiliar API (see AGENTS.md).

## Commands

Node comes from nvm in WSL. If `node` isn't found, run `. ~/.nvm/nvm.sh` first; the Windows `npm` on the PATH won't work in this folder.

```bash
npm run dev        # dev server on :3000
npm run build      # production build (also generates PageProps/LayoutProps types)
npm start          # serve the production build
npm run lint       # ESLint (next core-web-vitals + typescript)
npm test           # Vitest, all tests
npx vitest run src/lib/logic.test.ts -t "shippingFee"   # one file / one test
```

`PageProps<"/route">` and `LayoutProps` are global types that Next generates. `tsc` reports them as missing until `dev` or `build` has run once.

## Architecture

- **Content is static TypeScript data** in `src/data/` (`products.ts`, `posts.ts`, `faqs.ts`). Product and blog detail pages (`shop/[slug]`, `blog/[slug]`) prerender from this data through `generateStaticParams`. `params` is a Promise and must be awaited.
- **Cart:** `src/lib/cartReducer.ts` holds the pure logic (add, set quantity, remove, clear, sanitize, totals) and is unit tested. `src/lib/cart.ts` is a client-side external store on `localStorage` (key `glowpod-cart-v1`), read with `useSyncExternalStore`. It has no React context or provider. The server snapshot is always an empty cart. Use `useHydrated()` before showing an "empty cart" state, so it doesn't flash during hydration.
- **Checkout flow:** `CheckoutForm` validates the form with `validateCheckout` (`src/lib/checkout.ts`) and works out shipping with `shippingFee` (`src/lib/shipping.ts`, which the Shipping page and cart estimate also use). It then saves the order to `sessionStorage` (`src/lib/order.ts`), calls `router.push("/thank-you")` and clears the cart. `ThankYouView` reads that order back.
- **Client/server split:** page files stay server components so they can export `metadata`. Interactive parts live in `src/components/*View.tsx`, `CheckoutForm`, `AddToCart` and `Header`.
- **Cache Components / Activity:** routes you navigate away from stay mounted but hidden, and their state is kept. Effects are cleaned up when a route is hidden and run again when it's shown. `CheckoutForm` resets its "submitting" state in an effect cleanup for this reason. Avoid `new Date()` and other uncached dynamic values in server components.

## Site rules

- **Navigation:** every required page (Home, Shop, Cart, Blog, About, Checkout, Thank you, FAQ, Returns, Shipping) must be reachable within 3 clicks of `/`. The header (`MAIN_NAV` in `Header.tsx`) and footer (`Footer.tsx`) put most pages one click away. Checkout is Cart → Checkout, and Thank you is the step after Place order. Keep this rule when you add or move pages.
- **Brand tokens** are in `src/app/globals.css` `@theme`: `ivory`, `sand`, `rose` (plus `rose-light`/`rose-dark`), `charcoal` and `sage` (plus `sage-light`/`sage-dark`). Use them as `bg-ivory`, `text-rose-dark` and so on. On ivory, use `rose-dark` or `sage-dark` for text, because plain rose and sage fail contrast. The font is Be Vietnam Pro (`--font-be-vietnam`).
- **Honest copy:** this is a student proposal. Don't add claims of real customers, sales, testing results, medical or skin diagnosis, or superiority over competitors. Prices, policies and cost-per-use figures are labelled as prototype or draft. Use `’` or `&apos;` in JSX text, because ESLint's `react/no-unescaped-entities` rule rejects `'`.
- Product images are SVG placeholders (`ProductVisual.tsx`) until real photos exist.
