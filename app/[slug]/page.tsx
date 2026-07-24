import EvoEstate, { type PageKey } from "../EvoEstate";

const routes: Record<string, PageKey> = {
  properties: "properties",
  buy: "buy",
  rent: "rent",
  luxury: "luxury",
  commercial: "commercial",
  projects: "projects",
  agents: "agents",
  about: "about",
  blog: "blog",
  contact: "contact",
  "book-visit": "book-visit",
  valuation: "valuation",
  "client-portal": "client-portal",
  login: "login",
  "forgot-password": "forgot-password",
  "two-factor": "two-factor",
  "create-agency": "create-agency",
  setup: "setup",
  dashboard: "dashboard",
  crm: "crm",
  pipeline: "pipeline",
  calendar: "calendar",
  inventory: "inventory",
  documents: "documents",
  marketing: "marketing",
  finance: "finance",
  reports: "reports",
  team: "team",
  support: "support",
  legal: "legal",
  settings: "settings",
};

export default async function RoutedPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <EvoEstate pageKey={routes[slug] ?? "home"}/>;
}
