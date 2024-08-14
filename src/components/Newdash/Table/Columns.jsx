import React from "react";
import { Button } from "@/components/ui/button";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const rawColumns = [
  {
    accessorKey: "Orderid",
    header: () => <div className="text-left pl-4">Order ID</div>,
    cell: ({ row }) => (
      <div className="text-left pl-4">{row.original.Orderid}</div>
    ),
  },

  {
    accessorKey: "Product",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Product
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-left pl-4">{row.original.Product}</div>
    ),
  },
  {
    accessorKey: "Price",
    header: () => <div className="text-left pl-4">Price</div>,
    cell: ({ row }) => (
      <div className="text-left pl-4">₦{row.original.Price}</div>
    ),
  },
  {
    accessorKey: "Quantity",
    header: () => <div className="text-left pl-4">Quantity</div>,
    cell: ({ row }) => (
      <div className="text-left pl-4">{row.original.Quantity}</div>
    ),
  },
  {
    accessorKey: "ProductId",
    header: () => <div className="text-left pl-4">Product ID</div>,
    cell: ({ row }) => (
      <div className="text-left pl-4">{row.original.ProductId}</div>
    ),
  },
  {
    accessorKey: "Customer",
    header: () => <div className="text-left pl-4">Customer</div>,
    cell: ({ row }) => (
      <div className="text-left pl-4">{row.original.Customer}</div>
    ),
  },
  {
    accessorKey: "Date",
    header: () => <div className="text-left pl-4">Date</div>,
    cell: ({ row }) => (
      <div className="text-left pl-4">{row.original.Date}</div>
    ),
  },
  {
    accessorKey: "ExpiryDate",
    header: () => <div className="text-left pl-4">Expiry Date</div>,
    cell: ({ row }) => (
      <div className="text-left pl-4">{row.original.ExpiryDate}</div>
    ),
  },
  {
    accessorKey: "Name",
    header: () => <div className="text-left pl-4">Name</div>,
    cell: ({ row }) => (
      <div className="text-left pl-4">{row.original.Name}</div>
    ),
  },
  {
    accessorKey: "Phone_No",
    header: () => <div className="text-left pl-4">Phone No</div>,
    cell: ({ row }) => (
      <div className="text-left pl-4">{row.original.Phone_No}</div>
    ),
  },
  {
    accessorKey: "Email",
    header: () => <div className="text-left pl-4">Email</div>,
    cell: ({ row }) => (
      <div className="text-left pl-4">{row.original.Email}</div>
    ),
  },
  {
    accessorKey: "company",
    header: () => <div className="text-left pl-4">Company</div>,
    cell: ({ row }) => (
      <div className="text-left pl-4">{row.original.company}</div>
    ),
  },
  {
    accessorKey: "Availability",
    header: () => <div className="pr-4 text-end">Availability</div>,
    cell: ({ row }) => (
      <div className="flex justify-end items-center gap-8">
        <Button className={"bg-[#013299]"}>
          {row.original.Availability[0]}
        </Button>
        <Button className="bg-[#DA3E33]">{row.original.Availability[1]}</Button>
      </div>
    ),
  },
  {
    accessorKey: "Documents",
    header: ({ column }) => <div className="text-right pl-4">Documents</div>,
    cell: ({ row }) => (
      <div className="flex justify-end items-center gap-8">
        <Button className={"bg-[#013299] "}>{row.original.Documents}</Button>
      </div>
    ),
  },
  {
    accessorKey: "Status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex justify-end items-center"
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center gap-8">
        <Button className={"bg-[#013299]"}>{row.original.Status}</Button>
      </div>
    ),
  },
  {
    accessorKey: "productAvailability",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex justify-end items-center"
      >
        Availability
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className={`flex justify-center items-center gap-8`}>
        <span
          className={`font-semibold ${
            row.original.productAvailability === "In-stock"
              ? "text-[#10A760]"
              : row.original.productAvailability === "Out-of-stock"
              ? "text-[#DA3E33]"
              : "text-[#E19133]"
          }`}
        >
          {row.original.productAvailability}
        </span>
      </div>
    ),
  },
];
