import Image from "next/image";
import Link from "next/link";
import { prospect } from "@/config/prospect";
import { TierGate } from "@/components/tier/TierGate";

export function SiteFooter() {
  return <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><Image src={prospect.branding.crest} alt={`${prospect.club.name} crest`} width={84} height={98}/><p>{prospect.club.tagline}</p></div><div><span className="footer-label">Explore</span><Link href="/roster">Roster</Link><Link href="/schedule">Schedule</Link><Link href="/club">Our club</Link></div><div><span className="footer-label">Matchday</span><p>{prospect.club.venue}</p><p>{prospect.contact.address}</p><a href={`mailto:${prospect.contact.email}`}>{prospect.contact.email}</a></div></div><TierGate feature="sponsors"><div className="footer-partners"><span>Club partners</span>{prospect.sponsors.slice(0, 4).map((sponsor) => <Image key={sponsor.id} src={sponsor.logo} alt={sponsor.name} width={150} height={48}/>)}</div></TierGate><div className="footer-bottom"><span>© 2026 {prospect.club.name}</span><span>Interactive concept preview — sample content only.</span></div></footer>;
}
