import React from "react";
import Dashheader from "./Dashheader";
import { productz } from "../../constants";
import Btn from "../Landingpage/Btn";
import Discoverus from "../Landingpage/Discoverus";
import Footer from "../Landingpage/Footer";

const Shop = () => {
  return (
    <div className="">
      <Dashheader />
      <div className="mx-[15px] md:mx-[70px]">
        <div className=" mt-[45px] mb-[65px] w-full h-[168px] bg-[#013299] justify-center flex items-center rounded-xl">
          <h1 className="text-[40px] text-white font-bold">PRODUCTS</h1>
        </div>
      </div>
      <div className="mx-[15px] md:mx-[120px]">
        {/* <div>
          <form action="submit">
            <label htmlFor="Medical Devices">
              <input
                type="checkbox"
                id="MedicalDevices"
                name="Medical Devices"
                value="Medical Devices"
              />
            </label>
            <label htmlFor="Medical Devices">
              <input
                type="checkbox"
                id="MedicalDevices"
                name="Medical Devices"
                value="Medical Devices"
              />
            </label>
            <label htmlFor="Medical Devices">
              <input
                type="checkbox"
                id="MedicalDevices"
                name="Medical Devices"
                value="Medical Devices"
              />
            </label>
            <label htmlFor="Medical Devices">
              <input
                type="checkbox"
                id="MedicalDevices"
                name="Medical Devices"
                value="Medical Devices"
              />
            </label>
          </form>
        </div> */}
        <div className="md:grid md:grid-cols-3 md:gap-x-4 lg:gap-x-16 md:gap-y-[130px]">
          {productz.map((product, index) => (
            <div
              key={index}
              className="shadow-xl xl:w-[300px] md:w-[270px] rounded-lg md: h-[380px] xl:h-[408px] ml-[30px] flex-1 flex-wrap flex justify-center items-center flex-col"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-[220px] h-[220px]"
              />
              <h3 className="text-[25px] font-medium mb-1">{product.name}</h3>
              <p className="text-[24px] font-normal mb-3">{product.price}</p>
              <Btn title="Add To Cart" linkpath="/#" />
            </div>
          ))}
        </div>
      </div>
      <Discoverus />
      <Footer />
    </div>
  );
};

export default Shop;
