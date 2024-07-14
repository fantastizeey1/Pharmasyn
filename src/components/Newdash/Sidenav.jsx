import React from "react";
import { BsSearch } from "react-icons/bs";
import { NavLink, Link } from "react-router-dom";
import logo from "/logo.jpg";

const Sidenav = () => {
  return (
    <section className=" flex bg-white">
      <div className="w-[280px] pl-[15px] pt-[15px] flex flex-col items-start h-full m-1 rounded-r-xl shadow-lg">
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
                src="/inventory.png"
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
                src="/orders.png"
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

      <div className="flex-grow h-[100px] flex justify-center items-center shadow-lg m-2 p-10">
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
    </section>
  );
};

export default Sidenav;
