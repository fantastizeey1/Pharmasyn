import React, { useEffect, useState } from "react";
import Adminheader from "./Adminheader";
import { NavLink } from "react-router-dom";
import { rawColumns } from "../Newdash/Table/Columns";
import { DataTable } from "../Newdash/Table/data-table";
import { Button } from "../ui/button";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BASE_URL } from "../../config";
import axios from "axios";

const Admin = () => {
  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const hasData = (data, key) =>
    data.some((item) => item[key] !== undefined && item[key] !== null);

  // create a sales rep
  const createSalesRep = async (event) => {
    event.preventDefault();

    console.log("Create User button clicked!"); // Debugging

    try {
      const formData = new FormData(event.target);
      const salesRep = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        repeatPassword: formData.get("repeatPassword"),
        phoneNumber: formData.get("phoneNumber"),
      };
      console.log("Form data:", salesRep); // Debugging

      const bearerToken = sessionStorage.getItem("access_token");
      if (!bearerToken) {
        throw new Error("No access token found in session storage");
      }

      const url = `${BASE_URL}/api/Admin/CreateSalesRep`;

      const response = await axios.post(url, salesRep, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      console.log("API Response:", response.data);
      setAlertMessage(`${response.data.salesRep.name} added successfully`);
      setShowModal(false);
      setTimeout(() => {
        setAlertMessage(null);
      }, 2000);
    } catch (error) {
      console.error("Error creating sales rep:", error);
      setError(
        `An error occurred while creating sales rep: ${error.message}. Please try again later.`
      );
    }
  };

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await getData();
      setData(fetchedData);
    }

    fetchData();
  }, []);

  async function getData() {
    return [
      {
        id: "1",
        Name: "John Doe",
        Phone_No: "08164819845",
        Email: "prevail@gmail.com",
        company: "Suill lmt",
      },
      {
        id: "2",
        Name: "John Doeg",
        Phone_No: "08164819845",
        Email: "prevail@gmail.com",
        company: "Suill lmt",
      },
      {
        id: "3",
        Name: "John Doef",
        Phone_No: "08164819845",
        Email: "prevail@gmail.com",
        company: "Suill lmt",
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
    <main className="w-full">
      <Adminheader />
      <div className="w-[230px] fixed bg-white pl-[15px] pt-[15px] flex flex-col items-start h-screen  rounded-2xl shadow-lg ml-7 mt-[50px]">
        <div className="flex flex-col items-start w-full">
          <div className="flex flex-col mb-[150px] w-full  pl-3">
            <NavLink
              to="/Admin"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-[16px] font-medium mb-[44px] text-blue-500"
                  : "flex items-center text-[16px] font-medium mb-[44px] text-black"
              }
            >
              <img
                src={"/adminicon.svg"}
                alt="icon"
                className="mr-4 w-[20px] h-[20px]"
              />
              Admin
            </NavLink>
            <NavLink
              to="/Docs"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-[16px] font-medium mb-[44px] text-blue-500"
                  : "flex items-center text-[16px] font-medium mb-[44px] text-black"
              }
            >
              <img
                src={"/docicon.svg"}
                alt="icon"
                className="mr-4 w-[20px] h-[20px]"
              />
              Document
            </NavLink>

            <NavLink
              to="/Delivery"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-[16px] font-medium mb-[44px] text-blue-500"
                  : "flex items-center text-[16px] font-medium mb-[44px] text-black"
              }
            >
              <img
                src="/delicon.svg"
                alt="icon"
                className="mr-4 w-[20px] h-[20px]"
              />
              Delivery
            </NavLink>
          </div>

          <div className="flex items-center"></div>
        </div>
      </div>
      <div className="fixed top-[105px] left-[250px] w-[calc(100%-250px)] h-[calc(100%-100px)]">
        <div className="h-[100%] overflow-y-auto">
          <div className="flex items-center justify-end mr-[70px]">
            <Button className="bg-[#013299]" onClick={() => setShowModal(true)}>
              {" "}
              Add User
            </Button>
          </div>
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed py-4 inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg h-[90%] overflow-y-auto p-6 w-[500px]">
            <h2 className="text-xl font-semibold mb-2">New Sales Rep</h2>
            <form onSubmit={createSalesRep}>
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between">
                  <label className="block font-medium text-[16px] text-[#0C0C0C]/80">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-[273px] border border-gray-300 p-2 rounded mt-1 placeholder:text-[#0C0C0C]/50 placeholder:text-[16px]"
                    placeholder=""
                    name="name"
                  />
                </div>

                <div className="flex justify-between">
                  <label className="block font-medium text-[16px] text-[#0C0C0C]/80">
                    Email
                  </label>
                  <input
                    type="text"
                    className="w-[273px] border border-gray-300 p-2 rounded mt-1 placeholder:text-[#0C0C0C]/50 placeholder:text-[16px]"
                    placeholder="email here..."
                    name="email"
                  />
                </div>
                <div className="flex justify-between">
                  <label className="block font-medium text-[16px] text-[#0C0C0C]/80">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="w-[273px] border border-gray-300 p-2 rounded mt-1 placeholder:text-[#0C0C0C]/50 placeholder:text-[16px]"
                    placeholder="Phone Number here ..."
                    name="phoneNumber"
                  />
                </div>
                <div className="flex justify-between">
                  <label className="block font-medium text-[16px] text-[#0C0C0C]/80">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-[273px] border border-gray-300 p-2 rounded mt-1 placeholder:text-[#0C0C0C]/50 placeholder:text-[16px]"
                    placeholder="Enter password here..."
                    name="password"
                  />
                </div>
                <div className="flex justify-between">
                  <label className="block font-medium text-[16px] text-[#0C0C0C]/80">
                    confirm Password
                  </label>
                  <input
                    type="Password"
                    className="w-[273px] border border-gray-300 p-2 rounded mt-1 placeholder:text-[#0C0C0C]/50 placeholder:text-[16px]"
                    placeholder="Enter the same password"
                    name="repeatPassword"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 text-[#0C0C0C]/50 rounded border border-[#acacad] hover:bg-current"
                  onClick={() => setShowModal(false)}
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="bg-[#013299] text-white px-4 py-2 rounded"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Admin;
