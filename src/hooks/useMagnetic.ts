import { useEffect, useRef } from 'react';

// Attach to any element's ref to make it "magnetic" — it nudges toward the
// cursor within its own bounds on hover and springs back on mouseleave.
// No-op on touch/coarse-pointer devices (there's nothing to attract toward).
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    const onMouseMove = (event: MouseEvent) => {
      const bounds = node.getBoundingClientRect();
      const x = event.clientX - (bounds.left + bounds.width / 2);
      const y = event.clientY - (bounds.top + bounds.height / 2);
      node.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };

    const onMouseLeave = () => {
      node.style.transform = 'translate(0, 0)';
    };

    node.addEventListener('mousemove', onMouseMove);
    node.addEventListener('mouseleave', onMouseLeave);
    return () => {
      node.removeEventListener('mousemove', onMouseMove);
      node.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [strength]);

  return ref;
}
