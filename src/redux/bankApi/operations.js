import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBankCurrency = createAsyncThunk(
  "bankApi/fetchBankCurrency",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://hasanadiguzel.com.tr/api/kurgetir"
      );
      return response.data.TCMB_AnlikKurBilgileri;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
