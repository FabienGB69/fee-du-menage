# OpenHuman

Helper d’installation OpenHuman pour le poste de développement.

OpenHuman est une application desktop : elle ne doit pas être ajoutée comme dépendance runtime de ce site Next.js. Le script local `install.sh` utilise les chemins d’installation recommandés via gestionnaires de paquets natifs quand ils sont disponibles.

## Commandes

Depuis la racine du dépôt :

```bash
npm run openhuman:install
npm run openhuman:repo
```

- `openhuman:install` installe l’application desktop via Homebrew sur macOS ou apt signé sur Debian/Ubuntu.
- `openhuman:repo` affiche l’URL du dépôt source vérifié pour consultation ou clone manuel.

> Note environnement : dans ce conteneur, le clone GitHub et PyPI/npm sont bloqués par le tunnel réseau. Le script est donc ajouté au dépôt pour une installation reproductible sur une machine avec accès réseau normal.
