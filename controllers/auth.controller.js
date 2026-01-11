/**
 * - Destructuring data like userName,email,password,useName' from req.body
 * - check if email or useName exist
 * - check if user sending empty data
 * - We will create user with name,email,useName,password. But before that we need to hash the password.
 *
 */
import generateAccessToken from "../config/token.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const { name, userName, email, password } = req.body;
    //checking for userInput
    if (!name || !userName || !email || !password) {
      return res.status(400).json({
        message: "All fields are Required !!",
      });
    }
    //checking for user password length
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least six characters" });
    }
    // const emailExist = await User.findOne({ email });
    // if (emailExist) {
    //   return res.status(409).json({
    //     message: "Please try with different Email. Email already Exist!!",
    //   });
    // }
    // const userNameExist = await User.findOne({ userName });
    // if (userNameExist) {
    //   return res.status(409).json({
    //     message:
    //       "This user name already exist. Please try different User Name!!",
    //   });
    // }

    //Instead of two querying two times its better Query DB once.
    const existingUser = User.findOne({
      $or: [{ email }, { userName }],
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: `Email or user name already exists.` });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create user
    const user = await User.create({
      name,
      email,
      userName,
      password: hashedPassword,
    });
    //Generate Token
    const token = await generateAccessToken(user._id);
    //Set Cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      secure: false, //for time being but if we deploy we can make it true.
      sameSite: "Strict",
    });
    //send safe response
    return res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userName: user.userName,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: `Internal server error` });
  }
};

/**
 * 1. Take credential (email/userName and Password)
 * 2. Find user (email or userName)
 * 3. compare password (bcrypt)
 * 4. Generate Token(jwt)
 * 5. Send token securely
 */
export const signin = async (req, res) => {
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

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Signout successfully!!." });
  } catch (error) {
    console.error("Signout error");
    return res.status(500).json({
      message: "SignOut Error",
      error: error.message,
    });
  }
};
