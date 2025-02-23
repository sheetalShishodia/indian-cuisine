import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchIngredients, fetchDishes } from "../services/api"; // Import API functions

const IngredientSelector = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [suggestedDishes, setSuggestedDishes] = useState([]);

  useEffect(() => {
    const loadIngredients = async () => {
      const data = await fetchIngredients();
      setIngredients(data);
    };
    loadIngredients();
  }, []);

  useEffect(() => {
    const loadDishes = async () => {
      const data = await fetchDishes(selectedIngredients);
      setSuggestedDishes(data);
    };
    loadDishes();
  }, [selectedIngredients]);

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Select Available Ingredients:</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {ingredients.length > 0 ? (
          ingredients.map((ingredient) => (
            <button
              key={ingredient}
              onClick={() => toggleIngredient(ingredient)}
              className={`px-3 py-1 rounded border ${
                selectedIngredients.includes(ingredient) ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {ingredient}
            </button>
          ))
        ) : (
          <p>Loading ingredients...</p>
        )}
      </div>

      <h2 className="text-xl font-bold mb-2">Possible Dishes:</h2>
      <ul className="list-disc pl-5">
        {suggestedDishes.length > 0 ? (
          suggestedDishes.map((dish) => (
            <li key={dish.name} className="cursor-pointer text-blue-600 hover:underline">
              <Link to={`/dish/${encodeURIComponent(dish.name)}`}>{dish.name}</Link>
            </li>
          ))
        ) : (
          <p>No dishes can be made with selected ingredients.</p>
        )}
      </ul>
    </div>
  );
};

export default IngredientSelector;
