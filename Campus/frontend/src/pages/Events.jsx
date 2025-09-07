import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Calendar, MapPin, Users } from 'lucide-react';
import api from '../services/api';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/events');
      setEvents(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch events');
      toast.error('Failed to load events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchEvents}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Events</h1>
              <p className="text-gray-600">Manage and view campus events</p>
            </div>
            <Link
              to="/events/create"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Create Event
            </Link>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {events.length === 0 ? (
          <div className="text-center py-12">
            <Calendar size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first event</p>
            <Link
              to="/events/create"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Create Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {event.title || 'Untitled Event'}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${event.status === 'active' ? 'bg-green-100 text-green-800' :
                        event.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                      }`}>
                      {event.status || 'upcoming'}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {event.description || 'No description available'}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={16} className="mr-2" />
                      {event.date ? format(new Date(event.date), 'PPP') : 'Date TBD'}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin size={16} className="mr-2" />
                      {event.location || 'Location TBD'}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users size={16} className="mr-2" />
                      {event.registrations_count || 0} registered
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/events/${event.id}`}
                      className="flex-1 bg-blue-600 text-white text-center py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/events/${event.id}/attendance`}
                      className="flex-1 bg-gray-100 text-gray-700 text-center py-2 px-3 rounded-md hover:bg-gray-200 transition-colors text-sm"
                    >
                      Attendance
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;