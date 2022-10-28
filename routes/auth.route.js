import express  from "express";
import { signIn, signUp, register, login } from "../controllers/auth.controller.js";
import { validateAuth } from "../middleware/validateAuth.js";

const router = express.Router();

router.get("/login", validateAuth, signIn);
router.get("/register", validateAuth, signUp);
router.post("/register", validateAuth, register);
router.post("/login", validateAuth, login);

export default router;