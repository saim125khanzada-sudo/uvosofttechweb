# Uvosoft Tech — Dynamic CMS

A full-stack dynamic website with admin dashboard and cyberpunk aesthetic. Built from a static HTML site.

**Stack:** Node.js + Express, PostgreSQL + Prisma ORM, EJS, Vanilla JS

---

## What This Is

This project started as a 6-page static HTML site with hardcoded content and no admin panel. Now it's a full CMS where every piece of content — services, products, blog posts, navigation, site settings, chatbot responses — lives in PostgreSQL and can be managed through the admin dashboard.

The original site had some issues: broken blog links, no mobile support, XSS vulnerabilities, and a login button that did nothing. All of that is fixed now.

---

## Features

### Public Website
- **Home** — Hero section with hologram animation, service cards, featured products, latest blog posts, CTA
- **About** — CMS-manageable page sections with rich content
- **Services** — 6 service categories with 32 individual services, filterable by category
- **Store** — 3 laptop products with specs (RAM, SSD, GPU), pricing, images
- **Blog** — Published blog posts with author attribution, dates, excerpts, featured images
- **Contact** — Form with server-side validation, rate limiting, stored submissions
- **Chatbot** — AI assistant with keyword-matched responses from database
- **404/Error Pages** — Custom error pages with cyberpunk styling

### Cyberpunk Design
- Near-black background (`#030305`) with neon blue (`#00F0FF`), pink (`#FF0055`), orange (`#FF7700`)
- Matrix rain canvas effect (subtle, performance-optimized)
- 3D morphing wireframe AI core animation
- Cursor glow follow effect
- Scanline and sweep-line overlays
- Glassmorphism card effects with backdrop blur
- Hologram rings animation on hero section
- Floating action buttons (WhatsApp, LinkedIn, Chatbot) with ripple effects
- Space Grotesk + Inter font pairing
- Fully responsive with mobile hamburger menu

### Admin Dashboard
- **Dashboard** — Stats overview (users, services, posts, products, contacts), recent activity log
- **User Management** — Create/edit/delete users, assign roles, activate/deactivate accounts
- **Role Management** — Create/edit roles with granular permission assignment (47 permissions)
- **Service Categories** — CRUD for the 6 service categories with sort ordering
- **Services** — CRUD for 32 individual services, assigned to categories
- **Blog Posts** — Create/edit/delete posts with title, slug, excerpt, content, featured image, status (draft/published/archived), SEO metadata
- **Products** — CRUD for products with brand, model, price, specs (RAM, SSD, HDD, GPU), images
- **Pages** — CMS page builder with sections, rich content, sort ordering
- **Navigation Items** — Manage site navigation links, visibility, ordering
- **Media Library** — Upload and manage files (images, PDFs, documents)
- **Chatbot Responses** — Manage keyword triggers and response text, priority ordering
- **Contact Submissions** — View/read/delete contact form submissions
- **Site Settings** — 28 grouped settings (general, contact, SEO, hero, sections, footer)
- **Activity Logs** — Full audit trail of all CRUD operations with user, IP, user agent
- **Profile** — User profile management

### Security
- **bcrypt** password hashing (12 rounds)
- **Helmet.js** — HTTP security headers
- **CSRF protection** — Token-based CSRF on auth and admin routes
- **Rate limiting** — Separate limiters for API, auth, and contact form
- **Input validation** — express-validator on all form submissions
- **XSS prevention** — HTML escaping in chatbot rendering, sanitized inputs
- **SQL injection prevention** — Prisma ORM parameterized queries
- **HPP** — HTTP parameter pollution protection
- **Compression** — gzip response compression
- **Session management** — PostgreSQL-backed sessions with configurable expiry
- **RBAC** — 47 granular permissions across 14 categories (create, read, update, delete per entity)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js 4.18 |
| Database | PostgreSQL 16 |
| ORM | Prisma 5.10 |
| Templating | EJS + express-ejs-layouts |
| Authentication | express-session + bcrypt |
| Frontend CSS | Custom (vanilla CSS) |
| Frontend JS | Vanilla JavaScript (no frameworks) |
| Security | Helmet, csurf, express-rate-limit, express-validator, HPP |
| File Upload | Multer |
| Session Store | connect-pg-simple (PostgreSQL) |

