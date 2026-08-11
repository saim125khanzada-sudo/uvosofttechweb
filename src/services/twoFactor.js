const crypto = require('crypto');

// Base32 Alphabet according to RFC 4648
const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function base32Encode(buffer) {
  let bits = 0;
  let value = 0;
  let output = '';

  for (let i = 0; i < buffer.length; i++) {
    value = (value << 8) | buffer[i];
    bits += 8;
    while (bits >= 5) {
      output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  }

  return output;
}

function base32Decode(base32Str) {
  const cleaned = base32Str.toUpperCase().replace(/=+$/, '').replace(/[^A-Z2-7]/g, '');
  let bits = 0;
  let value = 0;
  const bytes = [];

  for (let i = 0; i < cleaned.length; i++) {
    const idx = BASE32_ALPHABET.indexOf(cleaned[i]);
    if (idx === -1) continue;
    value = (value << 5) | idx;
    bits += 5;

    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }

  return Buffer.from(bytes);
}

function generateSecret(length = 20) {
  const randomBytes = crypto.randomBytes(length);
  return base32Encode(randomBytes);
}

function generateTOTP(secret, timeStep = 30, windowOffset = 0) {
  const key = base32Decode(secret);
  const epoch = Math.floor(Date.now() / 1000);
  let timeCounter = Math.floor(epoch / timeStep) + windowOffset;

  const buf = Buffer.alloc(8);
  for (let i = 7; i >= 0; i--) {
    buf[i] = timeCounter & 0xff;
    timeCounter = timeCounter >> 8;
  }

  const hmac = crypto.createHmac('sha1', key).update(buf).digest();
  const offset = hmac[hmac.length - 1] & 0x0f;
  const code =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);

  const otp = (code % 1000000).toString().padStart(6, '0');
  return otp;
}

function verifyToken(secret, token, window = 1) {
  if (!token || typeof token !== 'string') return false;
  const cleanToken = token.trim();
  if (cleanToken.length !== 6 || !/^\d+$/.test(cleanToken)) return false;

  for (let errorWindow = -window; errorWindow <= window; errorWindow++) {
    const generated = generateTOTP(secret, 30, errorWindow);
    if (generated === cleanToken) {
      return true;
    }
  }
  return false;
}

function getOtpauthUrl(issuer, accountName, secret) {
  const encodedIssuer = encodeURIComponent(issuer);
  const encodedAccount = encodeURIComponent(accountName);
  return `otpauth://totp/${encodedIssuer}:${encodedAccount}?secret=${secret}&issuer=${encodedIssuer}&algorithm=SHA1&digits=6&period=30`;
}

function getQrCodeDataUrl(otpauthUrl) {
  const chartUrl = `https://quickchart.io/qr?text=${encodeURIComponent(otpauthUrl)}&size=200&margin=1`;
  return chartUrl;
}

module.exports = {
  generateSecret,
  generateTOTP,
  verifyToken,
  getOtpauthUrl,
  getQrCodeDataUrl,
};
