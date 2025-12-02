const bcrypt = require('bcryptjs');

/**
 * Hash a password using bcrypt
 */
async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Compare a password with a hash
 */
async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = {
  hashPassword,
  comparePassword,
};
