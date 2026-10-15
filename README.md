# Kumkum Patel — Luxury Haute Bridal & Editorial Makeup Artistry

Kumkum Patel is a bespoke luxury web platform and Content Management System (CMS) designed for high-profile bridal, celebrity, and editorial makeup commissions.

Built on **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Tiger Cloud (PostgreSQL)**.

---

## Features

- **Editorial Visual Direction**: Cormorant Garamond & Plus Jakarta Sans typography, warm ivory/alabaster surfaces, obsidian text, and champagne gold accents.
- **Interactive Face Chart Vector Canvas**: Hand-drawn continuous line-art facial architecture with interactive hotspots.
- **Haute Beauty Cosmetic Swatches**: The Couture Color Bar with interactive finish swatches (Velvet Matte, Dewy Glaze, Satin Cream, Liquid Gold, Smoked Silk).
- **Interactive Before/After Slider**: Tactile image comparison showcasing authentic skin preparation vs. glass skin finish.
- **Inside the Luxury Vanity Kit**: Backstage curation (Augustinus Bader, Charlotte Tilbury, Tom Ford, Westman Atelier) & Hospital-Grade Hygiene standards.
- **Interactive Bridal Aesthetic Matcher**: 3-step questionnaire calculating tailored palette and finish recommendations.
- **5-Step Booking Enquiry Engine**: Client progress tracking, date availability validation, and unique reference generation.
- **Protected Artist CMS (`/admin`)**:
  - Executive Dashboard with KPI statistics and inbound enquiry triage.
  - Enquiry CRM Pipeline (`NEW`, `CONTACTED`, `QUOTED`, `CONFIRMED`, `COMPLETED`, `CLOSED`) with internal notes.
  - Portfolio Look Manager with before/after pairing and status workflows (`PUBLISHED`, `DRAFT`, `ARCHIVED`).
  - Service Package Editor for prices (INR ₹), inclusions, and client preparation guidelines.
  - Instagram Feed Curation studio for featured reels with consent management.
  - Studio & SEO Settings with Owner permission enforcement.
- **Tiger Cloud (PostgreSQL)**: Direct SSL pooling and automated migration scripts with dual-mode local fallback.

---

## CMS Demo Credentials

Access the studio portal at `/admin/login`:

| Role | Email | Password | Scope |
| :--- | :--- | :--- | :--- |
| **Studio Owner** | `kumkum@kumkumpatel.com` | `LuxeOwner2026!` | Full administrative control (portfolio, pricing, brand & SEO settings) |
| **Studio Coordinator** | `assistant@kumkumpatel.com` | `LuxeStudio2026!` | Daily operations (enquiry status, internal notes, Instagram curation) |

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
