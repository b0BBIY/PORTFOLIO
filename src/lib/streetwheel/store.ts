"use client";

import { useSyncExternalStore } from "react";
import { Borough, BOROUGHS } from "./data";

export interface Comment {
  id: string;
  author: string;
  text: string;
  /** when the commenter unlocked this street — credibility marker */
  unlockedAt: number;
  createdAt: number;
}

export interface Photo {
  id: string;
  neighborhoodId: string;
  src: string;
  author: string;
  caption: string;
  gear: string;
  conditions: string;
  /** unlock session timestamp the photo was tied to */
  unlockedAt: number;
  createdAt: number;
  likedBy: string[];
  savedBy: string[];
  comments: Comment[];
  /** true for seeded community content */
  seed?: boolean;
}

export interface Quest {
  neighborhoodId: string;
  committedAt: number;
  expiresAt: number;
}

export interface Unlock {
  neighborhoodId: string;
  timestamp: number;
}

export interface StreetwheelState {
  user: string | null;
  selectedBoroughs: Borough[];
  unlocked: Unlock[];
  peeked: string[];
  quests: Quest[];
  photos: Photo[];
}

const STORAGE_KEY = "streetwheel:v1";
const QUEST_TTL = 7 * 24 * 60 * 60 * 1000;

const SEED_PHOTOS: Photo[] = [
  {
    id: "seed-1",
    neighborhoodId: "dumbo",
    src: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=800&q=70",
    author: "mara.k",
    caption: "Manhattan Bridge framed by Washington St. Got there 20 min before sunrise.",
    gear: "Fujifilm X-T4 · 23mm",
    conditions: "Golden hour",
    unlockedAt: Date.now() - 86400000 * 14,
    createdAt: Date.now() - 86400000 * 14,
    likedBy: ["theo", "june_p", "wlkr"],
    savedBy: ["theo"],
    seed: true,
    comments: [
      {
        id: "c1",
        author: "theo",
        text: "The classic. Still hits every time.",
        unlockedAt: Date.now() - 86400000 * 40,
        createdAt: Date.now() - 86400000 * 13,
      },
    ],
  },
  {
    id: "seed-2",
    neighborhoodId: "dumbo",
    src: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&q=70",
    author: "june_p",
    caption: "Cobblestones after the rain.",
    gear: "Ricoh GR III",
    conditions: "Overcast",
    unlockedAt: Date.now() - 86400000 * 6,
    createdAt: Date.now() - 86400000 * 6,
    likedBy: ["mara.k"],
    savedBy: [],
    seed: true,
    comments: [],
  },
  {
    id: "seed-3",
    neighborhoodId: "williamsburg",
    src: "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?w=800&q=70",
    author: "wlkr",
    caption: "Domino Park, blue hour. The skyline does the work for you.",
    gear: "Sony A7C · 35mm",
    conditions: "Night",
    unlockedAt: Date.now() - 86400000 * 9,
    createdAt: Date.now() - 86400000 * 9,
    likedBy: ["june_p", "mara.k"],
    savedBy: ["june_p"],
    seed: true,
    comments: [],
  },
  {
    id: "seed-4",
    neighborhoodId: "soho",
    src: "https://images.unsplash.com/photo-1542113879-d6a0db4949df?w=800&q=70",
    author: "theo",
    caption: "Cast-iron facades on Greene St.",
    gear: "Leica Q2",
    conditions: "Midday",
    unlockedAt: Date.now() - 86400000 * 3,
    createdAt: Date.now() - 86400000 * 3,
    likedBy: [],
    savedBy: [],
    seed: true,
    comments: [],
  },
];

function defaultState(): StreetwheelState {
  return {
    user: null,
    selectedBoroughs: [...BOROUGHS],
    unlocked: [],
    peeked: [],
    quests: [],
    photos: SEED_PHOTOS,
  };
}

let state: StreetwheelState = defaultState();
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        user: state.user,
        selectedBoroughs: state.selectedBoroughs,
        unlocked: state.unlocked,
        peeked: state.peeked,
        quests: state.quests,
        // only persist user-created photos; seeds are static
        photos: state.photos.filter((p) => !p.seed),
      })
    );
  } catch {
    /* ignore quota errors */
  }
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as Partial<StreetwheelState>;
      state = {
        ...defaultState(),
        ...saved,
        // merge seeds back in front of stored user photos
        photos: [...SEED_PHOTOS, ...(saved.photos ?? [])],
      };
    }
  } catch {
    state = defaultState();
  }
  // prune expired quests on load
  const now = Date.now();
  state.quests = state.quests.filter((q) => q.expiresAt > now);
  emit();
}

