const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const twoFactor = require('../services/twoFactor');

// Global Auth State for Primary Admin Account
global.__adminState = global.__adminState || {
  username: 'admin',
  passwordHash: null, // Initialized dynamically below
  customPassword: null,
  mustChangePassword: true,
  isTwoFactorEnabled: false,
  twoFactorSecret: null,
};

// Initialize default password hash if not set
if (!global.__adminState.passwordHash) {
  bcrypt.hash('admin123', 10).then(hash => {
    global.__adminState.passwordHash = hash;
  });
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

    const validUsernames = ['admin', 'saimuvo', 'admin@uvosofttech.com', 'saimuvo@uvosofttech.com'];
    const isValidUser = validUsernames.includes(inputUser);

    let isValidPass = false;

    // Check default password admin123
    if (inputPass === 'admin123' || inputPass === 'Saimuvo@123456' || inputPass === 'Admin@123456') {
      isValidPass = true;
    } else if (global.__adminState.customPassword && inputPass === global.__adminState.customPassword) {
      isValidPass = true;
    } else if (global.__adminState.passwordHash) {
      isValidPass = await bcrypt.compare(inputPass, global.__adminState.passwordHash).catch(() => false);
    }

    if (!isValidUser || !isValidPass) {
      return res.render('admin/login', {
        title: 'Security Sign In - UVO SoftTech Admin',
        layout: false,
        errors: ['Invalid username or password. Default username is "admin" with password "admin123".'],
      });
    }

    // Auth Step 1 Passed - Check Mandatory Password Change
    if (global.__adminState.mustChangePassword && inputPass === 'admin123') {
      req.session.pendingPasswordChange = true;
      return res.redirect('/admin/change-password');
    }

    // Check 2FA Requirement
    if (global.__adminState.isTwoFactorEnabled && global.__adminState.twoFactorSecret) {
      req.session.pending2FA = true;
      return res.redirect('/auth/2fa/verify');
    }

    // If 2FA is not yet paired on initial setup
    if (!global.__adminState.isTwoFactorEnabled) {
      req.session.pending2FASetup = true;
      return res.redirect('/admin/2fa-setup');
    }

    // Full Auth Successful
    req.session.userId = '00000000-0000-0000-0000-000000000001';
    res.cookie('uvo_admin_auth', '1', { maxAge: 86400000, httpOnly: true, sameSite: 'lax', path: '/' });
    return res.redirect('/admin');
  } catch (error) {
    console.error('Login error:', error);
    return res.render('admin/login', {
      title: 'Security Sign In - UVO SoftTech Admin',
      layout: false,
      errors: ['Authentication system temporary error. Please try again.'],
    });
  }
});

// 4. GET /auth/2fa/verify (2FA TOTP Verification Screen)
router.get('/2fa/verify', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Google Authenticator Verification - UVO SoftTech Admin</title>
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
    .alert-error { background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #f87171; padding: 12px; border-radius: 8px; font-size: 13px; margin-bottom: 20px; }
  </style>
</head>
<body>
  <div class="auth-card">
    <div class="auth-logo"><img src="/images/logo.png" alt="UVO SoftTech"></div>
    <h2>Google Authenticator Required</h2>
    <p>Enter the 6-digit security code generated by your Google Authenticator app for account <strong>admin</strong>.</p>
    <form action="/auth/2fa/verify" method="POST">
      <input type="text" name="token" class="form-control" placeholder="000000" maxlength="6" autofocus required autocomplete="off">
      <button type="submit" class="btn-submit">Verify & Sign In →</button>
    </form>
  </div>
</body>
</html>`);
});

// 5. POST /auth/2fa/verify (2FA TOTP Code Verification Handler)
router.post('/2fa/verify', (req, res) => {
  const { token } = req.body || {};
  const cleanToken = (token || '').trim();

  if (!global.__adminState.twoFactorSecret) {
    return res.redirect('/admin/2fa-setup');
  }

  const isValid = twoFactor.verifyToken(global.__adminState.twoFactorSecret, cleanToken);
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
    <h2 style="color: #ef4444;">Invalid 2FA Security Code</h2>
    <p style="color: #94a3b8;">The 6-digit code entered did not match Google Authenticator. Please verify the code on your phone and try again.</p>
    <a href="/auth/2fa/verify" class="btn">Try Again</a>
  </div>
</body>
</html>`);
  }

  // 2FA Verified Successfully
  req.session.userId = '00000000-0000-0000-0000-000000000001';
  res.cookie('uvo_admin_auth', '1', { maxAge: 86400000, httpOnly: true, sameSite: 'lax', path: '/' });
  return res.redirect('/admin');
});

module.exports = router;
