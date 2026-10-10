import { Component, Suspense, useEffect, useState } from 'react'
import { animationRegistry, defaultAnimationVariant } from './animationRegistry.js'
import './hero-animation-slot.css'

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = (event) => setReducedMotion(event.matches)
    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  return reducedMotion
}

function StaticPoster({ onReady, label = 'Moonlit celebration' }) {
  useEffect(() => onReady?.(), [onReady])

  return (
    <div className="hero-static-poster" role="img" aria-label={label}>
      <span className="poster-sieve" />
      <span className="poster-moon" />
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="hero-animation-fallback" role="status" aria-label="Loading celebration visual" />
  )
}

class AnimationErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <StaticPoster label="Celebration visual" onReady={this.props.onReady} />
    }

    return this.props.children
  }
}

/**
 * @param {import('./HeroAnimationProps').HeroAnimationProps & { variant?: string }} props
 */
export default function HeroAnimationSlot({
  variant = defaultAnimationVariant,
  className = '',
  autoplay = true,
  loop = true,
  onReady,
  onComplete,
}) {
  const reducedMotion = useReducedMotion()
  const [failedVariant, setFailedVariant] = useState(null)
  const Animation = animationRegistry[variant]
  const loadError = failedVariant === variant

  if (reducedMotion || !Animation || loadError) {
    return (
      <div className={`hero-animation-slot ${className}`}>
        <StaticPoster onReady={onReady} label={reducedMotion ? 'Static moonlit celebration' : 'Celebration visual'} />
      </div>
    )
  }

  return (
    <div className={`hero-animation-slot ${className}`}>
      <AnimationErrorBoundary key={variant} onReady={onReady}>
        <Suspense fallback={<LoadingFallback />}>
          <Animation
            className={className}
            autoplay={autoplay}
            loop={loop}
            reducedMotion={reducedMotion}
            onReady={onReady}
            onComplete={onComplete}
            onError={() => setFailedVariant(variant)}
          />
        </Suspense>
      </AnimationErrorBoundary>
    </div>
  )
}