import React from "react";

const DocumentCard = ({ title, fileName, fileSize }) => {
  return (
    <div className="bg-white shadow-md rounded-lg  flex flex-col items-start justify-start overflow-hidden space-y-4 w-[400px] h-[320px] border border-[#CACACA]">
      <div className="w-full h-14 flex items-center justify-self-start p-2 bg-[#F9FAFB] border-b border-black/35 mb-28">
        <h2 className="pl-3 w-full font-bold text-[14px] ">{title}</h2>
      </div>
      <div className="flex justify-between items-center w-full ">
        <div className="flex flex-col">
          <p>Effective Date</p>
          <p>August 5, 2024</p>
        </div>
        <div>
          <p>Effective Date</p>
          <p>August 5, 2024</p>
        </div>
      </div>
      <div className="flex items-center justify-start space-x-2 max-w-[147px] h-[49px] border border-[#CACACA] rounded-md ml-10 p-2 cursor-pointer ">
        <img
          src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
          alt="PDF Icon"
          className="w-8 h-8"
        />
        <div className="text-[7.5px] text-clip ">
          <p className="text-gray-700 font-medium ">{fileName}</p>
          <p className="text-gray-500 ">{fileSize}</p>
        </div>
      </div>
      <div className="flex justify-between items-center w-full px-10 pb-8 ">
        <button className="bg-transparent   border border-[#CACACA] rounded-md text-gray-700 px-5 py-3 text-[13px] hover:bg-gray-300">
          Reject
        </button>
        <button className="bg-[#013299] text-white  rounded-md hover:bg-blue-700 text-[13px] px-5 py-3">
          Accept
        </button>
      </div>
    </div>
  );
};

export default DocumentCard;
