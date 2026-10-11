# Product Image Assets

Keep optimized product photography in `public/assets/products/`, separate from brand marks in `public/assets/` and 3D scene assets in `animations/karwa-chauth/assets/`. Optional original JPEG sources can be preserved under `assets/product-originals/`; that directory is outside the deployed static assets.

Use one folder per product with stable, lowercase slugs and descriptive filenames:

```text
public/assets/products/
  saubhagya-thali/
    front.webp
    detail-lace.webp
    complete-set.webp
```

Add root-relative paths to that product's `image` array in `src/data/products.json`:

```json
"image": [
  "/assets/products/saubhagya-thali/front.webp",
  "/assets/products/saubhagya-thali/detail-lace.webp",
  "/assets/products/saubhagya-thali/complete-set.webp"
]
```

Product gallery images are served through Vercel's `/_vercel/image` endpoint in production, using responsive widths and AVIF/WebP negotiation. During local Vite development, the app uses the source files directly. The endpoint is configured in the root `vercel.json` and only accepts paths under `/assets/products/`.

Prefer WebP for product photos; keep original JPEGs in `assets/product-originals/` as source files when needed. Use well-lit photography, a consistent aspect ratio across a product's gallery, and useful distinct views rather than duplicate crops. The app keeps the existing CSS illustration when a product's image array is empty.