import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import FileUploadWithPreview from "./FileUploadWithPreview ";

const ProductTable = () => {
  const [showModal, setShowModal] = useState(false);

  const products = [
    {
      name: "Azithral 500 Tablet",
      price: "₦2430",
      quantity: "43 Packets",
      id: "2222222222",
      expiry: "11/12/24",
      availability: "In-stock",
    },
    {
      name: "Azithral 500 Tablet",
      price: "₦7257",
      quantity: "22 Packets",
      id: "2222222222",
      expiry: "21/12/24",
      availability: "Out of stock",
    },
    {
      name: "Azithral 500 Tablet",
      price: "₦5405",
      quantity: "36 Packets",
      id: "2222222222",
      expiry: "5/12/24",
      availability: "In-stock",
    },
    {
      name: "Azithral 500 Tablet",
      price: "₦8502",
      quantity: "14 Packets",
      id: "2222222222",
      expiry: "8/12/24",
      availability: "Out of stock",
    },
    {
      name: "Azithral 500 Tablet",
      price: "₦3530",
      quantity: "5 Packets",
      id: "2222222222",
      expiry: "9/1/24",
      availability: "In-stock",
    },
    {
      name: "Azithral 500 Tablet",
      price: "₦7605",
      quantity: "10 Packets",
      id: "2222222222",
      expiry: "9/1/24",
      availability: "In-stock",
    },
    {
      name: "Azithral 500 Tablet",
      price: "₦6408",
      quantity: "23 Packets",
      id: "2222222222",
      expiry: "15/12/24",
      availability: "Out of stock",
    },
    {
      name: "Azithral 500 Tablet",
      price: "₦3359",
      quantity: "43 Packets",
      id: "2222222222",
      expiry: "6/6/24",
      availability: "In-stock",
    },
    {
      name: "Azithral 500 Tablet",
      price: "₦9205",
      quantity: "41 Packets",
      id: "2222222222",
      expiry: "11/11/24",
      availability: "Low stock",
    },
  ];

  return (
    <div className=" p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Products</h2>
        <button
          className="bg-[#013299] text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Add Product
        </button>
      </div>
      <table className="w-full bg-white border border-gray-300">
        <thead>
          <tr className="w-[273px] bg-gray-100 text-left">
            <th className="px-4 py-2 border-r">Product Name</th>
            <th className="px-4 py-2 border-r">Buying Price</th>
            <th className="px-4 py-2 border-r">Quantity</th>
            <th className="px-4 py-2 border-r">Product ID</th>
            <th className="px-4 py-2 border-r">Expiry Date</th>
            <th className="px-4 py-2">Availability</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="w-[273px] border-t">
              <td className="px-4 py-2 border-r">{product.name}</td>
              <td className="px-4 py-2 border-r">{product.price}</td>
              <td className="px-4 py-2 border-r">{product.quantity}</td>
              <td className="px-4 py-2 border-r">{product.id}</td>
              <td className="px-4 py-2 border-r">{product.expiry}</td>
              <td className="px-4 py-2  text-end">
                <span
                  className={`font-semibold ${
                    product.availability === "In-stock"
                      ? "text-green-500"
                      : product.availability === "Out of stock"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {product.availability}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button className="border border-[#D0D3D9] hover:bg-[#D0D3D9] px-4 py-2 rounded">
          Previous
        </button>
        <button className="border border-[#D0D3D9] hover:bg-[#D0D3D9] px-4 py-2 rounded">
          Next
        </button>
      </div>

      {showModal && (
        <div className="fixed  py-4 inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg h-[90%] overflow-y-auto p-6 w-[500px]">
            <h2 className="text-xl font-semibold mb-2">New Product</h2>
            <div className="mb-2">
              <FileUploadWithPreview />
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between">
                <label className="block font-medium text-[16px] text-[#0C0C0C]/80">
                  Product Name
                </label>
                <input
                  type="text"
                  className="w-[273px] border border-gray-300 p-2 rounded mt-1 placeholder:text-[#0C0C0C]/50 placeholder:text-[16px] "
                  placeholder="Enter product name"
                />
              </div>
              <div className="flex justify-between">
                <label className="block font-medium text-[16px] text-[#0C0C0C]/80">
                  Product ID
                </label>
                <input
                  type="text"
                  className="w-[273px] border border-gray-300 p-2 rounded mt-1 placeholder:text-[#0C0C0C]/50 placeholder:text-[16px]"
                  placeholder="Enter product ID"
                />
              </div>
              <div className="flex justify-between">
                <label className="block font-medium text-[16px] text-[#0C0C0C]/80">
                  Category
                </label>
                <select className="w-[273px] border border-gray-300 p-2 rounded mt-1 placeholder:text-[#0C0C0C]/50 placeholder:text-[16px]">
                  <option className="text-[#0C0C0C]/50 text-[16px]">
                    Select product category
                  </option>
                </select>
              </div>
              <div className="flex justify-between">
                <label className="block font-medium text-[16px] text-[#0C0C0C]/80">
                  Buying Price
                </label>
                <input
                  type="text"
                  className="w-[273px] border border-gray-300 p-2 rounded mt-1 placeholder:text-[#0C0C0C]/50 placeholder:text-[16px]"
                  placeholder="Enter buying price"
                />
              </div>
              <div className="flex justify-between">
                <label className="block font-medium text-[16px] text-[#0C0C0C]/80">
                  Quantity
                </label>
                <input
                  type="text"
                  className="w-[273px] border border-gray-300 p-2 rounded mt-1 placeholder:text-[#0C0C0C]/50 placeholder:text-[16px]"
                  placeholder="Enter product quantity"
                />
              </div>
              <div className="flex justify-between">
                <label className="block font-medium text-[16px] text-[#0C0C0C]/80">
                  Unit
                </label>
                <input
                  type="text"
                  className="w-[273px] border border-gray-300 p-2 rounded mt-1 placeholder:text-[#0C0C0C]/50 placeholder:text-[16px]"
                  placeholder="Enter product unit"
                />
              </div>
              <div className="flex justify-between">
                <label className="block font-medium text-[16px] text-[#0C0C0C]/80">
                  Expiry Date
                </label>
                <input
                  type="date"
                  className="w-[273px] border border-gray-300 p-2 rounded mt-1 placeholder:text-[#0C0C0C]/50 placeholder:text-[16px]"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                className=" px-4 py-2 text-[#0C0C0C]/50 rounded border border-[#acacad] hover:bg-current"
                onClick={() => setShowModal(false)}
              >
                Discard
              </button>
              <button className="bg-[#013299] text-white px-4 py-2 rounded">
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
