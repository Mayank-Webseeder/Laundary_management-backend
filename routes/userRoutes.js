const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Only Admin
router.get("/admin/dashboard", authMiddleware, roleMiddleware("Admin"), (req, res) => {
  res.json({ msg: "Welcome to Admin Dashboard", user: req.user });
});

// Customer + Admin
router.get("/customer/orders", authMiddleware, roleMiddleware("Customer", "Admin"), (req, res) => {
  res.json({ msg: "Customer orders here", user: req.user });
});

// Delivery + Admin
router.get("/delivery/tasks", authMiddleware, roleMiddleware("Delivery", "Admin"), (req, res) => {
  res.json({ msg: "Delivery tasks here", user: req.user });
});

module.exports = router;
