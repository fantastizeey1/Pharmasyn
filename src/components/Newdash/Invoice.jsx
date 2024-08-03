import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PaystackPop from "@paystack/inline-js";
import { BASE_URL } from "../../config";
import { NavLink, Link, useLocation } from "react-router-dom";
import Discoverus from "../Landingpage/Discoverus";
import Footer from "../Landingpage/Footer";
import logo from "/logo.jpg";
import cartIcon from "/Cart.svg";
import useCart from "../Dash/useCart";

const Invoice = () => {
  const { cartCount } = useCart();
  const [orders, setOrders] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(""); // User's email
  const [amount, setAmount] = useState(""); // Amount in kobo or subunits
  const [fullName, setFullName] = useState(""); // User's full name

  const getOrder = useCallback(async () => {
    try {
      const bearerToken = sessionStorage.getItem("access_token");
      if (!bearerToken) {
        throw new Error("No access token found in session storage");
      }

      const url = `${BASE_URL}/api/Order/GetOrders`;
      const response = await axios.get(url, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      const responseData = response.data;
      if (responseData) {
        console.log("Fetched order data:", responseData);
        const { orders = [], responseCode, responseMessage } = responseData;

        setOrders(orders);
        setOrderCount(orders.length);

        if (orders.length > 0) {
          // Set the default values for the payment form
          const firstOrder = orders[0];
          setAmount(firstOrder.totalPrice); // Set amount to totalPrice
          setFullName(firstOrder.customerName); // Set fullName to customerName
        }
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
      setError(`An error occurred while fetching order data: ${error.message}`);
    }
  }, []);

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  const verifyPayment = async (reference) => {
    try {
      const bearerToken = sessionStorage.getItem("access_token");
      if (!bearerToken) {
        throw new Error("No access token found in session storage");
      }

      const url = `${BASE_URL}/api/Payment/verify`;
      const response = await axios.post(
        url,
        {
          paymentProvider: 1, // Assuming 1 is the identifier for Paystack
          reference: reference,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      const result = response.data;
      console.log("Transaction reference verified:", result);
    } catch (error) {
      console.error("Error verifying transaction reference:", error);
    }
  };

  const payWithPaystack = (e) => {
    e.preventDefault();

    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: "pk_test_69614cd25da2978b0e84eae7acb536520ae0b5c5", // Replace with your public key
      amount: amount * 100, // Convert to kobo
      email: email,
      metadata: {
        fullName: fullName,
      },
      onSuccess: (transaction) => {
        console.log("Payment successful", transaction);
        const { reference } = transaction;
        // Verify transaction reference
        verifyPayment(reference);
      },
      onCancel: () => {
        console.log("Payment cancelled");
        // Handle payment cancellation here
      },
    });
  };

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-8 text-blue-500">No orders found.</div>
    );
  }

  const order = orders[0];

  return (
    <div className="container mx-auto p-4">
      <header className="xl:mx-[70px] md:mx-[40px] mx-[15px] py-3">
        <div className="flex justify-between items-center">
          <Link to="/">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="Pharmasynthesis Logo"
                className="w-[40px] h-[40px]"
              />
              <p className="text-[#0C0C0C] text-[16px] font-bold">
                Pharmasynthesis
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex flex-1 justify-center items-center">
            <Link
              to="/"
              className="ml-[36px] text-[14px] font-bold hover:scale-110"
              aria-label="Home"
            >
              Home
            </Link>
            <Link
              to="/#about-us"
              className="ml-[36px] text-[14px] font-bold hover:scale-110"
              aria-label="About Us"
            >
              About Us
            </Link>
            <Link
              to="/shop"
              className="ml-[36px] text-[14px] font-bold hover:scale-110"
              aria-label="Shop"
            >
              Marketplace
            </Link>
            <Link
              to="/#contact-us"
              className="ml-[36px] text-[14px] font-bold hover:scale-110"
              aria-label="Contact Us"
            >
              Contact Us
            </Link>
          </nav>

          <div className="flex justify-center items-center">
            <Link
              to="/profile"
              className="ml-[16px] text-[14px] font-bold hover:scale-110"
              aria-label="Log in"
            >
              <div className="w-8 h-8 rounded-full flex justify-center items-center text-[18px] text-white bg-blue-800">
                P
              </div>
            </Link>
            <Link to="/Cart" className="relative">
              <img
                src={cartIcon}
                alt="cart"
                className="w-[24px] ml-4 h-[24px] hover:scale-110"
              />
              {cartCount > 0 && (
                <span className="absolute top-[-5px] right-[-10px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <div className="flex gap-10 mt-10 first-letter:">
        <div>
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

            <div className="flex items-center"></div>
          </div>
        </div>

        <div className="w-[80%]">
          <h1 className="text-2xl font-bold  mb-4">Order Summary</h1>
          <div className="bg-white shadow-lg rounded-lg p-6 w-full">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold  mb-2">
                {order.customerName}
              </h2>
              <h3 className="text-xl font-semibold  mb-2">Order ID: #911419</h3>
            </div>
            <div className="flex justify-between text-[#0C0C0C]/65">
              <p className="">
                Order Date: {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <p className="">
                Total Order Quantity: {order.totalOrderQuantity}
              </p>
            </div>
            {/* <p className="text-[#0C0C0C]/65 mb-4">
              Total Price: ${order.totalPrice.toFixed(2)}
            </p> */}

            <table className="min-w-full bg-white border border-[#CACACA] rounded-xl my-10">
              <thead className="bg-[#F9FAFB]">
                <tr>
                  <th className="py-3 px-4 border-b border-gray-200 text-[#0C0C0C] text-left text-[#0C0C0C]/65 font-medium ">
                    Product
                  </th>
                  <th className="py-3 px-4 border-b border-gray-200 text-center  text-[#0C0C0C]/65 font-medium ">
                    Inventory Name
                  </th>
                  <th className="py-3 px-4 border-b border-gray-200 text-center  text-[#0C0C0C]/65 font-medium ">
                    Quantity
                  </th>
                  <th className="py-3 px-4 border-b border-gray-200 text-center  text-[#0C0C0C]/65 font-medium ">
                    Unit Price
                  </th>
                  <th className="py-3 px-4 border-b border-gray-200 text-right text-[#0C0C0C]/65 font-medium ">
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.orderDetails.map((detail) => (
                  <tr key={detail.inventoryId}>
                    <td className="py-3 px-4 border-b border-gray-200 text-[#0C0C0C]">
                      {detail.inventoryName}
                    </td>
                    <td className="py-3 px-4 border-b text-center  border-gray-200 text-[#0C0C0C]">
                      {detail.vendorName}
                    </td>
                    <td className="py-3 px-4 border-b text-center  border-gray-200 text-[#0C0C0C]">
                      {detail.quantity}
                    </td>
                    <td className="py-3 px-4 border-b text-center border-gray-200 text-[#0C0C0C]">
                      ${detail.unitPrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200 text-[#0C0C0C] text-right">
                      ${detail.totalPrice.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4">
              <div>
                <p className="font-bold mb-2">Order Summary</p>
              </div>

              <div className="flex justify-between text-[#0C0C0C]/65 mb-2">
                <span>Subtotal:</span>
                <span>${order.subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#0C0C0C]/65 mb-2">
                <span>Service Charge:</span>
                <span>${order.serviceCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#0C0C0C]/65 mb-2">
                <span>Delivery Charge:</span>
                <span>${order.deliveryCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold  mt-4">
                <span>Total Price:</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div>
            <section className="w-full bg-white p-8" id="paystack">
              <div className="max-w-md mx-auto bg-blue-500 rounded-lg shadow-md p-6">
                <form onSubmit={payWithPaystack} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-white">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border p-2 w-full rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="amount" className="block text-white">
                      Amount (NGN):
                    </label>
                    <input
                      type="number"
                      id="amount"
                      placeholder="Enter amount in NGN"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      className="border p-2 w-full rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="fullName" className="block text-white">
                      Full Name:
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="border p-2 w-full rounded-md"
                    />
                  </div>
                  <button
                    type="submit"
                    name="pay_now"
                    id="pay-now"
                    title="Pay now"
                    className="bg-white text-blue-500 p-2 rounded-md w-full font-bold"
                  >
                    Pay now
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Discoverus />
      <Footer />
    </div>
  );
};

export default Invoice;
