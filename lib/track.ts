// Wrapper sûr pour un tracker d'étape (no-op si rien n'est branché).
// RÈGLE DE VIE PRIVÉE : ne jamais passer de valeur texte libre (nom, courriel,
// téléphone). Uniquement des libellés d'étape et des choix prédéfinis.

declare global {
  interface Window {
    csTrack?: (event: string, data?: Record<string, unknown>) => void;
  }
}

export function trackStep(name: string, value?: string) {
  if (typeof window === "undefined" || typeof window.csTrack !== "function") return;
  try {
    window.csTrack("step", value ? { name, value } : { name });
  } catch {
    // no-op : le tracking ne doit jamais casser l'app
  }
}
