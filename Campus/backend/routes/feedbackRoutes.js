const express = require("express");
const router = express.Router();
const { getAllFeedback, submitFeedback } = require("../controllers/feedbackController");

router.get("/", getAllFeedback);
router.post("/", submitFeedback);

module.exports = router;
