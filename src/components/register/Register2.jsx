import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../../config";
import logo from "/logo.jpg";

const Register2 = () => {
  const [cacFileBase64, setCacFileBase64] = useState("");
  const [phmLicenseFileBase64, setPhmLicenseFileBase64] = useState("");
  const [premiseFileBase64, setPremiseFileBase64] = useState("");
  const [hefammaLicenseBase64, setHefammaLicenseBase64] = useState("");
  const [idCardBase64, setIdCardBase64] = useState("");
  const [nmaLicenseBase64, setNmaLicenseBase64] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || "1"; // Default to "1" if userType is not provided

  const [isLoading, setIsLoading] = useState(false);

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

    const requestData = {
      userId: userId,
      cac: ["1", "2", "3", "4"].includes(userType.toString())
        ? cacFileBase64
        : "",
      companyPharmacyLicense: ["1", "2", "3", "4"].includes(userType.toString())
        ? phmLicenseFileBase64
        : "",
      premiseLicense: ["1", "2", "3", "4"].includes(userType.toString())
        ? premiseFileBase64
        : "",
      hefammaLicense: userType === 4 ? hefammaLicenseBase64 : "",
      workIdCard: ["5", "6"].includes(userType.toString()) ? idCardBase64 : "",
      nmaLicense: userType === 6 ? nmaLicenseBase64 : "",
      individualPharmacyLicense: userType === 5 ? phmLicenseFileBase64 : "",
    };

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
    } finally {
      setIsLoading(false);
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
            {["1", "2", "3", "4"].includes(userType.toString()) && (
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

            {["1", "2", "3", "4"].includes(userType.toString()) && (
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

            {["1", "2", "3", "4"].includes(userType.toString()) && (
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

            {userType === 4 && (
              <>
                <label
                  htmlFor="hefammaLicense"
                  className="block text-[#0C0C0C]/70"
                >
                  Upload your company's HEFAMMA License:
                </label>
                <input
                  type="file"
                  id="hefammaLicense"
                  accept=".pdf, image/jpeg, image/jpg, image/png"
                  onChange={(e) => handleFileUpload(e, setHefammaLicenseBase64)}
                  className="rounded-lg text-[#0C0C0C] p-2 border-2 border-[#0C0C0C]/50 placeholder:text-[#0C0C0C]/50"
                />
              </>
            )}

            {userType === 5 && (
              <>
                <label htmlFor="idCard" className="block text-[#0C0C0C]/70">
                  Upload your ID Card of Current Workplace:
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

            {userType === 5 && (
              <>
                <label htmlFor="license" className="block text-[#0C0C0C]/70">
                  Upload your PCN License:
                </label>
                <input
                  type="file"
                  id="license"
                  accept=".pdf, image/jpeg, image/jpg, image/png"
                  onChange={(e) => handleFileUpload(e, setPhmLicenseFileBase64)}
                  className="rounded-lg text-[#0C0C0C] p-2 border-2 border-[#0C0C0C]/50 placeholder:text-[#0C0C0C]/50"
                />
              </>
            )}

            {userType === 6 && (
              <>
                <label htmlFor="nmaLicense" className="block text-[#0C0C0C]/70">
                  Upload your NMA License:
                </label>
                <input
                  type="file"
                  id="nmaLicense"
                  accept=".pdf, image/jpeg, image/jpg, image/png"
                  onChange={(e) => handleFileUpload(e, setNmaLicenseBase64)}
                  className="rounded-lg text-[#0C0C0C] p-2 border-2 border-[#0C0C0C]/50 placeholder:text-[#0C0C0C]/50"
                />
              </>
            )}

            {userType === 6 && (
              <>
                <label htmlFor="idCard" className="block text-[#0C0C0C]/70">
                  Upload your ID Card of Current Workplace:
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

            {errMsg && (
              <p className="text-red-500 text-center text-sm">{errMsg}</p>
            )}

            <button
              type="submit"
              className="bg-[#0C0C0C] text-white py-2 px-4 rounded mt-4"
            >
              {isLoading ? "Loading..." : "Complete Registration"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register2;
