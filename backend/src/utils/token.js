

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

exports.generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};

exports.verifyResetToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

exports.generateResetToken = (user) => {
  return jwt.sign(
    { id: user._id },
    JWT_SECRET,
    { expiresIn: "15m" }
  );
};