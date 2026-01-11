/**
 * 👉 To protect routes
 * 👉 To know who is logged in
 * 👉 To stop unauthorized users
 */

import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = await req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized User!!!" });
    }

    const verifyToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: `Invalid token ${error}` });
  }
};
export default authMiddleware;
