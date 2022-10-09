import { createAsyncThunk } from "@reduxjs/toolkit";
import { CurrentMultyModel, ParamsFetch } from "../../types/types";

export const fetchExchangeCurrent: any = createAsyncThunk(
  "exchange/fetch",
  async (params: ParamsFetch, thunkApi) => {
    try {
      const response = await fetch(
        `https://api.fastforex.io/fetch-one?from=${
          params.from ? params.from : "UAH"
        }&to=${
          params.to ? params.to : "USD"
        }&api_key=471395a8f9-f0b4b54e55-rji99z`
      );
      return await response.json();
    } catch (e) {
      return thunkApi.rejectWithValue("Error");
    }
  }
);

export const fetchBaseCurrent: any = createAsyncThunk(
  "base/fetch",
  async (_, thunkApi) => {
    try {
      const response = await fetch(
        `https://api.fastforex.io/fetch-multi?from=UAH&to=EUR,USD&api_key=471395a8f9-f0b4b54e55-rji99z`
      );
      const json: CurrentMultyModel = await response.json();
      const baseCurrentObj = {
        USD: Number((1 / json.results.USD).toFixed(3)),
        EUR: Number((1 / json.results.EUR).toFixed(3)),
      };
      return baseCurrentObj;
    } catch (e) {
      return thunkApi.rejectWithValue("Error");
    }
  }
);
