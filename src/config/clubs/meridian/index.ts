import type { Fixture, Player, Position, ProspectConfig, StaffMember } from "@/config/types";

const firstTeam: Array<[string, string, number, Position]> = [
  ["Jonah", "Reed", 1, "GK"], ["Mateo", "Silva", 13, "GK"],
  ["Elias", "Ford", 2, "DF"], ["Andre", "Kouyaté", 3, "DF"], ["Noah", "Chen", 4, "DF"], ["Luca", "Bennett", 5, "DF"], ["Darius", "Cole", 15, "DF"], ["Owen", "Park", 22, "DF"],
  ["Miles", "Okafor", 6, "MF"], ["Nico", "Valdez", 8, "MF"], ["Theo", "Santos", 10, "MF"], ["Caleb", "Wright", 14, "MF"], ["Isaac", "Amini", 18, "MF"], ["Rowan", "Kim", 21, "MF"],
  ["Malik", "Johnson", 7, "FW"], ["Santiago", "Ruiz", 9, "FW"], ["Adrian", "Brooks", 11, "FW"], ["Kenji", "Tanaka", 19, "FW"],
];

const makePlayers = (rows: Array<[string, string, number, Position]>, teamId: string, start: number): Player[] =>
  rows.map(([firstName, lastName, number, position], index) => ({
    id: `p${String(start + index).padStart(2, "0")}`, teamId, firstName, lastName, number, position,
    hometown: index % 3 === 0 ? "Tacoma, WA" : index % 3 === 1 ? "Seattle, WA" : "Federal Way, WA",
    height: position === "GK" ? "6'2\"" : index % 2 ? "5'11\"" : "6'0\"", yearJoined: 2022 + (index % 4),
    bio: `${firstName} brings composure, work rate, and a team-first edge to Meridian United. A South Sound competitor built for decisive moments.`,
    stats: { appearances: 7, starts: 4 + (index % 4), minutes: 414 + index * 23, goals: position === "FW" ? 2 + index % 4 : position === "MF" ? index % 3 : 0, assists: position === "MF" ? 1 + index % 4 : index % 2, yellowCards: index % 3, redCards: 0, ...(position === "GK" ? { cleanSheets: 2, saves: 24 + index * 3 } : {}) },
  }));

const u23Rows: Array<[string, string, number, Position]> = [["Evan","Hart",31,"GK"],["Luis","Mora",32,"DF"],["Aiden","Shaw",33,"DF"],["Rami","Nasser",34,"DF"],["Tomas","Vega",35,"MF"],["Ben","Ito",36,"MF"],["Jalen","Price",37,"FW"],["Marco","Diaz",38,"FW"]];
const academyRows: Array<[string, string, number, Position]> = [["Kai","Young",41,"GK"],["Sam","Ortiz",42,"DF"],["Leo","Mills",43,"DF"],["Amir","Khan",44,"MF"],["Ty","Ramos",45,"MF"],["Cole","Grant",46,"FW"]];

const played = (id: string, teamId: string, seasonId: string, opponent: string, date: string, clubScore: number, opponentScore: number, attendance?: number): Fixture => ({
  id, teamId, seasonId, opponent, date, venue: teamId === "first" ? "Alder Field" : "Meridian Training Ground", homeAway: Number(id.replace(/\D/g, "")) % 2 ? "home" : "away", competition: "League", status: "played", result: { clubScore, opponentScore, attendance, scorers: clubScore ? ["M. Johnson 34'", "S. Ruiz 71'"] : [] },
});
const upcoming = (id: string, teamId: string, opponent: string, date: string): Fixture => ({ id, teamId, seasonId: "s2026", opponent, date, venue: teamId === "first" ? "Alder Field" : "Meridian Training Ground", homeAway: Number(id.replace(/\D/g, "")) % 2 ? "home" : "away", competition: "Pacific Premier League", status: "upcoming" });

