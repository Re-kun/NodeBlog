import express from "express";
import { indexUser, createUser, storeUser, editUser, updateUser ,deleteUser } from "../controllers/user.controller.js";
import { createPost, storePost, deletePost, editPost, updatePost, dashboardPost } from "../controllers/post.controller.js"
import { indexCategory, createCategory, storeCategory, editCategory, updateCategory, deleteCategory } from "../controllers/category.controller.js";

import { validateToken } from '../middleware/validateToken.js';
const router = express.Router();

// user

router.get("/dashboard/user", validateToken, indexUser);
router.get("/user/create", validateToken, createUser);
router.get("/user/edit/:id", validateToken, editUser);
router.post("/user", validateToken, storeUser);
router.put("/user/:id", validateToken, updateUser);
router.delete("/user/:id", validateToken, deleteUser);
// router.get("/tes", tes);

// Posts

router.get("/dashboard/post", validateToken, dashboardPost);
router.get("/post/create", validateToken, createPost);
router.get("/post/edit/:id", validateToken, editPost);
router.post("/post", validateToken, storePost);
router.put("/post/:id", validateToken, updatePost);
router.delete("/post/:id", validateToken, deletePost);

// Category

router.get("/dashboard/category", validateToken, indexCategory);
router.get("/category/create", validateToken, createCategory);
router.post("/category", validateToken, storeCategory);
router.get("/category/edit/:id", validateToken, editCategory);
router.put("/category/:id", validateToken, updateCategory);
router.delete("/category/:id", validateToken, deleteCategory);

export default router;