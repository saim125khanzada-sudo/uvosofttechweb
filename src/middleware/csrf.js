function getCsrfToken(req, res, next) {
  if (req.csrfToken) {
    try {
      res.locals.csrfToken = req.csrfToken();
    } catch (e) {
      res.locals.csrfToken = null;
    }
  } else {
    res.locals.csrfToken = null;
  }
  next();
}

function validateCsrf(req, res, next) {
  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') {
    return next();
  }
  if (req.csrfToken && req.body && req.body._csrf) {
    return next();
  }
  if (!req.csrfToken) {
    return next();
  }
  return next();
}

module.exports = { getCsrfToken, validateCsrf };
