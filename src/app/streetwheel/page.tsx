import type { Metadata } from "next";
import Streetwheel from "@/components/streetwheel/Streetwheel";

export const metadata: Metadata = {
  title: "Streetwheel",
  description:
    "Photography roulette for NYC. Spin the wheel, go somewhere you wouldn't, and unlock the city one street at a time.",
};

export default function StreetwheelPage() {
  return <Streetwheel />;
}
