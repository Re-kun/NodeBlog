import express from "express";
import { indexPost, detailPost } from "../controllers/post.controller.js"
import { validateToken } from "../middleware/validateToken.js";

const router = express.Router();
router.get("/", validateToken, (req, res) => {
    res.render("index");
});

router.get("/posts", validateToken, indexPost);
router.get("/post/:id", validateToken, detailPost);

export default router;