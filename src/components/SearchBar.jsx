import React from 'react';
import './SearchBarStyles.css';
import { BsSearch } from "react-icons/bs";


const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearch}
      />
      <button type="button" className='search-bar-icon'><BsSearch/></button>
    </div>
  );
};

export default SearchBar;
