const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware"); // Middleware for role-based access control

// Customer can create an order, but only view their own orders.
router.post("/create-order", orderController.createOrder);
router.get("/orders", orderController.getOrders); // Customer can view their orders

// Admin and Delivery can access all orders
router.get("/admin/orders", authMiddleware, roleMiddleware("Admin"), orderController.getOrders); // Admins can view all orders
router.get("/delivery/orders", authMiddleware, roleMiddleware("Delivery", "Admin"), orderController.getOrders); // Delivery and Admin can view all orders

module.exports = router;
