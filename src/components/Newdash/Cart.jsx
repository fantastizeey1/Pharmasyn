import React, { useState, useEffect } from "react";
import Dashheader from "./Dashheader";
import Discoverus from "../Landingpage/Discoverus";
import Footer from "../Landingpage/Footer";
import Btn from "../Landingpage/Btn";
import useCart from "../Dash/useCart";
import { FiTrash } from "react-icons/fi";

const Cart = () => {
  const {
    cart,
    cartCount,
    fetchCart,
    addToCart,
    updateCart,
    handleCheckout,
    handleEmptyCart,
  } = useCart();

  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartItemCount, setCartItemCount] = useState(0);

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

  const calculateItemCount = () => {
    const itemCount = cart.reduce((total, cartItem) => {
      return (
        total +
        cartItem.cartDetails.reduce(
          (itemTotal, item) => itemTotal + item.quantity,
          0
        )
      );
    }, 0);
    setCartItemCount(itemCount);
  };

  useEffect(() => {
    calculateTotal();
    calculateItemCount();
  }, [cart]);

  const handleQuantityChange = (index, newQuantity, command) => {
    updateCart(index, newQuantity, command);
  };

  const handleIncrease = (index) => {
    const newQuantity = cart[index].quantity + 1;
    handleQuantityChange(index, newQuantity, "add");
  };

  const handleDecrease = (index) => {
    const newQuantity = cart[index].quantity - 1;
    if (newQuantity <= 0) {
      handleDelete(index);
    } else {
      handleQuantityChange(index, newQuantity, "subtract");
    }
  };

  const handleDelete = (index) => {
    updateCart(index, 0, "null");
  };

  const handleSelectItem = (index) => {
    const newSelectedItems = [...selectedItems];
    if (newSelectedItems.includes(index)) {
      newSelectedItems.splice(newSelectedItems.indexOf(index), 1);
    } else {
      newSelectedItems.push(index);
    }
    setSelectedItems(newSelectedItems);
  };

  const handleCheckoutClick = async () => {
    await handleCheckout(selectedItems);
  };

  const handleEmptyCartClick = async () => {
    await handleEmptyCart(); // Use handleEmptyCart here
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
          <div className="flex justify-between">
            <h2 className="border-b-2 border-black pl-[70px] pb-[30px] font-bold text-[30px]">
              MY CART
            </h2>
            <button className=" w-5 h-5" onClick={handleEmptyCartClick}>
              <FiTrash />
            </button>
          </div>

          <div className="mx-[70px] mt-10 flex justify-between items-start ">
            <div className="flex-1 flex flex-row justify-start flex-wrap gap-4 pt-10 items-center">
              {cart.map((cartItem, cartIndex) =>
                cartItem.cartDetails.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex w-[600px] flex-row gap-2 justify-start items-center p-7 shadow-xl rounded-xl"
                  >
                    <img
                      src={item.img || "/suii.jpg"} // Default image if none provided
                      alt={item.productName}
                      className="w-[80px] h-[80px] mr-10"
                    />
                    <div>
                      <h5 className="font-bold text-[24px]">
                        {item.productName}
                      </h5>
                      <p className="mb-3 text-[14px]">₦ {item.unitPrice}</p>
                      <div className="border-2 border-black w-32 h-12 flex justify-around items-center">
                        <button
                          className=" "
                          onClick={() => handleDecrease(cartIndex)}
                        >
                          <p className="text-[35px] -mt-6">-</p>
                        </button>
                        <span className="text-[35px]">{item.quantity}</span>
                        <button
                          className=" "
                          onClick={() => handleIncrease(cartIndex)}
                        >
                          <p className="text-[32px] -mt-4">+</p>
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(cartIndex)}
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
