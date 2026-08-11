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

async function logActivity(action, entityType, entityId, details, req) {
  try {
    const logData = {
      action,
      entityType,
      entityId: entityId || null,
      details: details || null,
      ipAddress: req ? (req.headers['x-forwarded-for'] || req.connection?.remoteAddress || null) : null,
      userAgent: req ? (req.headers['user-agent'] || null) : null,
    };

    if (req && req.user) {
      logData.userId = req.user.id;
    }

    await prisma.activityLog.create({ data: logData });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
}

function activityLogger(action, entityType) {
  return (req, res, next) => {
    const originalSend = res.send;
    res.send = function (body) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        let entityId = null;
        if (req.params && req.params.id) {
          entityId = req.params.id;
        }
        logActivity(action, entityType, entityId, {
          method: req.method,
          path: req.originalUrl,
          statusCode: res.statusCode,
        }, req).catch(() => {});
      }
      return originalSend.call(this, body);
    };
    next();
  };
}

module.exports = { logActivity, activityLogger };
