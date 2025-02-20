const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendOTP = require("../utils/sendEmail");

const LaundryCategory = require("../models/LaundaryCategory");


exports.signup = async (req, res) => {
  const { fullname, email, password } = req.body;
 
  try {
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user = new User({ fullName: fullname, email, password: hashedPassword, otp, otpExpires: Date.now() + 10 * 60 * 1000 });

    await sendOTP(email, otp);
    await user.save();

    res.status(200).json({ msg: "OTP sent to your email. Please verify." });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  
  if (!email || !otp) {
    return res.status(400).json({ msg: "Email and OTP are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ msg: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    if (!user.isVerified) return res.status(400).json({ msg: "Email not verified" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ msg: "Login successful", token });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("fullName email");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ msg: "User not found" });
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect old password" });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).json({ msg: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};


// Create a new laundry category
exports.createCategory = async (req, res) => {
  try {
    const { category, items } = req.body;
    const newCategory = new LaundryCategory({ category, items });
    await newCategory.save();
    res.status(201).json({ message: "Category created successfully", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all laundry categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await LaundryCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = await LaundryCategory.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Category updated", category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await LaundryCategory.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
