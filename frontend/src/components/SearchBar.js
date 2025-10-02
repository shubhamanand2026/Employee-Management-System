import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ onSearch, placeholder = "Search employees..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== '') {
        setIsSearching(true);
        onSearch(searchTerm);
        setTimeout(() => setIsSearching(false), 500);
      } else {
        onSearch('');
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="search-container position-relative">
      <div className="input-group">
        <span className="input-group-text bg-white border-end-0">
          {isSearching ? (
            <div className="spinner-border spinner-border-sm text-primary" role="status">
              <span className="visually-hidden">Searching...</span>
            </div>
          ) : (
            <FaSearch className="text-muted" />
          )}
        </span>
        <input
          type="text"
          className="form-control border-start-0"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ paddingLeft: '0' }}
        />
        {searchTerm && (
          <button
            className="btn btn-outline-secondary border-start-0"
            type="button"
            onClick={handleClear}
            title="Clear search"
          >
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;


