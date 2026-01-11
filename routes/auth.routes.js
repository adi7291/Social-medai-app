import express from "express";
import { signin, signOut, signUp } from "../controllers/auth.controller";

const authRoutes = express.Router();

authRoutes.post("/signUp", signUp);
authRoutes.post("/sigIn", signin);
authRoutes.post("/sigOut", signOut);
export default authRoutes;
