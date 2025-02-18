// const express = require("express");
// const { signup, verifyOTP, login, getUserProfile, changePassword} = require("../controllers/authController");

// const router = express.Router();

// router.post("/signup", signup);
// router.post("/otp-verification", verifyOTP);
// router.post("/login", login);
// router.get("/user/profile", getUserProfile);
// router.post("/change-password", changePassword);

// module.exports = router;

const express = require("express");
const { signup, verifyOTP, login, getUserProfile, changePassword } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware to verify JWT token

const router = express.Router();

router.post("/signup", signup);
router.post("/otp-verification", verifyOTP);
router.post("/login", login);
router.get("/user/profile", authMiddleware, getUserProfile); // Protected route
router.post("/change-password", authMiddleware, changePassword); // Use PATCH for updates

module.exports = router;