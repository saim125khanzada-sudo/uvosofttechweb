const { PrismaClient } = require('@prisma/client');
const config = require('../config');

let prisma;

if (config.env === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient();
  }
  prisma = global.__prisma;
}

function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') !== -1)) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    req.session.flash = { error: ['Please log in to continue'] };
    return res.redirect('/auth/login');
  }

  // If user requires 2FA and hasn't verified TOTP yet, redirect to 2FA verify page
  if (req.session.pending2FA) {
    if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') !== -1)) {
      return res.status(403).json({ error: '2FA verification required', redirect: '/auth/2fa/verify' });
    }
    return res.redirect('/auth/2fa/verify');
  }

  next();
}

async function loadUser(req, res, next) {
  if (!req.session || (!req.session.userId && !req.session.pending2FAUserId)) {
    return next();
  }
  const targetId = req.session.userId || req.session.pending2FAUserId;
  try {
    const user = await prisma.user.findUnique({
      where: { id: targetId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
        isActive: true,
        isTwoFactorEnabled: true,
        twoFactorSecret: true,
        roles: {
          select: {
            role: {
              select: {
                id: true,
                name: true,
                permissions: {
                  select: {
                    permission: {
                      select: {
                        name: true,
                        category: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    if (user && user.isActive) {
      req.user = user;
      res.locals.user = user;
      res.locals.userRoles = user.roles.map(r => r.role.name);
      res.locals.isAdmin = user.roles.some(r => r.role.name === 'admin' || r.role.name === 'superadmin');
      res.locals.isManager = user.roles.some(r => r.role.name === 'manager' || r.role.name === 'admin' || r.role.name === 'superadmin');
    } else {
      delete req.session.userId;
      delete req.session.pending2FA;
      delete req.session.pending2FAUserId;
    }
  } catch (error) {
    console.error('Error loading user:', error);
    delete req.session.userId;
  }
  next();
}

function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') !== -1)) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      return res.redirect('/auth/login');
    }
    const userRoleNames = req.user.roles.map(ur => ur.role.name);
    const hasRole = allowedRoles.some(role => userRoleNames.includes(role) || userRoleNames.includes('superadmin'));
    if (!hasRole) {
      if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') !== -1)) {
        return res.status(403).json({ error: 'Insufficient role permissions' });
      }
      req.session.flash = { error: ['Access denied. Requires role: ' + allowedRoles.join(', ')] };
      return res.redirect('/admin');
    }
    next();
  };
}

function requirePermission(permissionName) {
  return async (req, res, next) => {
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
        return res.status(403).json({ error: 'Insufficient permissions' });
      }
      req.session.flash = { error: ['You do not have permission to access this resource'] };
      return res.redirect('/admin');
    }

    next();
  };
}

module.exports = {
  requireAuth,
  loadUser,
  requireRole,
  requirePermission,
};
