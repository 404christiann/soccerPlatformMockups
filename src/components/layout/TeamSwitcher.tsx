"use client";

import { prospect } from "@/config/prospect";
import { TierGate } from "@/components/tier/TierGate";
import { useActiveTeam } from "./ActiveTeamProvider";

export function TeamSwitcher() {
  const { activeTeamId, setActiveTeamId } = useActiveTeam();
  if (prospect.teams.length < 2) return null;
  return <TierGate feature="academy"><div className="team-switcher" role="tablist" aria-label="Club teams">{prospect.teams.map((team) => <button role="tab" aria-selected={activeTeamId === team.id} data-active={activeTeamId === team.id} key={team.id} onClick={() => setActiveTeamId(team.id)}>{team.shortLabel}</button>)}</div></TierGate>;
}
