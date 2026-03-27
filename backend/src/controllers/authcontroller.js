const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authService = require("../services/authService")

const JWT_SECRET = "supersecretkey"; 
exports.register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);

    return res.status(201).json({
      message: "User registered successfully",
      data: user
    });

  } catch (error) {
     console.log(error)
    return res.status(500).json({
      message: error.message
     
      
    });
  }
};

 

 

exports.login = async (req, res) => {
  try {
    const { token } = await authService.loginUser(req.body);

    return res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};
 
 
exports.getMe = async (req, res) => {
  try {
    const { userName } = req.query;

    const user = await authService.getUserByUserName(userName);

    return res.status(200).json({ user });

  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};
 
 
