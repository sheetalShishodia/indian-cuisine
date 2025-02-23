import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      const results = await api.searchDishes(value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="relative w-64">
      {/* Search Input */}
      <div className="flex items-center border border-gray-300 rounded-md p-2 bg-white shadow-sm">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search dishes..."
          className="w-full outline-none bg-transparent"
        />
        
        {/* Clear Button */}
        {query && (
          <button 
            onClick={() => {
              setQuery("");
              setSuggestions([]);
            }}
            className="text-gray-500 hover:text-black ml-2"
          >
            &times;
          </button>
        )}
      </div>

      {/* Search Suggestions */}
      {suggestions.length > 0 && (
        <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto z-50">
          {suggestions.map((dish) => (
            <li
              key={dish.name}
              className="p-2 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => navigate(`/dish/${dish.name}`)}
            >
              {dish.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
