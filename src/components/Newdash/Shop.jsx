import React, { useState, useEffect, useCallback } from "react";
import Dashheader from "./Dashheader";
import Btn from "../Landingpage/Btn";
import Discoverus from "../Landingpage/Discoverus";
import Footer from "../Landingpage/Footer";
import debounce from "lodash.debounce";
import { BASE_URL } from "../../config";

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [inventories, setInventories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const resultsPerPage = 10;

  const defaultImageUrl = "/suii.jpg"; // Replace with your default image URL

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
        setCartId(responseData.cartId);
        setIsCartEmpty(responseData.cartDetails.length === 0);
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
      setIsCartEmpty(false);

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

  return (
    <div className="">
      <Dashheader />
      <div className="mx-[15px] md:mx-[70px]">
        <div className=" mt-[45px] mb-[65px] w-full h-[168px] bg-[#013299] justify-center flex items-center rounded-xl">
          <h1 className="text-[40px] text-white font-bold">PRODUCTS</h1>
        </div>
      </div>
      <div className="mx-[15px] md:mx-[120px]">
        <div className="md:grid md:grid-cols-3 md:gap-x-4 lg:gap-x-16 md:gap-y-[130px]">
          {inventories.map((product, index) => (
            <div
              key={index}
              className="shadow-xl xl:w-[300px] md:w-[270px] rounded-lg md: h-[380px] xl:h-[408px] ml-[30px] flex-1 flex-wrap flex justify-center items-center flex-col"
            >
              <img
                src={product.imageUrl ? product.imageUrl : defaultImageUrl}
                alt={
                  product.inventoryName
                    ? product.inventoryName
                    : "Default Image"
                }
                className="w-[220px] h-[220px]"
              />
              <h3 className="text-[25px] font-medium mb-1">
                {product.inventoryName}
                {/* Make sure the property matches your
                API response */}
              </h3>
              <p className="text-[24px] font-normal mb-3">
                {product.price}
                {/* Make sure the property matches your API
                response */}
              </p>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white text-[12px] font-bold py-2 px-4 rounded"
                onClick={() => {
                  if (isCartEmpty) {
                    addToCart(product, index);
                  } else {
                    updateCart(product, index);
                  }
                }}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <Discoverus />
      <Footer />
    </div>
  );
};

export default Shop;
