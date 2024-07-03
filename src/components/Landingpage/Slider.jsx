// Slider.js
import React, { useState, useEffect } from "react";
import Btn from "./Btn";
import rightarrow from "/Arrowright.svg";
import PropTypes from "prop-types";

export const slidesData = [
  {
    title: "Prescription Drugs",
    description:
      "Pharmasynthesis have a wide variety of prescription drugs which can only be obtained with a valid prescription from a licensed healthcare provider",
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

const Slider = ({ slides = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  useEffect(() => {
    if (slides.length === 0) return;

    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        const nextSlide = prevSlide + direction;
        if (nextSlide >= slides.length || nextSlide < 0) {
          setDirection(-direction); // Reverse direction
          return prevSlide; // Stay on the current slide
        }
        return nextSlide;
      });
    }, 3000);

    return () => clearInterval(slideInterval);
  }, [direction, slides.length]);

  if (slides.length === 0) {
    return <div>No slides available</div>;
  }

  return (
    <section className="relative  md:ml-[150px] overflow-hidden h-[350px] mb-5 md:mb-[100px]">
      <div
        className="flex  transition-transform duration-500"
        style={{ transform: `translateX(-${currentSlide * 350}px)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-[350px] h-[280px] ml-[30px] flex-shrink-0"
          >
            <div className="px-[36px] pb-[18px] pt-[50px] bg-white shadow-xl rounded-lg relative h-full">
              <h3 className="text-[20px] font-bold mb-[13px]">{slide.title}</h3>
              <p className="text-[#0c0c0c] mb-[37px]">{slide.description}</p>
              <Btn
                title="Shop Now"
                linkpath="/#"
                icon={rightarrow}
                className="absolute w-[150px] bottom-[19px] left-[36px] px-2 text-[14px]"
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
