export interface HeroAnimationProps {
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  reducedMotion?: boolean;
  onReady?: () => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}