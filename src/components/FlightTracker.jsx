import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlaneDeparture, FaInfoCircle, FaClock, FaSearch, FaTimes } from 'react-icons/fa';

function FlightTracker() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Replace with your AviationStack API key
  const AVIATION_API_KEY = '5c2f50728cca25bf64c7794182d14a8d';

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'http://api.aviationstack.com/v1/flights',
          {
            params: {
              access_key: AVIATION_API_KEY,
              limit: 100,
              flight_status: 'active'
            }
          }
        );

        if (response.data && response.data.data) {
          const formattedFlights = response.data.data
            .filter(flight => flight.flight_status === 'active')
            .map(flight => ({
              icao24: flight.aircraft?.icao24_registration || 'N/A',
              callsign: flight.flight?.iata || flight.flight?.icao || 'N/A',
              airline: flight.airline?.name || 'N/A',
              departure: {
                airport: flight.departure?.airport || 'N/A',
                iata: flight.departure?.iata || 'N/A',
                scheduled: flight.departure?.scheduled || 'N/A',
                actual: flight.departure?.actual || 'N/A'
              },
              arrival: {
                airport: flight.arrival?.airport || 'N/A',
                iata: flight.arrival?.iata || 'N/A',
                scheduled: flight.arrival?.scheduled || 'N/A',
                estimated: flight.arrival?.estimated || 'N/A'
              },
              status: flight.flight_status,
              timestamp: new Date().toLocaleString()
            }));

          setFlights(formattedFlights);
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching flight data:', error);
        setError('Failed to fetch flight data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    // Fetch initial data
    fetchFlights();

    // Update every minute (adjust based on your API plan limits)
    const interval = setInterval(fetchFlights, 60000);

    return () => clearInterval(interval);
  }, []);

  // Function to format time
  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    return new Date(timeString).toLocaleTimeString();
  };

  // Filter flights based on search query
  const filteredFlights = flights.filter(flight => {
    const searchLower = searchQuery.toLowerCase();
    return (
      flight.airline.toLowerCase().includes(searchLower) ||
      flight.callsign.toLowerCase().includes(searchLower) ||
      flight.departure.airport.toLowerCase().includes(searchLower) ||
      flight.departure.iata.toLowerCase().includes(searchLower) ||
      flight.arrival.airport.toLowerCase().includes(searchLower) ||
      flight.arrival.iata.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="flight-tracker-container">
        <div className="loading-state">
          <div className="loader"></div>
          <p>Loading flight data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flight-tracker-container">
        <div className="error-state">
          <FaInfoCircle className="error-icon" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flight-tracker-container">
      <div className="flight-tracker-header">
        <h1>
          <FaPlaneDeparture className="header-icon" />
          Global Flight Tracker
        </h1>
        <p>Track real-time flight positions across the globe</p>
      </div>

      <div className="search-container">
        <div className={`search-wrapper ${isFocused ? 'focused' : ''}`}>
          <FaSearch className="search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search by airline, flight number, or airport..."
            className="search-input"
          />
          {searchQuery && (
            <button
              className="clear-button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      <div className="flight-stats">
        <div className="stat-card">
          <FaPlaneDeparture className="stat-icon" />
          <div className="stat-content">
            <span className="stat-value">{filteredFlights.length}</span>
            <span className="stat-label">Active Flights</span>
          </div>
        </div>
      </div>

      <div className="flights-grid">
        {filteredFlights.length > 0 ? (
          filteredFlights.map(flight => (
            <div key={flight.icao24} className="flight-card">
              <div className="flight-card-header">
                <FaPlaneDeparture className="flight-icon" />
                <h3>{flight.callsign}</h3>
                <span className={`status-badge status-${flight.status}`}>
                  {flight.status}
                </span>
              </div>
              
              <div className="flight-details">
                <div className="info-row">
                  <FaInfoCircle className="info-icon" />
                  <span>Airline: {flight.airline}</span>
                </div>
                
                <div className="route-info">
                  <div className="departure-info">
                    <h4>Departure</h4>
                    <p>{flight.departure.airport} ({flight.departure.iata})</p>
                    <p>Scheduled: {formatTime(flight.departure.scheduled)}</p>
                    <p>Actual: {formatTime(flight.departure.actual)}</p>
                  </div>
                  
                  <div className="arrival-info">
                    <h4>Arrival</h4>
                    <p>{flight.arrival.airport} ({flight.arrival.iata})</p>
                    <p>Scheduled: {formatTime(flight.arrival.scheduled)}</p>
                    <p>Estimated: {formatTime(flight.arrival.estimated)}</p>
                  </div>
                </div>

                <div className="info-row">
                  <FaClock className="info-icon" />
                  <span>Last Updated: {flight.timestamp}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <FaInfoCircle className="no-results-icon" />
            <p>No flights found matching your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlightTracker; 