"use client";

import {
  Activity,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Command,
  Compass,
  CreditCard,
  FileCheck2,
  FileSignature,
  Filter,
  Gauge,
  Heart,
  Home,
  KeyRound,
  LayoutDashboard,
  ListFilter,
  LockKeyhole,
  Mail,
  Map,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Sun,
  Target,
  TrendingUp,
  Upload,
  UserRound,
  UsersRound,
  WalletCards,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export type PageKey =
  | "home"
  | "properties"
  | "buy"
  | "rent"
  | "luxury"
  | "commercial"
  | "projects"
  | "agents"
  | "about"
  | "blog"
  | "contact"
  | "book-visit"
  | "valuation"
  | "client-portal"
  | "login"
  | "forgot-password"
  | "two-factor"
  | "create-agency"
  | "setup"
  | "dashboard"
  | "crm"
  | "pipeline"
  | "calendar"
  | "inventory"
  | "documents"
  | "marketing"
  | "finance"
  | "reports"
  | "team"
  | "support"
  | "legal"
  | "settings";

type Property = {
  id: number;
  title: string;
  area: string;
  price: string;
  meta: string;
  image: string;
  tag: string;
  status: string;
  agent: string;
};

const properties: Property[] = [
  { id: 1, title: "Villa Serein", area: "Palm District · Algiers", price: "DZD 148M", meta: "5 beds · 6 baths · 620 m²", image: "/villa-hero.jpg", tag: "Exclusive", status: "Available", agent: "Nadia Benali" },
  { id: 2, title: "The Garden Residence", area: "Hydra · Algiers", price: "DZD 82M", meta: "4 beds · 3 baths · 310 m²", image: "/property-02.jpg", tag: "New", status: "Under offer", agent: "Yacine Haddad" },
  { id: 3, title: "Cliff House 07", area: "Sidi Fredj · Algiers", price: "DZD 119M", meta: "4 beds · 5 baths · 480 m²", image: "/property-03.jpg", tag: "Sea view", status: "Available", agent: "Nadia Benali" },
  { id: 4, title: "L’Orangerie Penthouse", area: "El Biar · Algiers", price: "DZD 64M", meta: "3 beds · 3 baths · 245 m²", image: "/property-04.jpg", tag: "Ready", status: "Reserved", agent: "Sami Khelifi" },
  { id: 5, title: "Atelier Loft", area: "Oran Centre · Oran", price: "DZD 280K / mo", meta: "2 beds · 2 baths · 178 m²", image: "/property-05.jpg", tag: "For rent", status: "Available", agent: "Leila Merabet" },
  { id: 6, title: "Nexus Business Tower", area: "Bab Ezzouar · Algiers", price: "Price on request", meta: "2,400 m² · Grade A · 42 parking", image: "/commercial.jpg", tag: "Commercial", status: "Available", agent: "Yacine Haddad" },
];

const publicNav = [
  ["Buy", "/buy"],
  ["Rent", "/rent"],
  ["Luxury", "/luxury"],
  ["Commercial", "/commercial"],
  ["Projects", "/projects"],
  ["Agents", "/agents"],
] as const;

const workspaceNav = [
  [LayoutDashboard, "Today", "/dashboard"],
  [UsersRound, "CRM", "/crm"],
  [Target, "Pipeline", "/pipeline"],
  [CalendarDays, "Calendar", "/calendar"],
  [Building2, "Properties", "/inventory"],
  [FileCheck2, "Documents", "/documents"],
  [WandSparkles, "Marketing", "/marketing"],
  [WalletCards, "Finance", "/finance"],
  [BarChart3, "Reports", "/reports"],
  [UsersRound, "Team", "/team"],
] as const;

const publicPages = new Set<PageKey>([
  "home", "properties", "buy", "rent", "luxury", "commercial", "projects", "agents", "about", "blog", "contact", "book-visit", "valuation", "client-portal",
]);

const authPages = new Set<PageKey>(["login", "forgot-password", "two-factor", "create-agency", "setup"]);

export default function EvoEstate({ pageKey = "home" }: { pageKey?: PageKey }) {
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [notifications, setNotifications] = useState(false);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((value) => !value);
      }
      if (event.key === "Escape") {
        setCommandOpen(false);
        setNotifications(false);
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  if (authPages.has(pageKey)) {
    return <div className={`evo-app ${dark ? "dark" : ""}`}><AuthExperience pageKey={pageKey}/></div>;
  }

  if (!publicPages.has(pageKey)) {
    return (
      <div className={`evo-app workspace-root ${dark ? "dark" : ""}`}>
        <Workspace pageKey={pageKey} dark={dark} onTheme={() => setDark(!dark)} onCommand={() => setCommandOpen(true)} onNotifications={() => setNotifications(!notifications)}/>
        {commandOpen && <CommandPalette onClose={() => setCommandOpen(false)}/>}
        {notifications && <NotificationPanel onClose={() => setNotifications(false)}/>}
      </div>
    );
  }

  return (
    <div className={`evo-app public-root ${dark ? "dark" : ""}`}>
      <PublicHeader menu={menu} setMenu={setMenu} dark={dark} setDark={setDark} onSearch={() => setCommandOpen(true)}/>
      {pageKey === "home" && <HomePage/>}
      {["properties", "buy", "rent"].includes(pageKey) && <PropertiesExplorer mode={pageKey as "properties" | "buy" | "rent"}/>}
      {["luxury", "commercial", "projects", "agents", "about", "blog", "contact"].includes(pageKey) && <EditorialPage pageKey={pageKey}/>}
      {pageKey === "book-visit" && <BookVisit/>}
      {pageKey === "valuation" && <Valuation/>}
      {pageKey === "client-portal" && <ClientPortal/>}
      <PublicFooter/>
      {commandOpen && <CommandPalette publicMode onClose={() => setCommandOpen(false)}/>}
      <Link className="floating-contact" href="/contact"><MessageCircle/><span>Talk to an advisor</span></Link>
    </div>
  );
}

function Brand({ inverse = false }: { inverse?: boolean }) {
  return <span className={`brand ${inverse ? "inverse" : ""}`}><i><Building2/></i><span><b>EVO</b><strong>ESTATE</strong></span></span>;
}

function PublicHeader({ menu, setMenu, dark, setDark, onSearch }: { menu: boolean; setMenu: (value: boolean) => void; dark: boolean; setDark: (value: boolean) => void; onSearch: () => void }) {
  return (
    <>
      <div className="market-bar"><span><i/> Live market desk · 42 new opportunities this week</span><Link href="/valuation">Request a complimentary valuation <ArrowRight/></Link></div>
      <header className="public-header">
        <Link href="/" className="brand-link"><Brand/></Link>
        <nav className={menu ? "open" : ""}>{publicNav.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}<Link href="/about">Company</Link></nav>
        <div className="header-actions">
          <button className="icon-button desktop-search" onClick={onSearch} aria-label="Search"><Search/></button>
          <button className="icon-button" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? <Sun/> : <Moon/>}</button>
          <Link className="portal-button" href="/login">Agency login</Link>
          <Link className="primary-button" href="/book-visit">Book a visit</Link>
          <button className="menu-toggle" onClick={() => setMenu(!menu)} aria-label="Open menu">{menu ? <X/> : <Menu/>}</button>
        </div>
      </header>
    </>
  );
}

