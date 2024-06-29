import React from "react";
import logo from "/logo.jpg";

const Header2 = () => {
  return (
    <header className=" h-[85px] pt-6 ">
      <div className="flex items-center  justify-start gap-2">
        <img
          src={logo}
          alt="Pharmasynthesis Logo"
          className="w-[55px] h-[55px]"
        />
        <p className="text-[#0C0C0C] text-[36.55px] font-bold">
          Pharmasynthesis
        </p>
      </div>
      {/* <nav>
            <p>Already have an account?</p>
            <a href="/signin">Login</a>
        </nav> */}
    </header>
  );
};

export default Header2;
