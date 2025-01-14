const bcrypt = require("bcryptjs");

module.exports = {
  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  },
  verifyPassword: async (password, hash) => {
    return bcrypt.compare(password, hash);
  },
};