'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { IconMapPin, IconClock, IconScooter, IconCash } from './Icons';

const EASE = [0.22, 1, 0.36, 1] as const;

const INFO_CARDS = [
  { Icon: IconMapPin, label: 'Adresa', value: 'Matije Gupca 3', sub: 'Koška, Hrvatska' },
  { Icon: IconClock, label: 'Pon — Pet', value: '10:00 — 22:00', sub: 'Svaki radni dan' },
  { Icon: IconClock, label: 'Sub — Ned', value: '10:00 — 23:00', sub: 'Vikend' },
  { Icon: IconScooter, label: 'Dostava', value: 'Koška i okolica', sub: '~30 minuta' },
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="kontakt" ref={ref} className="bg-coal py-24 md:py-40" aria-label="Kontakt">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }}
          className="mb-16 text-center">
          <div className="mb-5 inline-flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <IconMapPin className="h-4 w-4 text-ember-light" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-ember-light">Kontakt</span>
          </div>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
            Pronađite nas
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Dođite osobno ili naručite dostavu. Uvijek smo tu za vas.
          </p>
        </motion.div>

        <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {INFO_CARDS.map((card, i) => (
            <motion.div key={card.label + card.value} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: EASE }}
              className="rounded-2xl border border-line-dark bg-coal-light p-5 transition-colors duration-300 hover:border-white/10">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <card.Icon className="h-5 w-5 text-white/40" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.25)' }}>{card.label}</p>
              <p className="mt-1.5 text-sm font-semibold text-white">{card.value}</p>
              <p className="mt-0.5 text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{card.sub}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
          className="mb-10 flex items-center justify-center gap-3 rounded-2xl border p-4"
          style={{ borderColor: 'rgba(196,56,10,0.15)', background: 'rgba(196,56,10,0.04)' }}>
          <IconCash className="h-5 w-5 text-ember-light" />
          <div>
            <p className="text-sm font-semibold text-white">Plaćanje pouzećem</p>
            <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>Gotovina pri dostavi</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3, ease: EASE }}>
          <div className="overflow-hidden rounded-2xl border border-line-dark" style={{ height: '420px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2793.5!2d18.2833!3d45.5167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDMxJzAwLjEiTiAxOMKwMTYnNTkuOSJF!5e0!3m2!1shr!2shr!4v1700000000000!5m2!1shr!2shr"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Lokacija Pizza Grill Caffe Hamby na karti" />
          </div>
        </motion.div>

        <p className="mt-6 text-center text-[10px] font-medium uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.1)' }}>OIB: 96051058778</p>
      </div>
    </section>
  );
}
