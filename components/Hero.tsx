"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import TrustBlock from "@/components/TrustBlock";
import { BRAND } from "@/lib/brand";

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
        <Image
          src={BRAND.studio.logoFull.src}
          alt={BRAND.studio.name}
          width={BRAND.studio.logoFull.width}
          height={BRAND.studio.logoFull.height}
          priority
          className="mx-auto h-9 w-auto sm:h-11"
        />

        <p className="font-mono mt-8 text-xs font-medium uppercase tracking-[0.15em] text-accent sm:text-sm sm:tracking-[0.2em]">
          Vidéo + photos événementielles
        </p>

        <h1 className="font-display mt-6 whitespace-nowrap text-[clamp(1.6rem,7vw,2.75rem)] leading-[1.08]">
          Ta vidéo recap en 7 jours.
          <br />
          <span className="italic">Sinon, c&apos;est gratuit.</span>
        </h1>

        <button
          onClick={onStart}
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-base font-medium text-ink-contrast transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          Voir ma soumission
          <span aria-hidden>→</span>
        </button>
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
