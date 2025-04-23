const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware"); // Middleware for role-based access control

// Customer can create an order, but only view their own orders.
router.post("/create-order", orderController.createOrder);
router.get("/orders", orderController.getOrders);  // Customer can view their orders

// Admin can view all orders
router.get("/admin/orders", authMiddleware, orderController.getOrders);

// Delivery and Admin can view all orders
router.get("/delivery/orders", authMiddleware, orderController.getOrders);

module.exports = router;
