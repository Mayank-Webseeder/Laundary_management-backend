const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
  stationName: { type: String, required: true },
  name: { type: String, required: true },
  contactNo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
});

const Station = mongoose.model("Station", stationSchema);
module.exports = Station;
