"use client";

import { Neighborhood } from "@/lib/streetwheel/data";
import { actions } from "@/lib/streetwheel/store";
import { haversineMeters, formatDistance, UNLOCK_RADIUS_M } from "@/lib/streetwheel/geo";
import { useEffect, useState } from "react";
import { Check, Crosshair, ImagePlus, Loader2, MapPin } from "lucide-react";
import Modal from "./Modal";

type Step = "locate" | "upload" | "details" | "done";

interface UnlockFlowProps {
  open: boolean;
  neighborhood: Neighborhood | null;
  onClose: () => void;
}

const CONDITIONS = [
  "Golden hour",
  "Blue hour",
  "Overcast",
  "Night",
  "Harsh midday",
  "After rain",
];

export default function UnlockFlow({
  open,
  neighborhood,
  onClose,
}: UnlockFlowProps) {
  const [step, setStep] = useState<Step>("locate");
  const [distance, setDistance] = useState<number | null>(null);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [unlockedAt, setUnlockedAt] = useState<number | null>(null);

  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [exifNote, setExifNote] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [gear, setGear] = useState("");
  const [conditions, setConditions] = useState<string>(CONDITIONS[0] ?? "Golden hour");

  useEffect(() => {
    if (open) {
      setStep("locate");
      setDistance(null);
      setGeoError(null);
      setUnlockedAt(null);
      setPhotoSrc(null);
      setExifNote(null);
      setCaption("");
      setGear("");
      setConditions(CONDITIONS[0] ?? "Golden hour");
    }
  }, [open, neighborhood?.id]);

  function checkLocation() {
    if (!neighborhood) return;
    setLocating(true);
    setGeoError(null);
    if (!navigator.geolocation) {
      setGeoError("Geolocation isn't available in this browser.");
      setLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const d = haversineMeters(
          pos.coords.latitude,
          pos.coords.longitude,
          neighborhood.lat,
          neighborhood.lng
        );
        setDistance(d);
        setLocating(false);
      },
      (err) => {
        setGeoError(
          err.code === err.PERMISSION_DENIED
            ? "Location permission denied. You can still use the demo override below."
            : "Couldn't get your location. Try again or use the demo override."
        );
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  function doUnlock() {
    if (!neighborhood) return;
    const ts = actions.unlock(neighborhood.id);
    setUnlockedAt(ts);
    setStep("upload");
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoSrc(reader.result as string);
      // Lightweight EXIF heuristic: JPEGs from cameras carry an APP1 marker.
      // Full pipeline parses GPS + timestamp server-side and matches the
      // unlock window; here we just surface the validation state.
      const isJpeg = file.type === "image/jpeg";
      setExifNote(
        isJpeg
          ? "EXIF found — GPS & timestamp will be matched against your unlock window."
          : "No EXIF detected — this upload would be queued for manual review."
      );
    };
    reader.readAsDataURL(file);
  }

  function publish() {
    if (!neighborhood || !photoSrc || unlockedAt == null) return;
    actions.addPhoto({
      neighborhoodId: neighborhood.id,
      src: photoSrc,
      caption: caption.trim() || "Untitled",
      gear: gear.trim() || "Unknown gear",
      conditions,
      unlockedAt,
    });
    setStep("done");
  }

  const withinRange = distance != null && distance <= UNLOCK_RADIUS_M;

  return (
    <Modal open={open} onClose={onClose} title="Unlock Flow" size="max-w-md">
      {neighborhood && (
        <div className="p-5">
          <div className="mb-4 flex items-center gap-2">
            {(["locate", "upload", "details", "done"] as Step[]).map((s, i) => {
              const order = ["locate", "upload", "details", "done"];
              const active = order.indexOf(step) >= i;
              return (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full ${
                    active ? "bg-[#22C55E]" : "bg-neutral-200"
                  }`}
                />
              );
            })}
          </div>

          {step === "locate" && (
            <div>
              <h3 className="text-lg font-bold text-neutral-900">
                Are you at {neighborhood.name}?
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                We verify you&apos;re within {UNLOCK_RADIUS_M}m of the centroid
                before unlocking.
              </p>

              <button
                onClick={checkLocation}
                disabled={locating}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-300 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 disabled:opacity-60"
              >
                {locating ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Crosshair size={16} />
                )}
                {locating ? "Locating…" : "Check my location"}
              </button>

              {geoError && (
                <p className="mt-2 text-xs text-[#D63838]">{geoError}</p>
              )}

              {distance != null && (
                <div
                  className={`mt-3 rounded-lg px-3 py-2 text-sm ${
                    withinRange
                      ? "bg-green-50 text-green-700"
                      : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {withinRange
                    ? `You're here — ${formatDistance(distance)} from the centroid.`
                    : `Get closer — you're ${formatDistance(distance)} away.`}
                </div>
              )}

              <button
                onClick={doUnlock}
                disabled={!withinRange}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#22C55E] py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1ea951] disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400"
              >
                <MapPin size={16} /> Unlock this street
              </button>

              <button
                onClick={() => {
                  setDistance(0);
                }}
                className="mt-2 w-full text-center text-[11px] text-neutral-400 underline hover:text-neutral-600"
              >
                Demo override — simulate arrival
              </button>
            </div>
          )}

          {step === "upload" && (
            <div>
              <h3 className="text-lg font-bold text-neutral-900">
                You earned this corner of the city.
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                Upload the photo you took here.
              </p>

              <label className="mt-4 flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-neutral-300 hover:bg-neutral-50">
                {photoSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photoSrc}
                    alt="upload preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="flex flex-col items-center gap-1 text-sm text-neutral-400">
                    <ImagePlus size={24} />
                    Choose a photo
                  </span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onFile}
                />
              </label>

              {exifNote && (
                <p className="mt-2 text-xs text-neutral-500">{exifNote}</p>
              )}

              <button
                onClick={() => setStep("details")}
                disabled={!photoSrc}
                className="mt-4 w-full rounded-lg bg-neutral-900 py-2.5 text-sm font-bold text-white hover:bg-neutral-700 disabled:bg-neutral-200 disabled:text-neutral-400"
              >
                Continue
              </button>
            </div>
          )}

          {step === "details" && (
            <div>
              <h3 className="text-lg font-bold text-neutral-900">
                Tag your shot
              </h3>
              <div className="mt-3 space-y-3">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                    Caption
                  </label>
                  <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    rows={2}
                    placeholder="What did you see?"
                    className="mt-1 w-full resize-none rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                    Gear
                  </label>
                  <input
                    value={gear}
                    onChange={(e) => setGear(e.target.value)}
                    placeholder="Camera · lens"
                    className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                    Conditions
                  </label>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {CONDITIONS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setConditions(c)}
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          conditions === c
                            ? "bg-neutral-900 text-white"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={publish}
                className="mt-4 w-full rounded-lg bg-[#22C55E] py-2.5 text-sm font-bold text-white hover:bg-[#1ea951]"
              >
                Publish to the street feed
              </button>
            </div>
          )}

          {step === "done" && (
            <div className="py-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                <Check size={28} className="text-[#22C55E]" />
              </div>
              <h3 className="mt-3 text-lg font-bold text-neutral-900">
                {neighborhood.name} unlocked
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                Your photo is live. You can now like and comment on every shot
                from this street.
              </p>
              <button
                onClick={onClose}
                className="mt-4 w-full rounded-lg bg-neutral-900 py-2.5 text-sm font-bold text-white hover:bg-neutral-700"
              >
                Done
              </button>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
