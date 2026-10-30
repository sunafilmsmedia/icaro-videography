"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { addDays, formatShortDate, parseIsoDate } from "@/lib/dates";
import { guestTierLabel } from "@/lib/scoring";
import type { Answers, Lead } from "@/lib/types";

interface PreRevealFormProps {
  answers: Answers;
  onSubmit: (lead: Lead) => void;
}

export default function PreRevealForm({ answers, onSubmit }: PreRevealFormProps) {
  const [firstName, setFirstName] = useState("");
  const [eventName, setEventName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const eventDate = formatShortDate(parseIsoDate(answers.eventDate));
  const deliveryDate = formatShortDate(addDays(answers.eventDate, 7));

  const canSubmit = firstName.trim() && email.trim() && phone.trim();

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <p className="font-serif-display text-3xl">Ton plan est prêt ✅</p>

        <p className="mt-4 text-muted">
          Pour un événement de{" "}
          <span className="font-medium text-ink">{guestTierLabel(answers.guestTier)}</span>{" "}
          invités le <span className="font-medium text-ink">{eventDate}</span>, voici ce
          qu&apos;on peut te livrer d&apos;ici le{" "}
          <span className="font-medium text-ink">{deliveryDate}</span>.
        </p>

        <p className="mt-8 text-sm font-medium uppercase tracking-[0.15em] text-muted">
          Où on t&apos;envoie ton plan ?
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!canSubmit) return;
            onSubmit({ firstName, eventName, email, phone });
          }}
          className="mt-4 flex flex-col gap-3"
        >
          <input
            type="text"
            required
            placeholder="Prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="rounded-xl border border-line px-5 py-3.5 outline-none transition-colors focus:border-ink"
          />
          <input
            type="text"
            placeholder="Nom de l'entreprise ou de l'événement"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="rounded-xl border border-line px-5 py-3.5 outline-none transition-colors focus:border-ink"
          />
          <input
            type="email"
            required
            placeholder="Courriel"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-line px-5 py-3.5 outline-none transition-colors focus:border-ink"
          />
          <input
            type="tel"
            required
            placeholder="Cellulaire"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-xl border border-line px-5 py-3.5 outline-none transition-colors focus:border-ink"
          />

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-2 w-full rounded-full bg-ink px-6 py-4 text-base font-medium text-white transition-opacity disabled:opacity-20"
          >
            Voir mon plan →
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-soft">
          On te texte une copie de ton plan. Aucun spam.
        </p>
      </motion.div>
    </section>
  );
}
