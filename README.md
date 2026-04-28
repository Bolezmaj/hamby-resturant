# Pizza Grill Caffe Hamby

Kompletna web aplikacija za restoran Pizza Grill Caffe Hamby u Koški, Hrvatska.

## Značajke

- **Javna stranica** — jelovnik s 45 jela, košarica, online narudžba
- **Admin panel** — upravljanje narudžbama u realnom vremenu
- **Supabase backend** — PostgreSQL baza, RLS, realtime pretplate
- **Potpuno na hrvatskom** — svi tekstovi, poruke, validacije

## Tech Stack

- Next.js 16 (App Router)
- TypeScript (strict mode)
- Tailwind CSS 4
- Framer Motion
- Lenis (smooth scroll)
- Zustand (state management)
- Supabase (PostgreSQL + Realtime)
- Zod (validacija)
- bcryptjs (admin autentifikacija)

## Postavljanje

### 1. Supabase projekt

1. Kreirajte novi projekt na [supabase.com](https://supabase.com)
2. U **Project Settings → API** pronađite:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` ključ → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` ključ → `SUPABASE_SERVICE_ROLE_KEY`

### 2. Pokrenite migraciju

Otvorite **SQL Editor** u Supabase dashboardu i zalijepite sadržaj migracije.
Migracija kreira sve tablice, triggere, funkcije, RLS politike i seed podatke.

### 3. Omogućite Realtime

U Supabase dashboardu:
1. Idite na **Database → Replication**
2. Uključite `orders` tablicu za realtime

### 4. Postavite admin lozinku

Generirajte bcrypt hash za željenu lozinku:

```bash
node -e "const b=require('bcryptjs');console.log(b.hashSync('vasa-lozinka',12))"
```

### 5. Environment varijable

Kreirajte `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_PASSWORD_HASH=$2b$12$...your-bcrypt-hash...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 6. Pokrenite lokalno

```bash
npm install
npm run dev
```

Otvorite [http://localhost:3000](http://localhost:3000).

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

### 7. Deploy na Vercel

1. Povežite GitHub repozitorij s Vercelom
2. Dodajte sve environment varijable u Vercel dashboard
3. Deploy

## Struktura projekta

```
app/
├── page.tsx              — javna stranica (Server Component)
├── layout.tsx            — root layout, fontovi, metadata
├── globals.css           — sustav dizajna
├── admin/
│   ├── page.tsx          — admin prijava
│   └── dashboard/
│       └── page.tsx      — admin dashboard (Server + Client)
└── api/
    ├── menu/route.ts     — GET jelovnik
    ├── orders/
    │   ├── route.ts      — GET + POST narudžbe
    │   └── [id]/route.ts — PATCH status narudžbe
    └── auth/
        ├── login/route.ts
        └── logout/route.ts

components/
├── Navigation.tsx
├── Hero.tsx
├── AboutSection.tsx
├── ContactSection.tsx
├── Footer.tsx
├── SmoothScroll.tsx
├── Menu/
│   ├── MenuSection.tsx
│   └── MenuCard.tsx
├── Cart/
│   ├── CartButton.tsx
│   ├── CartDrawer.tsx
│   └── CheckoutForm.tsx
└── Admin/
    ├── AdminDashboard.tsx
    ├── StatsBar.tsx
    └── OrderCard.tsx

lib/
├── supabase/
│   ├── client.ts         — browser klijent
│   ├── server.ts         — server klijent
│   └── admin-session.ts  — admin sesije
├── store/
│   ├── cartStore.ts      — Zustand košarica
│   └── adminStore.ts     — Zustand admin stanje
├── hooks/
│   ├── useReducedMotion.ts
│   └── useRelativeTime.ts
├── motion/
│   ├── springs.ts        — spring konfiguracije
│   └── variants.ts       — animacijski varijanti
├── utils/
│   ├── currency.ts
│   └── validation.ts     — Zod sheme
└── utils.ts              — cn(), formatPrice(), formatDate()

types/
├── database.ts           — Supabase tipovi
└── cart.ts               — tipovi košarice
```

## Adresa

**Pizza Grill Caffe Hamby**
Matije Gupca 3, Koška, Hrvatska
OIB: 96051058778
