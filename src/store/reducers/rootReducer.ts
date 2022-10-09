import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrencyState, CurrentModel } from "../../types/types";
import { fetchExchangeCurrent } from "../action-creators/current";

const initialState: CurrencyState = {
  baseCurrent: {
    USD: 0,
    EUR: 0,
  },
  currency: {
    base: "UAH",
    result: {
      USD: 0,
    },
    updated: "",
    ms: 0,
  },
  loading: false,
  errors: null,
  buyCount: 0,
  sellCount: 0,
};

export const currencySlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    changeVal(state, action: PayloadAction<string>) {
      if (action.payload === "SELL") {
        state.buyCount = Number(
          (state.sellCount / Object.values(state.currency.result)[0]).toFixed(3)
        );
      } else if (action.payload === "BUY") {
        state.sellCount = Number(
          (state.buyCount * Object.values(state.currency.result)[0]).toFixed(3)
        );
      }
    },
    handlerBuy(state, action: PayloadAction<string>) {
      state.buyCount = Number(action.payload);
      state.sellCount = Number(
        (state.buyCount * Object.values(state.currency.result)[0]).toFixed(3)
      );
    },
    handlerSell(state, action: PayloadAction<string>) {
      state.sellCount = Number(action.payload);
      state.buyCount = Number(
        (state.sellCount / Object.values(state.currency.result)[0]).toFixed(3)
      );
    },
  },
  extraReducers: {
    [fetchExchangeCurrent.fulfilled.type]: (
      state,
      action: PayloadAction<CurrentModel>
    ) => {
      state.loading = false;
      state.currency = action.payload;
      state.errors = "";
    },
    [fetchExchangeCurrent.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchExchangeCurrent.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.errors = action.payload;
    },
  },
});

export default currencySlice.reducer;
