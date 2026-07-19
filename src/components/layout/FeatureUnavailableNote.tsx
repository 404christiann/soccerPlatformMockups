"use client";

import type { Tier } from "@/lib/tiers";
import { useTier } from "@/components/tier/TierProvider";

export function FeatureUnavailableNote({ title, tier = "pro" }: { title: string; tier?: Tier }) {
  const { setTier } = useTier();
  return <div className="unavailable"><span>Concept version</span><h1>{title}</h1><p>This view is part of the {tier === "elite" ? "Elite" : "Pro"} version of the concept.</p><button onClick={() => setTier(tier)}>Switch to {tier === "elite" ? "Elite" : "Pro"}</button></div>;
}
