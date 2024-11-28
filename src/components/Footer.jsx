import React from 'react';
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';

const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="modern-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4 className="footer-title">DataHub</h4>
          <p className="footer-description">
            Empowering users with real-time global insights and comprehensive data analytics.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <div className="footer-links">
            <button onClick={() => setCurrentPage('weather')} className="footer-link">Weather</button>
            <button onClick={() => setCurrentPage('news')} className="footer-link">News</button>
            <a href="#privacy" className="footer-link">Privacy Policy</a>
            <a href="#terms" className="footer-link">Terms of Use</a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Connect</h4>
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FiGithub />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FiTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FiLinkedin />
            </a>
            <a href="mailto:contact@datahub.com" className="social-link">
              <FiMail />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 DataHub. Made with <FiHeart className="heart-icon" /> by Your Name</p>
      </div>
    </footer>
  );
};

export default Footer; 