const pool = require("../db.js");

const createRegistrationsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS registrations (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      event_id UUID REFERENCES events(id) ON DELETE CASCADE,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      registration_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(20) CHECK (status IN ('registered','cancelled','waitlisted')) DEFAULT 'registered',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(event_id, user_id)
    );
  `;
  await pool.query(query);
};

module.exports = { createRegistrationsTable };
