import React, { useEffect, useState } from "react";
import Adminheader from "./Adminheader";
import { NavLink } from "react-router-dom";
import { rawColumns } from "../Newdash/Table/Columns";
import { DataTable } from "../Newdash/Table/data-table";
import { Button } from "../ui/button";

const Docs = () => {
  const [data, setData] = useState([]);
  const hasData = (data, key) =>
    data.some((item) => item[key] !== undefined && item[key] !== null);

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await getData();
      setData(fetchedData);
    }

    fetchData();
  }, []);

  async function getData() {
    return [
      {
        id: "1",
        Name: "John Doe",
        Phone_No: "08164819845",
        Email: "prevail@gmail.com",
        company: "Suill lmt",
        Documents: "Veiw",
      },
      {
        id: "2",
        Name: "John Doeg",
        Phone_No: "08164819845",
        Email: "prevail@gmail.com",
        company: "Suill lmt",
        Documents: "Veiw",
      },
      {
        id: "3",
        Name: "John Doef",
        Phone_No: "08164819845",
        Email: "prevail@gmail.com",
        company: "Suill lmt",
        Documents: "Veiw",
      },
    ];
  }

  // Filter columns that have no data
  const columns = rawColumns.filter((column) => {
    if (column.accessorKey) {
      return hasData(data, column.accessorKey);
    }
    return true; // For columns without accessorKey (e.g., select, actions)
  });
  return (
    <main className="container mx-auto p-4">
      <Adminheader />
      <div className="w-[230px] fixed bg-white pl-[15px] pt-[15px] flex flex-col items-start h-screen  rounded-2xl shadow-lg ml-7 mt-[50px]">
        <div className="flex flex-col items-start w-full">
          <div className="flex flex-col mb-[150px] w-full  pl-3">
            <NavLink
              to="/Admin"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-[16px] font-medium mb-[44px] text-blue-500"
                  : "flex items-center text-[16px] font-medium mb-[44px] text-black"
              }
            >
              <img
                src={"/adminicon.svg"}
                alt="icon"
                className="mr-4 w-[20px] h-[20px]"
              />
              Admin
            </NavLink>
            <NavLink
              to="/Docs"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-[16px] font-medium mb-[44px] text-blue-500"
                  : "flex items-center text-[16px] font-medium mb-[44px] text-black"
              }
            >
              <img
                src={"/docicon.svg"}
                alt="icon"
                className="mr-4 w-[20px] h-[20px]"
              />
              Document
            </NavLink>

            <NavLink
              to="/Delivery"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-[16px] font-medium mb-[44px] text-blue-500"
                  : "flex items-center text-[16px] font-medium mb-[44px] text-black"
              }
            >
              <img
                src="/delicon.svg"
                alt="icon"
                className="mr-4 w-[20px] h-[20px]"
              />
              Delivery
            </NavLink>
          </div>

          <div className="flex items-center"></div>
        </div>
      </div>
      <div className="fixed top-[105px] left-[250px] w-[calc(100%-250px)] h-[calc(100%-100px)]">
        <div className="h-[100%] overflow-y-auto">
          <div className="flex items-start ml-10 justify-start flex-col mr-[70px]">
            <h3 className="text-[#0C0C0C] text-[20px] font-bold ">Documents</h3>
            <p className="text-[#0C0C0C]/65 text-[15px] font-thin ">
              Get to view and manage documents sent for approvals
            </p>
          </div>
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Docs;
