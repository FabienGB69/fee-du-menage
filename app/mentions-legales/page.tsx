import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mentions légales',
  alternates: { canonical: '/mentions-legales' },
  robots: { index: false },
}

export default function MentionsLegalesPage() {
  return (
    <div className="section-shell mentions-legales">
      <h1>Mentions légales</h1>

      <section>
        <h2>1. Éditeur du site</h2>
        <p>Djamila – Aide ménagère à domicile</p>
        <p>Activité : services d'aide ménagère à domicile</p>
        <p>Zone d'intervention : Lyon 9e Arrondissement et alentours</p>
        <p>Adresse : 55 rue du Bourdonnais, 69009 Lyon</p>
        <p>Téléphone : <a href="tel:+33609896564">06 09 89 65 64</a></p>
        <p>Email : <a href="mailto:prestation.menage69@gmail.com">prestation.menage69@gmail.com</a></p>
        <p>SIRET : [à compléter]</p>
        <p>Responsable de la publication : Djamila</p>
      </section>

      <section>
        <h2>2. Création du site</h2>
        <p>Pixeloria — Création &amp; Refonte de sites pour artisans et PME</p>
        <p>Site web : <a href="https://pixeloria.fr" target="_blank" rel="noopener noreferrer">https://pixeloria.fr</a></p>
        <p>Email : <a href="mailto:contact@pixeloria.fr">contact@pixeloria.fr</a></p>
        <p>Téléphone : 07 86 12 53 13</p>
      </section>

      <section>
        <h2>3. Hébergement</h2>
        <p>Vercel Inc.</p>
        <p>Adresse : 340 Pine Street, Suite 801, San Francisco, CA 94104, États-Unis</p>
        <p>Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">https://vercel.com</a></p>
      </section>

      <section>
        <h2>4. Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus présents sur ce site (textes, images, logos, graphismes, etc.) est la propriété exclusive
          de Djamila ou de ses partenaires, et est protégé par les lois françaises et internationales relatives à la
          propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du
          site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation préalable écrite de Djamila.
        </p>
      </section>

      <section>
        <h2>5. Responsabilité</h2>
        <p>
          Les informations contenues sur ce site sont fournies à titre indicatif. Djamila s'efforce de maintenir les
          informations à jour et exactes, mais ne peut garantir l'exactitude, la complétude ou l'actualité des contenus
          publiés.
        </p>
        <p>
          Djamila ne saurait être tenue responsable des dommages directs ou indirects résultant de l'utilisation de ce site
          ou des informations qu'il contient.
        </p>
      </section>

      <section>
        <h2>6. Liens hypertextes</h2>
        <p>
          Ce site peut contenir des liens vers d'autres sites internet. Djamila n'exerce aucun contrôle sur ces sites et
          décline toute responsabilité quant à leur contenu ou leur fonctionnement.
        </p>
        <p>
          La création de liens hypertextes vers ce site est autorisée sous réserve de ne pas porter atteinte à l'image de
          Djamila et de ses services.
        </p>
      </section>

      <section>
        <h2>7. Données personnelles</h2>
        <p>
          Dans le cadre de l'utilisation de ce site, Djamila peut être amenée à collecter des données personnelles vous
          concernant (nom, prénom, adresse email, numéro de téléphone) via les formulaires de contact ou de demande de
          devis.
        </p>
        <p>
          Ces données sont collectées dans le but de répondre à vos demandes et de vous proposer des prestations de ménage
          adaptées. Elles ne sont pas transmises à des tiers sans votre consentement.
        </p>
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous
          disposez d'un droit d'accès, de rectification, d'effacement et d'opposition concernant vos données personnelles.
        </p>
        <p>
          Pour exercer ces droits, vous pouvez contacter Djamila à l'adresse suivante :{' '}
          <a href="mailto:prestation.menage69@gmail.com">prestation.menage69@gmail.com</a> ou par téléphone au{' '}
          <a href="tel:+33609896564">06 09 89 65 64</a>.
        </p>
      </section>

      <section>
        <h2>8. Cookies</h2>
        <p>
          Ce site peut utiliser des cookies afin d'améliorer l'expérience utilisateur et d'analyser la fréquentation du
          site. En poursuivant votre navigation sur ce site, vous acceptez l'utilisation de cookies.
        </p>
        <p>
          Vous pouvez configurer votre navigateur pour refuser les cookies ou être averti lorsqu'un cookie est envoyé.
          Cependant, certaines fonctionnalités du site pourraient ne pas fonctionner correctement sans cookies.
        </p>
      </section>

      <section>
        <h2>9. Droit applicable et juridiction compétente</h2>
        <p>
          Les présentes mentions légales sont régies par le droit français. En cas de litige, et après échec de toute
          tentative de résolution amiable, les tribunaux français seront seuls compétents.
        </p>
      </section>

      <section>
        <h2>10. Mise à jour</h2>
        <p>
          Les présentes mentions légales peuvent être modifiées à tout moment, notamment en cas de changements légaux ou
          réglementaires. Il est conseillé de les consulter régulièrement.
        </p>
      </section>

      <section>
        <h2>11. Contact</h2>
        <p>Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter :</p>
        <ul>
          <li>
            Par email : <a href="mailto:prestation.menage69@gmail.com">prestation.menage69@gmail.com</a>
          </li>
          <li>
            Par téléphone : <a href="tel:+33609896564">06 09 89 65 64</a>
          </li>
          <li>Par courrier : 55 rue du Bourdonnais, 69009 Lyon</li>
        </ul>
      </section>

      <p style={{ marginTop: '48px', fontSize: '0.85rem', color: 'var(--muted)' }}>
        <Link href="/">← Retour à l'accueil</Link>
      </p>
    </div>
  )
}
