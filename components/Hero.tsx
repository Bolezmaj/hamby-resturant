'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconArrowRight, IconClock, IconScooter } from './Icons';

const E = [0.22, 1, 0.36, 1] as const;

const SHOTS = [
  { src: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&q=85&auto=format&fit=crop', label: 'Ćevapi' },
  { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=85&auto=format&fit=crop', label: 'Pizza' },
  { src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=85&auto=format&fit=crop', label: 'Burger' },
  { src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=85&auto=format&fit=crop', label: 'Roštilj' },
];

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (bgRef.current) bgRef.current.style.transform = `translate3d(0,${window.scrollY * 0.22}px,0)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="pocetna" className="relative min-h-[100svh] overflow-hidden bg-coal" aria-label="Dobrodošlica">
      {/* BG */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80&auto=format&fit=crop"
          alt="" aria-hidden="true" className="h-full w-full object-cover" style={{ opacity: 0.28 }}
          loading="eager" fetchPriority="high" />
      </div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(12,10,9,0.6) 0%, rgba(12,10,9,0.4) 50%, rgba(12,10,9,0.92) 100%)' }} />

      {/* Sadržaj */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-between px-5 pb-8 pt-24 lg:px-8">

        {/* Gornji dio — tekst */}
        <div className="flex flex-1 flex-col justify-center">
          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15, ease: E }}
            className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-ember-glow" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ember-glow">Koška · Slavonija</span>
          </motion.div>

          {/* Naslov — serif za karakter */}
          <motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.28, ease: E }}
            className="font-serif max-w-2xl font-bold text-white"
            style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5.2rem)', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
            Pravi roštilj.<br />
            <em className="not-italic" style={{ color: '#E8440A' }}>Prava pizza.</em><br />
            <span className="font-normal" style={{ fontSize: '0.55em', color: 'rgba(255,255,255,0.35)', letterSpacing: '0' }}>
              Svježe, svaki dan, od 10 ujutro.
            </span>
          </motion.h1>

          {/* Opis */}
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.48, ease: E }}
            className="mt-7 max-w-sm text-[15px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Matije Gupca 3, Koška. Dostava na kućnu adresu. Plaćanje pouzećem.
          </motion.p>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.62, ease: E }}
            className="mt-9 flex flex-wrap items-center gap-3">
            <button onClick={() => go('jelovnik')}
              className="group flex items-center gap-3 rounded-full bg-ember px-7 py-4 text-[13px] font-bold text-white transition-all duration-300 active:scale-[0.96]"
              style={{ boxShadow: '0 0 0 0 rgba(196,56,10,0)', transition: 'box-shadow 0.3s, transform 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 40px rgba(196,56,10,0.4)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 0 rgba(196,56,10,0)')}>
              Naruči odmah
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button onClick={() => go('o-nama')}
              className="rounded-full px-7 py-4 text-[13px] font-medium transition-all duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.55)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.25)'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.55)'; }}>
              O nama
            </button>
          </motion.div>

          {/* Info pills */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.85, ease: E }}
            className="mt-10 flex flex-wrap items-center gap-3">
            {[
              { Icon: IconClock, text: 'Pon–Pet 10–22h · Vik 10–23h' },
              { Icon: IconScooter, text: 'Dostava ~30 min' },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] font-medium"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.35)' }}>
                <Icon className="h-3.5 w-3.5" />
                {text}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Donji dio — foto grid */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.95, ease: E }}
          className="mt-10 shrink-0">
          <div className="grid grid-cols-4 gap-2 md:gap-2.5">
            {SHOTS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.05 + i * 0.07, ease: E }}
                className="group relative overflow-hidden rounded-xl" style={{ aspectRatio: '3/4' }}>
                <img src={s.src} alt={s.label} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]" loading="eager" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(12,10,9,0.75) 0%, transparent 55%)' }} />
                <span className="absolute bottom-2.5 left-3 text-[10px] font-bold uppercase tracking-wider text-white/70">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
