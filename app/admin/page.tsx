'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { IconFlame } from '@/components/Icons';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Pogrešna lozinka');
        setLoading(false);
      }
    } catch {
      setError('Greška pri prijavi.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-coal px-5">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm">

        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10">
            <IconFlame className="h-5 w-5 text-gold" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-white">Hamby Admin</h1>
            <p className="text-[11px] text-white/30">Upravljanje narudžbama</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="admin-password" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/35">
              Lozinka
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Unesite lozinku"
              className={`h-14 w-full rounded-xl border bg-coal-light px-4 text-base text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-gold/30 ${
                error ? 'border-red-500/50' : 'border-white/[0.06]'
              }`}
              autoComplete="current-password"
              aria-invalid={!!error}
            />
            {error && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-[12px] text-red-400" role="alert">{error}</motion.p>
            )}
          </div>

          <button type="submit" disabled={loading || !password.trim()}
            className="flex h-14 w-full items-center justify-center rounded-xl bg-gold text-sm font-bold text-coal transition-all active:scale-[0.97] disabled:opacity-40">
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-coal/20 border-t-coal" />
                Prijava...
              </span>
            ) : 'Prijavi se'}
          </button>
        </form>

        <p className="mt-10 text-center text-[9px] uppercase tracking-widest text-white/10">
          Pizza Grill Caffe Hamby · Koška
        </p>
      </motion.div>
    </div>
  );
}
