"use client";

import { useState } from "react";
import QuizStepShell from "@/components/QuizStepShell";
import { addDays, endOfMonthIso, formatLongDate, formatMonthYear, parseIsoDate } from "@/lib/dates";
import { guestTierLabel } from "@/lib/scoring";
import { trackStep } from "@/lib/track";
import type { Answers, Lead } from "@/lib/types";

interface PreRevealFormProps {
  answers: Answers;
  onSubmit: (lead: Lead) => void;
}

interface Question {
  title: string;
  subtitle?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type: "text" | "email" | "tel";
  required: boolean;
  trackName: string;
}

const inputClass =
  "w-full glass-card rounded-xl px-5 py-3.5 text-ink placeholder:text-muted-soft outline-none transition-colors focus:border-accent";

export default function PreRevealForm({ answers, onSubmit }: PreRevealFormProps) {
  const [step, setStep] = useState(0);
  const [eventName, setEventName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const eventDate = formatMonthYear(parseIsoDate(answers.eventDate));
  const deliveryDate = formatLongDate(addDays(endOfMonthIso(answers.eventDate), 7));

  const questions: Question[] = [
    {
      title: "C'est pour quelle entreprise ou quel événement ?",
      subtitle: `Pour ton événement de ${guestTierLabel(answers.guestTier)} invités en ${eventDate}, voici ce qu'on peut te livrer d'ici le ${deliveryDate}.`,
      value: eventName,
      onChange: setEventName,
      placeholder: "Nom de l'entreprise ou de l'événement",
      type: "text",
      required: false,
      trackName: "contact_entreprise",
    },
    {
      title: "C'est à quel nom ?",
      value: firstName,
      onChange: setFirstName,
      placeholder: "Prénom",
      type: "text",
      required: true,
      trackName: "contact_prenom",
    },
    {
      title: "Ton courriel ?",
      subtitle: "On t'y envoie une copie de ton plan.",
      value: email,
      onChange: setEmail,
      placeholder: "Courriel",
      type: "email",
      required: true,
      trackName: "contact_courriel",
    },
    {
      title: "Ton numéro de cellulaire ?",
      subtitle: "On te texte une copie de ton plan. Aucun spam.",
      value: phone,
      onChange: setPhone,
      placeholder: "Cellulaire",
      type: "tel",
      required: true,
      trackName: "contact_telephone",
    },
  ];

  const total = questions.length;
  const current = questions[step];
  const isLast = step === total - 1;
  const canContinue = current.required ? current.value.trim().length > 0 : true;

  const handleContinue = () => {
    if (!canContinue) return;
    trackStep(current.trackName);

    if (!isLast) {
      setStep((s) => s + 1);
      return;
    }

    onSubmit({ firstName, eventName, email, phone });
  };

  return (
    <QuizStepShell
      step={step + 1}
      total={total}
      title={current.title}
      subtitle={current.subtitle}
      onBack={step > 0 ? () => setStep((s) => s - 1) : undefined}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleContinue();
        }}
        className="flex flex-col gap-3"
      >
        <input
          key={step}
          type={current.type}
          required={current.required}
          autoFocus
          placeholder={current.placeholder}
          value={current.value}
          onChange={(e) => current.onChange(e.target.value)}
          className={inputClass}
        />

        <button
          type="submit"
          disabled={!canContinue}
          className="mt-4 w-full rounded-full bg-ink px-6 py-4 text-base font-medium text-ink-contrast transition-opacity disabled:opacity-20"
        >
          {isLast ? "Voir mon plan →" : "Continuer →"}
        </button>
      </form>
    </QuizStepShell>
  );
}
