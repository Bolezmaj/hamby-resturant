'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { IconClock, IconMapPin } from './Icons';

const E = [0.22, 1, 0.36, 1] as const;

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="o-nama" ref={ref} className="bg-bone py-20 md:py-32" aria-label="O nama">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">

        {/* Eyebrow */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, ease: E }}
          className="mb-10 flex items-center gap-3">
          <div className="h-px w-8 bg-ember" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ember">O nama</span>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Lijevo — tekst */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: E }}>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.08] text-ink" style={{ letterSpacing: '-0.01em' }}>
              Više od deset godina<br />
              <em className="not-italic text-ink-soft">hranimo Koška.</em>
            </h2>

            <div className="mt-8 space-y-4 text-[15px] leading-[1.8] text-ink-soft">
              <p>Roštilj gori svaki dan od jutra. Pizza se peče u tradicionalnoj peći. Namirnice su svježe, porcije poštene, a cijene fer.</p>
              <p>Nismo fancy. Nismo fusion. Radimo ono što znamo — i radimo to dobro. Matije Gupca 3, Koška.</p>
            </div>

            {/* Statistike — horizontalno */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { n: '10+', l: 'godina' },
                { n: '45', l: 'jela' },
                { n: '~30', l: 'min dostava' },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-line bg-white p-4 text-center">
                  <p className="font-serif text-2xl font-bold text-ember">{s.n}</p>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-ink-muted">{s.l}</p>
                </div>
              ))}
            </div>

            {/* Radno vrijeme */}
            <div className="mt-4 rounded-2xl border border-line bg-white p-5">
              <div className="mb-3 flex items-center gap-2">
                <IconClock className="h-4 w-4 text-ink-muted" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">Radno vrijeme</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-soft">Ponedjeljak — Petak</span>
                  <span className="font-semibold text-ink">10:00 — 22:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-soft">Subota — Nedjelja</span>
                  <span className="font-semibold text-ink">10:00 — 23:00</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Desno — slike */}
          <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2, ease: E }}
            className="grid grid-cols-2 gap-3">
            <div className="space-y-3">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl">
                <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80&auto=format&fit=crop"
                  alt="Unutrašnjost restorana Hamby" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="aspect-square overflow-hidden rounded-2xl">
                <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&auto=format&fit=crop"
                  alt="Servirana jela" className="h-full w-full object-cover" loading="lazy" />
              </div>
            </div>
            <div className="mt-10 space-y-3">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&auto=format&fit=crop"
                  alt="Priprema hrane" className="h-full w-full object-cover" loading="lazy" />
              </div>
              {/* Adresa kartica */}
              <div className="rounded-2xl bg-coal p-5">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <IconMapPin className="h-4 w-4 text-ember-light" />
                </div>
                <p className="font-serif text-base font-bold text-white">Matije Gupca 3</p>
                <p className="mt-0.5 text-[12px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Koška, Hrvatska</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
