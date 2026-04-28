/** Imenovane spring konfiguracije — nikad koristiti default spring */

/** Brz, precizan — za UI elemente koji trebaju reagirati odmah */
export const springSnappy = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 30,
  mass: 0.8,
};

/** Elastičan, živ — za elemente koji trebaju osjećaj igre */
export const springBouncy = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 20,
  mass: 1,
};

/** Nježan, trom — za pozadinske elemente i velike prijelaze */
export const springGentle = {
  type: 'spring' as const,
  stiffness: 120,
  damping: 20,
  mass: 1.2,
};

/** Težak, spor — za hero elemente koji trebaju osjećaj mase */
export const springHeavy = {
  type: 'spring' as const,
  stiffness: 80,
  damping: 25,
  mass: 2,
};

/** Drawer/panel — brz ulaz, kontroliran izlaz */
export const springPanel = {
  type: 'spring' as const,
  stiffness: 280,
  damping: 28,
  mass: 1,
};
