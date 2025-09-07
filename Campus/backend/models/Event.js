const pool = require("../db.js");

const createEventsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS events (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      college_id UUID REFERENCES colleges(id) ON DELETE CASCADE,
      title VARCHAR(150) NOT NULL,
      description TEXT,
      type VARCHAR(50) CHECK (type IN ('workshop','hackathon','seminar','fest','tech_talk')),
      venue VARCHAR(100),
      start_datetime TIMESTAMP NOT NULL,
      end_datetime TIMESTAMP NOT NULL,
      capacity INTEGER,
      registration_deadline TIMESTAMP,
      created_by UUID REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};

module.exports = { createEventsTable };
