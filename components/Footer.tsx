'use client';

import { IconFlame, IconMapPin, IconClock, IconScooter } from './Icons';

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Footer() {
  return (
    <footer className="bg-coal" role="contentinfo">
      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-ember/20 to-ember/5 ring-1 ring-ember/15">
                <IconFlame className="h-4 w-4 text-ember-light" />
              </div>
              <span className="font-display text-lg font-bold text-white">HAMBY</span>
            </div>
            <p className="max-w-xs text-[13px] leading-relaxed text-white/30">
              Pizza Grill Caffe Hamby — roštilj, pizza i dostava u Koški. Svježe namirnice, poštene porcije.
            </p>
          </div>

          {/* Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-[13px]">
              <IconMapPin className="h-4 w-4 text-white/20" />
              <span className="text-white/50">Matije Gupca 3, Koška</span>
            </div>
            <div className="flex items-center gap-2.5 text-[13px]">
              <IconClock className="h-4 w-4 text-white/20" />
              <span className="text-white/50">Pon–Pet 10–22h · Vik 10–23h</span>
            </div>
            <div className="flex items-center gap-2.5 text-[13px]">
              <IconScooter className="h-4 w-4 text-white/20" />
              <span className="text-white/50">Dostava ~30 min · Pouzećem</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-white/20">Navigacija</p>
            <nav aria-label="Linkovi u podnožju">
              <ul className="space-y-2">
                {[
                  { id: 'pocetna', label: 'Početna' },
                  { id: 'jelovnik', label: 'Jelovnik' },
                  { id: 'o-nama', label: 'O nama' },
                  { id: 'kontakt', label: 'Kontakt' },
                ].map((link) => (
                  <li key={link.id}>
                    <button onClick={() => scrollTo(link.id)}
                      className="text-[13px] text-white/35 transition-colors duration-200 hover:text-white">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/[0.04] pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-[10px] text-white/15">© {new Date().getFullYear()} Pizza Grill Caffe Hamby. Sva prava pridržana.</p>
          <p className="text-[10px] text-white/10">OIB: 96051058778</p>
        </div>
      </div>
    </footer>
  );
}
