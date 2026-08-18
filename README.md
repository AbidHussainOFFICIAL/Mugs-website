# Mugsy's Mugs — component structure

This splits the original single-file page into focused pieces so each section
can be edited independently.

```
app/
  layout.tsx      Root layout — imports globals.css, sets page metadata
  globals.css     Font import (Anton + Inter) and the .font-anton utility
  page.tsx        Composes the whole page from the components below
components/
  Navbar.tsx           Top nav bar (logo, links, mobile menu button, Explore Collection pill)
  Hero.tsx             Blue header: wordmark SVG, PREMIUM panel, stat card, Shop Now, big mug image
  CollectionHeader.tsx "EXPLORE COLLECTION" heading + intro paragraph + CTA (mobile arrow / desktop pill)
  ProductGrid.tsx      Maps product data into ProductCard components
  ProductCard.tsx      A single product tile (price badge, cart/heart buttons, image)
  Footer.tsx           Footer nav, social icons, copyright line
data/
  products.ts     Product interface + the product array — edit this to add/remove/change products
```

## What to edit where

- **Change a product's name/price/image** → `data/products.ts`
- **Change the product card layout/styling** → `components/ProductCard.tsx`
- **Change the hero copy, mug size, or PREMIUM panel** → `components/Hero.tsx`
- **Change the "EXPLORE COLLECTION" heading/intro** → `components/CollectionHeader.tsx`
- **Change nav links or the logo** → `components/Navbar.tsx`
- **Change footer links/socials/copyright** → `components/Footer.tsx`
- **Change fonts or global body styles** → `app/globals.css`

## Setup notes

- These files assume the `@/*` import alias (the Next.js default when you
  scaffold with `create-next-app` and answer "yes" to the import alias
  prompt). If your `tsconfig.json` doesn't have it, add:

  ```json
  {
    "compilerOptions": {
      "paths": {
        "@/*": ["./*"]
      }
    }
  }
  ```

  or swap the `@/components/...` / `@/data/...` imports for relative paths
  (`../components/...`) to match your project's structure.

- Drop `products.ts` under whichever folder you keep shared data in (some
  projects use `lib/` or `src/data/` instead of a top-level `data/` folder —
  just update the import paths in `ProductGrid.tsx` and `ProductCard.tsx` to
  match).

- All Tailwind classes are unchanged from the working single-file version —
  this is purely a structural split, no visual changes.