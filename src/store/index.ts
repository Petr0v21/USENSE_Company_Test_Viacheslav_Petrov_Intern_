import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
// import thunk from "redux-thunk";
import currencyReducer from "./reducers/rootReducer";
import baseReducer from "./reducers/baseReducer";

const rootReducer = combineReducers({
  currency: currencyReducer,
  base: baseReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
