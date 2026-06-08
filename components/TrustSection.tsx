import Link from 'next/link'
import { Star } from 'lucide-react'
import { siteConfig } from '@/lib/site'

const testimonials = [
  {
    name: 'Marie-Christine L.',
    text: "Djamila est ponctuelle, efficace et tres soigneuse. Mon appartement n'a jamais ete aussi propre. Je recommande vivement.",
    service: 'Menage regulier',
  },
  {
    name: 'Sophie B.',
    text: 'Excellent service, tres professionnel. Le menage est fait avec soin du detail, je suis ravie du resultat a chaque intervention.',
    service: 'Grand nettoyage',
  },
  {
    name: 'Isabelle M.',
    text: 'Intervention rapide, devis clair, resultat impeccable. Exactement ce que je cherchais pour mon Airbnb a Lyon.',
    service: 'Nettoyage Airbnb',
  },
]

export function TrustSection() {
  return (
    <section className="trust-section section-shell">
      <div className="trust-rating">
        <p className="eyebrow">Ils nous font confiance</p>
        <div className="trust-stars" aria-label="Note 5 sur 5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="w-7 h-7" fill="currentColor" aria-hidden="true" />
          ))}
        </div>
        <p className="trust-stat">{siteConfig.reviews} avis &mdash; Note 5/5</p>
      </div>

      <div className="trust-cards">
        {testimonials.map((t) => (
          <div key={t.name} className="trust-card">
            <p className="trust-card-quote">&ldquo;{t.text}&rdquo;</p>
            <div className="trust-card-author">
              <span className="trust-card-name">{t.name}</span>
              <span className="trust-card-service">{t.service}</span>
            </div>
            <div className="trust-card-stars" aria-label="Note 5 sur 5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4" fill="currentColor" aria-hidden="true" />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="trust-cta">
        <Link href={siteConfig.wecasaUrl} target="_blank" rel="noopener noreferrer">
          Voir tous les avis Wecasa &rarr;
        </Link>
      </div>
    </section>
  )
}
