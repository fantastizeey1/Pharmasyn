import React from "react";
import logo from "/logo.jpg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="mx-[150px] h-[85px] py-6 mb-4">
      <div className="flex flex-1 justify-between items-center w-full">
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
        <nav className="flex flex-1 justify-end items-center w-[70%]">
          {["Home", "About Us", "Services", "Contact Us"].map((text, index) => (
            <a
              key={index}
              href={`#${text}`}
              className="ml-[36px] text-[14px] font-bold hover:scale-110"
              aria-label={text}
            >
              {text}
            </a>
          ))}
          <Link
            to="/SignIn"
            className="ml-[36px] text-[14px] font-bold hover:scale-110"
            aria-label="Log in"
          >
            Log in
          </Link>
          <button
            className="ml-[36px] text-[14px] font-bold text-white bg-[#013299] rounded-3xl hover:scale-110 py-3 px-6 mt-0"
            aria-label="Sign Up"
          >
            <Link to="/SignUp">Sign Up</Link>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
