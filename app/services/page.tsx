import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading } from '@/components/SectionHeading';
import { ServiceCards } from '@/components/ServiceCards';
import { excludedServices, siteConfig, whatsappHref } from '@/lib/site';
import { excludedServices, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Services de ménage à domicile à Lyon',
  description: 'Ménage régulier, grand nettoyage, ménage après déménagement, nettoyage Airbnb et vitres à Lyon 9 et dans un rayon de 8 km.',
  alternates: { canonical: '/services' }
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero section-shell compact-hero">
        <p className="eyebrow">Services</p>
        <h1>Prestations de ménage à domicile à Lyon</h1>
        <p className="hero-subtitle">Des prestations ciblées pour particuliers et locations Airbnb, avec devis gratuit et intervention locale.</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href={siteConfig.phoneHref}>Appeler maintenant</a>
          <Link className="btn btn-secondary" href="/contact#devis">Demander un devis gratuit</Link>
          <a className="btn btn-whatsapp" href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </section>
      <section className="section-shell">
        <SectionHeading eyebrow="Ce que je propose" title="Un service clair, sans prestations inutiles" centered>
          <p>Fée du Ménage se concentre sur les besoins à forte valeur pour les logements lyonnais.</p>
        </SectionHeading>
        <ServiceCards detailed />
        <div className="excluded-services" aria-label="Prestations non proposées">
          {excludedServices.map((service) => <span key={service}>{service}</span>)}
        </div>
      </section>
    </>
  );
}
