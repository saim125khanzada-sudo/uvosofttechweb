function checkPermission(permissionName) {
  return (req, res, next) => {
    if (!req.user) {
      if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') !== -1)) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      req.session.flash = { error: ['Please log in to continue'] };
      return res.redirect('/auth/login');
    }

    const hasPermission = req.user.roles.some((userRole) =>
      userRole.role.permissions.some((rp) => rp.permission.name === permissionName)
    );

    if (!hasPermission) {
      if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') !== -1)) {
        return res.status(403).json({ error: `Permission denied: ${permissionName}` });
      }
      req.session.flash = { error: ['You do not have permission to perform this action'] };
      return res.redirect('/admin');
    }

    next();
  };
}

module.exports = { checkPermission };
