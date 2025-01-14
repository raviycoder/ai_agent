const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
  },
  verifyToken: (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
  },
};
