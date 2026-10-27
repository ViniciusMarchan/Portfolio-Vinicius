import { useEffect } from 'react';

export default function useScrollReveal() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const elements = [...document.querySelectorAll('[data-reveal], .project-card, .technology-tile, .timeline article')];
    let observer;

    const reset = () => {
      observer?.disconnect();
      elements.forEach(element => element.classList.remove('reveal-pending'));
    };
    const configure = () => {
      reset();
      if (preference.matches || !('IntersectionObserver' in window)) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('revealed');
          entry.target.classList.remove('reveal-pending');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
      elements.forEach(element => {
        if (element.classList.contains('revealed')) return;
        element.classList.add('reveal-pending');
        observer.observe(element);
      });
    };

    configure();
    preference.addEventListener('change', configure);
    return () => { reset(); preference.removeEventListener('change', configure); };
  }, []);
}
