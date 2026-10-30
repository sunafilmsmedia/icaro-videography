import Image from "next/image";
import { BRAND } from "@/lib/brand";
import type { EventType } from "@/lib/types";

interface ProofBlockProps {
  eventType?: EventType;
}

export default function ProofBlock({ eventType }: ProofBlockProps) {
  const samples = eventType
    ? BRAND.videoSamplesByType[eventType] ?? BRAND.videoSamples
    : BRAND.videoSamples;

  return (
    <div className="mt-10">
      <p className="font-mono text-sm text-muted">
        Voici ce que d&apos;autres organisateurs ont reçu en 7 jours.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {samples.map((sample, i) => (
          <a
            key={`${sample.label}-${i}`}
            href={sample.url}
            className="group relative aspect-video overflow-hidden rounded-lg border border-line"
          >
            <Image
              src={sample.thumbnail}
              alt={`Extrait vidéo — ${sample.label}`}
              fill
              sizes="200px"
              className="transition-transform duration-500 group-hover:scale-105"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
