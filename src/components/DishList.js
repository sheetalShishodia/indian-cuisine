import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDishes } from "../services/api";

const DishList = () => {
  const [dishes, setDishes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("name:asc");
  const [filters, setFilters] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const [searchState, setSearchState] = useState("");

  const states = [
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
    { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
    { value: "Assam", label: "Assam" },
    { value: "Bihar", label: "Bihar" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
    { value: "Goa", label: "Goa" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Haryana", label: "Haryana" },
    { value: "Himachal Pradesh", label: "Himachal Pradesh" },
    { value: "Jharkhand", label: "Jharkhand" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Kerala", label: "Kerala" },
    { value: "Madhya Pradesh", label: "Madhya Pradesh" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Manipur", label: "Manipur" },
    { value: "Meghalaya", label: "Meghalaya" },
    { value: "Mizoram", label: "Mizoram" },
    { value: "Nagaland", label: "Nagaland" },
    { value: "Odisha", label: "Odisha" },
    { value: "Punjab", label: "Punjab" },
    { value: "Rajasthan", label: "Rajasthan" },
    { value: "Sikkim", label: "Sikkim" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Telangana", label: "Telangana" },
    { value: "Tripura", label: "Tripura" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
    { value: "Uttarakhand", label: "Uttarakhand" },
    { value: "West Bengal", label: "West Bengal" },
  ];

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const params = { page, limit, sortBy, ...filters };
        const data = await getDishes(params);
        setDishes(data);
        setHasMore(data.length === limit);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };
    fetchDishes();
  }, [page, limit, sortBy, filters]);

  const handleSort = (field) => {
    const [currentField, order] = sortBy.split(":");
    const newOrder = currentField === field && order === "asc" ? "desc" : "asc";
    setSortBy(`${field}:${newOrder}`);
  };

  const handleFilter = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredStates = states.filter((state) =>
    state.label.toLowerCase().includes(searchState.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dishes List</h1>

      {/* Filters */}
      <div className="mb-4 flex gap-4">
        <select onChange={(e) => handleFilter("diet", e.target.value)} className="border p-2">
          <option value="">Diet Type</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="non vegetarian">Non-Vegetarian</option>
        </select>
        <select onChange={(e) => handleFilter("flavor", e.target.value)} className="border p-2">
          <option value="">Flavor</option>
          <option value="spicy">Spicy</option>
          <option value="sweet">Sweet</option>
          <option value="savory">Savory</option>
        </select>

        {/* Searchable State Dropdown */}
        <div className="relative w-64">
  <input
    type="text"
    placeholder="Search State..."
    value={searchState}
    onChange={(e) => setSearchState(e.target.value)}
    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {searchState && (
    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
      {filteredStates.length > 0 ? (
        filteredStates.map((state) => (
          <li
            key={state.value}
            onClick={() => {
              handleFilter("state", state.value);
              setSearchState(state.label); // Update input with selected state
            }}
            className="p-2 hover:bg-gray-100 cursor-pointer"
          >
            {state.label}
          </li>
        ))
      ) : (
        <li className="p-2 text-gray-500">No results found</li>
      )}
    </ul>
  )}
</div>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border cursor-pointer" onClick={() => handleSort("name")}>
                Name {sortBy.startsWith("name") && (sortBy.endsWith("asc") ? "⬆️" : "⬇️")}
              </th>
              <th className="py-2 px-4 border cursor-pointer" onClick={() => handleSort("prepTime")}>
                Prep Time {sortBy.startsWith("prepTime") && (sortBy.endsWith("asc") ? "⬆️" : "⬇️")}
              </th>
              <th className="py-2 px-4 border cursor-pointer" onClick={() => handleSort("cookingTime")}>
                Cooking Time {sortBy.startsWith("cookingTime") && (sortBy.endsWith("asc") ? "⬆️" : "⬇️")}
              </th>
              <th className="py-2 px-4 border">Diet</th>
            </tr>
          </thead>
          <tbody>
            {dishes.map((dish) => (
              <tr key={dish.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">
                  <Link to={`/dish/${dish.name}`} className="text-blue-600 hover:underline">
                    {dish.name}
                  </Link>
                </td>
                <td className="py-2 px-4 border">{dish.prep_time} mins</td>
                <td className="py-2 px-4 border">{dish.cook_time} mins</td>
                <td className="py-2 px-4 border">{dish.diet}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DishList;
