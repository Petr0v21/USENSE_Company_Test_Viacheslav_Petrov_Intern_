import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentMultyResModel, CurrencyBaseState } from "../../types/types";
import { fetchBaseCurrent } from "../action-creators/current";

const initialState: CurrencyBaseState = {
  base: {
    USD: 0,
    EUR: 0,
  },
  loading: false,
  errors: null,
};

export const currencyBaseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBaseCurrent.fulfilled.type]: (
      state,
      action: PayloadAction<CurrentMultyResModel>
    ) => {
      state.loading = false;
      state.base = action.payload;
      state.errors = "";
    },
    [fetchBaseCurrent.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchBaseCurrent.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.errors = action.payload;
    },
  },
});

export default currencyBaseSlice.reducer;
