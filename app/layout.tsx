import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap', weight: ['700'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://fee-du-menage.fr'),
  title: {
    default: 'Fée du Ménage | Aide ménagère à Lyon 9',
    template: '%s | Fée du Ménage'
  },
  description:
    "Fée du Ménage, aide ménagère à Lyon : ménage régulier, grand nettoyage, vitres, déménagement et nettoyage Airbnb. 106 avis Wecasa, note 5/5, crédit d'impôt 50 %.",
  keywords: [
    'femme de ménage Lyon',
    'aide ménagère Lyon',
    'ménage à domicile Lyon',
    'ménage Lyon 9',
    'nettoyage Airbnb Lyon',
    'nettoyage vitres Lyon'
  ],
  openGraph: {
    title: 'Fée du Ménage | Votre aide ménagère de confiance à Lyon',
    description: "Ménage à domicile à Lyon dans un rayon de 8 km autour du 69009. Devis gratuit et crédit d'impôt 50 %.",
    locale: 'fr_FR',
    type: 'website'
  },
  icons: {
    icon: '/assets/logo-fee-du-menage.svg'
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
