"use client";

import QuizStepShell from "@/components/QuizStepShell";
import { GUEST_OPTIONS } from "@/lib/scoring";
import type { GuestTier } from "@/lib/types";

interface GuestCountStepProps {
  onSelect: (tier: GuestTier) => void;
  onBack: () => void;
}

export default function GuestCountStep({ onSelect, onBack }: GuestCountStepProps) {
  return (
    <QuizStepShell
      step={2}
      total={3}
      title="Combien d'invités attends-tu ?"
      subtitle="Ça nous dit combien de moments il faut capter."
      onBack={onBack}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {GUEST_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className="rounded-xl border border-line px-6 py-6 text-left text-lg font-medium transition-colors hover:border-ink hover:bg-surface"
          >
            {option.label}
          </button>
        ))}
      </div>
    </QuizStepShell>
  );
}
