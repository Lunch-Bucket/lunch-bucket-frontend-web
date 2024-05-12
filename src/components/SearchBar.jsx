import React from 'react';
import './SearchBarStyles.css';
import { BsSearch } from "react-icons/bs";


const SearchBar = () => {
  const handleChange = event => {
    // onChange(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        onChange= {handleChange}
        className='search-bar-input'
      />
      <button type="button" className='search-bar-icon'><BsSearch/></button>
    </div>
  );
};

export default SearchBar;
