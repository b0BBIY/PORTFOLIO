"use client";

import { getNeighborhood, NEIGHBORHOODS } from "@/lib/streetwheel/data";
import { actions, useStreetwheel } from "@/lib/streetwheel/store";
import { useMemo, useState } from "react";
import {
  Dice5,
  LayoutGrid,
  Maximize2,
  ScrollText,
  User,
} from "lucide-react";
import Wheel from "./Wheel";
import MapPanel from "./MapPanel";
import DetailCard from "./DetailCard";
import BoroughModal from "./BoroughModal";
import SpinResultModal from "./SpinResultModal";
import PeekModal from "./PeekModal";
import QuestsPanel from "./QuestsPanel";
import UnlockFlow from "./UnlockFlow";
import StreetDetail from "./StreetDetail";
import ProfilePanel from "./ProfilePanel";
import Modal from "./Modal";

export default function Streetwheel() {
  const state = useStreetwheel();

  const items = useMemo(
    () =>
      NEIGHBORHOODS.filter((n) =>
        state.selectedBoroughs.includes(n.borough)
      ),
    [state.selectedBoroughs]
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [spinKey, setSpinKey] = useState(0);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [zoomed, setZoomed] = useState(true);

  const [boroughOpen, setBoroughOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const [peekId, setPeekId] = useState<string | null>(null);
  const [questsOpen, setQuestsOpen] = useState(false);
  const [unlockId, setUnlockId] = useState<string | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [nameDraft, setNameDraft] = useState("");

  const selected = selectedId ? getNeighborhood(selectedId) ?? null : null;

  function handleSpin() {
    if (spinning) return;
    if (!state.user) {
      setSignInOpen(true);
      return;
    }
    if (items.length === 0) return;
    const idx = Math.floor(Math.random() * items.length);
    const target = items[idx];
    if (!target) return;
    setTargetIndex(idx);
    setSelectedId(target.id);
    setSpinning(true);
    setZoomed(true);
    setSpinKey((k) => k + 1);
  }

  function handleSpinComplete() {
    setSpinning(false);
    setResultOpen(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-white font-sans text-neutral-900">
      {/* top bar */}
      <header className="flex items-center gap-3 border-b border-neutral-200 px-5 py-3">
        <span className="text-base font-black tracking-tight">
          STREET<span className="text-[#D63838]">WHEEL</span>
        </span>

        <button
          onClick={handleSpin}
          disabled={spinning}
          className="ml-2 flex items-center gap-1.5 rounded-full bg-[#3B82F6] px-4 py-1.5 text-sm font-bold text-white transition-colors hover:bg-[#2f6fd6] disabled:opacity-60"
        >
          <Dice5 size={15} /> {spinning ? "Spinning…" : "Spin"}
        </button>

        <button
          onClick={() => setZoomed((z) => !z)}
          className="flex items-center gap-1.5 rounded-full bg-[#22C55E] px-3 py-1.5 text-sm font-bold text-white transition-colors hover:bg-[#1ea951]"
        >
          <Maximize2 size={14} /> {zoomed ? "Zoom" : "All"}
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setQuestsOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
          >
            <ScrollText size={14} /> Quests
            {state.quests.length > 0 && (
              <span className="rounded-full bg-amber-100 px-1.5 text-[10px] font-bold text-amber-700">
                {state.quests.length}
              </span>
            )}
          </button>
          <button
            onClick={() =>
              state.user ? setProfileOpen(true) : setSignInOpen(true)
            }
            className="flex items-center gap-1.5 rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
          >
            <User size={14} /> {state.user ? `@${state.user}` : "Sign in"}
          </button>
        </div>
      </header>

      {/* main two-panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* left rail */}
        <div className="relative flex w-[34%] min-w-[300px] max-w-[420px] flex-col border-r border-neutral-200">
          <div className="px-5 pt-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Neighborhoods
            </h2>
          </div>
          <div className="flex-1">
            <Wheel
              items={items}
              selectedId={selectedId}
              spinKey={spinKey}
              targetIndex={targetIndex}
              onSpinComplete={handleSpinComplete}
              onSpin={handleSpin}
              spinning={spinning}
            />
          </div>
          <button
            onClick={() => setBoroughOpen(true)}
            className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm hover:bg-neutral-50"
          >
            <LayoutGrid size={14} /> Boroughs
            <span className="rounded-full bg-neutral-100 px-1.5 text-[10px]">
              {state.selectedBoroughs.length}
            </span>
          </button>
        </div>

        {/* right panel */}
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
          <div>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Map
            </h2>
            <div className="h-[46vh] min-h-[300px]">
              <MapPanel neighborhood={selected} zoomed={zoomed} />
            </div>
          </div>
          <div>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Details
            </h2>
            <DetailCard
              neighborhood={selected}
              state={state}
              onOpenStreet={() => selected && setDetailId(selected.id)}
            />
          </div>
        </div>
      </div>

      {/* modals & overlays */}
      <BoroughModal
        open={boroughOpen}
        onClose={() => setBoroughOpen(false)}
        selected={state.selectedBoroughs}
      />

      <SpinResultModal
        open={resultOpen}
        neighborhood={selected}
        onClose={() => setResultOpen(false)}
        onPeek={() => {
          if (selected) {
            actions.peek(selected.id);
            setPeekId(selected.id);
          }
          setResultOpen(false);
        }}
        onSurprise={() => {
          if (selected) actions.commitQuest(selected.id);
          setResultOpen(false);
        }}
      />

      <PeekModal
        open={!!peekId}
        neighborhood={peekId ? getNeighborhood(peekId) ?? null : null}
        onClose={() => setPeekId(null)}
      />

      <QuestsPanel
        open={questsOpen}
        onClose={() => setQuestsOpen(false)}
        state={state}
        onSelect={(id) => {
          setSelectedId(id);
          setZoomed(true);
        }}
        onUnlock={(id) => {
          setQuestsOpen(false);
          setUnlockId(id);
        }}
      />

      <UnlockFlow
        open={!!unlockId}
        neighborhood={unlockId ? getNeighborhood(unlockId) ?? null : null}
        onClose={() => setUnlockId(null)}
      />

      <StreetDetail
        neighborhood={detailId ? getNeighborhood(detailId) ?? null : null}
        state={state}
        onClose={() => setDetailId(null)}
        onUnlock={(id) => {
          setDetailId(null);
          setUnlockId(id);
        }}
      />

      <ProfilePanel
        open={profileOpen}
        state={state}
        onClose={() => setProfileOpen(false)}
      />

      <Modal
        open={signInOpen}
        onClose={() => setSignInOpen(false)}
        title="Sign in to spin"
      >
        <form
          className="p-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (!nameDraft.trim()) return;
            actions.signIn(nameDraft);
            setSignInOpen(false);
            setNameDraft("");
          }}
        >
          <p className="mb-3 text-sm text-neutral-500">
            Spinning, unlocking and commenting are tied to an account. Pick a
            handle to get started.
          </p>
          <input
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            placeholder="your handle"
            className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-neutral-500"
            autoFocus
          />
          <button
            type="submit"
            className="mt-3 w-full rounded-lg bg-[#3B82F6] py-2.5 text-sm font-bold text-white hover:bg-[#2f6fd6]"
          >
            Start exploring
          </button>
          {state.user && (
            <button
              type="button"
              onClick={() => {
                actions.signOut();
                setSignInOpen(false);
              }}
              className="mt-2 w-full text-center text-xs text-neutral-400 hover:text-[#D63838]"
            >
              Sign out @{state.user}
            </button>
          )}
        </form>
      </Modal>
    </div>
  );
}
