import React from 'react';
import { 
  FiGlobe, 
  FiZap, 
  FiPieChart, 
  FiTarget,
  FiArrowRight,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiMail,
  FiHeart 
} from 'react-icons/fi';

const HomePage = ({ setCurrentPage }) => (
  <div className="home-container">
    <h1 className="home-title">
      DataHub
    </h1>
    <p className="home-description">
      The whole world in your hand
    </p>
    <div className="features-grid">
      <FeatureCard 
        icon={<FiGlobe className="feature-icon-svg" />}
        title="Global Access"
        description="Access real-time data from anywhere around the globe"
      />
      <FeatureCard 
        icon={<FiZap className="feature-icon-svg" />}
        title="Instant Insights"
        description="Get immediate access to crucial information"
      />
      <FeatureCard 
        icon={<FiPieChart className="feature-icon-svg" />}
        title="Comprehensive Data"
        description="View detailed metrics and analytics at a glance"
      />
      <FeatureCard 
        icon={<FiTarget className="feature-icon-svg" />}
        title="Precision"
        description="Accurate and reliable data from trusted sources"
      />
    </div>
    <button 
      className="cta-button"
      onClick={() => setCurrentPage('weather')}
    >
      Weather Explorer
      <FiArrowRight className="cta-icon" />
    </button>
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card">
    <div className="feature-icon-wrapper">
      {icon}
    </div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-description">{description}</p>
  </div>
);

export default HomePage; 