# Fée du Ménage

Site vitrine Next.js pour Fée du Ménage, aide ménagère à Lyon 9e et alentours.

## Fonctionnalités

- Page d’accueil orientée conversion avec CTA téléphone et devis.
- Pages dédiées : services, crédit d’impôt, avis et contact.
- Formulaire de devis React envoyé vers `/api/devis`.
- Stockage Supabase configurable dans la table `quote_requests`.
- Email automatique configurable vers Djamila via Resend.
- SEO local : femme de ménage Lyon, aide ménagère Lyon, ménage à domicile Lyon, ménage Lyon 9, nettoyage Airbnb Lyon.

## Variables d’environnement

Copier `.env.example` vers `.env.local` puis renseigner :

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=re_your_api_key
RESEND_FROM="Fée du Ménage <devis@your-domain.fr>"
```

Si Supabase ou Resend ne sont pas configurés, l’API répond toujours en local, mais le stockage et/ou l’envoi email sont désactivés.

## Table Supabase attendue

Le script est disponible dans `supabase/schema.sql`.

```sql
create table quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nom text not null,
  telephone text not null,
  email text not null,
  adresse text not null,
  type_prestation text not null,
  surface_logement text,
  frequence_souhaitee text,
  message text,
  source text default 'site-web'
);
```

## Commandes

```bash
npm install
npm run dev
npm run build
npm run typecheck
```
