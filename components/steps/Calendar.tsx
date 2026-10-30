"use client";

import { useState } from "react";
import { DAY_NAMES_SHORT, MONTH_NAMES, isPastDay, toIsoDate } from "@/lib/dates";

interface CalendarProps {
  selectedIso: string | null;
  onSelect: (iso: string) => void;
}

function buildMonthGrid(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const startOffset = first.getDay(); // 0 = dimanche
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function Calendar({ selectedIso, onSelect }: CalendarProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const cells = buildMonthGrid(viewYear, viewMonth);
  const todayIso = toIsoDate(today);

  const goToPrevMonth = () => {
    const prev = new Date(viewYear, viewMonth - 1, 1);
    if (prev.getFullYear() === today.getFullYear() && prev.getMonth() < today.getMonth()) return;
    if (prev.getFullYear() < today.getFullYear()) return;
    setViewYear(prev.getFullYear());
    setViewMonth(prev.getMonth());
  };

  const goToNextMonth = () => {
    const next = new Date(viewYear, viewMonth + 1, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  };

  const isPrevDisabled = viewYear === today.getFullYear() && viewMonth === today.getMonth();

  return (
    <div className="rounded-2xl border border-line p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={goToPrevMonth}
          disabled={isPrevDisabled}
          aria-label="Mois précédent"
          className="rounded-full p-2 text-muted transition-colors hover:bg-surface hover:text-ink disabled:opacity-20 disabled:hover:bg-transparent"
        >
          ←
        </button>
        <p className="font-medium">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </p>
        <button
          type="button"
          onClick={goToNextMonth}
          aria-label="Mois suivant"
          className="rounded-full p-2 text-muted transition-colors hover:bg-surface hover:text-ink"
        >
          →
        </button>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1 text-center text-xs text-muted-soft">
        {DAY_NAMES_SHORT.map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={i} />;
          const iso = toIsoDate(date);
          const disabled = isPastDay(date);
          const isSelected = iso === selectedIso;
          const isToday = iso === todayIso;

          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(iso)}
              aria-current={isToday ? "date" : undefined}
              className={`aspect-square rounded-full text-sm transition-colors ${
                isSelected
                  ? "bg-ink font-medium text-white"
                  : disabled
                  ? "text-line cursor-not-allowed"
                  : isToday
                  ? "border border-ink font-medium text-ink hover:bg-surface"
                  : "text-ink hover:bg-surface"
              }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
