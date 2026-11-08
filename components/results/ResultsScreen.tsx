"use client";

import { motion } from "framer-motion";
import ProofBlock from "@/components/results/ProofBlock";
import { BRAND } from "@/lib/brand";
import { addDays, endOfMonthIso, formatLongDate, formatMonthYear, parseIsoDate } from "@/lib/dates";
import { getPlan } from "@/lib/scoring";
import type { Answers } from "@/lib/types";

interface ResultsScreenProps {
  answers: Answers;
  onRestart: () => void;
}

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
  };
}

export default function ResultsScreen({ answers, onRestart }: ResultsScreenProps) {
  const plan = getPlan(answers.guestTier, answers.hasSponsors);
  const eventDate = formatMonthYear(parseIsoDate(answers.eventDate));
  const deliveryDate = formatLongDate(addDays(endOfMonthIso(answers.eventDate), 7));

  const isRange = plan.videoMin !== plan.videoMax;
  const videoHeadline = isRange
    ? `Entre ${plan.videoMin} et ${plan.videoMax} vidéos`
    : `${plan.videoMin} vidéo`;
  const videoDetail = isRange
    ? `1 vidéo récap de ${plan.recapDuration} + une vidéo dédiée par sponsor mis en valeur`
    : `Vidéo récap de ${plan.recapDuration}`;

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-xl">
        <motion.p {...fadeUp(0)} className="font-display text-3xl text-ink sm:text-4xl">
          Ton plan pour ton événement en {eventDate}
        </motion.p>

        <motion.div {...fadeUp(0.1)} className="mt-8 flex flex-col gap-4">
          <div className="glass-card rounded-2xl p-6">
            <p className="text-lg font-bold uppercase tracking-wide text-ink">
              🎬 {videoHeadline}
            </p>
            <p className="mt-1 text-muted">{videoDetail}</p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <p className="text-lg font-bold uppercase tracking-wide text-ink">
              📸 {plan.photoCountLabel} photos retouchées
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <p className="text-lg font-bold uppercase tracking-wide text-ink">
              📅 Livré au plus tard le {deliveryDate}
            </p>
          </div>

          <div className="rounded-2xl bg-accent p-6 text-ink-contrast">
            <p className="text-lg font-bold uppercase tracking-wide">
              🛡️ Garanti en 7 jours ou remboursé
            </p>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.2)}>
          <ProofBlock eventType={answers.eventType} />
        </motion.div>

        <motion.div {...fadeUp(0.3)} className="mt-10 text-center">
          <a
            href={BRAND.bookingUrl}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-base font-medium text-ink-contrast transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
          >
            Réserver mon plan →
          </a>
          <p className="mt-3 text-sm text-muted">
            Appel de 15 minutes pour confirmer les détails de ton événement.
          </p>
        </motion.div>

        <motion.p {...fadeUp(0.4)} className="font-mono mt-10 text-center text-xs text-muted-soft">
          Livraison en 7 jours de calendrier après l&apos;événement. Les révisions demandées
          après la livraison ne sont pas incluses dans le délai.
        </motion.p>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onRestart}
            className="text-sm text-muted-soft underline-offset-4 hover:text-ink hover:underline"
          >
            Refaire le plan
          </button>
        </div>
      </div>
    </section>
  );
}
