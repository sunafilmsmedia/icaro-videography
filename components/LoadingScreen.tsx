"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const MESSAGES = [
  "On analyse ton événement…",
  "On calcule ce qu'il faut capter…",
  "On prépare ton plan…",
];

export default function LoadingScreen() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => Math.min(i + 1, MESSAGES.length - 1));
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-line border-t-accent" />
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mt-6 text-muted"
        >
          {MESSAGES[index]}
        </motion.p>
      </AnimatePresence>
    </section>
  );
}
