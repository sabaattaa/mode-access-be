import express from "express";
import { login, logout, registerUser } from "../../controllers/authCtrl/authCtrl.js";

export const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

 