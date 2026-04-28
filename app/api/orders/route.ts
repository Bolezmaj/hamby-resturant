import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { validateAdminSession } from '@/lib/supabase/admin-session';
import { getSupabaseServer } from '@/lib/supabase/server';
import { createOrderSchema } from '@/lib/utils/validation';

/** Untyped klijent za write operacije (zaobilazi TypeScript ograničenja RLS-a) */
function getWriteClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createOrderSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      console.error('Validation error:', JSON.stringify(parsed.error.issues, null, 2));
      return NextResponse.json(
        { error: firstError?.message ?? 'Neispravni podaci', field: firstError?.path?.join('.') },
        { status: 400 }
      );
    }

    const {
      customerName,
      customerPhone,
      deliveryAddress,
      deliveryCity,
      notes,
      items,
    } = parsed.data;

    const totalAmount = items.reduce(
      (sum, item) => sum + item.itemPrice * item.quantity,
      0
    );

    const supabase = getWriteClient();

    // Kreiraj narudžbu
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_name: customerName,
        customer_phone: customerPhone,
        delivery_address: deliveryAddress,
        delivery_city: deliveryCity,
        notes: notes || null,
        total_amount: totalAmount,
        payment_method: 'pouzeće',
        status: 'nova',
      })
      .select('id, order_number')
      .single();

    if (orderError || !order) {
      console.error('Greška pri kreiranju narudžbe:', orderError);
      return NextResponse.json(
        { error: 'Greška pri kreiranju narudžbe' },
        { status: 500 }
      );
    }

    // Kreiraj stavke narudžbe
    const orderItems = items.map((item) => ({
      order_id: order.id,
      menu_item_id: item.menuItemId,
      item_name: item.itemName,
      item_price: item.itemPrice,
      quantity: item.quantity,
      size: item.size ?? null,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Greška pri kreiranju stavki:', itemsError);
    }

    return NextResponse.json({
      orderId: order.id,
      orderNumber: order.order_number,
      estimatedTime: '30-45 min',
    });
  } catch (err) {
    console.error('Neočekivana greška:', err);
    return NextResponse.json(
      { error: 'Interna greška servera' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Provjeri admin cookie (postavlja ga samo login ruta)
    const token = request.cookies.get('hamby-admin-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 });
    }

    const supabase = await getSupabaseServer();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') ?? '100', 10);
    const offset = parseInt(searchParams.get('offset') ?? '0', 10);

    let query = supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: 'Greška pri dohvaćanju narudžbi' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Interna greška servera' },
      { status: 500 }
    );
  }
}
