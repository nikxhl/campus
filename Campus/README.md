Campus Event Management Platform

(This is my full-stack project built to manage college events. The idea is simple:
Admins can create events → Students register → Attendance is tracked → Feedback is collected → Reports are generated.)

(As of my understanding, It’s meant to solve a real problem I’ve seen in college events — most of them are managed using Excel sheets or WhatsApp groups, which is messy and not scalable.)

Features (Only Current)

--Admin Side

Create, update, and delete events

Basic reporting API for event stats

--Student Side

Browse events

Register for events (backend done, UI still in progress)

Attendance + Feedback APIs are ready, frontend pages are stubs

--Tech Stack

(For Backend): Node.js, Express.js, PostgreSQL

(For Frontend): React + Vite + Tailwind CSS

(For Database): PostgreSQL with UUIDs + relationships

--Auth (planned): JWT (access + refresh tokens)(not yet implemented due to time constraints)

--Project Structure
(The project structure is provided in assignment folder)

--Setup & Run Instructions
1. Clone the repo
git clone https://github.com/<your-username>/campus-event-platform.git
cd campus-event-platform

2. Backend Setup
cd backend
npm install
npm run dev

3. Database Setup
psql -U <username> -d <database> -f schema.sql
node seed.js   # optional test data but recc

4. Frontend Setup
cd frontend
npm install
npm run dev

--Current Status

Backend API: Complete (events, registrations, attendance, feedback, reports)

Database schema: Working with relationships & constraints

Frontend: Event creation + listing done, other pages stubbed

Testing: Only manual + API tested through terminal/Postman

Security: Basic (CORS, SQL injection protection), missing login system

--Next Steps

Finish EventDetails page (registration flow)

Build Attendance UI (QR/manual check-in)

Add Feedback form on frontend

Implement JWT authentication for role-based access

Reporting dashboard with charts

--Observations I Did

Database design feels strong and flexible; easy to add features later.

Frontend is minimal right now — intentionally focused on getting backend solid first.

Security/authentication is the biggest missing piece before production.

Learned a lot about PostgreSQL relationships (especially with registrations linking events + students).

--Screenshots and documents are provided in assignment folder
