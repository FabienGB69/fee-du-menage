import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Données personnelles',
  description:
    "Consultez la politique de gestion des données personnelles du site Fée du Ménage : collecte, finalités, conservation, droits RGPD et contact.",
  alternates: { canonical: '/donnees-personnelles' },
  robots: { index: false },
}

export default function DonneesPersonnellesPage() {
  return (
    <div className="section-shell mentions-legales">
      <h1>Politique de protection des données personnelles</h1>

      <section>
        <h2>1. Responsable du traitement</h2>
        <p>
          Le responsable du traitement des données collectées sur ce site est :
        </p>
        <ul>
          <li>
            <strong>Nom :</strong> Fée du Ménage
          </li>
          <li>
            <strong>SIRET :</strong> [À compléter]
          </li>
          <li>
            <strong>Adresse :</strong> 55 rue du Bourdonnais, 69009 Lyon
          </li>
          <li>
            <strong>Téléphone :</strong>{' '}
            <a href="tel:+33609896564">06 09 89 65 64</a>
          </li>
          <li>
            <strong>E-mail :</strong>{' '}
            <a href="mailto:prestation.menage69@gmail.com">
              prestation.menage69@gmail.com
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2>2. Données collectées</h2>
        <p>
          Dans le cadre de l'utilisation de ce site, les données suivantes
          peuvent être collectées :
        </p>
        <ul>
          <li>Nom et prénom</li>
          <li>Adresse e-mail</li>
          <li>Numéro de téléphone</li>
          <li>Adresse postale (pour la réalisation de la prestation)</li>
          <li>Message libre saisi dans le formulaire de contact ou de devis</li>
          <li>
            Données de navigation (adresse IP, pages visitées, durée de visite)
            via des outils d'analyse d'audience, sous réserve de votre
            consentement
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Finalités de la collecte</h2>
        <p>Les données personnelles collectées sont utilisées pour :</p>
        <ul>
          <li>Répondre aux demandes de devis et de contact</li>
          <li>Organiser et assurer la réalisation des prestations de ménage</li>
          <li>Envoyer des informations commerciales (avec votre consentement)</li>
          <li>
            Mesurer l'audience du site et améliorer son contenu (sous réserve de
            consentement)
          </li>
          <li>Respecter les obligations légales et comptables</li>
        </ul>
      </section>

      <section>
        <h2>4. Base légale du traitement</h2>
        <p>Les traitements reposent sur les bases légales suivantes :</p>
        <ul>
          <li>
            <strong>Exécution d'un contrat :</strong> pour les demandes de
            prestations et la facturation
          </li>
          <li>
            <strong>Intérêt légitime :</strong> pour la gestion des demandes de
            contact et l'amélioration du service
          </li>
          <li>
            <strong>Consentement :</strong> pour l'envoi de communications
            commerciales et la mesure d'audience via cookies
          </li>
          <li>
            <strong>Obligation légale :</strong> pour la conservation de
            certaines données à des fins comptables et fiscales
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Durée de conservation</h2>
        <p>
          Les données sont conservées pour la durée strictement nécessaire aux
          finalités pour lesquelles elles ont été collectées :
        </p>
        <ul>
          <li>
            Données de contact et de devis : 3 ans à compter du dernier contact
          </li>
          <li>
            Données de facturation et comptables : 10 ans conformément aux
            obligations légales
          </li>
          <li>
            Données de navigation (cookies) : selon votre consentement, au
            maximum 13 mois
          </li>
        </ul>
      </section>

      <section>
        <h2>6. Destinataires des données</h2>
        <p>
          Vos données personnelles sont destinées exclusivement à Fée du Ménage
          et ne sont pas cédées à des tiers à des fins commerciales. Elles
          peuvent toutefois être transmises à :
        </p>
        <ul>
          <li>
            Des prestataires techniques (hébergement, messagerie) dans le cadre
            de l'exécution du service
          </li>
          <li>
            Des autorités compétentes en cas d'obligation légale (administration
            fiscale, autorités judiciaires)
          </li>
        </ul>
        <p>
          Les sous-traitants éventuels sont tenus de respecter la
          réglementation applicable en matière de protection des données
          personnelles.
        </p>
      </section>

      <section>
        <h2>7. Sécurité des données</h2>
        <p>
          Des mesures techniques et organisationnelles appropriées sont mises en
          œuvre pour protéger vos données contre tout accès non autorisé,
          divulgation, altération ou destruction. Le site est hébergé sur une
          infrastructure sécurisée et les échanges sont chiffrés via HTTPS.
        </p>
      </section>

      <section>
        <h2>8. Droits des utilisateurs</h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données
          (RGPD) et à la loi Informatique et Libertés, vous disposez des droits
          suivants :
        </p>
        <ul>
          <li>
            <strong>Droit d'accès :</strong> obtenir une copie de vos données
            personnelles
          </li>
          <li>
            <strong>Droit de rectification :</strong> corriger des données
            inexactes ou incomplètes
          </li>
          <li>
            <strong>Droit à l'effacement :</strong> demander la suppression de
            vos données dans les cas prévus par la loi
          </li>
          <li>
            <strong>Droit à la limitation :</strong> restreindre le traitement
            de vos données
          </li>
          <li>
            <strong>Droit à la portabilité :</strong> recevoir vos données dans
            un format structuré
          </li>
          <li>
            <strong>Droit d'opposition :</strong> s'opposer au traitement de vos
            données pour motif légitime
          </li>
          <li>
            <strong>Droit de retrait du consentement :</strong> à tout moment,
            sans remettre en cause la licéité du traitement antérieur
          </li>
        </ul>
        <p>
          Pour exercer ces droits, contactez-nous à l'adresse :{' '}
          <a href="mailto:prestation.menage69@gmail.com">
            prestation.menage69@gmail.com
          </a>
        </p>
        <p>
          Nous nous engageons à répondre à votre demande dans un délai d'un
          mois.
        </p>
      </section>

      <section>
        <h2>9. Réclamation auprès de la CNIL</h2>
        <p>
          Si vous estimez que le traitement de vos données personnelles n'est
          pas conforme à la réglementation, vous avez le droit d'introduire une
          réclamation auprès de la Commission Nationale de l'Informatique et
          des Libertés (CNIL) :{' '}
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.cnil.fr
          </a>
        </p>
      </section>

      <section>
        <h2>10. Modification de la politique</h2>
        <p>
          Cette politique de protection des données personnelles peut être mise
          à jour à tout moment pour refléter les évolutions légales,
          réglementaires ou techniques. La version en vigueur est celle publiée
          sur cette page.
        </p>
        <p>
          <strong>Dernière mise à jour :</strong> [À compléter]
        </p>
      </section>
    </div>
  )
}
