import Image from "next/image";
import { BRAND } from "@/lib/brand";

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span aria-hidden className="text-sm tracking-tight">
      {"★★★★★".slice(0, full)}
      <span className="text-muted-soft">{"★★★★★".slice(full)}</span>
    </span>
  );
}

export default function TrustBlock() {
  const { videographer, reviews, videoSamples, pastEventLogos } = BRAND;

  return (
    <div className="mx-auto mt-16 max-w-3xl">
      <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-4 sm:text-left">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-line">
          <Image
            src={videographer.photo}
            alt={videographer.name}
            fill
            sizes="56px"
            style={{ objectFit: "cover", objectPosition: videographer.objectPosition }}
          />
        </div>
        <div>
          <p className="text-sm font-medium text-ink">
            {videographer.name}, {videographer.title}
          </p>
          <p className="text-sm text-muted">{videographer.region}</p>
        </div>
        <span className="hidden h-8 w-px bg-line sm:block" aria-hidden />
        <a
          href={reviews.url}
          className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
        >
          <Stars rating={reviews.rating} />
          <span>
            {reviews.rating.toFixed(1)} · {reviews.count} avis Google
          </span>
        </a>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        {videoSamples.map((sample) => (
          <a
            key={sample.label}
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

      {pastEventLogos.length > 0 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
          {pastEventLogos.map((logo) => (
            <Image key={logo.alt} src={logo.src} alt={logo.alt} width={120} height={32} />
          ))}
        </div>
      )}
    </div>
  );
}