---

## Project Structure

```
uvosofttech/
├── prisma/
│   ├── schema.prisma          # 19 database models
│   ├── seed.js                # Full seed with all Uvosoft Tech content
│   └── migrations/            # Auto-generated migrations
├── src/
│   ├── server.js              # Entry point
│   ├── app.js                 # Express app configuration
│   ├── config/
│   │   └── index.js           # Environment config
│   ├── middleware/
│   │   ├── auth.js            # Authentication & permission checks
│   │   ├── rbac.js            # Role-based access control
│   │   ├── csrf.js            # CSRF token handling
│   │   ├── rateLimiter.js     # Rate limiting configs
│   │   ├── validation.js      # Input validation rules
│   │   ├── activityLogger.js  # Audit trail logging
│   │   └── errorHandler.js    # Global error handling
│   ├── routes/
│   │   ├── index.js           # Public page routes
│   │   ├── auth.js            # Login/logout
│   │   ├── admin.js           # Admin page routes (34 renders)
│   │   └── api/
│   │       ├── admin.js       # Admin REST API (CRUD endpoints)
│   │       └── public.js      # Public API (contact, chatbot, data)
│   ├── utils/
│   │   ├── helpers.js         # Utility functions
│   │   ├── upload.js          # Multer config
│   │   └── validators.js      # Validation rules
│   └── views/
│       ├── layouts/
│       │   ├── public.ejs     # Public site layout
│       │   └── admin.ejs      # Admin dashboard layout
│       ├── partials/
│       │   ├── public/        # Header, footer
│       │   └── admin/         # Sidebar, topbar
│       ├── public/            # 8 public page templates
│       └── admin/             # 26 admin page templates
│           ├── dashboard.ejs
│           ├── login.ejs
│           ├── users/
│           ├── roles/
│           ├── services/
│           ├── categories/
│           ├── blog/
│           ├── products/
│           ├── pages/
│           ├── navigation/
│           ├── media/
│           ├── chatbot/
│           ├── contacts/
│           ├── settings/
│           ├── logs/
│           └── profile/
├── public/
│   ├── css/
│   │   ├── public.css         # Cyberpunk dark theme (230+ rules)
│   │   └── admin.css          # Admin panel styles
│   ├── js/
│   │   ├── public.js          # Matrix rain, 3D shapes, chatbot, effects
│   │   └── admin.js           # Admin AJAX, CRUD, file uploads
│   └── images/                # Static images
├── uploads/                   # User-uploaded files
├── index.html                 # Original static site (kept for reference)
├── .env.example
├── .gitignore
└── package.json
```

---

## Prerequisites

- **Node.js** v18+ (tested with v22.23.1)
- **PostgreSQL** v14+ (tested with v16.14)
- **npm** v9+

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd uvosofttech
```

### 2. Install dependencies

```bash
npm install
```

### 3. Rebuild native modules (if needed)

```bash
npm rebuild bcrypt
```

### 4. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your database credentials (see [Environment Variables](#environment-variables)).

### 5. Create the database

```bash
psql -U postgres -c "CREATE DATABASE uvosofttech;"
```

### 6. Run migrations

```bash
npx prisma migrate dev
```

### 7. Seed the database

```bash
node prisma/seed.js
```

### 8. Start the application

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

Visit **http://localhost:3000**

---

## Database

### Connection

PostgreSQL connection string format:

```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

The application connects to PostgreSQL for:
- Data storage (all CMS content)
- Session storage (connect-pg-simple)
- Activity logging

### Migrations

```bash
# Create a new migration after schema changes
npx prisma migrate dev --name <migration-name>

# Reset database (drops all data)
npx prisma migrate reset

# View database in Prisma Studio
npx prisma studio
```

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | — (required) |
| `SESSION_SECRET` | Secret for session encryption | `fallback-secret-change-me` |
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `SESSION_MAX_AGE` | Session max age (ms) | `86400000` (24 hours) |
| `SESSION_INACTIVITY_TIMEOUT` | Inactivity timeout (ms) | `1800000` (30 minutes) |
| `UPLOAD_MAX_SIZE` | Max upload size (bytes) | `10485760` (10 MB) |

---

