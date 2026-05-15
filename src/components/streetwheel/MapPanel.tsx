"use client";

import { Neighborhood } from "@/lib/streetwheel/data";
import { mapEmbedUrl } from "@/lib/streetwheel/util";
import { motion } from "framer-motion";

interface MapPanelProps {
  neighborhood: Neighborhood | null;
  zoomed: boolean;
}

export default function MapPanel({ neighborhood, zoomed }: MapPanelProps) {
  const lat = neighborhood?.lat ?? 40.7128;
  const lng = neighborhood?.lng ?? -74.006;
  const zoom = neighborhood && zoomed ? 15 : 11;

  return (
    <div className="relative h-full min-h-[320px] w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
      <iframe
        key={`${lat}-${lng}-${zoom}`}
        title="map"
        src={mapEmbedUrl(lat, lng, zoom)}
        className="h-full w-full"
        style={{ border: 0 }}
        loading="lazy"
      />

      {neighborhood && zoomed && (
        <motion.div
          key={neighborhood.id}
          className="pointer-events-none absolute left-1/2 top-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 18, stiffness: 260 }}
        >
          <div className="-translate-x-1/2 -translate-y-1/2">
            <div className="h-24 w-24 rounded-full border-2 border-[#D63838] bg-[#3B82F6]/25" />
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D63838] ring-2 ring-white" />
          </div>
        </motion.div>
      )}

      {!neighborhood && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/90 to-transparent p-4 text-center">
          <p className="text-sm font-medium text-neutral-600">
            Spin the wheel. Go somewhere you wouldn&apos;t.
          </p>
        </div>
      )}
    </div>
  );
}
