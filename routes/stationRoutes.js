const express = require("express");
const { addStation, getStations, deleteStation , updateStation} = require("../controllers/stationController");

const router = express.Router();

router.post("/", addStation);
router.get("/", getStations);
router.delete("/:id", deleteStation);
router.put("/:id", updateStation);



module.exports = router;
