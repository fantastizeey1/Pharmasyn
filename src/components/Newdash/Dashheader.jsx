import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import logo from "/logo.jpg";
import searchIcon from "/searchicon.svg";
import cartIcon from "/cart.svg";

const Dashheader = ({ cartItemCount }) => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <header className="mx-[70px] py-3">
      <div className="flex justify-between items-center">
        <Link to="/">
          <div className="flex items-center gap-2">
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

        <nav className="hidden md:flex flex-1 justify-center items-center">
          <Link
            to="/"
            className="ml-[36px] text-[14px] font-bold hover:scale-110"
            aria-label="Home"
          >
            Home
          </Link>
          <Link
            to="/#about-us"
            className="ml-[36px] text-[14px] font-bold hover:scale-110"
            aria-label="About Us"
          >
            About Us
          </Link>
          <Link
            to="/shop"
            className="ml-[36px] text-[14px] font-bold hover:scale-110"
            aria-label="Shop"
          >
            Shop
          </Link>
          <Link
            to="/#contact-us"
            className="ml-[36px] text-[14px] font-bold hover:scale-110"
            aria-label="Contact Us"
          >
            Contact Us
          </Link>
        </nav>

        <div className="flex justify-center items-center">
          <div className="flex items-center justify-center bg-white shadow-lg rounded-full   md:max-w-md">
            <input
              type="text"
              placeholder="Search Inventory"
              className="flex-grow md:px-4 text-sm rounded-full  focus:outline-none placeholder-[#2e2e2e] placeholder:text-[11px]  ml-3 "
            />
            <button className=" rounded-full m-0 p-0 flex items-center justify-center focus:outline-none">
              <img
                src={searchIcon}
                alt="Search"
                className="   md:w-10 md:h-10"
              />
            </button>
          </div>
          <Link
            to="/profile"
            className="ml-[16px] text-[14px] font-bold hover:scale-110"
            aria-label="Log in"
          >
            <div className="w-8 h-8 rounded-full flex justify-center items-center text-[18px] text-white bg-blue-800">
              P
            </div>
          </Link>
          <Link to="/Cart" className="relative">
            <img
              src={cartIcon}
              alt="cart"
              className="w-[24px] ml-4 h-[24px] hover:scale-110"
            />
            {cartItemCount > 0 && (
              <span className="absolute top-[-5px] right-[-10px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Dashheader;