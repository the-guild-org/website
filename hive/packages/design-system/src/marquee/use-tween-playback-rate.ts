import { useRef } from "react";

export function useTweenPlaybackRate() {
  const slowingHandle = useRef<number | null>(null);
  const resumingHandle = useRef<number | null>(null);
  const time = useRef<number | null>(null);

  return function tweenPlaybackRate(animation: Animation, step: number) {
    const currentHandle = step > 0 ? resumingHandle : slowingHandle;
    const oppositeHandle = step > 0 ? slowingHandle : resumingHandle;

    if (oppositeHandle.current) {
      cancelAnimationFrame(oppositeHandle.current);
      oppositeHandle.current = time.current = null;
    }

    const now = performance.now();

    if (time.current) {
      const deltaTime = now - time.current;
      const { playbackRate } = animation;

      const newValue = Math.min(
        Math.max(playbackRate + step * deltaTime, 0),
        1,
      );
      if (newValue === playbackRate) return;

      animation.updatePlaybackRate(newValue);
    }

    time.current = now;
    currentHandle.current = requestAnimationFrame(() =>
      tweenPlaybackRate(animation, step),
    );
  };
}
