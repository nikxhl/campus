const pool = require("../db.js");

const createAttendanceTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS attendance (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      registration_id UUID UNIQUE REFERENCES registrations(id) ON DELETE CASCADE,
      check_in_time TIMESTAMP,
      check_out_time TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};

module.exports = { createAttendanceTable };
