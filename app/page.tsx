import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BrandShowcase } from '@/components/BrandShowcase';
import { DjamilaPresentation } from '@/components/DjamilaPresentation';
import { QuoteForm } from '@/components/QuoteForm';
import { SectionHeading } from '@/components/SectionHeading';
import { ServiceCards } from '@/components/ServiceCards';
import { siteConfig, whatsappHref } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Aide ménagère à Lyon 9 - Devis gratuit',
  alternates: { canonical: '/' }
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    image: 'https://fee-du-menage.fr/assets/logo-fee-du-menage.svg',
    telephone: '+33609896564',
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '55 rue du Bourdonnais',
      postalCode: '69009',
      addressLocality: 'Lyon',
      addressCountry: 'FR'
    },
    areaServed: siteConfig.area,
    priceRange: '€€',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: String(siteConfig.reviews),
      bestRating: '5'
    },
    url: 'https://fee-du-menage.fr/',
    sameAs: siteConfig.wecasaUrl
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="hero section-shell">
        <div className="hero-content">
          <p className="eyebrow">Aide ménagère locale • Lyon 9 et alentours</p>
          <h1>Votre aide ménagère de confiance à Lyon</h1>
          <p className="hero-subtitle">
            Ménage régulier, grand nettoyage, vitres, déménagement et locations Airbnb. Intervention à Lyon dans un rayon de 8 km.
          </p>
          <div className="badges" aria-label="Points forts">
            <span>106 avis clients vérifiés</span>
            <span>Note 5/5</span>
            <span>Crédit d’impôt 50 %</span>
          </div>
          <div className="hero-actions">
            <a className="btn btn-primary" href={siteConfig.phoneHref}>
              Appeler maintenant
            </a>
            <Link className="btn btn-secondary" href="/contact#devis">
              Demander un devis gratuit
            </Link>
            <a className="btn btn-whatsapp" href={whatsappHref} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
        <aside className="hero-card" aria-label="Coordonnées Fée du Ménage">
          <div className="hero-logo-wrap">
            <Image src="/assets/logo-fee-du-menage.svg" alt="Logo Fée du Ménage - votre maison étincelante" width={260} height={260} priority />
          </div>
          <div className="sparkle" aria-hidden="true">
            ✦
          </div>
          <h2>Devis rapide et gratuit</h2>
          <p>Une réponse claire pour votre ménage à domicile à Lyon, avec une approche soignée et méticuleuse.</p>
          <ul>
            <li>
              <strong>Téléphone :</strong> <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
            </li>
            <li>
              <strong>Email :</strong> <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
            <li>
              <strong>Adresse :</strong> {siteConfig.address}
            </li>
          </ul>
        </aside>
      </section>

      <BrandShowcase />

      <DjamilaPresentation />

      <section className="trust-strip" id="avis" aria-label="Avis clients">
        <div>
          <strong>106 avis clients vérifiés — 5/5 sur Wecasa</strong>
          <p>Une réputation construite grâce à la qualité du travail, la ponctualité et la confiance.</p>
        </div>
        <a className="btn btn-outline" href={siteConfig.wecasaUrl} target="_blank" rel="noopener noreferrer">
          Voir les avis Wecasa
        </a>
      </section>

      <section className="tax section-shell" id="credit-impot">
        <SectionHeading eyebrow="Service à la Personne" title="Un avantage fiscal simple à comprendre" />
        <div className="tax-grid">
          <div>
            <p>
              Les prestations de ménage à domicile éligibles au Service à la Personne peuvent ouvrir droit à{' '}
              <strong>50 % de crédit d’impôt</strong>. Cela permet de réduire le coût réel de votre intervention tout en
              bénéficiant d’un service professionnel à domicile.
            </p>
            <p className="note">Selon votre situation fiscale et les règles en vigueur. Les informations utiles sont précisées lors du devis.</p>
          </div>
          <div className="example-card">
            <span>Exemple</span>
            <strong>100 € facturés = 50 € de coût réel</strong>
            <small>après avantage fiscal de 50 %</small>
          </div>
        </div>
      </section>

      <section className="services section-shell" id="services">
        <SectionHeading eyebrow="Prestations à domicile" title="Des services de ménage adaptés à votre besoin" centered>
          <p>Interventions pour particuliers et locations courte durée, sans bureaux, repassage ni nettoyage fin de chantier.</p>
        </SectionHeading>
        <ServiceCards />
      </section>

      <section className="why section-shell" id="pourquoi">
        <SectionHeading eyebrow="Pourquoi choisir Fée du Ménage ?" title="Une aide ménagère fiable, locale et reconnue à Lyon" />
        <div className="why-list">
          <div>
            <strong>Travail soigné et méticuleux</strong>
            <span>Chaque intervention vise un résultat propre, net et durable.</span>
          </div>
          <div>
            <strong>106 avis clients</strong>
            <span>Une preuve sociale solide grâce aux retours de clients Wecasa.</span>
          </div>
          <div>
            <strong>Note 5/5</strong>
            <span>Une qualité de service appréciée et régulièrement recommandée.</span>
          </div>
          <div>
            <strong>Devis gratuit</strong>
            <span>Vous connaissez le tarif avant de confirmer l’intervention.</span>
          </div>
          <div>
            <strong>Service à la Personne</strong>
            <span>Des prestations à domicile pouvant être éligibles à l’avantage fiscal.</span>
          </div>
          <div>
            <strong>Intervention locale à Lyon</strong>
            <span>Un service de proximité autour de Lyon 9.</span>
          </div>
        </div>
      </section>

      <section className="area section-shell" id="zone">
        <div className="area-card">
          <div>
            <p className="eyebrow">Zone d’intervention</p>
            <h2>Lyon uniquement, rayon de 8 km autour du 69009</h2>
            <p>
              Fée du Ménage intervient localement à Lyon et dans un rayon de 8 km autour du 55 rue du Bourdonnais, 69009 Lyon.
              Cette proximité permet de proposer un service réactif, régulier et adapté aux besoins du secteur.
            </p>
          </div>
          <a className="btn btn-primary" href={siteConfig.phoneHref}>
            Vérifier ma disponibilité
          </a>
        </div>
      </section>

      <section className="quote section-shell" id="devis">
        <SectionHeading eyebrow="Demande de devis" title="Recevez un devis gratuit pour votre ménage à Lyon" centered>
          <p>Le formulaire enregistre la demande et envoie automatiquement un email à Djamila.</p>
        </SectionHeading>
        <QuoteForm />
      </section>

      <FaqSection />
    </>
  );
}

function FaqSection() {
  return (
    <section className="faq section-shell" id="faq">
      <SectionHeading eyebrow="Questions fréquentes" title="FAQ" centered />
      <div className="faq-list">
        <details>
          <summary>Intervenez-vous dans toute la métropole de Lyon ?</summary>
          <p>Non, uniquement Lyon et rayon de 8 km.</p>
        </details>
        <details>
          <summary>Puis-je bénéficier du crédit d’impôt ?</summary>
          <p>Oui, dans le cadre des prestations éligibles au Service à la Personne.</p>
        </details>
        <details>
          <summary>Le devis est-il gratuit ?</summary>
          <p>Oui.</p>
        </details>
        <details>
          <summary>Faites-vous les vitres ?</summary>
          <p>Oui.</p>
        </details>
        <details>
          <summary>Faites-vous les locations Airbnb ?</summary>
          <p>Oui.</p>
        </details>
      </div>
    </section>
  );
}
