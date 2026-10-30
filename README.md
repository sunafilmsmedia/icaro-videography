# Icaro Videography — quiz de qualification

Logiciel de capture de leads en 7 écrans : date de l'événement → nombre
d'invités → type d'événement (optionnel) → chargement → formulaire → plan
livré (vidéos + photos, date de livraison garantie, garantie 7 jours ou
remboursé).

Fond blanc, texte noir, Instrument Serif (titres) + Inter (corps).

## Démarrer

```bash
npm install
npm run dev
```

## Fichier à éditer pour rebrander

`lib/brand.ts` — nom/titre/région/téléphone du vidéaste, photo, avis Google,
lien de réservation, extraits vidéo (génériques + par type d'événement),
logos d'événements passés.

La grille vidéos/photos par tranche d'invités est dans `lib/scoring.ts`
(`PLAN_GRID`), à valider avec le vidéaste.

## Placeholders à remplacer avant mise en ligne

- `public/videographer.svg` — photo du vidéaste (silhouette générique).
- `public/sample-*.svg` — vignettes d'extraits vidéo (génériques, par type
  d'événement). Les liens `url: "#"` dans `lib/brand.ts` doivent pointer
  vers de vrais extraits (YouTube/Vimeo/Instagram).
- `lib/brand.ts` → `videographer` (nom réel, région, téléphone, courriel),
  `reviews` (vrai lien Google), `bookingUrl` (Calendly ou équivalent).
- `pastEventLogos` est vide → bloc masqué tant qu'aucun logo n'est fourni.

## Intégrations (variables d'environnement)

- `NEXT_PUBLIC_META_PIXEL_ID` — Pixel Meta (vide par défaut).
- `NEXT_PUBLIC_CLARITY_ID` — Microsoft Clarity (vide par défaut).
- `CRM_WEBHOOK_URL` — si défini, chaque lead complété (`app/api/lead/route.ts`)
  y est aussi envoyé en POST JSON `{ lead, answers }`. Sinon, le lead est
  seulement loggué côté serveur.

## Déploiement

Projet Next.js standard, déployable sur Vercel (`npx vercel --prod`) une fois
les placeholders ci-dessus remplacés.
