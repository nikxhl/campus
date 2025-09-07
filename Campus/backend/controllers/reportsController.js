const pool = require("../db.js");

const getEventPopularity = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT e.title, COUNT(r.id) as registrations
       FROM events e LEFT JOIN registrations r ON e.id = r.event_id
       GROUP BY e.id, e.title ORDER BY registrations DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getStudentParticipation = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT u.name, COUNT(r.id) as registrations
       FROM users u LEFT JOIN registrations r ON u.id = r.user_id
       GROUP BY u.id, u.name ORDER BY registrations DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getAttendanceSummary = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT e.title, COUNT(a.id) as attended, COUNT(r.id) as registered,
       ROUND(COUNT(a.id)::decimal / NULLIF(COUNT(r.id), 0) * 100, 2) as percentage
       FROM events e
       LEFT JOIN registrations r ON e.id = r.event_id
       LEFT JOIN attendance a ON r.id = a.registration_id
       GROUP BY e.id, e.title`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getFeedbackSummary = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT e.title, AVG(f.rating) as avg_rating, COUNT(f.id) as feedback_count
       FROM events e
       LEFT JOIN registrations r ON e.id = r.event_id
       LEFT JOIN feedback f ON r.id = f.registration_id
       GROUP BY e.id, e.title`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getTopStudents = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT u.name, COUNT(r.id) as registrations, COUNT(a.id) as attended
       FROM users u
       LEFT JOIN registrations r ON u.id = r.user_id
       LEFT JOIN attendance a ON r.id = a.registration_id
       GROUP BY u.id, u.name
       ORDER BY registrations DESC, attended DESC LIMIT 10`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getEventPopularity, getStudentParticipation, getAttendanceSummary, getFeedbackSummary, getTopStudents };
