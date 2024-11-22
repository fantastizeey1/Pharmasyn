import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base URL for API requests
const BASE_URL =
  "https://a260-2c0f-2a80-86-610-bd3e-f46f-bff0-4003.ngrok-free.app";

// Create an API slice for managing cart-related requests
export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      // Retrieve bearer token from session storage
      const bearerToken = sessionStorage.getItem("access_token");
      if (bearerToken) {
        headers.set("Authorization", `Bearer ${bearerToken}`);
      }
      // Set additional headers
      headers.set("ngrok-skip-browser-warning", "69420");
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Fetch cart data for a customer
    fetchCart: builder.query({
      query: () => `/api/Cart/GetCart?isCustomer=true`,
      transformResponse: (response) => ({
        cartData: response.cartResponse || [],
        cartCount: response.cartCount || 0,
      }),
    }),
    // Clear items from the cart
    clearCart: builder.mutation({
      query: (cartId) => ({
        url: `/api/Cart/RemoveFromCart`,
        method: "POST",
        body: { cartId },
      }),
    }),
    // Update items in the cart
    updateCart: builder.mutation({
      query: (updatedCart) => ({
        url: `/api/Cart/UpdateCart`,
        method: "PUT",
        body: updatedCart,
      }),
    }),
    // Delete a specific item from the cart
    deleteItemFromCart: builder.mutation({
      query: (updatedCart) => ({
        url: `/api/Cart/UpdateCart`,
        method: "PUT",
        body: updatedCart,
      }),
    }),
    // New endpoint for creating an order
    createOrder: builder.mutation({
      query: (payload) => ({
        url: `/api/Order/CreateOrder`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useFetchCartQuery,
  useClearCartMutation,
  useUpdateCartMutation,
  useDeleteItemFromCartMutation,
  useCreateOrderMutation,
} = cartApi;
