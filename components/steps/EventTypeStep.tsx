"use client";

import QuizStepShell from "@/components/QuizStepShell";
import { EVENT_TYPE_OPTIONS } from "@/lib/scoring";
import type { EventType } from "@/lib/types";

interface EventTypeStepProps {
  onSelect: (type: EventType) => void;
  onSkip: () => void;
  onBack: () => void;
}

export default function EventTypeStep({ onSelect, onSkip, onBack }: EventTypeStepProps) {
  return (
    <QuizStepShell
      step={3}
      total={3}
      title="C'est quel genre d'événement ?"
      onBack={onBack}
      skipHint={
        <button
          type="button"
          onClick={onSkip}
          className="w-full text-center text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          Passer cette question
        </button>
      }
    >
      <div className="flex flex-col gap-3">
        {EVENT_TYPE_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className="rounded-xl border border-line px-6 py-5 text-left text-lg font-medium transition-colors hover:border-ink hover:bg-surface"
          >
            {option.label}
          </button>
        ))}
      </div>
    </QuizStepShell>
  );
}
