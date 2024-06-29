import React, { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "../../config";

const Invoice = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const url = `${BASE_URL}/api/Order/GetOrders`;
      console.log("API URL:", url);

      const bearerToken = sessionStorage.getItem("access_token");
      if (!bearerToken) {
        throw new Error("No access token found in session storage");
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "69420",
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
      console.log("API Response:", responseData);

      if (!responseData) {
        throw new Error("No data found in the response");
      }

      setData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(
        `An error occurred while fetching data: ${error.message}. Please try again later.`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const {
    customerName,
    orderDetails,
    totalOrderPrice,
    orderDate,
    deliveryCharge,
    valueAddedTax,
  } = data;

  const invoiceDate = new Date(orderDate);
  const dueDate = new Date(invoiceDate);
  dueDate.setDate(invoiceDate.getDate() + 1);

  const formattedInvoiceDate = invoiceDate.toLocaleDateString();
  const formattedDueDate = dueDate.toLocaleDateString();

  return (
    <div
      className="w-full p-2 flex flex-col flex-1 overflow-y-hidden"
      style={{ height: "100%" }}
    >
      <div className="overflow-y-auto" style={{ height: "90vh" }}>
        <div className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded">
          <h2 className="text-2xl font-bold mb-6">INVOICE</h2>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p>Address</p>
              <p>23481025387753</p>
              <p>suiiiii@gmail.com</p>
            </div>
            <div>
              <p>
                <span className="font-bold">Invoice No:</span> INV-000020
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="mb-8">
              <h3 className="text-xl font-semibold">Bill To</h3>
              <p>{customerName}</p>
              <p>more info</p>
            </div>
            <div className="mb-8">
              <p>
                <span className="font-bold">Invoice Created on:</span>{" "}
                {formattedInvoiceDate}
              </p>
              <p>
                <span className="font-bold">Invoice Due Date:</span>{" "}
                {formattedDueDate}
              </p>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-center mb-2">
              Order Details
            </h3>
            {orderDetails.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-4">
                  <p className="mb-2">{item.inventoryName}</p>
                  <p className="text-right text-red-500">
                    ₦{item.unitPrice.toFixed(2)}
                  </p>
                </div>
                <div className="flex mb-4 w-[20%] justify-between">
                  <p>{item.quantity} </p> x
                  <p className="text-right text-red-500">
                    ₦{item.unitPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mb-8">
            <p>
              <span className="font-bold">Sub Total:</span>
            </p>
            <p>₦{totalOrderPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center mb-8">
            <p>
              <span className="font-bold">Shipping Fee:</span>
            </p>
            <p>₦{deliveryCharge.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center mb-8">
            <p>
              <span className="font-bold">VAT:</span>
            </p>
            <p>₦{valueAddedTax.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center mb-8">
            <p>
              <span className="font-bold">Total:</span>
            </p>
            <p>
              ₦{(totalOrderPrice + deliveryCharge + valueAddedTax).toFixed(2)}
            </p>
          </div>
          <div>
            <p>You can remit payment to:</p>
            {/* Add your payment details here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
