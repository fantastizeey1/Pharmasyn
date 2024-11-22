import React, { useState, useEffect, useCallback } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import logo from "/logo.jpg";
import searchIcon from "/searchicon.svg";
import cartIcon from "/Cart.svg";

import Discoverus from "../Landingpage/Discoverus";
import Footer from "../Landingpage/Footer";
import debounce from "lodash.debounce";
import { BASE_URL } from "../../config";
import useCart from "../Dash/useCart";

const Shop = () => {
  const { cartCount } = useCart();
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
  const location = useLocation();

  const defaultImageUrl = "/suii.jpg";

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

  const addToCart = async (inventory) => {
    try {
      const bearerToken = sessionStorage.getItem("access_token");
      if (!bearerToken) {
        throw new Error("No access token found in session storage");
      }

      const cartData = {
        carts: [
          {
            inventoryId: inventory.id,
            quantity: 1,
            productName: inventory.inventoryName,
            status: true,
          },
        ],
      };

      const url = `${BASE_URL}/api/Cart/AddToCart`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(cartData),
      });
      console.log(cartData);
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
        method: "PUT",
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
              inventoryId: inventory.id,
              quantity: inventory.quantity,
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
    <div className="bg-[#]">
      <header className="xl:mx-[70px] md:mx-[40px] mx-[15px] py-3">
        <div className="flex justify-between items-center">
          <Link to="/">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="Pharmasynthesis Logo"
                className="w-[40px] h-[40px]"
              />
              <p className="text-[#0C0C0C] text-[16px] font-bold">
                Pharmasynthesis
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex flex-1 justify-center items-center">
            <Link
              to="/"
              className="ml-[36px] text-[14px] font-bold hover:scale-110"
              aria-label="Home"
            >
              Home
            </Link>
            <Link
              to="/#about-us"
              className="ml-[36px] text-[14px] font-bold hover:scale-110"
              aria-label="About Us"
            >
              About Us
            </Link>
            <Link
              to="/shop"
              className="ml-[36px] text-[14px] font-bold hover:scale-110"
              aria-label="Shop"
            >
              Marketplace
            </Link>
            <Link
              to="/#contact-us"
              className="ml-[36px] text-[14px] font-bold hover:scale-110"
              aria-label="Contact Us"
            >
              Contact Us
            </Link>
          </nav>

          <div className="flex justify-center items-center">
            <div className="flex items-center justify-center bg-white shadow-lg rounded-full   md:max-w-md">
              <input
                type="text"
                placeholder="Search Inventory"
                onChange={handleSearchChange}
                className="flex-grow md:px-4 text-sm rounded-full  focus:outline-none placeholder-[#2e2e2e] placeholder:text-[11px]  ml-3 "
              />
              <button className=" rounded-full m-0 p-0 flex items-center justify-center focus:outline-none">
                <img
                  src={searchIcon}
                  alt="Search"
                  className="   md:w-10 md:h-10"
                />
              </button>
            </div>
            <Link
              to="/profile"
              className="ml-[16px] text-[14px] font-bold hover:scale-110"
              aria-label="Log in"
            >
              <div className="w-8 h-8 rounded-full flex justify-center items-center text-[18px] text-white bg-blue-800">
                P
              </div>
            </Link>
            <Link to="/Cart" className="relative">
              <img
                src={cartIcon}
                alt="cart"
                className="w-[24px] ml-4 h-[24px] hover:scale-110"
              />
              {cartCount > 0 && (
                <span className="absolute top-[-5px] right-[-10px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-[15px] md:mx-[70px] flex  mt-10">
        <div className="w-[180px]  bg-white pl-[15px] pt-[15px] flex flex-col items-start h-[80vh] mt-5 rounded-lg shadow-lg">
          <div className="flex flex-col items-start w-full">
            <div className="flex flex-col mb-[150px] w-full">
              <NavLink
                to="/Shop"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center text-[16px] font-medium mb-[44px] text-blue-500"
                    : "flex items-center text-[16px] font-medium mb-[44px] text-black"
                }
              >
                <img
                  src={"/market.svg"}
                  alt="icon"
                  className="mr-4 w-[20px] h-[20px]"
                />
                MarketPlace
              </NavLink>

              <NavLink
                to="/inventory"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center text-[16px] font-medium mb-[44px] text-blue-500"
                    : "flex items-center text-[16px] font-medium mb-[44px] text-black"
                }
              >
                <img
                  src={"/inventory.png"}
                  alt="icon"
                  className="mr-4 w-[20px] h-[20px]"
                />
                Inventory
              </NavLink>

              <NavLink
                to="/orders"
                className="flex items-center text-[16px] font-medium mb-[44px] text-black"
              >
                <img
                  src="/Orders.png"
                  alt="icon"
                  className="mr-4 w-[20px] h-[20px]"
                />
                Orders
              </NavLink>

              <NavLink
                to="/Invoice"
                className={({ isActive, location }) =>
                  isActive
                    ? "flex items-center text-[16px] font-medium mb-[44px] text-blue-500"
                    : "flex items-center text-[16px] font-medium mb-[44px] text-black"
                }
              >
                <img
                  src="/Orders.png"
                  alt="icon"
                  className="mr-4 w-[20px] h-[20px]"
                />
                Invoice
              </NavLink>

              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center text-[16px] font-medium mb-[44px] text-blue-500"
                    : "flex items-center text-[16px] font-medium mb-[44px] text-black"
                }
              >
                <img src="/reports.png" alt="icon" className="mr-4 w-[20px]" />
                Reports
              </NavLink>

              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center text-[16px] font-medium mb-[44px] text-blue-500"
                    : "flex items-center text-[16px] font-medium mb-[44px] text-black"
                }
              >
                <img src="/settings.png" alt="icon" className="mr-4 w-[20px]" />
                Settings
              </NavLink>
            </div>
          </div>
        </div>
        {/* <div className=" mt-[45px] mb-[65px] w-full h-[168px] bg-[#013299] justify-center flex items-center rounded-xl">
          <h1 className="text-[40px] text-white font-bold">PRODUCTS</h1>
        </div> */}
        <div className="">
          <div className="md:grid md:grid-cols-3 md:gap-x-4 lg:gap-x-10 md:gap-y-10">
            {inventories.map((product, index) => (
              <div
                key={index}
                className="shadow-lg xl:w-[305px] md:w-[305px] rounded-lg md: h-[517px] xl:h-[517px] ml-[30px] flex-1 flex justify-center items-center flex-col"
              >
                <img
                  src={product.imageUrl ? product.imageUrl : defaultImageUrl}
                  alt={
                    product.inventoryName
                      ? product.inventoryName
                      : "Default Image"
                  }
                  className="w-[256px] h-[256px] mb-2 "
                />
                <h3 className="text-[25px] font-semibold mb-[20px]">
                  {product.inventoryName}
                </h3>

                <p className="text-[24px] font-normal mb-5">
                  {product.userName}
                </p>
                <p className="text-[24px] font-semibold mb-3">
                  ₦{product.price}
                </p>

                <button
                  className="bg-[#013299] hover:bg-blue-700 text-white text-[12px] font-bold py-2 px-4 rounded"
                  onClick={() => addToCart(product, index)}
                >
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Discoverus />
      <Footer />
    </div>
  );
};

export default Shop;
