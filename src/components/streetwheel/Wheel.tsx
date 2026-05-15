"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Neighborhood } from "@/lib/streetwheel/data";
import { cn } from "@/lib/utils";

const RADIUS = 520;
const STEP = 9; // degrees between items

interface WheelProps {
  items: Neighborhood[];
  selectedId: string | null;
  spinKey: number;
  /** index within items that the spin should land on */
  targetIndex: number | null;
  onSpinComplete: () => void;
  onSpin: () => void;
  spinning: boolean;
}

export default function Wheel({
  items,
  selectedId,
  spinKey,
  targetIndex,
  onSpinComplete,
  onSpin,
  spinning,
}: WheelProps) {
  const [rotation, setRotation] = useState(0);
  const lastSpin = useRef(0);

  useEffect(() => {
    if (spinKey === lastSpin.current || targetIndex == null) return;
    lastSpin.current = spinKey;
    let target = -targetIndex * STEP;
    while (target > rotation - 1440) target -= 360;
    setRotation(target);
  }, [spinKey, targetIndex, rotation]);

  return (
    <div
      className="relative h-[560px] w-full cursor-pointer select-none overflow-hidden"
      onClick={() => !spinning && onSpin()}
      role="button"
      aria-label="Spin the wheel"
    >
      {/* pointer indicator at the right edge of the rail */}
      <div className="absolute right-2 top-1/2 z-20 -translate-y-1/2">
        <div className="h-0 w-0 border-y-8 border-r-[14px] border-y-transparent border-r-[#D63838]" />
      </div>

      <motion.div
        className="absolute"
        style={{
          left: -RADIUS + 300,
          top: "50%",
          width: 1,
          height: 1,
        }}
        animate={{ rotate: rotation }}
        transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
        onAnimationComplete={() => {
          if (spinning) onSpinComplete();
        }}
      >
        {items.map((n, i) => {
          const angle = i * STEP;
          const isSelected = n.id === selectedId;
          return (
            <div
              key={n.id}
              className="absolute left-0 top-0"
              style={{
                transform: `rotate(${angle}deg) translateX(${RADIUS}px) rotate(${-angle}deg)`,
              }}
            >
              <div
                className={cn(
                  "-translate-y-1/2 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300",
                  isSelected
                    ? "bg-transparent font-semibold text-[#D63838]"
                    : "bg-[#ECE9FB] text-neutral-800"
                )}
              >
                {n.name}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* fade masks top/bottom */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}
