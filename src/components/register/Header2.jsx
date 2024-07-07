import React from "react";
import logo from "/logo.jpg";
import { Link } from "react-router-dom";

const Header2 = () => {
  return (
    <header className=" h-[85px] pt-6 flex flex-1 items-center justify-between mb-[50px]">
      <div className="flex items-center cursor-pointer justify-start gap-2">
        {/* <Image */}
        <Link to="/">
          <img
            src={logo}
            alt="Pharmasynthesis Logo"
            className="w-[55px] h-[55px]"
          />
        </Link>
        <Link to="/">
          <p className="text-[#0C0C0C] text-[36.55px] cursor-pointer font-bold">
            Pharmasynthesis
          </p>
        </Link>
      </div>
      <div className="flex justify-end items-center gap-5  ">
        <p className="text-[20px]">Already have an account?</p>
        <Link to="/signin" className="text-[#013299] font-bold text-[20px]">
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header2;
