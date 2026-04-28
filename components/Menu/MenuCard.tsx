'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MenuItem } from '@/types/database';
import { useCartStore } from '@/lib/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { getMenuItemImage } from '@/lib/menuImages';
import { IconPlus, IconCheck } from '../Icons';
import toast from 'react-hot-toast';

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

export default function MenuCard({ item, index }: MenuCardProps) {
  const [isJumbo, setIsJumbo] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const isPizza = item.category === 'pizza' && item.price_jumbo !== null;
  const currentPrice = isPizza && isJumbo ? item.price_jumbo! : item.price_regular;
  const isUnavailable = !item.is_available;
  const imageSrc = imgError
    ? 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=75&auto=format&fit=crop'
    : getMenuItemImage(item.category, item.sort_order);

  const handleAdd = () => {
    if (isUnavailable) return;
    addItem({
      menuItemId: item.id,
      name: isPizza && isJumbo ? `${item.name} (Jumbo)` : item.name,
      price: currentPrice,
      size: isPizza ? (isJumbo ? 'jumbo' : 'obična') : undefined,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 900);
    toast.success(`${item.name} dodano u košaricu`, { duration: 1800 });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-500 hover:shadow-[0_12px_48px_rgba(28,25,23,0.08)] ${isUnavailable ? 'pointer-events-none opacity-50 grayscale' : ''}`}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img src={imageSrc} alt={item.name} onError={() => setImgError(true)}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)' }} />

        {isPizza && (
          <div className="absolute bottom-3 left-3 flex overflow-hidden rounded-lg text-[10px] font-bold uppercase tracking-wider"
            style={{ border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
            <button onClick={(e) => { e.stopPropagation(); setIsJumbo(false); }}
              className={`px-3 py-2 transition-all ${!isJumbo ? 'bg-white text-black' : 'text-white/80'}`}
              aria-pressed={!isJumbo}>Obična</button>
            <button onClick={(e) => { e.stopPropagation(); setIsJumbo(true); }}
              className={`px-3 py-2 transition-all ${isJumbo ? 'bg-white text-black' : 'text-white/80'}`}
              aria-pressed={isJumbo}>Jumbo</button>
          </div>
        )}

        {isUnavailable && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(12,10,9,0.6)' }}>
            <span className="rounded-full bg-coal px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white">Nedostupno</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-sm font-bold leading-snug text-ink">{item.name}</h3>
        {item.description && (
          <p className="mt-1.5 line-clamp-2 flex-1 text-[11.5px] leading-relaxed text-ink-muted">{item.description}</p>
        )}

        <div className="mt-4 flex items-end justify-between">
          <AnimatePresence mode="popLayout">
            <motion.span key={currentPrice} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.2 }} className="inline-block font-display text-xl font-bold tracking-tight text-ember">
              {formatPrice(currentPrice)}
            </motion.span>
          </AnimatePresence>

          {!isUnavailable && (
            <motion.button onClick={handleAdd} whileTap={{ scale: 0.88 }}
              className={`flex h-10 items-center gap-2 rounded-xl px-4 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 ${
                justAdded ? 'bg-green-600' : 'bg-ink hover:bg-ember'
              }`}
              aria-label={`Dodaj ${item.name} u košaricu`}>
              <AnimatePresence mode="wait" initial={false}>
                {justAdded ? (
                  <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5">
                    <IconCheck className="h-3.5 w-3.5" /> Dodano
                  </motion.span>
                ) : (
                  <motion.span key="add" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5">
                    <IconPlus className="h-3.5 w-3.5" /> Dodaj
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
