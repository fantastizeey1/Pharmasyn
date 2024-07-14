import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../../config";
import logo from "/logo.jpg";

const Register2 = () => {
  const [cacFileBase64, setCacFileBase64] = useState("");
  const [phmLicenseFileBase64, setPhmLicenseFileBase64] = useState("");
  const [premiseFileBase64, setPremiseFileBase64] = useState("");
  const [idCardBase64, setIdCardBase64] = useState("");
  const [licenseBase64, setLicenseBase64] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const accountType = location.state?.accountType || "default";

  const getUserType = (accountType) => {
    switch (accountType) {
      case "pharmaceuticalCompany":
        return "1";
      case "wholesalePharmacy":
        return "2";
      case "retailPharmacy":
        return "3";
      case "hospitalPharmacy":
        return "4";
      case "doctor":
        return "5";
      case "pharmacist":
        return "6";
      default:
        return "1";
    }
  };

  useEffect(() => {
    const userTypeFromAccountType = getUserType(accountType);
    setUserType(userTypeFromAccountType);
    localStorage.setItem("userTypeNumber", userTypeFromAccountType);
    console.log("Setting userType from accountType:", userTypeFromAccountType);
  }, [accountType]);

  const [userType, setUserType] = useState(() => getUserType(accountType));

  const handleFileUpload = (e, setBase64File) => {
    const uploadedFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64String = event.target.result.split(",")[1];
      setBase64File(base64String);
    };

    if (uploadedFile) {
      reader.readAsDataURL(uploadedFile);
    }
  };

  const handleStage2Submit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    const userTypeNumber = localStorage.getItem("userTypeNumber");

    console.log("userId:", userId);
    console.log("userTypeNumber:", userTypeNumber);

    const requestData = {
      userId: userId,
      cac: cacFileBase64,
      companyPharmacyLicense:
        userTypeNumber === "1" || userTypeNumber === "2"
          ? phmLicenseFileBase64
          : "",
      premiseLicense: premiseFileBase64,
      hospitalPharmacyLicense:
        userTypeNumber === "4" ? phmLicenseFileBase64 : "",
      mdcnLicense: userTypeNumber === "5" ? licenseBase64 : "",
      workIdCard: userTypeNumber === "5" ? idCardBase64 : "",
      individualPharmacyLicense: userTypeNumber === "6" ? licenseBase64 : "",
    };

    console.log("requestData:", requestData);

    try {
      const response = await fetch(`${BASE_URL}/api/Registration/StepTwo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
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

      navigate("/success");
    } catch (error) {
      setErrMsg("An error occurred while processing your request.");
    }
  };

  return (
    <div>
      <div className="flex items-center mx-[70px] mb-[250x] mt-3 cursor-pointer justify-start gap-2">
        <Link to="/">
          <img
            src={logo}
            alt="Pharmasynthesis Logo"
            className="w-[30px] h-[30px]"
          />
        </Link>
        <Link to="/">
          <p className="text-[#0C0C0C] text-[20px] cursor-pointer font-bold">
            Pharmasynthesis
          </p>
        </Link>
      </div>
      <div className="flex justify-center items-center flex-col bg-white w-full">
        <div className="flex w-[60%] md:w-[50%] flex-col shadow-lg rounded-2xl px-6 my-4 py-3 ">
          <h1 className="text-[30px] font-bold text-[#0C0C0C] mb-2">
            Complete Your Profile!
          </h1>
          <p className="text-[18px] mb-[8px] text-[#0C0C0C]/50">
            For the purpose of account regulation, your <br /> details are
            required.
          </p>
          <form
            onSubmit={handleStage2Submit}
            className="flex flex-col bg-white rounded"
          >
            {["1", "2", "3", "4"].includes(userType) && (
              <>
                <label
                  htmlFor="cacCertificate"
                  className="block text-[#0C0C0C]/70"
                >
                  Upload your company's CAC certificate:
                </label>
                <input
                  type="file"
                  id="cacCertificate"
                  accept=".pdf, image/jpeg, image/jpg, image/png"
                  onChange={(e) => handleFileUpload(e, setCacFileBase64)}
                  className="rounded-lg text-[#0C0C0C] p-2 border-2 border-[#0C0C0C]/50 placeholder:text-[#0C0C0C]/50"
                />
              </>
            )}

            {["1", "2", "4"].includes(userType) && (
              <>
                <label
                  htmlFor="pharmacyLicense"
                  className="block text-[#0C0C0C]/70"
                >
                  Upload your company's Pharmacy License:
                </label>
                <input
                  type="file"
                  id="pharmacyLicense"
                  accept=".pdf, image/jpeg, image/jpg, image/png"
                  onChange={(e) => handleFileUpload(e, setPhmLicenseFileBase64)}
                  className="rounded-lg text-[#0C0C0C] p-2 border-2 border-[#0C0C0C]/50 placeholder:text-[#0C0C0C]/50"
                />
              </>
            )}

            {["1", "2", "3", "4"].includes(userType) && (
              <>
                <label
                  htmlFor="premiseLicense"
                  className="block text-[#0C0C0C]/70"
                >
                  Upload your company's Premise License:
                </label>
                <input
                  type="file"
                  id="premiseLicense"
                  accept=".pdf, image/jpeg, image/jpg, image/png"
                  onChange={(e) => handleFileUpload(e, setPremiseFileBase64)}
                  className="rounded-lg text-[#0C0C0C] p-2 border-2 border-[#0C0C0C]/50 placeholder:text-[#0C0C0C]/50"
                />
              </>
            )}

            {userType === "5" && (
              <>
                <label htmlFor="idCard" className="block text-[#0C0C0C]/70">
                  Upload your ID Card:
                </label>
                <input
                  type="file"
                  id="idCard"
                  accept=".pdf, image/jpeg, image/jpg, image/png"
                  onChange={(e) => handleFileUpload(e, setIdCardBase64)}
                  className="rounded-lg text-[#0C0C0C] p-2 border-2 border-[#0C0C0C]/50 placeholder:text-[#0C0C0C]/50"
                />
              </>
            )}

            {userType === "5" && (
              <>
                <label htmlFor="license" className="block text-[#0C0C0C]/70">
                  Upload your MDCN or Pharmacy License:
                </label>
                <input
                  type="file"
                  id="license"
                  accept=".pdf, image/jpeg, image/jpg, image/png"
                  onChange={(e) => handleFileUpload(e, setLicenseBase64)}
                  className="rounded-lg text-[#0C0C0C] p-2 border-2 border-[#0C0C0C]/50 placeholder:text-[#0C0C0C]/50"
                />
              </>
            )}

            {userType === "6" && (
              <>
                <label htmlFor="license" className="block text-[#0C0C0C]/70">
                  Upload your Pharmacy License:
                </label>
                <input
                  type="file"
                  id="license"
                  accept=".pdf, image/jpeg, image/jpg, image/png"
                  onChange={(e) => handleFileUpload(e, setLicenseBase64)}
                  className="rounded-lg text-[#0C0C0C] p-2 border-2 border-[#0C0C0C]/50 placeholder:text-[#0C0C0C]/50"
                />
              </>
            )}

            {errMsg && <p className="text-red-500">{errMsg}</p>}

            <button
              type="submit"
              className="w-full bg-[#013299] text-white py-2 px-4 text-[30px] rounded-lg hover:bg-[#2b50a0]"
            >
              Register Account
            </button>
          </form>
          <p className="mt-2 text-sm text-end text-black">
            Already registered?
            <Link
              to="/SignIn"
              className="text-[#013299] z-50 hover:underline ml-2"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register2;
