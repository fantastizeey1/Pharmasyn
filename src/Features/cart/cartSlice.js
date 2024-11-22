import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
  error: null,
};

const calculateTotal = (items) =>
  items
    .flatMap((item) => item.cartDetails)
    .reduce((total, detail) => {
      const price = parseFloat(detail.unitPrice);
      return total + detail.quantity * (price || 0);
    }, 0)
    .toFixed(2);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload;
      state.total = calculateTotal(action.payload);
      state.error = null;
    },
    updateCartItem(state, action) {
      const { inventoryId, quantity } = action.payload;
      const item = state.items.find((item) => item.inventoryId === inventoryId);
      if (item) {
        item.quantity = quantity;
        state.total = calculateTotal(state.items);
      } else {
        state.error = `Item with ID ${inventoryId} not found.`;
      }
    },
    removeCartItem(state, action) {
      const inventoryId = action.payload;
      state.items = state.items.filter(
        (item) => item.inventoryId !== inventoryId
      );
      state.total = calculateTotal(state.items);
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
    updateItemQuantity(state, action) {
      const { inventoryId, quantity } = action.payload;
      let updated = false;

      for (let cartItem of state.items) {
        for (let detail of cartItem.cartDetails) {
          if (detail.inventoryId === inventoryId) {
            detail.quantity = quantity;
            updated = true;
            break;
          }
        }
        if (updated) break;
      }

      if (updated) {
        state.total = calculateTotal(state.items);
      } else {
        state.error = `Detail with ID ${inventoryId} not found.`;
      }
    },

    deleteItem(state, action) {
      const inventoryId = action.payload;
      state.items = state.items
        .map((cartItem) => ({
          ...cartItem,
          cartDetails: cartItem.cartDetails.filter(
            (detail) => detail.inventoryId !== inventoryId
          ),
        }))
        .filter((cartItem) => cartItem.cartDetails.length > 0);
      state.total = calculateTotal(state.items);
    },
    setError(state, action) {
      state.error = action.payload || "An unknown error occurred.";
    },
    setTotal(state) {
      state.total = calculateTotal(state.items);
    },
  },
});

export const {
  setCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  updateItemQuantity,
  deleteItem,
  setError,
  setTotal,
} = cartSlice.actions;

export const selectCartTotal = (state) => calculateTotal(state.cart.items);

export default cartSlice.reducer;
