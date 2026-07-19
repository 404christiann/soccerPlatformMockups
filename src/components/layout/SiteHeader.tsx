"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { prospect } from "@/config/prospect";
import type { FeatureKey } from "@/lib/tiers";
import { useHasFeature } from "@/components/tier/TierProvider";

const NAV_ITEMS: { href: string; label: string; feature?: FeatureKey }[] = [
  { href: "/", label: "Home" }, { href: "/roster", label: "Roster" }, { href: "/schedule", label: "Schedule" }, { href: "/staff", label: "Staff" }, { href: "/club", label: "Club" },
  { href: "/sponsors", label: "Partners", feature: "sponsors" }, { href: "/stats", label: "Stats", feature: "stats" }, { href: "/store", label: "Store", feature: "store" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const sponsors = useHasFeature("sponsors"), stats = useHasFeature("stats"), store = useHasFeature("store");
  const available = (feature?: FeatureKey) => !feature || (feature === "sponsors" ? sponsors : feature === "stats" ? stats : store);
  return <header className="site-header"><Link className="brand-lockup" href="/" onClick={() => setOpen(false)}><Image src={prospect.branding.crest} alt="" width={52} height={62} priority/><span>{prospect.club.shortName}<small>Tacoma · Washington</small></span></Link><nav className="desktop-nav" aria-label="Main navigation">{NAV_ITEMS.filter((item) => available(item.feature)).map((item) => <Link data-active={pathname === item.href} key={item.href} href={item.href}>{item.label}</Link>)}</nav><div className="header-actions"><Link href="/admin" className="admin-link">Admin preview <span>↗</span></Link><button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation"><span/><span/></button></div>{open && <div className="mobile-menu"><div>{NAV_ITEMS.filter((item) => available(item.feature)).map((item, index) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}><small>0{index + 1}</small>{item.label}</Link>)}</div><Link className="mobile-admin" href="/admin" onClick={() => setOpen(false)}>Open admin preview ↗</Link></div>}</header>;
}
