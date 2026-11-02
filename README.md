# Idées utiles — Emmanuel

Formulaire FR/EN, dictée vocale, stockage Cloudflare D1 et tableau de bord privé (`/resultats`).

## Développement

Node.js >=22.13 et pnpm requis. `pnpm install`, puis `pnpm dev`. Appliquer la migration `drizzle/0000_lethal_mesmero.sql` à la base D1 locale avant d’envoyer une réponse. Définir `SURVEY_ADMIN_CODE` dans `.dev.vars` (non versionné) pour accéder aux résultats.

## Déploiement

Créer une base Cloudflare D1, remplacer l’identifiant temporaire dans `vite.config.ts`, appliquer la migration à cette base, puis définir `SURVEY_ADMIN_CODE` comme secret du Worker. Construire avec `pnpm build` et déployer le Worker généré via Wrangler. Mettre à jour `metadataBase` dans `app/layout.tsx` si l’adresse change. Le code seul ne contient ni les réponses déjà reçues ni le secret administrateur.

Avant diffusion large, compléter la notice de confidentialité et revoir la mention « anonyme » dans le formulaire.
