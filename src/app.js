const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const hpp = require('hpp');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const { Pool } = require('pg');
const csrf = require('csurf');
const { loadUser } = require('./middleware/auth');
const { getCsrfToken } = require('./middleware/csrf');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const config = require('./config');

const app = express();

// Session store setup with fallback for serverless / dev environments
let sessionStore;
try {
  const PgSession = require('connect-pg-simple')(session);
  const pgPool = new Pool({
    connectionString: config.databaseUrl,
  });
  pgPool.on('error', (err) => {
    console.error('PostgreSQL pool error (falling back to MemoryStore if disconnected):', err.message);
  });
  sessionStore = new PgSession({
    pool: pgPool,
    tableName: 'session',
    createTableIfMissing: true,
  });
} catch (e) {
  console.log('Using express-session MemoryStore for serverless/local session handling');
  sessionStore = new session.MemoryStore();
}

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
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: config.session.maxAge || 86400000,
    httpOnly: true,
    secure: config.env === 'production',
    sameSite: 'lax',
  },
}));

const csrfProtection = csrf({ cookie: false });

app.use(loadUser);
app.use(getCsrfToken);

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
    us: { code: 'us', name: 'United States', flag: '🇺🇸', currency: 'USD', symbol: '$', phone: '+1 (800) 555-UVO1', email: 'us@uvosofttech.com' },
    ca: { code: 'ca', name: 'Canada', flag: '🇨🇦', currency: 'CAD', symbol: 'CA$', phone: '+1 (800) 555-UVO2', email: 'ca@uvosofttech.com' },
    sa: { code: 'sa', name: 'Saudi Arabia', flag: '🇸🇦', currency: 'SAR', symbol: 'SAR ', phone: '+966 11 555 UVO3', email: 'sa@uvosofttech.com' },
    pk: { code: 'pk', name: 'Pakistan', flag: '🇵🇰', currency: 'PKR', symbol: 'Rs. ', phone: '+92 42 3555 UVO4', email: 'pk@uvosofttech.com' }
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
