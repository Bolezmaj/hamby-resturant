/** Unsplash slike za stavke jelovnika — mapirane po imenu kategorije + sort_order */

const GRILL_IMAGES = [
  'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=75&auto=format&fit=crop', // ćevapi
  'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=75&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=75&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=75&auto=format&fit=crop', // hamburger
  'https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&q=75&auto=format&fit=crop', // cheeseburger
  'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&q=75&auto=format&fit=crop', // pileći
  'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400&q=75&auto=format&fit=crop', // gyros
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=75&auto=format&fit=crop', // pljeskavica
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=75&auto=format&fit=crop', // punjena
  'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=75&auto=format&fit=crop', // tortilla
  'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=75&auto=format&fit=crop', // lignje
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=75&auto=format&fit=crop', // miješano
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=75&auto=format&fit=crop', // hamby plata
  'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=75&auto=format&fit=crop', // doručak
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=75&auto=format&fit=crop', // vješalica
  'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=75&auto=format&fit=crop', // kajmak veliki
  'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=75&auto=format&fit=crop', // kajmak mali
];

const BREADED_IMAGES = [
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&q=75&auto=format&fit=crop', // bečki
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&q=75&auto=format&fit=crop', // zagrebački
  'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=75&auto=format&fit=crop', // pileći pohani
  'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&q=75&auto=format&fit=crop', // kolutići
  'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=75&auto=format&fit=crop', // pohani sir
  'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=75&auto=format&fit=crop', // medaljoni
];

const PIZZA_IMAGES = [
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=75&auto=format&fit=crop', // capriciosa
  'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=75&auto=format&fit=crop', // margarita
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=75&auto=format&fit=crop', // vesuvio
  'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&q=75&auto=format&fit=crop', // hamby
  'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=75&auto=format&fit=crop', // slavonska
  'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=75&auto=format&fit=crop', // mexicana
  'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=75&auto=format&fit=crop', // bijela
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=75&auto=format&fit=crop', // dalmatinska
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=75&auto=format&fit=crop', // quattro
  'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=75&auto=format&fit=crop', // picante
  'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&q=75&auto=format&fit=crop', // zagorska
];

const SALAD_IMAGES = [
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=75&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=75&auto=format&fit=crop',
];

const SIDES_IMAGES = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=75&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=75&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=75&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=75&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=75&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=75&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=75&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=75&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=75&auto=format&fit=crop',
];

const IMAGE_MAP: Record<string, string[]> = {
  rostilj: GRILL_IMAGES,
  panirano: BREADED_IMAGES,
  pizza: PIZZA_IMAGES,
  salate: SALAD_IMAGES,
  prilozi: SIDES_IMAGES,
};

export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=75&auto=format&fit=crop';

/** Dohvati sliku za stavku jelovnika po kategoriji i sort_order */
export function getMenuItemImage(category: string, sortOrder: number): string {
  const images = IMAGE_MAP[category];
  if (!images) return FALLBACK_IMAGE;
  return images[sortOrder - 1] ?? FALLBACK_IMAGE;
}
