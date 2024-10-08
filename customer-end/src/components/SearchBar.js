import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Style.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  // Fetch suggestions while typing
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim() !== '') {
        try {
          const response = await axios.get(`/search/${searchTerm}`);
          setSuggestions(response.data);
          setShowSuggestions(true);
        } catch (err) {
          console.log('Failed to fetch suggestions:', err);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  const handleSelect = (productID) => {
    setShowSuggestions(false);
    navigate(`/viewproduct?productID=${productID}`);
  };

  return (
    <div className="container mt-3">
      <div className="input-group mb-3 position-relative">
        <span className="input-group-text bg-white border-0 position-absolute" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
          <i className="bi bi-search" style={{ color: '#666' }}></i>
        </span>
        <input
          type="text"
          className="form-control ps-5 py-2 rounded-pill shadow-sm"
          placeholder=" Search for products..."
          aria-label="Search"
          aria-describedby="basic-addon2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderColor: '#ddd' }}
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="list-group position-absolute w-100 shadow-lg rounded" style={{ zIndex: 1000, top: '100%', left: 0 }}>
            {suggestions.map((product) => (
              <li
                key={product.ProductID}
                className="list-group-item list-group-item-action"
                style={{ cursor: 'pointer' }}
                onClick={() => handleSelect(product.ProductID)}
              >
                {product.ProductName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
