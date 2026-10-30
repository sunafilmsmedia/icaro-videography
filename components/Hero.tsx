"use client";

import { motion } from "framer-motion";
import TrustBlock from "@/components/TrustBlock";

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
          Vidéo + photos événementielles
        </p>

        <h1 className="font-serif-display mt-6 text-4xl leading-[1.08] sm:text-6xl">
          Ta vidéo et tes photos livrées en 7 jours.
          <br />
          <span className="italic">Sinon, on te rembourse.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-lg text-muted">
          Réponds à 2 questions et découvre exactement ce que tu vas recevoir
          pour ton événement.
        </p>

        <button
          onClick={onStart}
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-base font-medium text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          Voir mon plan
          <span aria-hidden>→</span>
        </button>

        <p className="mt-4 text-sm text-muted-soft">
          30 secondes · Gratuit · Sans engagement
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <TrustBlock />
      </motion.div>
    </section>
  );
}
