interface ProgressBarProps {
  step: number; // 1-indexed
  total: number;
}

export default function ProgressBar({ step, total }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-2" aria-label={`Étape ${step} sur ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
            i < step ? "bg-accent" : "bg-line"
          }`}
        />
      ))}
    </div>
  );
}
