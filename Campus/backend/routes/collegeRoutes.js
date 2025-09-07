const express = require("express");
const router = express.Router();
const { getAllColleges, createCollege } = require("../controllers/collegeController");

router.get("/", getAllColleges);
router.post("/", createCollege);

module.exports = router;
