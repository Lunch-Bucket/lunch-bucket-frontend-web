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
        placeholder="Search customer code"
        className="search-bar-input"
      />
      <button type="button" className='search-bar-icon'><BsSearch/></button>
    </div>
  );
};

export default SearchBar;
