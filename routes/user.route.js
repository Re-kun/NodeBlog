import express from "express";
import { index, createUser, storeUser, editUser, updateUser ,deleteUser } from "../controllers/user.controller.js";
import { validateToken } from '../middleware/validateToken.js';
const router = express.Router();

router.get("/dashboard/user", validateToken, index);
router.get("/user/create", createUser);
router.get("/user/edit/:id", editUser);
router.post("/user", storeUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;