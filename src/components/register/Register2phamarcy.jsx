import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../../config";

const Register2phamarcy = () => {
  const [cacFileBase64, setCacFileBase64] = useState("");
  const [phmLicenseFileBase64, setPhmLicenseFileBase64] = useState("");
  const [premiseFileBase64, setPremiseFileBase64] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Extract userType from URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const userType = parseInt(searchParams.get("userType"), 10); // Convert to number using parseInt

  const handleFileUpload = (e, setBase64File) => {
    const uploadedFile = e.target.files[0];

    // Convert the file to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target.result.split(",")[1]; // Remove the data URI prefix
      setBase64File(base64String);
    };
    reader.readAsDataURL(uploadedFile);
  };

  const handleStage2Submit = async (e) => {
    e.preventDefault();

    // Retrieving userId from localStorage
    const userId = localStorage.getItem("userId");

    // Create the request payload with base64 strings

    const requestData = {
      userId: userId, // Use the stored userId
      userType: userType,
      cac: cacFileBase64,
      companyPharmacyLicense: "",
      premiseLicense: premiseFileBase64,
      hospitalPharmacyLicense: phmLicenseFileBase64,
      mdcnLicense: "",
      workIdCard: "",
      individualPharmacyLicense: "",
    };
    console.log(requestData);

    try {
      const response = await fetch(`${BASE_URL}/api/Registration/StepTwo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      console.log("Response:", response); // Log the response

      if (!response.ok) {
        // Handle error response from backend
        const errorData = await response.json();
        console.error("Failed to register user:", errorData.responseMessage);
        setErrMsg(
          `Failed to register user: ${
            errorData.responseMessage || response.statusText
          }`
        );
        return;
      }

      // If successful response from backend
      console.log("User registered successfully!");
      // Redirect the user to a success page or any desired location
      navigate("/success");
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error registering user:", error);
      setErrMsg("An error occurred while processing your request.");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col bg-white w-full">
      <div className="flex w-[60%] md:w-[40%] flex-col bg-[#086108] rounded-2xl px-6 my-4 py-3 text-[#e4b50b]">
        <h1 className="text-yellow-400 font-bold text-3xl">
          Sign Up - Stage 2
        </h1>
        <form onSubmit={handleStage2Submit} className="flex flex-col gap-4">
          {/* File input elements */}
          <label htmlFor="cacCertificate" className="text-white">
            Upload your company's CAC certificate:
          </label>
          <input
            type="file"
            id="cacCertificate"
            accept=".pdf, image/jpeg, image/jpg, image/png"
            onChange={(e) => handleFileUpload(e, setCacFileBase64)}
          />

          <label htmlFor="pharmacyLicense" className="text-white">
            Upload your company's Pharmacy License:
          </label>
          <input
            type="file"
            id="pharmacyLicense"
            accept=".pdf, image/jpeg, image/jpg, image/png"
            onChange={(e) => handleFileUpload(e, setPhmLicenseFileBase64)}
          />

          <label htmlFor="premiseLicense" className="text-white">
            Upload your company's Premise License:
          </label>
          <input
            type="file"
            id="premiseLicense"
            accept=".pdf, image/jpeg, image/jpg, image/png"
            onChange={(e) => handleFileUpload(e, setPremiseFileBase64)}
          />

          {/* Error message display */}
          {errMsg && <p className="text-red-500">{errMsg}</p>}

          <button
            type="submit"
            className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500"
          >
            Complete Sign Up
          </button>
        </form>
        <p className="text-yellow-50">
          Already registered? <br />
          <Link to="/SignIn">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register2phamarcy;
