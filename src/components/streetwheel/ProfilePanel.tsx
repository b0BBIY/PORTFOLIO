"use client";

import {
  BOROUGHS,
  BOROUGH_COLORS,
  NEIGHBORHOODS,
} from "@/lib/streetwheel/data";
import { isUnlocked, StreetwheelState } from "@/lib/streetwheel/store";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface ProfilePanelProps {
  open: boolean;
  state: StreetwheelState;
  onClose: () => void;
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 p-4 text-center">
      <div className="text-3xl font-black text-neutral-900">{value}</div>
      <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
        {label}
      </div>
    </div>
  );
}

export default function ProfilePanel({
  open,
  state,
  onClose,
}: ProfilePanelProps) {
  const myPhotos = state.photos.filter(
    (p) => p.author === (state.user ?? "you")
  );
  const unlockedCount = state.unlocked.length;
  const totalBoroughsDone = BOROUGHS.filter((b) => {
    const inB = NEIGHBORHOODS.filter((n) => n.borough === b);
    return inB.length > 0 && inB.every((n) => isUnlocked(state, n.id));
  }).length;
  const boroughPct = Math.round((totalBoroughsDone / BOROUGHS.length) * 100);

  // bounding box for the heat-map scatter
  const lats = NEIGHBORHOODS.map((n) => n.lat);
  const lngs = NEIGHBORHOODS.map((n) => n.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const W = 320;
  const H = 260;
  const px = (n: { lat: number; lng: number }) => ({
    x: ((n.lng - minLng) / (maxLng - minLng)) * (W - 24) + 12,
    y: (1 - (n.lat - minLat) / (maxLat - minLat)) * (H - 24) + 12,
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] overflow-y-auto bg-white"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: "spring", damping: 30, stiffness: 280 }}
        >
          <div className="mx-auto max-w-4xl px-5 py-6">
            <button
              onClick={onClose}
              className="mb-4 flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-neutral-900"
            >
              <ArrowLeft size={16} /> Back to the wheel
            </button>

            <h1 className="text-3xl font-black text-neutral-900">
              @{state.user ?? "you"}
            </h1>
            <p className="text-sm text-neutral-500">Your map of the city.</p>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat value={unlockedCount} label="Streets unlocked" />
              <Stat value={state.peeked.length} label="Peeked" />
              <Stat value={myPhotos.length} label="Photos uploaded" />
              <Stat value={`${boroughPct}%`} label="Boroughs done" />
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-[340px_1fr]">
              <div>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  Coverage Heat Map
                </h2>
                <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-2">
                  <svg width={W} height={H} className="w-full">
                    {NEIGHBORHOODS.map((n) => {
                      const { x, y } = px(n);
                      const on = isUnlocked(state, n.id);
                      return (
                        <g key={n.id}>
                          <circle
                            cx={x}
                            cy={y}
                            r={on ? 7 : 3.5}
                            fill={
                              on ? BOROUGH_COLORS[n.borough] : "#d4d4d4"
                            }
                            opacity={on ? 0.85 : 0.6}
                          />
                          {on && (
                            <circle
                              cx={x}
                              cy={y}
                              r={12}
                              fill={BOROUGH_COLORS[n.borough]}
                              opacity={0.18}
                            />
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {BOROUGHS.map((b) => (
                    <span
                      key={b}
                      className="flex items-center gap-1 text-[10px] text-neutral-500"
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: BOROUGH_COLORS[b] }}
                      />
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  Your Photos
                </h2>
                {myPhotos.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-neutral-200 py-12 text-center text-sm text-neutral-400">
                    Nothing uploaded yet. Unlock a street and shoot it.
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {myPhotos.map((p) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={p.id}
                        src={p.src}
                        alt={p.caption}
                        className="aspect-square w-full rounded-lg object-cover"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
