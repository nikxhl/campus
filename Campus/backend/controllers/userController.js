const pool = require("../db.js");

const getAllUsers = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users ORDER BY name");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const createUser = async (req, res) => {
  const { college_id, email, name, role, student_id } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO users (college_id, email, name, role, student_id) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [college_id, email, name, role, student_id]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getAllUsers, createUser };
