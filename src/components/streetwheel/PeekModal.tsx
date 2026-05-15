"use client";

import { Neighborhood } from "@/lib/streetwheel/data";
import { streetViewEmbedUrl, mapsLink } from "@/lib/streetwheel/util";
import { ExternalLink } from "lucide-react";
import Modal from "./Modal";

interface PeekModalProps {
  open: boolean;
  neighborhood: Neighborhood | null;
  onClose: () => void;
}

export default function PeekModal({
  open,
  neighborhood,
  onClose,
}: PeekModalProps) {
  return (
    <Modal open={open} onClose={onClose} size="max-w-3xl">
      {neighborhood && (
        <div className="overflow-hidden rounded-2xl">
          <div className="relative aspect-video w-full bg-neutral-900">
            {/* fallback shows through if the embed is blocked / offline */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
              <p className="text-sm font-medium text-neutral-300">
                Street View for {neighborhood.name}
              </p>
              <a
                href={mapsLink(neighborhood.lat, neighborhood.lng)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20"
              >
                Open in Google Maps <ExternalLink size={12} />
              </a>
            </div>
            <iframe
              title="street view"
              src={streetViewEmbedUrl(neighborhood.lat, neighborhood.lng)}
              className="relative h-full w-full"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
          <div className="flex items-center justify-between gap-4 px-5 py-3">
            <div>
              <div className="text-sm font-bold text-neutral-900">
                {neighborhood.name}
              </div>
              <div className="text-xs text-neutral-500">
                You&apos;ve seen it. Now go shoot it.
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full bg-neutral-900 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
