import express from "express";
import { index, detailPost } from "../controllers/post.controller.js"

const router = express.Router();
router.get("/", (req, res) => {
    res.render("index");
});

router.get("/posts", index);
router.get("/post/:id", detailPost);

export default router;