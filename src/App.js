import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import DishPage from "./pages/DishPage";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
        <Header />
        <main className="flex-grow container mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dish/:name" element={<DishPage />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white text-center py-4 mt-6">
          <p>&copy; 2025 Dish App. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
