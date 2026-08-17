const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const twoFactor = require('../services/twoFactor');
const persistentStore = require('../utils/persistentStore');

// Client-Side Safe Navigation Helper to Prevent Mobile Safari/Chrome Cookie Drops & Redirect Loops
function sendAuthRedirect(res, targetUrl) {
  res.cookie('uvo_admin_auth', '1', {
    maxAge: 86400000,
    httpOnly: true,
    sameSite: 'lax',
    path: '/'
  });
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Authenticating - UVO SoftTech</title>
  <script>window.location.href = "${targetUrl}";</script>
</head>
<body style="background:#020307; color:#fff; font-family:sans-serif; display:flex; align-items:center; justify-content:center; min-height:100vh;">
  <div style="text-align:center; background:rgba(15,23,42,0.85); border:1px solid rgba(255,0,117,0.25); border-radius:16px; padding:32px;">
    <h2 style="margin:0 0 12px 0; background: linear-gradient(135deg, #FF0075, #FF6B00); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">Authenticating Admin...</h2>
    <p style="color:#94a3b8;"><a href="${targetUrl}" style="color:#FF0075;">Click here if not redirected automatically.</a></p>
  </div>
</body>
</html>`);
}

// 1. GET /auth/login (Login Form Page)
router.get('/login', (req, res) => {
  if (req.query.clear === '1' || req.query.logout === '1') {
    if (req.session) {
      try { req.session.destroy(() => {}); } catch (e) {}
    }
    res.clearCookie('uvo_sid', { path: '/' });
    res.clearCookie('uvo_admin_auth', { path: '/' });
  }

  res.render('admin/login', {
    title: 'Security Sign In - UVO SoftTech Admin',
    layout: false,
  });
});

// 2. GET /auth/logout (Logout)
router.get('/logout', (req, res) => {
  if (req.session) {
    try { req.session.destroy(() => {}); } catch (e) {}
  }
  res.clearCookie('uvo_sid', { path: '/' });
  res.clearCookie('uvo_admin_auth', { path: '/' });
  res.redirect('/auth/login?logout=1');
});

// 3. POST /auth/login (Initial Step 1 Authentication)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const inputUser = (email || '').trim().toLowerCase();
    const inputPass = (password || '').trim();

    if (!inputUser || !inputPass) {
      return res.render('admin/login', {
        title: 'Security Sign In - UVO SoftTech Admin',
        layout: false,
        errors: ['Please enter both username and password.'],
      });
    }

    const adminState = await persistentStore.getAdminStateAsync();
    const validUsernames = ['admin', 'saimuvo', 'admin@uvosofttech.com', 'saimuvo@uvosofttech.com'];
    const isValidUser = validUsernames.includes(inputUser);

    let isValidPass = false;

    // If password has NEVER been changed, default admin123 is valid
    if (adminState.mustChangePassword && (inputPass === 'admin123' || inputPass === 'Saimuvo@123456' || inputPass === 'Admin@123456')) {
      isValidPass = true;
    } else if (adminState.customPassword && inputPass === adminState.customPassword) {
      isValidPass = true;
    } else if (adminState.passwordHash) {
      isValidPass = await bcrypt.compare(inputPass, adminState.passwordHash).catch(() => false);
    }

    if (!isValidUser || !isValidPass) {
      return res.render('admin/login', {
        title: 'Security Sign In - UVO SoftTech Admin',
        layout: false,
        errors: ['Invalid username or password.'],
      });
    }

    // Step 1: Check if Password Change is still required
    if (adminState.mustChangePassword) {
      return sendAuthRedirect(res, '/admin/change-password');
    }

    // Step 2: Check 2FA Requirement
    if (adminState.isTwoFactorEnabled && adminState.twoFactorSecret) {
      return sendAuthRedirect(res, '/auth/2fa/verify');
    }

    // Initial 2FA Setup (only if not paired yet)
    if (!adminState.isTwoFactorEnabled) {
      return sendAuthRedirect(res, '/admin/2fa-setup');
    }

    // Full Auth Successful
    return sendAuthRedirect(res, '/admin');
  } catch (error) {
    console.error('Login error:', error);
    return res.render('admin/login', {
      title: 'Security Sign In - UVO SoftTech Admin',
      layout: false,
      errors: ['Authentication error. Please try again.'],
    });
  }
});

// 4. GET /auth/2fa/verify
router.get('/2fa/verify', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Google Authenticator - UVO SoftTech Admin</title>
  <link rel="icon" type="image/png" href="/images/logo.png">
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --bg-dark: #020307; --border-color: rgba(255, 0, 117, 0.25); --primary-pink: #FF0075; --primary-orange: #FF6B00; }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg-dark); color: #fff; font-family: 'Space Grotesk', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
    .auth-card { background: rgba(15, 23, 42, 0.85); border: 1px solid var(--border-color); border-radius: 16px; width: 100%; max-width: 440px; padding: 36px; text-align: center; }
    .auth-logo img { height: 44px; margin-bottom: 16px; }
    h2 { font-size: 20px; margin: 0 0 8px 0; background: linear-gradient(135deg, var(--primary-pink), var(--primary-orange)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    p { color: #94a3b8; font-size: 14px; margin-bottom: 24px; line-height: 1.5; }
    .form-control { width: 100%; padding: 14px; background: rgba(8, 10, 20, 0.9); border: 1px solid var(--border-color); border-radius: 8px; color: #fff; font-size: 22px; font-weight: 700; text-align: center; letter-spacing: 6px; margin-bottom: 20px; }
    .btn-submit { width: 100%; padding: 14px; background: linear-gradient(135deg, var(--primary-pink), var(--primary-orange)); color: #fff; border: none; border-radius: 8px; font-weight: 700; font-size: 15px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="auth-card">
    <div class="auth-logo"><img src="/images/logo.png" alt="UVO SoftTech"></div>
    <h2>Google Authenticator Code</h2>
    <p>Enter the 6-digit code generated by your Google Authenticator app for account <strong>admin</strong>.</p>
    <form action="/auth/2fa/verify" method="POST">
      <input type="text" name="token" class="form-control" placeholder="000000" maxlength="6" autofocus required autocomplete="off">
      <button type="submit" class="btn-submit">Verify & Sign In →</button>
    </form>
  </div>
</body>
</html>`);
});

