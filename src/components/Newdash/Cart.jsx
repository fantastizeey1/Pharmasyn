import React, { useState, useEffect, useCallback, useRef } from "react";
import Dashheader from "./Dashheader";
import Discoverus from "../Landingpage/Discoverus";
import Footer from "../Landingpage/Footer";
import Btn from "../Landingpage/Btn";
import { FiTrash } from "react-icons/fi";
import useDebounce from "./UseDeounce";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  useFetchCartQuery,
  useClearCartMutation,
  useUpdateCartMutation,
  useDeleteItemFromCartMutation,
} from "@/Features/cart/cartApi";
import {
  setCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  updateItemQuantity,
  deleteItem,
  setError,
  setTotal,
} from "@/Features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);

  const total = useSelector((state) => state.cart.total);
  const [cart, setCart] = useState([]);
  const [cartIds, setCartIds] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const [quantity, setQuantity] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const { data, error, isLoading } = useFetchCartQuery();
  const [clearCartApi] = useClearCartMutation();
  const [createOrderApi] = useCreateOrderMutation();
  const [updateCartApi] = useUpdateCartMutation();
  const [deleteItemFromCartApi] = useDeleteItemFromCartMutation();

  const debouncedQuantity = useDebounce(quantity, 2000);

  const totalAmount = useSelector((state) => state.cart.total);

  const prevDebouncedQuantity = useRef({});

  React.useEffect(() => {
    if (data) {
      dispatch(setCart(data.cartData));
      sessionStorage.setItem("cartData", JSON.stringify(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (data?.cartData?.length) {
      setCart(data.cartData);
    }
  }, [data]);

  // Function to handle clearing the cart
  const handleEmptyCart = useCallback(async () => {
    try {
      if (!data?.cartData?.length) {
        console.log("Cart is already empty.");
        return;
      }

      // Call the mutation with the first item's cartId
      await clearCartApi(data.cartData[0].cartId).unwrap();

      // Dispatch action to clear the local Redux state
      dispatch(clearCart());
    } catch (error) {
      console.error(`Error clearing cart: ${error.message}`);
      dispatch(setError(`Failed to clear cart: ${error.message}`)); // Update error message for clarity
    }
  }, [data.cartData, clearCartApi, dispatch]);

  // Handle empty cart button click
  const handleEmptyCartClick = async () => {
    await handleEmptyCart();
  };

  // Function to handle quantity change of the cart
  const handleQuantityChange = (inventoryId, newQuantity) => {
    setQuantity((prev) => ({
      ...prev,
      [inventoryId]: newQuantity === "" ? undefined : Number(newQuantity),
    }));
  };

  // Function to handle updating the cart
  const handleUpdateCart = async (inventoryId, newQuantity) => {
    try {
      // Create an updated cart structure based on current data and new quantity
      const updatedCart = [...data.cartData]; // Make a copy of current cart data
      let itemToUpdate = null;
      let cartIndex = null;
      let detailIndex = null;

      // Find the item to update in updatedCart
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
        updatedCart[cartIndex].cartDetails[detailIndex].quantity = newQuantity;
      }

      console.log("Updated Cart:", JSON.stringify(updatedCart));

      // Call the mutation with the updated cart data
      await updateCartApi(updatedCart).unwrap();

      console.log("Cart updated successfully");

      // Dispatch action to update local Redux state with new cart data
      dispatch(setCart(updatedCart));
    } catch (error) {
      console.error(`Error updating cart: ${error.message}`);
      dispatch(setError(`Error updating item: ${error.message}`));
    }
  };

  useEffect(() => {
    const changedQuantities = Object.entries(debouncedQuantity).filter(
      ([key, value]) => prevDebouncedQuantity.current[key] !== value
    );

    if (changedQuantities.length > 0) {
      changedQuantities.forEach(([inventoryId, newQuantity]) => {
        handleUpdateCart(Number(inventoryId), newQuantity);
      });
      prevDebouncedQuantity.current = { ...debouncedQuantity };
    }
  }, [debouncedQuantity, handleUpdateCart]);

  // Function to handle selecting items
  const handleSelectItem = (index) => {
    setSelectedItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  // Function to handle deleting an item
  const handleDeleteItem = async (inventoryId) => {
    try {
      await deleteItemFromCartApi(inventoryId).unwrap(); // Call mutation to delete item
      console.log("Item deleted successfully");
    } catch (error) {
      console.error(`Error removing item from cart: ${error.message}`);
      dispatch(setError(`Error removing item from cart: ${error.message}`));
    }
  };

  // Function to handle checkout
  const handleCheckout = async () => {
    const bearerToken = sessionStorage.getItem("access_token");
    if (!bearerToken || !data?.cartData?.length) {
      console.error("No access token or cart data found");
      return;
    }

    // Prepare payload for checkout
    const payload = data.cartData.map((item) => ({
      cartId: item.cartId,
      approvalStatus: 2,
    }));

    try {
      await createOrderApi(payload).unwrap(); // Call the mutation with payload
      console.log("Order created successfully");

      // Navigate to invoice or confirmation page
      navigate("/Invoice");

      // Clear the cart after successful checkout
      await clearCartApi().unwrap();
    } catch (error) {
      console.error(`Error creating order: ${error.message}`);
      dispatch(setError(`Error creating order: ${error.message}`));
    }
  };

  // Handle checkout button click
  const handleCheckoutClick = () => {
    handleCheckout(
      data.cartData.filter((_, index) => selectedItems.includes(index))
    ); // Only pass selected items to checkout
    console.log("Checkout button clicked");
  };

  // Handle loading state
  if (isLoading) return <div>Loading...</div>;

  // Handle error state
  if (error) return <div>Error fetching cart data: {error.message}</div>;

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
        {cartItems.length === 0 ? (
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
                              if (newValue === "" || newValue >= 0) {
                                handleQuantityChange(
                                  item.inventoryId,
                                  newValue ? Number(newValue) : ""
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
                          handleDeleteItem(item.inventoryId);
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
                  <p className="text-[16px] text-[#0C0C0C]/90">
                    ₦{totalAmount}
                  </p>
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
