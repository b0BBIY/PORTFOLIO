"use client";

import { Borough, BOROUGHS, BOROUGH_COLORS } from "@/lib/streetwheel/data";
import { actions } from "@/lib/streetwheel/store";
import { Check } from "lucide-react";
import Modal from "./Modal";

interface BoroughModalProps {
  open: boolean;
  onClose: () => void;
  selected: Borough[];
}

export default function BoroughModal({
  open,
  onClose,
  selected,
}: BoroughModalProps) {
  function toggle(b: Borough) {
    const next = selected.includes(b)
      ? selected.filter((x) => x !== b)
      : [...selected, b];
    if (next.length === 0) return; // keep at least one
    actions.setBoroughs(next);
  }

  return (
    <Modal open={open} onClose={onClose} title="Boroughs">
      <div className="p-4">
        <p className="mb-3 text-xs text-neutral-500">
          Pick which boroughs the wheel can land on.
        </p>
        <div className="space-y-1.5">
          {BOROUGHS.map((b) => {
            const on = selected.includes(b);
            return (
              <button
                key={b}
                onClick={() => toggle(b)}
                className="flex w-full items-center gap-3 rounded-lg border border-neutral-200 px-3 py-2.5 text-left transition-colors hover:bg-neutral-50"
              >
                <span
                  className="flex h-5 w-5 items-center justify-center rounded border"
                  style={{
                    borderColor: on ? BOROUGH_COLORS[b] : "#d4d4d4",
                    background: on ? BOROUGH_COLORS[b] : "transparent",
                  }}
                >
                  {on && <Check size={13} className="text-white" />}
                </span>
                <span className="flex-1 text-sm font-medium text-neutral-800">
                  {b}
                </span>
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: BOROUGH_COLORS[b] }}
                />
              </button>
            );
          })}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full rounded-lg bg-neutral-900 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
        >
          Done
        </button>
      </div>
    </Modal>
  );
}
