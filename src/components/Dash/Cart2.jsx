import React, { useState, useEffect } from "react";
import useCart from "./useCart"; // Adjust this path if necessary

function Cart2({ userId }) {
  const { cart, setCart, updateCart, error, handleCheckout } = useCart(userId);
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = cart
        .reduce((total, item) => {
          const price = parseFloat(item.price);
          return total + item.quantity * (price || 0);
        }, 0)
        .toFixed(2);
      setTotal(totalAmount);
    };
    calculateTotal();
    console.log("Cart updated in Cart2 component:", cart);
  }, [cart]);

  const handleIncrease = (index) => {
    updateCart(index, cart[index].quantity + 1);
  };

  const handleDecrease = (index) => {
    const item = cart[index];
    if (item.quantity === 1) {
      const shouldRemove = window.confirm(
        "Decreasing the quantity to 0 will remove the item from the cart. Are you sure you want to continue?"
      );
      if (shouldRemove) {
        updateCart(index, 0);
      }
    } else {
      updateCart(index, item.quantity - 1);
    }
  };

  const handleDelete = (index) => {
    updateCart(index, 0);
  };

  const handleCheckboxChange = (index) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">My Cart</h2>
        {cart.length === 0 ? (
          <div className="text-center">
            <img
              src="/path/to/empty-cart-image.png" // Update the path to the image
              alt="Empty cart"
              className="w-32 h-32 mx-auto mb-4"
            />
            <p className="text-gray-500">Your cart is empty.</p>
            <button
              onClick={() => (window.location.href = "/shop")}
              className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Shop
            </button>
          </div>
        ) : (
          <div>
            <ul className="space-y-4">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-200 p-4 rounded-lg"
                >
                  <div className="flex flex-col">
                    <p className="font-bold">{item.productName}</p>
                    <p className="text-gray-600">
                      {item.quantity} x ${item.price}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleIncrease(index)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleDecrease(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-right">
              <p className="text-xl font-bold">Total: ${total}</p>
              <button
                onClick={() => handleCheckout(selectedItems)}
                className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart2;
