"use client";

import {
  Sparkles,
  Crown,
  HeartPulse,
  Brain,
  Users,
  Shirt,
  Hand,
  Compass,
  Heart,
  Smile,
  Flame,
  Activity,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Sparkles,
  Crown,
  HeartPulse,
  Brain,
  Users,
  Shirt,
  Hand,
  Compass,
  Heart,
  Smile,
  Flame,
  Activity,
};

export default function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp className={className} />;
}
