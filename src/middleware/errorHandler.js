const config = require('../config');

function errorHandler(err, req, res, next) {
  console.error('Error:', err.message);
  if (config.env !== 'production') {
    console.error(err.stack);
  }

  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || 'Internal Server Error';

  if (err.code === 'EBADCSRFTOKEN') {
    statusCode = 403;
    message = 'Invalid or missing CSRF token. Please try again.';
  }

  if (err.code === 'P2025') {
    statusCode = 404;
    message = 'The requested resource was not found.';
  }

  if (err.code === 'P2002') {
    statusCode = 409;
    message = 'A record with that value already exists.';
  }

  if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') !== -1)) {
    return res.status(statusCode).json({
      error: message,
      ...(config.env !== 'production' && { stack: err.stack }),
    });
  }

  if (req.session) {
    req.session.flash = { error: [message] };
  }

  if (statusCode === 404) {
    return res.status(404).render('public/404', {
      title: 'Page Not Found',
      layout: 'layouts/public',
      user: req.user || null,
    });
  }

  res.status(statusCode).render('public/error', {
    title: 'Error',
    layout: 'layouts/public',
    error: message,
    statusCode,
    user: req.user || null,
  });
}

function notFoundHandler(req, res) {
  if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') !== -1)) {
    return res.status(404).json({ error: 'Resource not found' });
  }
  res.status(404).render('public/404', {
    title: 'Page Not Found',
    layout: 'layouts/public',
    user: req.user || null,
  });
}

module.exports = { errorHandler, notFoundHandler };
