import express from "express";
import { generateGuest, login, logout, registerUser } from "../../controllers/authCtrl/authCtrl.js";

export const authRouter = express.Router();

authRouter.get("/generate-guest", generateGuest);
authRouter.post("/register", registerUser);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

 