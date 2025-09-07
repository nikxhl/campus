const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

async function seed() {
  try {
    // 1. Colleges
    const { rows: colleges } = await pool.query(`
      INSERT INTO colleges (name, code, address)
      VALUES 
        ('College A', 'CA123', 'Address A'),
        ('College B', 'CB456', 'Address B')
      RETURNING *;
    `);

    // 2. Users
    const { rows: users } = await pool.query(`
      INSERT INTO users (college_id, email, name, role, student_id)
      VALUES
        ('${colleges[0].id}', 'student1@colA.com', 'Student One', 'student', 'S101'),
        ('${colleges[0].id}', 'student2@colA.com', 'Student Two', 'student', 'S102'),
        ('${colleges[1].id}', 'student3@colB.com', 'Student Three', 'student', 'S201'),
        ('${colleges[1].id}', 'student4@colB.com', 'Student Four', 'student', 'S202')
      RETURNING *;
    `);

    // 3. Events
    const { rows: events } = await pool.query(`
      INSERT INTO events (college_id, title, description, type, venue, start_datetime, end_datetime, capacity, registration_deadline, created_by)
      VALUES
        ('${colleges[0].id}', 'Hackathon 1', '24h coding', 'hackathon', 'Lab 101', '2025-09-10 10:00', '2025-09-10 22:00', 10, '2025-09-09 10:00', '${users[0].id}'),
        ('${colleges[0].id}', 'Workshop AI', 'AI basics', 'workshop', 'Lab 102', '2025-09-11 10:00', '2025-09-11 12:00', 10, '2025-09-10 10:00', '${users[0].id}')
      RETURNING *;
    `);

    // 4. Registrations
    const { rows: registrations } = await pool.query(`
      INSERT INTO registrations (event_id, user_id, status)
      VALUES
        ('${events[0].id}', '${users[0].id}', 'registered'),
        ('${events[0].id}', '${users[1].id}', 'registered'),
        ('${events[1].id}', '${users[1].id}', 'registered')
      RETURNING *;
    `);

    // 5. Attendance
    await pool.query(`
      INSERT INTO attendance (registration_id, check_in_time)
      VALUES
        ('${registrations[0].id}', NOW()),
        ('${registrations[1].id}', NOW());
    `);

    // 6. Feedback
    await pool.query(`
      INSERT INTO feedback (registration_id, rating, comments)
      VALUES
        ('${registrations[0].id}', 5, 'Awesome event!'),
        ('${registrations[1].id}', 4, 'Good experience.');
    `);

    console.log("✅ Sample data inserted successfully!");
  } catch (err) {
    console.error("❌ Error seeding data:", err);
  } finally {
    pool.end();
  }
}

seed();
