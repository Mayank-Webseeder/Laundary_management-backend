const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  otp: { type: String },
  otpExpires: { type: Date },
  isVerified: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ["Customer", "Delivery", "Admin"],
    default: "Customer",
    required: true
  }
});

module.exports = mongoose.model("User", userSchema);
