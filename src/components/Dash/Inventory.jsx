import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import Cart2 from "./Cart2"; // Adjust this path if necessary
import { BASE_URL } from "../../config";

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [inventories, setInventories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null);
  const resultsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isCartEmpty, setIsCartEmpty] = useState(true); // New state to track if cart is empty

  const userId = localStorage.getItem("userId");
  const userTypeNumber = localStorage.getItem("userTypeNumber");

  console.log("userId:", userId);
  console.log("userTypeNumber:", userTypeNumber);

  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
      setCurrentPage(1);
    }, 300),
    []
  );

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const url = `${BASE_URL}/api/Inventory/GetInventory-by-filter?page=${currentPage}&pageCount=${resultsPerPage}&searchTerm=${searchQuery}`;
      console.log("API URL:", url);

      const bearerToken = sessionStorage.getItem("access_token");
      if (!bearerToken) {
        throw new Error("No access token found in session storage");
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      if (!response.ok) {
        const responseBody = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Response: ${responseBody}`
        );
      }

      const responseData = await response.json();
      console.log("API Response:", responseData);

      if (!responseData.inventories) {
        throw new Error("No inventories data found in the response");
      }

      setInventories(responseData.inventories);
      setTotalPages(responseData.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(
        `An error occurred while fetching data: ${error.message}. Please try again later.`
      );
    } finally {
      setLoading(false);
    }
  }, [searchQuery, currentPage, resultsPerPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchChange = (event) => {
    debouncedSearch(event.target.value);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const fetchCart = async () => {
    try {
      const bearerToken = sessionStorage.getItem("access_token");
      if (!bearerToken) {
        throw new Error("No access token found in session storage");
      }

      const url = `${BASE_URL}/api/Cart/GetCart`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      if (!response.ok) {
        const responseBody = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Response: ${responseBody}`
        );
      }

      const responseData = await response.json();
      if (responseData) {
        console.log("Fetched cart data:", responseData);
        setCart(responseData.cartDetails || []);
        setCartId(responseData.cartId); // Save the cartId in the state
        setIsCartEmpty(responseData.cartDetails.length === 0); // Update the cart empty state
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setError(`An error occurred while fetching cart data: ${error.message}`);
    }
  };

  const addToCart = async (inventory) => {
    try {
      const bearerToken = sessionStorage.getItem("access_token");
      if (!bearerToken) {
        throw new Error("No access token found in session storage");
      }

      const url = `${BASE_URL}/api/Cart/AddToCart`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({
          carts: [
            {
              userId: userId,
              inventoryId: inventory.id,
              quantity: 1,
              status: true,
            },
          ],
        }),
      });

      if (!response.ok) {
        const responseBody = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Response: ${responseBody}`
        );
      }

      const responseData = await response.json();
      setCart(responseData.cartDetails || []);
      setCartId(responseData.cartId);
      setIsCartEmpty(false); // Set cart as not empty

      setAlertMessage(`${inventory.inventoryName} added to cart`);
      setTimeout(() => {
        setAlertMessage(null);
      }, 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError(
        `An error occurred while adding to the cart: ${error.message}. Please try again later.`
      );
    }
  };

  const updateCart = async (inventory) => {
    try {
      const bearerToken = sessionStorage.getItem("access_token");
      if (!bearerToken) {
        throw new Error("No access token found in session storage");
      }

      const url = `${BASE_URL}/api/Cart/UpdateCart`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({
          cartId: cartId,
          cartCommand: "add",
          carts: [
            {
              userId: userId,
              inventoryId: inventory.id,
              quantity: 1,
              productName: inventory.inventoryName,
              status: true,
            },
          ],
        }),
      });

      if (!response.ok) {
        const responseBody = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Response: ${responseBody}`
        );
      }

      const responseData = await response.json();
      setCart(responseData.cartDetails || []);

      setAlertMessage(`${inventory.inventoryName} updated in cart`);
      setTimeout(() => {
        setAlertMessage(null);
      }, 2000);
    } catch (error) {
      console.error("Error updating cart:", error);
      setError(
        `An error occurred while updating the cart: ${error.message}. Please try again later.`
      );
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div
      className="m-3 mt-1 flex items-start p-4 flex-col"
      style={{ height: "90vh" }}
    >
      <h2>Search Inventory:</h2>
      <div className="p-3 flex space-x-4">
        <input
          type="text"
          placeholder="Search Inventory..."
          onChange={handleSearchChange}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div
          className="flex flex-col flex-1 overflow-y-hidden"
          style={{ height: "100%" }}
        >
          <div
            className="overflow-y-auto flex flex-wrap gap-3"
            style={{ height: "90vh" }}
          >
            {inventories.map((inventory) => (
              <div
                className="w-[200px] p-6 bg-gray-200 border border-gray-400 rounded-lg shadow dark:border-gray-700"
                key={inventory.id}
              >
                <p className="font-bold text-xl">{inventory.inventoryName}</p>
                <p className="text-[12px]">{inventory.description}</p>
                <p className="text-[12px]">Quantity: {inventory.quantity}</p>
                <p className="text-[12px]">Price: {inventory.price}</p>

                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white text-[12px] font-bold py-2 px-4 rounded"
                  onClick={() => {
                    if (isCartEmpty) {
                      addToCart(inventory);
                    } else {
                      updateCart(inventory);
                    }
                  }}
                >
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
          <div className="pagination mt-1">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>{currentPage}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {alertMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded shadow-md transition-opacity duration-300">
          {alertMessage}
        </div>
      )}
      <Cart2 isCartOpen={isCartOpen} toggleCart={toggleCart} userId={userId} />
    </div>
  );
};

export default Inventory;
