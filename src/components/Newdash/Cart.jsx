import React, { useState, useEffect } from "react";
import Dashheader from "./Dashheader";
import Discoverus from "../Landingpage/Discoverus";
import Footer from "../Landingpage/Footer";
import Btn from "../Landingpage/Btn";
import useCart from "../Dash/useCart";

const Cart = ({}) => {
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const { cart, setCart, updateCart, error, handleCheckout } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);

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
    setIsCartEmpty(cart.length === 0);
  };

  useEffect(() => {
    calculateTotal();
    console.log("Cart updated in Cart component:", cart);
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

  const handleCheckoutClick = () => {
    handleCheckout(selectedItems);
  };

  return (
    <div>
      <Dashheader />
      {isCartEmpty ? (
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
          <h2 className="border-b-2 border-black pl-[70px] pb-[30px] font-bold text-[30px]">
            MY CART
          </h2>
          <div className="mx-[70px] mt-10 flex justify-between items-start ">
            <div className="flex-1 flex flex-row justify-start flex-wrap gap-4 pt-10 items-center">
              {cart.map((cartItem) =>
                cartItem.cartDetails.map((item, index) => (
                  <div
                    key={index}
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
                          onClick={() => handleDecrease(index)}
                        >
                          <p className="text-[35px] -mt-6">-</p>
                        </button>
                        <span className="text-[35px]">{item.quantity}</span>
                        <button
                          className=" "
                          onClick={() => handleIncrease(index)}
                        >
                          <p className="text-[32px] -mt-4">+</p>
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(index)}
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
