import React, { useState } from "react";
import logo from "/logo.jpg";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  const navLinks = ["Home", "About Us", "Shop", "Contact Us"];

  return (
    <header className="mx-[15px] md:mx-[80px] xl:mx-[150px] h-[85px] 2xl:h-[120px] py-6 mb-4">
      <div className="flex  justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Pharmasynthesis Logo"
            className="w-[40px] h-[40px] 2xl:w-[80px] 2xl:h-[80px]"
          />
          <p className="text-[#0C0C0C] font-montserrat-alt text-[16px] 2xl:text-[26px] font-bold">
            Pharmasynthesis
          </p>
        </div>
        <div className="flex justify-between min-w-[75%] items-end">
          <nav className="hidden md:flex flex-1 justify-end items-center w-[70%]">
            <a
              href="#Hero"
              className="ml-[36px] text-[14px] 2xl:text-[22px] 2xl:ml-[6%] font-bold cursor-pointer hover:scale-110"
              aria-label=""
            >
              Home
            </a>
            <a
              href="#"
              className="ml-[36px] text-[14px] 2xl:text-[22px] 2xl:ml-[6%] font-bold cursor-pointer hover:scale-110"
              aria-label=""
            >
              About Us
            </a>
            <NavLink
              to="/Shop"
              className="ml-[36px] text-[14px] 2xl:text-[22px] 2xl:ml-[36px] font-bold hover:scale-110"
              aria-label=""
            >
              Shop
            </NavLink>
            <a
              href="#Contact"
              className="ml-[36px] text-[14px] 2xl:text-[22px] 2xl:ml-[6%] font-bold cursor-pointer hover:scale-110"
              aria-label=""
            >
              Contact Us
            </a>

            <Link
              to="/SignIn"
              className="ml-[36px] text-[14px] 2xl:text-[22px] 2xl:ml-[6%] font-bold hover:scale-110"
              aria-label="Log in"
            >
              Log in
            </Link>
            <Link to="/SignUp">
              <button
                className="ml-[36px] text-[14px] font-bold text-white bg-[#013299] rounded-3xl hover:scale-110 py-3 px-6 mt-0 2xl:text-[22px] 2xl:ml-[36px] 2xl:py-5 2xl:px-8 2xl:rounded-[60px]"
                aria-label="Sign Up"
              >
                Sign Up
              </button>
            </Link>
          </nav>
          <div className="md:hidden flex  items-end z-50">
            {nav ? (
              <AiOutlineClose
                onClick={handleNav}
                size={20}
                className="cursor-pointer"
                aria-label="Close menu"
              />
            ) : (
              <AiOutlineMenu
                onClick={handleNav}
                size={20}
                className="cursor-pointer"
                aria-label="Open menu"
              />
            )}
          </div>
          {nav && (
            <div className="fixed w-[80%] h-[40%] bg-white right-14 top-20 rounded-lg flex flex-col justify-center items-start z-20">
              <a
                href="#"
                className="mb-[16px] text-[14px] font-bold hover:scale-110"
                onClick={handleNav}
                aria-label="Home"
              >
                Home
              </a>
              <a
                href="#About"
                className="mb-[16px] text-[14px] font-bold hover:scale-110"
                onClick={handleNav}
                aria-label="About Us"
              >
                About Us
              </a>
              <Link
                to="/Shop"
                className="mb-[16px] text-[14px] font-bold hover:scale-110"
                onClick={handleNav}
                aria-label="shop"
              >
                Shop
              </Link>
              <a
                href="#Contact"
                className="mb-[16px] text-[14px] font-bold hover:scale-110"
                onClick={handleNav}
                aria-label="Contact Us"
              >
                Contact Us
              </a>

              <Link
                to="/SignIn"
                className="mb-[16px]  text-[14px] font-bold hover:scale-110"
                aria-label="Log in"
              >
                Log in
              </Link>
              <Link to="/SignUp">
                <button
                  className="mb-[16px] text-[14px] font-bold text-white bg-[#013299] rounded-3xl hover:scale-110 py-3 px-6 mt-0"
                  aria-label="Sign Up"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
