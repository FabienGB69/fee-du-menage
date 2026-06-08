import type { Metadata } from 'next';
import Link from 'next/link';
import { QuoteForm } from '@/components/QuoteForm';
import { SectionHeading } from '@/components/SectionHeading';
import { siteConfig, whatsappHref } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Femme de ménage à domicile à Lyon 9e | Djamila',
  description:
    'Djamila propose ses services de femme de ménage à domicile à Lyon 9e et dans un rayon de 8 km. Ménage régulier, ponctuel, grand nettoyage et état des lieux.',
  alternates: { canonical: '/femme-de-menage-lyon-9' }
};

export default function FemmeDeMenuageLyon9Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Femme de ménage à domicile à Lyon 9e',
    description:
      "Djamila propose des services de ménage à domicile à Lyon 9e Arrondissement et dans un rayon d’environ 8 km : ménage régulier, ménage ponctuel, grand nettoyage et ménage état des lieux.",
    areaServed: { '@type': 'Place', name: 'Lyon 9e Arrondissement et alentours' },
    provider: {
      '@type': 'LocalBusiness',
      name: 'Djamila – Ménage à domicile',
      telephone: '+33609896564',
      email: siteConfig.email,
      address: { '@type': 'PostalAddress', postalCode: '69009', addressLocality: 'Lyon', addressCountry: 'FR' },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: String(siteConfig.reviews), bestRating: '5' }
    },
    serviceType: ['Ménage régulier', 'Ménage ponctuel', 'Grand nettoyage', 'Ménage état des lieux']
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="page-hero section-shell compact-hero">
        <p className="eyebrow">Femme de ménage locale • Lyon 9e Arrondissement</p>
        <h1>Femme de ménage à domicile à Lyon 9e Arrondissement</h1>
        <p className="hero-subtitle">
          Djamila vous accompagne pour l’entretien de votre logement à Lyon 9e et dans les alentours : ménage régulier,
          ménage ponctuel, grand nettoyage et ménage état des lieux.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="#demande">Demander une prestation</Link>
          <Link className="btn btn-secondary" href="#services">Voir les services</Link>
          <a className="btn btn-whatsapp" href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </section>

      <section className="services section-shell" id="services">
        <SectionHeading eyebrow="Prestations proposées" title="Des services de ménage adaptés à vos besoins" centered>
          <p>Chaque logement est différent. Les prestations sont adaptées selon vos attentes, votre rythme de vie et le niveau d’entretien souhaité.</p>
        </SectionHeading>
        <div className="why-list">
          <div><strong>Ménage régulier classique</strong><span>Un entretien régulier pour un logement toujours propre et agréable.</span></div>
          <div><strong>Ménage ponctuel classique</strong><span>Une intervention occasionnelle selon vos besoins du moment.</span></div>
          <div><strong>Grand nettoyage</strong><span>Un nettoyage plus complet et approfondi pour remettre le logement à niveau.</span></div>
          <div><strong>Ménage avant ou après état des lieux</strong><span>Un logement propre pour faciliter la remise des clés ou l’emménagement.</span></div>
        </div>
      </section>

      <section className="section-shell">
        <h2>Ménage régulier à domicile à Lyon 9e</h2>
        <p>Le ménage régulier est idéal pour maintenir votre logement propre tout au long de l’année. Le rythme d’intervention peut être adapté : chaque semaine, toutes les deux semaines ou selon vos disponibilités.</p>
        <ul>
          <li>Dépoussiérage des meubles et surfaces</li>
          <li>Nettoyage des sols</li>
          <li>Entretien de la cuisine</li>
          <li>Nettoyage de la salle de bain</li>
          <li>Entretien des sanitaires</li>
          <li>Rangement léger des pièces de vie</li>
          <li>Vidage des poubelles</li>
        </ul>
      </section>

      <section className="section-shell">
        <h2>Ménage ponctuel pour un besoin occasionnel</h2>
        <p>Vous avez besoin d’un coup de main ponctuel ? Djamila intervient pour des prestations de ménage ponctuel à Lyon 9e et dans les alentours.</p>
        <ul>
          <li>Après une période chargée</li>
          <li>Avant de recevoir des invités</li>
          <li>Après des vacances</li>
          <li>Après un déménagement</li>
          <li>Pour remettre un logement propre rapidement</li>
        </ul>
      </section>

      <section className="section-shell">
        <h2>Grand nettoyage à domicile</h2>
        <p>Le grand nettoyage est une prestation plus complète, adaptée aux logements nécessitant un nettoyage plus approfondi.</p>
        <ul>
          <li>Nettoyage de printemps</li>
          <li>Logement peu entretenu pendant une période</li>
          <li>Remise en état avant occupation</li>
          <li>Nettoyage approfondi des pièces</li>
          <li>Besoin d’un entretien plus poussé</li>
        </ul>
      </section>

      <section className="section-shell">
        <h2>Ménage avant ou après état des lieux</h2>
        <p>Djamila peut intervenir pour nettoyer le logement avant la remise des clés ou après un déménagement.</p>
        <ul>
          <li>Appartements et maisons</li>
          <li>Logements en location</li>
          <li>Biens destinés à la relocation</li>
          <li>Logements avant emménagement</li>
        </ul>
      </section>

      <section className="area section-shell" id="zone">
        <div className="area-card">
          <div>
            <p className="eyebrow">Zone d’intervention</p>
            <h2>Lyon 9e et alentours, rayon d’environ 8 km</h2>
            <p>Djamila intervient principalement à Lyon 9e Arrondissement et dans les secteurs proches : Vaise, Gorge de Loup, Saint-Rambert, Écully, Tassin-la-Demi-Lune, Champagne-au-Mont-d’Or, Lyon 5e et Lyon 4e.</p>
          </div>
          <a className="btn btn-primary" href={siteConfig.phoneHref}>Vérifier ma disponibilité</a>
        </div>
      </section>

      <section className="why section-shell" id="pourquoi">
        <SectionHeading eyebrow="Pourquoi choisir Djamila ?" title="Un service de ménage à domicile de proximité, humain et adapté" />
        <div className="why-list">
          <div><strong>Intervention locale à Lyon 9e</strong><span>Un service de proximité dans votre arrondissement.</span></div>
          <div><strong>30 ans d’expérience</strong><span>Un métier exercé avec sérieux, passion et souci du détail.</span></div>
          <div><strong>106 avis vérifiés – Note 5/5</strong><span>Une réputation construite sur la qualité et la ponctualité.</span></div>
          <div><strong>Prestations adaptées</strong><span>Régulier ou ponctuel selon votre organisation.</span></div>
          <div><strong>Crédit d’impôt 50 %</strong><span>Prestations pouvant être éligibles au Service à la Personne.</span></div>
          <div><strong>Horaires flexibles</strong><span>Selon vos disponibilités et vos contraintes.</span></div>
        </div>
      </section>

      <section className="quote section-shell" id="demande">
        <SectionHeading eyebrow="Demander une prestation" title="Organiser une intervention de ménage à domicile à Lyon 9e" centered>
          <p>Précisez votre besoin : type de prestation, adresse, surface, fréquence souhaitée et créneaux disponibles.</p>
        </SectionHeading>
        <QuoteForm />
      </section>

      <section className="faq section-shell" id="faq">
        <SectionHeading eyebrow="Questions fréquentes" title="FAQ – Femme de ménage à Lyon 9e" centered />
        <div className="faq-list">
          <details>
            <summary>Quel type de ménage propose Djamila à Lyon 9e ?</summary>
            <p>Djamila propose du ménage régulier, du ménage ponctuel, du grand nettoyage et du ménage avant ou après état des lieux.</p>
          </details>
          <details>
            <summary>Dans quelle zone intervient Djamila ?</summary>
            <p>Djamila intervient principalement à Lyon 9e Arrondissement et dans un rayon d’environ 8 km autour de son secteur, selon les disponibilités.</p>
          </details>
          <details>
            <summary>Peut-on demander une intervention ponctuelle ?</summary>
            <p>Oui, il est possible de demander une intervention ponctuelle pour un besoin occasionnel, un nettoyage avant réception, après déménagement ou pour remettre un logement en ordre.</p>
          </details>
          <details>
            <summary>Djamila propose-t-elle du ménage régulier ?</summary>
            <p>Oui, Djamila peut intervenir régulièrement à domicile selon vos besoins et les créneaux disponibles.</p>
          </details>
          <details>
            <summary>Le ménage état des lieux est-il possible ?</summary>
            <p>Oui, Djamila peut intervenir pour un nettoyage avant ou après état des lieux, notamment lors d’un déménagement ou d’une remise en location.</p>
          </details>
        </div>
      </section>
    </>
  );
}
