import { create } from 'zustand';
import type { OrderStatus } from '@/types/database';

type FilterValue = 'sve' | 'aktivne' | 'dostavljene';

interface AdminState {
  filter: FilterValue;
  isConnected: boolean;
  newOrderAlert: boolean;
  setFilter: (filter: FilterValue) => void;
  setConnected: (connected: boolean) => void;
  showNewOrderAlert: () => void;
  hideNewOrderAlert: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  filter: 'sve',
  isConnected: false,
  newOrderAlert: false,
  setFilter: (filter) => set({ filter }),
  setConnected: (isConnected) => set({ isConnected }),
  showNewOrderAlert: () => set({ newOrderAlert: true }),
  hideNewOrderAlert: () => set({ newOrderAlert: false }),
}));

/** Filtrira narudžbe prema aktivnom filteru */
export function filterByTab(status: OrderStatus, filter: FilterValue): boolean {
  switch (filter) {
    case 'aktivne':
      return status === 'nova' || status === 'potvrđena' || status === 'u_dostavi';
    case 'dostavljene':
      return status === 'dostavljeno' || status === 'otkazano';
    case 'sve':
    default:
      return true;
  }
}

/** Redoslijed sortiranja statusa — nova je najhitnija */
const STATUS_PRIORITY: Record<OrderStatus, number> = {
  nova: 0,
  'potvrđena': 1,
  u_dostavi: 2,
  dostavljeno: 3,
  otkazano: 4,
};

/** Sortira narudžbe: po prioritetu statusa, zatim po vremenu (najnovije prvo) */
export function sortOrders<T extends { status: OrderStatus; created_at: string }>(
  orders: T[]
): T[] {
  return [...orders].sort((a, b) => {
    const priorityDiff = STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
    if (priorityDiff !== 0) return priorityDiff;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
}
