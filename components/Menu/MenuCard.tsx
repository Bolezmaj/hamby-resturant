'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MenuItem } from '@/types/database';
import { useCartStore } from '@/lib/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { getMenuItemImage } from '@/lib/menuImages';
import { IconPlus, IconCheck } from '../Icons';
import toast from 'react-hot-toast';

export default function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const [isJumbo, setIsJumbo] = useState(false);
  const [added, setAdded] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const isPizza = item.category === 'pizza' && item.price_jumbo !== null;
  const price = isPizza && isJumbo ? item.price_jumbo! : item.price_regular;
  const unavailable = !item.is_available;
  const img = imgErr ? 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=75&auto=format&fit=crop'
    : getMenuItemImage(item.category, item.sort_order);

  const add = () => {
    if (unavailable) return;
    addItem({ menuItemId: item.id, name: isPizza && isJumbo ? `${item.name} (Jumbo)` : item.name, price, size: isPizza ? (isJumbo ? 'jumbo' : 'obična') : undefined });
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
    toast.success(`${item.name} dodano`, { duration: 1600 });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.035, 0.28), ease: [0.22, 1, 0.36, 1] }}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-400 ${
        unavailable ? 'pointer-events-none opacity-45 grayscale' : 'hover:shadow-[0_8px_32px_rgba(26,22,20,0.1)] hover:-translate-y-0.5'
      }`}
    >
      {/* Slika */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img src={img} alt={item.name} onError={() => setImgErr(true)}
          className="h-full w-full object-cover transition-transform duration-600 group-hover:scale-[1.04]" loading="lazy" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 45%)' }} />

        {/* Pizza toggle */}
        {isPizza && (
          <div className="absolute bottom-2.5 left-2.5 flex overflow-hidden rounded-lg text-[10px] font-bold uppercase tracking-wide"
            style={{ background: 'rgba(12,10,9,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <button onClick={(e) => { e.stopPropagation(); setIsJumbo(false); }}
              className={`px-2.5 py-1.5 transition-all ${!isJumbo ? 'bg-white text-coal' : 'text-white/70'}`}
              aria-pressed={!isJumbo}>Obična</button>
            <button onClick={(e) => { e.stopPropagation(); setIsJumbo(true); }}
              className={`px-2.5 py-1.5 transition-all ${isJumbo ? 'bg-white text-coal' : 'text-white/70'}`}
              aria-pressed={isJumbo}>Jumbo</button>
          </div>
        )}

        {unavailable && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(12,10,9,0.55)' }}>
            <span className="rounded-full bg-coal px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white">Nedostupno</span>
          </div>
        )}
      </div>

      {/* Sadržaj */}
      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="font-display text-[13px] font-bold leading-snug text-ink">{item.name}</h3>
        {item.description && (
          <p className="mt-1 line-clamp-2 flex-1 text-[11px] leading-relaxed text-ink-muted">{item.description}</p>
        )}

        <div className="mt-3.5 flex items-center justify-between gap-2">
          <AnimatePresence mode="popLayout">
            <motion.span key={price} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 6, opacity: 0 }}
              transition={{ duration: 0.18 }} className="font-serif text-lg font-bold text-ember" style={{ letterSpacing: '-0.01em' }}>
              {formatPrice(price)}
            </motion.span>
          </AnimatePresence>

          {!unavailable && (
            <motion.button onClick={add} whileTap={{ scale: 0.86 }}
              className={`flex h-9 items-center gap-1.5 rounded-xl px-3.5 text-[11px] font-bold uppercase tracking-wide text-white transition-all duration-250 ${
                added ? 'bg-green-600' : 'bg-ink hover:bg-ember'
              }`}
              aria-label={`Dodaj ${item.name} u košaricu`}>
              <AnimatePresence mode="wait" initial={false}>
                {added ? (
                  <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1">
                    <IconCheck className="h-3 w-3" /> Ok
                  </motion.span>
                ) : (
                  <motion.span key="add" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1">
                    <IconPlus className="h-3 w-3" /> Dodaj
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
