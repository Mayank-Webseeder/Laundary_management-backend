const Order = require("../models/OrderSchema");
const getNextOrderId = require("../utils/getNextOrderId");

exports.createOrder = async (req, res) => {
  try {
    console.log(req.body);
    const orderId = await getNextOrderId();
    console.log("orderID IS", orderId);
    const newOrder = new Order({ orderId, ...req.body });
    console.log(newOrder);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error });
  }
};



exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};
