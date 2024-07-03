import React from "react";
import Btn from "./Btn";
import CtaImg from "/23.svg";
import logo from "/logo.jpg";
import rightarrow from "/Arrowright.svg";

const Cta = () => {
  return (
    <section className="mx-[15px] md:mx-[150px] h-[455px] flex flex-1 justify-center flex-col md:flex-row items-center mt-[150px]">
      <div className="w-full md:w-[50%] md:mr-[37px] relative">
        <img src={CtaImg} alt="ctaimg" />
        <img
          src={logo}
          alt="logo"
          className="absolute h-[75px] left-[123px] top-[40px] md:h-[100px] md:left-[155px] md:top-[45px]"
        />
      </div>
      <div className=" w-full md:w-[50%]">
        <h2 className="font-bold text-[19px] md:text-[32px]  mb-3 md:mb-7">
          We are designed to transform how the pharmaceutical industry operates.
        </h2>
        <p className="text-[12px] md:text-[15px] text-[#0C0C0C] mb-7">
          We serve as a central hub where pharmaceutical companies, wholesalers,
          retailers, medical professionals, can connect and conduct business
          seamlessly. Pharmasynthesis is that platform, a web-based hub designed
          to streamline communication, transactions, and data flow within the
          pharmaceutical industry.
        </p>
        <Btn title="More" linkpath="/#" icon={rightarrow} />
      </div>
    </section>
  );
};

export default Cta;
