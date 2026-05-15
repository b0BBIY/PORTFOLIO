"use client";

import {
  BOROUGH_COLORS,
  Neighborhood,
  NEIGHBORHOODS,
} from "@/lib/streetwheel/data";
import { motion } from "framer-motion";

const VW = 1000;
const VH = 700;
const PAD = 60;

const lats = NEIGHBORHOODS.map((n) => n.lat);
const lngs = NEIGHBORHOODS.map((n) => n.lng);
const MIN_LAT = Math.min(...lats);
const MAX_LAT = Math.max(...lats);
const MIN_LNG = Math.min(...lngs);
const MAX_LNG = Math.max(...lngs);

function project(lat: number, lng: number) {
  const x =
    ((lng - MIN_LNG) / (MAX_LNG - MIN_LNG)) * (VW - PAD * 2) + PAD;
  const y =
    (1 - (lat - MIN_LAT) / (MAX_LAT - MIN_LAT)) * (VH - PAD * 2) + PAD;
  return { x, y };
}

interface CityMapProps {
  neighborhood: Neighborhood | null;
  /** zoom in toward the selected neighborhood */
  zoomed?: boolean;
  className?: string;
}

export default function CityMap({
  neighborhood,
  zoomed = true,
  className,
}: CityMapProps) {
  let viewBox = `0 0 ${VW} ${VH}`;
  if (neighborhood && zoomed) {
    const { x, y } = project(neighborhood.lat, neighborhood.lng);
    const w = VW * 0.42;
    const h = VH * 0.42;
    const vx = Math.min(Math.max(x - w / 2, 0), VW - w);
    const vy = Math.min(Math.max(y - h / 2, 0), VH - h);
    viewBox = `${vx} ${vy} ${w} ${h}`;
  }

  return (
    <div className={className}>
      <motion.svg
        viewBox={viewBox}
        animate={{}}
        className="h-full w-full"
        style={{ background: "#F1F3F6" }}
        preserveAspectRatio="xMidYMid slice"
      >
        {/* subtle grid */}
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={(i / 10) * VW}
            y1={0}
            x2={(i / 10) * VW}
            y2={VH}
            stroke="#E2E5EA"
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={(i / 7) * VH}
            x2={VW}
            y2={(i / 7) * VH}
            stroke="#E2E5EA"
            strokeWidth={1}
          />
        ))}

        {/* all neighborhoods as dots */}
        {NEIGHBORHOODS.map((n) => {
          const { x, y } = project(n.lat, n.lng);
          const isSel = neighborhood?.id === n.id;
          if (isSel) return null;
          return (
            <circle
              key={n.id}
              cx={x}
              cy={y}
              r={5}
              fill={BOROUGH_COLORS[n.borough]}
              opacity={0.4}
            />
          );
        })}

        {/* selected neighborhood — blue fill, red stroke */}
        {neighborhood &&
          (() => {
            const { x, y } = project(neighborhood.lat, neighborhood.lng);
            return (
              <g>
                <motion.circle
                  cx={x}
                  cy={y}
                  fill="#3B82F6"
                  opacity={0.18}
                  initial={{ r: 0 }}
                  animate={{ r: 64 }}
                  transition={{ type: "spring", damping: 16, stiffness: 220 }}
                />
                <motion.circle
                  cx={x}
                  cy={y}
                  fill="#3B82F6"
                  fillOpacity={0.45}
                  stroke="#D63838"
                  strokeWidth={3}
                  initial={{ r: 0 }}
                  animate={{ r: 26 }}
                  transition={{ type: "spring", damping: 18, stiffness: 240 }}
                />
                <circle cx={x} cy={y} r={6} fill="#D63838" />
                <text
                  x={x}
                  y={y - 38}
                  textAnchor="middle"
                  fontSize={22}
                  fontWeight={700}
                  fill="#1A1A1A"
                >
                  {neighborhood.name}
                </text>
              </g>
            );
          })()}
      </motion.svg>
    </div>
  );
}
