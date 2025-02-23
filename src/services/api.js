import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Change this if your API is deployed

export const getDishes = async (params) => {
  const response = await axios.get(`${API_BASE_URL}/dishes`, { params });
  return response.data;
};

export const getDishByName = async (name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dishes/${encodeURIComponent(name)}`);
    console.log("API response:", response.data); // Debugging: Check the response data
    return response.data;
  } catch (error) {
    console.error("Error fetching dish:", error.response?.data || error.message);
    throw new Error("Failed to fetch dish details");
  }
};

export const getIngredients = async () => {
  const response = await axios.get(`${API_BASE_URL}/ingredients`);
  return response.data;
};

export const suggestDishes = async (ingredients) => {
  const response = await axios.post(`${API_BASE_URL}/ingredients/suggest`, { ingredients });
  return response.data;
};
export const searchDishes = async (query) => {
  if (!query || query.length < 2) return []; // Prevent unnecessary calls

  try {
    const response = await axios.get(`${API_BASE_URL}/dishes/search`, {
      params: { query },
    });
    return response.data.slice(0, 10); // Limit results to 10
  } catch (error) {
    console.error("Error fetching dishes:", error);
    return [];
  }
};

// Replace with actual API base URL


export const fetchIngredients = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/ingredients`);
    if (!response.ok) throw new Error("Failed to fetch ingredients");
    return await response.json();
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }
};

export const fetchDishes = async (selectedIngredients) => {
  try {
    if (selectedIngredients.length === 0) return [];
    const response = await fetch(
      `${API_BASE_URL}/dishes/search?ingredients=${selectedIngredients.join(",")}`
    );
    if (!response.ok) throw new Error("Failed to fetch dishes");
    return await response.json();
  } catch (error) {
    console.error("Error fetching dishes:", error);
    return [];
  }
};



