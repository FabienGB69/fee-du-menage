import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading } from '@/components/SectionHeading';

export const metadata: Metadata = {
  title: "Crédit d'impôt 50 % ménage à domicile Lyon",
  description: "Explication simple du crédit d'impôt 50 % pour les prestations de ménage à domicile éligibles au Service à la Personne.",
  alternates: { canonical: '/credit-impot' }
};

export default function CreditImpotPage() {
  return (
    <>
      <section className="page-hero section-shell compact-hero">
        <p className="eyebrow">Crédit d’impôt 50 %</p>
        <h1>Réduisez le coût réel de votre ménage à domicile</h1>
        <p className="hero-subtitle">Les prestations éligibles au Service à la Personne peuvent ouvrir droit à 50 % de crédit d’impôt.</p>
      </section>
      <section className="tax section-shell">
        <SectionHeading eyebrow="Exemple concret" title="100 € facturés = 50 € de coût réel" />
        <div className="tax-grid">
          <div>
            <p>
              Pour une prestation de ménage à domicile éligible, l’avantage fiscal peut représenter 50 % des sommes facturées.
              L’objectif est de vous permettre de bénéficier d’un service professionnel tout en maîtrisant le budget.
            </p>
            <p className="note">L’éligibilité dépend de votre situation fiscale et des règles applicables. Les informations utiles sont précisées lors du devis.</p>
            <Link className="btn btn-primary" href="/contact#devis">Demander un devis gratuit</Link>
          </div>
          <div className="example-card">
            <span>Avantage fiscal</span>
            <strong>50 % de crédit d’impôt</strong>
            <small>dans le cadre des prestations éligibles au Service à la Personne</small>
          </div>
        </div>
      </section>
    </>
  );
}
