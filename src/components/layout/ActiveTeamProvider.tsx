"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { prospect } from "@/config/prospect";
import { useHasFeature } from "@/components/tier/TierProvider";

const TeamContext = createContext<{ activeTeamId: string; setActiveTeamId: (id: string) => void } | null>(null);
export function ActiveTeamProvider({ children }: { children: ReactNode }) {
  const academy = useHasFeature("academy");
  const [selected, setSelected] = useState(prospect.defaultTeamId);
  return <TeamContext.Provider value={{ activeTeamId: academy ? selected : prospect.defaultTeamId, setActiveTeamId: setSelected }}>{children}</TeamContext.Provider>;
}
export function useActiveTeam() {
  const value = useContext(TeamContext);
  if (!value) throw new Error("useActiveTeam must be used inside ActiveTeamProvider");
  return value;
}
