"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { prospect } from "@/config/prospect";
import type { FeatureKey } from "@/lib/tiers";
import { useHasFeature, useTier } from "@/components/tier/TierProvider";
import { DisclosureBanner } from "@/components/layout/DisclosureBanner";

const ITEMS: { href: string; label: string; icon: string; feature?: FeatureKey }[] = [
  {href:"/admin",label:"Dashboard",icon:"◈"},{href:"/admin/players",label:"Players",icon:"◎"},{href:"/admin/staff",label:"Staff",icon:"◇"},{href:"/admin/schedule",label:"Schedule",icon:"▣"},
  {href:"/admin/seasons",label:"Seasons",icon:"⊙",feature:"seasons"},{href:"/admin/stats",label:"Statistics",icon:"↗",feature:"stats"},{href:"/admin/sponsors",label:"Sponsors",icon:"⬡",feature:"sponsors"},{href:"/admin/store",label:"Store",icon:"◰",feature:"store"},{href:"/admin/analytics",label:"Analytics",icon:"∿",feature:"analytics"},
  {href:"/admin/teams",label:"Teams",icon:"☷",feature:"academy"},{href:"/admin/branding",label:"Branding",icon:"✦",feature:"brandingControls"},{href:"/admin/workflows",label:"Workflows",icon:"✓",feature:"customWorkflows"},
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); const { tier } = useTier();
  const flags = { seasons: useHasFeature("seasons"), stats: useHasFeature("stats"), sponsors: useHasFeature("sponsors"), store: useHasFeature("store"), analytics: useHasFeature("analytics"), academy: useHasFeature("academy"), brandingControls: useHasFeature("brandingControls"), customWorkflows: useHasFeature("customWorkflows") };
  const visible = ITEMS.filter((item) => !item.feature || flags[item.feature as keyof typeof flags]);
  const title = ITEMS.find((item) => item.href === pathname)?.label ?? "Admin";
  return <div className="admin-app"><DisclosureBanner admin/><aside className="admin-sidebar"><Link href="/" className="admin-brand"><Image src={prospect.branding.crest} alt="" width={44} height={52} priority style={{ width: 44, height: 52 }}/><span>Meridian<small>Club admin</small></span></Link><nav>{visible.map((item) => <Link key={item.href} data-active={pathname === item.href} href={item.href}><span>{item.icon}</span>{item.label}</Link>)}</nav><div className="admin-user"><span>CA</span><p>Club Admin<small>Preview account</small></p></div></aside><header className="admin-mobile-head"><Link href="/"><Image src={prospect.branding.crest} alt="" width={34} height={40} priority style={{ width: 34, height: 40 }}/></Link><div><small>Club admin</small><strong>{title}</strong></div><span className="tier-badge">{tier}</span></header><main className="admin-main">{children}</main><nav className="admin-bottom">{visible.slice(0,4).map((item) => <Link key={item.href} data-active={pathname === item.href} href={item.href}><span>{item.icon}</span><small>{item.label}</small></Link>)}<Link href="/admin/analytics"><span>•••</span><small>More</small></Link></nav></div>;
}
