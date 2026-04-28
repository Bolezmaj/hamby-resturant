'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { IconFlame, IconLeaf, IconScooter, IconClock, IconMapPin } from './Icons';

const EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { Icon: IconFlame, value: '10+', label: 'Godina iskustva' },
  { Icon: IconLeaf, value: '45', label: 'Jela na meniju' },
  { Icon: IconScooter, value: '~30', label: 'Min dostava' },
];

const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80&auto=format&fit=crop', alt: 'Unutrašnjost restorana' },
  { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&auto=format&fit=crop', alt: 'Priprema hrane' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&auto=format&fit=crop', alt: 'Servirana jela' },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="o-nama" ref={sectionRef} className="relative overflow-hidden bg-bone py-24 md:py-40" aria-label="O nama">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }}
          className="mb-20 max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ember/10">
              <IconFlame className="h-4 w-4 text-ember" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-ember">O nama</span>
          </div>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl">
            Više od restorana.
            <span className="block text-ink-soft">Mjesto gdje se jede kako treba.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="lg:col-span-5">
            <div className="space-y-5 text-[15px] leading-[1.85] text-ink-soft">
              <p>Pizza Grill Caffe Hamby stoji na Matije Gupca 3 u Koški već više od deset godina. Roštilj gori svaki dan od jutra. Pizza se peče u tradicionalnoj peći.</p>
              <p>Namirnice su svježe, porcije poštene, a cijene fer. Nismo fancy. Nismo fusion. Radimo ono što znamo — i radimo to dobro.</p>
            </div>

            <div className="mt-12 space-y-3">
              {STATS.map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: EASE }}
                  className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-bone-dark">
                    <stat.Icon className="h-5 w-5 text-ember" />
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-ink">{stat.value}</p>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-ink-muted">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.65, ease: EASE }}
              className="mt-4 rounded-2xl border border-line bg-white p-5">
              <div className="mb-4 flex items-center gap-2.5">
                <IconClock className="h-4 w-4 text-ink-muted" />
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">Radno vrijeme</h3>
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between"><span className="text-ink-soft">Ponedjeljak — Petak</span><span className="font-semibold text-ink">10:00 — 22:00</span></div>
                <div className="flex justify-between"><span className="text-ink-soft">Subota — Nedjelja</span><span className="font-semibold text-ink">10:00 — 23:00</span></div>
              </div>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-3">
              <motion.div style={{ y: imgY }} className="space-y-3">
                <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                  className="aspect-[3/4] overflow-hidden rounded-2xl">
                  <img src={GALLERY[0].src} alt={GALLERY[0].alt} className="h-full w-full object-cover" loading="lazy" />
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
                  className="aspect-square overflow-hidden rounded-2xl">
                  <img src={GALLERY[2].src} alt={GALLERY[2].alt} className="h-full w-full object-cover" loading="lazy" />
                </motion.div>
              </motion.div>
              <div className="mt-12 space-y-3">
                <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                  className="aspect-[4/5] overflow-hidden rounded-2xl">
                  <img src={GALLERY[1].src} alt={GALLERY[1].alt} className="h-full w-full object-cover" loading="lazy" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
                  className="rounded-2xl bg-coal p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <IconMapPin className="h-5 w-5 text-ember-light" />
                  </div>
                  <p className="font-display text-lg font-bold text-white">Matije Gupca 3</p>
                  <p className="mt-0.5 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Koška, Hrvatska</p>
                  <p className="mt-3 text-[10px] font-medium uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.2)' }}>OIB: 96051058778</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
