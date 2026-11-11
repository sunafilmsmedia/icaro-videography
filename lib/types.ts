export type GuestTier = "under50" | "50to150" | "150to300" | "300plus";

export type EventType =
  | "corporate"
  | "launch"
  | "gala"
  | "festival"
  | "private";

export interface Answers {
  eventDate: string; // ISO "yyyy-mm-dd"
  guestTier: GuestTier;
  eventType?: EventType;
  hasSponsors: boolean;
}

export interface Lead {
  firstName: string;
  eventName: string;
  email: string;
  phone: string;
}

export interface PlanResult {
  guestTier: GuestTier;
  /** 1 vidéo par défaut ; entre 2 et 4 si plusieurs sponsors (videoMin !== videoMax). */
  videoMin: number;
  videoMax: number;
  recapDuration: string; // ex. "60 s"
  photoCount: number;
  photoCountLabel: string; // ex. "360+"
}

export type Stage =
  | "date"
  | "guests"
  | "eventType"
  | "sponsors"
  | "loading"
  | "preReveal"
  | "results";
