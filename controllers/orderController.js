const Order = require('../models/OrderSchema');  // Mongoose model for orders
const getNextOrderId = require('../utils/getNextOrderId');  // Import the order ID generator

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { address, cloths, pickupDate, pickupTime, coupon } = req.body;

    // Generate a unique order ID
    const orderId = await getNextOrderId();

    // Create new order with generated orderId
    const order = new Order({
      orderId,         // <- Custom ID field
      address,
      cloths,
      pickupDate,
      pickupTime,
      coupon,
    });

    await order.save();  // Save to database

    res.status(201).json(order);  // Respond with the created order
  } catch (error) {
    console.error("❌ Error creating order:", error);
    res.status(500).json({ message: "Error creating order", error });
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Failed to fetch orders:", error);
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};
