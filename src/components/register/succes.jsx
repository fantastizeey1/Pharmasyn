import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { ClipLoader } from "react-spinners";

function Success() {
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
    <div className="flex w-[60%] md:w-[40%] mt-20 justify-center items-center h-[50%]  flex-col bg-[#086108] rounded-2xl px-6 my-4 py-3 text-[#e4b50b] mx-auto">
      <FaCheckCircle />
      <ClipLoader
        color="rgba(195, 199, 13, 1)"
        visible={true}
        height={96}
        width={96}
        strokeWidth={5}
        className="m-5"
      />

      <h1 className="p-3">Account created successfully!!</h1>
      <p className="text-center">
        Welcome aboard! Start your success journey with Pharmasynthesis!{" "}
        <Link to="/SignIn">click here</Link>.
      </p>
      <button>Let's Start</button>
    </div>
  );
}

export default Success;
