import React, { useState } from 'react';
import WeatherForm from './components/WeatherForm';
import WeatherCard from './components/WeatherCard';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import News from './components/News';
import Footer from './components/Footer';
import FlightTracker from './components/FlightTracker';
import Currency from './components/Currency';
import './App.css';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'weather':
        return (
          <>
            <WeatherForm 
              setWeather={(data) => {
                setLoading(true);
                setTimeout(() => {
                  setWeather(data);
                  setLoading(false);
                }, 500);
              }} 
            />
            {loading ? (
              <div className="loading-text">
                <div className="loader"></div>
                <span>Loading weather data...</span>
              </div>
            ) : (
              weather && <WeatherCard weather={weather} />
            )}
          </>
        );
      case 'news':
        return <News />;
      case 'flights':
        return <FlightTracker />;
      case 'currency':
        return <Currency />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <>
      <video className="video-background" autoPlay loop muted playsInline>
        <source src="/weather-background.mp4" type="video/mp4" />
      </video>
      <div className="overlay"></div>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="main-container">
        {renderPage()}
      </div>
      <Footer setCurrentPage={setCurrentPage} />
    </>
  );
};

export default App;
