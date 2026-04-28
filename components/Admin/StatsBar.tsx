'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { formatPrice } from '@/lib/utils';
import type { TodayStats } from '@/types/database';

interface StatsBarProps {
  stats: TodayStats;
}

function AnimatedNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);
  useEffect(() => {
    const from = prevRef.current;
    prevRef.current = value;
    if (from === value) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 500, 1);
      setDisplay(from + (value - from) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);
  return <>{format(display)}</>;
}

const TILES = [
  { key: 'orders_count' as const, label: 'Narudžbe danas', format: (n: number) => Math.round(n).toString(), gradient: 'from-gold/20 to-gold/5', color: 'text-gold', ring: 'ring-gold/10' },
  { key: 'total_revenue' as const, label: 'Ukupni prihod', format: (n: number) => formatPrice(n), gradient: 'from-green-500/15 to-green-500/5', color: 'text-green-400', ring: 'ring-green-500/10' },
  { key: 'pending_count' as const, label: 'Na čekanju', format: (n: number) => Math.round(n).toString(), gradient: 'from-orange-500/15 to-orange-500/5', color: 'text-orange-400', ring: 'ring-orange-500/10' },
  { key: 'avg_order_value' as const, label: 'Prosječna', format: (n: number) => formatPrice(n), gradient: 'from-blue-500/15 to-blue-500/5', color: 'text-blue-400', ring: 'ring-blue-500/10' },
];

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
      {TILES.map((tile, i) => (
        <motion.div key={tile.key}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.04 }}
          className={`rounded-xl bg-gradient-to-br ${tile.gradient} p-3.5 ring-1 ${tile.ring} sm:p-4`}>
          <p className="text-[9px] font-bold uppercase tracking-wider text-white/30 sm:text-[10px]">{tile.label}</p>
          <p className={`mt-1.5 font-display text-xl font-bold tracking-tight sm:text-2xl ${tile.color}`}>
            <AnimatedNumber value={stats[tile.key]} format={tile.format} />
          </p>
        </motion.div>
      ))}
    </div>
  );
}
