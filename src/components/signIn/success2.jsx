import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function Success2() {
  const navigate = useNavigate();

  // Redirect to Dashboard page after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/Dashboard");
    }, 5000);

    // Clear the timeout if the component unmounts before the timeout is reached
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="flex w-[60%] md:w-[40%] justify-center items-center h-[50%]  flex-col bg-[#086108] rounded-2xl px-6 my-4 py-3 text-[#e4b50b] mx-auto">
      {/* Animate the icon */}
      <ClipLoader
        visible="true"
        height={96}
        width={96}
        strokeWidth={5}
        className="m-5"
      />

      <div className="animate-pulse">
        <FaCheckCircle />
      </div>
      <h1 className="p-3">Signed in Successfully</h1>
      <p className="text-center">
        Redirecting to your Dashboard page... <br />
        If you are not automatically redirected,{" "}
        <Link to="/Dashboard" className="text-red-400">
          click here
        </Link>
      </p>
    </div>
  );
}

export default Success2;
