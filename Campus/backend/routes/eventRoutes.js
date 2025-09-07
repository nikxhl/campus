const express = require("express");
const router = express.Router();
const { getAllEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/eventController");
const { registerForEvent, cancelRegistration } = require("../controllers/registrationController");
const { checkInEvent, getEventAttendance } = require("../controllers/attendanceController");
const { submitEventFeedback, getEventFeedback } = require("../controllers/feedbackController");

router.get("/", getAllEvents);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.post("/:id/register", registerForEvent);
router.delete("/:id/register", cancelRegistration);
router.post("/:id/checkin", checkInEvent);
router.get("/:id/attendance", getEventAttendance);
router.post("/:id/feedback", submitEventFeedback);
router.get("/:id/feedback", getEventFeedback);

module.exports = router;
