"use client";

import { Neighborhood } from "@/lib/streetwheel/data";
import { Dice5, Eye } from "lucide-react";
import CityMap from "./CityMap";
import Modal from "./Modal";

interface SpinResultModalProps {
  open: boolean;
  neighborhood: Neighborhood | null;
  onClose: () => void;
  onPeek: () => void;
  onSurprise: () => void;
}

export default function SpinResultModal({
  open,
  neighborhood,
  onClose,
  onPeek,
  onSurprise,
}: SpinResultModalProps) {
  return (
    <Modal open={open} onClose={onClose} size="max-w-lg">
      {neighborhood && (
        <div className="p-6">
          <div className="text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
              The wheel landed on
            </div>
            <h2 className="mt-1 text-3xl font-black text-neutral-900">
              {neighborhood.name}
            </h2>
            <div className="mt-0.5 text-sm text-neutral-500">
              {neighborhood.borough} · Rank #{neighborhood.rank}
            </div>
          </div>

          <div className="mt-4 h-40 overflow-hidden rounded-xl border border-neutral-200">
            <CityMap
              neighborhood={neighborhood}
              zoomed
              className="h-full w-full"
            />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              onClick={onPeek}
              className="flex flex-col items-center gap-1 rounded-xl border border-neutral-300 px-4 py-4 transition-colors hover:bg-neutral-50"
            >
              <Eye className="text-neutral-700" size={22} />
              <span className="text-sm font-bold text-neutral-900">Peek</span>
              <span className="text-center text-[11px] leading-tight text-neutral-500">
                See it in Street View — stays locked to you
              </span>
            </button>
            <button
              onClick={onSurprise}
              className="flex flex-col items-center gap-1 rounded-xl bg-[#22C55E] px-4 py-4 text-white transition-colors hover:bg-[#1ea951]"
            >
              <Dice5 size={22} />
              <span className="text-sm font-bold">Surprise Me</span>
              <span className="text-center text-[11px] leading-tight text-white/85">
                Commit to visiting. No spoilers. 7-day quest.
              </span>
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
