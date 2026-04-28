/** Formatira cijenu u hrvatski format: 8,50 € */
export function formatPrice(price: number): string {
  return `${price.toFixed(2).replace('.', ',')} €`;
}
