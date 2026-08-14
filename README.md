# 📸 Nexora Studio

> Capturing Moments. Preserving Memories.

Nexora Studio is a premium, full-stack wedding photography portfolio and studio management platform developed using **Next.js** and **SQLite**. The application showcases professional photography services, hosts featured love stories, runs an AI-assisted customer support chat, provides an interactive booking calendar, and includes a secure administrator portal for booking approval and content management (CMS).

---

## ✨ Project Highlights

- 🎨 **Luxury Editorial UI**: Elegant typography, earthy warm tones, and polished micro-animations.
- 💍 **Wedding Photography Portfolio**: Organized image gallery highlighting bridal portraits, couple shoots, and ceremony moments.
- 📖 **Featured Love Stories**: Narrative case studies of real weddings, complete with interactive timelines and client testimonials.
- 📷 **Bespoke Photography Packages**: Interactive package options with dynamic pricing calculations.
- 📅 **Interactive Booking Calendar**: Self-service booking flow for customers to select packages, dates, and customize services.
- 🔒 **Admin Portal & Session Security**: Secure cookie-based authentication and role enforcement.
- 🛠 **Full Content Management System (CMS)**: In-app management tools for bookings, portfolio images, and stories.
- 💾 **Persistent SQL Backend**: Fast database queries and robust schema integration with SQLite.

---

## 🛠 Tech Stack & Architecture

Nexora Studio is built on a modern full-stack web architecture:
* **Framework**: **Next.js 16 (App Router)** utilizing server-side rendering (SSR), dynamic api routing, and client-side hydration.
* **Database**: **SQLite** managed via **`better-sqlite3`** for ultra-fast, synchronous SQL execution and atomic transaction support.
* **Styling**: **Vanilla CSS** with CSS Variables for a customized theme matching premium luxury aesthetics.
* **State Management**: React Context (`AppContext.tsx`) syncing client operations with backend database APIs.
* **Authentication**: Cookie-based session tracking with SHA-256 password hashing.

---

## 📂 Project Structure

```
nexora/
├── app/                  # Next.js App Router (Pages & API Routes)
│   ├── api/              # Backend API endpoints
│   │   ├── admin/        # Authentication (login, logout, session verification)
│   │   ├── bookings/     # Bookings CRUD operations
│   │   ├── packages/     # Package tier details and management
│   │   ├── portfolio/    # Gallery item operations
│   │   └── stories/      # Love story posts and CMS actions
│   ├── admin/            # Admin dashboard UI panel
│   ├── calculator/       # Interactive pricing calculator
│   ├── calendar/         # Booking wizard with payment flow simulator
│   ├── dashboard/        # Customer loyalty & rewards tracker
│   ├── login/            # Administrator login split-screen view
│   ├── packages/         # Packages list page
│   ├── portfolio/        # Portfolio grid page
│   └── stories/          # Love stories gallery and individual views
├── components/           # Reusable UI components (Navbar, Footer, AI Chatbot)
├── context/              # React AppContext for global state sync
├── data/                 # SQLite database storage directory
│   └── nexora.sqlite     # Persistent SQLite database file
├── lib/                  # Library files
│   ├── db/               # Database management layer
│   │   ├── queries/      # SQL query helper functions (Admins, Packages, Bookings, CMS)
│   │   ├── database.ts   # Database connection pool and PRAGMA settings
│   │   ├── init.ts       # Migration logic and data-seeding definitions
│   │   ├── schema.ts     # CREATE TABLE & INDEX DDL statements
│   │   └── types.ts      # TypeScript interfaces matching SQL rows
│   └── session.ts        # Cookie session encryption and parsing helpers
├── public/               # Static assets (images, icons)
├── services/             # Client-side API fetch services & mock fallback data
├── package.json          # Dependency and build script management
└── README.md             # Project documentation
```

---

## 🚀 Getting Started & Local Setup

### 1. Pre-requisites
* **Node.js** (v18.x or later recommended)
* **npm** (v9.x or later)
* *Note: `better-sqlite3` uses native binary bindings. Ensure your environment has standard build tools (C++ compiler) installed if compiling from source, although prebuilt binaries are generally downloaded automatically.*

