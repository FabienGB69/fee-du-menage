import Image from 'next/image';

export function BrandShowcase() {
  return (
    <section className="brand-showcase section-shell" aria-label="Identité visuelle Fée du Ménage">
      <div className="brand-showcase-copy">
        <p className="eyebrow">Identité Fée du Ménage</p>
        <h2>Votre maison étincelante, avec une image rassurante et professionnelle</h2>
        <p>
          Le logo met en avant l’univers de la fée du ménage, la maison, les étincelles et les couleurs bleu, violet et rose pour une présence mémorable sans surcharger le design.
        </p>
      </div>
      <div className="brand-logo-gallery" aria-label="Logo Fée du Ménage">
        <div className="brand-logo-main">
          <Image src="/assets/logo-fee-du-menage.svg" alt="Logo Fée du Ménage - votre maison étincelante" width={420} height={420} />
        </div>
        <div className="brand-logo-thumbs" aria-hidden="true">
          <Image src="/assets/logo-fee-du-menage.svg" alt="" width={92} height={92} />
          <Image src="/assets/logo-fee-du-menage.svg" alt="" width={118} height={118} />
          <Image src="/assets/logo-fee-du-menage.svg" alt="" width={92} height={92} />
        </div>
      </div>
    </section>
  );
}
