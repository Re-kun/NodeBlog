import express  from "express";
import { index, detailPost, createPost, storePost, deletePost, editPost, updatePost, dashboardPost } from "../controllers/post.controller.js"
const router = express.Router();

router.get("/posts", index);
router.get("/post/create", createPost);
router.get("/post/:id", detailPost);
router.get("/dashboard/post", dashboardPost);
router.get("/post/edit/:id", editPost);
router.post("/post", storePost);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

export default router;