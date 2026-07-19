"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { prospect } from "@/config/prospect";
import { TierGate } from "@/components/tier/TierGate";
import { useMockData } from "@/lib/store/MockDataProvider";
import { useActiveTeam } from "@/components/layout/ActiveTeamProvider";
import { TeamSwitcher } from "@/components/layout/TeamSwitcher";
import { FixtureRow } from "./FixtureRow";
import { PlayerCard } from "./PlayerCard";

export function HomeScreen() {
  const { players, fixtures, sponsors, products } = useMockData();
  const { activeTeamId } = useActiveTeam();
  const teamFixtures = fixtures.filter((fixture) => fixture.teamId === activeTeamId);
  const next = [...teamFixtures].filter((f) => f.status === "upcoming").sort((a,b) => a.date.localeCompare(b.date))[0];
  const latest = [...teamFixtures].filter((f) => f.status === "played").sort((a,b) => b.date.localeCompare(a.date))[0];
  return <>
    <section className="hero"><Image src={prospect.branding.heroImage} alt={prospect.branding.heroImageAlt} fill priority sizes="100vw"/><div className="hero-shade"/><div className="pitch-grid"/><div className="hero-content"><motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}><div className="hero-kicker"><span>Est. {prospect.club.foundedYear}</span><span>{prospect.club.league}</span></div><h1>South Sound.<br/><em>Stand United.</em></h1><p>{prospect.club.tagline}</p><div className="hero-cta"><Link href="/schedule">Next match <span>↗</span></Link><Link href="/roster">Meet the squad</Link></div></motion.div><div className="hero-crest"><Image src={prospect.branding.crest} alt={`${prospect.club.name} crest`} width={220} height={255} priority/><small>Northwest Division<br/>Tacoma, Washington</small></div></div><div className="hero-team"><TeamSwitcher /></div></section>
    <section className="match-desk"><div className="section-heading"><div><span className="eyebrow">Match desk</span><h2>What’s next.<br/>What just happened.</h2></div><Link href="/schedule">Full schedule →</Link></div><div className="match-grid">{next && <div><span className="card-label">Next up</span><FixtureRow fixture={next} featured/></div>}{latest && <div><span className="card-label">Latest result</span><FixtureRow fixture={latest} featured/></div>}</div></section>
    <section className="roster-home"><div className="section-heading light"><div><span className="eyebrow">First team</span><h2>Built here.<br/>Ready anywhere.</h2></div><Link href="/roster">Full roster →</Link></div><div className="roster-strip">{players.filter((p) => p.teamId === activeTeamId).slice(0, 6).map((player) => <PlayerCard key={player.id} player={player} compact/>)}</div></section>
    <section className="club-story"><div className="story-mark">MU</div><div><span className="eyebrow">Since 2014</span><h2>A club shaped by the city around it.</h2><p>{prospect.about.story.split("\n\n")[0]}</p><Link href="/club">Our story →</Link></div><aside>{prospect.about.highlights?.map((highlight) => <p key={highlight}><span>◆</span>{highlight}</p>)}</aside></section>
    <TierGate feature="sponsors"><section className="partner-home"><span className="eyebrow">Proudly supported by</span><div>{sponsors.map((sponsor) => <Image key={sponsor.id} src={sponsor.logo} alt={sponsor.name} width={190} height={64}/>)}</div><Link href="/sponsors">Meet our partners →</Link></section></TierGate>
    <TierGate feature="store"><section className="store-home"><div className="section-heading"><div><span className="eyebrow">Club goods</span><h2>Wear the<br/>South Sound.</h2></div><Link href="/store">Visit team store →</Link></div><div className="product-grid home-products">{products.slice(0,3).map((product) => <Link href="/store" key={product.id} className="product-card"><div><Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 90vw, 30vw"/></div><p><strong>{product.name}</strong><span>${product.price}</span></p></Link>)}</div></section></TierGate>
  </>;
}
