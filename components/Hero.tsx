'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconFlame, IconArrowRight, IconScooter, IconClock, IconCash } from './Icons';

const EASE = [0.22, 1, 0.36, 1] as const;

const FOOD_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&q=80&auto=format&fit=crop', label: 'Roštilj' },
  { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80&auto=format&fit=crop', label: 'Pizza' },
  { src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80&auto=format&fit=crop', label: 'Burgeri' },
  { src: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=500&q=80&auto=format&fit=crop', label: 'Panirano' },
];

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (parallaxRef.current) {
          parallaxRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.25}px, 0)`;
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="pocetna" className="relative min-h-[100svh] overflow-hidden bg-coal" aria-label="Dobrodošlica">
      <div ref={parallaxRef} style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
        <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=85&auto=format&fit=crop"
          alt="" aria-hidden="true" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
          loading="eager" fetchPriority="high" />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,10,9,0.55)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(12,10,9,0.2) 0%, transparent 40%, rgba(12,10,9,0.85) 100%)' }} />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-between px-5 pb-8 pt-24 lg:px-8">
        <div className="flex flex-1 flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            className="mb-7 inline-flex w-fit items-center gap-2.5 rounded-full px-4 py-2"
            style={{ border: '1px solid rgba(196,56,10,0.25)', background: 'rgba(196,56,10,0.08)' }}>
            <IconFlame className="h-3.5 w-3.5 text-ember-glow" />
            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#FF6B35' }}>Dostava aktivna</span>
            <span style={{ height: '12px', width: '1px', background: 'rgba(196,56,10,0.25)' }} />
            <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}>Koška i okolica</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            className="font-display max-w-3xl text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Roštilj i pizza
            <span className="block text-ember-light">iz srca Slavonije.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
            className="mt-6 max-w-md text-[15px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Svježe pripremljeno svaki dan od jutra. Tradicionalni recepti, poštene porcije, dostava do vaših vrata.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-3">
            <button onClick={() => scrollTo('jelovnik')}
              className="group flex items-center gap-3 rounded-full bg-ember px-6 py-3.5 text-[13px] font-bold tracking-wide text-white transition-all duration-300 hover:scale-[1.03] md:px-8 md:py-4"
              style={{ boxShadow: '0 4px 48px rgba(196,56,10,0.3)' }}>
              Pogledaj jelovnik
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
            <button onClick={() => scrollTo('kontakt')}
              className="rounded-full px-6 py-3.5 text-[13px] font-semibold transition-all duration-300 hover:text-white md:px-8 md:py-4"
              style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}>
              Kontakt
            </button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          className="mt-10 shrink-0">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:gap-3">
            {FOOD_IMAGES.map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 + i * 0.08, ease: EASE }}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl" style={{ aspectRatio: '4/3' }}>
                <img src={img.src} alt={img.label} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="eager" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,10,9,0.7) 0%, transparent 60%)' }} />
                <span className="absolute bottom-2 left-2.5 text-[10px] font-semibold uppercase tracking-wider sm:bottom-3 sm:left-4 sm:text-[11px]" style={{ color: 'rgba(255,255,255,0.7)' }}>{img.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-4 text-[11px]"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)' }}>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><IconClock className="h-3.5 w-3.5" />Pon–Pet 10–22h · Vik 10–23h</span>
              <span className="hidden items-center gap-1.5 sm:flex"><IconScooter className="h-3.5 w-3.5" />~30 min</span>
            </div>
            <span className="flex items-center gap-1.5"><IconCash className="h-3.5 w-3.5" />Pouzećem</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
