import React from "react";
import Btn from "./Btn";

const Featuredproducts = () => {
  const products = [
    {
      img: "/vitac.svg",
      name: "Vitamin C",
      price: "₦5,000",
    },
    {
      img: "/gel.svg",
      name: "Cleansing Gel",
      price: "₦5,000",
    },
    {
      img: "/baby.svg",
      name: "Baby Wet Wipes",
      price: "₦5,000",
    },
    {
      img: "/baconil.svg",
      name: "Baconil Tablet",
      price: "₦5,000",
    },
    {
      img: "/nestle.svg",
      name: "Nestle High Protein",
      price: "₦5,000",
    },
    {
      img: "/nivea.svg",
      name: "Nivea Face Wash",
      price: "₦5,000",
    },
  ];

  return (
    <section id="Services" className="mx-[15px] md:mx-[150px] mt-[140px]">
      <h2 className="font-bold md:text-[40px] text-center mb-[120px]">
        Featured Products
      </h2>
      <div className="md:grid md:grid-cols-3 md:gap-x-4 md:gap-y-[130px]">
        {products.map((product, index) => (
          <div
            key={index}
            className="shadow-xl w-[350px] rounded-lg h-[408px] ml-[30px] flex-1 flex-wrap flex justify-center items-center flex-col"
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
    </section>
  );
};

export default Featuredproducts;
