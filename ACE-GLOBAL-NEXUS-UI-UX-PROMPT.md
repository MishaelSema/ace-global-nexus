# ACE GLOBAL NEXUS — Enterprise UI/UX Generation Prompt

## For Moonchild AI

---

## 1. PROJECT OVERVIEW

Design a complete enterprise web platform for **ACE GLOBAL NEXUS**, a global trade, investment, and strategic advisory firm connecting Africa with international markets. The platform spans a public-facing corporate website, a client portal, and a full admin dashboard.

**Brand Archetype:** The Sovereign — authoritative, globally connected, institutionally trusted, strategically intelligent.

**Tone Keywords:** Premium · Institutional · Executive · Data-driven · Diplomatic · Minimal · Authoritative

**Design Inspirations:** McKinsey digital, Bloomberg Terminal, Stripe Dashboard, Linear, Notion, BlackRock, Goldman Sachs digital platforms, Palantir.

**Anti-Patterns (avoid):** Startup aesthetics, playful gradients, oversized illustrations, cartoon icons, heavy shadows, bold color blocks, gamification elements.

---

## 2. DESIGN PRINCIPLES

1. **Authority through restraint** — Every element must earn its place. Ruthless editing.
2. **Data as decoration** — Charts, maps, and metrics serve as both information and visual texture.
3. **Whitespace is a feature** — Generous spacing communicates confidence and clarity.
4. **Consistency is non-negotiable** — One spacing scale, one type scale, one component language across all surfaces.
5. **Executive readability** — High information density without visual clutter. Clear hierarchies.

---

## 3. COLOR SYSTEM

### Primary Palette

| Role | Hex | Usage |
|---|---|---|
| Deep Navy | `#0B1F33` | Primary backgrounds, nav bars, footers, hero sections |
| Midnight Blue | `#102A43` | Secondary backgrounds, card surfaces (dark mode), section alternates |
| Rich Navy | `#1A3B5C` | Interactive states, hover backgrounds |

### Secondary Palette

| Role | Hex | Usage |
|---|---|---|
| Gold | `#C8A96B` | Primary accents, CTAs, active states, key metrics |
| Gold Light | `#DFC88E` | Hover states, subtle accents |
| Gold Dark | `#A6884A` | Active/pressed states |

### Neutral System

| Role | Hex | Usage |
|---|---|---|
| Pure White | `#FFFFFF` | Backgrounds, cards |
| Off White | `#F7F8FA` | Section backgrounds |
| Light Gray | `#EFF1F4` | Dividers, borders |
| Border Gray | `#D1D5DB` | Input borders |
| Muted | `#9CA3AF` | Secondary text, placeholders |
| Body | `#4B5563` | Body text |
| Heading | `#111827` | Primary headings |

### Semantic Colors

| Role | Hex |
|---|---|
| Success (Emerald) | `#059669` |
| Warning (Amber) | `#D97706` |
| Error (Soft Red) | `#DC2626` |
| Info (Blue) | `#2563EB` |

### Dark Mode Override

Midnight backgrounds (`#0F172A`), off-white text on dark surfaces, reduced contrast borders.

---

## 4. TYPOGRAPHY SYSTEM

### Font Stack

| Usage | Font | Weight |
|---|---|---|
| Headings (H1–H3) | Inter or Satoshi | 600, 700 |
| Subheadings (H4–H6) | Inter | 500, 600 |
| Body | Inter | 400, 500 |
| Data/Monospace | JetBrains Mono or SF Mono | 400, 500 |
| UI Labels | Inter | 500, 600 |

### Type Scale

```
H1: 56/64  — Hero, landing
H2: 40/48  — Section headers
H3: 32/40  — Page titles
H4: 24/32  — Card headers
H5: 20/28  — Subsection
H6: 16/24  — UI labels
Body: 16/24 — Content
Small: 14/20 — Meta, captions
XS: 12/16  — Tags, badges
```

**Letter-spacing:** Headings H1–H3: `-0.02em`. Body: `0`. UI labels: `0.01em`.

---

## 5. SPACING SYSTEM

Use a **4px base grid** with consistent 8px increments:

```
XS:   4px   (—)
SM:   8px   (1)
MD:   16px  (2)
LG:   24px  (3)
XL:   32px  (4)
2XL:  48px  (6)
3XL:  64px  (8)
4XL:  96px  (12)
5XL:  128px (16)
```

**Section padding:** 96–128px vertical (desktop), 64px (tablet), 48px (mobile).
**Card padding:** 24–32px.
**Content max-width:** 1280px (center-aligned).

---

## 6. COMPONENT DESIGN SYSTEM

