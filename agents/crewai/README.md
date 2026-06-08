# CrewAI — Fée du Ménage

Workspace Python isolé pour installer et exécuter CrewAI sans mélanger les dépendances Python avec l’application Next.js.

## Prérequis

CrewAI requiert Python `>=3.10` et `<3.14`. Le fichier `.python-version` force Python `3.13` afin d’éviter l’interpréteur Python `3.14`, non supporté par CrewAI.

## Installation

Depuis la racine du dépôt :

```bash
npm run crewai:install
```

Ou directement dans ce dossier :

```bash
uv sync --python 3.13
```

## Vérification

```bash
npm run crewai:check
```

Cette commande importe CrewAI depuis l’environnement `uv` et affiche la version installée.

## Lancer le squelette local

```bash
npm run crewai:run
```

Le script local est volontairement minimal : il valide que l’environnement CrewAI est disponible et sert de point d’entrée pour ajouter ensuite des agents de revue de bugs, SEO ou maintenance.
