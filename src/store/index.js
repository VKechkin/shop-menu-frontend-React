import { combineReducers, configureStore } from "@reduxjs/toolkit";
import shopMenuSlice from "./shopMenuSlice";

const rootReducer = combineReducers({
  shopMenu: shopMenuSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
