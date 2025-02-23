import React from "react";
import DishList from "../components/DishList";
import DishSuggester from "../components/DishSuggester";

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to Dish App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Dishes List</h2>
          <DishList />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Dish Suggester</h2>
          <DishSuggester />
        </div>
      </div>
    </div>
  );
};

export default HomePage;