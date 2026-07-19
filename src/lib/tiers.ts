export type Tier = "starter" | "pro" | "elite";
export const TIERS: Tier[] = ["starter", "pro", "elite"];
export const TIER_LABELS: Record<Tier, string> = { starter: "Starter", pro: "Pro", elite: "Elite" };
const TIER_RANK: Record<Tier, number> = { starter: 0, pro: 1, elite: 2 };

export type FeatureKey =
  | "sponsors" | "stats" | "expandedProfiles" | "store" | "seasons" | "analytics" | "contentControls"
  | "advancedAnalytics" | "academy" | "customWorkflows" | "brandingControls";

const FEATURE_MIN_TIER: Record<FeatureKey, Tier> = {
  sponsors: "pro", stats: "pro", expandedProfiles: "pro", store: "pro", seasons: "pro", analytics: "pro", contentControls: "pro",
  advancedAnalytics: "elite", academy: "elite", customWorkflows: "elite", brandingControls: "elite",
};

export function hasFeature(tier: Tier, feature: FeatureKey): boolean {
  return TIER_RANK[tier] >= TIER_RANK[FEATURE_MIN_TIER[feature]];
}

export const TIER_LIMITS: Record<Tier, { playerProfiles: string; photoUploads: string; note: string }> = {
  starter: { playerProfiles: "Up to 22", photoUploads: "Up to 40", note: "Included with initial onboarding" },
  pro: { playerProfiles: "Up to 30", photoUploads: "Up to 120", note: "Included with initial onboarding" },
  elite: { playerProfiles: "Unlimited", photoUploads: "Unlimited", note: "Custom onboarding for multi-team clubs" },
};
