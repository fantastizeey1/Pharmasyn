import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";

const useCart = (userId) => {
  const [cart, setCart] = useState([]);
  const [cartIds, setCartIds] = useState([]);
  const [cartCount, setCartCount] = useState(0); // New state for cart count
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  // Fetch cart data from the server
  const fetchCart = useCallback(async () => {
    try {
      const bearerToken = sessionStorage.getItem("access_token");
      if (!bearerToken) {
        throw new Error("No access token found in session storage");
      }

      const url = `${BASE_URL}/api/Cart/GetCart?isCustomer=true`;
      const response = await axios.get(url, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      const responseData = response.data;
      if (responseData) {
        console.log("Fetched cart data:", responseData);
        setCart(responseData.cartResponse[0]?.cartDetails || []);
        setCartCount(responseData.cartCount || 0); // Set the cart count

        // Store and log cart IDs
        const ids = responseData.cartResponse.map(
          (cartItem) => cartItem.cartId
        );
        console.log("Extracted Cart IDs:", ids);
        setCartIds(ids);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setError(`An error occurred while fetching cart data: ${error.message}`);
    }
  }, []);

  // Fetch initial cart data on component mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Add item to the cart
  const addToCart = useCallback(
    async (inventory) => {
      try {
        await fetchCart(); // Ensure cart is up to date

        const bearerToken = sessionStorage.getItem("access_token");
        if (!bearerToken) {
          throw new Error("No access token found in session storage");
        }

        const cartAddPayload = {
          cartId: cartIds[0] || undefined, // Use the first cart ID or undefined
          carts: {
            inventoryId: inventory.inventoryId,
            quantity: inventory.quantity,
            productName: inventory.inventoryName,
            status: true,
          },
        };

        console.log("Adding to cart with payload:", cartAddPayload);

        const url = `${BASE_URL}/api/Cart/AddToCart`;
        const response = await axios.post(url, cartAddPayload, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        const responseData = response.data;
        if (responseData) {
          console.log("Added to cart successfully:", responseData);
          setCart(responseData.cartDetails || []);
          setAlertMessage("Item added to cart successfully!");
          setTimeout(() => {
            setAlertMessage(null); // Clear the alert message after a certain duration
          }, 3000); // 3000 milliseconds (3 seconds) in this example
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
        cartId: cartIds[0], // Use the first cart ID
      };

      const url = `${BASE_URL}/api/Cart/RemoveFromCart`;
      const response = await axios.post(url, cartRemovePayload, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      const responseData = response.data;

      if (!response.ok) {
        const responseBody = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Response: ${responseBody}`
        );
      }
    } catch (error) {
      console.log("Error clearing cart:", error);
    }
  }, [cartIds]);

  // Update cart item quantity
  const updateCart = useCallback(
    async (index, newQuantity, cartCommand) => {
      try {
        const itemToUpdate = cart[index];

        const bearerToken = sessionStorage.getItem("access_token");
        if (!bearerToken) {
          throw new Error("No access token found in session storage");
        }

        const cartUpdatePayload = [
          {
            cartId: cartIds[0] || undefined, // Use the first cart ID or undefined
            cartCommand,
            carts: [
              {
                inventoryId: itemToUpdate.inventoryId,
                quantity: newQuantity,
                productName: null,
                status: true,
              },
            ],
          },
        ];

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
          setCart(responseData.cartDetails || []);
        }
      } catch (error) {
        console.error("Error updating cart:", error);
        setError(`An error occurred while updating the cart: ${error.message}`);
      }
    },
    [cart, cartIds]
  );

  const handleIncrease = useCallback(
    (index) => {
      const newQuantity = cart[index].quantity + 1;
      updateCart(index, newQuantity, "add");
    },
    [cart, updateCart]
  );

  const handleDecrease = useCallback(
    (index) => {
      const newQuantity = cart[index].quantity - 1;
      if (newQuantity <= 0) {
        handleDelete(index); // Handle deletion if quantity becomes 0 or less
      } else {
        updateCart(index, newQuantity, "subtract");
      }
    },
    [cart, updateCart]
  );

  const handleDelete = useCallback(
    async (index) => {
      const itemToDelete = cart[index];
      await updateCart(index, 0, "delete");
      setCart((prevCart) =>
        prevCart.filter((item) => item.inventoryId !== itemToDelete.inventoryId)
      );
    },
    [cart, updateCart]
  );

  const handleCheckout = useCallback(
    async (selectedItems) => {
      if (!Array.isArray(selectedItems)) {
        console.error("Selected items is not an array:", selectedItems);
        return;
      }

      const selectedCartItems = selectedItems.map((index) => cart[index]);
      const checkoutPayload = {
        cartId: cartIds[0], // Use the first cart ID
        items: selectedCartItems.map((item) => ({
          inventoryId: item.inventoryId,
          quantity: item.quantity,
        })),
      };

      try {
        const bearerToken = sessionStorage.getItem("access_token");
        if (!bearerToken) {
          throw new Error("No access token found in session storage");
        }

        const url = `${BASE_URL}/api/Order/CreateOrder`;
        const response = await axios.post(url, checkoutPayload, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        const responseData = response.data;
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
    setCart,
    cartCount, // Return cartCount as well
    error,
    alertMessage,
    loading,
    checkoutError,
    fetchCart,
    addToCart,
    updateCart,
    handleIncrease, // Add handleIncrease to the return object
    handleDecrease, // Add handleDecrease to the return object
    handleCheckout,
    handleEmptyCart,
  };
};

export default useCart;
