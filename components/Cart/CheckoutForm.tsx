'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/store/cartStore';
import { formatPrice } from '@/lib/utils';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import { IconCheck, IconCash } from '../Icons';

interface CheckoutFormProps {
  onBack: () => void;
  onClose: () => void;
}

interface FormData {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryCity: string;
  notes: string;
}

interface FormErrors {
  customerName?: string;
  customerPhone?: string;
  deliveryAddress?: string;
  deliveryCity?: string;
}

/** Validira hrvatski broj telefona */
function validatePhone(phone: string): string | undefined {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  if (!cleaned) return 'Broj telefona je obavezan';
  // Prihvaća: 09x xxx xxxx, +385 9x xxx xxxx, 385 9x xxx xxxx
  const hrRegex = /^(\+?385|0)(9[1-9]|[1-5]\d)\d{6,7}$/;
  if (!hrRegex.test(cleaned)) {
    return 'Unesite ispravan hrvatski broj (npr. 091 234 5678)';
  }
  return undefined;
}

export default function CheckoutForm({ onBack, onClose }: CheckoutFormProps) {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{
    orderNumber: string;
    name: string;
    phone: string;
  } | null>(null);

  const [form, setForm] = useState<FormData>({
    customerName: '',
    customerPhone: '',
    deliveryAddress: '',
    deliveryCity: 'Koška',
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const updateField = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.customerName.trim() || form.customerName.trim().length < 3) {
      newErrors.customerName = 'Unesite ime i prezime (min. 3 znaka)';
    }

    const phoneError = validatePhone(form.customerPhone);
    if (phoneError) newErrors.customerPhone = phoneError;

    if (!form.deliveryAddress.trim() || form.deliveryAddress.trim().length < 5) {
      newErrors.deliveryAddress = 'Unesite ulicu i kućni broj (min. 5 znakova)';
    }

    if (!form.deliveryCity.trim() || form.deliveryCity.trim().length < 2) {
      newErrors.deliveryCity = 'Unesite naziv grada';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          items: items
            .filter((i) => i.menuItemId)
            .map((i) => ({
              menuItemId: i.menuItemId,
              itemName: i.name,
              itemPrice: i.price,
              quantity: i.quantity,
              size: i.size || null,
            })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Greška pri slanju narudžbe');
        console.error('Order error:', data);
        setLoading(false);
        return;
      }

      clearCart();
      setSuccess({
        orderNumber: data.orderNumber,
        name: form.customerName,
        phone: form.customerPhone,
      });

      const end = Date.now() + 2500;
      const fire = () => {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#C4380A', '#E8440A', '#FF6B35'] });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#C4380A', '#E8440A', '#FF6B35'] });
        if (Date.now() < end) requestAnimationFrame(fire);
      };
      fire();
    } catch {
      toast.error('Greška pri slanju narudžbe. Pokušajte ponovo.');
    } finally {
      setLoading(false);
    }
  };

  // Uspjeh
  if (success) {
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="flex flex-1 flex-col items-center justify-center p-8 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15 ring-1 ring-green-500/30">
          <IconCheck className="h-8 w-8 text-green-400" />
        </motion.div>
        <h3 className="font-display mb-2 text-2xl font-bold text-white">Hvala, {success.name}!</h3>
        <p className="mb-4 text-sm text-white/50">
          Nazvat ćemo vas na <span className="font-medium text-white">{success.phone}</span> za potvrdu.
        </p>
        <div className="mb-8 rounded-lg bg-ember/10 px-4 py-2 font-mono text-sm text-ember-light ring-1 ring-ember/20">
          {success.orderNumber}
        </div>
        <button onClick={onClose} className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ember-light">
          Zatvori
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col" noValidate>
      {/* Scrollable sadržaj */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4" data-lenis-prevent>
        {/* Pregled narudžbe — kompaktan */}
        <div className="mb-5 rounded-xl border border-line-dark bg-coal-mid p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/30">Narudžba</span>
            <span className="text-sm font-bold text-ember-light">{formatPrice(getTotalPrice())}</span>
          </div>
          <div className="space-y-1">
            {items.map((i) => (
              <div key={`${i.menuItemId}-${i.size ?? 'd'}`} className="flex justify-between text-[12px]">
                <span className="text-white/45">{i.name} × {i.quantity}</span>
                <span className="text-white/45">{formatPrice(i.price * i.quantity)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Forma */}
        <div className="space-y-3.5">
          <FormField
            label="Ime i prezime"
            id="co-name"
            value={form.customerName}
            onChange={updateField('customerName')}
            error={errors.customerName}
            placeholder="npr. Ivan Horvat"
            autoComplete="name"
          />

          <div>
            <label htmlFor="co-phone" className="mb-1 block text-[12px] font-semibold text-white/50">
              Broj mobitela
            </label>
            <div className="flex items-center gap-2">
              <span className="flex h-11 items-center rounded-lg border border-white/[0.06] bg-coal-mid px-3 text-[13px] font-medium text-white/40">
                +385
              </span>
              <input
                id="co-phone"
                type="tel"
                value={form.customerPhone}
                onChange={updateField('customerPhone')}
                placeholder="91 234 5678"
                autoComplete="tel"
                className={`h-11 flex-1 rounded-lg border bg-coal-mid px-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-ember/40 ${
                  errors.customerPhone ? 'border-red-500/50' : 'border-white/[0.06]'
                }`}
                aria-invalid={!!errors.customerPhone}
              />
            </div>
            <AnimatePresence>
              {errors.customerPhone && (
                <motion.p initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-1 text-[11px] text-red-400" role="alert">{errors.customerPhone}</motion.p>
              )}
            </AnimatePresence>
            <p className="mt-1 text-[10px] text-white/20">Format: 091 234 5678 ili +385 91 234 5678</p>
          </div>

          <FormField
            label="Ulica i kućni broj"
            id="co-address"
            value={form.deliveryAddress}
            onChange={updateField('deliveryAddress')}
            error={errors.deliveryAddress}
            placeholder="npr. Matije Gupca 15"
            autoComplete="street-address"
          />

          <FormField
            label="Grad / Mjesto"
            id="co-city"
            value={form.deliveryCity}
            onChange={updateField('deliveryCity')}
            error={errors.deliveryCity}
            placeholder="Koška"
            autoComplete="address-level2"
          />

          <div>
            <label htmlFor="co-notes" className="mb-1 block text-[12px] font-semibold text-white/50">
              Napomena <span className="font-normal text-white/20">(opcionalno)</span>
            </label>
            <textarea
              id="co-notes"
              value={form.notes}
              onChange={updateField('notes')}
              placeholder="Npr. bez luka, 2. kat, zvonite..."
              rows={2}
              className="w-full resize-none rounded-lg border border-white/[0.06] bg-coal-mid px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-ember/40"
            />
          </div>
        </div>
      </div>

      {/* Fiksno podnožje — UVIJEK vidljivo */}
      <div className="shrink-0 border-t border-line-dark bg-coal-light px-5 py-4">
        {/* Plaćanje info */}
        <div className="mb-3 flex items-center gap-2.5 rounded-lg bg-ember/[0.06] px-3 py-2.5 ring-1 ring-ember/15">
          <IconCash className="h-4 w-4 shrink-0 text-ember-light" />
          <div className="flex-1">
            <span className="text-[12px] font-semibold text-white">Plaćanje pouzećem</span>
            <span className="ml-2 text-[11px] text-white/30">gotovina pri dostavi</span>
          </div>
        </div>

        {/* Submit gumb */}
        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center rounded-xl bg-ember text-sm font-bold text-white transition-all duration-200 hover:bg-ember-light disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/25 border-t-white" />
              Šaljemo...
            </span>
          ) : (
            `Potvrdi narudžbu · ${formatPrice(getTotalPrice())}`
          )}
        </button>

        {/* Natrag */}
        <button type="button" onClick={onBack}
          className="mt-2 w-full py-2 text-center text-[12px] text-white/30 transition-colors hover:text-white/60">
          ← Natrag na košaricu
        </button>
      </div>
    </form>
  );
}

function FormField({
  label,
  id,
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  type = 'text',
}: {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[12px] font-semibold text-white/50">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`h-11 w-full rounded-lg border bg-coal-mid px-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-ember/40 ${
          error ? 'border-red-500/50' : 'border-white/[0.06]'
        }`}
        aria-invalid={!!error}
      />
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mt-1 text-[11px] text-red-400" role="alert">{error}</motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
