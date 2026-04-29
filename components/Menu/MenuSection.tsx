'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import type { MenuItem, MenuCategory } from '@/types/database';
import { IconGrill, IconChicken, IconPizza, IconSalad, IconFries } from '../Icons';
import MenuCard from './MenuCard';

interface MenuSectionProps { items: MenuItem[]; }

const CATS: { id: MenuCategory; label: string; Icon: typeof IconGrill }[] = [
  { id: 'rostilj', label: 'Roštilj', Icon: IconGrill },
  { id: 'panirano', label: 'Panirano', Icon: IconChicken },
  { id: 'pizza', label: 'Pizza', Icon: IconPizza },
  { id: 'salate', label: 'Salate', Icon: IconSalad },
  { id: 'prilozi', label: 'Prilozi', Icon: IconFries },
];

export default function MenuSection({ items }: MenuSectionProps) {
  const [active, setActive] = useState<MenuCategory>('rostilj');
  const [dir, setDir] = useState(0);
  const prevIdx = useRef(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const filtered = items.filter((i) => i.category === active);

  const change = (cat: MenuCategory) => {
    const idx = CATS.findIndex((c) => c.id === cat);
    setDir(idx > prevIdx.current ? 1 : -1);
    prevIdx.current = idx;
    setActive(cat);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
    exit: (d: number) => ({ x: d > 0 ? -50 : 50, opacity: 0, transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
  };

  return (
    <section id="jelovnik" ref={ref} className="bg-bone-dark py-20 md:py-32" aria-label="Jelovnik">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-ember" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ember">Jelovnik</span>
          </div>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold leading-tight text-ink" style={{ letterSpacing: '-0.01em' }}>
            Odaberite jelo.
          </h2>
        </motion.div>

        {/* Kategorije */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}
          role="tablist" aria-label="Kategorije jelovnika">
          {CATS.map((cat) => {
            const isActive = active === cat.id;
            const count = items.filter((i) => i.category === cat.id).length;
            return (
              <button key={cat.id} role="tab" aria-selected={isActive} onClick={() => change(cat.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-all duration-250 ${
                  isActive
                    ? 'bg-ink text-white'
                    : 'border border-line bg-white text-ink-soft hover:border-ink/20 hover:text-ink'
                }`}>
                <cat.Icon className={`h-4 w-4 ${isActive ? 'text-ember-glow' : 'text-ink-muted'}`} />
                {cat.label}
                <span className={`text-[10px] font-bold ${isActive ? 'text-white/40' : 'text-ink-muted'}`}>{count}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={active} custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
            className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
            {filtered.map((item, i) => <MenuCard key={item.id} item={item} index={i} />)}
          </motion.div>
        </AnimatePresence>

        {active === 'pizza' && (
          <p className="mt-8 text-center text-[12px] text-ink-muted">Sve pizze dostupne u Običnoj i Jumbo veličini.</p>
        )}
      </div>
    </section>
  );
}
