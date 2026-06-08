import Link from 'next/link';
import { siteConfig } from '@/lib/site';

const testimonials = [
  {
    name: 'Pascale',
    location: 'Lyon, 69001',
    service: 'Ménage ponctuel classique',
    text: 'Djamila est parfaite. Travail très soigné et méticuleux.',
    rating: 5
  },
  {
    name: 'Federica',
    location: 'Lyon, 69009',
    service: 'Grand nettoyage, Produits ménagers',
    text: 'Ponctuelle, organisée et précise, efficace, sympathique. On recommande vivement !',
    rating: 5
  },
  {
    name: 'Patrick',
    location: 'Lyon, 69009',
    service: 'Ménage ponctuel classique',
    text: "Si d'autres que moi peuvent bénéficier de cette perle, cela va entretenir mon sentiment de jalousie.",
    rating: 5
  }
];

function StarRating({ count }: { count: number }) {
  return (
    <span aria-label={`${count} étoiles sur 5`} className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill="#F59E0B" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export function TrustSection() {
  return (
    <section className="section-shell" id="avis-clients" aria-label="Avis clients">
      <p className="eyebrow" style={{ textAlign: 'center' }}>Témoignages clients</p>
      <h2 style={{ textAlign: 'center', marginBottom: '12px' }}>Ce que disent nos clients</h2>
      <div
        style={{
          display: 'grid',
          gap: '18px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          marginTop: '32px'
        }}
      >
        {testimonials.map((t) => (
          <article
            key={`${t.name}-${t.location}`}
            style={{
              background: 'rgba(255,255,255,0.92)',
              border: '1px solid var(--line)',
              borderRadius: '24px',
              boxShadow: 'var(--shadow)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <StarRating count={t.rating} />
            <p style={{ flex: 1, fontStyle: 'italic', color: 'var(--ink)', margin: 0, lineHeight: '1.6' }}>
              &ldquo;{t.text}&rdquo;
            </p>
            <footer>
              <p style={{ margin: 0, fontWeight: 800, color: 'var(--ink)' }}>
                {t.name} &middot; <span style={{ color: 'var(--muted)', fontWeight: 400 }}>{t.location}</span>
              </p>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)', marginTop: '4px' }}>{t.service}</p>
            </footer>
          </article>
        ))}
      </div>
      <p
        style={{
          textAlign: 'center',
          fontSize: '0.82rem',
          color: 'var(--muted)',
          marginTop: '18px'
        }}
      >
        Avis collectés sur{' '}
        <a
          href={siteConfig.wecasaUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--violet)', fontWeight: 700 }}
        >
          Wecasa
        </a>{' '}
        &mdash; 106 avis, note 5/5.{' '}
        <Link href="/avis" style={{ color: 'var(--violet)', fontWeight: 700 }}>
          Voir tous les avis
        </Link>
      </p>
    </section>
  );
}
