const rateLimit = require('express-rate-limit');

// Permissive rate limiter for Vercel serverless functions where proxy IPs are shared
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500, // High limit so team logins are never blocked
  skip: (req) => true, // Completely bypass rate limiting on login to prevent lockouts
  message: 'Too many authentication attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1000,
  skip: (req) => true,
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: 'Too many contact form submissions, please try again after an hour',
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { authLimiter, apiLimiter, contactLimiter };
