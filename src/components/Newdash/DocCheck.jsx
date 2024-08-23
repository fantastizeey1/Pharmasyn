import React, { useEffect, useState } from "react";
import Adminheader from "./Adminheader";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import DocumentCard from "./DocumentCard";

const DocCheck = () => {
  return (
    <main className="container mx-auto p-4 font-montserrat">
      <Adminheader />
      <div className="w-[230px] fixed bg-white pl-[15px] pt-[15px] flex flex-col items-start h-screen  rounded-2xl shadow-lg ml-7 mt-[50px]">
        <div className="flex flex-col items-start w-full">
          <div className="flex flex-col mb-[150px] w-full  pl-3">
            <NavLink
              to="/Admin"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-[16px] font-medium mb-[44px] text-blue-500"
                  : "flex items-center text-[16px] font-medium mb-[44px] text-black"
              }
            >
              <img
                src={"/adminicon.svg"}
                alt="icon"
                className="mr-4 w-[20px] h-[20px]"
              />
              Admin
            </NavLink>
            <NavLink
              to="/Docs"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-[16px] font-medium mb-[44px] text-blue-500"
                  : "flex items-center text-[16px] font-medium mb-[44px] text-black"
              }
            >
              <img
                src={"/docicon.svg"}
                alt="icon"
                className="mr-4 w-[20px] h-[20px]"
              />
              Document
            </NavLink>

            <NavLink
              to="/Delivery"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-[16px] font-medium mb-[44px] text-blue-500"
                  : "flex items-center text-[16px] font-medium mb-[44px] text-black"
              }
            >
              <img
                src="/delicon.svg"
                alt="icon"
                className="mr-4 w-[20px] h-[20px]"
              />
              Delivery
            </NavLink>
          </div>

          <div className="flex items-center"></div>
        </div>
      </div>
      <div className="fixed top-[105px] left-[300px] w-[calc(100%-250px)] h-[calc(100%-100px)]">
        <div className="h-[100%] shadow-xl overflow-y-auto">
          <div className="flex justify-between items-start flex-col h-[100%] p-9">
            <h2 className="text-2xl font-bold  mb-8 ">Neuro Pharmacy</h2>
            <div className="flex flex-wrap justify-center gap-6">
              <DocumentCard
                title="Corporate Affairs Commission (CAC) Certificate"
                fileName="CAC Certificate.pdf"
                fileSize="1MB"
              />
              <DocumentCard
                title="Company's Pharmacy License"
                fileName="Company's Pharmacy License.pdf"
                fileSize="1MB"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DocCheck;
