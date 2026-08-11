const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  databaseUrl: process.env.DATABASE_URL,
  session: {
    secret: process.env.SESSION_SECRET || 'fallback-secret-change-me-in-production',
    maxAge: parseInt(process.env.SESSION_MAX_AGE, 10) || 86400000,
    inactivityTimeout: parseInt(process.env.SESSION_INACTIVITY_TIMEOUT, 10) || 1800000,
    name: 'uv.sid',
    resave: false,
    saveUninitialized: false,
  },
  upload: {
    maxSize: parseInt(process.env.UPLOAD_MAX_SIZE, 10) || 10485760,
    allowedMimeTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
    directory: path.join(__dirname, '..', '..', 'uploads'),
  },
  paths: {
    root: path.join(__dirname, '..', '..'),
    views: path.join(__dirname, '..', 'views'),
    public: path.join(__dirname, '..', '..', 'public'),
    uploads: path.join(__dirname, '..', '..', 'uploads'),
  },
  security: {
    bcryptRounds: 12,
  },
};

module.exports = config;
