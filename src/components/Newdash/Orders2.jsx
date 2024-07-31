import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PaystackPop from "@paystack/inline-js";
import { BASE_URL } from "../../config";

const Orders2 = () => {
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

  const saveTransactionReference = async (reference) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/Order/SaveTransactionReference`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ reference }),
        }
      );
      const result = await response.json();
      console.log("Transaction reference saved:", result);
    } catch (error) {
      console.error("Error saving transaction reference:", error);
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
        // Save transaction reference
        saveTransactionReference(reference);
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
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Order Summary</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-500 mb-2">
          {order.customerName}
        </h2>
        <p className="text-gray-700">
          Order Date: {new Date(order.orderDate).toLocaleDateString()}
        </p>
        <p className="text-gray-700">
          Total Order Quantity: {order.totalOrderQuantity}
        </p>
        <p className="text-gray-700 mb-4">
          Total Price: ${order.totalPrice.toFixed(2)}
        </p>

        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 text-left text-blue-600">
                Inventory Name
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left text-blue-600">
                Quantity
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left text-blue-600">
                Unit Price
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left text-blue-600">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            {order.orderDetails.map((detail) => (
              <tr key={detail.inventoryId}>
                <td className="py-2 px-4 border-b border-gray-200">
                  {detail.inventoryName}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {detail.quantity}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  ${detail.unitPrice.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  ${detail.totalPrice.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal:</span>
            <span>${order.subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Service Charge:</span>
            <span>${order.serviceCharge.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Delivery Charge:</span>
            <span>${order.deliveryCharge.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-blue-600 mt-4">
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
  );
};

export default Orders2;
