import React from "react";
import { BsSearch } from "react-icons/bs";
import { NavLink, Link } from "react-router-dom";
import logo from "/logo.jpg";
import Sidenav from "./Sidenav";
import Btn from "../Landingpage/Btn";
import OverallInventory from "./OverallInventory";
import ProductTable from "./InventoryProduct";

const Inventory = () => {
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

          <div className="flex items-center">
            <img src="/profile.png" alt="profile icon" className="mr-[15px]" />
            <div>
              <h3>Obi Stephanie</h3>
              <p className="text-[12px]">obistephanae@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow fixed top-0 left-[250px] right-0 bg-white h-[100px] w-[calc(100%-230px)] flex justify-center items-center shadow-lg m-2 p-10">
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
      </div>
      <div className="fixed top-[115px] left-[250px] w-[calc(100%-250px)] h-[calc(100%-110px)]">
        <div className=" h-[100%] overflow-y-auto">
          <OverallInventory />
          <ProductTable />
        </div>
      </div>

      {/* <OverallInventory />
       */}

      {/* <div>
        <div>
          <h2>Overall Inventory</h2>
          <div>
            <div>
              <h4>Categories</h4>
              <h5>14</h5>
              <p>Last 7 days</p>
            </div>
            <div>
              <h4>Total Products</h4>
              <h5>
                868 <span>₦25000</span>
              </h5>
              <p>
                Last 7 days <span>Revenue</span>
              </p>
            </div>
            <div>
              <h4>Total Products</h4>
              <h5>
                868 <span>₦25000</span>
              </h5>
              <p>
                Last 7 days <span>Revenue</span>
              </p>
            </div>
            <div>
              <h4>Total Products</h4>
              <h5>
                868 <span>₦25000</span>
              </h5>
              <p>
                Last 7 days <span>Revenue</span>
              </p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h3>Products</h3>
            <Btn
              title="Checkout"
              linkpath="/Shop"
              className="w-full h-[60px] flex justify-center items-center mt-8 px-2 text-[22px]"
            />
          </div>

        </div>
      </div> */}
    </div>
  );
};

export default Inventory;
