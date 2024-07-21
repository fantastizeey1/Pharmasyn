import { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "../../config";

const useCart = (userId) => {
  const [cart, setCart] = useState([]);
  const [cartIds, setCartIds] = useState([]);
  const [cartCount, setCartCount] = useState(0); // New state for cart count
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
        setCartCount(responseData.cartCount || 0); // Set the cart count

        const ids = responseData.cartResponse.map(
          (cartItem) => cartItem.cartId
        );
        setCartIds(ids);
        console.log("Cart IDs:", ids);
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
          cartId: cartIds[0] || undefined,
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
          method: "PUT",
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
    [cart, cartIds]
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
    cartCount, // Return cartCount as well
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
