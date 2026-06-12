const express = require("express");
const router = express.Router();

const protectAdmin = require("../../middleware/authMiddleware");

const CategoryController = require("../../controller/category/categoryController");

router.post(
  "/create-category",
  protectAdmin,
  CategoryController.createCategory,
);

router.get(
  "/all-categories",
  protectAdmin,
  CategoryController.getAllCategories,
);

router.get("/category/:id", protectAdmin, CategoryController.getCategoryById);

router.put(
  "/update-category/:id",
  protectAdmin,
  CategoryController.updateCategory,
);

router.delete(
  "/delete-category/:id",
  protectAdmin,
  CategoryController.deleteCategory,
);

module.exports = router;
