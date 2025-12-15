import express from "express";
import { login, logout, registerUser } from "../controllers/auth/auth.js";

export const authRouter = express.authRouter();

authRouter.post("/register", registerUser);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

 