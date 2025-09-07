import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('components') && showSearch) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location, showSearch]);

  return showSearch && visible ? (
    <div className="border-y bg-gray-50 py-4 flex justify-center items-center">
      <div className="relative flex items-center w-3/4 sm:w-1/2 bg-white rounded-full shadow-md border border-gray-200 px-4 py-2">
        {/* Search icon inside input */}
        <img src={assets.search_icon} alt="search" className="w-4 mr-2 opacity-70" />
        
        {/* Input field */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search for products, components..."
          className="flex-1 bg-transparent outline-none text-sm text-gray-700"
        />

        {/* Clear (cross) button */}
        <img
          onClick={() => setShowSearch(false)}
          src={assets.cross_icon}
          alt="close"
          className="w-4 ml-2 cursor-pointer hover:opacity-80 transition"
        />
      </div>
    </div>
  ) : null;
};

export default SearchBar;
