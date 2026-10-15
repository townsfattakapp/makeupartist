# Aurelia Luxe — Luxury Haute Bridal & Editorial Makeup Artistry

Aurelia Luxe is a bespoke luxury web platform and Content Management System (CMS) designed for high-profile bridal and editorial makeup commissions across London (Mayfair, Chelsea), The Cotswolds, Paris, and Lake Como.

Built on **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Tiger Cloud (PostgreSQL)**.

---

## Features

- **Editorial Visual Direction**: Cormorant Garamond & Plus Jakarta Sans typography, warm ivory/alabaster surfaces, obsidian text, and champagne gold accents.
- **Persistent Dual Themes**: Seamless light and dark mode with zero color shift on makeup photography.
- **Interactive Before/After Slider**: Tactile image comparison showcasing authentic skin preparation vs. glass skin finish.
- **Filterable Portfolio Archive**: Real-time URL query parameter filtering across Haute Bridal, Editorial, Red Carpet, and Natural Glow.
- **Accessible Lightbox**: Keyboard-driven (`ESC`, `←`, `→`) fullscreen gallery with zoom and direct booking actions.
- **5-Step Booking Enquiry Engine**: Client progress tracking, date availability validation, non-binding quote disclaimer, and instant unique reference generation.
- **Protected Artist CMS (`/admin`)**:
  - Executive Dashboard with KPI statistics and inbound enquiry triage.
  - Enquiry CRM Pipeline (`NEW`, `CONTACTED`, `QUOTED`, `CONFIRMED`, `COMPLETED`, `CLOSED`) with internal notes.
  - Portfolio Look Manager with before/after pairing and status workflows (`PUBLISHED`, `DRAFT`, `ARCHIVED`).
  - Service Package Editor for prices, inclusions, and client preparation guidelines.
  - Instagram Feed Curation studio for featured reels with consent management.
  - Media Asset Library with alt text and responsive focal-point tuning.
  - Studio & SEO Settings with Owner permission enforcement.
- **Tiger Cloud (PostgreSQL)**: Direct SSL pooling and automated migration scripts with dual-mode local fallback.

---

## CMS Demo Credentials

Access the studio portal at `/admin/login`:

| Role | Email | Password | Scope |
| :--- | :--- | :--- | :--- |
| **Studio Owner** | `aurelia@aurelialuxe.com` | `LuxeOwner2026!` | Full administrative control (portfolio, pricing, brand & SEO settings) |
| **Editorial Assistant** | `assistant@aurelialuxe.com` | `LuxeStudio2026!` | Daily operations (enquiry status, internal notes, Instagram curation) |

*(Quick-fill demo buttons are provided on the login page)*

---

## Getting Started

### 1. Installation
```bash
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your Tiger Cloud PostgreSQL database URL in `.env.local`:
```env
DATABASE_URL="postgres://tsdbadmin:password@host:port/dbname?sslmode=require"
```

### 3. Run Database Migrations
Run the automated migration and seed script to prepare tables and initial sample data:
```bash
npm run db:migrate
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Deploying to Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "feat: initial Aurelia Luxe luxury makeup platform"
gh repo create makeupartist --public --source=. --remote=origin --push
```

### Step 2: Deploy on Vercel
1. Import the repository in your [Vercel Dashboard](https://vercel.com/new).
2. Add the following **Environment Variables** in Vercel Project Settings:
   - `DATABASE_URL`: `postgres://tsdbadmin:<PASSWORD>@<HOST>:<PORT>/tsdb?sslmode=require`
   - `AUTH_SECRET`: `<YOUR_32_CHAR_SECRET_KEY>`
   - `ADMIN_SESSION_COOKIE`: `aurelia_admin_session`
   - `NEXT_PUBLIC_STUDIO_NAME`: `Aurelia Luxe`
   - `NEXT_PUBLIC_WHATSAPP`: `+447946091200`
   - `NEXT_PUBLIC_INSTAGRAM`: `aurelialuxemakeup`
3. Click **Deploy**.

---

## License & Disclosures

All client photography, reels, and testimonials are realistic sample demonstration assets curated for portfolio presentation. All rights reserved.
