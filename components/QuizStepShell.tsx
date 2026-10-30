"use client";

import { motion } from "framer-motion";
import ProgressBar from "@/components/ProgressBar";

interface QuizStepShellProps {
  step: number;
  total: number;
  title: string;
  subtitle?: string;
  onBack?: () => void;
  skipHint?: React.ReactNode;
  children: React.ReactNode;
}

export default function QuizStepShell({
  step,
  total,
  title,
  subtitle,
  onBack,
  skipHint,
  children,
}: QuizStepShellProps) {
  return (
    <section className="flex min-h-screen flex-col px-6 py-10">
      <div className="mx-auto w-full max-w-xl">
        <div className="flex items-center gap-4">
          {onBack ? (
            <button
              onClick={onBack}
              aria-label="Retour"
              className="shrink-0 text-xl text-muted transition-colors hover:text-ink"
            >
              ←
            </button>
          ) : (
            <div className="w-5 shrink-0" aria-hidden />
          )}
          <ProgressBar step={step} total={total} />
        </div>

        <motion.div
          key={title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            {title}
          </h2>
          {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}

          <div className="mt-10">{children}</div>

          {skipHint && <div className="mt-6">{skipHint}</div>}
        </motion.div>
      </div>
    </section>
  );
}
