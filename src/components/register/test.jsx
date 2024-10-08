import React, { useState, useEffect, useRef } from "react";
import { FaUserCheck, FaCircleInfo } from "react-icons/fa6";
import { FaUserTimes, FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "/src/index.css";
import { BASE_URL } from "../../config";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const phoneRegex = /^(\+?\d{1,3}[-\s]?)?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/;

function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");

  const [address, setAddress] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [MatchFocus, setMatchFocus] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [userId, setUserId] = useState(null); // Initialize userId with null or an initial value

  const location = useLocation();
  const userType = location.state?.userType || "1"; // Default to "1" if userType is not provided

  const navigate = useNavigate();
  console.log(userType);

  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    return validEmail && validPwd && validMatch && validPhone;
  };

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const result = emailRegex.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = phoneRegex.test(phone);

    setValidPhone(result);
  }, [phone]);

  useEffect(() => {
    const result = passwordRegex.test(pwd);

    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  // Event handler to capture user type selection
  // const handleUserTypeChange = (e) => {
  //   setUserType(parseInt(e.target.value, 10));
  // };
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  // Convert userType to a number using parseInt
  const userTypeNumber = parseInt(userType, 10);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    setIsLoading(true);

    try {
      const formData = {
        userType: parseInt(userType, 10),
        companyName: user,
        companyEmail: email,
        password: pwd,
        repeatPassword: matchPwd,
        phoneNumber: phone,
        address: address,
      };

      const response = await fetch(`${BASE_URL}/api/Registration/StepOne`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrMsg(
          `Failed to register user: ${
            errorData.responseMessage || response.statusText
          }`
        );
        return;
      }

      const responseData = await response.json();
      localStorage.setItem("userId", responseData.userId);
      localStorage.setItem("userType", parseInt(formData.userType, 10));

      setSuccess(true);

      navigate("/register2", { state: { userType } });
    } catch (error) {
      setErrMsg("An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {
        <div className="flex justify-center items-center flex-col bg-white  w-full">
          <div className="flex w-[60%] md:w-[40%]  flex-col  rounded-2xl px-6 my-4 py-3 ">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : " offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1 className="  font-bold text-3xl">Register Account!</h1>
            <p>
              For the purpose of account regulation, your details are required.
            </p>
            <form action="" onSubmit={handleSubmit}>
              {/* <label htmlFor="userType" className="mb-2">
                Choose your user type:
              </label>
              <select
                id="userType"
                name="userType"
                onChange={handleUserTypeChange}
                value={userType}
                className="rounded-lg text-[#0C0C0C] p-2 border-2 border-[#0C0C0C]/50 placeholder:text-[#0C0C0C]/50 placeholder:text-[14px]"
              >
                <option value={1}>Pharmaceutical Company</option>
                <option value={2}>Wholesale Pharmacy</option>
                <option value={3}>Retail Pharmacy</option>
                <option value={4}>Hospital Pharmacy</option>{" "}
                
                <option value={5}>Doctor</option> 
                <option value={6}>Pharmacist</option> 
              </select> */}

              <label htmlFor="name" className="mb-2">
                Full Name:
              </label>
              <input
                type="text"
                className="rounded-lg text-[#0C0C0C] p-2 border-2 border-[#0C0C0C]/50 placeholder:text-[#0C0C0C]/50 placeholder:text-[14px] "
                ref={userRef}
                onChange={(e) => setUser(e.target.value)} // Update the user state
                required
                placeholder="Enter Full Name"
              />
              <label htmlFor="email" className="mb-2">
                E-mail Address:
                <span className={validEmail ? "valid" : "hide"}>
                  <FaUserCheck size={30} />
                </span>
                <span className={validEmail || !email ? "hide" : "invalid"}>
                  <FaUserTimes size={30} />
                </span>
              </label>
              <input
                type="email"
                name=""
                id="email"
                className="rounded-lg text-[#0C0C0C] p-2 border-2 border-[#0C0C0C]/50 placeholder:text-[#0C0C0C]/50 placeholder:text-[14px]"
                autoComplete="on"
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter Email Address"
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="mailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                id="mailnote"
                className={`flex flex-row gap-1 bg-[#ee4141] p-1 ${
                  emailFocus && !validEmail ? "instructions" : "offscreen"
                }`}
              >
                <FaCircleInfo size={20} />
                Input a correct email address
              </p>

              <label htmlFor="phoneNumber" className="mb-2">
                Phone Number:
                <span className={validPhone ? "valid" : "hide"}>
                  <FaUserCheck size={30} />
                </span>
                <span className={validPhone || !phone ? "hide" : "invalid"}>
                  <FaUserTimes size={30} />
                </span>
              </label>
              <input
                type="tel"
                name=""
                id="phoneNumber"
                className="rounded-lg text-[#0C0C0C] p-2 border-2 border-[#0C0C0C]/50 placeholder:text-[#0C0C0C]/50 placeholder:text-[14px]"
                placeholder="Enter Phone Number"
                autoComplete="off"
                onChange={(e) => setPhone(e.target.value)}
                required
                aria-invalid={validPhone ? "false" : "true"}
                aria-describedby="phonenote"
                onFocus={() => setPhoneFocus(true)}
                onBlur={() => setPhoneFocus(false)}
              />
              <p
                id="phonenote"
                className={`flex flex-row gap-1 bg-[#ee4141] p-1  ${
                  phoneFocus && !validPhone ? "instructions" : "offscreen"
                } `}
              >
                <FaCircleInfo size={20} />
                Input a correct phone number
              </p>

              <label htmlFor="addressLine1" className="mb-2">
                Address:
              </label>
              <textarea
                id="address"
                name="address"
                rows="2"
                ref={userRef}
                onChange={handleAddressChange}
                value={address}
                placeholder="Enter Street address"
                className="rounded-lg text-[#0C0C0C] p-2 border-2 border-[#0C0C0C]/50 placeholder:text-[#0C0C0C]/50 placeholder:text-[14px]"
                required
              ></textarea>

              <label htmlFor="city" className="mb-2">
                City:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                className="rounded-lg text-[#0C0C0C] p-2 border-2 border-[#0C0C0C]/50 placeholder:text-[#0C0C0C]/50 placeholder:text-[14px]"
                required
              />

              <label htmlFor="state" className="mb-2">
                State:
              </label>
              <select
                id="state"
                name="state"
                className="rounded-lg text-[#0C0C0C]/50 p-2 pr-3 border-2 border-[#0C0C0C]/50"
                required
              >
                <option value="">Select State</option>
                <option value="Abia">Abia</option>
                <option value="Adamawa">Adamawa</option>
                <option value="Akwa Ibom">Akwa Ibom</option>
                <option value="Anambra">Anambra</option>
                <option value="Bauchi">Bauchi</option>
                <option value="Bayelsa">Bayelsa</option>
                <option value="Benue">Benue</option>
                <option value="Borno">Borno</option>
                <option value="Cross River">Cross River</option>
                <option value="Delta">Delta</option>
                <option value="Ebonyi">Ebonyi</option>
                <option value="Edo">Edo</option>
                <option value="Ekiti">Ekiti</option>
                <option value="Enugu">Enugu</option>
                <option value="Gombe">Gombe</option>
                <option value="Imo">Imo</option>
                <option value="Jigawa">Jigawa</option>
                <option value="Kaduna">Kaduna</option>
                <option value="Kano">Kano</option>
                <option value="Katsina">Katsina</option>
                <option value="Kebbi">Kebbi</option>
                <option value="Kogi">Kogi</option>
                <option value="Kwara">Kwara</option>
                <option value="Lagos">Lagos</option>
                <option value="Nasarawa">Nasarawa</option>
                <option value="Niger">Niger</option>
                <option value="Ogun">Ogun</option>
                <option value="Ondo">Ondo</option>
                <option value="Osun">Osun</option>
                <option value="Oyo">Oyo</option>
                <option value="Plateau">Plateau</option>
                <option value="Rivers">Rivers</option>
                <option value="Sokoto">Sokoto</option>
                <option value="Taraba">Taraba</option>
                <option value="Yobe">Yobe</option>
                <option value="Zamfara">Zamfara</option>
                <option value="FCT">Federal Capital Territory</option>
              </select>

              <label htmlFor="country" className="mb-2">
                Country:
              </label>
              <input
                type="text"
                className="rounded-lg text-[#0C0C0C] p-1 border-2 border-[#0C0C0C]/50 placeholder:text-[#0C0C0C]/50 placeholder:text-[14px]"
                id="country"
                name="country"
                placeholder="Enter Country"
                required
              />

              <label htmlFor="password" className="mb-2">
                Password:
                <span className={validPwd ? "valid" : "hide"}>
                  <FaUserCheck size={30} />
                </span>
                <span className={validPwd || !pwd ? "hide" : "invalid"}>
                  <FaUserTimes size={30} />
                </span>
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                required
                placeholder="Enter Your password"
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                className="rounded-lg text-[#0C0C0C] p-1 border-2 border-[#0C0C0C]/50 placeholder:text-[#0C0C0C]/50 placeholder:text-[14px]"
              />
              <p
                id="pwdnote"
                className={` flex flex-row gap-1 bg-[#ee4141] p-1   ${
                  pwdFocus && !validPwd ? "instructions" : "offscreen"
                }`}
              >
                <FaCircleInfo size={20} />
                8 to 24 characters. <br />
                Must include Uppercase and Lowercase letters, a number and a
                special character <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hasttag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percentage">%</span>
              </p>
              <label htmlFor="confirm_pwd" className="mb-2">
                Confirm Password:
                <span className={validMatch && matchPwd ? "valid" : "hide"}>
                  <FaUserCheck size={30} />
                </span>
                <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                  <FaUserTimes size={30} />
                </span>
              </label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                placeholder="Confirm Password"
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                className="rounded-lg text-[#0C0C0C] p-1 border-2 border-[#0C0C0C]/50 placeholder:text-[#0C0C0C]/50 placeholder:text-[14px]"
              />
              <p
                id="confirmnote"
                className={`flex flex-row gap-1 bg-[#ee4141] p-1  ${
                  MatchFocus && !validMatch ? "instructions" : "offscreen"
                }`}
              >
                <FaCircleInfo size={20} />
                Must match the first password input field
              </p>
              <button
                type="submit"
                disabled={
                  !validPwd ||
                  !validMatch ||
                  !validEmail ||
                  !validPhone ||
                  isLoading
                }
                className={`p-2 text-l border-2 cursor-pointer
        ${
          !validPwd || !validMatch || !validEmail || !validPhone || isLoading
            ? "bg-red-600 disabled:bg-[#49597e] cursor-not-allowed"
            : "bg-blue-600 enabled:bg-[#013299] cursor-pointer"
        }
      `}
              >
                {isLoading ? "Loading..." : "Create Account"}
              </button>
            </form>
            <p className="text-yellow-50">
              Already registered? <br />
              <Link to="/SignIn">Sign In</Link>
            </p>
          </div>
        </div>
      }
    </>
  );
}

export default Register;
