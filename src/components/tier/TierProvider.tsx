"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { hasFeature, type FeatureKey, type Tier } from "@/lib/tiers";

const TierContext = createContext<{ tier: Tier; setTier: (tier: Tier) => void } | null>(null);

export function TierProvider({ children }: { children: ReactNode }) {
  const [tier, setTierState] = useState<Tier>("pro");
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("tier");
    if (value === "starter" || value === "pro") queueMicrotask(() => setTierState(value));
    else if (value) {
      const url = new URL(window.location.href);
      url.searchParams.set("tier", "pro");
      window.history.replaceState({}, "", url);
    }
  }, []);
  const setTier = (next: Tier) => {
    setTierState(next);
    const url = new URL(window.location.href);
    url.searchParams.set("tier", next);
    window.history.replaceState({}, "", url);
  };
  return <TierContext.Provider value={{ tier, setTier }}>{children}</TierContext.Provider>;
}

export function useTier() {
  const value = useContext(TierContext);
  if (!value) throw new Error("useTier must be used inside TierProvider");
  return value;
}
export function useHasFeature(feature: FeatureKey) { return hasFeature(useTier().tier, feature); }
