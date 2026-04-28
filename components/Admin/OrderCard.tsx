'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { OrderWithItems, OrderStatus } from '@/types/database';
import { formatPrice } from '@/lib/utils';
import { useRelativeTime } from '@/lib/hooks/useRelativeTime';
import { IconPhone, IconCheck, IconMapPin, IconClock } from '../Icons';
import toast from 'react-hot-toast';

interface OrderCardProps {
  order: OrderWithItems;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => Promise<void>;
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; bg: string; dot: string }> = {
  nova: { label: 'Nova', bg: 'bg-gradient-to-r from-red-950 to-red-900/80', dot: 'bg-red-400 animate-pulse' },
  potvrđena: { label: 'Potvrđena', bg: 'bg-gradient-to-r from-orange-950 to-orange-900/60', dot: 'bg-orange-400' },
  u_dostavi: { label: 'U dostavi', bg: 'bg-gradient-to-r from-blue-950 to-blue-900/60', dot: 'bg-blue-400' },
  dostavljeno: { label: 'Dostavljeno', bg: 'bg-gradient-to-r from-green-950 to-green-900/60', dot: 'bg-green-400' },
  otkazano: { label: 'Otkazano', bg: 'bg-gradient-to-r from-zinc-900 to-zinc-800/60', dot: 'bg-zinc-500' },
};

const NEXT_STATUS: Partial<Record<OrderStatus, { next: OrderStatus; label: string; style: string }>> = {
  nova: { next: 'potvrđena', label: '✓ Potvrdi narudžbu', style: 'bg-gradient-to-r from-gold to-yellow-500 text-coal shadow-lg shadow-gold/20' },
  potvrđena: { next: 'u_dostavi', label: '🛵 Pošalji u dostavu', style: 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/20' },
  u_dostavi: { next: 'dostavljeno', label: '✓ Označi dostavljeno', style: 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-600/20' },
};

export default function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const [updating, setUpdating] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const relativeTime = useRelativeTime(order.created_at);
  const statusConfig = STATUS_CONFIG[order.status];
  const nextAction = NEXT_STATUS[order.status];
  const isDone = order.status === 'dostavljeno' || order.status === 'otkazano';

  const handleAdvance = async () => {
    if (!nextAction || updating) return;
    setUpdating(true);
    try { await onStatusChange(order.id, nextAction.next); }
    catch { toast.error('Greška'); }
    finally { setUpdating(false); }
  };

  const handleCancel = async () => {
    setUpdating(true);
    try { await onStatusChange(order.id, 'otkazano'); setShowCancel(false); }
    catch { toast.error('Greška'); }
    finally { setUpdating(false); }
  };

  return (
    <motion.div layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: isDone ? 0.45 : 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`overflow-hidden rounded-2xl border bg-coal-light ${order.status === 'nova' ? 'border-red-800/50 ring-1 ring-red-900/30' : 'border-line-dark'}`}>

      {/* Status header — gradient bar */}
      <div className={`flex items-center justify-between px-4 py-2.5 ${statusConfig.bg}`}>
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${statusConfig.dot}`} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">{statusConfig.label}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-white/40">
          <IconClock className="h-3 w-3" />
          {relativeTime}
        </div>
      </div>

      {/* Order number + total — prominent */}
      <div className="flex items-center justify-between border-b border-line-dark px-4 py-3">
        <span className="font-mono text-sm font-bold text-gold">{order.order_number}</span>
        <span className="font-display text-lg font-bold text-white">{formatPrice(order.total_amount)}</span>
      </div>

      {/* Customer info */}
      <div className="px-4 py-3 border-b border-line-dark">
        <p className="text-[15px] font-bold text-white">{order.customer_name}</p>

        <div className="mt-2.5 flex flex-wrap gap-2">
          {/* Telefon — veliki, klikabilan */}
          <a href={`tel:${order.customer_phone}`}
            className="inline-flex items-center gap-2 rounded-lg bg-ember/10 px-3.5 py-2 text-[13px] font-semibold text-ember-light ring-1 ring-ember/20 transition-all active:scale-95 active:bg-ember/20">
            <IconPhone className="h-4 w-4" />
            {order.customer_phone}
          </a>
          {/* Adresa */}
          <div className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.03] px-3 py-2 text-[12px] text-white/40 ring-1 ring-white/[0.06]">
            <IconMapPin className="h-3.5 w-3.5" />
            {order.delivery_address}, {order.delivery_city}
          </div>
        </div>
      </div>

      {/* Notes — istaknuto */}
      {order.notes && (
        <div className="border-b border-line-dark bg-gradient-to-r from-amber-950/30 to-transparent px-4 py-3">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 text-[14px]">📝</span>
            <p className="text-[12px] leading-relaxed text-amber-200/70">{order.notes}</p>
          </div>
        </div>
      )}

      {/* Items — čist prikaz */}
      <div className="px-4 py-3 border-b border-line-dark">
        <div className="space-y-1.5">
          {order.order_items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-white/[0.04] text-[10px] font-bold text-white/40">
                  {item.quantity}×
                </span>
                <span className="text-[12px] text-white/70">
                  {item.item_name}
                  {item.size && <span className="ml-1 text-white/30">({item.size})</span>}
                </span>
              </div>
              <span className="text-[12px] font-medium text-white/40">{formatPrice(item.item_price * item.quantity)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action area */}
      <div className="p-4">
        {nextAction && (
          <motion.button onClick={handleAdvance} disabled={updating}
            whileTap={{ scale: 0.96 }}
            className={`flex h-13 w-full items-center justify-center gap-2 rounded-xl text-[14px] font-bold transition-all disabled:opacity-40 ${nextAction.style}`}
            style={{ minHeight: '52px' }}>
            {updating ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-current/20 border-t-current" /> : nextAction.label}
          </motion.button>
        )}

        {isDone && (
          <div className="flex h-12 items-center justify-center rounded-xl bg-white/[0.03]">
            <span className={`flex items-center gap-2 text-[13px] font-semibold ${order.status === 'dostavljeno' ? 'text-green-400' : 'text-red-400/60'}`}>
              <IconCheck className="h-4 w-4" />
              {order.status === 'dostavljeno' ? 'Narudžba završena' : 'Narudžba otkazana'}
            </span>
          </div>
        )}

        {/* Otkaži */}
        {(order.status === 'nova' || order.status === 'potvrđena') && (
          <div className="mt-2.5 text-center">
            <AnimatePresence mode="wait">
              {showCancel ? (
                <motion.div key="confirm" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-3">
                  <button onClick={handleCancel} disabled={updating}
                    className="rounded-lg bg-red-600 px-5 py-2.5 text-[12px] font-bold text-white shadow-lg shadow-red-600/20 active:scale-95">
                    Da, otkaži
                  </button>
                  <button onClick={() => setShowCancel(false)}
                    className="px-4 py-2.5 text-[12px] font-medium text-white/30 active:text-white/50">Odustani</button>
                </motion.div>
              ) : (
                <motion.button key="cancel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setShowCancel(true)}
                  className="py-2 text-[11px] font-medium text-white/15 active:text-red-400/60">
                  Otkaži narudžbu
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}
