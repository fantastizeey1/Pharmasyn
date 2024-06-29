import React, { useState } from "react";

function Cart({ cart, isCartOpen, toggleCart, updateCart, emptyCart }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const calculateTotal = () => {
    return cart
      .reduce((total, item, index) => {
        if (selectedItems.includes(index)) {
          const price = item.price?.retailerPrice;
          return total + item.quantity * (price || 0);
        }
        return total;
      }, 0)
      .toFixed(2);
  };

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

  const handleCheckout = () => {
    const itemsToCheckout = cart.filter((_, index) =>
      selectedItems.includes(index)
    );
    console.log("Proceed to checkout with these items:", itemsToCheckout);
    // Add your checkout logic here
  };

  return (
    <div>
      <div
        className="fixed top-4 right-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
        onClick={toggleCart}
      >
        <span className="text-2xl">🛒</span>
        <span className="ml-2 text-xl">{cart.length}</span>
      </div>
      {isCartOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center transition-opacity duration-300">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg shadow-2xl w-1/3 h-[88vh] overflow-x-hidden overflow-y-auto">
            <div className=" border-b border-gray-700 pb-2 flex flex-1 justify-between items-center mb-1">
              <h3 className="text-2xl text-white ">Your Cart</h3>
              {cart.length > 0 && (
                <button className=" " onClick={emptyCart}>
                  <img
                    src="/trash.svg"
                    alt=""
                    className="w-5 hover:scale-125"
                  />
                </button>
              )}
            </div>
            {cart.length === 0 ? (
              <p className="text-gray-400">No items in cart.</p>
            ) : (
              <div className="">
                <ul className="space-y-2 ">
                  {cart.map((item, index) => (
                    <li
                      key={index}
                      className="flex flex-1  justify-between items-center bg-gray-700 p-3 rounded-lg"
                    >
                      <div className="flex-1 flex  flex-row justify-between items-center ">
                        <div className="flex flex-1 flex-col justify-start items-start">
                          <div className="flex flex-row gap-2 justify-center items-center">
                            <p className="text-white">{item.name}</p>
                            <p className="text-gray-400 text-[12px]">
                              {item.quantity}
                            </p>
                          </div>
                          <div className="">
                            {item.price?.retailerPrice && (
                              <div className="text-white font-bold">
                                ${item.price.retailerPrice}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-center items-center gap-3 ">
                          <div className=" flex flex-col justify-center items-center gap-2 -mt-6">
                            <button
                              className="
                            w-6 h-6 mt-0 text-white "
                              onClick={() => handleIncrease(index)}
                            >
                              +
                            </button>
                            <button
                              className=" text-white w-3 h-3 mt-0"
                              onClick={() => handleDecrease(index)}
                            >
                              -
                            </button>
                          </div>
                          <button
                            className=""
                            onClick={() => handleDelete(index)}
                          >
                            <img
                              src="/trash.svg"
                              alt=""
                              className="w-5 hover:scale-125"
                            />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {cart.length > 0 && (
              <>
                <div className="text-white text-xl mt-4">
                  Total: <span className="ml-36">${calculateTotal()}</span>
                </div>
                <button
                  className="mt-6 w-2/3 bg-green-500 hover:bg-green-700 flex justify-center items-center mx-auto text-[15px]  text-white py-3 rounded-lg transition-colors duration-300"
                  onClick={handleCheckout}
                >
                  Proceed to Payment
                </button>
              </>
            )}
            <button
              className="mt-6 flex justify-center items-center mx-auto bg-red-500 hover:bg-red-700 text-white  rounded-lg transition-colors duration-300"
              onClick={toggleCart}
            >
              &#10006;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
