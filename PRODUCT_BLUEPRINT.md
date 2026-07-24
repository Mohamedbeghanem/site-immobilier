# EvoEstate Product Blueprint

## Product principle

EvoEstate is a connected operating system for real-estate agencies. Property is the central record. Every lead, visit, offer, contract, payment, campaign, owner, tenant, and task connects back to a property and a responsible person.

The interface prioritizes:

- one-click daily actions;
- visible next steps and ownership;
- progressive disclosure through drawers;
- automation before manual entry;
- keyboard-first navigation with `Cmd/Ctrl + K`;
- role-specific information density;
- one auditable source of truth.

## Information architecture

### Public experience

- Home
- Property discovery
  - All properties
  - Buy
  - Rent
  - Luxury
  - Commercial
  - New projects
  - Property detail
- Advisors
- Company
- Market journal
- Contact
- Book a visit
- Property valuation
- Client portal

### Agency workspace

- Today
- CRM
  - Leads
  - Buyers
  - Sellers
  - Owners
  - Tenants
  - Investors
  - Activities
- Pipeline
- Calendar
- Property inventory
  - Residential
  - Commercial
  - Luxury
  - Projects
  - Land
  - Rentals
- Documents and legal
- Marketing studio
- Finance
- Reports
- Team
- Support
- Settings and audit

### Platform administration

- Platform health
- Agencies
- Subscriptions
- Support tickets
- API usage
- Audit logs
- Plans and billing
- Global configuration

## Role journeys

| Role | First screen | Primary outcome | Daily workflow |
|---|---|---|---|
| Super Admin | Platform health | Keep the SaaS reliable and profitable | Review health → subscriptions → support → exceptions → audit |
| Agency Owner | Executive dashboard | Improve growth, margin, and forecast accuracy | Review KPIs → compare branches → inspect forecast → approve investments |
| Branch Manager | Operations dashboard | Keep people, inventory, and appointments moving | Review exceptions → assign leads → approve listings → unblock team |
| Sales Agent | Today | Move the highest-value relationships forward | Focus queue → calls → visits → offers → notes → next actions |
| Property Manager | Portfolio operations | Protect occupancy and service quality | Triage requests → dispatch → inspect → update owners → close work |
| Marketing Manager | Marketing studio | Generate qualified, attributable demand | Review performance → create campaigns → optimize spend → route leads |
| Customer Support | Support desk | Resolve issues quickly and protect trust | Triage tickets → respond → coordinate → escalate → close |
| Accountant | Finance | Maintain accurate cash, commission, and tax records | Reconcile → invoice → review payouts → follow up overdue balances |
| Legal Officer | Legal workbench | Complete compliant transactions | Verify ownership → review offer → approve contract → collect signatures |
| Client | Client portal | Understand and complete the next step | Browse saved homes → book visit → track offer → sign → pay → message |

## Core workflows

### New enquiry to qualified opportunity

1. Capture from website, portal, WhatsApp, phone, referral, or campaign.
2. Deduplicate against people, companies, and existing conversations.
3. Enrich contact, intent, budget, timing, and preferred locations.
4. Calculate explainable lead score.
5. Route by branch, territory, property type, language, capacity, and source.
6. Create the next action and response SLA.
7. Match suitable properties.
8. Move to qualified when needs, funding, and timing are confirmed.

### Listing acquisition

1. Valuation enquiry.
2. Comparable and market analysis.
3. Ownership and identity verification.
4. Valuation appointment.
5. Agency agreement and commission rules.
6. Property capture, media, floor plans, amenities, documents, and owner approval.
7. AI-assisted description with human review.
8. Publish to website, portals, email, and campaigns.
9. Track demand, visits, feedback, offers, and price history.

### Property visit

1. Select property and client.
2. Check agent, property, branch, and travel conflicts.
3. Suggest time using duration, location, and travel estimates.
4. Send confirmation and directions.
5. Send WhatsApp, SMS, and email reminders.
6. Record attendance and visit notes.
7. Capture structured feedback.
8. Trigger follow-up, offer, shortlist, or nurture.

### Offer to completion

