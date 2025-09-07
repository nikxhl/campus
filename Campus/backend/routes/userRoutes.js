const express = require("express");
const router = express.Router();
const { getAllUsers, createUser } = require("../controllers/userController");
const { getUserRegistrations } = require("../controllers/registrationController");

router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:user_id/registrations", getUserRegistrations);

module.exports = router;
