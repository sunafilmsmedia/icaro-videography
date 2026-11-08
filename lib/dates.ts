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

/** ISO du 15e jour du mois choisi (0 = janvier), sur l'année en cours ou la prochaine si le mois est déjà passé. */
export function monthIsoDate(month: number): string {
  const now = new Date();
  const year = month >= now.getMonth() ? now.getFullYear() : now.getFullYear() + 1;
  return toIsoDate(new Date(year, month, 15));
}

/** ISO du dernier jour du mois d'une date ISO donnée, pour un "au plus tard" valide quel que soit le jour réel. */
export function endOfMonthIso(iso: string): string {
  const date = parseIsoDate(iso);
  return toIsoDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));
}

/** "vendredi 14 novembre 2026" */
export function formatLongDate(date: Date): string {
  return `${JOURS[date.getDay()]} ${date.getDate()} ${MOIS[date.getMonth()]} ${date.getFullYear()}`;
}

/** "novembre 2026" */
export function formatMonthYear(date: Date): string {
  return `${MOIS[date.getMonth()]} ${date.getFullYear()}`;
}
