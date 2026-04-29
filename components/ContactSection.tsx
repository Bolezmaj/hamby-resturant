'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { IconMapPin, IconClock, IconScooter, IconCash } from './Icons';

const E = [0.22, 1, 0.36, 1] as const;

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="kontakt" ref={ref} className="bg-coal py-20 md:py-32" aria-label="Kontakt">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: E }}
          className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-ember-light" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ember-light">Kontakt</span>
          </div>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold leading-tight text-white" style={{ letterSpacing: '-0.01em' }}>
            Pronađite nas.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1, ease: E }}
            className="space-y-3">
            {[
              { Icon: IconMapPin, label: 'Adresa', value: 'Matije Gupca 3, Koška' },
              { Icon: IconClock, label: 'Pon–Pet', value: '10:00 — 22:00' },
              { Icon: IconClock, label: 'Sub–Ned', value: '10:00 — 23:00' },
              { Icon: IconScooter, label: 'Dostava', value: 'Koška i okolica · ~30 min' },
              { Icon: IconCash, label: 'Plaćanje', value: 'Pouzećem (gotovina)' },
            ].map((row, i) => (
              <motion.div key={row.label} initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.06, ease: E }}
                className="flex items-center gap-4 rounded-xl border border-line-dark bg-coal-light px-4 py-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <row.Icon className="h-4 w-4 text-white/30" />
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white/25">{row.label}</span>
                  <span className="text-[13px] font-semibold text-white">{row.value}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Karta */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2, ease: E }}>
            <div className="overflow-hidden rounded-2xl border border-line-dark" style={{ height: '380px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2793.5!2d18.2833!3d45.5167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDMxJzAwLjEiTiAxOMKwMTYnNTkuOSJF!5e0!3m2!1shr!2shr!4v1700000000000!5m2!1shr!2shr"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Lokacija Pizza Grill Caffe Hamby" />
            </div>
            <p className="mt-3 text-center text-[10px] uppercase tracking-wider text-white/10">OIB: 96051058778</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
