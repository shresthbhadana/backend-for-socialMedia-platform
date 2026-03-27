const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepo = require("../repository/userRepo.js");

const JWT_SECRET = "supersecretkey";

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