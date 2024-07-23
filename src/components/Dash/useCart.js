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
    setQuantity((prev) => ({ ...prev, [inventoryId]: newQuantity }));
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
    cart,
    cartCount,
    setCart,
    error,
    alertMessage,
    loading,
    checkoutError,
    fetchCart,
    addToCart,
    updateCart,
    handleCheckout,
    handleEmptyCart,
  };
};

export default useCart;