## Running the Application

### Development

```bash
npm run dev
```

Uses nodemon for auto-reload on file changes.

### Production

```bash
NODE_ENV=production npm start
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with nodemon |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed database with content |
| `npm run db:reset` | Reset database and re-seed |

---

## Default Credentials

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| **Super Admin** | `admin@uvosofttech.com` | `admin123` | Full access to everything |
| **Editor** | `editor@uvosofttech.com` | `editor123` | Blog, services, products, pages |

> **Change these passwords before deploying to production.**

---

## Admin Dashboard

### Accessing

Navigate to **http://localhost:3000/auth/login** and use the credentials above.

### Pages

| Page | URL | Description |
|------|-----|-------------|
| Dashboard | `/admin` | Stats overview, recent activity |
| Users | `/admin/users` | User management |
| Roles | `/admin/roles` | Role & permission management |
| Services | `/admin/services` | Service management |
| Categories | `/admin/categories` | Service category management |
| Blog | `/admin/blog` | Blog post management |
| Products | `/admin/products` | Product management |
| Pages | `/admin/pages` | CMS page management |
| Navigation | `/admin/navigation` | Navigation link management |
| Media | `/admin/media` | File upload library |
| Chatbot | `/admin/chatbot` | Chatbot response management |
| Contacts | `/admin/contacts` | Contact form submissions |
| Settings | `/admin/settings` | 28 site settings |
| Activity Logs | `/admin/logs` | Full audit trail |
| Profile | `/admin/profile` | User profile |

---

## Database Schema

### 19 Models

| Model | Table | Description |
|-------|-------|-------------|
| `User` | `users` | User accounts with authentication |
| `Role` | `roles` | Named roles (super_admin, admin, editor, content_manager) |
| `Permission` | `permissions` | 47 granular permissions |
| `UserRole` | `user_roles` | Many-to-many: users ↔ roles |
| `RolePermission` | `role_permissions` | Many-to-many: roles ↔ permissions |
| `Session` | `session` | PostgreSQL-backed sessions |
| `SiteSetting` | `site_settings` | 28 key-value site settings |
| `Page` | `pages` | CMS pages (e.g., About) |
| `PageSection` | `page_sections` | Sections within pages |
| `NavigationItem` | `navigation_items` | Navigation links |
| `ServiceCategory` | `service_categories` | 6 service categories |
| `Service` | `services` | 32 individual services |
| `BlogPost` | `blog_posts` | Blog articles with SEO metadata |
| `Product` | `products` | Store products with specs |
| `Media` | `media` | Uploaded files |
| `ContactSubmission` | `contact_submissions` | Contact form submissions |
| `ChatbotResponse` | `chatbot_responses` | Chatbot keyword-response pairs |
| `ActivityLog` | `activity_logs` | Audit trail for all operations |
| `SocialLink` | `social_links` | Social media links |

### Permission Categories (47 total)

| Category | Permissions |
|----------|-------------|
| Users | `users.view`, `users.create`, `users.update`, `users.delete` |
| Roles | `roles.view`, `roles.create`, `roles.update`, `roles.delete` |
| Services | `services.view`, `services.create`, `services.update`, `services.delete` |
| Blog | `blog.view`, `blog.create`, `blog.update`, `blog.delete`, `blog.publish` |
| Products | `products.view`, `products.create`, `products.update`, `products.delete` |
| Pages | `pages.view`, `pages.create`, `pages.update`, `pages.delete` |
| Navigation | `navigation.view`, `navigation.create`, `navigation.update`, `navigation.delete` |
| Media | `media.view`, `media.upload`, `media.delete` |
| Chatbot | `chatbot.view`, `chatbot.create`, `chatbot.update`, `chatbot.delete` |
| Contacts | `contacts.view`, `contacts.update`, `contacts.delete` |
| Settings | `settings.view`, `settings.update` |
| Logs | `logs.view` |
| Profile | `profile.view`, `profile.update` |

---

## API Endpoints

### Public API (`/api/v1`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/services` | List all service categories with services |
| `GET` | `/api/v1/products` | List all active products |
| `GET` | `/api/v1/blog` | List all published blog posts |
| `GET` | `/api/v1/blog/:slug` | Get single blog post by slug |
| `GET` | `/api/v1/settings` | Get all site settings |
| `GET` | `/api/v1/navigation` | Get visible navigation items |
| `POST` | `/api/v1/contact` | Submit contact form (rate limited) |
| `POST` | `/api/v1/chatbot` | Send message to chatbot AI |

