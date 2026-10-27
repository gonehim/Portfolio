import { useEffect, useRef, useState } from 'react';

// A dot that tracks the pointer exactly, plus a ring that eases toward it
// (giving the trailing effect) and grows over links/buttons. Disabled on
// touch/coarse-pointer devices via the CSS media query below — there's no
// mouse to track there, and native cursor stays hidden only on fine pointers
// (see the matching `cursor: none` rule in index.css).
const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsFinePointer(query.matches);
    const onChange = () => setIsFinePointer(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let targetX = ringX;
    let targetY = ringY;
    let moved = false;
    let frame: number;

    const onMouseMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!moved) {
        moved = true;
        ringX = targetX;
        ringY = targetY;
        setHasMoved(true);
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${targetX}px, ${targetY}px)`;
      }
    };

    const onMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setIsHoveringInteractive(Boolean(target.closest('a, button, [role="button"]')));
    };

    const tick = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(frame);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <div aria-hidden="true">
      <div
        ref={dotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ${
          hasMoved ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 transition-[width,height,opacity] duration-200 ${
          isHoveringInteractive ? 'h-10 w-10 border-white/70' : 'h-6 w-6'
        } ${hasMoved ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

export default CustomCursor;