function setState(updater: (s: StreetwheelState) => StreetwheelState) {
  state = updater(state);
  persist();
  emit();
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export const actions = {
  signIn(name: string) {
    setState((s) => ({ ...s, user: name.trim() || "explorer" }));
  },
  signOut() {
    setState((s) => ({ ...s, user: null }));
  },
  setBoroughs(boroughs: Borough[]) {
    setState((s) => ({ ...s, selectedBoroughs: boroughs }));
  },
  peek(neighborhoodId: string) {
    setState((s) =>
      s.peeked.includes(neighborhoodId)
        ? s
        : { ...s, peeked: [...s.peeked, neighborhoodId] }
    );
  },
  commitQuest(neighborhoodId: string) {
    setState((s) => {
      if (s.quests.some((q) => q.neighborhoodId === neighborhoodId)) return s;
      const now = Date.now();
      return {
        ...s,
        quests: [
          ...s.quests,
          { neighborhoodId, committedAt: now, expiresAt: now + QUEST_TTL },
        ],
      };
    });
  },
  abandonQuest(neighborhoodId: string) {
    setState((s) => ({
      ...s,
      quests: s.quests.filter((q) => q.neighborhoodId !== neighborhoodId),
    }));
  },
  unlock(neighborhoodId: string) {
    const timestamp = Date.now();
    setState((s) => {
      if (s.unlocked.some((u) => u.neighborhoodId === neighborhoodId)) return s;
      return {
        ...s,
        unlocked: [...s.unlocked, { neighborhoodId, timestamp }],
        quests: s.quests.filter((q) => q.neighborhoodId !== neighborhoodId),
      };
    });
    return timestamp;
  },
  addPhoto(input: {
    neighborhoodId: string;
    src: string;
    caption: string;
    gear: string;
    conditions: string;
    unlockedAt: number;
  }) {
    setState((s) => ({
      ...s,
      photos: [
        {
          id: uid(),
          author: s.user ?? "you",
          createdAt: Date.now(),
          likedBy: [],
          savedBy: [],
          comments: [],
          ...input,
        },
        ...s.photos,
      ],
    }));
  },
  toggleLike(photoId: string) {
    setState((s) => {
      const me = s.user ?? "you";
      return {
        ...s,
        photos: s.photos.map((p) =>
          p.id !== photoId
            ? p
            : {
                ...p,
                likedBy: p.likedBy.includes(me)
                  ? p.likedBy.filter((u) => u !== me)
                  : [...p.likedBy, me],
              }
        ),
      };
    });
  },
  toggleSave(photoId: string) {
    setState((s) => {
      const me = s.user ?? "you";
      return {
        ...s,
        photos: s.photos.map((p) =>
          p.id !== photoId
            ? p
            : {
                ...p,
                savedBy: p.savedBy.includes(me)
                  ? p.savedBy.filter((u) => u !== me)
                  : [...p.savedBy, me],
              }
        ),
      };
    });
  },
  addComment(photoId: string, text: string, unlockedAt: number) {
    setState((s) => ({
      ...s,
      photos: s.photos.map((p) =>
        p.id !== photoId
          ? p
          : {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: uid(),
                  author: s.user ?? "you",
                  text,
                  unlockedAt,
                  createdAt: Date.now(),
                },
              ],
            }
      ),
    }));
  },
  reset() {
    state = defaultState();
    persist();
    emit();
  },
};

function subscribe(cb: () => void) {
  hydrate();
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return state;
}

function getServerSnapshot() {
  return state;
}

export function useStreetwheel(): StreetwheelState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// ----- selectors -----
export function isUnlocked(s: StreetwheelState, id: string) {
  return s.unlocked.some((u) => u.neighborhoodId === id);
}
export function unlockTimestamp(s: StreetwheelState, id: string) {
  return s.unlocked.find((u) => u.neighborhoodId === id)?.timestamp;
}
export function isPeeked(s: StreetwheelState, id: string) {
  return s.peeked.includes(id);
}
export function questFor(s: StreetwheelState, id: string) {
  return s.quests.find((q) => q.neighborhoodId === id);
}
export function photosFor(s: StreetwheelState, id: string) {
  return s.photos
    .filter((p) => p.neighborhoodId === id)
    .sort((a, b) => b.createdAt - a.createdAt);
}
