const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  items: [
    {
      category: String,
      subCategory: String,
      quantity: Number,
      price: Number,
      total: Number,
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now },
  remarks: String,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
