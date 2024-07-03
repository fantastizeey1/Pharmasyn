import { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "../../config";

const useCart = (userId) => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null);
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
          cartId: cartId || undefined,
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
            setAlertMessage(null); // Clear the alert message after a certain duration
          }, 3000); // 3000 milliseconds (3 seconds) in this example
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        setError(`An error occurred while adding to cart: ${error.message}`);
      }
    },
    [cartId, fetchCart]
  );

  // Update cart item quantity
  const updateCart = useCallback(
    async (index, newQuantity) => {
      try {
        const updatedCart = [...cart];
        const itemToUpdate = updatedCart[index];

        if (newQuantity <= 0) {
          updatedCart.splice(index, 1);
        } else {
          itemToUpdate.quantity = newQuantity;
        }

        const bearerToken = sessionStorage.getItem("access_token");
        if (!bearerToken) {
          throw new Error("No access token found in session storage");
        }

        const cartUpdatePayload = {
          cartId: cartId || undefined,
          carts: updatedCart.map((item) => ({
            inventoryId: item.inventoryId,
            quantity: item.quantity,
            productName: item.productName,
            status: true,
          })),
        };

        console.log("Updating cart with payload:", cartUpdatePayload);

        const url = `${BASE_URL}/api/Cart/UpdateCart`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
          body: JSON.stringify(cartUpdatePayload),
        });

        if (!response.ok) {
          const responseBody = await response.text();
          throw new Error(
            `HTTP error! Status: ${response.status}, Response: ${responseBody}`
          );
        }

        const responseData = await response.json();
        if (responseData) {
          console.log("Cart updated successfully:", responseData);
          setCart(responseData.cartDetails || []);
        }
      } catch (error) {
        console.error("Error updating cart:", error);
        setError(`An error occurred while updating the cart: ${error.message}`);
      }
    },
    [cart, cartId]
  );

  const handleCheckout = useCallback(
    async (selectedItems) => {
      if (!Array.isArray(selectedItems)) {
        console.error("Selected items is not an array:", selectedItems);
        return;
      }

      const selectedCartItems = selectedItems.map((index) => cart[index]);
      const checkoutPayload = {
        cartId,
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
    [cart, cartId]
  );

  return {
    cart,
    setCart,
    error,
    alertMessage,
    loading,
    checkoutError,
    fetchCart,
    addToCart,
    updateCart,
    handleCheckout,
  };
};

export default useCart;
