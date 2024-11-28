import React, { useState } from 'react';
import axios from 'axios';
import { FiSearch, FiX, FiGlobe, FiClock, FiExternalLink, FiTrendingUp } from 'react-icons/fi';

const News = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const popularTopics = [
    { name: 'Technology', icon: '🔧', color: '#3B82F6' },
    { name: 'Business', icon: '📈', color: '#10B981' },
    { name: 'Sports', icon: '🏆', color: '#F59E0B' },
    { name: 'Science', icon: '🧬', color: '#8B5CF6' },
    { name: 'Health', icon: '💊', color: '#EF4444' },
    { name: 'Entertainment', icon: '🎭', color: '#EC4899' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;

    setLoading(true);
    setError(null);

    try {
      // Using GNews API
      const API_KEY = '96c9ab91a16145ce289e0a451c8917f3'; // Replace with your GNews API key
      const response = await axios.get(
        `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&country=${searchQuery}&max=10&apikey=${API_KEY}`
      );

      setNews(response.data.articles);
    } catch (error) {
      setError('Failed to fetch news. Please try again.');
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="dh-news-container">
      <div className="search-container">
        <div className="search-header">
          <h2>
            <FiGlobe className="header-icon" />
            Global News Explorer
          </h2>
          <p>Stay informed with the latest headlines from around the world</p>
        </div>

        <form onSubmit={handleSubmit} className="search-form">
          <div className={`input-wrapper ${isFocused ? 'focused' : ''}`}>
            <FiSearch className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search for a country or topic..."
              className="search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <FiX />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="search-button"
            disabled={loading}
          >
            {loading ? (
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
            <span>Trending Topics</span>
          </div>
          <div className="topic-grid">
            {popularTopics.map(topic => (
              <button
                key={topic.name}
                onClick={() => setSearchQuery(topic.name)}
                className="topic-button"
                style={{ '--topic-color': topic.color }}
              >
                <span className="topic-icon">{topic.icon}</span>
                <span className="topic-name">{topic.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="dh-news-error">
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="dh-news-loading">
          <div className="dh-loader"></div>
          <p>Fetching latest news...</p>
        </div>
      ) : (
        <div className="dh-news-grid">
          {news.map((article, index) => (
            <div key={index} className="dh-news-card">
              <div className="dh-image-wrapper">
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="dh-news-image"
                    loading="lazy"
                  />
                ) : (
                  <div className="dh-image-placeholder">
                    <FiGlobe />
                    <span>No image available</span>
                  </div>
                )}
                <div className="dh-source-tag">
                  {article.source.name}
                </div>
              </div>
              <div className="dh-news-content">
                <h3 className="dh-news-title">{article.title}</h3>
                <p className="dh-news-desc">{article.description}</p>
                <div className="dh-news-footer">
                  <span className="dh-timestamp">
                    <FiClock className="dh-icon-small" />
                    {formatDate(article.publishedAt)}
                  </span>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dh-read-more"
                  >
                    Read Full Story
                    <FiExternalLink className="dh-icon-small" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News; 