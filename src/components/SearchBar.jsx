import React from 'react';
import './SearchBarStyles.css';
import { BsSearch } from "react-icons/bs";


const SearchBar = ({ searchQuery, setSearchQuery }) => {

  return (
    <div className="search-bar">
    <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search"
        className="search-bar-input"
      />
    </div>
  );
};

export default SearchBar;
