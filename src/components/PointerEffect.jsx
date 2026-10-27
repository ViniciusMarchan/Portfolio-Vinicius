import { useEffect, useRef } from 'react';

export default function PointerEffect() {
  const effect = useRef(null);

  useEffect(() => {
    const preference = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const element = effect.current;
    let frame = 0;
    let x = 0;
    let y = 0;

    const hide = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      element.style.opacity = '0';
      document.documentElement.classList.remove('custom-pointer-active');
    };
    const move = event => {
      if (!preference.matches || event.pointerType !== 'mouse') return;
      x = event.clientX;
      y = event.clientY;
      element.dataset.interactive = Boolean(event.target.closest('a, button'));
      if (!frame) frame = requestAnimationFrame(() => {
        element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        element.style.opacity = '1';
        document.documentElement.classList.add('custom-pointer-active');
        frame = 0;
      });
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    preference.addEventListener('change', hide);
    return () => {
      hide();
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
      preference.removeEventListener('change', hide);
    };
  }, []);

  return <div ref={effect} className="pointer-effect" aria-hidden="true"><span/></div>;
}