// 5. POST /auth/2fa/verify
router.post('/2fa/verify', async (req, res) => {
  const { token } = req.body || {};
  const cleanToken = (token || '').trim();

  const adminState = await persistentStore.getAdminStateAsync();
  if (!adminState.twoFactorSecret) {
    return sendAuthRedirect(res, '/admin/2fa-setup');
  }

  const isValid = twoFactor.verifyToken(adminState.twoFactorSecret, cleanToken);
  if (!isValid) {
    return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>2FA Verification Failed</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  <style>
    body { background: #020307; color: #fff; font-family: 'Space Grotesk', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .card { background: rgba(15,23,42,0.85); border: 1px solid #ef4444; border-radius: 16px; padding: 36px; max-width: 420px; text-align: center; }
    .btn { display: inline-block; margin-top: 20px; padding: 12px 24px; background: linear-gradient(135deg, #FF0075, #FF6B00); color: #fff; text-decoration: none; border-radius: 8px; font-weight: 700; }
  </style>
</head>
<body>
  <div class="card">
    <h2 style="color: #ef4444;">Invalid 2FA Code</h2>
    <p style="color: #94a3b8;">The code entered did not match Google Authenticator. Please try again.</p>
    <a href="/auth/2fa/verify" class="btn">Try Again</a>
  </div>
</body>
</html>`);
  }

  return sendAuthRedirect(res, '/admin');
});

module.exports = router;
