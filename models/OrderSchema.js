const mongoose = require('mongoose');

const ClothSchema = new mongoose.Schema({
  id: Number,
  name: String,
  pieces: Number,
  totalPrice: Number,
  type: String,
  weight: String,
});

// Available status values: pending → picked → washed → delivered → cancelled
const OrderSchema = new mongoose.Schema({
  address: String,
  cloths: [ClothSchema],
  coupon: { type: String, default: null },
  pickupDate: String,
  pickupTime: String,
  orderId: {
    type: String,
    unique: true,
    required: true,
    default: () => 'order-' + new Date().getTime(),
  },
  status: {
    type: String,
    enum: ['pending', 'picked', 'washed', 'delivered', 'cancelled'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
