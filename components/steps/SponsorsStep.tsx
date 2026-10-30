"use client";

import QuizStepShell from "@/components/QuizStepShell";

interface SponsorsStepProps {
  onSelect: (hasSponsors: boolean) => void;
  onBack: () => void;
}

export default function SponsorsStep({ onSelect, onBack }: SponsorsStepProps) {
  return (
    <QuizStepShell
      step={4}
      total={4}
      title="Avez-vous plusieurs sponsors ?"
      subtitle="Ça change le nombre de vidéos qu'on te recommande."
      onBack={onBack}
    >
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onSelect(true)}
          className="glass-card rounded-xl px-6 py-6 text-lg font-medium text-ink transition-colors hover:border-accent hover:bg-surface-hover"
        >
          Oui
        </button>
        <button
          type="button"
          onClick={() => onSelect(false)}
          className="glass-card rounded-xl px-6 py-6 text-lg font-medium text-ink transition-colors hover:border-accent hover:bg-surface-hover"
        >
          Non
        </button>
      </div>
    </QuizStepShell>
  );
}
