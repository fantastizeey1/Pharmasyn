import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";

const Forgotpassword2 = () => {
  const [otp, setOtp] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const otpRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submit logic here
    if (otp === "") {
      setErrMsg("Authentication code is required");
      errRef.current.focus();
    } else {
      // Submit form
      console.log("Form submitted with OTP", otp);
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
      <div className="flex justify-center items-center flex-col bg-white w-full">
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
              Verify code
            </h2>
            <p className="text-[18px] mb-[20px] text-[#0C0C0C]/50">
              An authentication code has been sent to your email.
            </p>
            <div className="mb-[20px]">
              <label
                htmlFor="otp"
                className="block text-[#0C0C0C] mb-[21px] text-[26px]"
              >
                Authentication Code
              </label>
              <input
                ref={otpRef}
                type="number"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="block w-full px-4 py-2 focus:outline-none placeholder:pl-10 placeholder:text-[#0C0C0C]/50 text-[#0C0C0C] p-2 pr-3 border-2 border-[#0C0C0C]/5 rounded mt-1"
                required
              />
            </div>
            <p className="mt-2 text-sm text-start text-black">
              Didn't receive a code?
              <Link
                to="/ResendCode"
                className="text-[#013299] z-50 hover:underline ml-2"
              >
                Resend
              </Link>
            </p>
            <button
              type="submit"
              className="w-full bg-[#013299] text-white py-2 px-4 text-[30px] rounded-lg hover:bg-[#2b50a0]"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword2;