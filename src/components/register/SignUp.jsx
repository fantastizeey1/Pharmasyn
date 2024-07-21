import React from "react";
import { useNavigate } from "react-router-dom";
import Header2 from "./Header2";
import pc from "/pc.svg";
import hp from "/hp.svg";
import wd from "/wd.svg";
import retail from "/retail.svg";
import Pharma from "/pharma.svg";
import doctor from "/fontisto_doctor.svg";
import right from "/arrowright2.svg";

const buttonData = {
  buttons: [
    {
      type: "pharmaceuticalCompany",
      userType: 1,
      title: "Pharmaceutical Company",
      description: "Own a pharmaceutical company, this is for you.",
      icon: pc,
    },
    {
      type: "wholesalePharmacy",
      userType: 2,
      title: "Wholesale/Distributor",
      description: "Are you a distributor, this is for you.",
      icon: wd,
    },
    {
      type: "hospitalPharmacy",
      userType: 4,
      title: "Hospital Pharmacy",
      description: "Operate a pharmacy in a hospital, this is for you.",
      icon: hp,
    },
    {
      type: "retailPharmacy",
      userType: 3,
      title: "Retail/Community Pharmacy",
      description: "Operate a pharmacy, this is for you.",
      icon: retail,
    },
    {
      type: "pharmacist",
      userType: 5,
      title: "Pharmacist",
      description: "For personal use, this is for you.",
      icon: Pharma,
    },
    {
      type: "doctor",
      userType: 6,
      title: "Doctor",
      description:
        "Are you a doctor who's looking for where to get medications for patients, this is for you.",
      icon: doctor,
    },
  ],
};

function SignUpSelector() {
  const navigate = useNavigate();

  const handleSignUpClick = (userType) => {
    navigate("/Register", { state: { userType } });
  };

  return (
    <section className="mx-[150px]">
      <Header2 />

      <div className="flex flex-col justify-start mx-auto items-start w-[625px]">
        <div className="flex flex-col justify-start items-start mb-[28px]">
          <h2 className="text-[25px] font-bold mb-2 text-center">Join Us!</h2>
          <p className=" text-[14.67px]">
            To begin this journey, tell us what type of <br /> account you’d be
            opening.
          </p>
        </div>
        <div className="w-full flex flex-col items-start justify-start">
          {buttonData.buttons.map((button) => (
            <button
              key={button.type}
              onClick={() => handleSignUpClick(button.userType)}
              className="relative w-full h-[114px] shadow-xl text-black py-3 px-6 mb-2 rounded-lg transition duration-300 ease-in-out flex items-center hover:bg-[#d3ecf5] hover:border-[#013299] hover:border justify-start group"
            >
              <div className="px-3 py-2 rounded-full border-2 border-[#00CCFF] group-hover:bg-[#00CCFF] mr-3">
                <img
                  src={button.icon}
                  alt="icon"
                  className="w-[31px] h-[36px]"
                />
              </div>
              <div className="w-[60%] text-start flex flex-col items-start">
                <h3 className="font-medium text-[16.5px]">{button.title}</h3>
                <p className="text-[15px]">{button.description}</p>
              </div>
              <img
                src={right}
                alt="right arrow"
                className="absolute right-6 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SignUpSelector;
