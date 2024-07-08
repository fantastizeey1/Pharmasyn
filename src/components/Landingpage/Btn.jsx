import React from "react";
import rightarrow from "/Arrowright.svg";
import { Link } from "react-router-dom";

const Btn = ({ title, linkpath, icon, className }) => {
  return (
    <Link to={linkpath}>
      <button
        className={`text-[14px] font-bold text-white bg-[#013299] hover:scale-110 py-3 px-6 mt-0 flex items-center ${className}`}
        aria-label={title}
      >
        <p className="flex items-center">
          {title}
          {icon && (
            <span className="ml-2">
              <img src={icon} alt={icon} className="w-4 h-4" />
            </span>
          )}
        </p>
      </button>
    </Link>
  );
};
export default Btn;
