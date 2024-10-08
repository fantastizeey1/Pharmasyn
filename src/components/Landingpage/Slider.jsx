// Slider.js
import React from "react";
import Btn from "./Btn";
import rightarrow from "/Arrowright.svg";
import PropTypes from "prop-types";

export const slidesData = [
  {
    title: "Prescription Drugs",
    description:
      "Pharmasynthesis has a wide variety of prescription drugs which can only be obtained with a valid prescription from a licensed healthcare provider",
    buttonText: "Shop Now",
  },
  {
    title: "Over The Counter Drugs",
    description:
      "Pharmasynthesis offers convenience and immediate access to treatment for minor health issues, reducing the need for doctor's visits.",
    buttonText: "Shop Now",
  },
  {
    title: "Medical Devices",
    description:
      "Pharmasynthesis is the right place to get all medical devices for one or more medical purposes",
    buttonText: "Shop Now",
  },
  {
    title: "Consultations",
    description:
      "Pharmasynthesis offers consultations at various facilities and offices, helping patients with their healthcare needs.",
    buttonText: "Shop Now",
  },
];

const Slider = ({ slides = slidesData }) => {
  return (
    <section className="relative md:mx-auto mt-9 md:overflow-hidden md:h-[350px] mb-5 md:mb-[100px]">
      <div className="flex  justify-center flex-wrap items-center md:flex-row flex-col gap-[3%] ">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-[250px] h-[300px] xl:w-[280px] xl:h-[280px] 2xl:w-[320px] 2xl:h-[320px]  flex-shrink-0"
          >
            <div className="2xl:pl-[30px] xl:pl-[36px] md:px-[16px] pb-[18px] pt-[50px] bg-white shadow-xl rounded-lg relative h-full">
              <h3 className="text-[18px] xl:text-[17px]  font-bold mb-[13px]">
                {slide.title}
              </h3>
              <p className="text-[#0c0c0c] text-[13px] font-normal 2xl:text-[18px] mb-[37px]">
                {slide.description}
              </p>
              <Btn
                title="Shop Now"
                linkpath="/shop"
                icon={rightarrow}
                className="absolute 2xl:w-[160px] 2xl:text-[16px] w-[150px] bottom-[19px] left-[16px] xl:left-[36px] 2xl:left-[40px] px-2 text-[14px]"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

Slider.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
};

export default Slider;
