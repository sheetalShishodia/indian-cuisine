import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDishByName } from "../services/api";

const DishDetails = () => {
  const { name } = useParams();
  const [dish, setDish] = useState(null);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const data = await getDishByName(name);
        console.log(data);
        setDish(data);
      } catch (error) {
        console.error("Error fetching dish:", error);
      }
    };
    fetchDish();
  }, [name]);

  if (!dish) return <div className="text-center mt-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{dish.name}</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p><strong>Ingredients:</strong> {dish.ingredients.split(", ").join(", ")}</p>
        <p><strong>Prep Time:</strong> {dish.prep_time} mins</p>
        <p><strong>Cooking Time:</strong> {dish.cook_time} mins</p>
        <p><strong>Diet Type:</strong> {dish.diet}</p>
        <p><strong>Flavor:</strong> {dish.flavor_profile}</p>
        <p><strong>Course:</strong> {dish.course}</p>
        <p><strong>State:</strong> {dish.state}</p>
        <p><strong>Region:</strong> {dish.region}</p>
      </div>
    </div>
  );
};

export default DishDetails;
