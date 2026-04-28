import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase/server';

export const revalidate = 300; // 5 minuta cache

export async function GET() {
  try {
    const supabase = await getSupabaseServer();

    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('category')
      .order('sort_order');

    if (error) {
      return NextResponse.json(
        { error: 'Greška pri dohvaćanju jelovnika' },
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
