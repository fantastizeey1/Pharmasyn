import React, { useEffect, useState } from "react";
import { rawColumns } from "../Newdash/Table/Columns";
import { DataTable } from "../Newdash/Table/data-table";
import { BsSearch } from "react-icons/bs";
import { NavLink, Link, useLocation } from "react-router-dom";
import logo from "/logo.jpg";
import { Button } from "../ui/button";
import Table from "./Table";
import { IoIosNotificationsOutline } from "react-icons/io";

const Status = () => {
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
        Orderid: "97682466239",
        Date: "2024-12-07",
        Customer: "Pete Davison",
        Quantity: "43 packs",
        Product: "Paracetamol 10mg",
        Status: "pending",
      },
      {
        id: "2",
        Orderid: "19384756302",
        Date: "2024-11-07",
        Customer: "Anna Smith",
        Quantity: "20 packs",
        Product: "Ibuprofen 200mg",
        Status: "pending",
      },
      {
        id: "3",
        Orderid: "12345678901",
        Date: "2024-10-15",
        Customer: "John Doe",
        Quantity: "15 packs",
        Product: "Aspirin 100mg",
        Status: "pending",
      },
      {
        id: "4",
        Orderid: "23456789012",
        Date: "2024-09-20",
        Customer: "Jane Roe",
        Quantity: "30 packs",
        Product: "Vitamin C 500mg",
        Status: "pending",
      },
      {
        id: "5",
        Orderid: "34567890123",
        Date: "2024-08-25",
        Customer: "Alice Johnson",
        Quantity: "25 packs",
        Product: "Amoxicillin 250mg",
        Status: "pending",
      },
      {
        id: "6",
        Orderid: "45678901234",
        Date: "2024-07-30",
        Customer: "Bob Brown",
        Quantity: "10 packs",
        Product: "Metformin 500mg",
        Status: "pending",
      },
      {
        id: "7",
        Orderid: "56789012345",
        Date: "2024-06-05",
        Customer: "Charlie Green",
        Quantity: "50 packs",
        Product: "Lisinopril 10mg",
        Status: "pending",
      },
      {
        id: "8",
        Orderid: "67890123456",
        Date: "2024-05-10",
        Customer: "Diana White",
        Quantity: "35 packs",
        Product: "Atorvastatin 20mg",
        Status: "pending",
      },
      {
        id: "9",
        Orderid: "78901234567",
        Date: "2024-04-15",
        Customer: "Eve Black",
        Quantity: "40 packs",
        Product: "Omeprazole 20mg",
        Status: "pending",
      },
      {
        id: "10",
        Orderid: "89012345678",
        Date: "2024-03-20",
        Customer: "Frank Blue",
        Quantity: "45 packs",
        Product: "Simvastatin 40mg",
        Status: "pending",
      },
      {
        id: "11",
        Orderid: "90123456789",
        Date: "2024-02-25",
        Customer: "Grace Yellow",
        Quantity: "60 packs",
        Product: "Levothyroxine 50mcg",
        Status: "pending",
      },
      {
        id: "12",
        Orderid: "01234567890",
        Date: "2024-01-30",
        Customer: "Henry Orange",
        Quantity: "70 packs",
        Product: "Amlodipine 5mg",
        Status: "pending",
      },
      {
        id: "13",
        Orderid: "11234567890",
        Date: "2023-12-05",
        Customer: "Ivy Purple",
        Quantity: "80 packs",
        Product: "Metoprolol 50mg",
        Status: "pending",
      },
      {
        id: "14",
        Orderid: "12234567890",
        Date: "2023-11-10",
        Customer: "Jack Pink",
        Quantity: "90 packs",
        Product: "Losartan 50mg",
        Status: "pending",
      },
      {
        id: "15",
        Orderid: "13234567890",
        Date: "2023-10-15",
        Customer: "Kara Red",
        Quantity: "100 packs",
        Product: "Hydrochlorothiazide 25mg",
        Status: "pending",
      },
      {
        id: "16",
        Orderid: "14234567890",
        Date: "2023-09-20",
        Customer: "Liam Gray",
        Quantity: "110 packs",
        Product: "Gabapentin 300mg",
        Status: "pending",
      },
      {
        id: "17",
        Orderid: "15234567890",
        Date: "2023-08-25",
        Customer: "Mia Silver",
        Quantity: "120 packs",
        Product: "Sertraline 50mg",
        Status: "pending",
      },
      {
        id: "18",
        Orderid: "16234567890",
        Date: "2023-07-30",
        Customer: "Noah Gold",
        Quantity: "130 packs",
        Product: "Citalopram 20mg",
        Status: "pending",
      },
      {
        id: "19",
        Orderid: "17234567890",
        Date: "2023-06-05",
        Customer: "Olivia Bronze",
        Quantity: "140 packs",
        Product: "Alprazolam 0.5mg",
        Status: "pending",
      },
      {
        id: "20",
        Orderid: "18234567890",
        Date: "2023-05-10",
        Customer: "Paul Copper",
        Quantity: "150 packs",
        Product: "Clonazepam 1mg",
        Status: "pending",
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
    <div>
      <div className="h-[100%] w-[100%] flex bg-[#7a7a7a]">
        <div className="w-[230px] fixed bg-white pl-[15px] pt-[15px] flex flex-col items-start h-screen rounded-r-xl shadow-lg">
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
                  isActive || location.pathname.startsWith("/orders")
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
          <div className="h-[100%] overflow-y-auto">
            <div className="container mx-auto py-10">
              <DataTable columns={columns} data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
