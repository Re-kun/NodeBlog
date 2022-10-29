import express from "express";
import { indexPost, detailPost } from "../controllers/post.controller.js";
import { postCategory } from "../controllers/category.controller.js";
import { validateToken } from "../middleware/validateToken.js";

const router = express.Router();
router.get("/", validateToken, (req, res) => {
    res.render("index", {
        username: req.user.username
    });
});

router.get("/posts", validateToken, indexPost);
router.get("/post/:id", validateToken, detailPost);
router.get("/category/:slug", postCategory);
router.get("/user/:username");

export default router;