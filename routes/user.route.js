import express from "express";
import { index, createUser, storeUser, editUser, updateUser ,deleteUser } from "../controllers/user.controller.js";
import { validateToken } from '../middleware/validateToken.js';
const router = express.Router();

router.get("/dashboard/user", validateToken, index);
router.get("/user/create", validateToken, createUser);
router.get("/user/edit/:id", validateToken, editUser);
router.post("/user", validateToken, storeUser);
router.put("/user/:id", validateToken, updateUser);
router.delete("/user/:id", validateToken, deleteUser);

// router.get("/tes", tes);



export default router;