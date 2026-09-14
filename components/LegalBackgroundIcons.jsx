'use client';
import { useEffect, useRef } from 'react';

const sets = {
  hero: ['scales','contract','courthouse','gavel','book'],
  light: ['book','contract','signature','scales','stamp','shield'],
  services: ['gavel','courthouse','shield','document','family','briefcase'],
  dark: ['scales','courthouse','gavel','shield'],
  calculator: ['calculator','scales','document'],
  contact: ['contract','shield','signature','document'],
  minimal: ['scales','contract']
};
const limits = { low: 3, medium: 6, high: 9 };

function Motif({ name }) {
  const common = { fill:'none', stroke:'currentColor', strokeWidth:'1.25', strokeLinecap:'round', strokeLinejoin:'round' };
  const paths = {
    scales:<><path d="M24 8v38M12 48h24M17 54h14M8 16h32M12 16 5 31h14L12 16Zm24 0-7 15h14L36 16Z"/><path d="M5 31c2 6 12 6 14 0M29 31c2 6 12 6 14 0"/></>,
    gavel:<><path d="m13 16 13 13M22 10l12 12-8 8-12-12 8-8ZM9 36l19-19M25 33l18 18M38 46l-5 5M7 53h25"/></>,
    book:<><path d="M8 10h17c5 0 7 3 7 7v35c0-4-3-6-8-6H8V10Zm48 0H39c-5 0-7 3-7 7v35c0-4 3-6 8-6h16V10Z"/><path d="M14 19h11M14 26h11M39 19h11M39 26h11"/></>,
    contract:<><path d="M14 6h25l11 11v41H14V6Z"/><path d="M39 6v12h11M22 27h20M22 35h20M22 43h11M34 51c4-6 7 4 12-3"/></>,
    courthouse:<><path d="M5 22 32 7l27 15H5ZM9 53h46M5 59h54M14 25v25M25 25v25M39 25v25M50 25v25"/></>,
    shield:<><path d="M32 5 53 13v16c0 14-8 24-21 30C19 53 11 43 11 29V13l21-8Z"/><path d="m21 32 7 7 15-17"/></>,
    signature:<><path d="M7 47c8-2 12-8 17-20 2-5 5-11 8-9 5 3-8 28-3 29 4 1 8-13 11-12 3 1-2 11 2 12 3 1 7-8 10-6 2 1-1 5 5 6M8 55h49"/></>,
    stamp:<><path d="M22 8h20v12c0 5 8 8 8 17H14c0-9 8-12 8-17V8ZM10 39h44v9H10zM16 53h32"/></>,
    document:<><path d="M13 6h27l11 11v41H13V6Z"/><path d="M40 6v12h11M21 28h22M21 36h22M21 44h15"/></>,
    briefcase:<><path d="M7 20h50v34H7V20ZM23 20v-7h18v7M7 32c13 8 37 8 50 0M28 34h8v7h-8z"/></>,
    family:<><circle cx="22" cy="20" r="7"/><circle cx="43" cy="22" r="6"/><path d="M8 49c1-11 7-17 14-17s13 6 14 17M34 36c3-5 7-7 11-6 6 1 10 7 11 16"/></>,
    calculator:<><rect x="11" y="5" width="42" height="54" rx="3"/><path d="M18 12h28v10H18zM19 31h4M30 31h4M41 31h4M19 41h4M30 41h4M41 41h4M19 51h4M30 51h4M41 51h4"/></>,
  };
  return <svg viewBox="0 0 64 64" {...common}>{paths[name] || paths.scales}</svg>;
}

export default function LegalBackgroundIcons({ variant='light', density='medium', opacity, enableParallax=false, enablePointerMotion=false, iconSet }) {
  const rootRef = useRef(null);
  const icons = (iconSet || sets[variant] || sets.light).slice(0, limits[density] || 6);
  useEffect(() => {
    const root = rootRef.current;
    if (!root || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const desktop = matchMedia('(min-width: 901px)'); let frame=0;
    const scroll = () => { if (!enableParallax || !desktop.matches) return; cancelAnimationFrame(frame); frame=requestAnimationFrame(()=>{const rect=root.parentElement.getBoundingClientRect();const progress=Math.max(-1,Math.min(1,(innerHeight/2-rect.top-rect.height/2)/innerHeight));root.style.setProperty('--legal-scroll',`${progress*32}px`);}); };
    const pointer = e => { if (!enablePointerMotion || !desktop.matches) return; root.style.setProperty('--legal-pointer-x',`${(e.clientX/innerWidth-.5)*14}px`);root.style.setProperty('--legal-pointer-y',`${(e.clientY/innerHeight-.5)*12}px`); };
    scroll(); addEventListener('scroll',scroll,{passive:true}); addEventListener('pointermove',pointer,{passive:true});
    return ()=>{cancelAnimationFrame(frame);removeEventListener('scroll',scroll);removeEventListener('pointermove',pointer);};
  },[enableParallax,enablePointerMotion]);
  return <div ref={rootRef} className={`legal-bg-icons legal-bg-${variant}`} style={opacity?{'--legal-opacity':opacity}:undefined} aria-hidden="true">{icons.map((name,index)=><span className="legal-motif" data-index={index+1} key={`${name}-${index}`}><Motif name={name}/></span>)}</div>;
}
