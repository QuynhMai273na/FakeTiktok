import React from 'react';
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch } from '@fortawesome/free-solid-svg-icons';
import './TopNavbar.css'; 

const TopNavbar = ({ onSearch }) => {

const [searchQuery, setSearchQuery] = useState("");

const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
};

const handleSearch = (e) => {
    if (e.key === "Enter") {
      onSearch(searchQuery);
      //setSearchQuery(""); // Clear the input after searching
  }
};
  return (
    <div className='top-bar'>
      <FontAwesomeIcon icon={faTv} className='icon' />
      <h2>Following | <span>For You</span></h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search hashtags..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleSearch}
          className="search-input"
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>
    </div>
  );
};
export default TopNavbar;
