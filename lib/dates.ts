const JOURS = [
  "dimanche",
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
];

const MOIS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

/** Parse une date ISO "yyyy-mm-dd" en Date locale (évite le décalage UTC). */
export function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(iso: string, days: number): Date {
  const date = parseIsoDate(iso);
  date.setDate(date.getDate() + days);
  return date;
}

export function startOfToday(): Date {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

export function isPastDay(date: Date): boolean {
  return date.getTime() < startOfToday().getTime();
}

/** "vendredi 14 novembre 2026" */
export function formatLongDate(date: Date): string {
  return `${JOURS[date.getDay()]} ${date.getDate()} ${MOIS[date.getMonth()]} ${date.getFullYear()}`;
}

/** "14 novembre 2026" */
export function formatShortDate(date: Date): string {
  return `${date.getDate()} ${MOIS[date.getMonth()]} ${date.getFullYear()}`;
}

export const MONTH_NAMES = MOIS;
export const DAY_NAMES_SHORT = ["D", "L", "M", "M", "J", "V", "S"];
