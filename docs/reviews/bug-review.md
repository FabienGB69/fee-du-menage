# Revue bugs — Fée du Ménage

## Bugs corrigés

1. **Honeypot inefficace** — le champ `_honeypot` était validé avec `max(0)`, donc un bot qui le remplissait était rejeté avant la branche silencieuse prévue par l’API. Correction : accepter une valeur courte côté schéma, puis retourner `ok: true` si le champ est rempli.
2. **Fausse confirmation email en production** — sans `RESEND_API_KEY`, l’API pouvait répondre `ok` alors qu’aucun email n’était envoyé. Correction : en production, l’envoi Resend est obligatoire; en local il reste désactivable.
3. **Stockage Supabase optionnel mais bloquant** — un échec Supabase pouvait faire échouer tout le formulaire, même si l’email était le canal principal. Correction : l’email est prioritaire; Supabase est tenté ensuite et journalisé sans bloquer la conversion.
4. **XSS dans l’admin chat** — le rendu markdown injectait du HTML sans échappement. Correction : échappement HTML et filtrage des URLs dangereuses avant `dangerouslySetInnerHTML`.
5. **JSON invalide dans l’auth admin** — un body non JSON pouvait provoquer une 500. Correction : parsing défensif et réponse 400.
6. **Lockfile Vercel obsolète** — `package-lock.json` ne correspondait plus à `package.json`, ce qui force des installations incohérentes sur Vercel. Correction : suppression du lockfile obsolète; il devra être régénéré depuis une machine avec accès npm.

## À surveiller ensuite

- Ajouter une politique RLS Supabase explicite si `SUPABASE_ANON_KEY` reste utilisé pour l’insertion.
- Ajouter une vraie suite de tests API pour `/api/devis` et `/api/admin/auth` dès que l’installation npm est disponible.
- Régénérer `package-lock.json` via `npm install` dans un environnement qui peut joindre `registry.npmjs.org`.
