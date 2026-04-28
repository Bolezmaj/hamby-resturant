import { z } from 'zod';

/** Validacija stavke narudžbe */
export const orderItemSchema = z.object({
  menuItemId: z.string().min(1, 'Neispravan ID stavke'),
  itemName: z.string().min(1, 'Naziv stavke je obavezan'),
  itemPrice: z.number().positive('Cijena mora biti pozitivna'),
  quantity: z.number().int().positive('Količina mora biti pozitivan cijeli broj'),
  size: z.union([z.literal('obična'), z.literal('jumbo'), z.null()]).optional(),
});

/** Validacija narudžbe */
export const createOrderSchema = z.object({
  customerName: z
    .string({ message: 'Ime je obavezno' })
    .min(3, 'Ime mora imati najmanje 3 znaka')
    .max(100, 'Ime je predugačko'),
  customerPhone: z
    .string({ message: 'Broj telefona je obavezan' })
    .min(7, 'Broj telefona je prekratak')
    .max(20, 'Broj telefona je predugačak'),
  deliveryAddress: z
    .string({ message: 'Adresa je obavezna' })
    .min(5, 'Adresa mora imati najmanje 5 znakova')
    .max(200, 'Adresa je predugačka'),
  deliveryCity: z
    .string({ message: 'Grad je obavezan' })
    .min(2, 'Grad mora imati najmanje 2 znaka')
    .max(100, 'Naziv grada je predugačak')
    .optional()
    .default('Koška'),
  notes: z.string().max(500, 'Napomena je predugačka').optional().default(''),
  items: z
    .array(orderItemSchema)
    .min(1, 'Narudžba mora sadržavati barem jednu stavku'),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

/** Validacija ažuriranja statusa narudžbe */
export const updateOrderStatusSchema = z.object({
  status: z.enum(
    ['nova', 'potvrđena', 'u_dostavi', 'dostavljeno', 'otkazano'],
    { error: 'Neispravan status narudžbe' }
  ),
});

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;

/** Validacija admin prijave */
export const loginSchema = z.object({
  password: z.string().min(1, 'Lozinka je obavezna'),
});
