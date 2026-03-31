

const User = require("../models/usermodel");

exports.findByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.findAdminByEmail = async (email) => {
  return await User.findOne({ email, role: "admin" });
};

exports.createAdmin = async (data) => {
  return await User.create(data);
};

exports.findUserByToken = async (token) => {
  return await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });
};

exports.updateResetToken = async (user, token, expiry) => {
  user.resetToken = token;
  user.resetTokenExpiry = expiry;
  return await user.save();
};

exports.updatePassword = async (user, hashedPassword) => {
  user.password = hashedPassword;
  user.resetToken = null;
  user.resetTokenExpiry = null;
  return await user.save();
};
exports.findById = (id) => {
  return User.findById(id);
};

exports.updateUserById = async (userId, data) => {
  return await User.findByIdAndUpdate(userId, data, { new: true }).select("-password");
};

exports.updatePasswordById = async (userId, hashedPassword) => {
  return await User.findByIdAndUpdate(
    userId,
    { password: hashedPassword },
    { new: true }
  );
};    