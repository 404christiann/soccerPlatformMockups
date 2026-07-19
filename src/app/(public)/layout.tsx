import { DisclosureBanner } from "@/components/layout/DisclosureBanner";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <><DisclosureBanner /><SiteHeader /><main className="public-main">{children}</main><SiteFooter /></>;
}
