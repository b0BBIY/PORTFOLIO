"use client";

import { actions, Photo, StreetwheelState } from "@/lib/streetwheel/store";
import { timeAgo, PHOTO_FALLBACK } from "@/lib/streetwheel/util";
import { Bookmark, Heart, Lock, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

interface PhotoCardProps {
  photo: Photo;
  state: StreetwheelState;
  unlocked: boolean;
  myUnlockedAt?: number | undefined;
}

export default function PhotoCard({
  photo,
  state,
  unlocked,
  myUnlockedAt,
}: PhotoCardProps) {
  const me = state.user ?? "you";
  const liked = photo.likedBy.includes(me);
  const saved = photo.savedBy.includes(me);
  const [showComments, setShowComments] = useState(false);
  const [draft, setDraft] = useState("");

  function gatedAlert() {
    /* no-op — the lock UI explains it */
  }

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.src}
        alt={photo.caption}
        className="aspect-[4/3] w-full object-cover"
        loading="lazy"
        onError={(e) => {
          if (e.currentTarget.src !== PHOTO_FALLBACK)
            e.currentTarget.src = PHOTO_FALLBACK;
        }}
      />
      <div className="p-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-neutral-900">
            @{photo.author}
          </span>
          <span className="text-[11px] text-neutral-400">
            {timeAgo(photo.createdAt)}
          </span>
        </div>
        <p className="mt-1 text-sm text-neutral-700">{photo.caption}</p>
        <div className="mt-1 flex flex-wrap gap-x-3 text-[11px] text-neutral-400">
          <span>{photo.gear}</span>
          <span>·</span>
          <span>{photo.conditions}</span>
        </div>

        <div className="mt-3 flex items-center gap-4 border-t border-neutral-100 pt-2.5">
          {unlocked ? (
            <>
              <button
                onClick={() => actions.toggleLike(photo.id)}
                className={`flex items-center gap-1 text-sm ${
                  liked ? "text-[#D63838]" : "text-neutral-500"
                }`}
              >
                <Heart size={16} fill={liked ? "#D63838" : "none"} />
                {photo.likedBy.length}
              </button>
              <button
                onClick={() => setShowComments((v) => !v)}
                className="flex items-center gap-1 text-sm text-neutral-500"
              >
                <MessageCircle size={16} />
                {photo.comments.length}
              </button>
              <button
                onClick={() => actions.toggleSave(photo.id)}
                className={`ml-auto ${
                  saved ? "text-neutral-900" : "text-neutral-400"
                }`}
              >
                <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
              </button>
            </>
          ) : (
            <div
              className="flex items-center gap-1.5 text-xs text-neutral-400"
              title="Visit this street to join the conversation"
              onClick={gatedAlert}
            >
              <Lock size={13} />
              <span>
                {photo.likedBy.length} likes · {photo.comments.length} comments
                — visit this street to join the conversation
              </span>
            </div>
          )}
        </div>

        {showComments && unlocked && (
          <div className="mt-3 space-y-2">
            {photo.comments.length === 0 && (
              <p className="text-xs italic text-neutral-400">
                No comments yet — be the first who walked it.
              </p>
            )}
            {photo.comments.map((c) => (
              <div key={c.id} className="rounded-lg bg-neutral-50 px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-neutral-800">
                    @{c.author}
                  </span>
                  <span className="rounded-full bg-[#22C55E]/10 px-1.5 py-0.5 text-[9px] font-semibold text-[#22C55E]">
                    unlocked {timeAgo(c.unlockedAt)}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-neutral-700">{c.text}</p>
              </div>
            ))}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!draft.trim()) return;
                actions.addComment(
                  photo.id,
                  draft.trim(),
                  myUnlockedAt ?? Date.now()
                );
                setDraft("");
              }}
              className="flex items-center gap-2"
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Add to the thread…"
                className="flex-1 rounded-full border border-neutral-300 px-3 py-1.5 text-sm outline-none focus:border-neutral-500"
              />
              <button
                type="submit"
                className="rounded-full bg-neutral-900 p-2 text-white hover:bg-neutral-700"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
