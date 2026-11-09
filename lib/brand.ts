// ─────────────────────────────────────────────────────────────────────────
//  CONFIG DE MARQUE — WHITE LABEL
//  Le SEUL fichier à éditer pour rebrander l'app à un nouveau studio.
//  (+ les images dans /public, + les variables d'environnement pour les
//   intégrations : voir .env.local.example)
//
//  Thème sombre (dégradé noir → vert sauge, voir app/globals.css).
// ─────────────────────────────────────────────────────────────────────────

export interface VideoSample {
  /** Chemin de la vignette dans /public */
  thumbnail: string;
  /** Lien vers l'extrait (YouTube, Vimeo, Instagram...) */
  url: string;
  label: string;
}

export interface ReviewConfig {
  rating: number; // ex. 4.9
  count: number; // ex. 47
  url: string; // lien vers les avis Google
}

export const BRAND = {
  slug: "keystone-production",

  studio: {
    name: "Keystone Production",
    title: "studio vidéo événementiel",
    region: "ta région",
    /** Logo complet (monogramme + nom), fond transparent — pour fond sombre. */
    logoFull: { src: "/keystone-logo-full.png", width: 1080, height: 232 },
    /** Monogramme seul (recadré du logo complet) — pour les petits formats. */
    logoMark: { src: "/keystone-logo-mark.png", width: 240, height: 232 },
    phoneDisplay: "000 000-0000",
    phoneTel: "+10000000000",
    email: "contact@exemple.com",
  },

  reviews: {
    rating: 4.9,
    count: 47,
    url: "#",
  } satisfies ReviewConfig,

  /** Lien de réservation de l'appel de 15 minutes (Calendly, etc.) */
  bookingUrl: "#",

  /** Extraits vidéo génériques (hero + preuve sociale sans type d'événement). */
  videoSamples: [
    {
      thumbnail:
        "https://cdn.loom.com/sessions/thumbnails/2add3323e7e34388bc719776577939b7-2abf76ce4cad5c85.gif",
      url: "https://www.loom.com/share/2add3323e7e34388bc719776577939b7",
      label: "Une nouvelle génération au bon endroit",
    },
    {
      thumbnail:
        "https://cdn.loom.com/sessions/thumbnails/3255fe7f348249338c861d1dc490725c-7935558d26a955f8.gif",
      url: "https://www.loom.com/share/3255fe7f348249338c861d1dc490725c",
      label: "Opening Night — Grand Opening",
    },
  ] satisfies VideoSample[],

  /** Extraits vidéo par type d'événement — utilisés à l'écran résultat si Q3 répondue. */
  videoSamplesByType: {
    corporate: [
      { thumbnail: "/sample-corporate.svg", url: "#", label: "Corporatif / conférence" },
      { thumbnail: "/sample-corporate-2.svg", url: "#", label: "Corporatif / conférence" },
    ],
    launch: [
      { thumbnail: "/sample-launch.svg", url: "#", label: "Lancement" },
      { thumbnail: "/sample-launch-2.svg", url: "#", label: "Lancement" },
    ],
    gala: [
      { thumbnail: "/sample-gala.svg", url: "#", label: "Gala" },
      { thumbnail: "/sample-gala-2.svg", url: "#", label: "Gala" },
    ],
    festival: [
      { thumbnail: "/sample-festival.svg", url: "#", label: "Festival" },
      { thumbnail: "/sample-festival-2.svg", url: "#", label: "Festival" },
    ],
    private: [
      { thumbnail: "/sample-private.svg", url: "#", label: "Événement privé" },
      { thumbnail: "/sample-private-2.svg", url: "#", label: "Événement privé" },
    ],
  } satisfies Record<string, VideoSample[]>,

  /** Logos d'événements passés (clients/organisateurs). Vide = bloc masqué. */
  pastEventLogos: [] as { src: string; alt: string }[],
};
