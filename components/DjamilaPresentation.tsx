import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export function DjamilaPresentation() {
  return (
    <section className="presentation section-shell" id="djamila">
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flexShrink: 0 }}>
          <Image
            src="/assets/djamila-profil.jpg"
            alt="Djamila, femme de ménage à domicile à Lyon 9e"
            width={160}
            height={160}
            style={{ borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
        </div>
        <div style={{ flex: 1, minWidth: '260px' }}>
          <p className="eyebrow">Présentation</p>
          <h2>Une femme de ménage expérimentée et de confiance</h2>
          <div className="badges" aria-label="Points forts de Djamila" style={{ marginBlock: '1rem' }}>
            <span>30 ans d’expérience</span>
            <span>Discrétion</span>
            <span>Autonomie</span>
            <span>Travail soigné</span>
          </div>
          <p>
            Faire entrer une personne chez soi demande de la confiance. Avec plus de 30 ans d’expérience dans le ménage à
            domicile, Djamila connaît l’importance d’un service sérieux, discret et bien réalisé. Elle intervient directement
            chez vous, à l’horaire convenu, pour un intérieur propre, agréable et confortable.
          </p>
          <div className="why-list" style={{ marginBlock: '1.5rem' }}>
            <div>
              <strong>La discrétion</strong>
              <span>Respect de votre espace et de votre vie privée à chaque intervention.</span>
            </div>
            <div>
              <strong>L’autonomie</strong>
              <span>Un travail efficace et organisé, sans supervision nécessaire.</span>
            </div>
            <div>
              <strong>Le soin du travail bien fait</strong>
              <span>Chaque détail compte pour un résultat propre, net et durable.</span>
            </div>
          </div>
          <p>
            Ménage régulier, intervention ponctuelle, grand nettoyage ou avant un état des lieux — Djamila vous accompagne
            avec professionnalisme et bienveillance à Lyon 9e et dans les alentours.
          </p>
        </div>
      </div>
      <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--line)' }}>
        <p style={{ marginBottom: '1rem' }}>
          Besoin d’aide pour votre ménage à domicile ? Contactez Djamila pour une intervention à Lyon 9e et dans les alentours.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/contact#devis">
            Demander une intervention
          </Link>
          <Link className="btn btn-secondary" href="/services">
            Découvrir les services
          </Link>
          <a className="btn btn-outline" href={siteConfig.phoneHref}>
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
