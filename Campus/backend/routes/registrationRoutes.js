const express = require("express");
const router = express.Router();
const { getAllRegistrations, createRegistration } = require("../controllers/registrationController");

router.get("/", getAllRegistrations);
router.post("/", createRegistration);

module.exports = router;
