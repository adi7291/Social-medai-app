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

const signUp = async (req, res) => {
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

export default signUp;