### Buttons

| Variant | Style |
|---|---|
| Primary | Navy bg, white text, gold accent on hover |
| Secondary | White bg, navy border, navy text |
| Gold | Gold bg, navy text, executive CTA |
| Ghost | Transparent, subtle hover |
| Icon | 40×40, subtle border, hover fill |

- **Border-radius:** 6px (all buttons)
- **Height:** 40px (default), 48px (large), 32px (small)
- **Transition:** 150ms ease

### Cards

- **Border:** 1px solid `#EFF1F4`
- **Border-radius:** 8px
- **Shadow:** `0 1px 3px rgba(0,0,0,0.04)`
- **Hover:** Subtle lift, shadow deepens to `0 4px 12px rgba(0,0,0,0.06)`
- **Padding:** 24px

### Tables

- **Header:** Bold 14px, uppercase tracking, border-bottom
- **Rows:** 16/24 body text, alternating subtle row backgrounds
- **Hover:** Light row highlight
- **Responsive:** Horizontal scroll on mobile with sticky first column

### Forms & Inputs

- **Height:** 40px
- **Border:** 1px solid `#D1D5DB`, radius 6px
- **Focus:** Navy ring (2px), border matches
- **Label:** 14px semibold above input
- **Error:** Red border + subtle red background
- **Placeholder:** `#9CA3AF`

### Navigation

- **Sidebar:** 240px collapsed / 64px. Icons + text. Active state: subtle navy background + left gold border (3px).
- **Top nav:** 64px height. Breadcrumbs left, actions right (notifications, profile, search).
- **Breadcrumbs:** 14px, muted, chevron separators.

### Dashboard Widgets / KPI Cards

- **Layout:** 4-column grid (≥1200px), 2-column (tablet), 1-column (mobile)
- **Content:** Label (14px muted), Value (32px bold), Trend indicator (green/red), Sparkline (optional)
- **Border-radius:** 8px, subtle border

### Modals

- **Overlay:** `rgba(0,0,0,0.4)` with backdrop blur (2px)
- **Content:** Max 560px wide, 8px radius, 32px padding
- **Animation:** Fade + scale in (200ms)

### Tabs

- **Style:** Line-based (bottom border active state). Gold underline on active.
- **Size:** 14px semibold, 40px height
- **Hover:** Subtle text color change

---

## 7. PAGES TO DESIGN

### A. Public Website

| Page | Key Sections |
|---|---|
| **Landing** | Hero (full-screen, cinematic, global map visualization), trust bar (logos), strategic metrics, services overview, featured sectors, executive quote, market insights preview, partnership showcase, testimonials, CTA, newsletter, footer |
| **About** | Mission/vision, leadership, timeline, global presence map, values |
| **Services** | 6 service cards (detailed), expandable sections, case study links |
| **Industries** | Sector cards with metrics, downloadable reports |
| **Market Intelligence** | Report previews, subscription CTA, sample data visualization |
| **Investment Advisory** | Process steps, deal pipeline visualization, past transactions |
| **Trade Facilitation** | Service flow diagram, country coverage map |
| **Insights / Blog** | Article grid, filter by category, featured post hero |
| **Case Studies** | 2-column grid, outcome-focused metrics |
| **Global Opportunities** | Filterable opportunity cards, map integration |
| **Events** | Calendar grid, past event recordings |
| **Contact** | Form, office locations map, direct contact |
| **Careers / FAQ / Privacy / Terms** | Clean typographic layouts, accordions |

### B. Client Portal

| Page | Purpose |
|---|---|
| Dashboard | Active projects, upcoming meetings, recent documents, KPI summary |
| Project Tracking | Status timeline, deliverables, team, documents per project |
| Investment Opportunities | Filterable deal pipeline, bookmarking |
| Document Vault | Folder structure, search, recent uploads |
| Messaging | Threaded conversations (Linear-style) |
| Meeting Scheduler | Calendar + available slots |
| Invoices | Table, status badges, download |
| Notifications | Filterable activity feed |
| Analytics | Portfolio metrics, charts, exports |

### C. Admin Dashboard

| Page | Purpose |
|---|---|
| Overview | System-wide KPIs, recent activity, quick actions |
| Analytics | Revenue chart, user growth, engagement metrics |
| CRM / Clients | Table with search, filters, client detail drawer |
| Leads Pipeline | Kanban-style or sorted table |
| Projects | CRUD, status management, assignment |
| Deal Management | Value tracking, stage progression |
| Reports | Generated report library, scheduling |
| Content Management (CMS) | Blog editor, media library, page builder |
| User Management | Roles, permissions, team tree |
| Financial Tracking | Invoice management, payment status |
| Notifications Center | System-wide broadcast |
| Settings | Profile, branding, integrations, security |

