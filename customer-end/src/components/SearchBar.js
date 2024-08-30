import React, { useState } from 'react';
import './Style.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log(`Search term: ${searchTerm}`);
  };

  return (
    <div className="container mt-3">
      <div className="input-group mb-3 ">
        <input
          type="text"
          className="form-control gradient-form"
          placeholder="Search..."
          aria-label="Search"
          aria-describedby="basic-addon2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="input-group-append">
            
          <button className="btn gradient-text-0" type="button" onClick={handleSearch}>
            <i className="bi bi-search"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
