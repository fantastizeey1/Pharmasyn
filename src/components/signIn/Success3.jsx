import React, { useEffect } from "react";
import logo from "/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import Thumbs from "/thumbs.svg";

function Success3() {
  const navigate = useNavigate();

  // Redirect to Sign In page after 3 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/SignIn");
    }, 5000);

    // Clear the timeout if the component unmounts before the timeout is reached
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div>
      <div className="flex items-center mx-[70px] mb-[50px] mt-6 cursor-pointer justify-start gap-2">
        <Link to="/">
          <img
            src={logo}
            alt="Pharmasynthesis Logo"
            className="w-[45px] h-[45px]"
          />
        </Link>
        <Link to="/">
          <p className="text-[#0C0C0C] text-[30px] cursor-pointer font-bold">
            Pharmasynthesis
          </p>
        </Link>
      </div>
      <div className="flex w-[60%] md:w-[60%] mt-20 justify-center items-center h-[50%]  flex-col  rounded-2xl px-6 my-4 py-3  mx-auto">
        <img src={Thumbs} alt="" className="mb-[34px] w-[112px] h-[112px]" />
        <h1 className="p-3 font-bold text[32px]">
          Password Changed successfully!!
        </h1>
        <p className="text-center text-[24px] text-[#0C0C0C]/50">
          Now lets go back to test our new password
          <Link to="/SignIn">
            <button className="w-full mt-[50px] text-white bg-[#013299]">
              Sign in
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Success3;
