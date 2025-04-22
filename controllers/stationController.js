

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const Station = require("../models/Station");
const User = require("../models/User");

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (email, password, name, stationName, address) => {
  try {
    console.log("this is", email, password, name, address, stationName);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome Aboard: Station Manager Account Created",
      text: `Dear ${name},


We are pleased to inform you that your station manager account has been successfully created.

Station Details:
- **Station Name:** ${stationName}
- **Address:** ${address}

Login Credentials:
- **Email:** ${email}
- **Password:** ${password}

For security reasons, we recommend changing your password upon your first login.

If you have any questions or need further assistance, please feel free to reach out.

Best regards, 
Laundry Management 
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


// Add a new station
exports.addStation = async (req, res) => {
  try {
    console.log(req.body);
    const { stationName, name, contactNo, email, password, address } = req.body;

    // Check if station with the same email exists
    const existingStation = await Station.findOne({ email });
    if (existingStation) {
      return res.status(400).json({ error: "A station with this email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user for station manager
    const newUser = new User({
      fullName: name,
      email,
      password: hashedPassword,
      role: "station-manager",
      isVerified: true,
    });

    await newUser.save();

    // Create new station entry
    const newStation = new Station({
      stationName,
      name,
      contactNo,
      email,
      password: hashedPassword,
      address,
    });

    await newStation.save();

    // Send email notification
    await sendEmail(email, password, name, stationName, address);

    res.status(201).json({ message: "Station added successfully", newStation });
  } catch (error) {
    res.status(500).json({ error: "Failed to add station", details: error.message });
  }
};

// Get all stations
exports.getStations = async (req, res) => {
  try {
    const stations = await Station.find({}, "-password"); // Exclude password from response
    res.json(stations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stations", details: error.message });
  }
};

// Update a station
exports.updateStation = async (req, res) => {
  try {
    const { stationName, name, contactNo, address } = req.body;

    const station = await Station.findById(req.params.id);
    if (!station) {
      return res.status(404).json({ error: "Station not found" });
    }

    // Update station details
    station.stationName = stationName || station.stationName;
    station.name = name || station.name;
    station.contactNo = contactNo || station.contactNo;
    station.address = address || station.address;

    await station.save();

    res.json({ message: "Station updated successfully", station });
  } catch (error) {
    res.status(500).json({ error: "Failed to update station", details: error.message });
  }
};

// Delete a station and associated user
exports.deleteStation = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) {
      return res.status(404).json({ error: "Station not found" });
    }

    // Find and delete the associated user
    await User.findOneAndDelete({ email: station.email });

    // Delete the station
    await Station.findByIdAndDelete(req.params.id);

    res.json({ message: "Station and associated manager account deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete station", details: error.message });
  }
};
