import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="h-8 w-8" />
            <span className="text-xl font-bold">Campus Events</span>
          </Link>

          <nav className="hidden md:flex space-x-6">
            <Link to="/events" className="hover:text-blue-200 transition">Events</Link>
            <Link to="/my-registrations" className="hover:text-blue-200 transition">My Registrations</Link>
            <Link to="/reports" className="hover:text-blue-200 transition">Reports</Link>
            <Link to="/colleges" className="hover:text-blue-200 transition">Colleges</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
