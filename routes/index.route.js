import express from "express";
import { indexPost, detailPost, searchPost } from "../controllers/post.controller.js";
import { postCategory } from "../controllers/category.controller.js";
import { postUser } from "../controllers/user.controller.js";
import { validateAuth } from "../middleware/validateAuth.js";
const router = express.Router();
router.get("/", validateAuth, (req, res) => {
    res.render("index", {
        username: req.user.username
    });
});

router.get("/posts", validateAuth, indexPost);
router.get("/post/:id", validateAuth, detailPost);
router.get("/posts/search", validateAuth, searchPost);
router.get("/category/:slug", validateAuth, postCategory);
router.get("/user/:username", validateAuth, postUser);

export default router;