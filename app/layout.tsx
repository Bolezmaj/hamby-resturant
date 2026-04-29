import type { Metadata } from 'next';
import { Space_Grotesk, DM_Sans, Playfair_Display } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-space-grotesk',
  weight: ['500', '600', '700'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pizza Grill Caffe Hamby | Koška',
  description: 'Pizza Grill Caffe Hamby — roštilj, pizza i dostava u Koški. Matije Gupca 3, Koška. Naručite online.',
  keywords: 'pizza, roštilj, caffe, Koška, dostava, Hamby, ćevapi, hamburger, Slavonija',
  openGraph: {
    title: 'Pizza Grill Caffe Hamby | Koška',
    description: 'Roštilj, pizza i dostava u Koški.',
    type: 'website',
    locale: 'hr_HR',
    images: [{ url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80', width: 1200, height: 630, alt: 'Pizza Grill Caffe Hamby' }],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔥</text></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hr" className={`${spaceGrotesk.variable} ${dmSans.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Restaurant',
          name: 'Pizza Grill Caffe Hamby',
          address: { '@type': 'PostalAddress', streetAddress: 'Matije Gupca 3', addressLocality: 'Koška', addressCountry: 'HR' },
          servesCuisine: ['Pizza', 'Grill', 'Croatian'],
          openingHours: ['Mo-Fr 10:00-22:00', 'Sa-Su 10:00-23:00'],
          hasDelivery: true, priceRange: '€€',
        })}} />
      </head>
      <body className="overflow-x-hidden" suppressHydrationWarning>
        <a href="#glavni-sadrzaj" className="skip-link">Preskoči na sadržaj</a>
        {children}
        <Toaster position="bottom-right" toastOptions={{
          style: { background: '#1C1917', color: '#FAF8F5', border: '1px solid rgba(196,56,10,0.2)', borderRadius: '10px', fontSize: '13px', padding: '12px 16px' },
        }} />
      </body>
    </html>
  );
}
