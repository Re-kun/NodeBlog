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

router.get("/post/create", createPost);
router.get("/dashboard/post", dashboardPost);
router.get("/post/edit/:id", editPost);
router.post("/post", storePost);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

// Category

router.get("/dashboard/category", indexCategory);
router.get("/category/create", createCategory);
router.post("/category", storeCategory);
router.get("/category/edit/:id", editCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

export default router;