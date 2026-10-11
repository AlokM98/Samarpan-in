const IMAGE_WIDTHS = [320, 480, 640, 828, 1080, 1200, 1600, 1920]
const DEFAULT_WIDTH = 640
const IMAGE_QUALITY = 75

function optimizedImageUrl(source, width) {
  const params = new URLSearchParams({
    url: source,
    w: String(width),
    q: String(IMAGE_QUALITY),
  })

  return `/_vercel/image?${params.toString()}`
}

export function getProductImageProps(source) {
  if (!source) return {}

  if (import.meta.env.DEV || !import.meta.env.VERCEL) {
    return { src: source }
  }

  return {
    src: optimizedImageUrl(source, DEFAULT_WIDTH),
    srcSet: IMAGE_WIDTHS.map((width) => `${optimizedImageUrl(source, width)} ${width}w`).join(', '),
  }
}