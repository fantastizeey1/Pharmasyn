import React from "react";
import hero from "/hero.png";
import vector from "/Vector.svg";
import searchIcon from "/searchicon.svg";
const Hero = () => {
  return (
    <section
      id="Home"
      className="mx-[15px] md:mx-[60px] xl:mx-[150px] h-[100vh-7vh] md:h-[100vh-10vh] flex flex-1 justify-center items-center flex-col-reverse md:flex-row mb-4 lg:mb-[122px]  "
    >
      <div className=" w-full md:w-[50%] ">
        <h1 className="font-bold text-[26px] lg:text-[60px] leading-tight mb-3 md:mb-[28px] 2xl:text-[72px] 2xl:mb-[50px]">
          Your Health, <br className="md:block hidden" />
          Just a Click Away
        </h1>
        <p className=" text-[12px] md:text-[15px] mb-3 2xl:text-[22px] md:mb-[60px]">
          We are focused on helping the pharmaceutical (supply chain) hierarchy 
          be more efficient as regarding sales and reducing operational cost
          while still maintaining industry regulation, protocols, and standard.
        </p>

        <div className="flex items-center justify-center bg-white shadow-lg rounded-full  w-[75%] md:h-[40px] md:max-w-md 2xl:h-[70px]">
          <input
            type="text"
            placeholder="Search Inventory"
            className="flex-grow md:px-4 text-sm rounded-full  focus:outline-none placeholder-[#2e2e2e] placeholder:text-[11px] placeholder:pl-3 pl-3 2xl:placeholder:text-[22px]"
          />
          <button className=" rounded-full m-0 p-0 flex items-center justify-center focus:outline-none">
            <img src={searchIcon} alt="Search" className="   md:w-10 md:h-10" />
          </button>
        </div>
      </div>
      <div className="relative w-full mb-2 grid md:w-[50%] overflow-clip">
        <img
          src={vector}
          alt="splash"
          className=" md:max-h-[444px] xl:w-full xl:min-h-[440px] 2xl:min-h-[450px] col-start-1 row-start-1 xl:h-fit  "
        />
        <img
          src={hero}
          alt="hero"
          className="  md:h-[380px] xl:h-fit xl:min-h-[440px] 2xl:min-h-[450px]  col-start-1 row-start-1"
        />
      </div>
    </section>
  );
};

export default Hero;
