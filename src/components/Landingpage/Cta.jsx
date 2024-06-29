import React from "react";
import Btn from "./Btn";
import CtaImg from "/23.svg";
import logo from "/logo.jpg";
import rightarrow from "/Arrowright.svg";

const Cta = () => {
  return (
    <section className="mx-[150px] h-[455px] flex flex-1 justify-center items-center mt-[150px]">
      <div className="w-[50%] mr-[37px] relative">
        <img src={CtaImg} alt="ctaimg" />
        <img
          src={logo}
          alt="logo"
          className="absolute  h-[100px] left-[155px] top-[45px]"
        />
      </div>
      <div className="w-[50%]">
        <h2 className="font-bold text-[32px] mb-7">
          We are designed to transform how the pharmaceutical industry operates.
        </h2>
        <p className="text-[15px] text-[#0C0C0C] mb-7">
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
