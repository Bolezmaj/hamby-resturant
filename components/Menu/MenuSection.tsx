'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import type { MenuItem, MenuCategory } from '@/types/database';
import { IconGrill, IconChicken, IconPizza, IconSalad, IconFries, IconFlame } from '../Icons';
import MenuCard from './MenuCard';

interface MenuSectionProps {
  items: MenuItem[];
}

const CATEGORIES: { id: MenuCategory; label: string; Icon: typeof IconGrill }[] = [
  { id: 'rostilj', label: 'Roštilj', Icon: IconGrill },
  { id: 'panirano', label: 'Panirano', Icon: IconChicken },
  { id: 'pizza', label: 'Pizza', Icon: IconPizza },
  { id: 'salate', label: 'Salate', Icon: IconSalad },
  { id: 'prilozi', label: 'Prilozi', Icon: IconFries },
];

export default function MenuSection({ items }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('rostilj');
  const [direction, setDirection] = useState(0);
  const prevIndex = useRef(0);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });

  const filteredItems = items.filter((i) => i.category === activeCategory);

  const handleCategoryChange = (cat: MenuCategory) => {
    const newIndex = CATEGORIES.findIndex((c) => c.id === cat);
    setDirection(newIndex > prevIndex.current ? 1 : -1);
    prevIndex.current = newIndex;
    setActiveCategory(cat);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
  };

  return (
    <section id="jelovnik" ref={sectionRef} className="bg-bone-dark py-24 md:py-40" aria-label="Jelovnik">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center">
          <div className="mb-5 inline-flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ember/10">
              <IconFlame className="h-4 w-4 text-ember" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-ember">Jelovnik</span>
          </div>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl">
            Odaberite svoje omiljeno jelo
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-ink-muted">
            Svježe namirnice, tradicionalni recepti, poštene porcije.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-12 flex justify-center gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}
          role="tablist" aria-label="Kategorije jelovnika">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = items.filter((i) => i.category === cat.id).length;
            return (
              <button key={cat.id} role="tab" aria-selected={isActive} onClick={() => handleCategoryChange(cat.id)}
                className={`relative flex shrink-0 items-center gap-2.5 rounded-full px-5 py-3 text-[13px] font-semibold transition-all duration-300 ${
                  isActive ? 'bg-ink text-white shadow-lg' : 'border border-line bg-white text-ink-soft hover:text-ink'
                }`}>
                <cat.Icon className={`h-4 w-4 ${isActive ? 'text-ember-glow' : 'text-ink-muted'}`} />
                {cat.label}
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${isActive ? 'bg-white/15 text-white/60' : 'bg-bone-dark text-ink-muted'}`}>{count}</span>
              </button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={activeCategory} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item, index) => (
              <MenuCard key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {activeCategory === 'pizza' && (
          <p className="mt-10 text-center text-[12px] text-ink-muted">Sve pizze dostupne u Običnoj i Jumbo veličini.</p>
        )}
      </div>
    </section>
  );
}
