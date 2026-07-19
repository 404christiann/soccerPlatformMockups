"use client";

import Image from "next/image";
import { TierGate } from "@/components/tier/TierGate";
import { FeatureUnavailableNote } from "@/components/layout/FeatureUnavailableNote";
import { useMockData } from "@/lib/store/MockDataProvider";

export function SponsorsScreen() {
  const { sponsors } = useMockData();
  return <TierGate feature="sponsors" fallback={<FeatureUnavailableNote title="Our partners"/>}><div className="interior"><header className="interior-hero"><span className="eyebrow">Club partners</span><h1>Backing the badge.<br/><em>Building the region.</em></h1></header><section className="sponsor-tiers">{(["title","gold","partner"] as const).map((level) => <div key={level}><div className="group-title"><span>{level === "title" ? "01" : level === "gold" ? "02" : "03"}</span><h2>{level === "title" ? "Principal partner" : level === "gold" ? "Gold partners" : "Community partners"}</h2></div><div className={`sponsor-grid ${level}`}>{sponsors.filter((s) => s.level === level).map((sponsor) => <article key={sponsor.id}><Image src={sponsor.logo} alt={sponsor.name} width={420} height={130}/>{sponsor.blurb && <p>{sponsor.blurb}</p>}</article>)}</div></div>)}</section></div></TierGate>;
}
