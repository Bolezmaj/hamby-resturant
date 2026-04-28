/** Supabase Database tipovi za Pizza Grill Caffe Hamby */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type OrderStatus =
  | 'nova'
  | 'potvrđena'
  | 'u_dostavi'
  | 'dostavljeno'
  | 'otkazano';

export type MenuCategory =
  | 'rostilj'
  | 'panirano'
  | 'pizza'
  | 'salate'
  | 'prilozi';

export type PizzaSize = 'obična' | 'jumbo';

export interface Database {
  public: {
    Tables: {
      menu_items: {
        Row: {
          id: string;
          category: MenuCategory;
          name: string;
          description: string | null;
          price_regular: number;
          price_jumbo: number | null;
          is_available: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          category: MenuCategory;
          name: string;
          description?: string | null;
          price_regular: number;
          price_jumbo?: number | null;
          is_available?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          category?: MenuCategory;
          name?: string;
          description?: string | null;
          price_regular?: number;
          price_jumbo?: number | null;
          is_available?: boolean;
          sort_order?: number;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          customer_name: string;
          customer_phone: string;
          delivery_address: string;
          delivery_city: string;
          notes: string | null;
          payment_method: string;
          status: OrderStatus;
          total_amount: number;
          created_at: string;
          updated_at: string;
          confirmed_at: string | null;
          delivered_at: string | null;
        };
        Insert: {
          id?: string;
          order_number?: string;
          customer_name: string;
          customer_phone: string;
          delivery_address: string;
          delivery_city?: string;
          notes?: string | null;
          payment_method?: string;
          status?: OrderStatus;
          total_amount: number;
          created_at?: string;
          updated_at?: string;
          confirmed_at?: string | null;
          delivered_at?: string | null;
        };
        Update: {
          id?: string;
          order_number?: string;
          customer_name?: string;
          customer_phone?: string;
          delivery_address?: string;
          delivery_city?: string;
          notes?: string | null;
          payment_method?: string;
          status?: OrderStatus;
          total_amount?: number;
          created_at?: string;
          updated_at?: string;
          confirmed_at?: string | null;
          delivered_at?: string | null;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          menu_item_id: string | null;
          item_name: string;
          item_price: number;
          quantity: number;
          size: PizzaSize | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          menu_item_id?: string | null;
          item_name: string;
          item_price: number;
          quantity: number;
          size?: PizzaSize | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          menu_item_id?: string | null;
          item_name?: string;
          item_price?: number;
          quantity?: number;
          size?: PizzaSize | null;
          created_at?: string;
        };
      };
      admin_sessions: {
        Row: {
          id: string;
          token: string;
          created_at: string;
          expires_at: string;
        };
        Insert: {
          id?: string;
          token: string;
          created_at?: string;
          expires_at: string;
        };
        Update: {
          id?: string;
          token?: string;
          created_at?: string;
          expires_at?: string;
        };
      };
    };
    Functions: {
      get_today_stats: {
        Args: Record<string, never>;
        Returns: {
          orders_count: number;
          total_revenue: number;
          pending_count: number;
          avg_order_value: number;
        }[];
      };
    };
  };
}

/** Pomoćni tipovi za lakši pristup */
export type MenuItem = Database['public']['Tables']['menu_items']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type OrderItem = Database['public']['Tables']['order_items']['Row'];
export type OrderInsert = Database['public']['Tables']['orders']['Insert'];
export type OrderItemInsert = Database['public']['Tables']['order_items']['Insert'];
export type TodayStats = Database['public']['Functions']['get_today_stats']['Returns'][0];

/** Narudžba s uključenim stavkama */
export interface OrderWithItems extends Order {
  order_items: OrderItem[];
}
