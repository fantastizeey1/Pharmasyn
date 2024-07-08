import React from "react";
import Btn from "./Btn";
import bg from "/bgb.svg";

const Discoverus = () => {
  return (
    <section id="About" className="bg-[#94e7fc79] py-10 mt-12 md:mt-[200px]">
      <h2 className="font-bold text-[20px] md:text-[40px] text-center mb-10">
        Discover Pharmasynthesis
      </h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 rounded-xl">
        <div className="bg-blue-200 p-6 rounded-3xl shadow-lg mx-auto  flex justify-center items-center flex-col relative w-[350px]  h-[240px] ">
          <img src={bg} alt="bacground" className="absolute inset-0" />
          <img src={bg} alt="bacground" className="absolute inset-0" />
          <img src={bg} alt="bacground" className="absolute inset-0" />
          <img src={bg} alt="bacground" className="absolute inset-0" />
          <p className="font-semibold mb-12">Need medications?</p>
          <Btn
            title="Vist Inventory"
            linkpath="/#"
            className="rounded-full py-5 text-[16px] px-16"
          />
        </div>
        <div className="bg-blue-200 p-6 rounded-3xl shadow-lg flex mx-auto justify-center items-center flex-col relative w-[350px] h-[240px]">
          <img src={bg} alt="bacground" className="absolute inset-0" />
          <img src={bg} alt="bacground" className="absolute inset-0" />
          <img src={bg} alt="bacground" className="absolute inset-0" />
          <img src={bg} alt="bacground" className="absolute inset-0" />
          <p className="font-semibold mb-12">Want to partner with us?</p>
          <Btn
            title="Contact Us"
            linkpath="/#"
            className="rounded-full py-5 text-[16px] px-16"
          />
        </div>
        <div className="bg-blue-200 p-6 rounded-3xl shadow-lg mx-auto flex justify-center items-center flex-col relative w-[350px] h-[240px]">
          <img src={bg} alt="bacground" className="absolute inset-0" />
          <img src={bg} alt="bacground" className="absolute inset-0" />
          <img src={bg} alt="bacground" className="absolute inset-0" />
          <img src={bg} alt="bacground" className="absolute inset-0" />
          <img src={bg} alt="bacground" className="absolute inset-0" />
          <img src={bg} alt="bacground" className="absolute inset-0" />
          <p className="font-semibold mb-12">Pharmacy owner?</p>
          <Btn
            title="Sign Up"
            linkpath="/#"
            className="rounded-full py-5 text-[16px] px-16"
          />
        </div>
      </div>
    </section>
  );
};

export default Discoverus;
