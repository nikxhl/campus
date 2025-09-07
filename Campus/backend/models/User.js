const pool = require("../db.js");

const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      college_id UUID REFERENCES colleges(id) ON DELETE CASCADE,
      email VARCHAR(100) UNIQUE NOT NULL,
      name VARCHAR(100) NOT NULL,
      role VARCHAR(20) CHECK (role IN ('student','admin')) NOT NULL,
      student_id VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};

module.exports = { createUsersTable };