1. Create offer from client and property records.
2. Verify proof of funds and identity.
3. Track counteroffers and expiry.
4. Accept and open legal checklist.
5. Verify ownership and required documents.
6. Generate contract from approved template.
7. Route approvals and digital signatures.
8. Track reservation payment, invoice, commission, and completion.
9. Update property status and archive the full audit trail.

### Maintenance request

1. Tenant submits portal request with media.
2. Detect urgency and affected property.
3. Notify property manager and owner according to rules.
4. Dispatch approved vendor.
5. Track appointment, cost estimate, approval, work, and inspection.
6. Update tenant and owner automatically.
7. Close with invoice, evidence, and satisfaction score.

## Screen inventory

Every screen includes purpose, primary user, state-aware actions, filters, keyboard access, empty/loading/error states, and responsive rules.

### Public

- Home: search, featured property, collections, market insight, advisor trust, testimonials.
- Property explorer: intent, location, price, type, amenity, status, list/map toggle, saved search.
- Property detail: gallery, facts, description, floor plans, media, map, services, price history, advisor, visit CTA.
- Luxury: private collection and discreet enquiry.
- Commercial: yield, occupancy, tenant, and investment context.
- Projects: developer, delivery, payment plan, availability, construction progress.
- Advisors: specialty, territory, languages, reviews, schedule.
- Journal: market, selling, investing, legal, neighbourhood, design.
- Contact: channel choice and private brief.
- Booking: property → advisor → date/time → details → confirmation.
- Valuation: type → location → details → initial range → advisor review.
- Client portal: saved property, visits, offer tracker, files, signatures, invoices, chat.

### Workspace

- Today: role switch, KPI strip, agenda, AI focus queue, pipeline snapshot, live activity.
- CRM: advanced search, saved filters, score, bulk actions, contact drawer, timeline, matches.
- Pipeline: drag-and-drop stages, weighted value, aging, next action, AI recommendations.
- Calendar: day/week/month, agent/property/branch views, travel buffer, conflict detection.
- Inventory: status, category, owner, agent, branch, completeness, lead demand.
- Property record: gallery, details, owner, price history, leads, visits, offers, files, publication.
- Documents: templates, versions, approvals, signatures, verification, expiry.
- Marketing: campaign list, content studio, channels, attribution, audiences, landing pages.
- Finance: revenue, invoice, receipt, payment, commission, expense, tax, reconciliation.
- Reports: executive, sales, agent, marketing, property, appointment, occupancy, finance.
- Team: roles, branches, permissions, attendance, targets, performance.
- Support: omnichannel ticket queue, SLA, AI suggestion, escalation, satisfaction.
- Settings: agency, branches, categories, currencies, commission rules, routing, integrations, security.

## Drawers and dialogs

- Quick create
- Lead detail
- Property preview
- Property editor
- Visit scheduler
- Conflict resolution
- Offer builder
- Contract preview
- Signature request
- Payment capture
- Commission review
- Campaign generator
- Import mapper
- Duplicate resolver
- Bulk assignment
- Notification centre
- Audit event detail
- Command palette

Drawers preserve context for most actions. Dialogs are reserved for confirmation, destructive actions, security, and focused multi-step flows.

## Component library

- Brand lockup
- App shell
- Public navigation
- Buttons: primary, subtle, ghost, destructive, split
- Icon button
- Inputs, comboboxes, date/time pickers, currency fields
- Property card and property row
- Lead card and lead score
- KPI card
- Filter bar and saved view
- Data table and bulk action bar
- Kanban board
- Calendar and appointment card
- Map, cluster, price pin, and draw area
- Timeline and activity feed
- Document viewer and status badge
- Gallery and media viewer
- Charts, funnel, forecast, and leaderboard
- Right drawer
- Command palette
- Notification centre
- Empty, loading, offline, permission, and error states

## Design tokens

- Accent: `#FF6B00`
- Accent dark: `#D95800`
- Ink: `#171715`
- Dark surface: `#191817`
- Paper: `#FFFEFA`
- Matte: `#F4F1EC`
- Border: `#E7E2DB`
- Success: `#277C62`
- Danger: `#C24934`
- Radius: 6, 8, 10, 12, 16, 22
- Spacing base: 4px
- Body type: Geist
- Editorial type: Iowan Old Style/Baskerville
- Motion: 120ms utility, 220ms component, 350ms panel, reduced-motion safe

