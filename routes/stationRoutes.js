const express = require("express");
const { addStation, getStations, deleteStation } = require("../controllers/stationController");

const router = express.Router();

router.post("/", addStation);
router.get("/", getStations);
router.delete("/:id", deleteStation);

module.exports = router;
