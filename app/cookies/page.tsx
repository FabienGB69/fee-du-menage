import type { Metadata } from 'next'
import { CookiePreferencesPanel } from '@/components/CookiePreferencesPanel'

export const metadata: Metadata = {
  title: 'Gestion des cookies',
  description:
    "Personnalisez vos préférences de cookies sur le site Fée du Ménage : cookies essentiels, mesure d'audience, services tiers et consentement.",
  alternates: { canonical: '/cookies' },
  robots: { index: false },
}

export default function CookiesPage() {
  return (
    <div className="section-shell mentions-legales">
      <h1>Gestion des cookies</h1>

      <section>
        <h2>1. Qu'est-ce qu'un cookie ?</h2>
        <p>
          Un cookie est un petit fichier texte déposé sur votre terminal
          (ordinateur, tablette, smartphone) lors de la visite d'un site
          internet. Il permet au site de mémoriser des informations sur votre
          visite, comme votre langue préférée et d'autres paramètres.
        </p>
        <p>
          Les cookies peuvent être déposés par le site que vous visitez
          (cookies dits « first-party ») ou par des services tiers intégrés
          au site (cookies « third-party »).
        </p>
      </section>

      <section>
        <h2>2. Personnalisation du consentement</h2>
        <p>
          Vous pouvez à tout moment choisir les catégories de cookies que vous
          acceptez ou refusez. Vos préférences sont enregistrées localement dans
          votre navigateur.
        </p>
        <CookiePreferencesPanel />
      </section>

      <section>
        <h2>3. Cookies strictement nécessaires</h2>
        <p>
          Ces cookies sont indispensables au fonctionnement du site. Ils vous
          permettent d'utiliser les fonctionnalités principales du site, comme
          le formulaire de contact ou de devis. Sans ces cookies, le site ne
          peut pas fonctionner correctement. Ils ne peuvent pas être désactivés.
        </p>
        <p>
          Exemples : mémorisation de vos préférences de cookies, gestion de
          session.
        </p>
      </section>

      <section>
        <h2>4. Cookies de mesure d&apos;audience</h2>
        <p>
          Ces cookies nous permettent de mesurer le nombre de visites et les
          sources de trafic afin d'évaluer et d'améliorer les performances du
          site. Toutes les données collectées sont agrégées et donc anonymisées.
          Si vous n'autorisez pas ces cookies, nous ne saurons pas quand vous
          avez visité notre site.
        </p>
        <p>
          Ces cookies ne sont déposés qu'avec votre consentement préalable.
        </p>
      </section>

      <section>
        <h2>5. Cookies de services tiers</h2>
        <p>
          Le site peut intégrer des services fournis par des tiers (carte
          interactive, formulaire, chat en ligne, etc.). Ces services peuvent
          déposer leurs propres cookies sur votre terminal. Nous vous invitons
          à consulter les politiques de confidentialité de ces services pour
          en savoir plus.
        </p>
      </section>

      <section>
        <h2>6. Cookies publicitaires et marketing</h2>
        <p>
          Ces cookies peuvent être utilisés pour vous présenter des publicités
          personnalisées sur d'autres sites web, basées sur votre navigation
          sur notre site. Ils ne sont déposés qu'avec votre consentement
          explicite.
        </p>
      </section>

      <section>
        <h2>7. Durée de conservation des cookies</h2>
        <p>
          La durée de conservation des cookies varie selon leur nature :
        </p>
        <ul>
          <li>
            <strong>Cookies de session :</strong> supprimés à la fermeture du
            navigateur
          </li>
          <li>
            <strong>Cookies persistants :</strong> conservés pour une durée
            maximale de 13 mois conformément aux recommandations de la CNIL
          </li>
          <li>
            <strong>Mémorisation de vos préférences de cookies :</strong> 6 mois
          </li>
        </ul>
      </section>

      <section>
        <h2>8. Liste des cookies utilisés</h2>
        <p>
          Le tableau ci-dessous recense les cookies susceptibles d'être déposés
          lors de votre visite :
        </p>
        <div className="cookie-table-wrap">
          <table className="cookie-table">
            <thead>
              <tr>
                <th>Nom du cookie</th>
                <th>Fournisseur</th>
                <th>Finalité</th>
                <th>Durée</th>
                <th>Catégorie</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>cookie_consent</code>
                </td>
                <td>Fée du Ménage</td>
                <td>Mémorisation du choix</td>
                <td>6 mois</td>
                <td>Nécessaire</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>9. Comment gérer les cookies depuis votre navigateur ?</h2>
        <p>
          En dehors de notre panneau de préférences, vous pouvez à tout moment
          configurer votre navigateur pour accepter ou refuser les cookies.
          Chaque navigateur propose ses propres paramètres :
        </p>
        <ul>
          <li>
            <strong>Google Chrome :</strong> Menu &gt; Paramètres &gt;
            Confidentialité et sécurité &gt; Cookies et autres données de site
          </li>
          <li>
            <strong>Mozilla Firefox :</strong> Menu &gt; Paramètres &gt;
            Vie privée et sécurité &gt; Cookies et données de site
          </li>
          <li>
            <strong>Safari :</strong> Préférences &gt; Confidentialité &gt;
            Cookies et données de site web
          </li>
          <li>
            <strong>Microsoft Edge :</strong> Menu &gt; Paramètres &gt;
            Cookies et autorisations de site
          </li>
        </ul>
        <p>
          Attention : la désactivation de certains cookies peut nuire au bon
          fonctionnement du site.
        </p>
      </section>
    </div>
  )
}
