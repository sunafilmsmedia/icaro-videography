"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import LoadingScreen from "@/components/LoadingScreen";
import PreRevealForm from "@/components/PreRevealForm";
import DateStep from "@/components/steps/DateStep";
import GuestCountStep from "@/components/steps/GuestCountStep";
import EventTypeStep from "@/components/steps/EventTypeStep";
import SponsorsStep from "@/components/steps/SponsorsStep";
import ResultsScreen from "@/components/results/ResultsScreen";
import { trackLeadWithMatching, trackPixel } from "@/components/MetaPixel";
import { trackStep } from "@/lib/track";
import type { Answers, Lead, Stage } from "@/lib/types";

const LOADING_MS = 2400;

export default function Home() {
  const [stage, setStage] = useState<Stage>("hero");
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [lead, setLead] = useState<Lead | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, [stage]);

  useEffect(() => {
    if (stage !== "loading") return;
    const timeout = setTimeout(() => setStage("preReveal"), LOADING_MS);
    return () => clearTimeout(timeout);
  }, [stage]);

  const goToLoading = () => {
    trackStep("analyse");
    setStage("loading");
  };

  const handleLeadSubmit = async (newLead: Lead) => {
    setLead(newLead);
    trackStep("pre_reveal_complete");
    trackPixel("Lead");
    trackLeadWithMatching({
      email: newLead.email,
      phone: newLead.phone,
      firstName: newLead.firstName,
    });

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead: newLead, answers }),
      });
    } catch {
      // le lead reste capturé côté client même si l'envoi échoue
    }

    setStage("results");
  };

  const restart = () => {
    setAnswers({});
    setLead(null);
    setStage("hero");
  };

  return (
    <main className="min-h-screen text-ink">
      <AnimatePresence mode="wait">
        {stage === "hero" && (
          <motion.div key="hero" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Hero
              onStart={() => {
                trackStep("debut");
                setStage("date");
              }}
            />
          </motion.div>
        )}

        {stage === "date" && (
          <motion.div key="date" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <DateStep
              value={answers.eventDate ?? null}
              onContinue={(iso) => {
                trackStep("date", iso);
                setAnswers((a) => ({ ...a, eventDate: iso }));
                setStage("guests");
              }}
              onBack={() => setStage("hero")}
            />
          </motion.div>
        )}

        {stage === "guests" && (
          <motion.div key="guests" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <GuestCountStep
              onSelect={(tier) => {
                trackStep("invites", tier);
                setAnswers((a) => ({ ...a, guestTier: tier }));
                setStage("eventType");
              }}
              onBack={() => setStage("date")}
            />
          </motion.div>
        )}

        {stage === "eventType" && (
          <motion.div key="eventType" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <EventTypeStep
              onSelect={(type) => {
                trackStep("type_evenement", type);
                setAnswers((a) => ({ ...a, eventType: type }));
                setStage("sponsors");
              }}
              onSkip={() => {
                trackStep("type_evenement", "passe");
                setStage("sponsors");
              }}
              onBack={() => setStage("guests")}
            />
          </motion.div>
        )}

        {stage === "sponsors" && (
          <motion.div key="sponsors" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <SponsorsStep
              onSelect={(hasSponsors) => {
                trackStep("sponsors", hasSponsors ? "oui" : "non");
                setAnswers((a) => ({ ...a, hasSponsors }));
                goToLoading();
              }}
              onBack={() => setStage("eventType")}
            />
          </motion.div>
        )}

        {stage === "loading" && (
          <motion.div key="loading" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <LoadingScreen />
          </motion.div>
        )}

        {stage === "preReveal" &&
          answers.eventDate &&
          answers.guestTier &&
          typeof answers.hasSponsors === "boolean" && (
            <motion.div key="preReveal" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <PreRevealForm answers={answers as Answers} onSubmit={handleLeadSubmit} />
            </motion.div>
          )}

        {stage === "results" &&
          answers.eventDate &&
          answers.guestTier &&
          typeof answers.hasSponsors === "boolean" &&
          lead && (
            <motion.div key="results" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <ResultsScreen answers={answers as Answers} onRestart={restart} />
            </motion.div>
          )}
      </AnimatePresence>
    </main>
  );
}
