import { BsSearch } from "react-icons/bs";
import { NavLink, Link } from "react-router-dom";
import logo from "/logo.jpg";
import React, { useEffect, useState } from "react";
import { rawColumns } from "../Newdash/Table/Columns";
import { DataTable } from "../Newdash/Table/data-table";
import { Button } from "../ui/button";
import OverallInventory from "./OverallInventory";
import FileUploadWithPreview from "./FileUploadWithPreview ";
import { IoIosNotificationsOutline } from "react-icons/io";

const Inventory = () => {
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState([]);
  const hasData = (data, key) =>
    data.some((item) => item[key] !== undefined && item[key] !== null);

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await getData();
      setData(fetchedData);
    }

    fetchData();
  }, []);

  async function getData() {
    // Fetch data from your API here.
    return [
      {
        id: "1",
        ProductId: "97682466239",
        ExpiryDate: "2024-12-07",
        Quantity: "43 Packets",
        Price: "₦2,430.00",
        Product: "Paracetamol 10mg",
        productAvailability: "In-stock",
      },
      {
        id: "2",
        ProductId: "97682466240",
        ExpiryDate: "2025-01-15",
        Quantity: "50 Packets",
        Price: "₦2,500.00",
        Product: "Paracetamol 10mg",
        productAvailability: "Out-of-stock",
      },
      {
        id: "3",
        ProductId: "97682466241",
        ExpiryDate: "2024-11-20",
        Quantity: "30 Packets",
        Price: "₦2,300.00",
        Product: "Paracetamol 10mg",
        productAvailability: "In-stock",
      },
      {
        id: "4",
        ProductId: "97682466242",
        ExpiryDate: "2024-10-05",
        Quantity: "25 Packets",
        Price: "₦2,200.00",
        Product: "Paracetamol 10mg",
        productAvailability: "Out-of-stock",
      },
      {
        id: "5",
        ProductId: "97682466243",
        ExpiryDate: "2025-02-28",
        Quantity: "60 Packets",
        Price: "₦2,600.00",
        Product: "Paracetamol 10mg",
        productAvailability: "low-on-stock",
      },
      {
        id: "6",
        ProductId: "97682466244",
        ExpiryDate: "2024-09-15",
        Quantity: "40 Packets",
        Price: "₦2,400.00",
        Product: "Paracetamol 10mg",
        productAvailability: "Out-of-stock",
      },
      {
        id: "7",
        ProductId: "97682466245",
        ExpiryDate: "2024-08-10",
        Quantity: "35 Packets",
        Price: "₦2,350.00",
        Product: "Paracetamol 10mg",
        productAvailability: "In-stock",
      },
      {
        id: "8",
        ProductId: "97682466246",
        ExpiryDate: "2025-03-22",
        Quantity: "45 Packets",
        Price: "₦2,450.00",
        Product: "Paracetamol 10mg",
        productAvailability: "Out-of-stock",
      },
      {
        id: "9",
        ProductId: "97682466247",
        ExpiryDate: "2024-07-30",
        Quantity: "55 Packets",
        Price: "₦2,550.00",
        Product: "Paracetamol 10mg",
        productAvailability: "In-stock",
      },
      {
        id: "10",
        ProductId: "97682466248",
        ExpiryDate: "2025-04-10",
        Quantity: "20 Packets",
        Price: "₦2,200.00",
        Product: "Paracetamol 10mg",
        productAvailability: "Out-of-stock",
      },
      {
        id: "11",
        ProductId: "97682466249",
        ExpiryDate: "2024-06-15",
        Quantity: "33 Packets",
        Price: "₦2,330.00",
        Product: "Paracetamol 10mg",
        productAvailability: "In-stock",
      },
      {
        id: "12",
        ProductId: "97682466250",
        ExpiryDate: "2025-05-05",
        Quantity: "48 Packets",
        Price: "₦2,480.00",
        Product: "Paracetamol 10mg",
        productAvailability: "Out-of-stock",
      },
      {
        id: "13",
        ProductId: "97682466251",
        ExpiryDate: "2024-07-25",
        Quantity: "38 Packets",
        Price: "₦2,380.00",
        Product: "Paracetamol 10mg",
        productAvailability: "Low-on-stock",
      },
      {
        id: "14",
        ProductId: "97682466252",
        ExpiryDate: "2025-06-12",
        Quantity: "42 Packets",
        Price: "₦2,420.00",
        Product: "Paracetamol 10mg",
        productAvailability: "Out-of-stock",
      },
      {
        id: "15",
        ProductId: "97682466253",
        ExpiryDate: "2024-08-18",
        Quantity: "29 Packets",
        Price: "₦2,290.00",
        Product: "Paracetamol 10mg",
        productAvailability: "In-stock",
      },
    ];
  }

  // Filter columns that have no data
  const columns = rawColumns.filter((column) => {
    if (column.accessorKey) {
      return hasData(data, column.accessorKey);
    }
    return true; // For columns without accessorKey (e.g., select, actions)
  });

  return (
    <div className="h-[100%] w-[100%] flex bg-[#7a7a7a]">
      <div className="w-[230px] fixed bg-white pl-[15px] pt-[15px] flex flex-col items-start h-screen  rounded-r-xl shadow-lg">
        <Link to="/">
          <div className="flex items-center mb-[60px] gap-2">
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

        <div className="flex flex-col items-start w-full">
          <div className="flex flex-col mb-[150px] w-full">
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
              className={({ isActive }) =>
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
              to="/reports"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-[16px] font-medium mb-[44px] text-blue-500"
                  : "flex items-center text-[16px] font-medium mb-[44px] text-black"
              }
            >
              <img
                src="/reports.png"
                alt="icon"
                className="mr-4 w-[20px] h-[20px]"
              />
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
              <img
                src="/settings.png"
                alt="icon"
                className="mr-4 w-[20px] h-[20px]"
              />
              Settings
            </NavLink>
          </div>

          <div className="flex items-center"></div>
        </div>
      </div>
      <div className="flex-grow fixed top-0 left-[250px] right-0 bg-white h-[100px] w-[calc(100%-230px)] flex justify-between items-center shadow-lg m-2 p-10">
        <div
          action="search"
          className="border flex items-center p-1 border-[#F0F1F3]"
        >
          <button className="m-0">
            <BsSearch className="text-[#0C0C0C]/50" />
          </button>
          <input
            type="text"
            placeholder="Search product, supplier, order"
            name="search"
            className="placeholder:text-[14px] placeholder:text-[#0C0C0C]/50"
          />
        </div>
        <div className="flex justify-center items-center">
          <IoIosNotificationsOutline />
          <img
            src="/profile.png"
            alt="profile icon"
            className="ml-[15px] mr-5"
          />
        </div>
      </div>
      <div className="fixed top-[115px] left-[250px] w-[calc(100%-250px)] h-[calc(100%-110px)]">
        <div className=" h-[100%] overflow-y-auto">
          <OverallInventory />

          <div className="flex justify-between px-9 items-center ">
            <h2 className="text-[20px] font-bold">Orders</h2>

            <Button className="bg-[#013299]" onClick={() => setShowModal(true)}>
              Add Product
            </Button>
          </div>
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed  py-4 inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg h-[90%] overflow-y-auto p-6 w-[500px]">
            <h2 className="text-xl font-semibold mb-2">New Product</h2>
            <div className="mb-2 flex justify-center items-center">
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

export default Inventory;
