import type { Metadata } from 'next';
import { QuoteForm } from '@/components/QuoteForm';
import { SectionHeading } from '@/components/SectionHeading';
import { siteConfig, whatsappHref } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact et devis gratuit ménage Lyon',
  description: 'Contactez Fée du Ménage à Lyon 9 par téléphone, email ou formulaire de devis gratuit pour une prestation de ménage à domicile.',
  alternates: { canonical: '/contact' }
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero section-shell compact-hero">
        <p className="eyebrow">Contact</p>
        <h1>Demander un devis gratuit</h1>
        <p className="hero-subtitle">Appelez directement ou envoyez une demande : Djamila reçoit automatiquement votre besoin par email.</p>
        <div className="contact-cards">
          <a href={siteConfig.phoneHref}><strong>Téléphone</strong><span>{siteConfig.phoneDisplay}</span></a>
          <a href={`mailto:${siteConfig.email}`}><strong>Email</strong><span>{siteConfig.email}</span></a>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer"><strong>WhatsApp</strong><span>Devis rapide avec message prérempli</span></a>
          <div><strong>Adresse</strong><span>{siteConfig.address}</span></div>
        </div>
      </section>
      <section className="quote section-shell" id="devis">
        <SectionHeading eyebrow="Formulaire devis" title="Décrivez votre besoin de ménage à Lyon" centered>
          <p>La demande est stockée dans Supabase et transmise automatiquement par email lorsque les variables serveur sont configurées.</p>
        </SectionHeading>
        <QuoteForm />
      </section>
    </>
  );
}
