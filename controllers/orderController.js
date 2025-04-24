const Order = require('../models/OrderSchema');  // Mongoose model for orders
const getNextOrderId = require('../utils/getNextOrderId');  // Import the order ID generator

// Create a new order
// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { address, cloths, pickupDate, pickupTime, coupon } = req.body;

    const orderId = await getNextOrderId();

    const order = new Order({
      orderId,
      address,
      cloths,
      pickupDate,
      pickupTime,
      coupon,
      status: 'pending',  // ⬅️ Set default status
    });

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    console.error("❌ Error creating order:", error);
    res.status(500).json({ message: "Error creating order", error });
  }
};
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Failed to fetch orders:", error);
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};
