import React, { useState, useEffect } from "react";
import Dashheader from "./Dashheader";
import Discoverus from "../Landingpage/Discoverus";
import Footer from "../Landingpage/Footer";
import Btn from "../Landingpage/Btn";
import useCart from "../Dash/useCart";

const Cart = ({ userId }) => {
  // State to check if the cart is empty
  const [isCartEmpty, setIsCartEmpty] = useState(true);
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
    <div>
      <Dashheader />
      {/* {isCartEmpty ? (
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
            className=" w-[800px] h-[90px] flex justify-center items-center px-2 text-[30px]"
          />
        </div>
      ) : (
        <div className="flex justify-start items-center flex-col">
          <h2 className="font-bold mb-[60px]">Cart Items</h2>
        </div>
      )} */}

      <div>
        <h2 className="border-b-2 border-black pl-[70px] pb-[30px]">
          MY CARTS
        </h2>
        <div className="mx-[70px] mt-10 flex justify-between items-start ">
          <div className="flex-1 flex flex-row justify-start flex-wrap gap-4 pt-10 items-center">
            <div className="flex w-[600px] flex-row gap-2 justify-start items-center p-7 shadow-xl rounded-xl">
              <img
                src="/baconil.svg"
                alt=""
                className="w-[80px] h-[80px] mr-10"
              />
              <div>
                <h5 className="font-bold text-[24px]">
                  Emzor paracetamol 1000 capsules
                </h5>
                <p className="mb-3 text-[14px]">₦ 900.00</p>
                <div className="border-2 border-black w-32 h-12 flex justify-around items-center">
                  <button className=" " onClick={() => handleDecrease(index)}>
                    <p className="text-[35px] -mt-6">-</p>
                  </button>
                  <span className="text-[35px]">1</span>
                  <button className=" " onClick={() => handleIncrease(index)}>
                    <p className="text-[32px] -mt-4">+</p>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex w-[600px] flex-row gap-2 justify-start items-center p-7 shadow-xl rounded-xl">
              <img
                src="/baconil.svg"
                alt=""
                className="w-[80px] h-[80px] mr-10"
              />
              <div>
                <h5 className="font-bold text-[24px]">
                  Emzor paracetamol 1000 capsules
                </h5>
                <p className="mb-3 text-[14px]">₦ 900.00</p>
                <div className="border-2 border-black w-32 h-12 flex justify-around items-center">
                  <button className=" " onClick={() => handleDecrease(index)}>
                    <p className="text-[35px] -mt-6">-</p>
                  </button>
                  <span className="text-[35px]">1</span>
                  <button className=" " onClick={() => handleIncrease(index)}>
                    <p className="text-[32px] -mt-4">+</p>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex w-[600px] flex-row gap-2 justify-start items-center p-7 shadow-xl rounded-xl">
              <img
                src="/baconil.svg"
                alt=""
                className="w-[80px] h-[80px] mr-10"
              />
              <div>
                <h5 className="font-bold text-[24px]">
                  Emzor paracetamol 1000 capsules
                </h5>
                <p className="mb-3 text-[14px]">₦ 900.00</p>
                <div className="border-2 border-black w-32 h-12 flex justify-around items-center">
                  <button className=" " onClick={() => handleDecrease(index)}>
                    <p className="text-[35px] -mt-6">-</p>
                  </button>
                  <span className="text-[35px]">1</span>
                  <button className=" " onClick={() => handleIncrease(index)}>
                    <p className="text-[32px] -mt-4">+</p>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex w-[600px] flex-row gap-2 justify-start items-center p-7 shadow-xl rounded-xl">
              <img
                src="/baconil.svg"
                alt=""
                className="w-[80px] h-[80px] mr-10"
              />
              <div>
                <h5 className="font-bold text-[24px]">
                  Emzor paracetamol 1000 capsules
                </h5>
                <p className="mb-3 text-[14px]">₦ 900.00</p>
                <div className="border-2 border-black w-32 h-12 flex justify-around items-center">
                  <button className=" " onClick={() => handleDecrease(index)}>
                    <p className="text-[35px] -mt-6">-</p>
                  </button>
                  <span className="text-[35px]">1</span>
                  <button className=" " onClick={() => handleIncrease(index)}>
                    <p className="text-[32px] -mt-4">+</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="shadow-xl p-7 pt-10 w-[400px] h-[200px] rounded-xl">
            <p className="text-[16px] text-[#0C0C0C]/90">
              Total <span className="text-end">$900</span>
            </p>
            <p className="text-[16px] text-[#0C0C0C]/90">
              {" "}
              Taxes and shipping calculated at checkout{" "}
            </p>
          </div>
        </div>
      </div>
      <Discoverus />
      <Footer />
    </div>
  );
};

export default Cart;
