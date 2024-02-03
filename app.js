const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const caseRoutes = require("./routes/caseRoutes");
const criminalRoutes = require("./routes/criminalRoutes.js");
const evidenceRoutes = require("./routes/evidenceRoutes.js");
const timeoutMiddleware = require("./Middleware/timeout");

const app = express();

// Middleware
app.use(express.json());
app.use(timeoutMiddleware);
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", caseRoutes);
app.use("/api", criminalRoutes);
app.use("/api", evidenceRoutes);

app.get("/", (req, res) => {
  res.send("API working");
});

// Connect to MongoDB

mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
