import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types/cart';
import type { PizzaSize } from '@/types/database';

interface CartActions {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (menuItemId: string, size?: PizzaSize) => void;
  updateQuantity: (menuItemId: string, quantity: number, size?: PizzaSize) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

/** Ključ za identifikaciju stavke u košarici (id + veličina) */
function itemKey(menuItemId: string, size?: PizzaSize): string {
  return size ? `${menuItemId}__${size}` : menuItemId;
}

export const useCartStore = create<CartActions>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) =>
        set((state) => {
          const key = itemKey(newItem.menuItemId, newItem.size);
          const existing = state.items.find(
            (i) => itemKey(i.menuItemId, i.size) === key
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                itemKey(i.menuItemId, i.size) === key
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }

          return { items: [...state.items, { ...newItem, quantity: 1 }] };
        }),

      removeItem: (menuItemId, size) =>
        set((state) => ({
          items: state.items.filter(
            (i) => itemKey(i.menuItemId, i.size) !== itemKey(menuItemId, size)
          ),
        })),

      updateQuantity: (menuItemId, quantity, size) => {
        if (quantity <= 0) {
          get().removeItem(menuItemId, size);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            itemKey(i.menuItemId, i.size) === itemKey(menuItemId, size)
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
    }),
    {
      name: 'hamby-cart',
      version: 2,
      partialize: (state) => ({ items: state.items }),
    }
  )
);
