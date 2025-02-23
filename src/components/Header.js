import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchDishes } from "../services/api"; // Import API function

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch API with debounce
  useEffect(() => {
    if (searchQuery.length < 2) {
      setFilteredDishes([]);
      return;
    }

    setLoading(true);
    const delaySearch = setTimeout(async () => {
      const results = await searchDishes(searchQuery);
      setFilteredDishes(results);
      setLoading(false);
    }, 500); // Debounce delay

    return () => clearTimeout(delaySearch); // Cleanup function
  }, [searchQuery]);

  return (
    <header className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center relative">
        <Link to="/" className="text-2xl font-bold">Dish App</Link>

        {/* Search Bar */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg text-black w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Clear Button */}
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
            >
              &times;
            </button>
          )}

          {/* Search Results */}
          {filteredDishes.length > 0 && (
            <ul className="absolute top-12 left-0 w-full bg-white text-black shadow-lg rounded-lg border border-gray-300 max-h-40 overflow-y-auto z-50">
              {filteredDishes.map((dish, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => navigate(`/dish/${dish.name}`)}
                >
                  {dish.name}
                </li>
              ))}
            </ul>
          )}

          {/* Loading Indicator */}
          {loading && (
            <p className="absolute top-12 left-0 w-full text-gray-600 bg-white border border-gray-300 rounded-md p-2 shadow-md">
              Searching...
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
