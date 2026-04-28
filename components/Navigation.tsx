'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/store/cartStore';
import { springSnappy } from '@/lib/motion/springs';
import { IconFlame, IconBag } from './Icons';

const NAV_LINKS = [
  { id: 'pocetna', label: 'Početna' },
  { id: 'jelovnik', label: 'Jelovnik' },
  { id: 'o-nama', label: 'O nama' },
  { id: 'kontakt', label: 'Kontakt' },
] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('pocetna');

  const totalItems = useCartStore((s) => s.getTotalItems());
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = NAV_LINKS.map((l) => l.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navClick = (id: string) => { setMobileOpen(false); scrollTo(id); };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-bone/95 backdrop-blur-2xl shadow-[0_1px_0_rgba(28,25,23,0.06)]' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8" aria-label="Glavna navigacija">
          {/* Logo */}
          <button onClick={() => scrollTo('pocetna')} className="flex items-center gap-2.5" aria-label="Hamby — na vrh stranice">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 ${scrolled ? 'bg-ember/10' : 'bg-white/10'}`}>
              <IconFlame className={`h-4 w-4 transition-colors duration-300 ${scrolled ? 'text-ember' : 'text-ember-glow'}`} />
            </div>
            <div>
              <span className={`font-display text-base font-bold tracking-tight transition-colors duration-300 ${scrolled ? 'text-ink' : 'text-white'}`}>
                HAMBY
              </span>
              <span className={`ml-1.5 text-[9px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${scrolled ? 'text-ink-muted' : 'text-white/40'}`}>
                Koška
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-0.5 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button key={link.id} onClick={() => navClick(link.id)}
                  className={`relative rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all duration-200 ${
                    isActive
                      ? scrolled ? 'text-ember' : 'text-white'
                      : scrolled ? 'text-ink-soft hover:text-ink hover:bg-ink/[0.03]' : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                  }`}>
                  {link.label}
                  {isActive && (
                    <motion.div layoutId="nav-indicator"
                      className={`absolute inset-x-2 -bottom-0.5 h-[2px] rounded-full ${scrolled ? 'bg-ember' : 'bg-white'}`}
                      transition={springSnappy} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2.5">
            <button onClick={openCart}
              className="relative flex items-center gap-2 rounded-full bg-ember px-4 py-2.5 text-[12px] font-bold text-white shadow-[0_2px_20px_rgba(196,56,10,0.25)] transition-all duration-200 hover:shadow-[0_4px_28px_rgba(196,56,10,0.35)] active:scale-[0.96]"
              aria-label={mounted ? `Košarica — ${totalItems} stavki` : 'Košarica'}>
              <IconBag className="h-4 w-4" />
              <AnimatePresence mode="popLayout">
                {mounted && totalItems > 0 && (
                  <motion.span key={totalItems} initial={{ scale: 0, width: 0 }} animate={{ scale: 1, width: 'auto' }} exit={{ scale: 0, width: 0 }}
                    transition={springSnappy} className="overflow-hidden tabular-nums">
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile hamburger */}
            <button onClick={() => setMobileOpen((o) => !o)}
              className={`flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-lg transition-colors md:hidden ${scrolled ? 'text-ink hover:bg-ink/[0.04]' : 'text-white hover:bg-white/[0.08]'}`}
              aria-label={mobileOpen ? 'Zatvori meni' : 'Otvori meni'} aria-expanded={mobileOpen}>
              <motion.span animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block h-[1.5px] w-5 rounded-full bg-current" transition={springSnappy} />
              <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} className="block h-[1.5px] w-5 rounded-full bg-current" />
              <motion.span animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block h-[1.5px] w-5 rounded-full bg-current" transition={springSnappy} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 border-b border-line bg-bone/98 backdrop-blur-2xl md:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4" aria-label="Mobilna navigacija">
              {NAV_LINKS.map((link) => (
                <button key={link.id} onClick={() => navClick(link.id)}
                  className={`rounded-xl px-4 py-3.5 text-left text-[15px] font-medium transition-colors active:bg-ink/[0.04] ${
                    activeSection === link.id ? 'text-ember' : 'text-ink-soft'
                  }`}>
                  {link.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
