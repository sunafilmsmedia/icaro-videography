# Keystone Production — quiz de qualification

Logiciel de capture de leads en 8 écrans : date de l'événement → nombre
d'invités → type d'événement (optionnel) → sponsors → chargement →
formulaire → plan livré (vidéo(s) + photos, date de livraison garantie,
garantie 7 jours ou remboursé).

Thème sombre (dégradé noir → vert sauge `#5F9681`), Helvetica (corps,
titres courts en majuscules) + Montserrat (questions/titres longs), accents
en police monospace (JetBrains Mono — substitut libre de CoFo Sans Mono VF,
la police de marque payante vue sur la planche Keystone).

> Le dossier/repo garde le nom `icaro-videography` (choisi avant que la
> marque réelle "Keystone Production" soit connue) — pas renommé pour ne
> pas casser le repo GitHub déjà poussé. Seul le contenu/branding affiché
> dans l'app a changé.

## Démarrer

```bash
npm install
npm run dev
```

## Fichier à éditer pour rebrander

`lib/brand.ts` — nom/titre/région/téléphone du studio, photo/logo, avis
Google, lien de réservation, extraits vidéo (génériques + par type
d'événement), logos d'événements passés.

La grille vidéos/photos est dans `lib/scoring.ts` : toujours 1 vidéo, sauf
si plusieurs sponsors (entre 2 et 4) ; photos = borne haute de la tranche
d'invités × 1.2 (ex. 50 invités → 60 photos). À valider avec le studio.

## Placeholders à remplacer avant mise en ligne

- `public/studio-mark.svg` — logo Keystone Production, reconstruit
  approximativement d'après la planche de marque envoyée (image, pas de
  fichier exporté reçu) — à remplacer par le vrai fichier SVG/PNG dès qu'il
  est disponible.
- `public/sample-*.svg` — vignettes d'extraits vidéo (génériques, par type
  d'événement). Les liens `url: "#"` dans `lib/brand.ts` doivent pointer
  vers de vrais extraits (YouTube/Vimeo/Instagram).
- `lib/brand.ts` → `studio` (région, téléphone, courriel réels),
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
