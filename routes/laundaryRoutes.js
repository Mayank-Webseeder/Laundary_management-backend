const express = require("express");
const router = express.Router();
const laundryController = require("../controllers/authController");

router.post("/categories", laundryController.createCategory);
router.get("/categories", laundryController.getCategories);
router.put("/categories/:id", laundryController.updateCategory);
router.delete("/categories/:id", laundryController.deleteCategory);

module.exports = router;