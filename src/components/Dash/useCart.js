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
    [cartIds]
  );

  const handleCheckout = useCallback(
    async (selectedItems) => {
      if (!Array.isArray(selectedItems)) {
        console.error("Selected items is not an array:", selectedItems);
        return;
      }

      const selectedCartItems = selectedItems.map((index) => cart[index]);
      const checkoutPayload = {
        cartId: cartIds[0],
      };

      try {
        const bearerToken = sessionStorage.getItem("access_token");
        if (!bearerToken) {
          throw new Error("No access token found in session storage");
        }

        const url = `${BASE_URL}/api/Order/CreateOrder`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
          body: JSON.stringify(checkoutPayload),
        });

        if (!response.ok) {
          const responseBody = await response.text();
          throw new Error(
            `HTTP error! Status: ${response.status}, Response: ${responseBody}`
          );
        }

        const responseData = await response.json();
        if (responseData) {
          console.log("Checkout successful:", responseData);
          setCart([]);
        }
      } catch (error) {
        console.error("Error during checkout:", error);
        setCheckoutError(`An error occurred during checkout: ${error.message}`);
      }
    },
    [cart, cartIds]
  );

  return {
    // cart,
    // cartCount,
    // setCart,
    // error,
    // alertMessage,
    // loading,
    // checkoutError,
    // fetchCart,
    // addToCart,
    // updateCart,
    // handleCheckout,
    // handleEmptyCart,
  };
};

export default useCart;
