"use client";

import { Neighborhood } from "@/lib/streetwheel/data";
import { mapsLink } from "@/lib/streetwheel/util";
import { ExternalLink } from "lucide-react";
import CityMap from "./CityMap";

interface MapPanelProps {
  neighborhood: Neighborhood | null;
  zoomed: boolean;
}

export default function MapPanel({ neighborhood, zoomed }: MapPanelProps) {
  return (
    <div className="relative h-full min-h-[320px] w-full overflow-hidden rounded-xl border border-neutral-200">
      <CityMap
        neighborhood={neighborhood}
        zoomed={zoomed}
        className="h-full w-full"
      />

      {neighborhood && (
        <a
          href={mapsLink(neighborhood.lat, neighborhood.lng)}
          target="_blank"
          rel="noreferrer"
          className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-[#3B82F6] shadow-sm hover:bg-white"
        >
          Google Maps <ExternalLink size={12} />
        </a>
      )}

      {!neighborhood && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/95 to-transparent p-4 text-center">
          <p className="text-sm font-medium text-neutral-600">
            Spin the wheel. Go somewhere you wouldn&apos;t.
          </p>
        </div>
      )}
    </div>
  );
}
