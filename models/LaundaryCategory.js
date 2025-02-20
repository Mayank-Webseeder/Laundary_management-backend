const mongoose = require("mongoose");

const laundryCategorySchema = new mongoose.Schema({
  category: { 
    type: String, 
    required: true 
  },
  items: [
    {
      name: { 
        type: String, 
        required: true 
    },
      price: { 
        type: String, 
        required: true 
    }, 
    },
  ],
});

module.exports = mongoose.model("LaundryCategory", laundryCategorySchema);