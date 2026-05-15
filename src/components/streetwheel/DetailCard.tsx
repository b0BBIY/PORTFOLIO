"use client";

import { Neighborhood, BOROUGH_COLORS } from "@/lib/streetwheel/data";
import {
  StreetwheelState,
  isUnlocked,
  isPeeked,
  photosFor,
  unlockTimestamp,
} from "@/lib/streetwheel/store";
import { formatCoord, mapsLink } from "@/lib/streetwheel/util";
import { ExternalLink, Lock, Eye, Check } from "lucide-react";

interface DetailCardProps {
  neighborhood: Neighborhood | null;
  state: StreetwheelState;
  onOpenStreet: () => void;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
        {label}
      </div>
      <div className="mt-0.5 text-sm text-neutral-800">{children}</div>
    </div>
  );
}

export default function DetailCard({
  neighborhood,
  state,
  onOpenStreet,
}: DetailCardProps) {
  if (!neighborhood) {
    return (
      <div className="flex h-[148px] items-center justify-center rounded-xl border border-dashed border-neutral-200 text-sm text-neutral-400">
        No street selected — give the wheel a spin.
      </div>
    );
  }

  const unlocked = isUnlocked(state, neighborhood.id);
  const peeked = isPeeked(state, neighborhood.id);
  const photoCount = photosFor(state, neighborhood.id).length;
  const uts = unlockTimestamp(state, neighborhood.id);

  return (
    <div className="flex gap-4 rounded-xl border border-neutral-200 bg-white p-4">
      <div
        className="relative hidden h-32 w-32 shrink-0 overflow-hidden rounded-lg sm:block"
        style={{ background: BOROUGH_COLORS[neighborhood.borough] }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <span className="text-3xl font-black opacity-90">
            {neighborhood.name.slice(0, 2).toUpperCase()}
          </span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest opacity-80">
            {neighborhood.borough}
          </span>
        </div>
        <div className="absolute bottom-1.5 right-1.5">
          {unlocked ? (
            <span className="flex items-center gap-1 rounded-full bg-white/95 px-1.5 py-0.5 text-[9px] font-bold text-[#22C55E]">
              <Check size={10} /> UNLOCKED
            </span>
          ) : peeked ? (
            <span className="flex items-center gap-1 rounded-full bg-white/95 px-1.5 py-0.5 text-[9px] font-bold text-neutral-600">
              <Eye size={10} /> PEEKED
            </span>
          ) : (
            <span className="flex items-center gap-1 rounded-full bg-white/95 px-1.5 py-0.5 text-[9px] font-bold text-neutral-500">
              <Lock size={10} /> LOCKED
            </span>
          )}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold leading-tight text-neutral-900">
            {neighborhood.name}
          </h3>
          <button
            onClick={onOpenStreet}
            className="shrink-0 rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-neutral-700"
          >
            Street page
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-3">
          <Field label="Borough">{neighborhood.borough}</Field>
          <Field label="Area">{neighborhood.area.toFixed(2)} mi²</Field>
          <Field label="Rank">#{neighborhood.rank}</Field>
          <Field label="Centroid">
            {formatCoord(neighborhood.lat, neighborhood.lng)}
          </Field>
          <Field label="Photos">{photoCount}</Field>
          <Field label="Map link">
            <a
              href={mapsLink(neighborhood.lat, neighborhood.lng)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[#3B82F6] hover:underline"
            >
              Open <ExternalLink size={12} />
            </a>
          </Field>
        </div>

        {unlocked && uts && (
          <p className="mt-2 text-[11px] text-[#22C55E]">
            You earned this corner of the city.
          </p>
        )}
      </div>
    </div>
  );
}
