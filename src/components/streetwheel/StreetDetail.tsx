"use client";

import { Neighborhood } from "@/lib/streetwheel/data";
import {
  isUnlocked,
  photosFor,
  StreetwheelState,
  unlockTimestamp,
} from "@/lib/streetwheel/store";
import { mapEmbedUrl } from "@/lib/streetwheel/util";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Lock, MapPin, Trophy } from "lucide-react";
import PhotoCard from "./PhotoCard";

interface StreetDetailProps {
  neighborhood: Neighborhood | null;
  state: StreetwheelState;
  onClose: () => void;
  onUnlock: (id: string) => void;
}

export default function StreetDetail({
  neighborhood,
  state,
  onClose,
  onUnlock,
}: StreetDetailProps) {
  return (
    <AnimatePresence>
      {neighborhood && (
        <motion.div
          className="fixed inset-0 z-[95] overflow-y-auto bg-white"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: "spring", damping: 30, stiffness: 280 }}
        >
          <Inner
            neighborhood={neighborhood}
            state={state}
            onClose={onClose}
            onUnlock={onUnlock}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Inner({
  neighborhood,
  state,
  onClose,
  onUnlock,
}: {
  neighborhood: Neighborhood;
  state: StreetwheelState;
  onClose: () => void;
  onUnlock: (id: string) => void;
}) {
  const unlocked = isUnlocked(state, neighborhood.id);
  const myUnlockedAt = unlockTimestamp(state, neighborhood.id);
  const photos = photosFor(state, neighborhood.id);

  // first-unlockers leaderboard derived from photo authors + unlock times
  const firstUnlockers = Array.from(
    photos
      .reduce((m, p) => {
        const prev = m.get(p.author);
        if (prev == null || p.unlockedAt < prev) m.set(p.author, p.unlockedAt);
        return m;
      }, new Map<string, number>())
      .entries()
  )
    .sort((a, b) => a[1] - b[1])
    .slice(0, 5);

  return (
    <div className="mx-auto max-w-5xl px-5 py-6">
      <button
        onClick={onClose}
        className="mb-4 flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-neutral-900"
      >
        <ArrowLeft size={16} /> Back to the wheel
      </button>

      <div className="h-56 w-full overflow-hidden rounded-2xl border border-neutral-200">
        <iframe
          title="hero map"
          src={mapEmbedUrl(neighborhood.lat, neighborhood.lng, 15)}
          className="h-full w-full"
          style={{ border: 0 }}
          loading="lazy"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
            {neighborhood.borough} · Rank #{neighborhood.rank}
          </div>
          <h1 className="text-3xl font-black text-neutral-900">
            {neighborhood.name}
          </h1>
        </div>
        {unlocked ? (
          <span className="rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-[#22C55E]">
            Unlocked — you walked it
          </span>
        ) : (
          <button
            onClick={() => onUnlock(neighborhood.id)}
            className="flex items-center gap-1.5 rounded-full bg-[#22C55E] px-4 py-2 text-sm font-bold text-white hover:bg-[#1ea951]"
          >
            <MapPin size={15} /> Unlock this street
          </button>
        )}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_240px]">
        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Photo Feed
          </h2>
          {photos.length === 0 ? (
            <div className="rounded-xl border border-dashed border-neutral-200 py-12 text-center text-sm text-neutral-400">
              No photos here yet. Be the first to shoot it.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {photos.map((p) => (
                <PhotoCard
                  key={p.id}
                  photo={p}
                  state={state}
                  unlocked={unlocked}
                  myUnlockedAt={myUnlockedAt}
                />
              ))}
            </div>
          )}
        </div>

        <aside>
          <h2 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            <Trophy size={13} /> First Unlockers
          </h2>
          {firstUnlockers.length === 0 ? (
            <p className="text-sm text-neutral-400">No one yet.</p>
          ) : (
            <ol className="space-y-2">
              {firstUnlockers.map(([author, ts], i) => (
                <li
                  key={author}
                  className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2"
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      i === 0
                        ? "bg-amber-100 text-amber-700"
                        : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm font-medium text-neutral-800">
                    @{author}
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    {new Date(ts).toLocaleDateString("en-us", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </li>
              ))}
            </ol>
          )}

          {!unlocked && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-neutral-50 p-3 text-xs text-neutral-500">
              <Lock size={14} className="mt-0.5 shrink-0" />
              This street&apos;s stories belong to those who walked it. Unlock
              to like, save and comment.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
