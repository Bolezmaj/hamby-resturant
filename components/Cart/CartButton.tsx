'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/store/cartStore';
import { springSnappy } from '@/lib/motion/springs';
import { IconBag } from '../Icons';

export default function CartButton() {
  const [mounted, setMounted] = useState(false);
  const total = useCartStore((s) => s.getTotalItems());
  const open = useCartStore((s) => s.openCart);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <motion.button onClick={open}
      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, ...springSnappy }} whileTap={{ scale: 0.9 }}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-2xl bg-coal px-5 py-3.5 text-sm font-bold text-white shadow-[0_8px_40px_rgba(12,10,9,0.5)] ring-1 ring-white/[0.06] transition-all duration-300 hover:shadow-[0_12px_48px_rgba(12,10,9,0.6)] md:hidden"
      aria-label={`Košarica — ${total} stavki`}>
      <IconBag className="h-5 w-5" />
      <AnimatePresence mode="popLayout">
        {total > 0 && (
          <motion.span key={total} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={springSnappy}
            className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-ember px-2 text-[11px] font-bold tabular-nums">
            {total}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
