"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import QuizStepShell from "@/components/QuizStepShell";
import Calendar from "@/components/steps/Calendar";
import { addDays, formatLongDate } from "@/lib/dates";

interface DateStepProps {
  value: string | null;
  onContinue: (iso: string) => void;
  onBack: () => void;
}

export default function DateStep({ value, onContinue, onBack }: DateStepProps) {
  const [selected, setSelected] = useState<string | null>(value);

  const deliveryDate = selected ? formatLongDate(addDays(selected, 7)) : null;

  return (
    <QuizStepShell
      step={1}
      total={4}
      title="Quand a lieu ton événement ?"
      subtitle="On calcule ta date de livraison garantie."
      onBack={onBack}
    >
      <Calendar selectedIso={selected} onSelect={setSelected} />

      <AnimatePresence>
        {deliveryDate && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="glass-card mt-5 rounded-xl px-5 py-4 text-center"
          >
            <p className="font-mono text-sm text-accent">Livraison garantie au plus tard le</p>
            <p className="mt-1 font-medium text-ink">📅 {deliveryDate}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        disabled={!selected}
        onClick={() => selected && onContinue(selected)}
        className="mt-7 w-full rounded-full bg-ink px-6 py-4 text-base font-medium text-ink-contrast transition-opacity disabled:opacity-20"
      >
        Continuer →
      </button>
    </QuizStepShell>
  );
}
