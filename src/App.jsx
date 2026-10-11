import { useEffect, useState } from 'react'
import './storefront.css'
import './brand-theme.css'
import HeroSection from './components/hero/HeroSection.jsx'
import products from './data/products.json'
import { getProductImageProps } from './utils/vercelImage.js'

const phoneNumber = '916205623537'

function orderLink(product) {
  const message = `Hi Samarpan, I would love to order the ${product.name} (₹${product.price.toLocaleString('en-IN')}).`
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
}

function ProductArtwork({ product }) {
  const [activeImage, setActiveImage] = useState(0)
  const [isGalleryActive, setIsGalleryActive] = useState(false)
  const images = Array.isArray(product.image) ? product.image.filter(Boolean) : []

  useEffect(() => {
    if (!isGalleryActive || images.length < 2) return undefined

    const intervalId = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length)
    }, 1400)

    return () => window.clearInterval(intervalId)
  }, [images.length, isGalleryActive])

  function startGallery() {
    if (images.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsGalleryActive(true)
    }
  }

  function stopGallery() {
    setIsGalleryActive(false)
    setActiveImage(0)
  }

  return (
    <div
      className={`product-art product-art--${product.art}`}
      role={images.length > 0 ? 'group' : undefined}
      aria-label={images.length > 0 ? `${product.name} photos` : undefined}
      tabIndex={images.length > 0 ? 0 : undefined}
      onPointerEnter={startGallery}
      onPointerLeave={stopGallery}
      onFocus={startGallery}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) stopGallery()
      }}
    >
      {images.length > 0 ? (
        <div className="product-photo-track" style={{ transform: `translateX(-${activeImage * 100}%)` }}>
          {images.map((image, imageIndex) => (
            <img
              className="product-photo"
              key={image}
              {...getProductImageProps(image)}
              alt={`${product.name}, image ${imageIndex + 1} of ${images.length}`}
              sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 900px) calc(50vw - 43px), (max-width: 1499px) 30vw, 310px"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      ) : (
        <div role="img" aria-label={`${product.mark} product illustration`}>
          <span className="art-halo" />
          <span className="art-object" />
          <span className="art-detail" />
          <span className="art-mark">{product.mark}</span>
          <span className="art-spark" aria-hidden="true">✦</span>
        </div>
      )}
      {product.tags?.length > 0 && (
        <ul className="product-tags" aria-label="Product tags">
          {product.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      )}
    </div>
  )
}

function ProductCard({ product, index }) {
  return (
    <article className="product-card" style={{ '--card-index': index }}>
      <ProductArtwork product={product} />
      <div className="product-copy">
        <div className="product-title-row">
          <h3>{product.name}</h3>
          <div className="product-pricing">
            <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="product-original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
        </div>
        <p className="product-category">KARWA CHAUTH</p>
        <p className="product-description">{product.description}</p>
        {product.includes?.length > 0 && (
          <details className="product-includes">
            <summary>What’s included</summary>
            <ul>
              {product.includes.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </details>
        )}
        <a className="product-order" href={orderLink(product)} target="_blank" rel="noreferrer">
          Order on WhatsApp <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  )
}

function SiteHeader({ phoneNumber }) {
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 24)

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener('scroll', updateScrollState, { passive: true })
    updateScrollState()
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  return (
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`} data-theme="dark">
      <a className="wordmark" href="#home" aria-label="Samarpan home">
        <picture>
          <source
            type="image/webp"
            srcSet="/assets/optimized/header_logo-320.webp 320w, /assets/optimized/header_logo-640.webp 640w"
            sizes="(max-width: 600px) 34vw, 210px"
          />
          <img
            src="/assets/header_logo.png"
            width="593"
            height="421"
            alt="Samarpan — Bringing meaning to every celebration"
          />
        </picture>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="#collection">Collection</a>
        <a href="#story">Our story</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="header-order" href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noreferrer">
        Order on WhatsApp <span aria-hidden="true">↗</span>
      </a>
    </header>
  )
}

function App() {
  return (
    <>
      <a className="skip-link" href="#collection">Skip to collection</a>
      <SiteHeader phoneNumber={phoneNumber} />

      <main>
        <HeroSection />

        <section className="collection section-wrap" id="collection" aria-labelledby="collection-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE FIRST COLLECTION <span aria-hidden="true">✦</span></p>
              <h2 id="collection-title">Made for the<br /><em>moonlit moment.</em></h2>
            </div>
            <p className="section-intro">Thoughtful details for the evening of love, laughter and a beautifully held tradition.</p>
          </div>
          <div className="product-grid">
            {products.map((product, index) => <ProductCard key={product.name} product={product} index={index} />)}
          </div>
        </section>

        <section className="story" id="story" aria-labelledby="story-title">
          <div className="story-art" aria-hidden="true">
            <span className="story-sun" />
            <span className="story-flower story-flower--one">✿</span>
            <span className="story-flower story-flower--two">✿</span>
            <span className="story-caption">MADE BY HAND · HELD CLOSE</span>
          </div>
          <div className="story-copy">
            <p className="eyebrow">WHY SAMARPAN <span aria-hidden="true">✦</span></p>
            <h2 id="story-title">Handmade with<br /><em>a little more feeling.</em></h2>
            <p>I am a passionate designer, creating handcrafted gifts that bring meaning to your celebration. Every Samarpan piece is designed to feel personal — from the first glimpse to the moment it becomes part of your ritual.</p>
            <a className="text-link" href="mailto:hello@samarpan.co">Come say hello <span aria-hidden="true">→</span></a>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <p className="eyebrow">FOR YOUR NEXT CELEBRATION</p>
          <h2 id="contact-title">Let’s make it <em>memorable.</em></h2>
          <a className="contact-button" href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noreferrer">
            Start a conversation <span aria-hidden="true">↗</span>
          </a>
          <span className="contact-star contact-star--left" aria-hidden="true">✳</span>
          <span className="contact-star contact-star--right" aria-hidden="true">✦</span>
        </section>
      </main>

      <footer className="site-footer">
        <span>© 2025 Samarpan</span>
        <span>Bringing meaning to every celebration</span>
        <a href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noreferrer">WhatsApp us <span aria-hidden="true">↗</span></a>
      </footer>
    </>
  )
}

export default App