const staff: StaffMember[] = [
  { id: "st01", teamId: "first", name: "Marcus Hale", role: "Head Coach", bio: "A detail-led coach committed to brave, front-foot soccer." },
  { id: "st02", teamId: "first", name: "Elena Torres", role: "Assistant Coach", bio: "Leads player development and match preparation." },
  { id: "st03", teamId: "first", name: "David Kim", role: "Goalkeeper Coach" },
  { id: "st04", teamId: "first", name: "Dr. Maya Brooks", role: "Athletic Trainer" },
  { id: "st05", name: "Renee Walker", role: "Club General Manager" },
  { id: "st06", teamId: "u23", name: "Omar Castillo", role: "U23 Head Coach" },
];

export const meridian: ProspectConfig = {
  club: { name: "Meridian United FC", shortName: "Meridian United", initials: "MUFC", tagline: "Semi-pro soccer for the South Sound.", foundedYear: 2014, league: "Pacific Premier League", division: "Northwest Division", city: "Tacoma", state: "WA", venue: "Alder Field" },
  branding: { primaryColor: "#0F2A43", secondaryColor: "#D9A441", accentColor: "#F5F0E6", crest: "/prospect/crest.svg", heroImage: "/prospect/hero.svg", heroImageAlt: "Abstract floodlit soccer field at night" },
  contact: { email: "hello@meridianunited.example", phone: "(253) 555-0142", address: "1814 Alder Way, Tacoma, WA 98402", social: { instagram: "#", facebook: "#", youtube: "#" } },
  seasons: [{ id: "s2026", label: "2026 Season", status: "active" }, { id: "s2025", label: "2025 Season", status: "completed" }],
  currentSeasonId: "s2026",
  teams: [{ id: "first", name: "First Team", shortLabel: "First Team" }, { id: "u23", name: "U23", shortLabel: "U23" }, { id: "academy", name: "Academy", shortLabel: "Academy" }],
  defaultTeamId: "first",
  roster: [...makePlayers(firstTeam, "first", 1), ...makePlayers(u23Rows, "u23", 19), ...makePlayers(academyRows, "academy", 27)],
  staff,
  fixtures: [
    played("f01","first","s2026","Cascade Rovers SC","2026-05-09T19:00:00-07:00",2,0,842), played("f02","first","s2026","Olympic City FC","2026-05-16T18:00:00-07:00",1,1,615), played("f03","first","s2026","Evergreen Athletic","2026-05-30T19:30:00-07:00",3,1,911), played("f04","first","s2026","Harbor FC","2026-06-06T18:00:00-07:00",0,1,702), played("f05","first","s2026","Rainier Union","2026-06-20T19:00:00-07:00",2,2,788), played("f06","first","s2026","North Sound 1909","2026-06-27T19:00:00-07:00",4,1,1044), played("f07","first","s2026","Puget Sound FC","2026-07-11T19:00:00-07:00",2,1,1186),
    upcoming("f08","first","Tacoma Athletic","2026-08-15T19:00:00-07:00"), upcoming("f09","first","Cascade Rovers SC","2026-08-22T18:00:00-07:00"), upcoming("f10","first","Olympic City FC","2026-09-05T19:00:00-07:00"), upcoming("f11","first","Harbor FC","2026-09-12T18:30:00-07:00"),
    played("f12","first","s2025","Evergreen Athletic","2025-07-12T19:00:00-07:00",2,0,740), played("f13","first","s2025","Rainier Union","2025-07-19T19:00:00-07:00",1,2,680), played("f14","first","s2025","Harbor FC","2025-08-02T19:00:00-07:00",3,0,812), played("f15","first","s2025","Olympic City FC","2025-08-16T19:00:00-07:00",1,1,771), played("f16","first","s2025","North Sound 1909","2025-08-23T19:00:00-07:00",2,1,890), played("f17","first","s2025","Puget Sound FC","2025-09-06T19:00:00-07:00",0,1,905),
    played("u01","u23","s2026","Southside U23","2026-06-07T16:00:00-07:00",2,1), played("u02","u23","s2026","Harbor U23","2026-06-21T16:00:00-07:00",1,1), played("u03","u23","s2026","Rainier U23","2026-07-05T16:00:00-07:00",3,2), upcoming("u04","u23","Olympic U23","2026-08-16T16:00:00-07:00"), upcoming("u05","u23","Cascade U23","2026-08-30T16:00:00-07:00"), upcoming("a01","academy","Sound Academy","2026-08-17T17:00:00-07:00"), upcoming("a02","academy","Northwest Juniors","2026-08-24T17:00:00-07:00"),
  ],
  about: { story: "Meridian United was founded to give the South Sound a club that competes with ambition and belongs to its community. From Alder Field to every neighborhood training ground, we represent Tacoma with purpose.\n\nOur first team, U23s, and academy share one pathway: local players, brave soccer, and standards that travel beyond matchday.", mission: "Build a lasting soccer home for the South Sound.", highlights: ["2025 Northwest Division Champions", "Three connected player pathways", "Tacoma-owned and community-backed"] },
  sponsors: [
    { id: "s01", name: "Harborline Credit Union", logo: "/prospect/sponsors/s01.svg", level: "title", blurb: "Backing South Sound ambition." },
    { id: "s02", name: "Sound Roasters", logo: "/prospect/sponsors/s02.svg", level: "gold" }, { id: "s03", name: "Cascade Physical Therapy", logo: "/prospect/sponsors/s03.svg", level: "gold" },
    { id: "s04", name: "Alder Works", logo: "/prospect/sponsors/s04.svg", level: "partner" }, { id: "s05", name: "Tacoma Transit Co.", logo: "/prospect/sponsors/s05.svg", level: "partner" }, { id: "s06", name: "Northwest Supply", logo: "/prospect/sponsors/s06.svg", level: "partner" },
  ],
  store: { mode: "internal", products: [
    { id: "prod01", name: "2026 Home Jersey", price: 75, image: "/prospect/store/jersey-home.svg", category: "jersey", sizes: ["S","M","L","XL"] },
    { id: "prod02", name: "2026 Away Jersey", price: 75, image: "/prospect/store/jersey-away.svg", category: "jersey", sizes: ["S","M","L","XL"] },
    { id: "prod03", name: "Matchday Training Top", price: 52, image: "/prospect/store/training.svg", category: "training", sizes: ["S","M","L","XL"] },
    { id: "prod04", name: "Meridian Terrace Scarf", price: 32, image: "/prospect/store/scarf.svg", category: "accessory" },
    { id: "prod05", name: "MUFC Six-Panel Cap", price: 28, image: "/prospect/store/cap.svg", category: "accessory" },
    { id: "prod06", name: "South Sound Youth Kit", price: 64, image: "/prospect/store/youth.svg", category: "youth", sizes: ["YS","YM","YL"] },
  ] },
  analytics: {
    weeklyPageViews: [{weekLabel:"May 25",views:642},{weekLabel:"Jun 1",views:710},{weekLabel:"Jun 8",views:805},{weekLabel:"Jun 15",views:761},{weekLabel:"Jun 22",views:930},{weekLabel:"Jun 29",views:1022},{weekLabel:"Jul 6",views:1168},{weekLabel:"Jul 13",views:1374}],
    topPages: [{path:"/",label:"Home",views:4120},{path:"/roster",label:"Roster",views:2840},{path:"/schedule",label:"Schedule",views:1940},{path:"/stats",label:"Team stats",views:1280},{path:"/store",label:"Team store",views:920}],
    deviceSplit: { mobile: 68, desktop: 27, tablet: 5 }, rosterProfileViews: [{playerId:"p15",views:481},{playerId:"p16",views:437},{playerId:"p09",views:398},{playerId:"p11",views:355},{playerId:"p17",views:312}],
    sponsorImpressions: [{sponsorId:"s01",impressions:8240},{sponsorId:"s02",impressions:5120},{sponsorId:"s03",impressions:4880},{sponsorId:"s04",impressions:3600},{sponsorId:"s05",impressions:3420},{sponsorId:"s06",impressions:3190}], attendanceTrend: [{fixtureId:"f01",attendance:842},{fixtureId:"f02",attendance:615},{fixtureId:"f03",attendance:911},{fixtureId:"f04",attendance:702},{fixtureId:"f05",attendance:788},{fixtureId:"f06",attendance:1044},{fixtureId:"f07",attendance:1186}], storeInterest: [{productId:"prod01",views:622},{productId:"prod02",views:510},{productId:"prod04",views:402},{productId:"prod06",views:355}],
  },
};
