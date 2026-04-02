import { useEffect, useState } from "react";

export const useAnimatedCounter = (
  target: number,
  isInView: boolean,
  duration = 2000,
  decimals = 0,
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString();
};
