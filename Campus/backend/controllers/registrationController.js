const pool = require("../db.js");

const getAllRegistrations = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM registrations ORDER BY registration_time DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const createRegistration = async (req, res) => {
  const { event_id, user_id, status } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO registrations (event_id, user_id, status)
       VALUES ($1,$2,$3) RETURNING *`,
      [event_id, user_id, status || "registered"]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const registerForEvent = async (req, res) => {
  const { id: event_id } = req.params;
  const { user_id } = req.body; // In real app, get from auth
  try {
    const { rows } = await pool.query(
      `INSERT INTO registrations (event_id, user_id) VALUES ($1, $2) RETURNING *`,
      [event_id, user_id]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const cancelRegistration = async (req, res) => {
  const { id: event_id } = req.params;
  const { user_id } = req.body; // In real app, get from auth
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM registrations WHERE event_id = $1 AND user_id = $2",
      [event_id, user_id]
    );
    if (rowCount === 0) return res.status(404).json({ error: "Registration not found" });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getUserRegistrations = async (req, res) => {
  const { user_id } = req.params; // Placeholder, use auth in real app
  try {
    const { rows } = await pool.query(
      "SELECT * FROM registrations WHERE user_id = $1 ORDER BY registration_time DESC",
      [user_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getAllRegistrations, createRegistration, registerForEvent, cancelRegistration, getUserRegistrations };
