import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";

const Forgotpassword = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submit logic here
    if (emailAddress === "") {
      setErrMsg("Email address is required");
      errRef.current.focus();
    } else {
      // Submit form
      console.log("Form submitted", emailAddress);
    }
  };

  return (
    <div>
      <div className="flex items-center mx-[70px] mb-[10px] mt-3 justify-start gap-2">
        <Link to="/SignIn" className="flex items-center">
          <AiOutlineLeft className="w-4 h-4" />
          <p className="text-[#0C0C0C] text-[15px] ">Back to login</p>
        </Link>
      </div>
      <div className="flex justify-center items-center  flex-col bg-white w-full">
        <div className="flex w-[60%] md:w-[50%] flex-col shadow-lg rounded-2xl px-6 my-4 py-3 ">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded ">
            <h2 className="text-[30px] font-bold text-[#0C0C0C] mb-2">
              Forgot your password?
            </h2>
            <p className="text-[18px] mb-[20px] text-[#0C0C0C]/50">
              Don’t worry, happens to all of us. Enter your email below <br />
              to recover your password
            </p>
            <div className="mb-[20px]">
              <label
                htmlFor="identifier"
                className="block text-[#0C0C0C] mb-[21px] text-[26px]"
              >
                Email
              </label>
              <div className="relative flex  items-center ">
                {emailAddress === "" && (
                  <HiOutlineMail className="absolute left-3 w-5 h-5 text-[#0C0C0C]/50" />
                )}
                <input
                  type="email"
                  id="identifier"
                  value={emailAddress}
                  placeholder="Enter Your Email"
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="block w-full px-4 py-2 placeholder:pl-10 rounded mt-1 focus-within:text-[#0C0C0C]/50 placeholder:text-[#0C0C0C]/50 text-[#0C0C0C]/50 p-2 pr-3 border-2  border-[#0C0C0C]/50"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#013299] text-white py-2 px-4 text-[30px] rounded-lg hover:bg-[#2b50a0]"
            >
              Submit
            </button>

            <p className="mt-2 text-sm text-end text-black">
              Don't have an account?
              <Link
                to="/SignUp"
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
};

export default Forgotpassword;