function HomePage() {
  const [intent, setIntent] = useState("Buy");
  const [saved, setSaved] = useState<number[]>([]);
  const toggleSaved = (id: number) => setSaved((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  return (
    <main>
      <section className="estate-hero">
        <div className="hero-photo"/>
        <div className="hero-overlay"/>
        <div className="hero-copy">
          <span className="eyebrow light"><i/> PROPERTY, INTELLIGENTLY CURATED</span>
          <h1>Move forward.<br/><em>Beautifully.</em></h1>
          <p>Exceptional homes, rigorous advice, and a quieter way to make one of life’s biggest decisions.</p>
          <div className="property-search">
            <div className="intent-tabs">{["Buy", "Rent", "Invest"].map((item) => <button className={intent === item ? "active" : ""} onClick={() => setIntent(item)} key={item}>{item}</button>)}</div>
            <label><MapPin/><span><small>LOCATION</small><input aria-label="Location" placeholder="City, district, or landmark"/></span></label>
            <label><Home/><span><small>PROPERTY TYPE</small><select aria-label="Property type"><option>Any property</option><option>Villa</option><option>Apartment</option><option>Commercial</option></select></span></label>
            <label><CircleDollarSign/><span><small>PRICE RANGE</small><select aria-label="Price range"><option>Any budget</option><option>Under DZD 50M</option><option>DZD 50M–100M</option><option>DZD 100M+</option></select></span></label>
            <Link href={intent === "Rent" ? "/rent" : "/properties"}><Search/> Explore</Link>
          </div>
          <div className="hero-proof"><span><b>1,280+</b><small>successful moves</small></span><span><b>4.9/5</b><small>client experience</small></span><span><b>18 yrs</b><small>market expertise</small></span></div>
        </div>
        <Link className="hero-property-note" href="/properties"><span><small>FEATURED RESIDENCE</small><b>Villa Serein</b><em>Palm District · DZD 148M</em></span><ArrowUpRightIcon/></Link>
      </section>

      <section className="proof-strip section-shell"><span>AS SEEN IN</span>{["MONOCLE", "ARCHITECTURAL DIGEST", "FORBES", "FINANCIAL TIMES", "DEZEEN"].map((item) => <b key={item}>{item}</b>)}</section>

      <section className="featured-section section-shell">
        <SectionHeading eyebrow="CURATED FOR YOU" title={<>Properties with<br/><em>something to say.</em></>} text="A considered edit of exceptional places—each inspected, documented, and represented with complete clarity." action={<Link href="/properties">View all properties <ArrowRight/></Link>}/>
        <div className="property-grid">
          {properties.slice(0, 3).map((property, index) => <PropertyCard property={property} key={property.id} featured={index === 0} saved={saved.includes(property.id)} onSave={() => toggleSaved(property.id)}/>)}
        </div>
      </section>

      <section className="collection-section">
        <div className="section-shell collection-layout">
          <div><span className="eyebrow light"><i/> FIND YOUR DIRECTION</span><h2>Not just where.<br/><em>How do you want to live?</em></h2></div>
          <div className="collection-grid">
            {[["A quieter pace", "Villas & coastal homes", "/luxury", "/property-03.jpg"], ["At the centre of it", "City apartments", "/buy", "/property-04.jpg"], ["Built for ambition", "Commercial & investment", "/commercial", "/commercial.jpg"]].map(([title, text, href, image], index) => <Link href={href} key={title} style={{ backgroundImage: `linear-gradient(180deg,transparent,rgba(14,14,13,.86)),url(${image})` }}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p><i><ArrowRight/></i></div></Link>)}
          </div>
        </div>
      </section>

      <section className="intelligence-section section-shell">
        <div className="market-visual"><span className="map-dot one"/><span className="map-dot two"/><span className="map-dot three"/><div className="map-card"><small>HYDRA · Q2 2026</small><b>+8.4%</b><span>annual price movement</span></div></div>
        <div className="intelligence-copy"><span className="eyebrow"><i/> MARKET INTELLIGENCE</span><h2>Good decisions start<br/><em>with better context.</em></h2><p>Our advisors combine verified transaction data, live demand signals, and local judgement to help you understand not just the price—but the opportunity.</p><ul><li><Check/> Evidence-led pricing and negotiation</li><li><Check/> Neighbourhood demand and liquidity signals</li><li><Check/> Clear risk, ownership, and legal review</li></ul><Link className="primary-button large" href="/valuation">Understand my property’s value <ArrowRight/></Link></div>
      </section>

      <section className="advisor-section">
        <div className="advisor-photo"/>
        <div className="advisor-copy"><span className="eyebrow light"><i/> YOUR ADVISOR, NOT A SALESPERSON</span><blockquote>“The right move should feel clear before it feels exciting.”</blockquote><p>Every client works with one accountable advisor, supported by research, legal, marketing, and transaction specialists.</p><div><span><b>Nadia Benali</b><small>Senior Property Advisor · 12 years</small></span><Link href="/agents">Meet the team <ArrowRight/></Link></div></div>
      </section>

      <section className="story-quotes section-shell">
        <SectionHeading eyebrow="CLIENT STORIES" title={<>Trust is built<br/><em>in the details.</em></>} text="Real decisions, handled with discretion, speed, and complete transparency."/>
        <div>{[
          ["They told us what not to buy. That honesty changed everything.", "Sarah & Karim · Buyers"],
          ["Our property sold in eleven days, with every detail handled.", "Amine D. · Seller"],
          ["The reporting was better than anything we receive from our bank.", "Northline Capital · Investor"],
        ].map(([quote, name]) => <article key={name}><span>{[1,2,3,4,5].map((n) => <Star key={n} fill="currentColor"/>)}</span><blockquote>“{quote}”</blockquote><small>{name}</small></article>)}</div>
      </section>
      <PublicCta/>
    </main>
  );
}

function ArrowUpRightIcon() {
  return <ArrowDownRight style={{ transform: "rotate(180deg)" }}/>;
}

function SectionHeading({ eyebrow, title, text, action }: { eyebrow: string; title: React.ReactNode; text: string; action?: React.ReactNode }) {
  return <div className="section-heading"><div><span className="eyebrow"><i/> {eyebrow}</span><h2>{title}</h2></div><div><p>{text}</p>{action}</div></div>;
}

function PropertyCard({ property, featured = false, saved = false, onSave }: { property: Property; featured?: boolean; saved?: boolean; onSave?: () => void }) {
  return (
    <article className={`property-card ${featured ? "featured" : ""}`}>
      <Link href="/properties" className="property-image" style={{ backgroundImage: `url(${property.image})` }}><span>{property.tag}</span></Link>
      <button className={saved ? "save active" : "save"} onClick={onSave} aria-label="Save property"><Heart fill={saved ? "currentColor" : "none"}/></button>
      <div className="property-copy"><small>{property.area}</small><h3>{property.title}</h3><p>{property.meta}</p><div><b>{property.price}</b><Link href="/book-visit">View <ArrowRight/></Link></div></div>
    </article>
  );
}

function PropertiesExplorer({ mode }: { mode: "properties" | "buy" | "rent" }) {
  const [view, setView] = useState<"grid" | "map">("grid");
  const [filter, setFilter] = useState("All");
  const [saved, setSaved] = useState<number[]>([]);
  const visible = useMemo(() => properties.filter((property) => {
    if (mode === "rent") return property.tag === "For rent";
    if (mode === "buy") return property.tag !== "For rent";
    if (filter === "All") return true;
    return property.tag === filter || property.status === filter;
  }), [mode, filter]);
  return (
    <main className="explorer-page">
      <section className="explorer-head section-shell">
        <div><span className="eyebrow"><i/> LIVE PROPERTY COLLECTION</span><h1>{mode === "rent" ? "Rent with confidence." : mode === "buy" ? "Find a place worth moving for." : "Explore exceptional property."}</h1><p>{visible.length} verified opportunities · Updated moments ago</p></div>
        <Link className="subtle-button" href="/valuation">Sell a property <ArrowRight/></Link>
      </section>
      <section className="filter-bar section-shell">
        <div>{["All", "Available", "Exclusive", "New"].map((item) => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
        <button><SlidersHorizontal/> Filters <span>2</span></button>
        <div className="view-toggle"><button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}><ListFilter/> List</button><button className={view === "map" ? "active" : ""} onClick={() => setView("map")}><Map/> Map</button></div>
      </section>
      <section className={`explorer-layout ${view === "map" ? "map-focus" : ""}`}>
        <div className="explorer-results">
          {visible.map((property) => <PropertyCard property={property} key={property.id} saved={saved.includes(property.id)} onSave={() => setSaved((items) => items.includes(property.id) ? items.filter((id) => id !== property.id) : [...items, property.id])}/>)}
        </div>
        <div className="property-map">
          <span className="map-road r1"/><span className="map-road r2"/><span className="map-road r3"/>
          {visible.slice(0, 5).map((property, index) => <button className={`price-pin pin-${index + 1}`} key={property.id}>{property.price.replace("DZD ", "")}</button>)}
          <div className="map-location"><Compass/><span><b>Search this area</b><small>Move the map to refresh</small></span></div>
        </div>
      </section>
    </main>
  );
}

const editorialCopy: Record<string, { eyebrow: string; title: string; accent: string; text: string; image: string }> = {
  luxury: { eyebrow: "PRIVATE COLLECTION", title: "Rare property.", accent: "Quietly represented.", text: "Exceptional homes, discreet access, and senior advice for decisions where every detail matters.", image: "/villa-hero.jpg" },
  commercial: { eyebrow: "COMMERCIAL & INVESTMENT", title: "Property built", accent: "around performance.", text: "Acquisition, leasing, and portfolio advice informed by occupancy, yield, location, and long-term demand.", image: "/commercial.jpg" },
  projects: { eyebrow: "NEW DEVELOPMENTS", title: "See the future", accent: "before it is built.", text: "A curated portfolio of verified developments with transparent delivery, developer, and investment analysis.", image: "/property-02.jpg" },
  agents: { eyebrow: "OUR ADVISORS", title: "Expertise that feels", accent: "entirely personal.", text: "Local specialists supported by research, legal, marketing, and transaction teams.", image: "/agent.jpg" },
  about: { eyebrow: "THE EVOESTATE STANDARD", title: "A better way", accent: "to move.", text: "We built an advisory firm around clarity, craft, and the belief that trust compounds.", image: "/property-05.jpg" },
  blog: { eyebrow: "MARKET JOURNAL", title: "Useful intelligence.", accent: "No market noise.", text: "Clear, expert perspectives for buyers, sellers, investors, landlords, and tenants.", image: "/property-04.jpg" },
  contact: { eyebrow: "START A CONVERSATION", title: "Tell us what", accent: "you’re considering.", text: "A senior advisor will respond within one business hour.", image: "/property-03.jpg" },
};

function EditorialPage({ pageKey }: { pageKey: PageKey }) {
  const copy = editorialCopy[pageKey];
  if (!copy) return null;
  return (
    <main className={`editorial-page page-${pageKey}`}>
      <section className="editorial-hero">
        <div className="editorial-visual" style={{ backgroundImage: `linear-gradient(180deg,rgba(18,17,15,.03),rgba(18,17,15,.57)),url(${copy.image})` }}/>
        <div className="editorial-copy"><span className="eyebrow light"><i/> {copy.eyebrow}</span><h1>{copy.title}<br/><em>{copy.accent}</em></h1><p>{copy.text}</p><Link className="primary-button large" href={pageKey === "contact" ? "/contact" : "/properties"}>{pageKey === "contact" ? "Contact an advisor" : "Explore the collection"} <ArrowRight/></Link></div>
      </section>
      {pageKey === "agents" ? <AgentsContent/> : pageKey === "blog" ? <JournalContent/> : pageKey === "contact" ? <ContactContent/> : <EditorialCollection pageKey={pageKey}/>}
      <PublicCta/>
    </main>
  );
}

function EditorialCollection({ pageKey }: { pageKey: PageKey }) {
  const facts: Record<string, string[][]> = {
    luxury: [["Private access", "Off-market and invitation-only opportunities."], ["Senior representation", "One accountable advisor from brief to completion."], ["Global reach", "Qualified buyers and partners across key markets."]],
    commercial: [["Yield intelligence", "Live rent, vacancy, and transaction comparables."], ["Tenant strategy", "Positioning, leasing, and retention built around demand."], ["Transaction control", "Legal, technical, and financial diligence in one flow."]],
    projects: [["Developer verified", "Track record, approvals, and delivery milestones reviewed."], ["Progress visibility", "Live construction, payment, and handover updates."], ["Investment model", "Comparable value, rental demand, and exit scenarios."]],
    about: [["Independent advice", "Recommendations shaped by your interest, not inventory pressure."], ["One connected team", "Advisory, marketing, legal, and operations working from one record."], ["Radical clarity", "Verified facts, plain language, and visible next steps."]],
  };
  return (
    <section className="editorial-body section-shell">
      <SectionHeading eyebrow="A DIFFERENT STANDARD" title={<>Expertise at every<br/><em>important moment.</em></>} text="From first conversation to signed completion, the experience is designed to keep decisions clear and momentum visible."/>
      <div className="fact-grid">{(facts[pageKey] || facts.about).map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      <div className="editorial-properties">{properties.slice(pageKey === "commercial" ? 5 : 0, pageKey === "commercial" ? 6 : 3).map((property) => <PropertyCard property={property} key={property.id}/>)}</div>
    </section>
  );
}

function AgentsContent() {
  const agents = [
    ["Nadia Benali", "Luxury & family homes", "12 years · Arabic, French, English"],
    ["Yacine Haddad", "Commercial & investment", "10 years · Arabic, French, English"],
    ["Leila Merabet", "Rentals & relocations", "8 years · Arabic, French, Spanish"],
  ];
  return <section className="agents-content section-shell">{agents.map(([name, role, detail], index) => <article key={name}><div className={`agent-portrait portrait-${index + 1}`}/><small>{role}</small><h3>{name}</h3><p>{detail}</p><div><span><Star fill="currentColor"/> 4.9</span><Link href="/book-visit">Book consultation <ArrowRight/></Link></div></article>)}</section>;
}

function JournalContent() {
  return <section className="journal-grid section-shell">{[
    ["MARKET · 8 MIN", "What actually moved Algiers property prices this quarter", "Transactions, supply, and buyer behaviour behind the headline number."],
    ["SELLING · 6 MIN", "The first fourteen days determine more than you think", "How launch strategy shapes attention, leverage, and final sale value."],
    ["INVESTMENT · 10 MIN", "Yield is only half the story", "A practical framework for liquidity, tenant demand, and long-term resilience."],
    ["LIVING · 5 MIN", "Hydra or El Biar: choosing for your actual week", "A neighbourhood comparison built around commute, schools, pace, and privacy."],
    ["LEGAL · 7 MIN", "Five documents to verify before making an offer", "A clear pre-offer checklist from our legal and transaction team."],
    ["DESIGN · 4 MIN", "Why restrained staging creates stronger offers", "The details that help buyers see possibility without distraction."],
  ].map(([tag, title, text], index) => <article key={title}><div style={{ backgroundImage: `url(${properties[index].image})` }}/><small>{tag}</small><h3>{title}</h3><p>{text}</p><button>Read insight <ArrowRight/></button></article>)}</section>;
}

function ContactContent() {
  const [sent, setSent] = useState(false);
  return (
    <section className="contact-layout section-shell">
      <div className="contact-options">{[[Phone, "Speak with an advisor", "+213 560 00 10 10"], [Mail, "Send a private brief", "advisory@evoestate.com"], [MapPin, "Visit the atelier", "12 Rue des Oliviers, Hydra"]].map(([Icon, title, text]) => { const CIcon = Icon as typeof Phone; return <article key={String(title)}><CIcon/><span><b>{String(title)}</b><small>{String(text)}</small></span></article>; })}</div>
      <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
        {sent ? <div className="success-state"><CheckCircle2/><h3>Your brief is with us.</h3><p>A senior advisor will contact you shortly.</p><button type="button" onClick={() => setSent(false)}>Send another</button></div> : <><small>PRIVATE ENQUIRY</small><h2>How can we help?</h2><div><label>Full name<input required placeholder="Your name"/></label><label>Phone<input required placeholder="+213"/></label></div><label>Email<input required type="email" placeholder="you@email.com"/></label><label>I would like to<select><option>Buy a property</option><option>Sell a property</option><option>Rent</option><option>Invest</option><option>Discuss commercial property</option></select></label><label>Tell us more<textarea placeholder="Your priorities, timeline, or property details…"/></label><button className="primary-button" type="submit">Send private enquiry <ArrowRight/></button><p><ShieldCheck/> Your information is kept strictly confidential.</p></>}
      </form>
    </section>
  );
}

function BookVisit() {
  const [step, setStep] = useState(0);
  const [property, setProperty] = useState(properties[0].title);
  const [time, setTime] = useState("10:30");
  return (
    <main className="booking-page">
      <div className="booking-shell section-shell">
        <aside><Brand inverse/><span>PRIVATE VIEWING</span><h1>See the space.<br/><em>Feel the possibility.</em></h1><p>Your advisor will prepare the property, answer every question, and tailor the visit to what matters to you.</p><ol>{["Property", "Date & time", "Your details", "Confirmed"].map((item, index) => <li className={step === index ? "active" : step > index ? "done" : ""} key={item}><span>{step > index ? <Check/> : index + 1}</span>{item}</li>)}</ol></aside>
        <section>
          {step === 0 && <><small>STEP 1 OF 3</small><h2>Which property would you like to visit?</h2><div className="booking-property-list">{properties.slice(0, 4).map((item) => <button className={property === item.title ? "active" : ""} onClick={() => setProperty(item.title)} key={item.title}><i style={{ backgroundImage: `url(${item.image})` }}/><span><b>{item.title}</b><small>{item.area}</small></span>{property === item.title && <CheckCircle2/>}</button>)}</div></>}
          {step === 1 && <><small>STEP 2 OF 3</small><h2>Choose a time that works.</h2><div className="booking-days">{["Sat 25", "Sun 26", "Mon 27", "Tue 28", "Wed 29"].map((day, index) => <button className={index === 2 ? "active" : ""} key={day}><small>JUL</small><b>{day}</b></button>)}</div><div className="smart-slot"><Sparkles/><span><b>Travel-aware availability</b><small>These times allow your advisor to arrive prepared and on time.</small></span></div><div className="booking-times">{["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"].map((slot) => <button className={time === slot ? "active" : ""} onClick={() => setTime(slot)} key={slot}>{slot}</button>)}</div></>}
          {step === 2 && <form onSubmit={(event) => { event.preventDefault(); setStep(3); }}><small>STEP 3 OF 3</small><h2>A few details before we meet.</h2><div><label>First name<input required placeholder="Sofia"/></label><label>Last name<input required placeholder="Martin"/></label></div><label>Email<input required type="email" placeholder="sofia@email.com"/></label><label>Mobile<input required placeholder="+213"/></label><label className="check-row"><input type="checkbox" defaultChecked/><span><b>Send reminders by WhatsApp and email</b><small>You can reschedule from the secure link.</small></span></label><button className="primary-button" type="submit">Confirm private viewing <ArrowRight/></button></form>}
          {step === 3 && <div className="booking-success"><span><Check/></span><small>VIEWING CONFIRMED</small><h2>We’ll see you there.</h2><p>Your advisor has received the brief. Confirmation and directions are on their way by WhatsApp and email.</p><div><CalendarDays/><span><b>{property}</b><small>Monday, July 27 · {time}</small><small>Nadia Benali · Senior advisor</small></span></div><Link className="primary-button" href="/">Return home</Link></div>}
          {step < 2 && <button className="primary-button booking-next" onClick={() => setStep(step + 1)}>Continue <ArrowRight/></button>}
          {step > 0 && step < 3 && <button className="back-button" onClick={() => setStep(step - 1)}><ArrowLeft/> Back</button>}
        </section>
      </div>
    </main>
  );
}

function Valuation() {
  const [step, setStep] = useState(0);
  const [kind, setKind] = useState("Villa");
  return (
    <main className="valuation-page">
      <section className="valuation-intro"><span className="eyebrow light"><i/> COMPLIMENTARY VALUATION</span><h1>Know what your property<br/><em>could achieve.</em></h1><p>A data-informed estimate, then a human review from a local market specialist.</p><div><span><ShieldCheck/> Private</span><span><Clock3/> 2 minutes</span><span><Sparkles/> Advisor reviewed</span></div></section>
      <section className="valuation-card section-shell">
        <div className="valuation-progress"><span style={{ width: `${(step + 1) * 25}%` }}/></div>
        {step === 0 && <><small>PROPERTY TYPE</small><h2>What are we valuing?</h2><div className="type-options">{["Villa", "Apartment", "Commercial", "Land"].map((item) => <button className={kind === item ? "active" : ""} onClick={() => setKind(item)} key={item}><Building2/><b>{item}</b></button>)}</div></>}
        {step === 1 && <><small>LOCATION</small><h2>Where is the property?</h2><label className="location-input"><MapPin/><input autoFocus placeholder="Address or neighbourhood"/></label><div className="mini-map"><span/><span/><i><MapPin/></i></div></>}
        {step === 2 && <><small>PROPERTY DETAILS</small><h2>Tell us about the space.</h2><div className="detail-fields"><label>Bedrooms<select><option>4</option><option>3</option><option>5+</option></select></label><label>Bathrooms<select><option>3</option><option>2</option><option>4+</option></select></label><label>Interior area<input placeholder="m²"/></label><label>Condition<select><option>Excellent</option><option>Good</option><option>Needs work</option></select></label></div></>}
        {step === 3 && <div className="valuation-result"><Sparkles/><small>INITIAL RANGE</small><h2>DZD 108M–124M</h2><p>Based on 18 comparable sales, current demand, and the details provided. A local advisor will review this estimate before contacting you.</p><Link className="primary-button" href="/contact">Request the full valuation <ArrowRight/></Link></div>}
        {step < 3 && <button className="primary-button valuation-next" onClick={() => setStep(step + 1)}>Continue <ArrowRight/></button>}
      </section>
    </main>
  );
}

function ClientPortal() {
  const [loggedIn, setLoggedIn] = useState(false);
  if (!loggedIn) return (
    <main className="client-portal-page">
      <section className="client-login section-shell">
        <div><span className="eyebrow light"><i/> PRIVATE CLIENT SPACE</span><h1>Every next step.<br/><em>One calm place.</em></h1><p>Saved properties, visits, offers, documents, and messages—securely connected.</p><div className="portal-preview-card"><small>OFFER STATUS</small><b>Villa Serein</b><span><i/><i/><i className="active"/><i/></span><em>Legal review in progress</em></div></div>
        <form onSubmit={(event) => { event.preventDefault(); setLoggedIn(true); }}><LockKeyhole/><small>SECURE CLIENT ACCESS</small><h2>Welcome back.</h2><label>Email<input type="email" defaultValue="client@evoestate.demo"/></label><label>Password<input type="password" defaultValue="EvoEstate2026!"/></label><button className="primary-button" type="submit">Sign in securely <ArrowRight/></button><button type="button">Forgot password?</button><p><ShieldCheck/> Encrypted · Private · Audit protected</p></form>
      </section>
    </main>
  );
  return (
    <main className="client-dashboard section-shell">
      <div className="client-welcome"><div><small>GOOD AFTERNOON</small><h1>Welcome back, Sofia.</h1><p>Your offer is moving forward. Two documents need your attention.</p></div><Link className="primary-button" href="/properties"><Search/> Find another property</Link></div>
      <div className="client-grid">
        <article className="client-offer"><span><Home/></span><small>ACTIVE OFFER</small><h2>Villa Serein</h2><p>DZD 141M · Submitted July 21</p><div className="offer-steps">{["Offer", "Negotiation", "Legal", "Contract"].map((item, index) => <span className={index <= 2 ? "active" : ""} key={item}><i/>{item}</span>)}</div><button>View offer details <ArrowRight/></button></article>
        <article><FileSignature/><small>DOCUMENTS</small><h3>2 need signature</h3><p>Reservation agreement and identity declaration.</p><button>Review documents</button></article>
        <article><CalendarDays/><small>NEXT VISIT</small><h3>Final inspection</h3><p>Tuesday · 10:30 · Villa Serein</p><button>Manage appointment</button></article>
        <article><MessageCircle/><small>YOUR ADVISOR</small><h3>Nadia Benali</h3><p>Last reply 14 minutes ago</p><button>Open conversation</button></article>
      </div>
    </main>
  );
}

function PublicCta() {
  return <section className="public-cta section-shell"><span className="eyebrow light"><i/> YOUR NEXT MOVE</span><h2>Let’s make it<br/><em>exceptional.</em></h2><p>Tell us where you are going. We’ll bring the market intelligence, network, and execution to get you there.</p><div><Link className="light-button large" href="/contact">Speak with an advisor <ArrowRight/></Link><Link className="glass-button large" href="/properties">Explore properties</Link></div></section>;
}

function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="section-shell footer-grid">
        <div><Brand inverse/><p>Property advisory, intelligently connected.</p><span><a href="#">in</a><a href="#">ig</a><a href="#">f</a></span></div>
        <div><b>Discover</b>{publicNav.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div>
        <div><b>Company</b><Link href="/about">About</Link><Link href="/agents">Advisors</Link><Link href="/blog">Journal</Link><Link href="/contact">Contact</Link></div>
        <div><b>Client services</b><Link href="/valuation">Property valuation</Link><Link href="/book-visit">Book a visit</Link><Link href="/client-portal">Client portal</Link><Link href="/login">Agency platform</Link></div>
        <div><b>Market desk</b><a href="tel:+213560001010">+213 560 00 10 10</a><a href="mailto:advisory@evoestate.com">advisory@evoestate.com</a><p>Mon–Sat · 8:30–19:00<br/>12 Rue des Oliviers, Hydra</p></div>
      </div>
      <div className="section-shell footer-bottom"><span>© 2026 EvoEstate Advisory</span><span>Privacy · Legal · Accessibility</span><span><i/> Market desk online</span></div>
    </footer>
  );
}

function AuthExperience({ pageKey }: { pageKey: PageKey }) {
  if (pageKey === "setup") return <SetupWizard/>;
  if (pageKey === "create-agency") return <CreateAgency/>;
  const [showTwoFactor, setShowTwoFactor] = useState(pageKey === "two-factor");
  const forgot = pageKey === "forgot-password";
  return (
    <main className="auth-page">
      <section className="auth-brand-panel"><Link href="/"><Brand inverse/></Link><div><span className="eyebrow light"><i/> THE OPERATING SYSTEM FOR PROPERTY</span><h1>More momentum.<br/><em>Less admin.</em></h1><p>Everything your agency needs to capture demand, move deals, and deliver an exceptional client experience.</p></div><blockquote>“Our agents spend the day advising clients again.”<small>— Amira K., Managing Director</small></blockquote></section>
      <section className="auth-form-panel">
        {showTwoFactor ? <TwoFactor/> : forgot ? <ForgotPassword/> : <form onSubmit={(event) => { event.preventDefault(); setShowTwoFactor(true); }}><small>AGENCY WORKSPACE</small><h2>Welcome back.</h2><p>Sign in to your EvoEstate workspace.</p><label>Work email<input required type="email" defaultValue="agent@evoestate.demo"/></label><label>Password<input required type="password" defaultValue="EvoEstate2026!"/></label><div className="auth-row"><label><input type="checkbox" defaultChecked/> Keep me signed in</label><Link href="/forgot-password">Forgot password?</Link></div><button className="primary-button" type="submit">Continue securely <ArrowRight/></button><span className="auth-divider">OR</span><button className="sso-button" type="button">Continue with Google Workspace</button><p className="create-account">New agency? <Link href="/create-agency">Create your workspace</Link></p></form>}
      </section>
    </main>
  );
}

function TwoFactor() {
  const [verified, setVerified] = useState(false);
  if (verified) {
    if (typeof window !== "undefined") window.setTimeout(() => { window.location.href = "/dashboard"; }, 350);
    return <div className="auth-success"><CheckCircle2/><h2>Identity confirmed.</h2><p>Opening your workspace…</p></div>;
  }
  return <form onSubmit={(event) => { event.preventDefault(); setVerified(true); }}><span className="auth-icon"><ShieldCheck/></span><small>TWO-FACTOR AUTHENTICATION</small><h2>Check your phone.</h2><p>Enter the six-digit code sent to ••• •• 48.</p><div className="code-inputs">{[1,2,3,4,5,6].map((n) => <input aria-label={`Digit ${n}`} maxLength={1} defaultValue={n < 3 ? "2" : ""} key={n}/>)}</div><button className="primary-button" type="submit">Verify and continue</button><button className="text-button" type="button">Send a new code</button></form>;
}

function ForgotPassword() {
  const [sent, setSent] = useState(false);
  return <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}>{sent ? <div className="auth-success"><Mail/><h2>Check your inbox.</h2><p>A secure reset link has been sent.</p><Link href="/login">Return to sign in</Link></div> : <><span className="auth-icon"><KeyRound/></span><small>ACCOUNT RECOVERY</small><h2>Reset your password.</h2><p>We’ll send a secure link to your work email.</p><label>Work email<input required type="email" placeholder="you@agency.com"/></label><button className="primary-button" type="submit">Send reset link <ArrowRight/></button><Link className="back-link" href="/login"><ArrowLeft/> Back to sign in</Link></>}</form>;
}

function CreateAgency() {
  return <main className="create-agency-page"><Link href="/"><Brand/></Link><section><span className="eyebrow"><i/> START YOUR WORKSPACE</span><h1>Build an agency<br/><em>people love to use.</em></h1><p>Set up your operating system in about ten minutes. No credit card required.</p><form onSubmit={(event) => { event.preventDefault(); window.location.href = "/setup"; }}><div><label>First name<input required placeholder="Amira"/></label><label>Last name<input required placeholder="Kaci"/></label></div><label>Work email<input required type="email" placeholder="amira@agency.com"/></label><label>Agency name<input required placeholder="North & Co. Property"/></label><label>Create password<input required type="password" placeholder="Minimum 10 characters"/></label><button className="primary-button" type="submit">Create agency workspace <ArrowRight/></button><small>By continuing, you agree to the terms and privacy policy.</small></form></section><aside><Sparkles/><h2>Included from day one</h2>{["Public property website", "CRM and lead routing", "Property inventory", "Visits and reminders", "Sales pipeline", "Documents and e-signatures", "Role-based dashboards", "Live business reporting"].map((item) => <p key={item}><Check/>{item}</p>)}</aside></main>;
}

function SetupWizard() {
  const steps = ["Agency", "Branches", "Team", "Property types", "Currencies", "Commissions", "Lead sources", "Properties", "Clients", "Finish"];
  const [step, setStep] = useState(0);
  return (
    <main className="setup-page">
      <aside><Brand inverse/><div><small>AGENCY SETUP</small><strong>{step + 1} of 10 complete</strong><i><span style={{ height: `${(step + 1) * 10}%` }}/></i></div><ol>{steps.map((item, index) => <li className={index === step ? "active" : index < step ? "done" : ""} key={item}><span>{index < step ? <Check/> : index + 1}</span>{item}</li>)}</ol><p><ShieldCheck/> Your setup is saved automatically.</p></aside>
      <section>
        {step < 9 ? <><small>STEP {step + 1} OF 10</small><h1>{setupContent[step][0]}</h1><p>{setupContent[step][1]}</p><SetupStep step={step}/><div className="setup-actions">{step > 0 && <button onClick={() => setStep(step - 1)}><ArrowLeft/> Back</button>}<button className="primary-button" onClick={() => setStep(step + 1)}>Save and continue <ArrowRight/></button></div></> : <div className="setup-finish"><span><Check/></span><small>YOUR WORKSPACE IS READY</small><h1>Welcome to EvoEstate.</h1><p>Your agency, team, lead routing, commissions, and inventory foundations are in place.</p><Link className="primary-button" href="/dashboard">Open my workspace <ArrowRight/></Link></div>}
      </section>
    </main>
  );
}

const setupContent = [
  ["Tell us about your agency.", "This shapes your workspace, website, and client documents."],
  ["Where does your team work?", "Add branches now. You can refine territories and hours later."],
  ["Invite your first teammates.", "Roles create a focused experience for each person."],
  ["What property do you represent?", "Choose the categories your team works with most."],
  ["Set your market currencies.", "Pricing and reporting can support multiple currencies."],
  ["How do commissions work?", "Create rules once and calculate payouts automatically."],
  ["Where do leads come from?", "Connect attribution from first enquiry to closed revenue."],
  ["Bring your property inventory.", "Import a file or begin with a clean workspace."],
  ["Bring your client relationships.", "Import contacts, history, and ownership links."],
  ["You’re ready.", "Open the workspace and invite the rest of your team."],
];

function SetupStep({ step }: { step: number }) {
  if (step === 0) return <div className="setup-fields"><label>Agency name<input defaultValue="North & Co. Property"/></label><label>Primary market<input defaultValue="Algiers, Algeria"/></label><label>Website<input placeholder="northandco.com"/></label><label>Timezone<select><option>Africa/Algiers (GMT+1)</option></select></label></div>;
  if ([1,2,3,6].includes(step)) {
    const options = step === 1 ? ["Hydra HQ", "Oran"] : step === 2 ? ["Amira Kaci · Owner", "Nadia Benali · Sales Agent"] : step === 3 ? ["Residential sale", "Luxury", "Commercial", "Rental", "Land", "New projects"] : ["Website", "Property portals", "WhatsApp", "Referral", "Walk-in", "Paid campaign"];
    return <div className="setup-choice-grid">{options.map((item, index) => <button className={index < 3 ? "selected" : ""} key={item}><span>{index < 3 ? <Check/> : <Plus/>}</span><b>{item}</b></button>)}</div>;
  }
  if ([4,5].includes(step)) return <div className="setup-fields"><label>{step === 4 ? "Primary currency" : "Default sales commission"}<select><option>{step === 4 ? "DZD — Algerian Dinar" : "2.5% of closed value"}</option></select></label><label>{step === 4 ? "Secondary currency" : "Agent split"}<select><option>{step === 4 ? "EUR — Euro" : "40% to listing agent"}</option></select></label></div>;
  return <div className="import-panel"><Upload/><h3>{step === 7 ? "Import properties" : "Import clients"}</h3><p>Drop a CSV or Excel file here. We’ll help map columns and flag duplicates before importing.</p><button>Choose file</button><span>or <button>skip for now</button></span></div>;
}

function Workspace({ pageKey, dark, onTheme, onCommand, onNotifications }: { pageKey: PageKey; dark: boolean; onTheme: () => void; onCommand: () => void; onNotifications: () => void }) {
  const [sidebar, setSidebar] = useState(false);
  return (
    <main className="workspace">
      <aside className={`workspace-sidebar ${sidebar ? "open" : ""}`}>
        <Link href="/dashboard"><Brand inverse/></Link>
        <button className="agency-switcher"><span>N&</span><span><b>North & Co.</b><small>Hydra HQ</small></span><ChevronDown/></button>
        <nav>{workspaceNav.map(([Icon, label, href]) => <Link className={href === `/${pageKey}` ? "active" : ""} href={href} key={href}><Icon/><span>{label}</span>{label === "CRM" && <i>12</i>}</Link>)}</nav>
        <div className="sidebar-bottom"><Link href="/support"><MessageCircle/> Support</Link><Link href="/settings"><Settings/> Settings</Link><button><span className="user-avatar">NB</span><span><b>Nadia Benali</b><small>Senior Advisor</small></span><MoreHorizontal/></button></div>
      </aside>
      <section className="workspace-main">
        <header className="workspace-header">
          <button className="workspace-menu" onClick={() => setSidebar(!sidebar)}><Menu/></button>
          <button className="command-trigger" onClick={onCommand}><Search/><span>Search anything or run a command</span><kbd>⌘ K</kbd></button>
          <div><button onClick={onTheme}>{dark ? <Sun/> : <Moon/>}</button><button onClick={onNotifications}><Bell/><i/></button><button className="quick-add"><Plus/> <span>New</span></button></div>
        </header>
        <WorkspacePage pageKey={pageKey}/>
      </section>
    </main>
  );
}

function WorkspacePage({ pageKey }: { pageKey: PageKey }) {
  switch (pageKey) {
    case "dashboard": return <RoleDashboard/>;
    case "crm": return <CrmScreen/>;
    case "pipeline": return <PipelineScreen/>;
    case "calendar": return <CalendarScreen/>;
    case "inventory": return <InventoryScreen/>;
    case "documents": return <DocumentsScreen/>;
    case "marketing": return <MarketingScreen/>;
    case "finance": return <FinanceScreen/>;
    case "reports": return <ReportsScreen/>;
    case "team": return <TeamScreen/>;
    case "legal": return <DocumentsScreen legal/>;
    case "support": return <SupportScreen/>;
    case "settings": return <SettingsScreen/>;
    default: return <RoleDashboard/>;
  }
}

const roleData: Record<string, { greeting: string; focus: string; stats: string[][] }> = {
  "Sales Agent": { greeting: "Good morning, Nadia.", focus: "You have 3 visits and 8 follow-ups today.", stats: [["12", "Active leads", "+3 today"], ["DZD 284M", "Pipeline value", "+12.8%"], ["68%", "Follow-up complete", "5 remaining"], ["4", "Offers in progress", "2 need action"]] },
  "Agency Owner": { greeting: "Business at a glance.", focus: "Revenue is ahead of target and conversion improved this month.", stats: [["DZD 18.4M", "Revenue this month", "+14.2%"], ["31", "Closed transactions", "+6"], ["27%", "Lead conversion", "+4.1%"], ["94%", "Forecast confidence", "On track"]] },
  "Branch Manager": { greeting: "Hydra operations.", focus: "The team is on pace. Two approvals and one room conflict need attention.", stats: [["42", "Visits this week", "+8"], ["89%", "Team attendance", "2 away"], ["7", "Pending approvals", "2 urgent"], ["76%", "Inventory coverage", "+5%"]] },
  "Property Manager": { greeting: "Portfolio operations.", focus: "Three maintenance requests and two inspections are due today.", stats: [["186", "Managed units", "94% occupied"], ["3", "Urgent requests", "Needs action"], ["12", "Inspections", "This week"], ["DZD 4.8M", "Rent collected", "91% complete"]] },
  "Marketing Manager": { greeting: "Demand generation.", focus: "Luxury campaign cost per qualified lead improved by 18%.", stats: [["284", "New leads", "+22%"], ["DZD 1,840", "Cost per lead", "-18%"], ["7.8%", "Landing conversion", "+1.3%"], ["12.4x", "Campaign ROI", "Strong"]] },
  "Accountant": { greeting: "Finance control.", focus: "Eight commissions are ready and three invoices are overdue.", stats: [["DZD 18.4M", "Revenue", "+14.2%"], ["DZD 3.2M", "Commissions due", "8 payouts"], ["3", "Overdue invoices", "DZD 420K"], ["28%", "Operating margin", "+2.4%"]] },
  "Legal Officer": { greeting: "Legal workbench.", focus: "Four contracts and two ownership checks are awaiting review.", stats: [["4", "Contracts to review", "2 urgent"], ["2", "Ownership checks", "Awaiting file"], ["96%", "Compliance complete", "+3%"], ["7", "Signatures pending", "3 today"]] },
};

function RoleDashboard() {
  const [role, setRole] = useState("Sales Agent");
  const data = roleData[role];
  return (
    <div className="workspace-page dashboard-page">
      <div className="page-title-row"><div><span>TODAY · FRIDAY, JULY 24</span><h1>{data.greeting}</h1><p>{data.focus}</p></div><div className="role-switch"><UserRound/><select value={role} onChange={(event) => setRole(event.target.value)}>{Object.keys(roleData).map((item) => <option key={item}>{item}</option>)}</select></div></div>
      <div className="stat-grid">{data.stats.map(([value, label, note], index) => <article key={label}><div><small>{label}</small><span className={`trend trend-${index}`}>{note}</span></div><strong>{value}</strong><i><span style={{ width: `${54 + index * 10}%` }}/></i></article>)}</div>
      <div className="dashboard-grid">
        <section className="today-agenda panel"><div className="panel-head"><div><h2>Today’s agenda</h2><span>3 visits · 2 calls · 1 deadline</span></div><Link href="/calendar">Open calendar <ArrowRight/></Link></div>{[
          ["09:30", "Property visit", "Villa Serein · Sarah & Karim", "Confirmed", "visit"],
          ["11:15", "Buyer follow-up", "Thomas L. · Shortlist review", "Due", "call"],
          ["14:00", "Final inspection", "L’Orangerie Penthouse", "Confirmed", "visit"],
          ["16:30", "Offer deadline", "Cliff House 07 · DZD 112M", "Critical", "deadline"],
        ].map(([time, type, title, status, tone]) => <article key={time}><time>{time}</time><span className={`agenda-icon ${tone}`}>{tone === "visit" ? <Home/> : tone === "call" ? <Phone/> : <FileSignature/>}</span><div><small>{type}</small><b>{title}</b></div><em>{status}</em><button><MoreHorizontal/></button></article>)}</section>
        <section className="focus-panel panel"><div className="panel-head"><div><h2>Focus next</h2><span>AI-prioritized by deal momentum</span></div><Sparkles/></div><article><span className="lead-score">94</span><div><small>HOT LEAD · 18 MIN AGO</small><h3>Sarah & Karim B.</h3><p>Revisited Villa Serein twice and opened financing documents.</p></div><div><button className="primary-button"><Phone/> Call now</button><button>Open lead</button></div></article><article><span className="lead-score warm">82</span><div><small>FOLLOW-UP OVERDUE</small><h3>Thomas Laurent</h3><p>Asked for a shortlist under DZD 75M.</p></div><div><button><Send/> Send shortlist</button></div></article></section>
        <section className="pipeline-snapshot panel"><div className="panel-head"><div><h2>My pipeline</h2><span>DZD 284M weighted value</span></div><Link href="/pipeline">View pipeline</Link></div><div className="funnel">{[["New", 12, "100%"], ["Qualified", 8, "76%"], ["Visits", 5, "54%"], ["Offers", 4, "39%"], ["Contract", 2, "21%"]].map(([label, count, width]) => <div key={label}><span><b>{count}</b>{label}</span><i><em style={{ width }}/></i></div>)}</div></section>
        <section className="activity-panel panel"><div className="panel-head"><div><h2>Live activity</h2><span>Across your deals</span></div><Activity/></div>{[["SK", "Sarah viewed Villa Serein", "4 min"], ["AI", "Lead score increased to 94", "12 min"], ["YL", "Yacine shared a contract", "28 min"], ["TM", "Thomas replied on WhatsApp", "41 min"]].map(([avatar, text, time]) => <div key={text}><span>{avatar}</span><p>{text}</p><small>{time}</small></div>)}</section>
      </div>
    </div>
  );
}

const leads = [
  { name: "Sarah & Karim B.", need: "Luxury villa · Hydra", score: 94, source: "Website", status: "Visit scheduled", value: "DZD 145M", next: "Today · 09:30" },
  { name: "Thomas Laurent", need: "3-bed apartment · El Biar", score: 82, source: "Referral", status: "Qualified", value: "DZD 72M", next: "Follow-up overdue" },
  { name: "Ines Belkacem", need: "Investment · Commercial", score: 78, source: "LinkedIn", status: "Contacted", value: "DZD 210M", next: "Tomorrow · 11:00" },
  { name: "Nassim A.", need: "Rental · Oran Centre", score: 71, source: "WhatsApp", status: "New", value: "DZD 320K/mo", next: "Today · 15:00" },
  { name: "Meriem Boudiaf", need: "Sell villa · Dely Brahim", score: 68, source: "Valuation", status: "New", value: "DZD 98M", next: "Today · 16:15" },
];

function CrmScreen() {
  const [selected, setSelected] = useState(0);
  const [filter, setFilter] = useState("All leads");
  return (
    <div className="workspace-page crm-page">
      <div className="page-title-row"><div><span>RELATIONSHIPS</span><h1>CRM</h1><p>Every lead, conversation, property match, and next step in one place.</p></div><button className="primary-button"><Plus/> New lead</button></div>
      <div className="crm-toolbar"><div className="workspace-search"><Search/><input placeholder="Search people, phone, email, property…"/></div><select value={filter} onChange={(event) => setFilter(event.target.value)}><option>All leads</option><option>My leads</option><option>Hot leads</option><option>Needs follow-up</option></select><button><Filter/> Advanced filters</button><button><Upload/> Import</button></div>
      <div className="crm-layout">
        <section className="lead-table panel"><div className="table-head"><span>CLIENT</span><span>AI SCORE</span><span>STATUS</span><span>VALUE</span><span>NEXT ACTION</span><span/></div>{leads.map((lead, index) => <button className={selected === index ? "selected" : ""} onClick={() => setSelected(index)} key={lead.name}><span className="lead-person"><i>{lead.name.split(" ").map((part) => part[0]).slice(0,2).join("")}</i><span><b>{lead.name}</b><small>{lead.need} · {lead.source}</small></span></span><span className={`score score-${lead.score > 85 ? "hot" : lead.score > 75 ? "warm" : "cool"}`}><i>{lead.score}</i><small>{lead.score > 85 ? "Very likely" : "Engaged"}</small></span><span><em>{lead.status}</em></span><b>{lead.value}</b><span className={lead.next.includes("overdue") ? "overdue" : ""}>{lead.next}</span><ChevronRight/></button>)}</section>
        <LeadDrawer lead={leads[selected]}/>
      </div>
    </div>
  );
}

function LeadDrawer({ lead }: { lead: typeof leads[number] }) {
  const [tab, setTab] = useState("Overview");
  return <aside className="lead-drawer panel"><div className="lead-profile"><span>{lead.name.split(" ").map((part) => part[0]).slice(0,2).join("")}</span><div><small>BUYER · {lead.source.toUpperCase()}</small><h2>{lead.name}</h2><p>{lead.need}</p></div><button><MoreHorizontal/></button></div><div className="lead-actions"><button><Phone/><span>Call</span></button><button><MessageCircle/><span>WhatsApp</span></button><button><Mail/><span>Email</span></button><button><CalendarDays/><span>Visit</span></button></div><nav>{["Overview", "Activity", "Matches", "Files"].map((item) => <button className={tab === item ? "active" : ""} onClick={() => setTab(item)} key={item}>{item}</button>)}</nav><div className="lead-insight"><Sparkles/><div><small>AI NEXT BEST ACTION</small><b>Call before 11:00 today</b><p>High engagement and financing documents viewed. Mention Villa Serein’s second offer.</p></div></div><div className="lead-details"><span><small>PHONE</small><b>+213 560 •• 48</b></span><span><small>EMAIL</small><b>sarah@email.com</b></span><span><small>BUDGET</small><b>DZD 130M–150M</b></span><span><small>TIMEFRAME</small><b>Within 60 days</b></span></div><h3>Recent activity</h3>{[["Viewed Villa Serein", "Website · 18 min ago"], ["WhatsApp replied", "Conversation · 2h ago"], ["Visit confirmed", "Calendar · Yesterday"]].map(([title, note]) => <div className="drawer-activity" key={title}><i/><span><b>{title}</b><small>{note}</small></span></div>)}</aside>;
}

const columns = [
  { title: "New lead", value: "DZD 196M", items: [["Meriem Boudiaf", "Seller · Dely Brahim", "68"], ["Nassim A.", "Rental · Oran", "71"], ["Riad & Lyna", "Buyer · Hydra", "76"]] },
  { title: "Qualified", value: "DZD 282M", items: [["Thomas Laurent", "Apartment · El Biar", "82"], ["Ines Belkacem", "Commercial investor", "78"]] },
  { title: "Visit scheduled", value: "DZD 316M", items: [["Sarah & Karim", "Villa Serein · Today", "94"], ["Amine D.", "Cliff House · Sat", "86"]] },
  { title: "Offer & negotiation", value: "DZD 241M", items: [["Sofia Martin", "L’Orangerie · Offer sent", "91"], ["Northline Capital", "Nexus Tower · Legal", "88"]] },
  { title: "Contract", value: "DZD 162M", items: [["Yasmine & Elias", "Garden Residence", "96"]] },
];

function PipelineScreen() {
  return <div className="workspace-page pipeline-page"><div className="page-title-row"><div><span>SALES</span><h1>Deal pipeline</h1><p>41 active opportunities · DZD 1.2B total value</p></div><div><button><SlidersHorizontal/> Filters</button><button className="primary-button"><Plus/> New opportunity</button></div></div><div className="pipeline-board">{columns.map((column, columnIndex) => <section key={column.title}><header><div><span className={`column-dot dot-${columnIndex}`}/><b>{column.title}</b><em>{column.items.length}</em></div><small>{column.value}</small></header><div>{column.items.map(([name, detail, score]) => <article draggable key={name}><div><span>{name.split(" ").map((part) => part[0]).slice(0,2).join("")}</span><i>{score}</i></div><h3>{name}</h3><p>{detail}</p><small><Clock3/> Next action today</small><footer><b>{column.value}</b><MoreHorizontal/></footer></article>)}</div><button><Plus/> Add opportunity</button></section>)}</div></div>;
}

function CalendarScreen() {
  const [view, setView] = useState("Week");
  const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
  return <div className="workspace-page calendar-page"><div className="page-title-row"><div><span>SCHEDULE</span><h1>Calendar</h1><p>Visits, client meetings, deadlines, and travel time in one view.</p></div><button className="primary-button"><Plus/> New appointment</button></div><div className="calendar-toolbar"><div><button><ArrowLeft/></button><button>Today</button><button><ArrowRight/></button><b>July 20–26, 2026</b></div><div>{["Day", "Week", "Month"].map((item) => <button className={view === item ? "active" : ""} onClick={() => setView(item)} key={item}>{item}</button>)}</div><select><option>All agents</option><option>Nadia Benali</option><option>Yacine Haddad</option></select></div><div className="calendar-layout panel"><aside><h3>My calendars</h3>{["Property visits", "Client meetings", "Deadlines", "Team"].map((item, index) => <label key={item}><input type="checkbox" defaultChecked/><i className={`cal-tone-${index}`}/>{item}</label>)}<div className="travel-card"><Compass/><b>Travel intelligence on</b><p>12 minutes of buffer added automatically today.</p></div></aside><section className="week-calendar"><header><span>GMT+1</span>{["MON 20", "TUE 21", "WED 22", "THU 23", "FRI 24"].map((day, index) => <b className={index === 4 ? "today" : ""} key={day}>{day}<i>{20 + index}</i></b>)}</header><div className="calendar-grid">{hours.map((hour) => <span className="hour" key={hour}>{hour}</span>)}<article className="event e1"><small>09:30–10:30</small><b>Villa Serein</b><span>Sarah & Karim · Nadia</span></article><article className="event e2"><small>11:15–11:45</small><b>Buyer follow-up</b><span>Thomas Laurent · Video</span></article><article className="event e3"><small>14:00–15:00</small><b>Final inspection</b><span>L’Orangerie · Sofia</span></article><article className="event e4"><small>16:30</small><b>Offer deadline</b><span>Cliff House 07</span></article><div className="now-line"><span>14:22</span></div></div></section></div></div>;
}

function InventoryScreen() {
  const [status, setStatus] = useState("All");
  const filtered = status === "All" ? properties : properties.filter((property) => property.status === status);
  return <div className="workspace-page inventory-page"><div className="page-title-row"><div><span>INVENTORY</span><h1>Properties</h1><p>186 properties · DZD 8.4B portfolio value</p></div><button className="primary-button"><Plus/> Add property</button></div><div className="inventory-stats">{[["124", "Available"], ["18", "Under offer"], ["9", "Reserved"], ["35", "Sold / rented"]].map(([value,label]) => <article key={label}><b>{value}</b><span>{label}</span></article>)}</div><div className="inventory-toolbar"><div>{["All", "Available", "Under offer", "Reserved"].map((item) => <button className={status === item ? "active" : ""} onClick={() => setStatus(item)} key={item}>{item}</button>)}</div><div className="workspace-search"><Search/><input placeholder="Search property, owner, ref…"/></div><button><Filter/> Filter</button></div><div className="inventory-grid">{filtered.map((property) => <article key={property.id}><div className="inventory-image" style={{ backgroundImage: `url(${property.image})` }}><span>{property.status}</span><button><MoreHorizontal/></button></div><div><small>EV-{String(property.id).padStart(4,"0")} · {property.tag}</small><h3>{property.title}</h3><p><MapPin/>{property.area}</p><strong>{property.price}</strong><footer><span><UserRound/>{property.agent}</span><span><Heart/>{12 + property.id * 3} leads</span></footer></div></article>)}</div></div>;
}

function DocumentsScreen({ legal = false }: { legal?: boolean }) {
  const docs = [["Offer — Villa Serein", "Offer", "Sarah & Karim", "Needs signature", "Today"], ["Ownership certificate — Cliff House", "Ownership", "Amine D.", "Under review", "2h ago"], ["Reservation — Garden Residence", "Contract", "Sofia Martin", "Approved", "Yesterday"], ["Identity declaration — Nexus Tower", "Compliance", "Northline Capital", "Missing file", "Yesterday"], ["Invoice EV-2048", "Invoice", "Yasmine & Elias", "Paid", "Jul 21"]];
  return <div className="workspace-page documents-page"><div className="page-title-row"><div><span>{legal ? "LEGAL WORKBENCH" : "DOCUMENT CONTROL"}</span><h1>{legal ? "Contracts & compliance" : "Documents"}</h1><p>Versioned, verified, and connected to the right deal.</p></div><button className="primary-button"><Plus/> New document</button></div><div className="document-stats">{[["7", "Need signature", FileSignature], ["4", "Awaiting review", Clock3], ["2", "Missing documents", Upload], ["96%", "Compliance complete", ShieldCheck]].map(([value,label,Icon]) => { const DIcon = Icon as typeof FileSignature; return <article key={String(label)}><DIcon/><span><b>{String(value)}</b><small>{String(label)}</small></span></article>; })}</div><section className="document-table panel"><header><div className="workspace-search"><Search/><input placeholder="Search documents…"/></div><button><Filter/> Filter</button><button><ListFilter/> Templates</button></header><div className="doc-row head"><span>DOCUMENT</span><span>TYPE</span><span>CLIENT / DEAL</span><span>STATUS</span><span>UPDATED</span><span/></div>{docs.map(([name,type,client,status,time]) => <button className="doc-row" key={name}><span><FileCheck2/><b>{name}</b></span><span>{type}</span><span>{client}</span><span><em className={`doc-${status.toLowerCase().replaceAll(" ","-")}`}>{status}</em></span><span>{time}</span><MoreHorizontal/></button>)}</section></div>;
}

function MarketingScreen() {
  return <div className="workspace-page marketing-page"><div className="page-title-row"><div><span>GROWTH</span><h1>Marketing studio</h1><p>Campaigns, property content, lead attribution, and website performance.</p></div><button className="primary-button"><Plus/> Create campaign</button></div><div className="stat-grid">{[["284","Qualified leads","+22%"],["DZD 1,840","Cost per lead","-18%"],["7.8%","Landing conversion","+1.3%"],["12.4x","Attributed ROI","Strong"]].map(([value,label,note]) => <article key={label}><div><small>{label}</small><span className="trend">{note}</span></div><strong>{value}</strong><i><span style={{width:"72%"}}/></i></article>)}</div><div className="marketing-layout"><section className="campaigns panel"><div className="panel-head"><div><h2>Active campaigns</h2><span>4 campaigns · DZD 720K spend</span></div><button>View all</button></div>{[["Hydra Luxury Collection","Meta + Instagram","142 leads","16.8x"],["Nexus Commercial Launch","LinkedIn + Google","68 leads","9.4x"],["Free Valuation — Algiers","Search + Landing page","74 leads","11.2x"]].map(([name,channel,leadsCount,roi],index) => <article key={name}><span className={`campaign-icon c${index}`}><Target/></span><div><b>{name}</b><small>{channel}</small></div><span><small>RESULTS</small><b>{leadsCount}</b></span><span><small>ROI</small><b>{roi}</b></span><button><MoreHorizontal/></button></article>)}</section><section className="ai-studio panel"><WandSparkles/><small>AI CONTENT STUDIO</small><h2>Turn a property into a campaign.</h2><p>Generate a refined description, portal listings, social variants, email, and a landing page from one verified record.</p><select><option>Villa Serein · EV-0001</option></select><button className="primary-button"><Sparkles/> Generate campaign kit</button></section><section className="source-chart panel"><div className="panel-head"><div><h2>Lead sources</h2><span>Qualified leads · Last 30 days</span></div></div><div className="donut"><span><b>284</b><small>total</small></span></div>{[["Website",38],["WhatsApp",24],["Referrals",18],["Paid campaigns",14],["Other",6]].map(([label,value],index) => <p key={String(label)}><i className={`source-${index}`}/><span>{label}</span><b>{value}%</b></p>)}</section></div></div>;
}

function FinanceScreen() {
  return <div className="workspace-page finance-page"><div className="page-title-row"><div><span>FINANCIAL CONTROL</span><h1>Finance</h1><p>Revenue, commissions, invoices, expenses, and payout visibility.</p></div><button className="primary-button"><Plus/> New invoice</button></div><div className="stat-grid">{[["DZD 18.4M","Revenue this month","+14.2%"],["DZD 3.2M","Commissions payable","8 agents"],["DZD 420K","Outstanding","3 invoices"],["28.4%","Operating margin","+2.4%"]].map(([value,label,note]) => <article key={label}><div><small>{label}</small><span className="trend">{note}</span></div><strong>{value}</strong><i><span style={{width:"68%"}}/></i></article>)}</div><div className="finance-layout"><section className="revenue-chart panel"><div className="panel-head"><div><h2>Revenue performance</h2><span>Monthly recognized revenue</span></div><select><option>Last 12 months</option></select></div><div className="bar-chart">{[38,46,41,55,64,61,72,68,82,79,91,96].map((value,index) => <span key={index}><i style={{height:`${value}%`}}/><small>{["A","S","O","N","D","J","F","M","A","M","J","J"][index]}</small></span>)}</div></section><section className="payouts panel"><div className="panel-head"><div><h2>Commission payouts</h2><span>DZD 3.2M ready for review</span></div><button>Review all</button></div>{[["Nadia Benali","Villa Serein","DZD 1.16M"],["Yacine Haddad","Nexus Tower","DZD 940K"],["Leila Merabet","Atelier Loft","DZD 320K"]].map(([name,deal,value]) => <article key={name}><span>{name.split(" ").map(p=>p[0]).join("")}</span><div><b>{name}</b><small>{deal}</small></div><strong>{value}</strong><em>Ready</em></article>)}</section></div></div>;
}

function ReportsScreen() {
  return <div className="workspace-page reports-page"><div className="page-title-row"><div><span>BUSINESS INTELLIGENCE</span><h1>Reports</h1><p>One trustworthy view of performance, productivity, and opportunity.</p></div><div><button><CalendarDays/> Jul 1–24</button><button className="primary-button"><Upload/> Export</button></div></div><div className="report-tabs">{["Executive", "Sales", "Agents", "Marketing", "Properties", "Appointments", "Finance"].map((item,index)=><button className={index===0?"active":""} key={item}>{item}</button>)}</div><div className="stat-grid">{[["DZD 18.4M","Revenue","+14.2%"],["27.4%","Lead conversion","+4.1%"],["31","Transactions","+6"],["41 days","Average cycle","-8 days"]].map(([value,label,note]) => <article key={label}><div><small>{label}</small><span className="trend">{note}</span></div><strong>{value}</strong><i><span style={{width:"76%"}}/></i></article>)}</div><div className="reports-layout"><section className="performance-chart panel"><div className="panel-head"><div><h2>Revenue & forecast</h2><span>Actual performance against plan</span></div><span className="legend"><i/> Actual <i/> Forecast</span></div><div className="line-chart"><i className="gridline l1"/><i className="gridline l2"/><i className="gridline l3"/><span className="chart-path"/><span className="chart-path forecast"/></div></section><section className="leaderboard panel"><div className="panel-head"><div><h2>Agent performance</h2><span>Weighted contribution</span></div></div>{[["Nadia Benali","DZD 6.8M","142%"],["Yacine Haddad","DZD 5.1M","118%"],["Leila Merabet","DZD 3.9M","104%"],["Sami Khelifi","DZD 2.6M","92%"]].map(([name,value,target],index)=><article key={name}><span>{index+1}</span><i>{name.split(" ").map(p=>p[0]).join("")}</i><div><b>{name}</b><small>{target} of target</small></div><strong>{value}</strong></article>)}</section></div></div>;
}

function TeamScreen() {
  return <div className="workspace-page team-page"><div className="page-title-row"><div><span>PEOPLE & PERFORMANCE</span><h1>Team</h1><p>24 people · 2 branches · 3 away today</p></div><button className="primary-button"><Plus/> Invite employee</button></div><div className="team-grid">{[["Nadia Benali","Senior Sales Agent","Hydra HQ","142%"],["Yacine Haddad","Commercial Advisor","Hydra HQ","118%"],["Leila Merabet","Rental Specialist","Oran","104%"],["Sami Khelifi","Sales Agent","Hydra HQ","92%"],["Amira Kaci","Agency Owner","Hydra HQ","On track"],["Rania Touati","Legal Officer","Hydra HQ","96%"]].map(([name,role,branch,target],index)=><article key={name}><div className={`team-avatar t${index}`}>{name.split(" ").map(p=>p[0]).join("")}</div><em className={index===2?"away":""}>{index===2?"Away":"Online"}</em><h3>{name}</h3><p>{role}</p><span><MapPin/>{branch}</span><div><small>MONTHLY TARGET</small><b>{target}</b><i><span style={{width:target.includes("%")?target:"78%"}}/></i></div><button>View performance <ArrowRight/></button></article>)}</div></div>;
}

function SupportScreen() {
  return <div className="workspace-page support-page"><div className="page-title-row"><div><span>CLIENT EXPERIENCE</span><h1>Support desk</h1><p>Calls, messages, complaints, and service recovery in one queue.</p></div><button className="primary-button"><Plus/> New ticket</button></div><div className="support-layout"><section className="ticket-list panel">{[["Urgent","Water leak · Garden Residence","Tenant · 6 min ago"],["High","Viewing access issue","Agent · 18 min ago"],["Normal","Invoice clarification","Client · 34 min ago"],["Normal","Portal password reset","Client · 41 min ago"]].map(([priority,title,note],index)=><button className={index===0?"active":""} key={title}><i className={`priority-${priority.toLowerCase()}`}/><div><small>{priority}</small><b>{title}</b><span>{note}</span></div><ChevronRight/></button>)}</section><section className="ticket-detail panel"><div><span className="ticket-icon"><Zap/></span><div><small>TICKET #2048 · URGENT</small><h2>Water leak · Garden Residence</h2><p>Submitted by tenant · 6 minutes ago</p></div><button><MoreHorizontal/></button></div><div className="ticket-message"><span>SK</span><p><b>Salima K.</b><small>15:14</small>The ceiling is leaking near the main bathroom. I have turned off the local valve but need urgent help.</p></div><div className="ticket-ai"><Sparkles/><p><b>Suggested action</b>Dispatch approved emergency plumber, notify property manager, and schedule damage inspection within 24 hours.</p><button>Apply response</button></div><textarea placeholder="Reply to Salima…"/><div><button><Upload/></button><button className="primary-button">Send update <Send/></button></div></section></div></div>;
}

function SettingsScreen() {
  return <div className="workspace-page settings-page"><div className="page-title-row"><div><span>WORKSPACE</span><h1>Settings</h1><p>Agency, branches, roles, automations, channels, and platform preferences.</p></div></div><div className="settings-layout"><nav>{["Agency profile","Branches","Roles & permissions","Lead routing","Commission rules","Communication","Integrations","Security & audit","Billing"].map((item,index)=><button className={index===0?"active":""} key={item}>{item}<ChevronRight/></button>)}</nav><section className="panel"><small>AGENCY PROFILE</small><h2>North & Co. Property</h2><p>Core details used across your workspace, website, and documents.</p><div className="settings-logo"><span>N&</span><button>Change logo</button></div><div className="settings-fields"><label>Agency name<input defaultValue="North & Co. Property"/></label><label>Legal name<input defaultValue="North & Co. Advisory SARL"/></label><label>Primary market<input defaultValue="Algiers, Algeria"/></label><label>Workspace URL<input defaultValue="northandco.evoestate.app"/></label><label>Default currency<select><option>DZD — Algerian Dinar</option></select></label><label>Timezone<select><option>Africa/Algiers (GMT+1)</option></select></label></div><button className="primary-button">Save changes</button></section></div></div>;
}

function CommandPalette({ onClose, publicMode = false }: { onClose: () => void; publicMode?: boolean }) {
  const commands = publicMode
    ? [[Search, "Search all properties", "/properties"], [Home, "Browse homes for sale", "/buy"], [KeyRound, "Browse rentals", "/rent"], [CalendarDays, "Book a private visit", "/book-visit"], [Gauge, "Request a valuation", "/valuation"]]
    : [[Plus, "Create a new lead", "/crm"], [Building2, "Add a property", "/inventory"], [CalendarDays, "Schedule a visit", "/calendar"], [FileSignature, "Create an offer", "/documents"], [Search, "Search all records", "/dashboard"]];
  return <div className="command-layer" onMouseDown={onClose}><div className="command-palette" onMouseDown={(event)=>event.stopPropagation()}><div><Search/><input autoFocus placeholder={publicMode ? "Search properties, areas, or services…" : "Search or type a command…"}/><kbd>ESC</kbd></div><small>{publicMode ? "QUICK DESTINATIONS" : "SUGGESTED COMMANDS"}</small>{commands.map(([Icon,label,href],index)=>{const CIcon=Icon as typeof Search;return <Link href={String(href)} onClick={onClose} key={String(label)}><span><CIcon/><b>{String(label)}</b></span><em>⌘ {index+1}</em></Link>})}<footer><span><kbd>↑↓</kbd> Navigate</span><span><kbd>↵</kbd> Open</span><span><Command/> K anywhere</span></footer></div></div>;
}

function NotificationPanel({ onClose }: { onClose: () => void }) {
  return <aside className="notification-panel"><header><div><h2>Notifications</h2><span>4 new</span></div><button onClick={onClose}><X/></button></header>{[["Offer opened","Sarah viewed the revised Villa Serein offer.","2 min",FileSignature],["Visit confirmed","Thomas confirmed Saturday at 11:00.","12 min",CalendarDays],["New lead assigned","Meriem requested a valuation in Dely Brahim.","24 min",Sparkles],["Signature complete","Sofia signed the reservation agreement.","1h",CheckCircle2]].map(([title,text,time,Icon])=>{const NIcon=Icon as typeof Bell;return <article key={String(title)}><span><NIcon/></span><div><b>{String(title)}</b><p>{String(text)}</p><small>{String(time)}</small></div></article>})}<button>View all activity</button></aside>;
}

