import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Avis clients Wecasa 5/5',
  description: 'Fée du Ménage affiche 106 avis clients vérifiés et une note 5/5 sur Wecasa pour les prestations de ménage à Lyon.',
  alternates: { canonical: '/avis' }
};

const allTestimonials = [
  {
    name: 'Pascale',
    location: 'Lyon, 69001',
    service: 'Ménage ponctuel classique',
    date: 'il y a 5 jours',
    text: 'Djamila est parfaite. Travail très soigné et méticuleux.',
    rating: 5
  },
  {
    name: 'Amandine',
    location: 'Lyon, 69006',
    service: 'Ménage ponctuel classique, Produits ménagers',
    date: 'il y a 2 semaines',
    text: 'Très bonne expérience avec Djamila ! Une personne sérieuse, souriante et arrangeante ! Un grand merci à elle pour son professionnalisme et sa rigueur.',
    rating: 5
  },
  {
    name: 'Patrick',
    location: 'Lyon, 69009',
    service: 'Ménage ponctuel classique',
    date: 'il y a 3 semaines',
    text: "Si d'autres que moi peuvent bénéficier de cette perle, cela va entretenir mon sentiment de jalousie.",
    rating: 5
  },
  {
    name: 'Federica',
    location: 'Lyon, 69009',
    service: 'Grand nettoyage, Produits ménagers',
    date: 'il y a un mois',
    text: 'Ponctuelle, organisée et précise, efficace, sympathique. On recommande vivement !',
    rating: 5
  },
  {
    name: 'Mathieu',
    location: 'Lyon, 69009',
    service: 'Ménage ponctuel classique',
    date: 'il y a 4 semaines',
    text: 'Merci pour le service rendu. Ponctuel et très bon travail. Encore merci.',
    rating: 5
  },
  {
    name: 'Patrick',
    location: 'Lyon, 69009',
    service: 'Grand nettoyage',
    date: 'il y a 4 semaines',
    text: "Je savais que j'avais déniché une perle rare. C'est pour cela que j'ai accepté très volontiers de modifier les horaires pour être sûr de pouvoir bénéficier de ces services. Grâce à elle, l'image de WeCasa remonte.",
    rating: 5
  },
  {
    name: 'Mounia',
    location: 'Charbonnières-Les-Bains, 69260',
    service: 'Ménage ponctuel classique',
    date: 'il y a un mois',
    text: "Super comme d'habitude, un travail rapide, propre, efficace.",
    rating: 5
  }
];

function Stars() {
  return (
    <span aria-label="5 étoiles sur 5" className="flex gap-0.5" style={{ display: 'inline-flex', gap: '2px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill="#F59E0B" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export default function AvisPage() {
  return (
    <>
      {/* Hero / stat section */}
      <section className="section-shell" style={{ paddingBottom: '0' }}>
        <p className="eyebrow" style={{ textAlign: 'center' }}>Avis clients</p>
        <h1 style={{ textAlign: 'center' }}>
          <span
            style={{
              fontSize: 'clamp(3.5rem, 14vw, 7rem)',
              background: 'linear-gradient(135deg, var(--blue), var(--violet) 52%, var(--pink))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'block',
              lineHeight: 1,
              marginBottom: '8px'
            }}
          >
            5/5
          </span>
          106 avis collectés sur{' '}
          <a
            href={siteConfig.wecasaUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--violet)' }}
          >
            Wecasa
          </a>
        </h1>
        <p className="hero-subtitle" style={{ textAlign: 'center', marginInline: 'auto' }}>
          La confiance est essentielle pour une aide ménagère à domicile. Les avis Wecasa permettent de consulter des retours clients vérifiés.
        </p>
        <div className="badges" style={{ justifyContent: 'center', marginTop: '20px' }}>
          <span>106 avis clients</span>
          <span>Note 5/5</span>
          <span>Intervention locale à Lyon</span>
        </div>
        <div className="hero-actions" style={{ justifyContent: 'center', marginTop: '8px' }}>
          <a className="btn btn-primary" href={siteConfig.wecasaUrl} target="_blank" rel="noopener noreferrer">
            Voir les avis Wecasa
          </a>
          <Link className="btn btn-secondary" href="/contact#devis">
            Demander un devis gratuit
          </Link>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="section-shell" aria-label="Témoignages clients">
        <div
          style={{
            display: 'grid',
            gap: '20px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'
          }}
        >
          {allTestimonials.map((t, idx) => (
            <article
              key={idx}
              style={{
                background: 'rgba(255,255,255,0.92)',
                border: '1px solid var(--line)',
                borderRadius: '24px',
                boxShadow: 'var(--shadow)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              {/* Stars + rating + date */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Stars />
                  <span style={{ fontWeight: 800, color: 'var(--ink)' }}>5/5</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{t.date}</span>
              </div>
              {/* Service */}
              <p style={{ margin: 0, fontWeight: 800, fontSize: '0.85rem', color: 'var(--violet)' }}>{t.service}</p>
              {/* Quote */}
              <p style={{ flex: 1, margin: 0, fontStyle: 'italic', color: 'var(--ink)', lineHeight: '1.6' }}>
                &ldquo;{t.text}&rdquo;
              </p>
              {/* Author */}
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)' }}>
                <strong style={{ color: 'var(--ink)' }}>{t.name}</strong> &middot; {t.location}
              </p>
            </article>
          ))}
        </div>

        <p
          style={{
            textAlign: 'center',
            fontSize: '0.85rem',
            color: 'var(--muted)',
            marginTop: '28px'
          }}
        >
          Avis collectés et vérifiés sur{' '}
          <a
            href={siteConfig.wecasaUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--violet)', fontWeight: 700 }}
          >
            Wecasa
          </a>
          . Note globale : <strong>5/5</strong> sur 106 avis.
        </p>
      </section>
    </>
  );
}
