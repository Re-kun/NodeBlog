import express from "express";
import { indexUser, createUser, storeUser, editUser, updateUser ,deleteUser } from "../controllers/user.controller.js";
import { createPost, storePost, deletePost, editPost, updatePost, dashboardPost } from "../controllers/post.controller.js"
import { indexCategory, createCategory, storeCategory, editCategory, updateCategory, deleteCategory } from "../controllers/category.controller.js";

// middleware
import { validateAuth } from "../middleware/validateAuth.js";
import upload from "../middleware/upload.js";
const router = express.Router();

// user

router.get("/dashboard/user", validateAuth, indexUser);
router.get("/user/create", validateAuth, createUser);
router.get("/user/edit/:id", validateAuth, editUser);
router.post("/user", validateAuth, storeUser);
router.post("/user/update/:id", validateAuth, updateUser);
router.post("/user/delete/:id", validateAuth, deleteUser);

// Posts

router.get("/dashboard/post", validateAuth, dashboardPost);
router.get("/post/create", validateAuth, upload, createPost);
router.get("/post/edit/:id", validateAuth, upload, editPost);
router.post("/post/update/:id", validateAuth, upload, updatePost);
router.post("/post", validateAuth, upload, storePost);
router.post("/post/delete/:id", validateAuth, deletePost);

// Category

router.get("/dashboard/category", validateAuth, indexCategory);
router.get("/category/create", validateAuth, createCategory);
router.get("/category/edit/:id", validateAuth, editCategory);
router.post("/category", validateAuth, storeCategory);
router.post("/category/update/:id", validateAuth, updateCategory);
router.post("/category/delete/:id", validateAuth, deleteCategory);

export default router;