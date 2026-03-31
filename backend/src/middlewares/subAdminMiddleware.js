const adminOrSubAdmin = (req, res, next) => {
  if (
    req.user.type === "admin" ||
    req.user.type === "sub-admin"
  ) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Access denied",
  });
};

module.exports = adminOrSubAdmin;