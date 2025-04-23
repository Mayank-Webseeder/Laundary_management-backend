const mongoose = require('mongoose');

const ClothSchema = new mongoose.Schema({
  id: Number,
  name: String,
  pieces: Number,
  totalPrice: Number,
  type: String,
  weight: String,
});

// If you want a custom orderId, don't manually assign it if it isn't needed.
const OrderSchema = new mongoose.Schema({
  address: String,
  cloths: [ClothSchema],
  coupon: { type: String, default: null },
  pickupDate: String,
  pickupTime: String,
  orderId: { type: String, unique: true, required: true, default: () => 'order-' + new Date().getTime() },  // Auto-generate orderId if needed
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
