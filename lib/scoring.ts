import type { EventType, GuestTier, PlanResult } from "./types";

export const GUEST_OPTIONS: { value: GuestTier; label: string }[] = [
  { value: "under50", label: "Moins de 50" },
  { value: "50to150", label: "50 à 150" },
  { value: "150to300", label: "150 à 300" },
  { value: "300plus", label: "300 et plus" },
];

export const EVENT_TYPE_OPTIONS: { value: EventType; label: string }[] = [
  { value: "corporate", label: "Corporatif / conférence" },
  { value: "launch", label: "Lancement / soirée d'entreprise" },
  { value: "gala", label: "Gala / remise de prix" },
  { value: "festival", label: "Festival / spectacle" },
  { value: "private", label: "Événement privé" },
];

// Durée du récap selon la taille de l'événement — à valider avec le vidéaste.
const RECAP_DURATION: Record<GuestTier, string> = {
  under50: "60 s",
  "50to150": "60-90 s",
  "150to300": "90 s",
  "300plus": "2 min",
};

// Borne haute de la tranche d'invités, utilisée comme base du calcul photo.
const GUEST_BOUNDARY: Record<GuestTier, number> = {
  under50: 50,
  "50to150": 150,
  "150to300": 300,
  "300plus": 300,
};

// Environ 1.2 photo retouchée par invité (ex. 50 invités → 60 photos).
const PHOTO_PER_GUEST = 1.2;

export function getPlan(guestTier: GuestTier, hasSponsors: boolean): PlanResult {
  const photoCount = Math.round(GUEST_BOUNDARY[guestTier] * PHOTO_PER_GUEST);

  return {
    guestTier,
    videoMin: hasSponsors ? 2 : 1,
    videoMax: hasSponsors ? 4 : 1,
    recapDuration: RECAP_DURATION[guestTier],
    photoCount,
    photoCountLabel: guestTier === "300plus" ? `${photoCount}+` : `${photoCount}`,
  };
}

export function guestTierLabel(guestTier: GuestTier): string {
  return GUEST_OPTIONS.find((o) => o.value === guestTier)?.label ?? "";
}

export function eventTypeLabel(eventType?: EventType): string | null {
  if (!eventType) return null;
  return EVENT_TYPE_OPTIONS.find((o) => o.value === eventType)?.label ?? null;
}
