"use client";

import QuizStepShell from "@/components/QuizStepShell";
import { monthIsoDate } from "@/lib/dates";

interface DateStepProps {
  onContinue: (iso: string) => void;
  onBack?: () => void;
}

const MONTH_OPTIONS = [
  { label: "Novembre 2026", month: 10 },
  { label: "Décembre 2026", month: 11 },
  { label: "Janvier 2027", month: 0 },
  { label: "Février 2027", month: 1 },
];

export default function DateStep({ onContinue, onBack }: DateStepProps) {
  return (
    <QuizStepShell
      step={1}
      total={4}
      title="Quand a lieu ton événement ?"
      subtitle="On calcule ta date de livraison garantie."
      onBack={onBack}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {MONTH_OPTIONS.map((option) => (
          <button
            key={option.month}
            type="button"
            onClick={() => onContinue(monthIsoDate(option.month))}
            className="glass-card rounded-xl px-6 py-8 text-center text-lg font-medium text-ink transition-colors hover:border-accent hover:bg-surface-hover"
          >
            {option.label}
          </button>
        ))}
      </div>
    </QuizStepShell>
  );
}
