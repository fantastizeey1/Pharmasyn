import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";

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

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Sign In
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

export default SignIn;
