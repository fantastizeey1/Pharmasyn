import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../config";

export const inventoryApi = createApi({
  reducerPath: "inventoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const bearerToken = sessionStorage.getItem("access_token");
      if (bearerToken) {
        headers.set("Authorization", `Bearer ${bearerToken}`);
      }
      headers.set("ngrok-skip-browser-warning", "69420");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchInventories: builder.query({
      query: ({ searchTerm, page }) =>
        `/api/Inventory/GetInventory-by-filter?page=${page}&pageCount=10&searchTerm=${searchTerm}`,
      transformResponse: (response) => ({
        inventories: response.inventories || [],
        totalPages: response.totalPages || 0,
      }),
    }),
    addToCart: builder.mutation({
      query: (cartData) => ({
        url: "/api/Cart/AddToCart",
        method: "POST",
        body: cartData,
      }),
    }),
    updateCart: builder.mutation({
      query: (cartData) => ({
        url: "/api/Cart/UpdateCart",
        method: "PUT",
        body: cartData,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useFetchInventoriesQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
} = inventoryApi;