### Admin API (`/admin/api`)

Full REST API for all entities — create, read, update, delete. Requires authentication and RBAC permissions.

---

## Security

### Authentication
- Passwords hashed with **bcrypt** (12 salt rounds)
- Sessions stored in PostgreSQL via `connect-pg-simple`
- Session expiry configurable via environment variables
- Inactivity timeout support

### Authorization
- **RBAC** with 4 pre-configured roles:
  - `super_admin` — Full access
  - `admin` — Most permissions
  - `editor` — Content management
  - `content_manager` — Limited content access
- 47 granular permissions across 14 categories
- Permission checks on every admin route and API endpoint

### Protection
- **Helmet.js** — Sets various HTTP security headers
- **CSRF** — Token-based protection on auth and admin forms
- **Rate Limiting** — Separate limiters:
  - API: 100 requests per 15 minutes
  - Auth: 5 attempts per 15 minutes
  - Contact: 5 submissions per hour
- **Input Validation** — express-validator on all user inputs
- **XSS Prevention** — HTML escaping in dynamic content rendering
- **HPP** — HTTP parameter pollution protection
- **Compression** — gzip for all responses
- **SQL Injection** — Prisma ORM parameterized queries

---

## Frontend Design

### Design System

| Element | Value |
|---------|-------|
| Background | `#030305` (near-black) |
| Primary | `#00F0FF` (neon blue) |
| Accent 1 | `#FF0055` (neon pink) |
| Accent 2 | `#FF7700` (neon orange) |
| Body Font | Inter |
| Heading Font | Space Grotesk |
| Style | Cyberpunk / Glassmorphism |

### Visual Effects
- Matrix rain canvas (subtle, 8% opacity)
- 3D wireframe shape morphing (sphere → infinity → polygons → rings)
- Cursor glow following mouse
- Scanline overlay animation
- Sweep-line animation
- Hologram rings with rotation
- Glassmorphism cards with backdrop blur
- Neon glow hover effects
- FAB buttons with ripple animation

### Responsive Breakpoints
- Desktop: Full layout with side-by-side grids
- Mobile (< 768px): Single column, hamburger menu, stacked layouts

---

## Seeded Data

The seed script populates the database with all original Uvosoft Tech content:

| Data | Count | Details |
|------|-------|---------|
| Users | 2 | admin, editor |
| Roles | 4 | super_admin, admin, editor, content_manager |
| Permissions | 47 | Across 14 categories |
| Service Categories | 6 | IT Services, App/Web Dev, ERP, Cloud, Cybersecurity, AI |
| Services | 32 | Individual services across all categories |
| Products | 3 | HP EliteBook 840, Dell XPS 15, Lenovo ThinkPad X1 |
| Blog Posts | 3 | AI in ERP, Zero-Trust Security, Cloud Cost Optimization |
| Site Settings | 28 | General, contact, SEO, hero, sections, footer |
| Navigation Items | 6 | Home, About, Services, Store, Blog, Contact |
| Social Links | 2 | LinkedIn, WhatsApp |
| Chatbot Responses | 8 | Keyword-matched responses for common queries |
| Pages | 1 | About page with 3 sections |

---

## Deployment

### Production Checklist

1. **Environment Variables** — Set `NODE_ENV=production` and use strong secrets
2. **Database** — Use a managed PostgreSQL service (AWS RDS, Heroku Postgres, etc.)
3. **SESSION_SECRET** — Generate a random 32+ character string
4. **HTTPS** — Deploy behind a reverse proxy (nginx) with SSL
5. **Passwords** — Change default admin/editor passwords
6. **CSRF** — Ensure cookies work with your domain
7. **File Uploads** — Configure `uploads/` directory with proper permissions
8. **CORS** — Configure if serving from a different domain
9. **Logging** — Set up proper logging (stdout/stderr for containers)

### Docker (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["node", "src/server.js"]
```

---

## License

Private — Uvosoft Tech
