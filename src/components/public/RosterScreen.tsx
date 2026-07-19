"use client";

import { useMockData } from "@/lib/store/MockDataProvider";
import { useActiveTeam } from "@/components/layout/ActiveTeamProvider";
import { TeamSwitcher } from "@/components/layout/TeamSwitcher";
import type { Position } from "@/config/types";
import { PlayerCard } from "./PlayerCard";

const GROUPS: Array<[Position, string]> = [["GK","Goalkeepers"],["DF","Defenders"],["MF","Midfielders"],["FW","Forwards"]];
export function RosterScreen() {
  const { players } = useMockData();
  const { activeTeamId } = useActiveTeam();
  const teamPlayers = players.filter((player) => player.teamId === activeTeamId);
  return <div className="interior"><header className="interior-hero"><span className="eyebrow">The squad · 2026</span><h1>One badge.<br/><em>Every role.</em></h1><TeamSwitcher /></header>{GROUPS.map(([position,label]) => <section className="roster-group" key={position}><div className="group-title"><span>{position}</span><h2>{label}</h2><small>{teamPlayers.filter((p) => p.position === position).length} players</small></div><div className="roster-grid">{teamPlayers.filter((p) => p.position === position).map((player) => <PlayerCard key={player.id} player={player}/>)}</div></section>)}</div>;
}
