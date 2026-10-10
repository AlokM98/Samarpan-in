import { lazy } from 'react'

export const animationRegistry = {
  'karwa-chauth': lazy(() => import('../../../animations/karwa-chauth/KarwaAnimation.tsx').then(({ KarwaAnimation }) => ({ default: KarwaAnimation }))),
}

export const defaultAnimationVariant = 'karwa-chauth'