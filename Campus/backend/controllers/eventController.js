const pool = require("../db.js");

const getAllEvents = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM events ORDER BY start_datetime");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const createEvent = async (req, res) => {
  const {
    college_id,
    title,
    description,
    type,
    venue,
    start_datetime,
    end_datetime,
    capacity,
    registration_deadline,
    created_by,
  } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO events
       (college_id, title, description, type, venue, start_datetime, end_datetime, capacity, registration_deadline, created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [college_id, title, description, type, venue, start_datetime, end_datetime, capacity, registration_deadline, created_by]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    type,
    venue,
    start_datetime,
    end_datetime,
    capacity,
    registration_deadline,
  } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE events SET
       title = $1, description = $2, type = $3, venue = $4,
       start_datetime = $5, end_datetime = $6, capacity = $7, registration_deadline = $8
       WHERE id = $9 RETURNING *`,
      [title, description, type, venue, start_datetime, end_datetime, capacity, registration_deadline, id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Event not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query("DELETE FROM events WHERE id = $1", [id]);
    if (rowCount === 0) return res.status(404).json({ error: "Event not found" });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getAllEvents, createEvent, updateEvent, deleteEvent };
