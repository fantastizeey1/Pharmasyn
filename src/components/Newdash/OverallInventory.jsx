import React from "react";

const OverallInventory = () => {
  return (
    <div className=" w-full flex flex-col  p-3 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Overall Inventory</h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col items-start w-full border-r border-[#F0F1F3]">
          <h3 className="text-blue-500 text-lg font-semibold">Categories</h3>
          <div className="flex items-start flex-col ">
            <p className="text-2xl font-bold">14</p>
            <p className="text-gray-500">Last 7 days</p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center w-full px-4 border-r border-[#F0F1F3]">
          <h3 className="text-cyan-500 text-lg font-semibold">
            Total Products
          </h3>
          <div className="flex justify-between w-full">
            <div className="flex items-start flex-col">
              <p className="text-2xl font-bold">868</p>
              <p className="text-gray-500">Last 7 days</p>
            </div>

            <div className="flex items-end flex-col">
              <p className="text-2xl font-bold ">₦25000</p>
              <p className="text-gray-500">Revenue</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start w-full px-4 border-r border-[#F0F1F3]">
          <h3 className="text-purple-500 text-lg font-semibold">Top Selling</h3>
          <div className="flex justify-between w-full">
            <div className="flex items-start flex-col">
              <p className="text-2xl font-bold">5</p>
              <p className="text-gray-500">Last 7 days</p>
            </div>
            <div className="flex items-end flex-col">
              <p className="text-2xl font-bold">₦24500</p>
              <p className="text-gray-500">Cost</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start w-full px-4 ">
          <h3 className="text-red-500 text-lg font-semibold">Low Stocks</h3>
          <div className="flex justify-between w-full">
            <div className="flex items-start flex-col">
              <p className="text-2xl font-bold">12</p>
              <p className="text-gray-500">Ordered</p>
            </div>
            <div className="flex items-end flex-col">
              <p className="text-2xl font-bold ">2</p>
              <p className="text-gray-500">Not in stock</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallInventory;
