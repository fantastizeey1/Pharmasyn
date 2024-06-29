import React, { useState, useEffect } from "react";
import inventory from "./Inventory.json";
import Cart from "./Cart"; // Import the Cart component

function FilterBar({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDrugs, setFilteredDrugs] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    setFilteredDrugs(inventory);
  }, []);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });

    setAlertMessage(`${item.name} added to cart`);
    setTimeout(() => {
      setAlertMessage(null);
    }, 2000);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const updateCart = (index, newQuantity) => {
    setCart((prevCart) => {
      if (newQuantity <= 0) {
        return prevCart.filter((_, i) => i !== index);
      } else {
        return prevCart.map((item, i) =>
          i === index ? { ...item, quantity: newQuantity } : item
        );
      }
    });
  };

  const emptyCart = () => {
    setCart([]);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredResults = inventory.filter((item, index, self) => {
      const nameMatch = item.name.toLowerCase().includes(query);
      const categoryMatch = item.category.toLowerCase().includes(query);
      const typeMatch = item.type.toLowerCase().includes(query);

      return (
        (nameMatch || categoryMatch || typeMatch) &&
        self.findIndex((d) => d.name === item.name) === index
      );
    });

    setFilteredDrugs(filteredResults);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    const filteredResults =
      category === "All"
        ? inventory
        : inventory.filter((item) => item.type === category);

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
      <div className="inventory-list-container overflow-x-hidden overflow-y-auto  h-[70vh]">
        <div className="inventory-list flex flex-row gap-2 p-4 flex-wrap">
          {filteredDrugs.map((item) => (
            <div
              key={item.id}
              class="w-[200px] p-6 bg-gray-200 border border-gray-400 rounded-lg shadow  dark:border-gray-700"
            >
              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-1 text-[12px]">
                Category: {item.category}
              </p>
              <p className="text-gray-600 mb-1 text-[12px]">
                Type: {item.type}
              </p>
              <p className="text-gray-700 text-[12px]">
                Description: {item.description}
              </p>
              <button
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      {alertMessage && <div className="alert-message">{alertMessage}</div>}
      <Cart
        cart={cart}
        isCartOpen={isCartOpen}
        toggleCart={toggleCart}
        updateCart={updateCart}
        emptyCart={emptyCart}
      />
    </div>
  );
}

export default FilterBar;
