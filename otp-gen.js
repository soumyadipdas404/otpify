const crypto = require('crypto');
const randomstring = require('randomstring');

const OTP_LENGTH = 6; // Default OTP length
const OTP_CHARSET = 'numeric'; // Default character set (numeric)
const OTP_EXPIRY = 300; // Default OTP expiry (in seconds)

/**
 * Generates a new OTP (One-Time Password)
 * @param {Object} opts - Options for OTP generation
 * @param {string} [opts.secretKey] - Secret key for OTP generation (optional)
 * @param {number} [opts.length] - Length of the OTP (default: 6)
 * @param {string} [opts.charset] - Character set for the OTP (default: 'numeric')
 * @param {number} [opts.expiryTime] - OTP expiry time in seconds (default: 300)
 * @returns {Object} - Object containing the OTP and its expiry time
 */
function generateOTP(opts = {}) {
  const { secretKey, length = OTP_LENGTH, charset = OTP_CHARSET, expiryTime = OTP_EXPIRY } = opts;

  try {
    const randomBytes = crypto.randomBytes(32);
    const seed = secretKey ? crypto.createHash('sha256').update(secretKey).update(randomBytes).digest() : randomBytes;

    const otp = randomstring.generate({
      length,
      charset: charset === 'numeric' ? 'numeric' : 'alphanumeric',
      capitalization: 'lowercase'
    });

    const expiryTimestamp = Date.now() + (expiryTime * 1000);
    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

    return { otp, expiryTimestamp, hashedOTP };
  } catch (err) {
    throw new Error(`OTP generation failed: ${err.message}`);
  }
}

/**
 * Verifies an OTP (One-Time Password)
 * @param {string} otp - The OTP to be verified
 * @param {string} hashedOTP - The hashed OTP value for comparison
 * @param {number} expiryTimestamp - The expiry timestamp of the OTP
 * @param {string} [secretKey] - Secret key for OTP verification (optional)
 * @returns {boolean} - True if the OTP is valid, false otherwise
 */
function verifyOTP(otp, hashedOTP, expiryTimestamp, secretKey = '') {
  try {
    const currentTimestamp = Date.now();
    if (currentTimestamp > expiryTimestamp) {
      return false; // OTP expired
    }

    const seed = secretKey ? crypto.createHash('sha256').update(secretKey).update(crypto.randomBytes(32)).digest() : crypto.randomBytes(32);
    const calculatedHash = crypto.createHash('sha256').update(otp).digest('hex');

    return hashedOTP === calculatedHash;
  } catch (err) {
    throw new Error(`OTP verification failed: ${err.message}`);
  }
}

module.exports = { generateOTP, verifyOTP };