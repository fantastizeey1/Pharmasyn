import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config";

function Users() {
  const [selectedOption, setSelectedOption] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const resultsPerPage = 10;

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let userTypeValue = 0; // Default value for "all"

        if (selectedOption !== "all") {
          const optionValues = {
            pharmaceuticalCompany: 1,
            wholesalePharmacy: 2,
            retailPharmacy: 3,
            hospitalPharmacy: 4,
            doctor: 5,
            pharmacist: 6,
          };
          userTypeValue = optionValues[selectedOption];
        }

        const url = `${BASE_URL}/api/User/GetUsers-by-filter?page=1&pageCount=${resultsPerPage}&userType=${userTypeValue}&searchTerm=${searchQuery}`;

        const bearerToken = sessionStorage.getItem("access_token");

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setResponses(responseData.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedOption, searchQuery]); // Removed resultsPerPage since it is a constant

  return (
    <div className="m-3 flex items-start p-4 space-x-4 flex-col">
      <h2>Select User:</h2>
      <div className="p-3 flex space-x-4 flex-row">
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="all">all</option>
          <option value="pharmaceuticalCompany">Pharmaceutical Company</option>
          <option value="wholesalePharmacy">Wholesale Pharmacy</option>
          <option value="retailPharmacy">Retail Pharmacy</option>
          <option value="hospitalPharmacy">Hospital Pharmacy</option>
          <option value="doctor">Doctor</option>
          <option value="pharmacist">Pharmacist</option>
        </select>

        <input
          type="text"
          placeholder="Search user..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex flex-row w-full overflow-y-auto flex-wrap gap-2 text-[14px]">
        {loading ? (
          <p>Loading...</p>
        ) : responses.length > 0 ? (
          responses.map((user) => (
            <div
              className="w-[200px] p-6 bg-gray-200 border border-gray-400 rounded-lg shadow dark:border-gray-700"
              key={user.userId}
            >
              <p>Name: {user.name}</p>
              <p className="text-[11px]">Email: {user.email}</p>
              {user.address !== null && <p>Address: {user.address}</p>}
              <p>User Type: {user.userType}</p>
              {user.phoneNumber !== null && (
                <p>Phone Number: {user.phoneNumber}</p>
              )}
              <p>Created Date: {user.createdDate}</p>
              <p>Status: {user.status === 1 ? "Active" : "Inactive"}</p>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}

export default Users;
