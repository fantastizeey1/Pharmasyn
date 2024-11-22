import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { cartApi } from "./Features/cart/cartApi";
import { inventoryApi } from "./Features/marketplace/inventoryApi";

const store = configureStore({
  reducer: {
    ...rootReducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [inventoryApi.reducerPath]: inventoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(cartApi.middleware)
      .concat(inventoryApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
