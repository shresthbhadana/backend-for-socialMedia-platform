

const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    "secretkey",
    { expiresIn: "1h" }
  );
};

exports.verifyResetToken = (token) => {
  return jwt.verify(token, "secretkey");
};

exports.generateResetToken = (user) => {
  return jwt.sign(
    { id: user._id },
    "secretkey",
    { expiresIn: "15m" }
  );
};