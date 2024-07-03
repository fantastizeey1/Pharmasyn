import React, { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../../config";
import { HiOutlineLockClosed } from "react-icons/hi";
import { FaCircleInfo } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "/logo.jpg";

const ChangePassword = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmailAddress(location.state.email);
    }
    if (location.state && location.state.otp) {
      setOtp(location.state.otp);
    }
  }, [location]);

  const handleSignIn = async () => {
    try {
      const formData = {
        emailAddress: emailAddress,
        password: password,
        confirmPassword: confirmPassword,
        otp: otp,
      };

      const response = await fetch(`${BASE_URL}/api/Login/PasswordReset`, {
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

      navigate("/PasswordSuccess");
    } catch (error) {
      console.error("Error authenticating user:", error);
      setErrMsg("An error occurred while processing your request.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrMsg("Passwords do not match");
      errRef.current.focus();
    } else {
      handleSignIn();
    }
  };

  return (
    <div>
      <div className="flex items-center mx-[70px] mb-[15px] mt-2 cursor-pointer justify-start gap-2">
        <Link to="/">
          <img
            src={logo}
            alt="Pharmasynthesis Logo"
            className="w-[45px] h-[45px]"
          />
        </Link>
        <Link to="/">
          <p className="text-[#0C0C0C] text-[25px] cursor-pointer font-bold">
            Pharmasynthesis
          </p>
        </Link>
      </div>
      <div className="flex justify-center items-center flex-col bg-white w-full">
        <div className="flex w-[60%] md:w-[60%] flex-col  rounded-2xl px-6 my-4 py-3 ">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded ">
            <h2 className="text-[30px] font-bold text-[#0C0C0C] mb-2">
              Forgot your password?
            </h2>
            <p className="text-[18px] mb-[20px] text-[#0C0C0C]/50">
              Your previous password has been reset. Please set a new <br />
              password for your account.
            </p>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div className="mb-2">
              <label htmlFor="password" className="block text-gray-700">
                Create Password
              </label>
              <div className="relative flex items-center">
                {password === "" && (
                  <HiOutlineLockClosed className="absolute left-3 w-5 h-5 text-[#0C0C0C]/50" />
                )}
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setValidPwd(
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,24}$/.test(
                        e.target.value
                      )
                    );
                  }}
                  placeholder="Enter Your Password"
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  className="block w-full px-4 py-2 focus:outline-none placeholder:pl-10 placeholder:text-[#0C0C0C]/50 text-[#0C0C0C] p-2 pr-3 border-2 border-[#0C0C0C]/5 rounded mt-1"
                  required
                />
              </div>
              <p
                id="pwdnote"
                className={`flex flex-row gap-1 bg-[#271919] p-1 ${
                  pwdFocus && !validPwd ? "instructions" : "offscreen"
                }`}
              >
                <FaCircleInfo size={20} />8 to 24 characters. Must include
                Uppercase and Lowercase letters, a number, and a special
                character Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percentage">%</span>
              </p>
            </div>
            <div className="mb-2">
              <label
                htmlFor="confirm_password"
                className="block text-[#0C0C0C]/50"
              >
                Re-enter Password
              </label>
              <div className="relative flex items-center">
                {confirmPassword === "" && (
                  <HiOutlineLockClosed className="absolute left-3 w-5 h-5 text-[#0C0C0C]/50" />
                )}
                <input
                  type="password"
                  id="confirm_password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setValidMatch(e.target.value === password);
                  }}
                  placeholder="Confirm Password"
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  className="block w-full px-4 py-2 focus:outline-none placeholder:pl-10 placeholder:text-[#0C0C0C]/50 text-[#0C0C0C] p-2 pr-3 border-2 border-[#0C0C0C]/5 rounded mt-1"
                  required
                />
              </div>
              <p
                id="confirmnote"
                className={`flex flex-row gap-1 bg-[#352323] p-1 ${
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }`}
              >
                <FaCircleInfo size={20} />
                Must match the first password input field
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-[#013299] text-white py-2 px-4 text-[30px] rounded-lg hover:bg-[#2b50a0]"
            >
              Set Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
