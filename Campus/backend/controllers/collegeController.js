const pool = require("../db.js");

const getAllColleges = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM colleges ORDER BY name");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const createCollege = async (req, res) => {
  const { name, code, address } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO colleges (name, code, address) VALUES ($1, $2, $3) RETURNING *",
      [name, code, address]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getAllColleges, createCollege };
