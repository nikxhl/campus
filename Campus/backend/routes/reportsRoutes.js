const express = require("express");
const router = express.Router();
const { getEventPopularity, getStudentParticipation, getAttendanceSummary, getFeedbackSummary, getTopStudents } = require("../controllers/reportsController");

router.get("/event-popularity", getEventPopularity);
router.get("/student-participation", getStudentParticipation);
router.get("/attendance-summary", getAttendanceSummary);
router.get("/feedback-summary", getFeedbackSummary);
router.get("/top-students", getTopStudents);

module.exports = router;
