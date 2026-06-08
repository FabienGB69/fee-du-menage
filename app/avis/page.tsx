import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Avis clients Wecasa 5/5',
  description: 'Fée du Ménage affiche 106 avis clients vérifiés et une note 5/5 sur Wecasa pour les prestations de ménage à Lyon.',
  alternates: { canonical: '/avis' }
};

export default function AvisPage() {
  return (
    <section className="page-hero section-shell compact-hero reviews-page">
      <p className="eyebrow">Avis clients</p>
      <h1>106 avis clients vérifiés — 5/5 sur Wecasa</h1>
      <p className="hero-subtitle">La confiance est essentielle pour une aide ménagère à domicile. Les avis Wecasa permettent de consulter des retours clients vérifiés.</p>
      <div className="badges">
        <span>106 avis clients</span>
        <span>Note 5/5</span>
        <span>Intervention locale à Lyon</span>
      </div>
      <div className="hero-actions">
        <a className="btn btn-primary" href={siteConfig.wecasaUrl} target="_blank" rel="noopener noreferrer">Voir les avis Wecasa</a>
        <Link className="btn btn-secondary" href="/contact#devis">Demander un devis gratuit</Link>
      </div>
    </section>
  );
}
