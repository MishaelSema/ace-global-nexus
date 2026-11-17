import {
  FaEarthAfrica, FaHandshake, FaChartLine, FaMagnifyingGlassChart, FaTruckFast,
  FaBoxesStacked, FaPiggyBank, FaChalkboardUser, FaSeedling, FaMountain,
  FaOilCan, FaBuildingColumns, FaMicrochip, FaHeartPulse, FaLink,
  FaIndustry, FaGraduationCap, FaBriefcase,
} from "react-icons/fa6";

/**
 * Photographic registry. Every image used on the public site is declared here
 * so a single swap updates every slot that references it.
 */
export const IMAGES = {
  // Founder — Christopher A. Ekom
  founderPortrait: "/images/founder-portrait.webp",
  founderCane: "/images/founder-cane.webp",
  founderLanyard: "/images/founder-lanyard.webp",

  // Place & context
  yaoundeCity: "/images/yaounde-city.webp",
  yaoundeNight: "/images/yaounde-night.webp",
  bridgeSanaga: "/images/bridge-sanaga.webp",

  // Sectors
  agribusiness: "/images/farm-rain.webp",
  agroforest: "/images/agroforest.webp",
  energy: "/images/sector-energy-solar.jpg",
  infrastructure: "/images/bridge-sanaga.webp",
  ict: "/images/sector-ict-mobile-money.jpg",
  healthcare: "/images/sector-healthcare-clinic.jpg",
  logistics: "/images/sector-logistics-port.jpg",
  manufacturing: "/images/carpentry.webp",

  // Business, events & advisory
  businessPlan: "/images/business-plan.webp",
  meeting: "/images/meeting-speaking.webp",
  networking: "/images/event-networking.webp",
  eventGroup: "/images/event-group.webp",
  communityTable: "/images/community-table.webp",
  applause: "/images/applause.webp",
  handshake: "/images/advocacy-handshake.webp",
  handover: "/images/advocacy-handover.webp",
  marketWomen: "/images/market-women.webp",
  marketBafia: "/images/market-bafia.webp",
  youthWorking: "/images/youth-working.webp",
  expoSelfie: "/images/expo-selfie.webp",
  awardGroup: "/images/award-group.webp",
} as const;

/**
 * Cover fallbacks for the launch batch of insights. The admin/CMS `coverUrl`
 * takes precedence; these are used when an article has no uploaded cover.
 */
export const INSIGHT_COVERS: Record<string, string> = {
  "market-entry-africa": IMAGES.businessPlan,
  "afcfta-explained": IMAGES.handshake,
  "afcfta-rules-of-origin": IMAGES.handover,
  "agribusiness-investment-africa-2026": IMAGES.agroforest,
  "critical-minerals-cameroon": "/images/insight-mining-quarry.jpg",
  "exporting-from-cameroon": IMAGES.marketWomen,
};

export function insightCover(slug?: string): string {
  return (slug && INSIGHT_COVERS[slug]) || IMAGES.businessPlan;
}

export const CONTACT_INFO = {
  address: "Yaoundé, Cameroon",
  phone: "+237 675 033 792",
  phoneHref: "tel:+237675033792",
  emails: ["chris.ekom@aceglobalnexus.com"],
  emailPrimary: "chris.ekom@aceglobalnexus.com",
  emailAlt: "chris.ekom@aceglobalnexus.com",
  location: "Yaoundé, Cameroon",
};

export const CONTACT_TOPICS = [
  "Market entry or expansion",
  "Investment opportunity",
  "Trade / export facilitation",
  "Business matchmaking",
  "Market intelligence",
  "Partnership proposal",
  "Training programme",
  "Other inquiry",
];

export const SERVICES = [
  {
    icon: FaEarthAfrica,
    title: "International Market Entry",
    description:
      "Strategic guidance to enter and expand within African and international markets — market selection, entry strategy, local regulations and route-to-market planning.",
  },
  {
    icon: FaHandshake,
    title: "Trade & Investment Facilitation",
    description:
      "End-to-end support connecting buyers, sellers, partners and investors — from introductions and negotiations to structuring deals that close.",
  },
  {
    icon: FaChartLine,
    title: "Business Matchmaking",
    description:
      "Curated introductions between complementary businesses, investors and institutions built on verified profiles and clear commercial fit.",
  },
  {
    icon: FaMagnifyingGlassChart,
    title: "Market Intelligence",
    description:
      "Practical insights on sectors, pricing, competition, regulation and demand — research grounded in real-world commercial experience.",
  },
  {
    icon: FaTruckFast,
    title: "Export Promotion",
    description:
      "Help African producers and SMEs position, package and promote their products for international buyers and export-ready partnerships.",
  },
  {
    icon: FaBoxesStacked,
    title: "Global Sourcing Support",
    description:
      "Reliable sourcing of suppliers, goods and services across international markets with rigorous screening, negotiation and follow-through.",
  },
  {
    icon: FaPiggyBank,
    title: "Investor Advisory",
    description:
      "Guidance for diaspora and international investors navigating African markets — opportunity screening, partnerships and risk-aware entry.",
  },
  {
    icon: FaChalkboardUser,
    title: "Corporate Training",
    description:
      "Practical training programmes in trade, export readiness, business development and international commercial engagement.",
  },
];

export const SECTORS = [
  { icon: FaSeedling, title: "Agribusiness", description: "Value chains, processing, and export of agricultural produce." },
  { icon: FaMountain, title: "Mining", description: "Critical minerals, artisanal value, and structured partnerships." },
  { icon: FaOilCan, title: "Energy", description: "Power, renewables, and downstream opportunities." },
  { icon: FaBuildingColumns, title: "Infrastructure", description: "Construction, transport corridors, and public-private projects." },
  { icon: FaMicrochip, title: "ICT", description: "Digital services, fintech, and technology partnerships." },
  { icon: FaHeartPulse, title: "Healthcare", description: "Medical equipment, services, and health-sector investment." },
  { icon: FaLink, title: "Logistics", description: "Trade corridors, freight, and supply chain services." },
  { icon: FaIndustry, title: "Manufacturing", description: "Local production, industrial partnerships, and value addition." },
  { icon: FaGraduationCap, title: "Education", description: "Capacity building, training, and institutional cooperation." },
  { icon: FaBriefcase, title: "Professional Services", description: "Legal, financial, and advisory support for cross-border business." },
];

export const INSIGHT_CATEGORIES = [
  "Market Intelligence",
  "Investment",
  "Trade & Export",
  "Agribusiness",
  "Entrepreneurship",
  "Doing Business in Africa",
];

export const FOUNDER = {
  name: "Christopher A. Ekom",
  title: "Founder & Principal Consultant",
  role: "Business Development Expert",
  credentials:
    "Retired Senior Commercial Specialist, Embassy of the United States of America, Yaoundé — 22+ years in international trade and investment promotion.",
  summary:
    "Christopher spent more than two decades at the intersection of business, trade, investment and international economic relations — working alongside companies looking for markets, investors looking for opportunities, governments looking to attract investment, and entrepreneurs looking for the connections to take their businesses further.",
  quote: "Opportunity exists. But opportunity does not automatically become business.",
  mission: "Connect businesses and opportunities — and help turn those connections into commercial results.",
};