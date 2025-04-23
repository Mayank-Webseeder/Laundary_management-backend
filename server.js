
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const laundryRoutes = require("./routes/laundaryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const stationRoutes = require("./routes/stationRoutes");
const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/laundry", laundryRoutes);
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/stations", stationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
