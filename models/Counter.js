const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true },  // e.g., 'order_id'
  sequence_value: { type: Number, required: true },
});

const Counter = mongoose.model("Counter", counterSchema);

module.exports = Counter;
