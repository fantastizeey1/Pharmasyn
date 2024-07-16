import React, { useEffect, useState } from "react";
import { rawColumns } from "../Newdash/Table/Columns";
import { DataTable } from "../Newdash/Table/data-table";

const Table = () => {
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
    // Fetch data from your API here.
    return [];
  }

  // Filter columns that have no data
  const columns = rawColumns.filter((column) => {
    if (column.accessorKey) {
      return hasData(data, column.accessorKey);
    }
    return true; // For columns without accessorKey (e.g., select, actions)
  });

  return (
    <div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Table;
