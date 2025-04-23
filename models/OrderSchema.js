const mongoose = require('mongoose');

const ClothSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    min: 1, // Since you're using Date.now(), this will always be positive
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  weight: {
    type: String,
    required: false,
    match: /^[0-9]+$/, // Accepts numbers like "1", "5" etc.
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  pieces: {
    type: Number,
    required: true,
    min: 1,
  },
});


const OrderSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 300,
  },
  cloths: {
    type: [ClothSchema],
    required: true,
    validate: [arrayLimit, '{PATH} must have at least one cloth item.'],
  },
  coupon: {
    type: String,
    default: null,
    trim: true,
  },
  pickupDate: {
    type: String,
    required: true,
    // Accepts formats like "Thu Apr 24 2025"
    match: /^[A-Z][a-z]{2} [A-Z][a-z]{2} \d{1,2} \d{4}$/,
  },
  pickupTime: {
    type: String,
    required: true,
    // Accepts "5:36 pm" or "5:36 pm" with narrow no-break space
    match: /^[0-9]{1,2}:[0-9]{2}( | )?(am|pm)$/i,
  },
}, {
  timestamps: true,
});

// Custom validator for cloths array
function arrayLimit(val) {
  return val.length > 0;
}

module.exports = mongoose.model('Order', OrderSchema);
