"use client";

import { getNeighborhood } from "@/lib/streetwheel/data";
import { actions, StreetwheelState } from "@/lib/streetwheel/store";
import { countdown } from "@/lib/streetwheel/util";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, X } from "lucide-react";

interface QuestsPanelProps {
  open: boolean;
  onClose: () => void;
  state: StreetwheelState;
  onSelect: (id: string) => void;
  onUnlock: (id: string) => void;
}

export default function QuestsPanel({
  open,
  onClose,
  state,
  onSelect,
  onUnlock,
}: QuestsPanelProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-neutral-900/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[91] flex h-full w-[340px] flex-col border-l border-neutral-200 bg-white shadow-2xl"
            initial={{ x: 360 }}
            animate={{ x: 0 }}
            exit={{ x: 360 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Active Quests
              </h2>
              <button
                onClick={onClose}
                className="rounded-full p-1 text-neutral-400 hover:bg-neutral-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {state.quests.length === 0 ? (
                <div className="mt-16 text-center text-sm text-neutral-400">
                  No quests yet.
                  <br />
                  Hit{" "}
                  <span className="font-semibold text-[#22C55E]">
                    Surprise Me
                  </span>{" "}
                  after a spin.
                </div>
              ) : (
                <div className="space-y-3">
                  {state.quests.map((q) => {
                    const n = getNeighborhood(q.neighborhoodId);
                    if (!n) return null;
                    return (
                      <div
                        key={q.neighborhoodId}
                        className="rounded-xl border border-neutral-200 p-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-bold text-neutral-900">
                              {n.name}
                            </div>
                            <div className="text-xs text-neutral-500">
                              {n.borough}
                            </div>
                          </div>
                          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                            {countdown(q.expiresAt)}
                          </span>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => {
                              onSelect(q.neighborhoodId);
                              onClose();
                            }}
                            className="flex-1 rounded-lg border border-neutral-300 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                          >
                            View on map
                          </button>
                          <button
                            onClick={() => onUnlock(q.neighborhoodId)}
                            className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-[#22C55E] py-1.5 text-xs font-semibold text-white hover:bg-[#1ea951]"
                          >
                            <MapPin size={12} /> Unlock
                          </button>
                        </div>
                        <button
                          onClick={() => actions.abandonQuest(q.neighborhoodId)}
                          className="mt-1.5 w-full text-[11px] text-neutral-400 hover:text-[#D63838]"
                        >
                          Abandon quest
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
