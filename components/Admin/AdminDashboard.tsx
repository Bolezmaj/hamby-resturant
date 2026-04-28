'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSupabaseBrowser } from '@/lib/supabase/client';
import { useAdminStore, filterByTab, sortOrders } from '@/lib/store/adminStore';
import { playNotificationSound } from '@/lib/utils';
import type { OrderWithItems, OrderStatus, TodayStats } from '@/types/database';
import { IconFlame } from '../Icons';
import StatsBar from './StatsBar';
import OrderCard from './OrderCard';
import toast from 'react-hot-toast';

interface AdminDashboardProps {
  initialOrders: OrderWithItems[];
  initialStats: TodayStats;
}

type FilterValue = 'sve' | 'aktivne' | 'dostavljene';

const FILTER_TABS: { value: FilterValue; label: string }[] = [
  { value: 'sve', label: 'Sve narudžbe' },
  { value: 'aktivne', label: 'Aktivne' },
  { value: 'dostavljene', label: 'Završene' },
];

export default function AdminDashboard({ initialOrders, initialStats }: AdminDashboardProps) {
  const [orders, setOrders] = useState<OrderWithItems[]>(initialOrders);
  const [stats, setStats] = useState<TodayStats>(initialStats);
  const [newAlert, setNewAlert] = useState(false);
  const { filter, setFilter, isConnected, setConnected } = useAdminStore();

  const recalcStats = useCallback((orderList: OrderWithItems[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayOrders = orderList.filter((o) => new Date(o.created_at) >= today);
    setStats({
      orders_count: todayOrders.length,
      total_revenue: todayOrders.reduce((s, o) => s + Number(o.total_amount), 0),
      pending_count: todayOrders.filter((o) => o.status === 'nova' || o.status === 'potvrđena').length,
      avg_order_value: todayOrders.length > 0 ? todayOrders.reduce((s, o) => s + Number(o.total_amount), 0) / todayOrders.length : 0,
    });
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) { const data = await response.json(); setOrders(data); recalcStats(data); }
    } catch { /* tiho */ }
  }, [recalcStats]);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    const channel = supabase.channel('orders-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, () => {
        fetchOrders(); playNotificationSound(); setNewAlert(true);
        toast.success('Nova narudžba!', { duration: 5000 });
        setTimeout(() => setNewAlert(false), 3000);
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, () => { fetchOrders(); })
      .subscribe((status) => { setConnected(status === 'SUBSCRIBED'); });
    return () => { supabase.removeChannel(channel); };
  }, [fetchOrders, setConnected]);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o));
    try {
      const response = await fetch(`/api/orders/${orderId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus }) });
      if (!response.ok) throw new Error();
      recalcStats(orders.map((o) => o.id === orderId ? { ...o, status: newStatus } : o));
      toast.success('Status ažuriran');
    } catch { fetchOrders(); toast.error('Greška pri ažuriranju'); }
  };

  const handleLogout = async () => { await fetch('/api/auth/logout', { method: 'POST' }); window.location.href = '/admin'; };

  const filteredOrders = sortOrders(orders.filter((o) => filterByTab(o.status, filter)));
  const filterCounts: Record<FilterValue, number> = {
    sve: orders.length,
    aktivne: orders.filter((o) => filterByTab(o.status, 'aktivne')).length,
    dostavljene: orders.filter((o) => filterByTab(o.status, 'dostavljene')).length,
  };

  return (
    <div className="min-h-[100svh] bg-coal">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-coal/90 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 ring-1 ring-gold/15">
              <IconFlame className="h-4 w-4 text-gold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-bold text-white">Hamby</span>
                <span className={`h-1.5 w-1.5 rounded-full ${isConnected ? 'bg-green-400' : 'bg-orange-400 animate-pulse'}`} />
              </div>
              <span className="text-[9px] font-medium uppercase tracking-wider text-white/20">Admin panel</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <AnimatePresence>
              {newAlert && (
                <motion.div initial={{ opacity: 0, scale: 0.8, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-red-900 to-red-800 px-3 py-1.5 text-[10px] font-bold text-white shadow-lg shadow-red-900/30 ring-1 ring-red-700/50">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
                  Nova!
                </motion.div>
              )}
            </AnimatePresence>
            <a href="/" className="rounded-lg px-2.5 py-1.5 text-[11px] text-white/25 active:text-white/50">Stranica</a>
            <button onClick={handleLogout}
              className="rounded-lg bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-white/35 ring-1 ring-white/[0.06] active:bg-white/[0.08]">
              Odjava
            </button>
          </div>
        </div>
        {/* Separator line */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </header>

      <main className="px-3 py-5 sm:px-5 sm:py-6">
        <StatsBar stats={stats} />

        {/* Filter */}
        <div className="mb-5 flex gap-1.5">
          {FILTER_TABS.map((tab) => {
            const isActive = filter === tab.value;
            return (
              <button key={tab.value} onClick={() => setFilter(tab.value)}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-3 text-[11px] font-bold transition-all active:scale-[0.97] sm:flex-none sm:px-5 sm:text-[12px] ${
                  isActive
                    ? 'bg-gradient-to-r from-gold to-yellow-500 text-coal shadow-lg shadow-gold/15'
                    : 'bg-coal-light text-white/35 ring-1 ring-white/[0.04]'
                }`} aria-pressed={isActive}>
                {tab.label}
                {filterCounts[tab.value] > 0 && (
                  <span className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold ${
                    isActive ? 'bg-coal/20 text-coal/70' : 'bg-white/[0.06] text-white/25'
                  }`}>{filterCounts[tab.value]}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Orders */}
        {filteredOrders.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.06] py-20">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.03]">
              <IconFlame className="h-6 w-6 text-white/15" />
            </div>
            <p className="text-sm font-medium text-white/40">Nema narudžbi</p>
            <p className="mt-1 text-[11px] text-white/15">
              {filter === 'sve' ? 'Narudžbe će se pojaviti ovdje.' : 'Nema narudžbi s ovim filterom.'}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-3 sm:space-y-0 lg:grid-cols-2">
            <AnimatePresence>
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
