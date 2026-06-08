import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Award, BadgePercent, FileCheck, MapPin, Star, ThumbsUp } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { TrustSection } from '@/components/TrustSection';
import { DjamilaPresentation } from '@/components/DjamilaPresentation';
import { ProcessSteps } from '@/components/ProcessSteps';
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
    image: 'https://fee-du-menage.fr/images/logo-fee-du-menage-transparent.png',
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
            <Badge variant="secondary"><Star className="w-4 h-4 mr-1" aria-hidden="true" />106 avis clients vérifiés</Badge>
            <Badge variant="secondary"><Award className="w-4 h-4 mr-1" aria-hidden="true" />Note 5/5</Badge>
            <Badge variant="secondary"><BadgePercent className="w-4 h-4 mr-1" aria-hidden="true" />Crédit d’impôt 50 %</Badge>
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
          <div className="hero-img-wrap">
            <Image
              src="/images/hero-aide-menagere-domicile.png"
              alt="Aide ménagère à domicile à Lyon — tablette propre, résultat soigné"
              width={500}
              height={220}
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              priority
            />
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

      <TrustSection />

      <DjamilaPresentation />

      <section className="process section-shell" id="comment-ca-marche" aria-label="Comment ça marche">
        <SectionHeading eyebrow="Comment ça marche" title="Un service simple, en 4 étapes" centered />
        <ProcessSteps />
      </section>

      <section className="ambiance section-shell" aria-label="Résultat d'une prestation de ménage à domicile">
        <div className="ambiance-inner">
          <div className="ambiance-photo-wrap">
            <Image
              src="/images/interieur-propre-lumineux.png"
              alt="Intérieur propre et lumineux après une intervention de ménage à domicile à Lyon"
              fill
              style={{ objectFit: 'cover' }}
              loading="lazy"
              sizes="(max-width: 860px) 100vw, 50vw"
            />
          </div>
          <div className="ambiance-copy">
            <p className="eyebrow">Le résultat</p>
            <h2>Un intérieur propre, lumineux et agréable</h2>
            <p>
              Après chaque intervention, votre logement retrouve toute sa fraîcheur. Sols propres, surfaces dépoussiérées, pièces aérées — un résultat net, durable et immédiatement visible.
            </p>
            <Link className="btn btn-primary" href="/contact#devis">
              Demander une intervention
            </Link>
          </div>
        </div>
      </section>

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
            <Star className="w-6 h-6 text-violet-600" aria-hidden="true" />
            <strong>Travail soigné et méticuleux</strong>
            <span>Chaque intervention vise un résultat propre, net et durable.</span>
          </div>
          <div>
            <ThumbsUp className="w-6 h-6 text-violet-600" aria-hidden="true" />
            <strong>106 avis clients</strong>
            <span>Une preuve sociale solide grâce aux retours de clients Wecasa.</span>
          </div>
          <div>
            <Award className="w-6 h-6 text-violet-600" aria-hidden="true" />
            <strong>Note 5/5</strong>
            <span>Une qualité de service appréciée et régulièrement recommandée.</span>
          </div>
          <div>
            <FileCheck className="w-6 h-6 text-violet-600" aria-hidden="true" />
            <strong>Devis gratuit</strong>
            <span>Vous connaissez le tarif avant de confirmer l’intervention.</span>
          </div>
          <div>
            <BadgePercent className="w-6 h-6 text-violet-600" aria-hidden="true" />
            <strong>Service à la Personne</strong>
            <span>Des prestations à domicile pouvant être éligibles à l’avantage fiscal.</span>
          </div>
          <div>
            <MapPin className="w-6 h-6 text-violet-600" aria-hidden="true" />
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
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="zone">
            <AccordionTrigger>Intervenez-vous dans toute la métropole de Lyon ?</AccordionTrigger>
            <AccordionContent>
              Non, Fée du Ménage intervient uniquement à Lyon et dans un rayon de 8 km autour du 69009. Cette proximité nous permet de garantir un service réactif et de qualité. N’hésitez pas à nous contacter pour vérifier si votre adresse est dans notre zone.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="credit-impot">
            <AccordionTrigger>Puis-je bénéficier du crédit d’impôt ?</AccordionTrigger>
            <AccordionContent>
              Oui, dans le cadre des prestations éligibles au Service à la Personne, vous pouvez bénéficier d’un crédit d’impôt de 50 % sur le montant des prestations. Cela réduit concrètement le coût réel de votre ménage à domicile. Les détails vous seront précisés lors du devis.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="devis">
            <AccordionTrigger>Le devis est-il gratuit ?</AccordionTrigger>
            <AccordionContent>
              Oui, le devis est totalement gratuit et sans engagement. Vous recevez une estimation claire du tarif avant toute intervention. Il suffit de nous contacter par téléphone, email ou via le formulaire en ligne.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="vitres">
            <AccordionTrigger>Faites-vous les vitres ?</AccordionTrigger>
            <AccordionContent>
              Oui, le nettoyage de vitres fait partie de nos prestations à domicile. Cette prestation peut être incluse dans un ménage régulier ou effectuée de façon ponctuelle selon vos besoins. Précisez-le lors de votre demande de devis.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="airbnb">
            <AccordionTrigger>Faites-vous les locations Airbnb ?</AccordionTrigger>
            <AccordionContent>
              Oui, nous proposons un service de ménage adapté aux locations courte durée de type Airbnb. Nous intervenons entre deux séjours pour remettre le logement en état rapidement et soigneusement. Contactez-nous pour un devis spécifique à votre location.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
