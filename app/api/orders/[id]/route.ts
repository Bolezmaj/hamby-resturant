import { NextRequest, NextResponse } from 'next/server';
import { updateOrderStatusSchema } from '@/lib/utils/validation';
import { createClient } from '@supabase/supabase-js';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Provjeri admin cookie
    const token = request.cookies.get('hamby-admin-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = updateOrderStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Neispravan status' },
        { status: 400 }
      );
    }

    const { status } = parsed.data;
    // Koristi untyped klijent za admin operacije (service_role)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Pripremi podatke za ažuriranje
    const updateData: Record<string, string> = { status };

    if (status === 'potvrđena') {
      updateData.confirmed_at = new Date().toISOString();
    } else if (status === 'dostavljeno') {
      updateData.delivered_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', id)
      .select('*, order_items(*)')
      .single();

    if (error) {
      console.error('Greška pri ažuriranju narudžbe:', error);
      return NextResponse.json(
        { error: 'Greška pri ažuriranju narudžbe' },
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
