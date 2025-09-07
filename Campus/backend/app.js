const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { initModels } = require("./models/initModels.js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (_req, res) => res.send("Backend running 🚀"));

// Import routes
const collegeRoutes = require("./routes/collegeRoutes");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const reportsRoutes = require("./routes/reportsRoutes");

// Hook up routes
app.use("/api/colleges", collegeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/reports", reportsRoutes);

// Start server + init tables
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await initModels();
    console.log(`🔥 Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error('Error during startup:', err);
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
