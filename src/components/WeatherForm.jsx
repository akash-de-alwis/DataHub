import React, { useState } from 'react';
import axios from 'axios';
import { FiSearch, FiX, FiMapPin, FiTrendingUp, FiSun, FiCloud, FiUmbrella, FiWind } from 'react-icons/fi'; // Install react-icons if not already installed

const WeatherForm = ({ setWeather }) => {
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const popularCities = [
    { 
      name: 'London',
      icon: <FiCloud className="city-weather-icon" />,
      color: '#3B82F6',
      temp: '13°C'
    },
    { 
      name: 'Tokyo',
      icon: <FiSun className="city-weather-icon" />,
      color: '#F59E0B',
      temp: '23°C'
    },
    { 
      name: 'New York',
      icon: <FiWind className="city-weather-icon" />,
      color: '#10B981',
      temp: '18°C'
    },
    { 
      name: 'Paris',
      icon: <FiCloud className="city-weather-icon" />,
      color: '#8B5CF6',
      temp: '15°C'
    },
    { 
      name: 'Dubai',
      icon: <FiSun className="city-weather-icon" />,
      color: '#EF4444',
      temp: '35°C'
    },
    { 
      name: 'Singapore',
      icon: <FiUmbrella className="city-weather-icon" />,
      color: '#EC4899',
      temp: '28°C'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) {
      const notification = document.createElement('div');
      notification.className = 'error-notification';
      notification.textContent = 'Please enter a location';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
      return;
    }

    setIsLoading(true);
    const API_KEY = 'f182b2ecf640a88ad67431a1d205275e';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${API_KEY}`;

    try {
      const response = await axios.get(URL);
      setWeather(response.data);
      setLocation('');
    } catch (error) {
      const notification = document.createElement('div');
      notification.className = 'error-notification';
      notification.textContent = 'Location not found. Please try again!';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h2>
          <FiMapPin className="header-icon" />
          Global Weather Explorer
        </h2>
        <p>Discover real-time weather insights for any location worldwide</p>
      </div>
      
      <form onSubmit={handleSubmit} className="search-form">
        <div className={`input-wrapper ${isFocused ? 'focused' : ''}`}>
          <FiSearch className="search-icon" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter city or country name..."
            className="search-input"
          />
          {location && (
            <button
              type="button"
              className="clear-button"
              onClick={() => setLocation('')}
              aria-label="Clear search"
            >
              <FiX />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="search-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="loader-container">
              <span className="loading-spinner"></span>
              <span>Searching...</span>
            </div>
          ) : (
            <>
              <span>Explore</span>
              <FiTrendingUp className="button-icon" />
            </>
          )}
        </button>
      </form>

      <div className="popular-searches">
        <div className="popular-label">
          <FiTrendingUp className="trending-icon" />
          <span>Trending Locations</span>
        </div>
        <div className="popular-cities">
          {popularCities.map(city => (
            <button
              key={city.name}
              onClick={() => setLocation(city.name)}
              className="popular-city"
              style={{ '--city-color': city.color }}
            >
              <div className="city-info">
                <span className="city-name">{city.name}</span>
                <span className="city-temp">{city.temp}</span>
              </div>
              <div className="city-icon-wrapper">
                {city.icon}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherForm;
