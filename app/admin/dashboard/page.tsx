import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabase/server';
import AdminDashboard from '@/components/Admin/AdminDashboard';
import type { OrderWithItems, TodayStats } from '@/types/database';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('hamby-admin-token')?.value;

  if (!token) {
    redirect('/admin');
  }

  const supabase = await getSupabaseServer();

  // Dohvati narudžbe
  const { data: orders } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false })
    .limit(100);

  const initialOrders: OrderWithItems[] = (orders ?? []) as OrderWithItems[];

  // Izračunaj statistiku
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayOrders = initialOrders.filter((o) => new Date(o.created_at) >= today);
  const initialStats: TodayStats = {
    orders_count: todayOrders.length,
    total_revenue: todayOrders.reduce((s, o) => s + Number(o.total_amount), 0),
    pending_count: todayOrders.filter((o) => o.status === 'nova' || o.status === 'potvrđena').length,
    avg_order_value: todayOrders.length > 0
      ? todayOrders.reduce((s, o) => s + Number(o.total_amount), 0) / todayOrders.length
      : 0,
  };

  return (
    <AdminDashboard initialOrders={initialOrders} initialStats={initialStats} />
  );
}
