import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBankCurrency = createAsyncThunk(
    "bankApi/fetchBankCurrency",
    async (_, thunkAPI) => {
      try {
        const response = await axios.get("https://api.monobank.ua/bank/currency");
        const filteredData = response.data.filter(item => 
          item.currencyCodeA === 840 || item.currencyCodeA === 978 ||
          item.currencyCodeB === 840 || item.currencyCodeB === 978
        );
        const usd = filteredData.find(item => item.currencyCodeA === 840 || item.currencyCodeB === 840);
        const eur = filteredData.find(item => item.currencyCodeA === 978 || item.currencyCodeB === 978);
        
        return [usd, eur]; 
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );