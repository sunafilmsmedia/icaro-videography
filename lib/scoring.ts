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

// La grille — à valider avec le vidéaste (voir brief).
const PLAN_GRID: Record<
  GuestTier,
  Omit<PlanResult, "guestTier">
> = {
  under50: {
    videoCount: 3,
    recapDuration: "60 s",
    reelsCount: 2,
    photoCount: 75,
    photoCountLabel: "75",
  },
  "50to150": {
    videoCount: 4,
    recapDuration: "60-90 s",
    reelsCount: 3,
    photoCount: 150,
    photoCountLabel: "150",
  },
  "150to300": {
    videoCount: 5,
    recapDuration: "90 s",
    reelsCount: 4,
    photoCount: 225,
    photoCountLabel: "225",
  },
  "300plus": {
    videoCount: 7,
    recapDuration: "2 min",
    reelsCount: 6,
    photoCount: 300,
    photoCountLabel: "300+",
  },
};

export function getPlan(guestTier: GuestTier): PlanResult {
  return { guestTier, ...PLAN_GRID[guestTier] };
}

export function guestTierLabel(guestTier: GuestTier): string {
  return GUEST_OPTIONS.find((o) => o.value === guestTier)?.label ?? "";
}

export function eventTypeLabel(eventType?: EventType): string | null {
  if (!eventType) return null;
  return EVENT_TYPE_OPTIONS.find((o) => o.value === eventType)?.label ?? null;
}
