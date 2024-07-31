import React, { useState } from "react";
import PaystackPop from "@paystack/inline-js";

const PayStack = () => {
  const [email, setEmail] = useState(""); // User's email
  const [amount, setAmount] = useState(""); // Amount in kobo or subunits
  const [fullName, setFullName] = useState(""); // User's full name

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
        // Handle successful payment here
      },
      onCancel: () => {
        console.log("Payment cancelled");
        // Handle payment cancellation here
      },
    });
  };

  return (
    <section className="w-full bg-white p-8">
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
  );
};

export default PayStack;
