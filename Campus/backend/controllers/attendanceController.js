const pool = require("../db.js");

const getAllAttendance = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM attendance ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const markAttendance = async (req, res) => {
  const { registration_id, check_in_time, check_out_time } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO attendance (registration_id, check_in_time, check_out_time)
       VALUES ($1,$2,$3) RETURNING *`,
      [registration_id, check_in_time, check_out_time]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const checkInEvent = async (req, res) => {
  const { id: event_id } = req.params;
  const { user_id } = req.body; // In real app, get from auth
  try {
    // Find registration
    const reg = await pool.query(
      "SELECT id FROM registrations WHERE event_id = $1 AND user_id = $2",
      [event_id, user_id]
    );
    if (reg.rows.length === 0) return res.status(404).json({ error: "Registration not found" });
    const registration_id = reg.rows[0].id;
    // Mark attendance
    const { rows } = await pool.query(
      "INSERT INTO attendance (registration_id, check_in_time) VALUES ($1, NOW()) RETURNING *",
      [registration_id]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getEventAttendance = async (req, res) => {
  const { id: event_id } = req.params;
  try {
    const { rows } = await pool.query(
      `SELECT a.*, r.user_id, u.name FROM attendance a
       JOIN registrations r ON a.registration_id = r.id
       JOIN users u ON r.user_id = u.id
       WHERE r.event_id = $1 ORDER BY a.check_in_time`,
      [event_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getAllAttendance, markAttendance, checkInEvent, getEventAttendance };
