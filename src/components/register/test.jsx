import { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "../../config";
import axios from "axios";

const useCart = () => {
  const [cart, setCart] = useState([]);
  const [cartIds, setCartIds] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  const fetchCart = useCallback(async () => {
    try {
      const bearerToken = sessionStorage.getItem("access_token");
      if (!bearerToken) {
        throw new Error("No access token found in session storage");
      }

      const url = `${BASE_URL}/api/Cart/GetCart?isCustomer=true`;
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
        setCart(responseData.cartResponse || []);
        setCartCount(responseData.cartCount || 0);

        const ids = responseData.cartResponse.map(
          (cartItem) => cartItem.cartId
        );
        setCartIds(ids);
        console.log("Cart IDs:", ids);

        sessionStorage.setItem("cartData", JSON.stringify(responseData));
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setError(`An error occurred while fetching cart data: ${error.message}`);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = useCallback(
    async (inventory) => {
      try {
        await fetchCart();

        const bearerToken = sessionStorage.getItem("access_token");
        if (!bearerToken) {
          throw new Error("No access token found in session storage");
        }

        const cartAddPayload = {
          cartId: cartIds[0] || undefined,
          carts: {
            inventoryId: inventory.inventoryId,
            quantity: inventory.quantity,
            productName: inventory.inventoryName,
            status: true,
          },
        };

        console.log("Adding to cart with payload:", cartAddPayload);

        const url = `${BASE_URL}/api/Cart/AddToCart`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
          body: JSON.stringify(cartAddPayload),
        });

        if (!response.ok) {
          const responseBody = await response.text();
          throw new Error(
            `HTTP error! Status: ${response.status}, Response: ${responseBody}`
          );
        }

        const responseData = await response.json();
        if (responseData) {
          console.log("Added to cart successfully:", responseData);
          setCart(responseData.cartDetails || []);
          setAlertMessage("Item added to cart successfully!");
          setTimeout(() => {
            setAlertMessage(null);
          }, 3000);
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        setError(`An error occurred while adding to cart: ${error.message}`);
      }
    },
    [cartIds, fetchCart]
  );

  const handleEmptyCart = useCallback(async () => {
    try {
      const bearerToken = sessionStorage.getItem("access_token");
      if (!bearerToken) {
        throw new Error("No access token found in session storage");
      }

      const cartRemovePayload = {
        cartId: cartIds[0],
      };

      const url = `${BASE_URL}/api/Cart/RemoveFromCart`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(cartRemovePayload),
      });

      if (!response.ok) {
        const responseBody = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Response: ${responseBody}`
        );
      }

      const responseData = await response.json();
      if (responseData) {
        console.log("Cart emptied successfully:", responseData);
        setCart([]);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      setError(`An error occurred while clearing the cart: ${error.message}`);
    }
  }, [cartIds]);

  const updateCart = useCallback(
    async (inventoryId, newQuantity, newStatus = true) => {
      try {
        console.log(
          `Updating inventoryId ${inventoryId} to quantity ${newQuantity}`
        );

        // Clone and update the cart
        const updatedCart = cart.map((item) => {
          if (!item || !item.cartDetails || item.cartDetails.length === 0) {
            console.warn("Encountered an item with no cartDetails:", item);
            return item;
          }

          const itemDetails = item.cartDetails[0];
          console.log(
            `Checking item with inventoryId ${itemDetails.inventoryId}`
          );

          if (itemDetails.inventoryId === inventoryId) {
            if (newQuantity <= 0) {
              return null; // Remove item if quantity is <= 0
            } else {
              return {
                ...item,
                cartDetails: [
                  {
                    ...itemDetails,
                    quantity: newQuantity,
                    status: newStatus,
                  },
                ],
              };
            }
          }
          return item;
        }).filter(Boolean); // Remove null items

        console.log("Updated cart:", updatedCart);

        // Check if updatedCart has items
        if (updatedCart.length === 0) {
          throw new Error("No items in the cart to update.");
        }

        const bearerToken = sessionStorage.getItem("access_token");
        if (!bearerToken) {
          throw new Error("No access token found in session storage");
        }

        const cartUpdatePayload = updatedCart.map((item) => ({
          cartId: item.cartId,
          cartCommand: null,
          carts: item.cartDetails.map((detail) => ({
            inventoryId: detail.inventoryId,
            quantity: detail.quantity,
            productName: detail.productName,
            status: true,
          })),
        }));

        console.log("Updating cart with payload:", cartUpdatePayload);

        const url = `${BASE_URL}/api/Cart/UpdateCart`;
        const response = await axios.put(url, cartUpdatePayload, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        const responseData = response.data;
        if (responseData) {
          console.log("Cart updated successfully:", responseData);
          setCart(responseData.cartResponse || []);
          window.location.reload();
        }
      } catch (error) {
        console.error("Error updating cart:", error);
        setError(`An error occurred while updating the cart: ${error.message}`);
      }
    },
    [cart]
  );

  const handleDelete = useCallback(
    async (inventoryId) => {
      try {
        const updatedCart = [...cart];
        const itemToRemove = updatedCart.find(item =>
          item.cartDetails.some(detail => detail.inventoryId === inventoryId)
        );

        if (!itemToRemove || !itemToRemove.cartDetails) {
          throw new Error("Item to remove or its details are missing.");
        }

        const bearerToken = sessionStorage.getItem("access_token");
        if (!bearerToken) {
          throw new Error("No access token found in session storage");
        }

        const cartDeletePayload = [
          {
            cartId: itemToRemove.cartId,
            cartCommand: null,
            carts: itemToRemove.cartDetails.map((detail) => ({
              inventoryId: detail.inventoryId,
              quantity: detail.quantity,
              productName: detail.productName,
              status: false,
            })),
          },
        ];

        const url = `${BASE_URL}/api/Cart/UpdateCart`;
        const response = await axios.put(url, cartDeletePayload, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        console.log("Item removed successfully:", response.data);
        setCart(response.data.cartResponse || []);
        fetchCart(); // Refresh cart data without reloading the page
      } catch (error) {
        console.error("Error removing item from cart:", error);
        setError(`An error occurred while removing the item: ${error.message}`);
      }
    },
    [cart, fetchCart]
  );

  const handleCheckout = useCallback(
    async (selectedItems) => {
      if (!Array.isArray(selectedItems)) {
        console.error("Selected items is not an array:", selectedItems);
        setCheckoutError("Invalid cart items.");
        return;
      }

      try {
        setLoading(true);

        const bearerToken = sessionStorage.getItem("access_token");
        if (!bearerToken) {
          throw new Error("No access token found in session storage");
        }

        const orderPayload = {
          cartId: cartIds[0],
          orders: selectedItems.map((item) => ({
            inventoryId: item.inventoryId,
            quantity: item.quantity,
          })),
        };

        const response = await axios.post(
          `${BASE_URL}/api/Order/CreateOrder`,
          orderPayload,
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Order created successfully:", response.data);

          // Redirect to another page or show a success message
        } else {
          console.error("Error creating order:", response.statusText);
          setCheckoutError("Error creating order. Please try again.");
        }
      } catch (error) {
        console.error("Error creating order:", error);
        setCheckoutError(`Error creating order: ${error.message}`);
      } finally {
        setLoading(false);
      }
    },
    [cartIds]
  );

  return {
    cart,
    cartCount,
    addToCart,
    handleEmptyCart,
    updateCart,
    handleDelete,
    handleCheckout,
    alertMessage,
    error,
    loading,
    checkoutError,
  };
};

export default useCart;

import React, { useState, useEffect, useCallback } from "react";
import Dashheader from "./Dashheader";
import Discoverus from "../Landingpage/Discoverus";
import Footer from "../Landingpage/Footer";
import Btn from "../Landingpage/Btn";
import useCart from "../Dash/useCart";
import { FiTrash } from "react-icons/fi";
import useDebounce from "./UseDeounce";

const Cart = () => {
  const {
    cart,
    cartCount,
    addToCart,
    handleEmptyCart,
    updateCart,
    handleDelete,
    handleCheckout,
    alertMessage,
    error,
    loading,
    checkoutError,
  } = useCart();

  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [quantity, setQuantity] = useState({});

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

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const debouncedQuantity = useDebounce(quantity, 2000);

  useEffect(() => {
    if (Object.keys(debouncedQuantity).length > 0) {
      for (const [inventoryId, newQuantity] of Object.entries(
        debouncedQuantity
      )) {
        updateCart(inventoryId, parseInt(newQuantity, 10), null);
      }
    }
  }, [debouncedQuantity, updateCart]);

  const handleQuantityChange = (inventoryId, newQuantity) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [inventoryId]: newQuantity,
    }));
  };

  const handleSelectItem = (inventoryId) => {
    const newSelectedItems = [...selectedItems];
    if (newSelectedItems.includes(inventoryId)) {
      newSelectedItems.splice(newSelectedItems.indexOf(inventoryId), 1);
    } else {
      newSelectedItems.push(inventoryId);
    }
    setSelectedItems(newSelectedItems);
  };

  const handleCheckoutClick = async () => {
    await handleCheckout(selectedItems);
  };

  const handleEmptyCartClick = async () => {
    await handleEmptyCart();
  };
  const handleDeleteClick = async (inventoryId) => {
    await handleDelete(inventoryId);
  };

  return (
    <div>
      <Dashheader cartCount={cartCount} />
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
        <div>
          <div className="flex justify-around border-b-2 border-black pl-[70px] pb-[30px]">
            <h2 className=" font-bold text-[30px]">MY CART</h2>
            <button className=" w-5 h-5" onClick={handleEmptyCartClick}>
              <FiTrash />
            </button>
          </div>

          <div className="mx-[70px] mt-10 flex justify-between items-start ">
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
                      className="w-[80px] h-[80px] mr-10"
                    />
                    <div>
                      <h5 className="font-bold text-[24px]">
                        {item.productName} <span>{item.inventoryId}</span>
                      </h5>
                      <p className="mb-3 text-[14px]">₦ {item.unitPrice}</p>
                      <div className="border-2 border-black w-32 h-12 flex justify-around items-center">
                        <label>quantity</label>
                        <input
                          type="number"
                          min="1"
                          value={quantity[item.inventoryId] || item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.inventoryId,
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <p>{item.status}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteClick(item.inventoryId)}
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
              <Btn
                title="Checkout"
                linkpath="#"
                className="w-full h-[60px] flex justify-center items-center mt-8 px-2 text-[22px]"
                onClick={handleCheckoutClick}
              />
            </div>
          </div>
        </div>
      )}
      <Discoverus />
      <Footer />
    </div>
  );
};

export default Cart;
