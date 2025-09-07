const pool = require("../db.js");

const getAllFeedback = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM feedback ORDER BY submitted_at DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const submitFeedback = async (req, res) => {
  const { registration_id, rating, comments } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO feedback (registration_id, rating, comments)
       VALUES ($1,$2,$3) RETURNING *`,
      [registration_id, rating, comments]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const submitEventFeedback = async (req, res) => {
  const { id: event_id } = req.params;
  const { user_id, rating, comments } = req.body; // In real app, get user_id from auth
  try {
    // Find registration
    const reg = await pool.query(
      "SELECT id FROM registrations WHERE event_id = $1 AND user_id = $2",
      [event_id, user_id]
    );
    if (reg.rows.length === 0) return res.status(404).json({ error: "Registration not found" });
    const registration_id = reg.rows[0].id;
    // Submit feedback
    const { rows } = await pool.query(
      "INSERT INTO feedback (registration_id, rating, comments) VALUES ($1, $2, $3) RETURNING *",
      [registration_id, rating, comments]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getEventFeedback = async (req, res) => {
  const { id: event_id } = req.params;
  try {
    const { rows } = await pool.query(
      `SELECT f.*, r.user_id, u.name FROM feedback f
       JOIN registrations r ON f.registration_id = r.id
       JOIN users u ON r.user_id = u.id
       WHERE r.event_id = $1 ORDER BY f.submitted_at DESC`,
      [event_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getAllFeedback, submitFeedback, submitEventFeedback, getEventFeedback };
