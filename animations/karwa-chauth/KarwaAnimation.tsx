import { useEffect, useRef } from "react";
import "./karwa-component.css";

type AnimationController = {
  setProgress: (value: number) => void;
  destroy: () => void;
};

type KarwaAnimationProps = {
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  reducedMotion?: boolean;
  onReady?: () => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
};

function getProgress(element: HTMLElement) {
  const sectionTop = element.getBoundingClientRect().top + window.scrollY;
  const distance = Math.max(1, element.offsetHeight - window.innerHeight);
  return Math.max(0, Math.min(1, (window.scrollY - sectionTop) / distance));
}

export function KarwaAnimation({
  className = "",
  autoplay = true,
  loop = true,
  reducedMotion = false,
  onReady,
  onComplete,
  onError,
}: KarwaAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const completeRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.closest<HTMLElement>("[data-animation-scroll]");
    if (!section || !canvas || reducedMotion) return;

    let animation: AnimationController | null = null;
    let disposed = false;
    let frameRequest = 0;

    const sync = () => {
      if (frameRequest) return;
      frameRequest = requestAnimationFrame(() => {
        frameRequest = 0;
        const nextProgress = autoplay ? getProgress(section) : 0;
        animation?.setProgress(nextProgress);
        if (nextProgress < 1 && loop) completeRef.current = false;
        if (!completeRef.current && nextProgress >= 1) {
          completeRef.current = true;
          onComplete?.();
        }
      });
    };

    // Copy this whole folder to another project and import from './animation'.
    // The scene engine is local to this folder and does not depend on app-level paths.
    // @ts-ignore - the shared animation engine is plain JS by design.
    import("./src/main.js").then(({ createAnimation }) => {
      if (disposed) return;
      animation = createAnimation(canvas);
      onReady?.();
      sync();
    }).catch((error: Error) => {
      if (!disposed) onError?.(error);
    });

    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    window.addEventListener("orientationchange", sync);
    window.addEventListener("scrollend", sync, { passive: true });
    window.visualViewport?.addEventListener("resize", sync);
    sync();

    return () => {
      if (frameRequest) cancelAnimationFrame(frameRequest);
      disposed = true;
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      window.removeEventListener("orientationchange", sync);
      window.removeEventListener("scrollend", sync);
      window.visualViewport?.removeEventListener("resize", sync);
      animation?.destroy();
    };
  }, [autoplay, loop, onComplete, onError, onReady, reducedMotion]);

  return (
    <div className={`karwa-animation ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="karwa-animation-canvas" />
    </div>
  );
}
