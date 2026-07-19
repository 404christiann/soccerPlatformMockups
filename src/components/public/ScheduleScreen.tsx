"use client";

import { useState } from "react";
import { prospect } from "@/config/prospect";
import { useMockData } from "@/lib/store/MockDataProvider";
import { useActiveTeam } from "@/components/layout/ActiveTeamProvider";
import { useHasFeature } from "@/components/tier/TierProvider";
import { TeamSwitcher } from "@/components/layout/TeamSwitcher";
import { FixtureRow } from "./FixtureRow";

export function ScheduleScreen() {
  const { fixtures, seasons } = useMockData(); const { activeTeamId } = useActiveTeam(); const canSelect = useHasFeature("seasons");
  const [seasonId, setSeasonId] = useState(prospect.currentSeasonId);
  const filtered = fixtures.filter((f) => f.teamId === activeTeamId && f.seasonId === seasonId).sort((a,b) => a.date.localeCompare(b.date));
  return <div className="interior schedule-page"><header className="interior-hero split"><div><span className="eyebrow">Fixtures & results</span><h1>The road<br/><em>through 2026.</em></h1></div><div className="schedule-controls"><TeamSwitcher />{canSelect && <label>Season<select value={seasonId} onChange={(e) => setSeasonId(e.target.value)}>{seasons.map((season) => <option key={season.id} value={season.id}>{season.label}</option>)}</select></label>}</div></header><section className="schedule-section"><div className="group-title"><span>01</span><h2>Upcoming</h2><small>{filtered.filter((f) => f.status === "upcoming").length} fixtures</small></div><div>{filtered.filter((f) => f.status === "upcoming").map((fixture) => <FixtureRow key={fixture.id} fixture={fixture}/>)}</div></section><section className="schedule-section"><div className="group-title"><span>02</span><h2>Results</h2><small>{filtered.filter((f) => f.status === "played").length} matches</small></div><div>{filtered.filter((f) => f.status === "played").reverse().map((fixture) => <FixtureRow key={fixture.id} fixture={fixture}/>)}</div></section></div>;
}
