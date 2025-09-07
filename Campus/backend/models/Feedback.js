const pool = require("../db.js");

const createFeedbackTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS feedback (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      registration_id UUID UNIQUE REFERENCES registrations(id) ON DELETE CASCADE,
      rating INTEGER CHECK (rating >= 1 AND rating <= 5),
      comments TEXT,
      submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};

module.exports = { createFeedbackTable };
