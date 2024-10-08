import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import Dashheader from "./Dashheader";
import Discoverus from "../Landingpage/Discoverus";
import Footer from "../Landingpage/Footer";
import Btn from "../Landingpage/Btn";
import useCart from "../Dash/useCart";
import { FiTrash } from "react-icons/fi";
import useDebounce from "./UseDeounce";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [cartIds, setCartIds] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const prevDebouncedQuantity = useRef({});

  const fetchCart = useCallback(async () => {
    try {
      const bearerToken = sessionStorage.getItem("access_token");
      if (!bearerToken) throw new Error("No access token found");

      const response = await axios.get(
        `${BASE_URL}/api/Cart/GetCart?isCustomer=true`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      setCart(response.data.cartResponse || []);
      setCartCount(response.data.cartCount || 0);
      setCartIds(response.data.cartResponse.map((item) => item.cartId));
      sessionStorage.setItem("cartData", JSON.stringify(response.data));
    } catch (error) {
      setError(`Error fetching cart data: ${error.message}`);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleEmptyCart = useCallback(async () => {
    try {
      const bearerToken = sessionStorage.getItem("access_token");
      if (!bearerToken) throw new Error("No access token found");

      await axios.post(
        `${BASE_URL}/api/Cart/RemoveFromCart`,
        {
          cartId: cartIds[0],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      setCart([]);
    } catch (error) {
      setError(`Error clearing cart: ${error.message}`);
    }
  }, [cartIds]);

  const handleQuantityChange = (inventoryId, newQuantity) => {
    console.log(`Quantity changed: ${inventoryId}, ${newQuantity}`);
    // Update state, converting to number only if it's not an empty string
    setQuantity((prev) => ({
      ...prev,
      [inventoryId]: newQuantity === "" ? undefined : Number(newQuantity),
    }));
  };

  // Ensure the updateCart function and other related functions use the correct inventoryId
  const updateCart = useCallback(
    async (inventoryId, newQuantity) => {
      try {
        console.log(
          `Updating cart: inventoryId=${inventoryId}, newQuantity=${newQuantity}`
        );
        const updatedCart = [...cart];
        let itemToUpdate = null;
        let cartIndex = null;
        let detailIndex = null;

        // Find the item to update
        for (let i = 0; i < updatedCart.length; i++) {
          const cartItem = updatedCart[i];
          if (cartItem.cartDetails) {
            for (let j = 0; j < cartItem.cartDetails.length; j++) {
              if (cartItem.cartDetails[j].inventoryId === inventoryId) {
                itemToUpdate = cartItem.cartDetails[j];
                cartIndex = i;
                detailIndex = j;
                break;
              }
            }
          }
          if (itemToUpdate) break;
        }

        if (!itemToUpdate) {
          throw new Error("Item to update not found.");
        }

        if (newQuantity <= 0) {
          // Remove item if quantity is <= 0
          updatedCart[cartIndex].cartDetails.splice(detailIndex, 1);
        } else {
          // Update item quantity
          itemToUpdate.quantity = newQuantity;
        }

        console.log("Updated Cart:", JSON.stringify(updatedCart));

        const bearerToken = sessionStorage.getItem("access_token");
        if (!bearerToken) throw new Error("No access token found");

        console.log(
          "Payload:",
          JSON.stringify([
            {
              cartId: updatedCart[cartIndex].cartId,
              cartCommand: null,
              carts: updatedCart[cartIndex].cartDetails.map((detail) => ({
                inventoryId: detail.inventoryId,
                quantity: detail.quantity,
                productName: detail.productName,
                status: true,
              })),
            },
          ])
        );

        await axios.put(
          `${BASE_URL}/api/Cart/UpdateCart`,
          [
            {
              cartId: updatedCart[cartIndex].cartId,
              cartCommand: null,
              carts: updatedCart[cartIndex].cartDetails.map((detail) => ({
                inventoryId: detail.inventoryId,
                quantity: detail.quantity,
                productName: detail.productName,
                status: true,
              })),
            },
          ],
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );

        console.log("Cart updated successfully");
        setCart(updatedCart);
      } catch (error) {
        console.error(`Error updating cart: ${error.message}`);
        setError(`Error updating cart: ${error.message}`);
      }
    },
    [cart]
  );

  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = cart
        .reduce((total, cartItem) => {
          const itemTotal = cartItem.cartDetails.reduce((itemTotal, item) => {
            const price = parseFloat(item.unitPrice);
            return itemTotal + item.quantity * (price || 0);
          }, 0);
          return total + itemTotal;
        }, 0)
        .toFixed(2);
      setTotal(totalAmount);
    };

    calculateTotal();
  }, [cart]);

  const debouncedQuantity = useDebounce(quantity, 2000);

  useEffect(() => {
    const newQuantities = Object.entries(debouncedQuantity);
    const prevQuantities = Object.entries(prevDebouncedQuantity.current);

    if (
      newQuantities.length === prevQuantities.length &&
      newQuantities.every(
        ([key, value]) => prevDebouncedQuantity.current[key] === value
      )
    ) {
      // Quantities haven't changed, do not update
      return;
    }

    if (Object.keys(debouncedQuantity).length > 0) {
      console.log("Debounced Quantity:", debouncedQuantity);
      Object.entries(debouncedQuantity).forEach(
        ([inventoryId, newQuantity]) => {
          console.log(
            `Triggering updateCart for inventoryId=${inventoryId}, newQuantity=${newQuantity}`
          );
          updateCart(Number(inventoryId), newQuantity);
        }
      );
    }

    // Update prevDebouncedQuantity to the current debouncedQuantity
    prevDebouncedQuantity.current = { ...debouncedQuantity };
  }, [debouncedQuantity, updateCart]);

  const handleSelectItem = (index) => {
    setSelectedItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const handleEmptyCartClick = async () => {
    await handleEmptyCart();
  };

  const handleDelete = async (inventoryId) => {
    console.log(`Attempting to delete item with inventoryId: ${inventoryId}`); // Debug log
    try {
      const updatedCart = [...cart];
      let itemToDelete = null;
      let cartIndex = null;
      let detailIndex = null;

      // Find the item to delete
      for (let i = 0; i < updatedCart.length; i++) {
        const cartItem = updatedCart[i];
        if (cartItem.cartDetails) {
          for (let j = 0; j < cartItem.cartDetails.length; j++) {
            if (cartItem.cartDetails[j].inventoryId === inventoryId) {
              itemToDelete = cartItem.cartDetails[j];
              cartIndex = i;
              detailIndex = j;
              break;
            }
          }
        }
        if (itemToDelete) break;
      }

      if (!itemToDelete) {
        throw new Error("Item to delete not found.");
      }

      // Set the status to false
      itemToDelete.status = false;

      const bearerToken = sessionStorage.getItem("access_token");
      if (!bearerToken) throw new Error("No access token found");

      console.log(
        "Payload:",
        JSON.stringify([
          {
            cartId: updatedCart[cartIndex].cartId,
            cartCommand: null,
            carts: updatedCart[cartIndex].cartDetails.map((detail) => ({
              inventoryId: detail.inventoryId,
              quantity: detail.quantity,
              productName: detail.productName,
              status: detail.status,
            })),
          },
        ])
      );

      await axios.put(
        `${BASE_URL}/api/Cart/UpdateCart`,
        [
          {
            cartId: updatedCart[cartIndex].cartId,
            cartCommand: null,
            carts: updatedCart[cartIndex].cartDetails.map((detail) => ({
              inventoryId: detail.inventoryId,
              quantity: detail.quantity,
              productName: detail.productName,
              status: detail.status,
            })),
          },
        ],
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      console.log("Cart updated successfully");

      // Filter out items with status set to false
      const newCart = updatedCart
        .map((cartItem) => ({
          ...cartItem,
          cartDetails: cartItem.cartDetails.filter(
            (detail) => detail.status !== false
          ),
        }))
        .filter((cartItem) => cartItem.cartDetails.length > 0);

      setCart(newCart);
    } catch (error) {
      console.error(`Error removing item from cart: ${error.message}`); // Debug log
      setError(`Error removing item from cart: ${error.message}`);
    }
  };

  const handleCheckout = async (cart) => {
    const bearerToken = sessionStorage.getItem("access_token");
    if (!bearerToken) {
      console.error("No access token found");
      return;
    }

    const payload = cart.map((item) => ({
      cartId: item.cartId,
      approvalStatus: 2,
    }));

    try {
      await axios.post(`${BASE_URL}/api/Order/CreateOrder`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log("Order created successfully");
      navigate("/Invoice");
      handleEmptyCart();
    } catch (error) {
      console.error(`Error creating order: ${error.message}`);
      setError(`Error creating order: ${error.message}`);
    }
  };

  const handleCheckoutClick = () => {
    handleCheckout(cart);
    console.log("the click");
  };

  return (
    <div className="max-w-[100%]">
      <Dashheader cartCount={cartCount} />
      <div className="flex  items-center gap-5 mx-[15px] md:mx-[40px]">
        <div className="min-w-[180px]  bg-white pl-[15px] pt-[15px] flex flex-col items-start h-[80vh] mt-5 rounded-lg shadow-lg">
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
        {cart.length === 0 ? (
          <div className="flex justify-center items-center flex-col maybe">
            <img
              src="/cartempty.png"
              alt="empty cart image"
              className="w-[400px]"
            />
            <h2 className="font-bold mb-[60px]">YOUR CART IS EMPTY</h2>
            <Btn
              title="Shop"
              linkpath="/Shop"
              className="w-[800px] h-[90px] flex justify-center items-center px-2 text-[30px]"
            />
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col maybe w-[85%]">
            <div className="flex justify-between  w-full border-b-2 border-black pl-[70px] pb-[30px]">
              <h2 className="font-bold text-[30px]">MY CART</h2>
              <button className="w-5 h-5 mr-12" onClick={handleEmptyCartClick}>
                <FiTrash />
              </button>
            </div>

            <div className="mx-[70px] mt-10 flex justify-between items-start w-full">
              <div className="flex-1 flex flex-row justify-start flex-wrap gap-4 pt-10 items-center">
                {cart.map((cartItem, cartIndex) =>
                  cartItem.cartDetails.map((item, itemIndex) => (
                    <div
                      key={item.inventoryId}
                      className="flex w-[600px] flex-row gap-2 justify-start items-center p-7 shadow-xl rounded-xl"
                    >
                      <img
                        src={item.img || "/suii.jpg"}
                        alt={item.productName}
                        className="w-[80px] h-[100px] mr-10"
                      />
                      <div>
                        <h5 className="font-bold text-[24px]">
                          {item.productName} <span>{item.inventoryId}</span>
                        </h5>
                        <p className="mb-3 text-[14px]">₦ {item.unitPrice}</p>
                        <div className="flex justify-start items-center">
                          <label className="m-0 pr-4">Qty</label>
                          <input
                            type="number"
                            min="0"
                            className="border border-black/50 w-16"
                            value={quantity[item.inventoryId] || item.quantity}
                            onChange={(e) => {
                              const newValue = e.target.value;

                              // Check if the new value is empty or a valid number
                              if (newValue === "" || newValue >= 0) {
                                handleQuantityChange(
                                  item.inventoryId,
                                  newValue === "" ? "" : Number(newValue)
                                );
                              }
                            }}
                          />
                          <input
                            type="number"
                            min="0"
                            className="border border-black/50 w-16"
                            value={
                              quantity[item.inventoryId] !== undefined
                                ? quantity[item.inventoryId]
                                : ""
                            }
                            onChange={(e) => {
                              const newValue = e.target.value;
                              // Allow for empty string to clear the input and for valid numbers
                              if (newValue === "" || Number(newValue) >= 0) {
                                handleQuantityChange(
                                  item.inventoryId,
                                  newValue
                                );
                              }
                            }}
                          />
                        </div>
                        <p>{item.status}</p>
                      </div>
                      <button
                        onClick={() => {
                          console.log(
                            `Delete button clicked for inventoryId: ${item.inventoryId}`
                          ); // Debug log
                          handleDelete(item.inventoryId);
                        }}
                        className="ml-auto text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="shadow-xl p-7 pt-10 w-[400px] rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-[16px] text-[#0C0C0C]/90">Total</p>
                  <p className="text-[16px] text-[#0C0C0C]/90">₦{total}</p>
                </div>
                <p className="text-[16px] text-[#0C0C0C]/90">
                  Taxes and shipping calculated at checkout
                </p>
                <button
                  className="w-full bg-[#013299] text-white py-2 px-4 rounded-lg hover:bg-[#2b50a0]"
                  onClick={handleCheckoutClick}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Discoverus />
      <Footer />
    </div>
  );
};

export default Cart;
