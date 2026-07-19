"use client";

import { useMockData } from "@/lib/store/MockDataProvider";
import { useActiveTeam } from "@/components/layout/ActiveTeamProvider";

export function StaffScreen() {
  const { staff } = useMockData(); const { activeTeamId } = useActiveTeam();
  const visible = staff.filter((member) => !member.teamId || member.teamId === activeTeamId);
  return <div className="interior"><header className="interior-hero"><span className="eyebrow">Technical staff</span><h1>The people<br/><em>behind the team.</em></h1></header><section className="staff-grid">{visible.map((member, index) => <article className="staff-card" key={member.id}><div><span>{member.name.split(" ").map((part) => part[0]).join("")}</span><small>{String(index + 1).padStart(2,"0")}</small></div><p>{member.role}</p><h2>{member.name}</h2>{member.bio && <small>{member.bio}</small>}</article>)}</section></div>;
}
