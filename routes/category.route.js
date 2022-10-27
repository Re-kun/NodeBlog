import express from "express";
import { index, createCategory, storeCategory, editCategory, updateCategory, deleteCategory } from "../controllers/category.controller.js";

const router = express.Router();
router.get("/dashboard/category", index);
router.get("/category/create", createCategory);
router.post("/category", storeCategory);
router.get("/category/edit/:id", editCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

export default router;