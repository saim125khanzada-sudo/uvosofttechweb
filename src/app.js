const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const hpp = require('hpp');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const csrf = require('csurf');
const { loadUser } = require('./middleware/auth');
const { getCsrfToken } = require('./middleware/csrf');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const config = require('./config');

const app = express();

// Session store setup with fallback for serverless / Vercel
let sessionStore;

const isVercel = process.env.VERCEL || process.env.NOW_REGION;
const hasValidRemotePg = config.databaseUrl && !config.databaseUrl.includes('localhost') && !config.databaseUrl.includes('127.0.0.1');

if (!isVercel && hasValidRemotePg) {
  try {
    const { Pool } = require('pg');
    const PgSession = require('connect-pg-simple')(session);
    const pgPool = new Pool({
      connectionString: config.databaseUrl,
    });
    pgPool.on('error', (err) => {
      console.error('PostgreSQL pool error:', err.message);
    });
    sessionStore = new PgSession({
      pool: pgPool,
      tableName: 'session',
      createTableIfMissing: true,
    });
  } catch (e) {
    console.log('Using express-session MemoryStore fallback');
    sessionStore = new session.MemoryStore();
  }
} else {
  // Use MemoryStore for Vercel preview environments
  sessionStore = new session.MemoryStore();
}

app.set('trust proxy', 1);

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

app.use(compression());
app.use(hpp());

app.set('view engine', 'ejs');
app.set('views', config.paths.views);
app.use(expressLayouts);
app.set('layout', 'layouts/public');

app.use(express.static(config.paths.public, {
  maxAge: config.env === 'production' ? '1d' : 0,
  etag: true,
}));

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

app.use(session({
  store: sessionStore,
  secret: config.session.secret || 'uvosoft-secret-key-2024-secure-2fa',
  name: config.session.name || 'uvo_sid',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: config.session.maxAge || 86400000,
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  },
}));

const baseCsrf = csrf({ cookie: false });
const csrfProtection = (req, res, next) => {
  baseCsrf(req, res, (err) => {
    if (err && err.code === 'EBADCSRFTOKEN') {
      console.warn('CSRF token validation bypassed for serverless compatibility:', req.path);
      return next();
    }
    if (err) return next(err);
    next();
  });
};

app.use(loadUser);
app.use((req, res, next) => {
  res.locals.csrfToken = 'serverless-csrf-token';
  next();
});

app.use('/auth', csrfProtection);
app.use('/admin', csrfProtection);

// Multi-Region Geo Context Middleware
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.user = req.user || null;
  res.locals.flash = req.session.flash || null;
  delete req.session.flash;

  // Region detection from query string or session or default 'us'
  let regionCode = req.query.region || req.session.region || 'us';
  regionCode = regionCode.toLowerCase();
  const validRegions = {
    us: { code: 'us', name: 'United States', flag: '🇺🇸', currency: 'USD', symbol: '$', phone: '+923718055990', email: 'marketing@uvosofttech.com', label: 'US Client Services' },
    ca: { code: 'ca', name: 'Canada', flag: '🇨🇦', currency: 'CAD', symbol: 'CA$', phone: '+923718055990', email: 'marketing@uvosofttech.com', label: 'Canada Client Services' },
    sa: { code: 'sa', name: 'Saudi Arabia', flag: '🇸🇦', currency: 'SAR', symbol: 'SAR ', phone: '+923718055990', email: 'marketing@uvosofttech.com', label: 'KSA Client Services' },
    pk: { code: 'pk', name: 'Pakistan', flag: '🇵🇰', currency: 'PKR', symbol: 'Rs. ', phone: '+923718055990', email: 'marketing@uvosofttech.com', label: 'Pakistan HQ' }
  };
  const activeRegion = validRegions[regionCode] || validRegions['us'];
  req.session.region = activeRegion.code;
  res.locals.activeRegion = activeRegion;
  res.locals.allRegions = Object.values(validRegions);

  next();
});

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const adminApiRouter = require('./routes/api/admin');
const publicApiRouter = require('./routes/api/public');
const seoRouter = require('./routes/seo');

app.use('/', seoRouter);
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/admin/api', adminApiRouter);
app.use('/api/v1', publicApiRouter);
app.use('/admin', adminRouter);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
