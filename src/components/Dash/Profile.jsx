import React, { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    address: "1234 Elm Street, Springfield, USA",
    profilePicture: "https://via.placeholder.com/150",
    verified: true, // Add verification status
  });

  const [orders, setOrders] = useState([
    {
      id: 1,
      date: "2023-05-20",
      total: 120.0,
      status: "Delivered",
      items: ["Item 1", "Item 2"],
    },
    {
      id: 2,
      date: "2023-04-15",
      total: 85.5,
      status: "Shipped",
      items: ["Item 3"],
    },
  ]);

  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 59.99,
    },
    {
      id: 2,
      name: "Smartwatch",
      price: 199.99,
    },
  ]);

  useEffect(() => {
    // Fetch user data, orders, and wishlist from the API here.
    // For the sake of example, we're using hardcoded data.
  }, []);

  const handleRemoveFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="profile-page">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Your Account</h1>

        <div className="flex flex-col md:flex-row flex-wrap gap-6 overflow-y-auto overflow-x-hidden h-[80vh] p-3 mb-6">
          {/* Profile Picture Section */}
          <div className="flex-1 md:flex-none md:w-1/3">
            <h2 className="text-[16px] font-bold mb-2">Profile Picture</h2>
            <div className="bg-white p-4 rounded shadow-md text-center">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="mb-4 mx-auto rounded-full w-32 h-32 object-cover"
              />
              <p className="mb-2">
                <strong>Name:</strong> {user.name}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="mb-2">
                <strong>Address:</strong> {user.address}
              </p>
              <button className="bg-blue-500 text-[16px] text-white px-4 py-2 rounded-lg">
                Edit Account Information
              </button>
              {user.verified && (
                <div className="mt-2 text-green-600 font-bold">
                  Verified <span className="ml-1">✔️</span>
                </div>
              )}
            </div>
          </div>

          {/* Account Information Section */}
          <div className="flex-1 w-full md:w-2/3">
            <h2 className="text-[16px] font-bold mb-2">Account Information</h2>
            <div className="bg-white p-4 rounded shadow-md">
              <p className="mb-2">
                <strong>Name:</strong> {user.name}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="mb-2">
                <strong>Address:</strong> {user.address}
              </p>
            </div>
          </div>

          {/* Order History Section */}
          <div className="flex-1 w-full">
            <h2 className="text-[16px] font-bold mb-2">Order History</h2>
            <div className="bg-white p-4 rounded shadow-md overflow-x-auto">
              {orders.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2">Order ID</th>
                      <th className="py-2">Date</th>
                      <th className="py-2">Total</th>
                      <th className="py-2">Status</th>
                      <th className="py-2">Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="border px-4 py-2">{order.id}</td>
                        <td className="border px-4 py-2">{order.date}</td>
                        <td className="border px-4 py-2">${order.total}</td>
                        <td className="border px-4 py-2">{order.status}</td>
                        <td className="border px-4 py-2">
                          {order.items.join(", ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Wishlist Section */}
          <div className="flex-1 w-full">
            <h2 className="text-[16px] font-bold mb-2">Wishlist</h2>
            <div className="bg-white p-4 rounded shadow-md">
              {wishlist.length === 0 ? (
                <p>No items in wishlist.</p>
              ) : (
                <ul>
                  {wishlist.map((item) => (
                    <li
                      key={item.id}
                      className="mb-2 flex justify-between items-center"
                    >
                      <span>{item.name}</span>
                      <span>${item.price}</span>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleRemoveFromWishlist(item.id)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Account Settings Section */}
          <div className="flex-1 w-full">
            <h2 className="text-[16px] font-bold mb-2">Account Settings</h2>
            <div className="bg-white p-4 rounded shadow-md">
              <p className="mb-2">Change Password</p>
              <p className="mb-2">Notification Preferences</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Manage Settings
              </button>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className="flex-1 w-full">
            <h2 className="text-[16px] font-bold mb-2">Payment Methods</h2>
            <div className="bg-white p-4 rounded shadow-md">
              <p className="mb-2">Visa ending in 1234</p>
              <p className="mb-2">MasterCard ending in 5678</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Manage Payment Methods
              </button>
            </div>
          </div>

          {/* Address Book Section */}
          <div className="flex-1 w-full">
            <h2 className="text-[16px] font-bold mb-2">Address Book</h2>
            <div className="bg-white p-4 rounded shadow-md">
              <p className="mb-2">1234 Elm Street, Springfield, USA</p>
              <p className="mb-2">5678 Oak Street, Metropolis, USA</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Manage Addresses
              </button>
            </div>
          </div>

          {/* Verification Status Section */}
          <div className="flex-1 w-full">
            <h2 className="text-[16px] font-bold mb-2">Verification Status</h2>
            <div className="bg-white p-4 rounded shadow-md">
              <p className="mb-2">
                <strong>Email Verified:</strong> {user.verified ? "Yes" : "No"}
              </p>
              <p className="mb-2">
                <strong>Phone Verified:</strong> {user.verified ? "Yes" : "No"}
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Verify Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
