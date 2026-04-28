import { getSupabaseServer } from '@/lib/supabase/server';
import type { MenuItem } from '@/types/database';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import MenuSection from '@/components/Menu/MenuSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/Cart/CartDrawer';
import CartButton from '@/components/Cart/CartButton';

export const revalidate = 300; // 5 minuta

export default async function HomePage() {
  const supabase = await getSupabaseServer();

  const { data: menuItems } = await supabase
    .from('menu_items')
    .select('*')
    .order('category')
    .order('sort_order');

  const items: MenuItem[] = menuItems ?? [];

  return (
    <>
      <Navigation />
      <main id="glavni-sadrzaj">
        <Hero />
        <AboutSection />
        <MenuSection items={items} />
        <ContactSection />
      </main>
      <Footer />
      <CartButton />
      <CartDrawer />
    </>
  );
}
