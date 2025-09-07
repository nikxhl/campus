import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import EventForm from './pages/EventForm';
import Attendance from './pages/Attendance';
import Feedback from './pages/Feedback';
import Reports from './pages/Reports';
import Users from './pages/Users';
import Colleges from './pages/Colleges';
import MyRegistrations from './pages/MyRegistrations';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/create" element={<EventForm />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/:id/attendance" element={<Attendance />} />
          <Route path="/events/:id/feedback" element={<Feedback />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/users" element={<Users />} />
          <Route path="/colleges" element={<Colleges />} />
          <Route path="/my-registrations" element={<MyRegistrations />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;