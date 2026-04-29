'use client';

import { IconFlame } from './Icons';

function go(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }

export default function Footer() {
  return (
    <footer className="bg-coal" role="contentinfo">
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'rgba(196,56,10,0.12)', border: '1px solid rgba(196,56,10,0.2)' }}>
                <IconFlame className="h-4 w-4 text-ember-light" />
              </div>
              <span className="font-display text-base font-bold text-white tracking-tight">HAMBY</span>
            </div>
            <p className="text-[12px] leading-relaxed text-white/25">
              Pizza Grill Caffe Hamby<br />Matije Gupca 3, Koška, Hrvatska
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Linkovi u podnožju">
            <p className="mb-3 text-[9px] font-bold uppercase tracking-widest text-white/15">Navigacija</p>
            <ul className="space-y-2">
              {[
                { id: 'pocetna', label: 'Početna' },
                { id: 'jelovnik', label: 'Jelovnik' },
                { id: 'o-nama', label: 'O nama' },
                { id: 'kontakt', label: 'Kontakt' },
              ].map((l) => (
                <li key={l.id}>
                  <button onClick={() => go(l.id)} className="text-[13px] text-white/30 transition-colors hover:text-white/70">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/[0.04] pt-6 flex flex-col gap-1 sm:flex-row sm:justify-between">
          <p className="text-[10px] text-white/12">© {new Date().getFullYear()} Pizza Grill Caffe Hamby. Sva prava pridržana.</p>
          <p className="text-[10px] text-white/10">OIB: 96051058778</p>
        </div>
      </div>
    </footer>
  );
}
