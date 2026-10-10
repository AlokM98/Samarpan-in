import { useEffect, useState } from 'react'
import './storefront.css'
import './brand-theme.css'
import HeroSection from './components/hero/HeroSection.jsx'

const phoneNumber = '916205623537'

const products = [
  { name: 'Gulab Chandni Thali', price: '1,899', description: 'A blush-pink thali dressed with hand-painted florals and a moonlit sheen.', mark: 'Gulab', art: 'thali' },
  { name: 'Sona Sitara Sieve', price: '1,299', description: 'A gold-finished chalni with delicate star details for the first glimpse of the moon.', mark: 'Sitara', art: 'sieve' },
  { name: 'Mehfil Celebration Set', price: '2,499', description: 'A considered pairing of thali, sieve and diya for a beautifully complete ritual.', mark: 'Mehfil', art: 'set' },
  { name: 'Noor Diya Pair', price: '699', description: 'Two warm brass-finish diyas to add a soft glow to your evening table.', mark: 'Noor', art: 'diya' },
  { name: 'Chaand Baali Favour', price: '449', description: 'A tiny keepsake favour inspired by moonlight, wrapped ready for gifting.', mark: 'Baali', art: 'favour' },
  { name: 'Suhagan Gift Hamper', price: '3,199', description: 'A festive curation of little luxuries, made for someone very loved.', mark: 'Suhagan', art: 'hamper' },
  { name: 'Aastha Pooja Thali', price: '1,599', description: 'A serene ivory-and-gold thali with room for the rituals that matter.', mark: 'Aastha', art: 'pooja' },
  { name: 'Raat Rani Tealight Trio', price: '899', description: 'Three floral tealight holders that turn a simple corner into a celebration.', mark: 'Raat Rani', art: 'lights' },
  { name: 'Mogra Gajra Box', price: '549', description: 'A keepsake box for a small floral gesture, finished with a satin ribbon.', mark: 'Mogra', art: 'mogra' },
  { name: 'Chaandni Couple Hamper', price: '2,899', description: 'A thoughtful pair of keepsakes for the couple at the heart of the evening.', mark: 'Chaandni', art: 'couple' },
  { name: 'Laal Dhaaga Potli', price: '399', description: 'A rich red potli for gifting sweets, blessings and a little good fortune.', mark: 'Dhaaga', art: 'potli' },
  { name: 'Riwaaz Memory Box', price: '2,199', description: 'A keepsake box made to hold photographs, notes and the stories of your rituals.', mark: 'Riwaaz', art: 'memory' },
]

function orderLink(product) {
  const message = `Hi Samarpan, I would love to order the ${product.name} (₹${product.price}).`
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
}

function ProductArtwork({ product }) {
  return (
    <div className={`product-art product-art--${product.art}`} role="img" aria-label={`${product.mark} product illustration`}>
      <span className="art-halo" />
      <span className="art-object" />
      <span className="art-detail" />
      <span className="art-mark">{product.mark}</span>
      <span className="art-spark" aria-hidden="true">✦</span>
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
          <span className="product-price">₹{product.price}</span>
        </div>
        <p className="product-category">KARWA CHAUTH</p>
        <p className="product-description">{product.description}</p>
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
        <img src="/assets/header_logo.png" alt="Samarpan — Bringing meaning to every celebration" />
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
