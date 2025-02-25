const Station = require("../models/Station");

// Add a new station
exports.addStation = async (req, res) => {
  try {
    const newStation = new Station(req.body);
    await newStation.save();
    res.status(201).json({ message: "Station added successfully", newStation });
  } catch (error) {
    res.status(500).json({ error: "Failed to add station", details: error.message });
  }
};

// Get all stations
exports.getStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stations", details: error.message });
  }
};

// Delete a station
exports.deleteStation = async (req, res) => {
  try {
    await Station.findByIdAndDelete(req.params.id);
    res.json({ message: "Station deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete station", details: error.message });
  }
};
