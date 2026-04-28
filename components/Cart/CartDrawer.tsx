'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { springPanel } from '@/lib/motion/springs';
import { IconBag, IconX } from './../../components/Icons';
import CheckoutForm from './CheckoutForm';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const [showCheckout, setShowCheckout] = useState(false);
  const total = getTotalPrice();
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);
  const handleClose = () => { closeCart(); setShowCheckout(false); };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            onClick={handleClose} className="fixed inset-0 z-50 bg-coal/70 backdrop-blur-md" aria-hidden="true" />

          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={springPanel}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-[440px] flex-col bg-coal shadow-[-20px_0_60px_rgba(0,0,0,0.5)]"
            role="dialog" aria-modal="true" aria-label="Košarica">

            {/* Header */}
            <div className="flex shrink-0 items-center justify-between px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ember/10 ring-1 ring-ember/15">
                  <IconBag className="h-4 w-4 text-ember-light" />
                </div>
                <div>
                  <h2 className="font-display text-base font-bold text-white">{showCheckout ? 'Narudžba' : 'Košarica'}</h2>
                  {!showCheckout && itemCount > 0 && (
                    <p className="text-[11px] text-white/30">{itemCount} {itemCount === 1 ? 'stavka' : itemCount < 5 ? 'stavke' : 'stavki'}</p>
                  )}
                </div>
              </div>
              <button onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-white/40 ring-1 ring-white/[0.06] transition-all hover:bg-white/[0.08] hover:text-white"
                aria-label="Zatvori košaricu">
                <IconX className="h-4 w-4" />
              </button>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            {showCheckout ? (
              <CheckoutForm onBack={() => setShowCheckout(false)} onClose={handleClose} />
            ) : (
              <>
                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4" data-lenis-prevent>
                  {items.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06]">
                        <IconBag className="h-7 w-7 text-white/15" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Košarica je prazna</p>
                        <p className="mt-1 text-[12px] text-white/30">Dodajte jela iz jelovnika</p>
                      </div>
                      <button onClick={handleClose}
                        className="mt-2 rounded-xl bg-white/[0.04] px-5 py-2.5 text-[13px] font-semibold text-white ring-1 ring-white/[0.08] transition-all hover:bg-white/[0.08]">
                        Pogledaj jelovnik
                      </button>
                    </div>
                  ) : (
                    <AnimatePresence initial={false}>
                      {items.map((item) => (
                        <motion.div key={`${item.menuItemId}-${item.size ?? 'default'}`}
                          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }} className="overflow-hidden">
                          <div className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-coal-light/50 p-3 mb-2">
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[13px] font-semibold text-white">{item.name}</p>
                              <p className="mt-0.5 text-[11px] text-white/30">{formatPrice(item.price)} / kom</p>
                            </div>
                            <div className="flex shrink-0 items-center gap-1.5">
                              <button onClick={() => updateQuantity(item.menuItemId, item.quantity - 1, item.size)}
                                className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.04] text-[13px] text-white/60 ring-1 ring-white/[0.06] transition-all hover:bg-white/[0.08]"
                                aria-label={`Smanji količinu za ${item.name}`}>−</button>
                              <span className="w-6 text-center text-[13px] font-bold tabular-nums text-white">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.menuItemId, item.quantity + 1, item.size)}
                                className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.04] text-[13px] text-white/60 ring-1 ring-white/[0.06] transition-all hover:bg-white/[0.08]"
                                aria-label={`Povećaj količinu za ${item.name}`}>+</button>
                            </div>
                            <div className="flex shrink-0 flex-col items-end gap-1">
                              <span className="text-[13px] font-bold text-ember-light">{formatPrice(item.price * item.quantity)}</span>
                              <button onClick={() => removeItem(item.menuItemId, item.size)}
                                className="text-[10px] text-white/20 transition-colors hover:text-red-400" aria-label={`Ukloni ${item.name}`}>Ukloni</button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                  <div className="shrink-0 px-6 pb-6 pt-4">
                    <div className="h-px mb-4 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm text-white/40">Ukupno</span>
                      <span className="font-display text-2xl font-bold text-white">{formatPrice(total)}</span>
                    </div>
                    <button onClick={() => setShowCheckout(true)}
                      className="flex h-13 w-full items-center justify-center rounded-xl bg-gradient-to-r from-ember to-ember-light text-[14px] font-bold text-white shadow-lg shadow-ember/20 transition-all duration-200 hover:shadow-xl hover:shadow-ember/30 active:scale-[0.97]"
                      style={{ minHeight: '52px' }}>
                      Nastavi na narudžbu →
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
