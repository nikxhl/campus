const { createCollegesTable } = require("./College.js");
const { createUsersTable } = require("./User.js");
const { createEventsTable } = require("./Event.js");
const { createRegistrationsTable } = require("./Registration.js");
const { createAttendanceTable } = require("./Attendance.js");
const { createFeedbackTable } = require("./Feedback.js");

const initModels = async () => {
  await createCollegesTable();
  await createUsersTable();
  await createEventsTable();
  await createRegistrationsTable();
  await createAttendanceTable();
  await createFeedbackTable();
  console.log("✅ All tables created/verified successfully");
};

module.exports = { initModels };
