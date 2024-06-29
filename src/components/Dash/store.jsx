import React, { useState } from "react";
import Drugs from "./Drugs.json";
import Cart from "./Cart"; // Import the Cart component

function FilterBar({ categories, onFilterChange, onSearchChange }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDrugs, setFilteredDrugs] = useState(Drugs);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredResults = Drugs.filter((drug, index, self) => {
      const nameMatch = drug.name.toLowerCase().includes(query);
      const categoryMatch = drug.category.toLowerCase().includes(query);
      const typeMatch = drug.type.toLowerCase().includes(query);

      return (
        (nameMatch || categoryMatch || typeMatch) &&
        self.findIndex((d) => d.name === drug.name) === index
      );
    });

    setFilteredDrugs(filteredResults);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    const filteredResults =
      category === "All"
        ? Drugs
        : Drugs.filter((drug) => drug.type === category);

    setFilteredDrugs(filteredResults);
  };

  return (
    <div className="m-3 mt-1 flex items-start p-4 flex-col">
      <div className="flex items-center p-4 space-x-4 ">
        <select
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search Inventory..."
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="drug-list-container overflow-x-hidden overflow-y-scroll h-[70vh]">
        <div className="drug-list flex flex-row gap-2 p-4 flex-wrap">
          {filteredDrugs.map((drug) => (
            <div
              key={drug.id}
              className="drug-card bg-white w-[23%] p-4 rounded-lg flex flex-col shadow-md"
            >
              <h3 className="text-xl font-bold mb-2">{drug.name}</h3>
              <p className="text-gray-600 mb-1 text-[12px]">
                Category: {drug.category}
              </p>
              <p className="text-gray-600 mb-1 text-[12px]">
                Type: {drug.type}
              </p>
              <p className="text-gray-700 text-[12px]">
                Description: {drug.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