### 2. Clone the repository
```bash
git clone https://github.com/dharshiniyadav06-rtyd/nexora.git
cd nexora
```

### 3. Install dependencies
```bash
npm install
```

### 4. Start the development server
```bash
npm run dev
```
Open your browser and visit: [http://localhost:3000](http://localhost:3000)

> **💡 Database Auto-Initialization & Seeding**:
> When the application boots up, the database connection layer check for the presence of the SQLite file at `data/nexora.sqlite`. If not present, it will automatically create the database, run table migrations (`admins`, `packages`, `portfolio`, `stories`, `bookings`), establish search indexes, and seed standard starting records (including photography packages, default gallery images, initial love stories, and the default admin user).

---

## ⚡ Production Verification

To verify the project compiles correctly and is ready for production deployment, run the compilation build command:
```bash
npm run build
```
This performs a full TypeScript check, bundle compilation, and optimization using Turbopack. A successful build output will confirm the compilation of both static layouts and server-rendered dynamic API paths.

---

## 🔑 Seeded Administrator Credentials

The application is pre-seeded with a default administrator account to access dashboard management interfaces:
* **Admin Login URL**: `/login` (or `/admin` which redirects if unauthenticated)
* **Admin Email**: `admin@nexora.com`
* **Admin Password**: `admin123`
*(Password is stored as a secure SHA-256 hash in the `admins` database table).*

---

## 🖥️ Admin Dashboard & CMS Features

Logging in as an administrator unlocks full CRUD controls over the platform content:
1. **Bookings Manager**: Audits all user-submitted bookings. Administrators can dynamically update the approval status (e.g. *Pending Approval*, *Confirmed*, *Completed*) or the payment status (*Pending*, *Partially Paid*, *Paid*).
2. **Portfolio CMS Manager**: Allows administrators to add new high-resolution images, update titles, categories, shot descriptions (e.g. lens/lighting metadata), and delete outdated gallery items.
3. **Stories CMS Manager**: Supports writing new wedding narratives, setting details (testimony, date, location), and toggling between `published` and `draft` statuses to control public visibility.

---

## 🔗 Backend API Endpoints Overview

All backend endpoints are server-only routes under the `/api` route prefix. They handle validation, map input objects to SQL columns, and return consistent JSON structures.

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/admin/login` | Authenticates administrator and sets session cookie. | Public |
| **POST** | `/api/admin/logout` | Clears the administrator session cookie. | Public |
| **GET** | `/api/admin/session` | Inspects cookie and returns current session info. | Public |
| **GET** | `/api/packages` | Retrieves all active photography package tiers. | Public |
| **POST** | `/api/packages` | Registers a new photography package. | Admin |
| **GET** | `/api/packages/[id]` | Fetches detailed info for a single package. | Public |
| **PUT** | `/api/packages/[id]` | Updates pricing or details of a package. | Admin |
| **DELETE**| `/api/packages/[id]` | Deletes a package from the catalog. | Admin |
| **GET** | `/api/portfolio` | Retrieves all gallery items (supports category filter). | Public |
| **POST** | `/api/portfolio` | Uploads and registers a new portfolio image. | Admin |
| **DELETE**| `/api/portfolio/[id]` | Deletes a portfolio image. | Admin |
| **GET** | `/api/stories` | Retrieves all wedding stories. | Public |
| **POST** | `/api/stories` | Creates a new love story post. | Admin |
| **PUT** | `/api/stories/[id]` | Updates story contents or status (published/draft). | Admin |
| **DELETE**| `/api/stories/[id]` | Deletes a wedding story. | Admin |
| **GET** | `/api/bookings` | Fetches bookings list (can filter by customer email). | Admin/User |
| **POST** | `/api/bookings` | Inserts a new booking from the scheduling checkout. | Public |
| **GET** | `/api/bookings/[id]` | Retrieves details for a specific booking. | Admin/User |
| **PATCH** | `/api/bookings/[id]` | Updates approval status or payment status. | Admin |
| **DELETE**| `/api/bookings/[id]` | Cancels/removes a booking. | Admin |

---