## Data model

### Identity and organization

- PlatformUser
- Agency
- Branch
- Employee
- Role
- Permission
- Team
- Territory
- Subscription
- AuditEvent

### Property

- Property
- PropertyCategory
- PropertyStatusHistory
- Address
- Amenity
- PropertyMedia
- FloorPlan
- PropertyDocument
- PriceHistory
- Ownership
- Owner
- Development
- Unit
- Inspection
- MaintenanceRequest
- Vendor

### CRM and sales

- Person
- Company
- Lead
- LeadScore
- ClientRequirement
- Activity
- Conversation
- Message
- Call
- Note
- Task
- PropertyMatch
- Opportunity
- PipelineStage
- Visit
- Offer
- CounterOffer
- Reservation
- Transaction

### Documents and finance

- Document
- DocumentVersion
- Template
- Approval
- SignatureRequest
- ComplianceCheck
- Invoice
- InvoiceLine
- Payment
- Receipt
- Refund
- Expense
- CommissionRule
- CommissionPayout
- TaxRecord

### Marketing and analytics

- LeadSource
- Campaign
- AdAccount
- Audience
- LandingPage
- AttributionTouch
- Review
- Referral
- MetricSnapshot
- Forecast

## Permission model

Permissions combine role, agency, branch, territory, record ownership, action, and data sensitivity.

| Capability | Owner | Manager | Agent | Property Manager | Marketing | Support | Accountant | Legal | Client |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Business analytics | Full | Branch | Own | Portfolio | Campaign | Service | Finance | Limited | — |
| CRM | Full | Branch | Assigned | Limited | Read/segment | Service | Limited | Identity | Own |
| Property inventory | Full | Branch | Assigned | Managed | Publish | Read | Financial | Verify | Public/saved |
| Pipeline and offers | Full | Branch | Assigned | — | Attribution | Read | Payment | Legal | Own |
| Documents | Full | Approve | Deal | Property | Creative | Service | Finance | Full | Own |
| Finance | Full | Branch summary | Own commission | Property cost | Spend | — | Full | Transaction | Own |
| Team and permissions | Full | Branch | Self | Self | Self | Self | Self | Self | — |
| Audit | Full | Branch | Own activity | Own activity | Own activity | Own activity | Finance | Legal | Own access |

## Responsive experience

### Tablet

- Collapsible sidebar.
- Two-column dashboards.
- List-first property explorer with optional full-screen map.
- Drawers use 60–80% width.
- Kanban and calendar preserve horizontal scroll with sticky labels.
- Visit workflows remain full-size and touch-friendly.

### Mobile

- One-thumb public navigation and persistent primary CTA.
- Search-first property experience.
- Cards become full width.
- Workspace sidebar becomes an overlay.
- Role dashboard becomes a prioritized vertical feed.
- Tables become summary rows with detail drawers.
- Kanban becomes stage tabs.
- Calendar defaults to agenda/day.
- Quick create remains reachable from the header.

## States and accessibility

- Skeletons reproduce final geometry.
- Empty states explain why the screen is empty and provide one primary action.
- Errors preserve entered data and provide retry or recovery.
- Offline mode identifies stale data and queues safe writes.
- All controls have visible focus, labels, and 44px mobile targets.
- Colour is never the sole status indicator.
- AA contrast is required in both themes.
- Motion respects `prefers-reduced-motion`.

## Roadmap

### Phase 1 — Operating core

CRM, property inventory, pipeline, visits, documents, role dashboards, public website, client portal, reporting.

### Phase 2 — Automation

Lead routing, reminders, portal syndication, messaging channels, commission engine, signatures, accounting exports.

### Phase 3 — Intelligence

Explainable lead scoring, next-best action, property recommendations, valuation support, market analysis, forecasting, contract summaries.

### Phase 4 — Network

Multi-agency collaboration, referral marketplace, developer inventory feeds, mortgage and insurance partners, vendor network.

### Phase 5 — Global enterprise

Multi-country compliance, advanced tax, data residency, SSO/SCIM, enterprise audit, configurable workflows, open API and marketplace.
