# Uvosoft Tech — Startup Guide

Everything you need to know to start, use, and manage the application.

---

## Quick Start

```bash
# 1. Install dependencies
npm install
npm rebuild bcrypt

# 2. Set up environment
cp .env.example .env

# 3. Create database and run migrations
psql -U postgres -c "CREATE DATABASE uvosofttech;"
npx prisma migrate dev

# 4. Seed the database with content
node prisma/seed.js

# 5. Start the server
npm start
```

Open **http://localhost:3000** for the public site.
Open **http://localhost:3000/auth/login** for the admin dashboard.

---

## Prerequisites

You need these installed on your machine before starting:

| Software | Minimum Version | Check Command | Install |
|----------|----------------|---------------|---------|
| **Node.js** | v18+ | `node --version` | [nodejs.org](https://nodejs.org) |
| **npm** | v9+ | `npm --version` | Comes with Node.js |
| **PostgreSQL** | v14+ | `psql --version` | [postgresql.org](https://postgresql.org) |

### Verify Everything is Installed

```bash
node --version      # Should show v18.x.x or higher
npm --version       # Should show 9.x.x or higher
psql --version      # Should show 14.x.x or higher
```

---

## Step-by-Step Installation

### Step 1: Navigate to the Project

```bash
cd /path/to/uvosofttech
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs ~237 packages including Express, Prisma, EJS, bcrypt, Helmet, and more.

**If bcrypt fails to install**, rebuild the native module:

```bash
npm rebuild bcrypt
```

### Step 3: Set Up Environment Variables

```bash
cp .env.example .env
```

Open `.env` in your editor and update these values:

```env
# REQUIRED — Your PostgreSQL connection string
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/uvosofttech

# REQUIRED — Change this to a random 32+ character string
SESSION_SECRET=my-super-secret-key-change-this-in-production

# Optional — Defaults shown
NODE_ENV=development
PORT=3000
SESSION_MAX_AGE=86400000
SESSION_INACTIVITY_TIMEOUT=1800000
UPLOAD_MAX_SIZE=10485760
```

**Important:** Replace `yourpassword` with your actual PostgreSQL password.

### Step 4: Create the Database

```bash
# Using password authentication (most common)
PGPASSWORD=yourpassword psql -U postgres -h localhost -c "CREATE DATABASE uvosofttech;"

# OR if using peer authentication (Linux)
psql -U postgres -c "CREATE DATABASE uvosofttech;"
```

### Step 5: Run Database Migrations

```bash
npx prisma migrate dev
```

This creates all 19 database tables. You'll see output like:

```
Applying migration `20260720115919_init`
The database is now in sync with your schema.
```

### Step 6: Seed the Database

```bash
node prisma/seed.js
```

This populates the database with:

```
Created 47 permissions
Created super_admin role
Created admin role
Created editor role
Created content_manager role
Created admin: admin@uvosofttech.com / admin123
Created editor: editor@uvosofttech.com / editor123
Created 6 service categories
Created 32 services across 6 categories
Created 3 products
Created About page with sections
Created site settings
Created navigation items
Created social links
Created chatbot responses
Created 3 blog posts

Database seeded successfully!
```

### Step 7: Start the Server

```bash
npm start
```

You should see:

```
Uvosoft Tech server running in development mode on port 3000
```

The application is now running. Open your browser and visit:

- **Public site:** http://localhost:3000
- **Admin dashboard:** http://localhost:3000/auth/login

---

## Starting the Server

### Production Mode

```bash
NODE_ENV=production npm start
```

### Development Mode (with auto-reload)

```bash
npm run dev
```

Requires `nodemon` (included in devDependencies). The server automatically restarts when you change files.

### Running in the Background

```bash
# Linux/Mac
node src/server.js &

# Or use pm2 for production
pm2 start src/server.js --name uvosofttech
pm2 logs uvosofttech
```

### Stopping the Server

```bash
# If running in foreground
Ctrl + C

# If running in background
kill $(lsof -ti:3000)

# If using pm2
pm2 stop uvosofttech
```

### Verify Server is Running

```bash
# Check if the server responds
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/
# Should return: 200

# Check all pages
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/about
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/services
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/store
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/blog
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/contact
# All should return: 200
```

---

## Using the Public Website

### Pages Available

| Page | URL | What's There |
|------|-----|-------------|
| **Home** | `/` | Hero with hologram animation, service cards, featured products, latest blog posts, CTA |
| **About** | `/about` | Company info with mission, vision, and why choose us sections |
| **Services** | `/services` | 6 service categories with 32 individual services |
| **Store** | `/store` | 3 laptop products with specs and pricing |
| **Blog** | `/blog` | Published blog articles with author, date, excerpt |
| **Blog Post** | `/blog/:slug` | Individual article with full content |
| **Contact** | `/contact` | Contact form + company info |
| **Login** | `/auth/login` | Admin dashboard login |

### Visual Effects

The public site features a cyberpunk design with these effects:

- **Matrix Rain** — Subtle falling code animation in the background
- **3D AI Core** — Morphing wireframe shape in the center of the hero
- **Cursor Glow** — Neon blue glow follows your mouse cursor
- **Scanline Overlay** — Subtle horizontal line animation
- **Sweep Line** — Vertical light sweep across the screen
- **Hologram Rings** — Rotating concentric rings in the hero section
- **Chatbot** — Floating button in bottom-right corner

### Using the Chatbot

1. Click the **blue/pink gradient circle** in the bottom-right corner
2. Type a message (e.g., "cloud services", "ERP solutions", "cyber security")
3. Press Enter or click **Send**
4. The chatbot responds with relevant information from the database

**Try these keywords:**
- `hello` or `hi` — Greeting
- `erp` — ERP solutions info
- `cyber` or `security` — Cybersecurity services
- `cloud` — Cloud services info
- `software` or `develop` — Development services

### Using the Contact Form

1. Go to `/contact`
2. Fill in your **Name**, **Email**, and **Message**
3. Click **Send Message**
4. You'll see a success confirmation
5. The submission is stored in the database and visible in the admin dashboard

---

## Logging into the Admin Dashboard

### Step 1: Go to the Login Page

Navigate to **http://localhost:3000/auth/login**

### Step 2: Enter Credentials

**Super Admin (full access):**
- Email: `admin@uvosofttech.com`
- Password: `admin123`

**Editor (content management):**
- Email: `editor@uvosofttech.com`
- Password: `editor123`

### Step 3: Click Login

You'll be redirected to the **Admin Dashboard** at `/admin`.

### Logging Out

Click your name in the top-right corner → **Logout**

---

## Admin Dashboard Walkthrough

### Dashboard Home (`/admin`)

The dashboard shows:

| Stat | Description |
|------|-------------|
| **Users** | Total registered users |
| **Services** | Total services in database |
| **Blog Posts** | Total blog articles |
| **Products** | Total store products |
| **Unread Contacts** | New contact form submissions |

Below the stats, you'll see **Recent Activity** — a table of the last 10 operations performed in the system.

### Sidebar Navigation

The left sidebar contains links to all management sections:

```
Dashboard
Users
Roles
Services
Categories
Blog
Products
Pages
Navigation
Media
Chatbot
Contacts
Settings
Activity Logs
```

### Top Bar

- **Page Title** — Shows current section name
- **View Site** — Opens public site in new tab
- **Your Name** — Dropdown with Profile and Logout

---

## Managing Content

### Adding a New Blog Post

1. Go to **Blog** in the sidebar
2. Click **Create New** (or similar button)
3. Fill in the form:

| Field | Required | Description |
|-------|----------|-------------|
| Title | Yes | The blog post title |
| Slug | No | URL-friendly version (auto-generated from title if empty) |
| Excerpt | No | Short summary shown on listing page |
| Content | Yes | Full blog post content (HTML supported) |
| Featured Image URL | No | Image URL for the post header |
| Status | No | Draft, Published, or Archived |
| Meta Title | No | SEO title (max 70 chars) |
| Meta Description | No | SEO description (max 160 chars) |
| Meta Keywords | No | SEO keywords |

4. Click **Save**
5. The post appears on the public blog page if status is "Published"

### Adding a New Service

1. Go to **Services** in the sidebar
2. Click **Create New**
3. Fill in:

| Field | Required | Description |
|-------|----------|-------------|
| Title | Yes | Service name |
| Description | No | Service description |
| Category | Yes | Select from existing categories |
| Icon URL | No | Icon image URL |
| Image URL | No | Banner image URL |
| Sort Order | No | Display order (lower = first) |
| Active | No | Show/hide on public site |

4. Click **Save**

### Adding a Service Category

1. Go to **Categories** in the sidebar
2. Click **Create New**
3. Fill in Name, Slug, Description, Icon URL, Sort Order
4. Click **Save**

### Adding a New Product

1. Go to **Products** in the sidebar
2. Click **Create New**
3. Fill in:

| Field | Required | Description |
|-------|----------|-------------|
| Brand | Yes | e.g., "HP", "Dell", "Lenovo" |
| Model | Yes | e.g., "EliteBook 840" |
| Price | Yes | Numeric price |
| RAM | No | e.g., "16GB DDR5" |
| SSD | No | e.g., "512GB NVMe" |
| HDD | No | e.g., "1TB" |
| GPU | No | e.g., "Intel Iris Xe" |
| Description | No | Product description |
| Image URL | No | Product image URL |
| Sort Order | No | Display order |
| Active | No | Show/hide on public site |

4. Click **Save**

### Editing Any Content

1. Go to the section (e.g., Blog, Services, Products)
2. Find the item in the list
3. Click **Edit** next to it
4. Modify the fields
5. Click **Save**

### Deleting Content

1. Go to the section
2. Find the item
3. Click **Delete**
4. Confirm the deletion in the popup

### Managing Pages (CMS)

Pages are used for content like the About page. Each page has sections.

1. Go to **Pages** in the sidebar
2. Create or edit a page
3. Add sections with titles and rich content
4. Sections can be reordered by sort order
5. Toggle visibility per section

### Managing Navigation

1. Go to **Navigation** in the sidebar
2. Add, edit, or remove navigation links
3. Set the label, URL, sort order, and visibility
4. Changes reflect in the site header immediately

---

## Managing Users & Roles

### Creating a New User

1. Go to **Users** in the sidebar
2. Click **Create New**
3. Fill in:

| Field | Required | Description |
|-------|----------|-------------|
| First Name | Yes | User's first name |
| Last Name | Yes | User's last name |
| Email | Yes | Login email (must be unique) |
| Password | Yes (new) | Min 8 characters. Leave blank when editing to keep current |
| Roles | No | Check one or more roles |
| Active | No | Enable/disable account |

4. Click **Save**

### Creating a Custom Role

1. Go to **Roles** in the sidebar
2. Click **Create New**
3. Enter a Role Name and Description
4. Check the permissions this role should have
5. Click **Save**

### Available Permissions (47 total)

| Category | Permissions |
|----------|------------|
| Users | view, create, update, delete |
| Roles | view, create, update, delete |
| Services | view, create, update, delete |
| Categories | view, create, update, delete |
| Blog | view, create, update, delete, publish |
| Products | view, create, update, delete |
| Pages | view, create, update, delete, publish |
| Navigation | view, create, update, delete |
| Media | view, create, delete |
| Chatbot | view, create, update, delete |
| Contacts | view, update, delete |
| Settings | view, update |
| Logs | view |
| Profile | view, update |

### Pre-configured Roles

| Role | Permissions |
|------|------------|
| **super_admin** | All 47 permissions |
| **admin** | Most permissions (varies) |
| **editor** | Blog, services, products, pages |
| **content_manager** | Limited content access |

### Deactivating a User

1. Go to **Users**
2. Click **Edit** on the user
3. Uncheck the **Active** checkbox
4. Click **Save**
5. The user can no longer log in but their data is preserved

---

## Site Settings

The Settings page (`/admin/settings`) contains 28 configurable options grouped into categories.

### Setting Groups

| Group | Settings |
|-------|----------|
| **General** | Site name, tagline, logo URL, favicon URL |
| **Contact** | Email, phone, address |
| **SEO** | Meta title, meta description, meta keywords |
| **Hero** | Hero tag, heading, subheading, CTA text |
| **Sections** | Section titles for services, products, blog |
| **Footer** | Footer about text, copyright text |

### How to Edit Settings

1. Go to **Settings** in the sidebar
2. Find the setting you want to change
3. Edit the value directly in the input field
4. Click **Save All Settings** at the bottom

### Setting Types

| Type | Input | Example |
|------|-------|---------|
| `text` | Text input | Site name |
| `textarea` | Multi-line text | Footer about text |
| `boolean` | Checkbox | Enable/disable feature |
| `number` | Number input | Max items per page |
| `image` | URL input | Logo URL |
| `color` | Color picker | Primary color |
| `json` | JSON textarea | Complex data structures |

---

## Chatbot Configuration

### Managing Chatbot Responses

1. Go to **Chatbot** in the sidebar
2. You'll see all 8 pre-configured responses

### Each response has:

| Field | Description |
|-------|-------------|
| **Trigger Keywords** | Array of words that trigger this response |
| **Response Text** | What the chatbot says back |
| **Priority** | Higher priority = checked first |
| **Active** | Enable/disable this response |

### Adding a New Response

1. Click **Create New**
2. Enter trigger keywords (e.g., `["pricing", "cost", "price"]`)
3. Enter the response text
4. Set priority (higher = checked first when multiple match)
5. Click **Save**

### How Matching Works

When a user sends a message:
1. The message is converted to lowercase
2. Each active response is checked in priority order (highest first)
3. If any trigger keyword is found in the user's message, that response is sent
4. If no match is found, a default "I'm still learning" message is returned

---

## Media Uploads

### Uploading Files

1. Go to **Media** in the sidebar
2. Click **Upload** (or use the upload form)
3. Select a file from your computer
4. The file is stored in the `/uploads` directory
5. A record is created in the database with metadata

### Supported File Types

| Type | Extensions |
|------|-----------|
| Images | `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg` |
| Documents | `.pdf`, `.doc`, `.docx`, `.xls`, `.xlsx` |

### Max File Size

Default: **10 MB** (configurable via `UPLOAD_MAX_SIZE` in `.env`)

### Using Uploaded Files

After uploading, copy the file URL and use it in:
- Blog post featured images
- Product images
- Service icons
- Page section images
- Any other content field that accepts URLs

---

## API Usage

### Public API

The public API is available without authentication:

```bash
# Get all service categories
curl http://localhost:3000/api/v1/services

# Get all products
curl http://localhost:3000/api/v1/products

# Get published blog posts
curl http://localhost:3000/api/v1/blog

# Get a specific blog post
curl http://localhost:3000/api/v1/blog/the-future-of-ai-in-erp

# Get site settings
curl http://localhost:3000/api/v1/settings

# Get navigation items
curl http://localhost:3000/api/v1/navigation

# Submit contact form
curl -X POST http://localhost:3000/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","message":"Hello there, this is a test message."}'

# Chat with the chatbot
curl -X POST http://localhost:3000/api/v1/chatbot \
  -H "Content-Type: application/json" \
  -d '{"message":"cloud services"}'
```

### Chatbot API Response Format

```json
{
  "success": true,
  "data": {
    "response": "Our Cloud services ensure scalable, secure infrastructure...",
    "matched": true
  }
}
```

### Admin API

Requires authentication. Used internally by the admin dashboard for CRUD operations. All endpoints are at `/admin/api/` and require a valid session cookie.

---

## Database Management

### View Database in Prisma Studio

```bash
npx prisma studio
```

Opens a web interface at **http://localhost:5555** where you can browse and edit all data.

### Reset the Database

**Warning:** This deletes ALL data and re-seeds.

```bash
npx prisma migrate reset
node prisma/seed.js
```

### Re-seed Without Resetting

```bash
node prisma/seed.js
```

Note: The seed script uses `upsert` so it won't create duplicates for records with unique constraints.

### Create a New Migration

After modifying `prisma/schema.prisma`:

```bash
npx prisma migrate dev --name descriptive-migration-name
```

### View Database Tables

```bash
PGPASSWORD=yourpassword psql -U postgres -h localhost -d uvosofttech -c "\dt"
```

### Query Specific Tables

```bash
# Count all records
PGPASSWORD=yourpassword psql -U postgres -h localhost -d uvosofttech -c "
SELECT 'users: ' || count(*) FROM users
UNION ALL SELECT 'roles: ' || count(*) FROM roles
UNION ALL SELECT 'services: ' || count(*) FROM services
UNION ALL SELECT 'blog_posts: ' || count(*) FROM blog_posts
UNION ALL SELECT 'products: ' || count(*) FROM products
UNION ALL SELECT 'settings: ' || count(*) FROM site_settings;
"
```

---

## Common Tasks

### Change the Site Name

1. Go to **Settings** in the admin dashboard
2. Find the **General** group
3. Update the **Site Name** field
4. Click **Save All Settings**
5. The name updates in the header, footer, and page titles

### Update Contact Information

1. Go to **Settings**
2. Find the **Contact** group
3. Update email, phone, and/or address
4. Click **Save All Settings**
5. The public contact page and footer update automatically

### Add a New Blog Post

1. **Blog** → **Create New**
2. Enter title, content, excerpt
3. Set status to **Published**
4. Optionally add SEO metadata
5. **Save**
6. Post appears at `/blog` and on the homepage

### Change the Hero Section Text

1. Go to **Settings**
2. Find the **Hero** group
3. Update: Hero Tag, Hero Heading, Hero Subheading, CTA Text
4. **Save**
5. The homepage hero section updates

### Reorder Services

1. Go to **Services** or **Categories**
2. Edit each item
3. Change the **Sort Order** number (lower = appears first)
4. Save each item

### Deactivate the Chatbot

1. Go to **Chatbot**
2. Edit each response
3. Uncheck **Active** for each one
4. Save

Or in Settings, if there's a chatbot toggle setting.

### View Contact Form Submissions

1. Go to **Contacts** in the sidebar
2. See all submissions with name, email, message, date
3. Unread submissions are marked
4. Click a submission to view full details (marks as read)

### Check Activity Logs

1. Go to **Activity Logs** in the sidebar
2. See the last 200 operations with:
   - Action (create, update, delete, login, etc.)
   - Entity type (User, BlogPost, Service, etc.)
   - Who performed it
   - When it happened

---

## Troubleshooting

### "Cannot find module" Error

```bash
Error: Cannot find module '/path/to/node_modules/bcrypt/lib/binding/...'
```

**Fix:**
```bash
npm rebuild bcrypt
```

### "ECONNREFUSED" Database Error

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Fix:**
1. Make sure PostgreSQL is running: `pg_isready`
2. Check your `DATABASE_URL` in `.env`
3. Make sure the port matches your PostgreSQL installation

### "Peer Authentication Failed"

```
FATAL: Peer authentication failed for user "postgres"
```

**Fix:** Use password authentication in your connection string:
```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/uvosofttech
```

### "Database does not exist"

```
FATAL: database "uvosofttech" does not exist
```

**Fix:**
```bash
PGPASSWORD=yourpassword psql -U postgres -h localhost -c "CREATE DATABASE uvosofttech;"
```

### Server Starts but Pages Show Errors

1. Make sure you ran the migration: `npx prisma migrate dev`
2. Make sure you seeded the database: `node prisma/seed.js`
3. Check the terminal for error messages

### Port 3000 Already in Use

```bash
# Find what's using port 3000
lsof -ti:3000

# Kill it
kill $(lsof -ti:3000)

# Or use a different port in .env
PORT=3001
```

### "CSRF Token Mismatch" Error

This happens when the session cookie isn't being sent. Make sure:
1. You're accessing the site via `http://localhost:3000` (not an IP)
2. Your browser accepts cookies
3. You haven't cleared cookies mid-session

### Styles/Scripts Not Loading

1. Make sure the `public/` directory exists with `css/` and `js/` subdirectories
2. Check that `public.css` and `public.js` are present
3. Hard refresh the page: `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac)

### Admin Dashboard Shows Blank Page

1. Make sure you're logged in: visit `/auth/login`
2. Check that your user has the correct role assigned
3. Check browser console for JavaScript errors

---

## FAQ

### Q: Can I run this without PostgreSQL?

No. The application requires PostgreSQL for data storage and session management. There is no SQLite or in-memory fallback.

### Q: How do I change the port?

Edit `.env` and set:
```
PORT=8080
```

### Q: How do I deploy to production?

See the Deployment section in README.md. Key steps:
1. Set `NODE_ENV=production`
2. Use a strong `SESSION_SECRET`
3. Use a managed PostgreSQL service
4. Deploy behind nginx with SSL
5. Change default passwords

### Q: Can I add new pages?

Yes. Go to **Pages** → **Create New**, add a title, slug, and sections. The page becomes accessible at `/<slug>`.

### Q: How do I backup the database?

```bash
PGPASSWORD=yourpassword pg_dump -U postgres -h localhost uvosofttech > backup.sql
```

To restore:
```bash
PGPASSWORD=yourpassword psql -U postgres -h localhost uvosofttech < backup.sql
```

### Q: How do I add Google Analytics or other scripts?

Edit `src/views/layouts/public.ejs` and add your tracking code in the `<head>` section.

### Q: Can I customize the cyberpunk design?

Yes. Edit `public/css/public.css`. The CSS uses custom properties at the top:
```css
:root {
  --bg-black: #030305;
  --neon-blue: #00F0FF;
  --neon-pink: #FF0055;
  --neon-orange: #FF7700;
}
```

### Q: How do I disable the matrix rain / 3D effects?

Edit `public/js/public.js` and comment out or remove the matrix rain and AI canvas sections.

### Q: The seed script says "unique constraint violation"

The seed script is idempotent — it uses `upsert` so running it multiple times is safe. If you still get errors, reset the database first:
```bash
npx prisma migrate reset
node prisma/seed.js
```

### Q: How do I create an admin user manually?

```bash
npx prisma studio
```
Go to the `users` table, add a new record. Then go to `user_roles` and link the user to the `super_admin` role. Use a bcrypt hash for the password (12 rounds).

Or use the admin dashboard if you have an existing admin account.

### Q: What's the difference between the static HTML files and the dynamic site?

The `.html` files (`index.html`, `services.html`, etc.) are the **original static site** kept for reference. The dynamic site uses:
- `src/views/**/*.ejs` — EJS templates
- `public/css/public.css` — Compiled styles
- `public/js/public.js` — Client-side JavaScript

The dynamic site renders content from the database, not hardcoded HTML.

### Q: How do I add HTTPS locally for testing?

Use a tool like [mkcert](https://github.com/FiloSottile/mkcert):
```bash
mkcert -install
mkcert localhost
```
Then configure your reverse proxy (nginx) to use the generated certificates.

---

## File Reference

### Key Files

| File | Purpose |
|------|---------|
| `src/server.js` | Server entry point |
| `src/app.js` | Express configuration, middleware, routes |
| `src/config/index.js` | Environment variable loading |
| `prisma/schema.prisma` | Database schema (19 models) |
| `prisma/seed.js` | Database seeder with all content |
| `.env` | Environment variables (not in git) |
| `public/css/public.css` | Public site styles (cyberpunk theme) |
| `public/js/public.js` | Client-side JS (effects, chatbot, forms) |
| `public/css/admin.css` | Admin dashboard styles |
| `public/js/admin.js` | Admin client-side JS (CRUD, uploads) |

### Routes

| File | Purpose |
|------|---------|
| `src/routes/index.js` | Public page routes (home, about, services, etc.) |
| `src/routes/auth.js` | Login/logout |
| `src/routes/admin.js` | Admin page routes (dashboard, CRUD pages) |
| `src/routes/api/admin.js` | Admin REST API (all CRUD endpoints) |
| `src/routes/api/public.js` | Public API (contact, chatbot, data) |

### Middleware

| File | Purpose |
|------|---------|
| `src/middleware/auth.js` | Session loading, authentication checks |
| `src/middleware/rbac.js` | Role-based permission checks |
| `src/middleware/csrf.js` | CSRF token generation and validation |
| `src/middleware/rateLimiter.js` | Rate limiting configurations |
| `src/middleware/validation.js` | Input validation middleware |
| `src/middleware/activityLogger.js` | Audit trail logging |
| `src/middleware/errorHandler.js` | Global error and 404 handling |
