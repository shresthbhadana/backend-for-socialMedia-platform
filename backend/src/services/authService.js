const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepo = require("../repository/userRepo.js");
const sendEmail = require("../utils/emailService.js");
const { generateResetToken, verifyResetToken } = require("../utils/token.js");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

exports.registerUser = async ({ name, userName, email, password }) => {
  if (!name || !userName || !email || !password) {
    throw new Error("All fields are required");
  }

  const existingUser = await userRepo.findUserByEmail(email);
  if (existingUser) {
    throw new Error("Already existing User");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userRepo.createUser({
      name,
      userName,
      email,
      password: hashedPassword,
    });

    return newUser;
  } catch (error) {
    console.error("registerUser error:", error);
    throw new Error("Internal server error");
  }
};

exports.loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("All fields are required");
  }

  const user = await userRepo.findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  await userRepo.updateUserToken(user._id, token);

  return { user, token}
};

exports.getUserByUserName = async(userName)=>{

  if (!userName) {
    throw new Error("userName is required");
  }
    const user = await userRepo.findUserByName(userName)
    return user ;
}
exports.forgotPassword = async(email)=>{
    const user = await userRepo.findUserByEmail(email);
    if(!user){
        throw new Error("no user found on this email");
    }
    const token = generateResetToken(user)
    const resetLink = `http://localhost:8080/reset-password/${token}`
    await sendEmail(
        user.email,
        "Reset your password",
          `<h3>Click below to reset password</h3>
     <a href="${resetLink}">Reset Password</a>`
    )
    return {message : "reset email sent"}
}
exports.resetPassword = async(token, newPassword)=>{
    let checkToken ;
    try {
        checkToken = verifyResetToken(token);
    }catch(error){
        throw new Error("invalid or expired token");
    }
    const user = await userRepo.getUserById(checkToken.id)
    if(!user){
        throw new Error("user not found");
    }
    const hashedPassword = await bcrypt.hash(newPassword,10);
    user.password = hashedPassword;
    await userRepo.updateUser(user);
    return {message: "password reset successfully"};
}