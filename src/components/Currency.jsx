import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiRefreshCw, FiDollarSign, FiArrowRight, FiSearch, FiX } from 'react-icons/fi';

const Currency = () => {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false);
  const [isToDropdownOpen, setIsToDropdownOpen] = useState(false);

  const API_KEY = 'fe13e3ddde870545643289d8';

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/codes`
        );
        setCurrencies(response.data.supported_codes);
      } catch (error) {
        setError('Failed to fetch currencies');
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`
        );
        setExchangeRate(response.data.conversion_rate);
        setError(null);
      } catch (error) {
        setError('Failed to fetch exchange rate');
        console.error('Error fetching exchange rate:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setSearchFrom('');
    setSearchTo('');
  };

  const filteredFromCurrencies = currencies.filter(([code, name]) =>
    `${code} - ${name}`.toLowerCase().includes(searchFrom.toLowerCase())
  );

  const filteredToCurrencies = currencies.filter(([code, name]) =>
    `${code} - ${name}`.toLowerCase().includes(searchTo.toLowerCase())
  );

  const convertedAmount = amount * (exchangeRate || 0);

  const handleClickOutside = () => {
    setIsFromDropdownOpen(false);
    setIsToDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="currency-container">
      <div className="currency-header">
        <div className="mirror-container">
          <div className="mirror-effect"></div>
          <h1>
            <FiDollarSign className="header-icon" />
            Currency Converter
          </h1>
          <p>Convert currencies in real-time with live exchange rates</p>
        </div>
      </div>

      <div className="converter-card">
        <div className="amount-input">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="any"
          />
        </div>

        <div className="currency-selectors">
          <div className="currency-select">
            <label htmlFor="from-currency">From</label>
            <div className="custom-select">
              <div 
                className="select-header"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFromDropdownOpen(!isFromDropdownOpen);
                  setIsToDropdownOpen(false);
                }}
              >
                <span>{fromCurrency}</span>
                <FiSearch className="search-icon" />
              </div>
              {isFromDropdownOpen && (
                <div className="select-dropdown">
                  <div className="search-box">
                    <FiSearch className="search-icon" />
                    <input
                      type="text"
                      value={searchFrom}
                      onChange={(e) => setSearchFrom(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      placeholder="Search currency..."
                    />
                    {searchFrom && (
                      <FiX 
                        className="clear-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchFrom('');
                        }}
                      />
                    )}
                  </div>
                  <div className="options-list">
                    {filteredFromCurrencies.map(([code, name]) => (
                      <div
                        key={code}
                        className={`option ${fromCurrency === code ? 'selected' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setFromCurrency(code);
                          setIsFromDropdownOpen(false);
                          setSearchFrom('');
                        }}
                      >
                        {code} - {name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <button 
            className="swap-button"
            onClick={handleSwapCurrencies}
            aria-label="Swap currencies"
          >
            <FiRefreshCw />
          </button>

          <div className="currency-select">
            <label htmlFor="to-currency">To</label>
            <div className="custom-select">
              <div 
                className="select-header"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsToDropdownOpen(!isToDropdownOpen);
                  setIsFromDropdownOpen(false);
                }}
              >
                <span>{toCurrency}</span>
                <FiSearch className="search-icon" />
              </div>
              {isToDropdownOpen && (
                <div className="select-dropdown">
                  <div className="search-box">
                    <FiSearch className="search-icon" />
                    <input
                      type="text"
                      value={searchTo}
                      onChange={(e) => setSearchTo(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      placeholder="Search currency..."
                    />
                    {searchTo && (
                      <FiX 
                        className="clear-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchTo('');
                        }}
                      />
                    )}
                  </div>
                  <div className="options-list">
                    {filteredToCurrencies.map(([code, name]) => (
                      <div
                        key={code}
                        className={`option ${toCurrency === code ? 'selected' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setToCurrency(code);
                          setIsToDropdownOpen(false);
                          setSearchTo('');
                        }}
                      >
                        {code} - {name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="conversion-loading">
            <div className="loader"></div>
            <span>Fetching exchange rate...</span>
          </div>
        ) : error ? (
          <div className="conversion-error">
            <p>{error}</p>
          </div>
        ) : (
          <div className="conversion-result">
            <div className="result-card">
              <div className="conversion-details">
                <span className="amount">
                  {Number(amount).toLocaleString()} {fromCurrency}
                </span>
                <FiArrowRight className="arrow-icon" />
                <span className="converted-amount">
                  {convertedAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })} {toCurrency}
                </span>
              </div>
              <div className="exchange-rate">
                <span>Exchange Rate:</span>
                <span>1 {fromCurrency} = {exchangeRate} {toCurrency}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Currency;