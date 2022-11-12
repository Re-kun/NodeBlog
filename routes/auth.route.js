import express  from "express";
import { signIn, signUp, register, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/login", signIn);
router.get("/register", signUp);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;