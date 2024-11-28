import React from 'react';

const Navbar = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => setCurrentPage('home')}>
        DataHub
      </div>
      <div className="nav-links">
        <button 
          className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentPage('home')}
        >
          Home
        </button>
        <button 
          className={`nav-link ${currentPage === 'weather' ? 'active' : ''}`}
          onClick={() => setCurrentPage('weather')}
        >
          Weather Explorer
        </button>
        <button 
          className={`nav-link ${currentPage === 'news' ? 'active' : ''}`}
          onClick={() => setCurrentPage('news')}
        >
          News Explorer
        </button>
        <button 
          className={`nav-link ${currentPage === 'flights' ? 'active' : ''}`}
          onClick={() => setCurrentPage('flights')}
        >
          Flight Tracker
        </button>
        <button 
          className={`nav-link ${currentPage === 'currency' ? 'active' : ''}`}
          onClick={() => setCurrentPage('currency')}
        >
          Currency Converter
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 