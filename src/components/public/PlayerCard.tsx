"use client";

import Link from "next/link";
import type { Player } from "@/config/types";
import { useHasFeature } from "@/components/tier/TierProvider";

export function PlayerCard({ player, compact = false }: { player: Player; compact?: boolean }) {
  const expanded = useHasFeature("expandedProfiles");
  const stats = useHasFeature("stats");
  const content = <article className={`player-card ${compact ? "compact" : ""}`}><div className="player-portrait"><span className="player-number">{String(player.number).padStart(2, "0")}</span><div className="initials">{player.firstName[0]}{player.lastName[0]}</div><span className="position-mark">{player.position}</span></div><div className="player-meta"><p>{player.firstName}</p><h3>{player.lastName}</h3>{stats && player.stats && <div className="player-stats"><span><strong>{player.stats.appearances}</strong> Apps</span><span><strong>{player.stats.goals}</strong> Goals</span><span><strong>{player.stats.assists}</strong> Assists</span></div>}</div></article>;
  return expanded ? <Link href={`/roster/${player.id}`} aria-label={`View ${player.firstName} ${player.lastName} profile`}>{content}</Link> : content;
}
