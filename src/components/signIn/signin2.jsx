import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../../config";

function SignIn2() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const otpRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

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

      navigate("/Signin-Success");
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
    <div className="flex justify-center items-center flex-col bg-white w-full">
      <div className="flex w-[60%] md:w-[40%] flex-col bg-[#086108] rounded-2xl px-6 my-4 py-3 text-[#e4b50b]">
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
          <h2 className="text-2xl font-bold mb-4">Sign In</h2>
          <div className="mb-4">
            <label htmlFor="identifier" className="block text-gray-700">
              Email Address
            </label>
            <input
              type="text"
              id="identifier"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className="block w-full px-4 py-2 border rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 border rounded mt-1"
              required
            />
          </div>

          <div className="mb-4 block text-gray-700">
            <label htmlFor="otp">One Time Password O.T.P.</label>
            <input
              ref={otpRef}
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="block w-full px-4 py-2 border rounded mt-1"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Verify OTP
          </button>
          <div className="mt-4 text-sm text-center text-[#e4b50b]">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <p className="mt-2 text-sm text-center text-black">
            Don't have an account?
            <Link
              to="/Register"
              className="text-blue-500 visited:text-red-500 z-50 hover:underline ml-2"
            >
              Sign Up Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn2;
