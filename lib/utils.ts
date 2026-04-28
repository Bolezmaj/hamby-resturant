import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Spaja Tailwind klase bez konflikata */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formatira cijenu u hrvatski format: 8,50 € */
export function formatPrice(price: number): string {
  return `${price.toFixed(2).replace('.', ',')} €`;
}

/** Formatira datum u hrvatski format */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(date.getDate())}.${p(date.getMonth() + 1)}.${date.getFullYear()} ${p(date.getHours())}:${p(date.getMinutes())}`;
}

/** Svira zvuk obavijesti za novu narudžbu — Web Audio API, bez datoteka */
export function playNotificationSound(): void {
  try {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AC();

    const beep = (freq: number, start: number, dur: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.3, ctx.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + start + dur
      );
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + dur);
    };

    beep(440, 0, 0.1);
    beep(880, 0.12, 0.2);
  } catch {
    // Audio nije dostupan
  }
}
