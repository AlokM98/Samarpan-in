import HeroAnimationSlot from './HeroAnimationSlot.jsx'

export default function HeroSection() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title" data-animation-scroll>
      <div className="hero-stage">
        <div className="hero-visual" aria-hidden="true">
          <HeroAnimationSlot />
        </div>
        <div className="hero-copy">
          <p className="hero-kicker">KARWA CHAUTH</p>
          <h1 id="hero-title">Chand Nikal Aaya</h1>
          <p className="hero-subtitle">May your bond shine as bright as the moon tonight</p>
        </div>
        <a className="hero-scroll" href="#collection">Explore the collection <span aria-hidden="true">↓</span></a>
        <p className="hero-note">A little tradition, a lot of love</p>
      </div>
    </section>
  )
}