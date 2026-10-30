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
}

export interface Lead {
  firstName: string;
  eventName: string;
  email: string;
  phone: string;
}

export interface PlanResult {
  guestTier: GuestTier;
  videoCount: number;
  recapDuration: string; // ex. "60 s"
  reelsCount: number;
  photoCount: number;
  photoCountLabel: string; // ex. "300+"
}

export type Stage =
  | "hero"
  | "date"
  | "guests"
  | "eventType"
  | "loading"
  | "preReveal"
  | "results";
