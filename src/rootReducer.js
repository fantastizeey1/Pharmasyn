import { combineReducers } from "redux";
import cartReducer from "@/Features/cart/cartSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;
