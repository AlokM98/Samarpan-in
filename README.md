# Samarpan

A lightweight React storefront for Samarpan's handcrafted celebration collection. Built with React 19 and Vite; product illustrations are CSS-based, and ordering opens WhatsApp with a prefilled product message.

The hero animation is selected through `src/components/hero/animationRegistry.js`. Its default `karwa-chauth` variant lazy-loads the Three.js scene in `animations/karwa-chauth`; its moon, chalni, and scanned-hand assets are kept in that folder's `assets/` directory and bundled from module-relative URLs. `HeroSection` owns the headline, layout, and collection CTA; reduced-motion preferences show a static poster instead of loading the 3D scene.

## Run locally

```sh
npm install
npm run dev
```

Vite prints the local URL after startup. If the default port is occupied, it automatically selects another port.

## Verify and build

```sh
npm run lint
npm run build
npm run preview
```

The production output is written to `dist/`.
