import React from "react";
import rightarrow from "/Arrowright.svg";

const Btn = ({ title, linkpath, icon, className }) => {
  return (
    <button
      className={`text-[14px] font-bold text-white bg-[#013299] hover:scale-110 py-3 px-6 mt-0 flex items-center ${className}`}
      aria-label={title}
    >
      <a href={linkpath} className="flex items-center">
        {title}
        {icon && (
          <span className="ml-2">
            <img src={icon} alt="arrow" className="w-4 h-4" />
          </span>
        )}
      </a>
    </button>
  );
};
export default Btn;
