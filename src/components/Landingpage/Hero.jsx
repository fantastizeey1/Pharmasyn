import React from "react";
import hero from "/hero.png";
import vector from "/Vector.svg";
import searchIcon from "/searchicon.svg";
const Hero = () => {
  return (
    <section
      id="Home"
      className="mx-[150px] h-[455px] flex flex-1 justify-center items-center mb-[122px]"
    >
      <div className="w-[50%] ">
        <h1 className="font-bold text-[62px] leading-tight mb-[28px]">
          Your Health, <br />
          Just a Click Away
        </h1>
        <p className="text-[15px] mb-[60px]">
          We are focused on helping the pharmaceutical (supply chain) hierarchy 
          be more efficient as regarding sales and reducing operational cost
          while still maintaining industry regulation, protocols, and standard.
        </p>

        <div className="flex items-center justify-center bg-white shadow-lg rounded-full  w-[75%] h-[40px] max-w-md">
          <input
            type="text"
            placeholder="   Search Inventory"
            className="flex-grow px-4 text-sm rounded-full  focus:outline-none placeholder-[#2e2e2e] placeholder:text-[11px]"
          />
          <button className=" rounded-full m-0 flex items-center justify-center focus:outline-none">
            <img src={searchIcon} alt="Search" className="w-10 h-10" />
          </button>
        </div>
      </div>
      <div className="relative  w-[50%] overflow-clip">
        <img
          src={vector}
          alt="splash"
          className="absolute inset-0 max-h-[444px] max-w-[] "
        />
        <img src={hero} alt="hero" className="  h-[450px] " />
      </div>
    </section>
  );
};

export default Hero;
