const express = require("express");
const {
  signup,
  verifyOTP,
  login,
  getUserProfile,
  changePassword,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Public Auth Routes
router.post("/signup", signup);
router.post("/otp-verification", verifyOTP);
router.post("/login", login);

// Protected Routes
router.get("/user/profile", authMiddleware, getUserProfile);
router.post("/change-password", authMiddleware, changePassword);

// Role-Based Access Routes
router.get(
  "/admin/data",
  authMiddleware,
  roleMiddleware("Admin"),
  (req, res) => {
    res.json({
      msg: "Welcome Admin, here is your data.",
      user: req.user,
    });
  }
);

router.get(
  "/customer/data",
  authMiddleware,
  roleMiddleware("Customer", "Admin"),
  (req, res) => {
    res.json({
      msg: "Welcome Customer (or Admin), here is your data.",
      user: req.user,
    });
  }
);

router.get(
  "/delivery/data",
  authMiddleware,
  roleMiddleware("Delivery", "Admin"),
  (req, res) => {
    res.json({
      msg: "Welcome Delivery (or Admin), here is your data.",
      user: req.user,
    });
  }
);

module.exports = router;
