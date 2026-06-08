# LeanCTX

Helper d’installation de [`yvgude/lean-ctx`](https://github.com/yvgude/lean-ctx) pour réduire les tokens consommés par les agents et éviter les lectures répétées.

## Commandes

Depuis la racine du dépôt :

```bash
npm run leanctx:install
npm run leanctx:setup
npm run leanctx:doctor
```

- `leanctx:install` installe `lean-ctx` via Homebrew, npm global ou Cargo selon ce qui est disponible.
- `leanctx:setup` active les hooks shell et configure les clients IA détectés.
- `leanctx:doctor` vérifie que l’installation est fonctionnelle.

Le fichier `.lean-ctx-id` donne un identifiant stable au projet dans `/workspace` pour éviter les collisions de contexte entre dépôts.
