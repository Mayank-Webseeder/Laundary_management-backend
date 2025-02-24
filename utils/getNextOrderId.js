const Counter = require("../models/Counter");

async function getNextOrderId() {
  const counter = await Counter.findOneAndUpdate(
    { name: "order_id" },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  if(!counter){
    console.log("no counter");
  }
  console.log("counter is",counter);

  const orderId = `LM${counter.sequence_value.toString().padStart(4, "0")}`;
  return orderId;
}

module.exports = getNextOrderId