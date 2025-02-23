import React, { useState } from "react";
import { Link } from "react-router-dom";
import { suggestDishes } from "../services/api";

const DishSuggester = () => {
  const [ingredients, setIngredients] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    setIngredients(e.target.value);
  };

  const handleSuggestDishes = async () => {
    const ingredientsList = ingredients.split(",").map((item) => item.trim());
    if (ingredientsList.length === 0) return;

    try {
      const data = await suggestDishes(ingredientsList);
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching dish suggestions:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dish Suggester</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter ingredients (comma-separated)"
          value={ingredients}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <button
        onClick={handleSuggestDishes}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Suggest Dishes
      </button>

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Suggested Dishes</h2>
        <ul>
          {suggestions.length > 0 ? (
            suggestions.map((dish) => (
              <li key={dish.name} className="mb-2">
                <Link
                  to={`/dish/${encodeURIComponent(dish.name)}`}
                  className="text-blue-600 hover:underline"
                >
                  {dish.name}
                </Link>
              </li>
            ))
          ) : (
            <li>No dishes found for the given ingredients.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DishSuggester;