---

## 8. RESPONSIVE BREAKPOINTS

| Device | Width | Layout |
|---|---|---|
| Desktop XL | ≥1440px | 4–12 column grid |
| Desktop | ≥1200px | Full layout |
| Tablet Landscape | ≥1024px | Collapsed sidebar, adjusted grids |
| Tablet Portrait | ≥768px | Stacked sections, hamburger nav |
| Mobile | ≥375px | Single column, bottom nav (dashboard) |

Mobile should feel like a premium native app — not a squished website.

---

## 9. ANIMATION SYSTEM

| Element | Animation | Duration |
|---|---|---|
| Page transitions | Fade + subtle slide up | 300ms |
| Card hover | Translate Y -2px, shadow deepen | 200ms |
| Button hover | Background shift or subtle scale | 150ms |
| Modal enter | Fade in + scale 0.98 → 1 | 200ms |
| Sidebar collapse | Width transition with icon rotation | 250ms |
| Chart enter | Ease-out grow from bottom | 600ms |
| Skeleton load | Pulse shimmer | 1.5s loop |
| Scroll reveal | Fade up on viewport enter | 400ms stagger |
| Micro-interactions | Color transitions, border highlights | 150ms |

All animations: `cubic-bezier(0.16, 1, 0.3, 1)` — Linear-style easing.

---

## 10. INTERACTION PATTERNS

- **Command Palette (⌘K):** Global search/actions accessible from any dashboard page
- **Inline editing:** Titles and short text fields editable on click
- **Drag and drop:** File uploads, kanban cards, table row reordering
- **Infinite scroll + pagination:** Load more on scroll, with page numbers as fallback
- **Drawer panels:** Client details, project info open as slide-in drawers (not separate pages)
- **Keyboard shortcuts:** Navigation, actions for power users
- **Optimistic UI:** Instant feedback on actions, background sync
- **Empty states:** Illustration + explanation + CTA (no blank pages)
- **Loading states:** Skeleton screens matching content layout (not spinners)
- **Error states:** Inline error messages, retry buttons, fallback UIs

---

## 11. VISUAL DESIGN DETAILS

### Gradients

- Section transitions: Subtle navy-to-midnight gradients
- Hero overlay: Dark gradient overlay on background imagery
- Data visualization: Gold-to-amber gradient for charts

### Borders & Dividers

- 1px thin borders using `#EFF1F4` (`rgba(0,0,0,0.06)` in dark mode)
- Section dividers: 1px line with 48px vertical spacing

### Shadows

- **Cards:** `0 1px 2px rgba(0,0,0,0.04)`
- **Elevated:** `0 4px 12px rgba(0,0,0,0.08)`
- **Modals:** `0 20px 60px rgba(0,0,0,0.15)`
- **Dropdowns:** `0 8px 24px rgba(0,0,0,0.10)`

### Glassmorphism (rare, intentional)

- Used only for overlay navigation or sticky header backgrounds
- Backdrop blur: 12px, semi-transparent white/navy background

---

## 12. ICONOGRAPHY

- **Style:** Line-based, 1.5px stroke, consistent weight
- **Library:** Lucide icons (already in project)
- **Size:** 16px (inline), 20px (UI), 24px (section), 32px (featured)
- **Color:** Inherits text color or muted for secondary

---

## 13. DATA VISUALIZATION STYLE

- Minimal grid lines (thin, muted)
- Gold/amber primary line color, navy secondary
- Tooltips: dark background, clean typography
- Chart types: Line (smooth), Bar (rounded top), Area (subtle gradient fill), Pie (donut style)
- Dashboard widgets: Mini sparklines, trend arrows with percentage

---

## 14. DELIVERABLES

1. **Complete page designs** for all pages listed in Section 7
2. **Reusable component library** covering all elements from Section 6
3. **Design system documentation** — color, typography, spacing, component specs
4. **Responsive variants** — desktop, tablet, mobile for key pages
5. **Interaction states** — default, hover, active, focus, disabled, loading, empty, error
6. **Dashboard UI** — all admin and client portal pages
7. **Dark mode** — complete dark theme variant

---

## 15. SINGLE UNIFYING DIRECTIVE

> Design every surface — public site, client portal, and admin dashboard — as if it belongs to the same system, built by one team, for one company. No page should feel like it was designed in isolation. The color palette, spacing, type scale, component rules, and interaction language must be identical everywhere. The user should never feel like they've navigated to a different product.
