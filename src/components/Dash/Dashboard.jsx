import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FilterBar from "./FilterBar";
import Users from "./Users";
import Inventory from "./Inventory";
import Profile from "./Profile";
import Invoice from "./Invoice";

function Dashboard() {
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState("Users");

  useEffect(() => {
    // Check if the user is logged in
    const token = sessionStorage.getItem("access_token"); // Adjust this to your actual token key
    if (!token) {
      navigate("/SignIn"); // Navigate to sign-in if not logged in
    }
  }, [navigate]);

  const categories = [
    { label: "All", value: "All" },
    { label: "Prescription Drugs", value: "Prescription Drugs" },
    {
      label: "Over-the-Counter (OTC) Drugs",
      value: "Over-the-Counter (OTC) Drugs",
    },
    { label: "Controlled Substances", value: "Controlled Substances" },
    {
      label: "Restricted Distribution Drugs",
      value: "Restricted Distribution Drugs",
    },
    // Add more categories as needed, with their corresponding type values
  ];
  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div>
      <div className="bg-dash-backg w-full h-screen bg-cover flex justify-center items-center">
        <div className="bg-white  h-[90vh] w-[90vw] flex justify-center rounded-lg overflow-hidden">
          <div className="w-[5%] h-full bg-blue-500"></div>
          <div className="w-[15%] h-full bg-white flex justify-between p-2 text-black items-start flex-col">
            <div className="my-6 p-1 flex flex-col">
              <a
                href="#"
                className="hover:bg-blue-400 hover:text-white hover:scale-110 rounded-xl my-3 p-2 text-[12px] "
                onClick={() => handleComponentChange("Users")}
              >
                User
              </a>
              <a
                href="#"
                className="hover:bg-blue-400 hover:text-white hover:scale-110 rounded-xl my-3 p-2 text-[12px] "
                onClick={() => handleComponentChange("Inventory")}
              >
                Inventory
              </a>
              <a
                href="#"
                className="hover:bg-blue-400 hover:text-white hover:scale-110 rounded-xl my-3 p-2 text-[12px] "
                onClick={() => handleComponentChange("Invoice")}
              >
                Invoice
              </a>
              <a
                href="#"
                className="hover:bg-blue-400 hover:text-white hover:scale-110 rounded-xl my-3 p-2 text-[12px] "
                onClick={() => handleComponentChange("FilterBar")}
              >
                placeholder
              </a>
            </div>
            <div className="bg-blue-200 h-[30%] w-full rounded-lg flex justify-center flex-col">
              <img
                src="./src/assets/userhero.png"
                className="h-[60%] mt-1 "
                alt=""
              />
              <div className="flex  flex-col justify-center items-center p-2 mb-5">
                <h3 className="">John Doe </h3>
                <button
                  className=" mt-0 rounded-lg bg-blue-500 text-white py-1 px-3 text-[15px] "
                  onClick={() => handleComponentChange("Profile")}
                >
                  Profile
                </button>
              </div>
            </div>
          </div>
          <div className="w-[80%] h-full bg-[#d8cccc]">
            <div>
              {selectedComponent === "Users" && <Users />}
              {selectedComponent === "Inventory" && <Inventory />}
              {selectedComponent === "Profile" && <Profile />}
              {selectedComponent === "Invoice" && <Invoice />}

              {selectedComponent === "FilterBar" && (
                <FilterBar categories={categories} />
              )}
              {/* Render other components based on selectedComponent state */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
