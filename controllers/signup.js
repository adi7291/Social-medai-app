/**
 * - Destructuring data like userName,email,password,useName' from req.body
 * - check if email or useName exist
 * - check if user sending empty data
 * - We will create user with name,email,useName,password. But before that we need to hash the password.
 *
 */
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
const signUp = async (req, res) => {
  const { name, userName, email, password } = req.body;

  try {
    if (!name || !userName || !email || !password) {
      return res.status(400).json({
        message: "AllFields Required !!",
      });
    }
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(409).json({
        message: "Please try with different Email. Email already Exist!!",
      });
    }
    const userNameExist = await User.findOne({ userName });
    if (userNameExist) {
      return res.status(409).json({
        message:
          "This user name already exist. Please try different User Name!!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      userName,
      password: hashedPassword,
    });
  } catch (error) {}
};
