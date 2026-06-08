# AGENTS.md

## Objectif
Réduire les tokens et éviter les lectures inutiles.

## Règles
- Lire d'abord README.md, package.json, puis uniquement les fichiers nécessaires.
- Ne jamais scanner tout le repo sans raison.
- Utiliser rg/find avant d'ouvrir des fichiers complets.
- Modifier le minimum de fichiers possible.
- Produire des diffs courts.
- Ne pas relire les fichiers inchangés.
- Résumer les décisions dans docs/agent-notes.md si besoin.

## Stack
- Frontend: Next.js / React
- Backend: Supabase
- Emails: Resend
- Déploiement: Vercel

## Fichiers sensibles
- Ne jamais lire ni afficher .env, .env.local, clés API ou secrets.
