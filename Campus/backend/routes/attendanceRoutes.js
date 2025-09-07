const express = require("express");
const router = express.Router();
const { getAllAttendance, markAttendance } = require("../controllers/attendanceController");

router.get("/", getAllAttendance);
router.post("/", markAttendance);

module.exports = router;
