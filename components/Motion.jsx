'use client';

import { useEffect } from 'react';

export default function Motion() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer;
    const clear = () => {
      observer?.disconnect();
      document.querySelectorAll('.reveal-pending').forEach(node => node.classList.remove('reveal-pending'));
    };
    const setup = () => {
      clear();
      if (preference.matches || !('IntersectionObserver' in window)) return;
      observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending');
          observer.unobserve(entry.target);
        }
      }), { threshold: 0.08 });
      document.querySelectorAll('.trust-inner, .about-image-wrapper, .about-text-content, .section-header, .practice-list article, .commitment-copy, .calc-box, .doc-card, .home-journal article, .contact-info-panel, .contact-form-panel, .process-step').forEach((node, index) => {
        if (node.getBoundingClientRect().top < window.innerHeight) return;
        node.style.setProperty('--reveal-delay', `${index % 3 * 90}ms`);
        node.classList.add('reveal-item', 'reveal-pending');
        observer.observe(node);
      });
    };
    setup();
    preference.addEventListener('change', setup);
    return () => { clear(); preference.removeEventListener('change', setup); };
  }, []);
  return null;
}
