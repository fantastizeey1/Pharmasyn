import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../../config";
import { AiOutlineLeft } from "react-icons/ai";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";

function SignIn2() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const otpRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => {
    setIsLoading(true);

    // Simulate an API call or any async operation
    setTimeout(() => {
      setIsLoading(false);
    }, 500); // Set the timeout duration to 3000 milliseconds (3 seconds)
  };

  useEffect(() => {
    if (location.state && location.state.email && location.state.password) {
      setEmailAddress(location.state.email);
      setPassword(location.state.password);
    }
  }, [location]);

  const handleSignIn = async () => {
    try {
      const formData = {
        clientId: "client1",
        clientSecret: "secret1",
        userName: emailAddress,
        password: password,
        otp: otp,
      };

      const response = await fetch(`${BASE_URL}/api/Identity/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

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

      const responseData = await response.json();
      const userId = responseData.userId;
      localStorage.setItem("userId", userId);
      sessionStorage.setItem("access_token", responseData.access_token);
      sessionStorage.setItem("expires_in", responseData.expires_in);
      sessionStorage.setItem("refresh_token", responseData.refresh_token);
      sessionStorage.setItem("token_type", responseData.token_type);
      sessionStorage.setItem("scope", responseData.scope);

      navigate("/Shop");
    } catch (error) {
      console.error("Error authenticating user:", error);
      setErrMsg("An error occurred while processing your request.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn();
  };

  return (
    <div>
      <div className="flex items-center mx-[70px] mb-[10px] mt-3 justify-start gap-2">
        <Link to="/SignIn" className="flex items-center">
          <AiOutlineLeft className="w-4 h-4" />
          <p className="text-[#0C0C0C] text-[15px] ">back</p>
        </Link>
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
            <h2 className="text-2xl font-bold text-[#013299]  mb-2">Sign In</h2>
            <div className="mb-4">
              <label htmlFor="identifier" className="block text-[#0C0C0C]/50">
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
            <div className="mb-2">
              <label htmlFor="password" className="block text-[#0C0C0C]/50">
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

            <div className="mb-2 block text-[#0C0C0C]/50">
              <label htmlFor="otp" className="block text-[#0C0C0C]/70">
                Enter Code
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
              onClick={handleClick}
              type="submit"
              className="w-full bg-[#013299] text-white py-2 px-4 rounded-lg hover:bg-[#2b50a0]"
            >
              {isLoading ? "Loading..." : "Verify OTP"}
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
}

export default SignIn2;
