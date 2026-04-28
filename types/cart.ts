import type { PizzaSize } from './database';

/** Stavka u košarici */
export interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  size?: PizzaSize;
}

/** Stanje košarice */
export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

/** Podaci za narudžbu iz forme */
export interface CheckoutFormData {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryCity: string;
  notes: string;
}
