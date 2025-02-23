import React from "react";
import DishDetails from "../components/DishDetails";

const DishPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dish Details</h1>
      <DishDetails />
    </div>
  );
};

export default DishPage;