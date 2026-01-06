/**
 * 1. Take credential (email/userName and Password)
 * 2. Find user (email or userName)
 * 3. compare password (bcrypt)
 * 4. Generate Token(jwt)
 * 5. Send token securely
 */

import bcrypt from "bcrypt";
import generateAccessToken from "../config/token.js";
import User from "../models/userModel.js";

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    //Validation
    if (!identifier || !password) {
      return res
        .status(400)
        .json({ message: "Email/userName and password are required" });
    }

    // find user (email/userName)
    const user = await User.findOne({
      $or: [{ email: identifier }, { userName: identifier }],
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //Generate Token
    const token = generateAccessToken(user._id);
    //set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 60 * 60 * 1000,
    });
    //remove password before sending response
    const { password: _, ...userData } = user.toObject();
    return res
      .status(200)
      .json({ message: "Login Successfully!!!", user: userData });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "An error occurred during login",
      error: error.message,
    });
  }
};

export default login;
