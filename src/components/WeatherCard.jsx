import React, { useState, useEffect } from 'react';
import { FiWind, FiDroplet, FiSunrise, FiSunset, FiThermometer, FiActivity, FiInfo } from 'react-icons/fi';
import { WiHumidity, WiBarometer } from 'react-icons/wi';
import axios from 'axios';

const WeatherCard = ({ weather }) => {
  const [placeInfo, setPlaceInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    name,
    sys: { country, sunrise, sunset },
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    weather: [details],
  } = weather;

  useEffect(() => {
    const fetchPlaceInfo = async () => {
      try {
        // Fetch Wikipedia description
        const wikiResponse = await axios.get(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${name}`
        );
        
        setPlaceInfo({
          description: wikiResponse.data.extract,
          thumbnail: wikiResponse.data.thumbnail?.source,
          images: wikiResponse.data.originalimage?.source ? [wikiResponse.data.originalimage.source] : []
        });
      } catch (error) {
        console.error('Error fetching place info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceInfo();
  }, [name]);

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="dh-weather-container">
      <div className="dh-weather-primary">
        <div className="dh-location-container">
          <h2 className="dh-location-title">{name}, {country}</h2>
          <div className="dh-weather-badge">
            <img 
              src={`https://openweathermap.org/img/wn/${details.icon}@2x.png`}
              alt={details.description}
              className="dh-weather-status-icon"
            />
            <span className="dh-weather-status">{details.description}</span>
          </div>
        </div>

        <div className="dh-temperature-showcase">
          <div className="dh-main-temp">
            <span className="dh-temp-digits">{Math.round(temp)}°</span>
            <div className="dh-temp-range-container">
              <div className="dh-temp-range-item">
                <FiThermometer className="dh-range-icon dh-icon-min" />
                <span>{Math.round(temp_min)}°</span>
              </div>
              <div className="dh-temp-range-item">
                <FiThermometer className="dh-range-icon dh-icon-max" />
                <span>{Math.round(temp_max)}°</span>
              </div>
            </div>
          </div>
          <div className="dh-feels-like">
            <FiActivity className="dh-feels-icon" />
            Feels like {Math.round(feels_like)}°
          </div>
        </div>
      </div>

      <div className="dh-weather-metrics">
        <div className="dh-metric-card">
          <FiWind className="dh-metric-icon" />
          <div className="dh-metric-content">
            <div className="dh-metric-value">{speed} m/s</div>
            <div className="dh-metric-label">Wind Speed</div>
          </div>
        </div>

        <div className="dh-metric-card">
          <WiHumidity className="dh-metric-icon" />
          <div className="dh-metric-content">
            <div className="dh-metric-value">{humidity}%</div>
            <div className="dh-metric-label">Humidity</div>
          </div>
        </div>

        <div className="dh-metric-card">
          <WiBarometer className="dh-metric-icon" />
          <div className="dh-metric-content">
            <div className="dh-metric-value">{pressure}</div>
            <div className="dh-metric-label">Pressure (hPa)</div>
          </div>
        </div>
      </div>

      <div className="dh-sun-timeline">
        <div className="dh-timeline-marker">
          <FiSunrise className="dh-sun-icon dh-sunrise" />
          <div className="dh-time-container">
            <span className="dh-time-value">{formatTime(sunrise)}</span>
            <span className="dh-time-label">Sunrise</span>
          </div>
        </div>
        <div className="dh-timeline-divider"></div>
        <div className="dh-timeline-marker">
          <FiSunset className="dh-sun-icon dh-sunset" />
          <div className="dh-time-container">
            <span className="dh-time-value">{formatTime(sunset)}</span>
            <span className="dh-time-label">Sunset</span>
          </div>
        </div>
      </div>

      <div className="dh-place-info">
        <div className="dh-place-header">
          <FiInfo className="dh-info-icon" />
          <h3>About {name}</h3>
        </div>
        
        {loading ? (
          <div className="dh-place-loading">
            <div className="dh-loading-spinner"></div>
            <span>Loading place information...</span>
          </div>
        ) : placeInfo ? (
          <>
            <div className="dh-place-content">
              {placeInfo.thumbnail && (
                <img 
                  src={placeInfo.thumbnail}
                  alt={name}
                  className="dh-place-thumbnail"
                />
              )}
              <p className="dh-place-description">{placeInfo.description}</p>
            </div>
            
            {placeInfo.images.length > 0 && (
              <div className="dh-place-gallery">
                {placeInfo.images.map((image, index) => (
                  <div key={index} className="dh-gallery-item">
                    <img 
                      src={image}
                      alt={`${name} - ${index + 1}`}
                      className="dh-place-image"
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="dh-place-error">
            Unable to load information about this location.
          </p>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
