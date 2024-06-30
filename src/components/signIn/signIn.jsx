import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import logo from "/logo.jpg";

function SignIn() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the user data object
      console.log("Email Address:", emailAddress);
      console.log("Password:", password);

      // Send the user data to the backend for authentication
      const response = await fetch(
        `${BASE_URL}/api/Otp/GetOtp?emailAddress=${emailAddress}`,
        {
          method: "get",
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      console.log("Response:", response);

      // Check if the response is successful
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to Sign In:", errorData.responseMessage);

        setErrMsg(
          `Failed to SignIn user: ${
            errorData.responseMessage || response.statusText
          }`
        );
        return;
      }

      // Redirect to the success page
      navigate("/signin2", {
        state: { email: emailAddress, password: password },
      });
    } catch (error) {
      console.error("Error authenticating user:", error);
      setErrMsg("An error occurred while processing your request.");
    }
  };

  return (
    <div>
      <div className="flex items-center mx-[70px] mb-[50px] mt-6 justify-start gap-2">
        <img
          src={logo}
          alt="Pharmasynthesis Logo"
          className="w-[45px] h-[45px]"
        />
        <p className="text-[#0C0C0C] text-[30px] font-bold">Pharmasynthesis</p>
      </div>
      <div className="flex justify-center items-center flex-col bg-white w-full">
        <div className="flex w-[60%] md:w-[40%] flex-col  rounded-2xl px-6 my-4 py-3 ">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded shadow-md"
          >
            <h2 className="text-2xl font-bold text-[#013299] mb-4">Sign In</h2>
            <div className="mb-4">
              <label htmlFor="identifier" className="block text-gray-700">
                Email Address
              </label>
              <div className="relative flex items-center ">
                {emailAddress === "" && (
                  <HiOutlineMail className="absolute left-3 w-5 h-5 text-[#0C0C0C]/50" />
                )}
                <input
                  type="text"
                  id="identifier"
                  value={emailAddress}
                  placeholder="Enter Your Email"
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="block w-full px-4 py-2 placeholder:pl-10  rounded mt-1 focus-within:text-gray-600 placeholder:text-[#0C0C0C]/50 text-[#0C0C0C]/50 p-2 pr-3 border-2 border-[#0C0C0C]/5"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <div className="relative flex items-center ">
                {password === "" && (
                  <HiOutlineLockClosed className="absolute left-3 w-5 h-5 text-[#0C0C0C]/50" />
                )}
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                  className="block w-full px-4 py-2 focus:outline-none placeholder:pl-10 placeholder:text-[#0C0C0C]/50 text-[#0C0C0C] p-2 pr-3 border-2 border-[#0C0C0C]/5 rounded mt-1"
                  required
                />
              </div>
            </div>
            <div className="mt-4 text-sm text-start text-[#0C0C0C]">
              Forgot Password?
              <Link
                to="/forgot-password"
                className="text-[#013299] hover:underline"
              >
                Click Here
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#013299] text-white py-2 px-4 rounded-lg hover:bg-[#2b50a0]"
            >
              Sign In
            </button>

            <p className="mt-2 text-sm text-end text-black">
              Don't have an account?
              <Link
                to="/Register"
                className="text-[#013299] z-50 hover:underline ml-2"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
